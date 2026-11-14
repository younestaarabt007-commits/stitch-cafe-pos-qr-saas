(function () {
  function getLiveApiBase() {
    try {
      const custom = localStorage.getItem('stitch_live_api_base');
      if (custom) return custom.replace(/\/$/, '');
    } catch (_) {}
    if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
      return window.location.origin;
    }
    return 'http://127.0.0.1:8000';
  }

  function getUiLang() {
    if (typeof getLang === 'function') return getLang();
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');
      if (urlLang && ['fr', 'ar', 'en'].includes(urlLang.toLowerCase())) {
        return urlLang.toLowerCase();
      }
      return localStorage.getItem('stitch_lang') || 'fr';
    } catch (_) {
      return 'fr';
    }
  }

  function getActiveOrderMode() {
    const params = new URLSearchParams(window.location.search);
    const urlMode = params.get('mode');
    const urlTable = params.get('table');

    if (urlTable && urlTable.trim()) {
      try {
        localStorage.setItem('stitch_qr_branch', 'table');
        const current = localStorage.getItem('stitch_order_mode');
        if (current !== 'takeaway') {
          localStorage.setItem('stitch_order_mode', 'dine_in');
        }
      } catch (_) {}
    } else if (urlMode === 'delivery') {
      try {
        localStorage.setItem('stitch_qr_branch', 'external');
        localStorage.setItem('stitch_order_mode', 'delivery');
      } catch (_) {}
      return 'delivery';
    } else if (urlMode === 'takeaway') {
      try {
        localStorage.setItem('stitch_order_mode', 'takeaway');
      } catch (_) {}
      return 'takeaway';
    } else if (urlMode === 'dine_in') {
      try {
        localStorage.setItem('stitch_order_mode', 'dine_in');
      } catch (_) {}
      return 'dine_in';
    }

    try {
      const stored = localStorage.getItem('stitch_order_mode');
      if (stored && ['dine_in', 'takeaway', 'delivery'].includes(stored)) {
        return stored;
      }
    } catch (_) {}
    return 'dine_in';
  }

  window.getStitchOrderMode = getActiveOrderMode;

  window.setStitchOrderMode = function (mode) {
    if (!['dine_in', 'takeaway', 'delivery'].includes(mode)) return;
    try {
      localStorage.setItem('stitch_order_mode', mode);
    } catch (_) {}
    if (typeof window.syncHeaderOrderModeUI === 'function') {
      try { window.syncHeaderOrderModeUI(mode); } catch (_) {}
    }
    updateCartModalModeUI();
  };

  function getActiveTable() {
    const params = new URLSearchParams(window.location.search);
    const urlTable = params.get('table');
    if (urlTable && urlTable.trim()) {
      const cleaned = urlTable.trim().replace(/^Table\s+/i, '');
      try {
        localStorage.setItem('stitch_current_table', cleaned);
      } catch (_) {}
      return cleaned;
    }
    try {
      return localStorage.getItem('stitch_current_table') || '12';
    } catch (_) {
      return '12';
    }
  }

  function isProductDetailPage() {
    const path = window.location.pathname.toLowerCase();
    return path.includes('customi');
  }

  function isOrderTrackingPage() {
    const path = window.location.pathname.toLowerCase();
    return path.includes('order_success_page');
  }

  function isHomeMenuPage() {
    const path = window.location.pathname.toLowerCase();
    return path.includes('swiggy-style_elite_main_menu_390x2500');
  }

  function normalizeCartItem(raw) {
    if (!raw || typeof raw !== 'object') return null;
    const qty = Math.max(1, parseInt(raw.quantity ?? raw.qty ?? 1, 10) || 1);
    const price = Math.max(0, parseFloat(raw.price ?? raw.unit_price ?? 0) || 0);
    const name = String(raw.name || raw.item || 'Article').trim();
    let img = raw.image || raw.image_url || '../assets/waiter.jpg';
    if (typeof img === 'string' && img.startsWith('assets/')) {
      img = '../' + img;
    }
    const mods = [];
    if (Array.isArray(raw.mods)) {
      mods.push(...raw.mods.filter(Boolean));
    } else if (raw.options && typeof raw.options === 'object') {
      Object.entries(raw.options).forEach(([k, v]) => {
        if (v !== undefined && v !== null && String(v).trim() !== '') {
          mods.push(`${k}: ${v}`);
        }
      });
    }
    return {
      id: String(raw.id || ('item-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6))),
      name,
      price: Number(price.toFixed(2)),
      quantity: qty,
      qty: qty,
      image: img,
      image_url: img,
      category: raw.category || 'Menu',
      options: raw.options || {},
      mods
    };
  }

  function readNormalizedCart() {
    try {
      localStorage.removeItem('stitch_last_order');
      let stored = JSON.parse(localStorage.getItem('stitch_cart') || '[]');
      if (!Array.isArray(stored)) stored = [];
      const normalized = stored.map(normalizeCartItem).filter(Boolean);
      localStorage.setItem('stitch_cart', JSON.stringify(normalized));
      return normalized;
    } catch (_) {
      return [];
    }
  }

  function writeNormalizedCart(items) {
    const normalized = (items || []).map(normalizeCartItem).filter(Boolean);
    try {
      localStorage.setItem('stitch_cart', JSON.stringify(normalized));
      const count = normalized.reduce((s, i) => s + i.quantity, 0);
      const total = normalized.reduce((s, i) => s + i.price * i.quantity, 0);
      window.dispatchEvent(new CustomEvent('stitch_cart_updated', {
        detail: { items: normalized, count, total }
      }));
    } catch (_) {}
    updateGlobalCartCount();
  }

  window.changeStitchCartQty = function (id, delta) {
    const items = readNormalizedCart();
    const item = items.find(i => String(i.id) === String(id));
    if (!item) return;
    item.quantity = (item.quantity || 1) + delta;
    if (item.quantity <= 0) {
      window.removeStitchCartItem(id);
      return;
    }
    item.qty = item.quantity;
    writeNormalizedCart(items);
    renderStitchCartModalItems();
  };

  window.removeStitchCartItem = function (id) {
    const items = readNormalizedCart().filter(i => String(i.id) !== String(id));
    writeNormalizedCart(items);
    renderStitchCartModalItems();
  };

  function updateGlobalCartCount() {
    const items = readNormalizedCart();
    const count = items.reduce((s, i) => s + (i.quantity || 1), 0);
    const subtotal = items.reduce((s, i) => s + (i.price || 0) * (i.quantity || 1), 0);
    const isAr = getUiLang() === 'ar';
    const curr = isAr ? 'د.م.' : 'DH';

    // 1. Bottom Nav Cart Badge
    const badge = document.getElementById('global-cart-count');
    if (badge) {
      badge.textContent = count;
      badge.classList.toggle('hidden', count === 0);
    }

    // 2. Floating Cart Bar (Home menu)
    const floatingBar = document.getElementById('stitch-floating-cart-bar');
    const floatingCount = document.getElementById('stitch-floating-cart-count');
    const floatingTotal = document.getElementById('stitch-floating-cart-total');

    if (floatingBar && isHomeMenuPage()) {
      if (count > 0) {
        floatingBar.classList.remove('hidden');
        if (floatingCount) floatingCount.textContent = isAr ? `${count} أصناف` : `${count} article${count > 1 ? 's' : ''}`;
        if (floatingTotal) floatingTotal.textContent = `${subtotal.toFixed(2)} ${curr}`;
      } else {
        floatingBar.classList.add('hidden');
      }
    }
  }

  window.refreshStitchCartBadge = updateGlobalCartCount;

  function updateCartModalModeUI() {
    const mode = getActiveOrderMode();
    const tablePill = document.getElementById('stitch-cart-table-pill');
    const deliveryPill = document.getElementById('stitch-cart-delivery-pill');
    const tableModeSwitch = document.getElementById('stitch-cart-table-mode-switch');
    const deliveryFields = document.getElementById('stitch-cart-delivery-fields');
    const serviceLabel = document.getElementById('stitch-modal-service-label');
    const serviceValue = document.getElementById('stitch-modal-tax');
    const btnDineIn = document.getElementById('cart-mode-dinein');
    const btnTakeaway = document.getElementById('cart-mode-takeaway');
    const isAr = getUiLang() === 'ar';

    if (mode === 'delivery') {
      tablePill?.classList.add('hidden');
      deliveryPill?.classList.remove('hidden');
      tableModeSwitch?.classList.add('hidden');
      deliveryFields?.classList.remove('hidden');
      if (serviceLabel) serviceLabel.textContent = isAr ? 'التوصيل المنزلي' : 'Livraison à domicile';
      if (serviceValue) serviceValue.textContent = isAr ? 'مجاني' : 'Gratuite';
    } else {
      tablePill?.classList.remove('hidden');
      deliveryPill?.classList.add('hidden');
      tableModeSwitch?.classList.remove('hidden');
      deliveryFields?.classList.add('hidden');
      if (serviceLabel) {
        serviceLabel.textContent = mode === 'takeaway' 
          ? (isAr ? 'تغليف سفري' : 'Préparation À Emporter')
          : (isAr ? 'خدمة الطاولة' : 'Service à table');
      }
      if (serviceValue) serviceValue.textContent = isAr ? 'مشمول' : 'Inclus';

      if (btnDineIn && btnTakeaway) {
        if (mode === 'takeaway') {
          btnTakeaway.className = 'flex-1 py-2 px-3 rounded-xl text-xs font-extrabold bg-stone-900 text-white shadow-sm flex items-center justify-center gap-1.5 transition-all';
          btnDineIn.className = 'flex-1 py-2 px-3 rounded-xl text-xs font-bold text-stone-500 hover:text-stone-800 flex items-center justify-center gap-1.5 transition-all';
        } else {
          btnDineIn.className = 'flex-1 py-2 px-3 rounded-xl text-xs font-extrabold bg-stone-900 text-white shadow-sm flex items-center justify-center gap-1.5 transition-all';
          btnTakeaway.className = 'flex-1 py-2 px-3 rounded-xl text-xs font-bold text-stone-500 hover:text-stone-800 flex items-center justify-center gap-1.5 transition-all';
        }
      }
    }
  }

  window.captureCustomerGpsLocation = function () {
    const isAr = getUiLang() === 'ar';
    const statusEl = document.getElementById('stitch-gps-status');
    const addressInput = document.getElementById('stitch-cart-delivery-address');
    const gpsHidden = document.getElementById('stitch-cart-delivery-gps');
    if (!navigator.geolocation) {
      alert(isAr ? 'خاصية تحديد الموقع غير مدعومة على هذا الجهاز.' : 'La géolocalisation n’est pas disponible sur cet appareil.');
      return;
    }
    if (statusEl) statusEl.textContent = isAr ? 'جارِ التحديد...' : 'Localisation...';
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        const lat = pos.coords.latitude.toFixed(6);
        const lng = pos.coords.longitude.toFixed(6);
        const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
        if (gpsHidden) gpsHidden.value = mapsUrl;
        try { localStorage.setItem('stitch_delivery_gps', mapsUrl); } catch (_) {}
        if (statusEl) statusEl.textContent = isAr ? 'تم تحديد الموقع' : 'GPS Ajouté';
        if (addressInput && !addressInput.value.trim()) {
          addressInput.value = isAr ? `إحداثيات GPS (${lat}, ${lng})` : `Position GPS exacte (${lat}, ${lng})`;
        }
      },
      function () {
        if (statusEl) statusEl.textContent = isAr ? 'موقعي عبر GPS' : 'Position GPS';
        alert(isAr ? 'تعذر جلب موقعك تلقائياً، يرجى كتابة العنوان يدوياً.' : 'Impossible de récupérer votre position GPS automatiquement. Veuillez saisir votre adresse.');
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  function ensureStitchCartModal() {
    if (document.getElementById('stitch-universal-cart-modal')) return;

    const lang = getUiLang();
    const isAr = lang === 'ar';
    const curr = isAr ? 'د.م.' : 'DH';
    const currentTable = getActiveTable();
    const savedName = localStorage.getItem('stitch_customer_name') || '';
    const savedPhone = localStorage.getItem('stitch_delivery_phone') || '';
    const savedAddress = localStorage.getItem('stitch_delivery_address') || '';
    const savedGps = localStorage.getItem('stitch_delivery_gps') || '';

    const modalHtml = `
      <!-- Floating Cart Bar (Shown ONLY on Home Menu page, hides on scroll down & reappears on scroll up) -->
      <div id="stitch-floating-cart-bar" class="fixed bottom-[68px] md:bottom-[76px] left-1/2 -translate-x-1/2 z-[55] w-[92%] max-w-[430px] hidden transition-all duration-300 ease-out" dir="${isAr ? 'rtl' : 'ltr'}">
        <button type="button" onclick="window.openStitchCartModal()" class="w-full bg-stone-900 hover:bg-[#FF5200] text-white rounded-2xl px-5 py-3.5 shadow-[0_16px_36px_rgba(24,18,14,0.32)] flex items-center justify-between transition-all active:scale-95 border border-white/15">
          <div class="flex items-center gap-3">
            <span class="bg-[#FF5200] text-white px-2.5 py-1 rounded-xl text-xs font-extrabold shadow-sm" id="stitch-floating-cart-count">0 ${isAr ? 'أصناف' : 'articles'}</span>
            <span class="text-xs font-extrabold uppercase tracking-wider">${isAr ? 'عرض السلة • إتمام الطلب' : 'Voir le Panier • Commander'}</span>
          </div>
          <div class="flex items-center gap-1.5 font-black text-sm text-amber-300">
            <span id="stitch-floating-cart-total">0.00 ${curr}</span>
            <span class="material-symbols-outlined text-[18px] text-white">shopping_bag</span>
          </div>
        </button>
      </div>

      <!-- Universal Cart & Checkout Modal -->
      <div id="stitch-universal-cart-modal" class="fixed inset-0 z-[120] hidden" dir="${isAr ? 'rtl' : 'ltr'}">
        <div class="absolute inset-0 bg-black/65 backdrop-blur-sm" onclick="window.closeStitchCartModal()"></div>
        <div class="absolute bottom-0 left-0 right-0 bg-[#FAF8F5] dark:bg-[#1e1510] text-stone-900 dark:text-white rounded-t-[2.25rem] border-t border-stone-200/80 dark:border-white/10 shadow-[0_-20px_60px_rgba(0,0,0,0.35)] p-5 sm:p-6 max-w-lg mx-auto max-h-[92vh] flex flex-col">
          <div class="w-12 h-1.5 bg-stone-300 dark:bg-stone-700 rounded-full mx-auto mb-4 shrink-0"></div>
          
          <div class="flex items-center justify-between mb-3 shrink-0">
            <div>
              <h3 class="text-xl font-extrabold tracking-tight">${isAr ? 'طلبك الحصري' : 'Votre Commande'}</h3>
              <p class="text-[11px] text-stone-500 dark:text-stone-400">${isAr ? 'إرسال فوري إلى المطبخ للتحضير' : 'Transmission instantanée en cuisine'}</p>
            </div>

            <!-- Table Badge (Shown in Table Branch) -->
            <div id="stitch-cart-table-pill" class="flex items-center gap-1.5 bg-white dark:bg-white/10 border border-stone-200 dark:border-white/10 px-3 py-1.5 rounded-xl shadow-sm">
              <span class="material-symbols-outlined text-[#FF5200] text-[16px]">table_restaurant</span>
              <span class="text-xs font-bold text-stone-700 dark:text-stone-200">${isAr ? 'طاولة' : 'Table'}</span>
              <input id="stitch-cart-table-input" type="text" value="${currentTable}" class="w-10 bg-transparent border-b border-[#FF5200]/40 text-center font-black text-xs text-[#FF5200] focus:outline-none" title="Numéro de table" />
            </div>

            <!-- Delivery Badge (Shown in Delivery Branch) -->
            <div id="stitch-cart-delivery-pill" class="hidden flex items-center gap-1.5 bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/40 px-3 py-1.5 rounded-xl">
              <span class="material-symbols-outlined text-[#FF5200] text-[16px]">two_wheeler</span>
              <span class="text-xs font-extrabold text-[#FF5200]">${isAr ? 'توصيل منزلي' : 'Livraison Domicile'}</span>
            </div>
          </div>

          <!-- Table Mode Switcher: Sur Place vs À Emporter (Only in Table Branch) -->
          <div id="stitch-cart-table-mode-switch" class="mb-3 bg-stone-200/70 dark:bg-white/5 p-1 rounded-2xl flex items-center gap-1 shrink-0">
            <button type="button" id="cart-mode-dinein" onclick="window.setStitchOrderMode('dine_in')"
              class="flex-1 py-2 px-3 rounded-xl text-xs font-extrabold bg-stone-900 text-white shadow-sm flex items-center justify-center gap-1.5 transition-all">
              <span class="material-symbols-outlined text-[15px]">local_dining</span>
              <span>${isAr ? 'تناول هنا' : 'Sur Place'}</span>
            </button>
            <button type="button" id="cart-mode-takeaway" onclick="window.setStitchOrderMode('takeaway')"
              class="flex-1 py-2 px-3 rounded-xl text-xs font-bold text-stone-500 hover:text-stone-800 flex items-center justify-center gap-1.5 transition-all">
              <span class="material-symbols-outlined text-[15px]">shopping_bag</span>
              <span>${isAr ? 'طلب سفري' : 'À Emporter'}</span>
            </button>
          </div>

          <div id="stitch-cart-items-list" class="space-y-2.5 overflow-y-auto pr-1 flex-1 min-h-[110px] max-h-[28vh]"></div>

          <!-- Delivery Specific Fields (Shown ONLY in Delivery Branch) -->
          <div id="stitch-cart-delivery-fields" class="hidden mt-3 pt-3 border-t border-stone-200/80 dark:border-white/10 space-y-3 shrink-0 overflow-y-auto max-h-[38vh] pr-1">
            <!-- Delivery ETA Banner -->
            <div class="flex items-center justify-between gap-3 p-3 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 dark:from-white/5 dark:to-white/5 border border-orange-200/70 dark:border-white/10">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-xl bg-[#FF5200] text-white flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-[18px]">two_wheeler</span>
                </div>
                <div>
                  <p class="text-xs font-extrabold">${isAr ? 'التوصيل التقديري: 30 – 45 دقيقة' : 'Livraison estimée : 30 – 45 min'}</p>
                  <p class="text-[10px] text-stone-500" id="stitch-delivery-fee-hint">${isAr ? 'توصيل مجاني للطلبات فوق 150 د.م. • أو 15 د.م.' : 'Livraison offerte dès 150 DH • sinon 15 DH'}</p>
                </div>
              </div>
              <span class="text-[10px] font-extrabold uppercase tracking-wider text-[#FF5200] bg-white dark:bg-white/10 px-2 py-1 rounded-lg">${isAr ? 'الرباط' : 'Rabat'}</span>
            </div>

            <!-- Step 1: Contact -->
            <div class="p-3 rounded-2xl bg-white dark:bg-white/5 border border-stone-200/80 dark:border-white/10 space-y-2.5">
              <div class="flex items-center gap-2">
                <span class="w-5 h-5 rounded-full bg-stone-900 text-white text-[10px] font-black flex items-center justify-center">1</span>
                <span class="text-[11px] font-extrabold uppercase tracking-wider">${isAr ? 'بيانات الاتصال' : 'Vos coordonnées'}</span>
              </div>
              <div class="grid grid-cols-2 gap-2.5">
                <div>
                  <label class="text-[10px] font-extrabold uppercase tracking-wider text-stone-500 block mb-1">${isAr ? 'الاسم الكامل *' : 'Nom complet *'}</label>
                  <input id="stitch-cart-delivery-name" type="text" value="${savedName.replace(/"/g, '&quot;')}" placeholder="${isAr ? 'مثال: سلمى بناني' : 'Ex: Salma Bennani'}" class="w-full px-3 py-2 text-xs font-bold rounded-xl bg-[#FAF8F5] dark:bg-white/5 border border-stone-200 dark:border-white/10 focus:outline-none focus:border-[#FF5200]" />
                </div>
                <div>
                  <label class="text-[10px] font-extrabold uppercase tracking-wider text-stone-500 block mb-1">${isAr ? 'الهاتف / واتساب *' : 'Téléphone / WhatsApp *'}</label>
                  <input id="stitch-cart-delivery-phone" type="tel" value="${savedPhone.replace(/"/g, '&quot;')}" placeholder="06 61 23 45 67" class="w-full px-3 py-2 text-xs font-bold rounded-xl bg-[#FAF8F5] dark:bg-white/5 border border-stone-200 dark:border-white/10 focus:outline-none focus:border-[#FF5200]" />
                </div>
              </div>
            </div>

            <!-- Step 2: Address -->
            <div class="p-3 rounded-2xl bg-white dark:bg-white/5 border border-stone-200/80 dark:border-white/10 space-y-2.5">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="w-5 h-5 rounded-full bg-stone-900 text-white text-[10px] font-black flex items-center justify-center">2</span>
                  <span class="text-[11px] font-extrabold uppercase tracking-wider">${isAr ? 'عنوان التوصيل' : 'Adresse de livraison'}</span>
                </div>
                <button type="button" onclick="window.captureCustomerGpsLocation()" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FF5200]/10 text-[10px] font-extrabold text-[#FF5200]">
                  <span class="material-symbols-outlined text-[13px]">my_location</span>
                  <span id="stitch-gps-status">${savedGps ? (isAr ? 'تم تحديد GPS' : 'GPS Ajouté') : (isAr ? 'موقعي عبر GPS' : 'Ma position GPS')}</span>
                </button>
              </div>
              <div class="grid grid-cols-2 gap-2.5">
                <div>
                  <label class="text-[10px] font-extrabold uppercase tracking-wider text-stone-500 block mb-1">${isAr ? 'الحي *' : 'Quartier *'}</label>
                  <select id="stitch-cart-delivery-district" class="w-full px-3 py-2 text-xs font-bold rounded-xl bg-[#FAF8F5] dark:bg-white/5 border border-stone-200 dark:border-white/10 focus:outline-none focus:border-[#FF5200]">
                    <option value="">${isAr ? 'اختر الحي...' : 'Choisir...'}</option>
                    <option>Agdal</option><option>Hassan</option><option>Hay Riad</option><option>Souissi</option>
                    <option>L'Océan</option><option>Les Orangers</option><option>Diour Jamaâ</option><option>Akkari</option>
                    <option>Yacoub El Mansour</option><option>Salé</option><option>Témara</option><option>${isAr ? 'أخرى' : 'Autre'}</option>
                  </select>
                </div>
                <div>
                  <label class="text-[10px] font-extrabold uppercase tracking-wider text-stone-500 block mb-1">${isAr ? 'نوع السكن' : 'Type de lieu'}</label>
                  <select id="stitch-cart-delivery-place" class="w-full px-3 py-2 text-xs font-bold rounded-xl bg-[#FAF8F5] dark:bg-white/5 border border-stone-200 dark:border-white/10 focus:outline-none focus:border-[#FF5200]">
                    <option>${isAr ? 'شقة' : 'Appartement'}</option><option>${isAr ? 'منزل / فيلا' : 'Maison / Villa'}</option><option>${isAr ? 'مكتب' : 'Bureau'}</option><option>${isAr ? 'فندق' : 'Hôtel'}</option>
                  </select>
                </div>
              </div>
              <div>
                <label class="text-[10px] font-extrabold uppercase tracking-wider text-stone-500 block mb-1">${isAr ? 'الشارع، الإقامة، العمارة، رقم الباب *' : 'Rue, Immeuble, N° *'}</label>
                <input id="stitch-cart-delivery-address" type="text" value="${savedAddress.replace(/"/g, '&quot;')}" placeholder="${isAr ? 'مثال: شارع أوكايمدن، إقامة البرتقال، عمارة 14' : 'Ex: Rue Oukaimeden, Résidence Les Orangers, Imm. 14'}" class="w-full px-3 py-2 text-xs font-medium rounded-xl bg-[#FAF8F5] dark:bg-white/5 border border-stone-200 dark:border-white/10 focus:outline-none focus:border-[#FF5200]" />
              </div>
              <div class="grid grid-cols-2 gap-2.5">
                <input id="stitch-cart-delivery-floor" type="text" placeholder="${isAr ? 'الطابق / الشقة (مثال: الطابق 3، شقة 8)' : 'Étage / Appt (ex: 3e, Appt 8)'}" class="w-full px-3 py-2 text-xs font-medium rounded-xl bg-[#FAF8F5] dark:bg-white/5 border border-stone-200 dark:border-white/10 focus:outline-none focus:border-[#FF5200]" />
                <input id="stitch-cart-delivery-landmark" type="text" placeholder="${isAr ? 'أقرب معلم بارز (مثال: أمام الصيدلية)' : 'Point de repère (ex: face pharmacie)'}" class="w-full px-3 py-2 text-xs font-medium rounded-xl bg-[#FAF8F5] dark:bg-white/5 border border-stone-200 dark:border-white/10 focus:outline-none focus:border-[#FF5200]" />
              </div>
              <input id="stitch-cart-delivery-gps" type="hidden" value="${savedGps.replace(/"/g, '&quot;')}" />
            </div>

            <!-- Step 3: Timing -->
            <div class="p-3 rounded-2xl bg-white dark:bg-white/5 border border-stone-200/80 dark:border-white/10 space-y-2.5">
              <div class="flex items-center gap-2">
                <span class="w-5 h-5 rounded-full bg-stone-900 text-white text-[10px] font-black flex items-center justify-center">3</span>
                <span class="text-[11px] font-extrabold uppercase tracking-wider">${isAr ? 'وقت التوصيل المطلوب' : 'Quand livrer ?'}</span>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <label class="flex items-center gap-2 p-2.5 rounded-xl border border-stone-200 dark:border-white/10 cursor-pointer has-[:checked]:border-[#FF5200] has-[:checked]:bg-orange-50/60">
                  <input type="radio" name="stitch-delivery-when" value="asap" checked class="accent-[#FF5200]" onchange="document.getElementById('stitch-cart-delivery-time').classList.add('hidden')" />
                  <span class="text-xs font-bold">${isAr ? 'في أسرع وقت ممكن (فوري)' : 'Dès que possible'}</span>
                </label>
                <label class="flex items-center gap-2 p-2.5 rounded-xl border border-stone-200 dark:border-white/10 cursor-pointer has-[:checked]:border-[#FF5200] has-[:checked]:bg-orange-50/60">
                  <input type="radio" name="stitch-delivery-when" value="later" class="accent-[#FF5200]" onchange="document.getElementById('stitch-cart-delivery-time').classList.remove('hidden')" />
                  <span class="text-xs font-bold">${isAr ? 'تحديد موعد لاحق' : 'Programmer'}</span>
                </label>
              </div>
              <input id="stitch-cart-delivery-time" type="time" class="hidden w-full px-3 py-2 text-xs font-bold rounded-xl bg-[#FAF8F5] dark:bg-white/5 border border-stone-200 dark:border-white/10 focus:outline-none focus:border-[#FF5200]" />
            </div>

            <!-- Step 4: Payment -->
            <div class="p-3 rounded-2xl bg-white dark:bg-white/5 border border-stone-200/80 dark:border-white/10 space-y-2.5">
              <div class="flex items-center gap-2">
                <span class="w-5 h-5 rounded-full bg-stone-900 text-white text-[10px] font-black flex items-center justify-center">4</span>
                <span class="text-[11px] font-extrabold uppercase tracking-wider">${isAr ? 'طريقة الدفع عند الاستلام' : 'Paiement à la livraison'}</span>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <label class="flex items-center gap-2 p-2.5 rounded-xl border border-stone-200 dark:border-white/10 cursor-pointer has-[:checked]:border-[#FF5200] has-[:checked]:bg-orange-50/60">
                  <input type="radio" name="stitch-delivery-pay" value="cash" checked class="accent-[#FF5200]" onchange="document.getElementById('stitch-cash-change-row').classList.remove('hidden')" />
                  <span class="material-symbols-outlined text-[16px] text-emerald-600">payments</span>
                  <span class="text-xs font-bold">${isAr ? 'نقداً (كاش)' : 'Espèces'}</span>
                </label>
                <label class="flex items-center gap-2 p-2.5 rounded-xl border border-stone-200 dark:border-white/10 cursor-pointer has-[:checked]:border-[#FF5200] has-[:checked]:bg-orange-50/60">
                  <input type="radio" name="stitch-delivery-pay" value="card" class="accent-[#FF5200]" onchange="document.getElementById('stitch-cash-change-row').classList.add('hidden')" />
                  <span class="material-symbols-outlined text-[16px] text-blue-600">credit_card</span>
                  <span class="text-xs font-bold">${isAr ? 'بطاقة بنكية (TPE)' : 'Carte (TPE)'}</span>
                </label>
              </div>
              <div id="stitch-cash-change-row">
                <input id="stitch-cart-cash-change" type="number" min="0" placeholder="${isAr ? 'المبلغ الذي معك لإرجاع الصرف؟ (مثال: 200 د.م.)' : 'Monnaie sur combien ? (ex: 200 DH)'}" class="w-full px-3 py-2 text-xs font-medium rounded-xl bg-[#FAF8F5] dark:bg-white/5 border border-stone-200 dark:border-white/10 focus:outline-none focus:border-[#FF5200]" />
              </div>
              <input id="stitch-cart-delivery-driver-note" type="text" placeholder="${isAr ? 'ملاحظات للسائق (مثال: الاتصال عند الباب السفلي)' : 'Note pour le livreur (ex: appeler en bas, interphone en panne)'}" class="w-full px-3 py-2 text-xs font-medium rounded-xl bg-[#FAF8F5] dark:bg-white/5 border border-stone-200 dark:border-white/10 focus:outline-none focus:border-[#FF5200]" />
              <select id="stitch-cart-payment-method" class="hidden"><option value="cash">cash</option><option value="card">card</option></select>
            </div>
          </div>

          <!-- Customer Info & Kitchen Notes -->
          <div id="stitch-cart-table-customer-block" class="mt-3 pt-3 border-t border-stone-200/80 dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-2.5 shrink-0">
            <div>
              <label class="text-[10px] font-extrabold uppercase tracking-wider text-stone-400 block mb-1">${isAr ? 'الاسم الكريم' : 'Votre Nom / Prénom'}</label>
              <input id="stitch-cart-customer-name" type="text" value="${savedName.replace(/"/g, '&quot;')}" placeholder="${isAr ? 'مثال: ياسين' : 'Ex: Yassine'}" class="w-full px-3.5 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 focus:outline-none focus:border-[#FF5200]" />
            </div>
            <div>
              <label class="text-[10px] font-extrabold uppercase tracking-wider text-stone-400 block mb-1">${isAr ? 'تعليمات للمطبخ' : 'Instructions Cuisine'}</label>
              <input id="stitch-cart-notes" type="text" placeholder="${isAr ? 'مثال: بدون سكر، ساخن جداً...' : 'Ex: Sans sucre, bien chaud...'}" class="w-full px-3.5 py-2 text-xs font-medium rounded-xl bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 focus:outline-none focus:border-[#FF5200]" />
            </div>
          </div>

          <!-- Pourboire Client pour le Serveur (Optionnel) -->
          <div class="mt-2.5 pt-2 border-t border-stone-200/80 dark:border-white/10 shrink-0">
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-[10px] font-extrabold uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px] text-amber-500">volunteer_activism</span>
                <span>${isAr ? 'إكرامية النادل (اختياري)' : 'Pourboire Serveur (Optionnel)'}</span>
              </span>
              <span id="stitch-cart-tip-display" class="text-[11px] font-extrabold text-amber-500">+0.00 ${curr}</span>
            </div>
            <div class="grid grid-cols-4 gap-1.5">
              <button type="button" onclick="window.setClientTip(0)" class="client-tip-btn active py-1.5 px-1 rounded-xl border border-stone-200 dark:border-white/10 text-xs font-bold text-center bg-stone-100 dark:bg-white/10" data-tip="0">0 ${curr}</button>
              <button type="button" onclick="window.setClientTip(5)" class="client-tip-btn py-1.5 px-1 rounded-xl border border-stone-200 dark:border-white/10 text-xs font-bold text-center bg-stone-50 dark:bg-white/5 hover:border-amber-500" data-tip="5">+5 ${curr}</button>
              <button type="button" onclick="window.setClientTip(10)" class="client-tip-btn py-1.5 px-1 rounded-xl border border-stone-200 dark:border-white/10 text-xs font-bold text-center bg-stone-50 dark:bg-white/5 hover:border-amber-500" data-tip="10">+10 ${curr}</button>
              <button type="button" onclick="window.setClientTip(20)" class="client-tip-btn py-1.5 px-1 rounded-xl border border-stone-200 dark:border-white/10 text-xs font-bold text-center bg-stone-50 dark:bg-white/5 hover:border-amber-500" data-tip="20">+20 ${curr}</button>
            </div>
          </div>

          <!-- Totals -->
          <div class="mt-3 pt-3 border-t border-stone-200/80 dark:border-white/10 space-y-1 shrink-0">
            <div class="flex justify-between items-center text-xs">
              <span class="text-stone-400 font-bold uppercase tracking-wider">${isAr ? 'المجموع الفرعي' : 'Sous-total'}</span>
              <span id="stitch-modal-subtotal" class="font-bold">0.00 ${curr}</span>
            </div>
            <div class="flex justify-between items-center text-xs">
              <span id="stitch-modal-service-label" class="text-stone-400 font-bold uppercase tracking-wider">${isAr ? 'خدمة الطاولة' : 'Service à table'}</span>
              <span id="stitch-modal-tax" class="font-bold text-emerald-600">${isAr ? 'مشمول' : 'Inclus'}</span>
            </div>
            <div class="flex justify-between items-center pt-1">
              <span class="text-base font-extrabold">${isAr ? 'المجموع الإجمالي للدفع' : 'Total à payer'}</span>
              <span id="stitch-modal-total" class="text-2xl font-black text-[#FF5200]">0.00 ${curr}</span>
            </div>
          </div>

          <!-- Buttons -->
          <div class="mt-4 grid grid-cols-3 gap-3 shrink-0">
            <button type="button" onclick="window.closeStitchCartModal()" class="col-span-1 bg-white dark:bg-white/10 border border-stone-200 dark:border-white/10 py-3.5 rounded-2xl font-bold text-xs hover:bg-stone-100 transition-all">
              ${isAr ? 'إغلاق' : 'Fermer'}
            </button>
            <button type="button" id="stitch-submit-order-btn" onclick="window.submitStitchLiveOrder()" class="col-span-2 bg-[#FF5200] hover:bg-[#e04800] text-white py-3.5 rounded-2xl font-extrabold text-sm shadow-[0_10px_24px_rgba(255,82,0,0.35)] flex items-center justify-center gap-2 transition-all active:scale-95">
              <span class="material-symbols-outlined text-[18px]">send</span>
              <span>${isAr ? 'تأكيد الطلب الآن' : 'Confirmer la commande'}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Universal Luxury Category & Sub-Category Drawer -->
      <div id="stitch-category-drawer" class="fixed inset-0 z-[125] hidden" dir="${isAr ? 'rtl' : 'ltr'}">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" onclick="window.closeStitchCategoryDrawer()"></div>
        <div class="absolute bottom-0 left-0 right-0 bg-[#FAF8F5] dark:bg-[#1e1510] text-stone-900 dark:text-white rounded-t-[2.25rem] border-t border-stone-200/80 shadow-[0_-20px_60px_rgba(0,0,0,0.35)] p-5 sm:p-6 max-w-lg mx-auto max-h-[85vh] flex flex-col">
          <div class="w-12 h-1.5 bg-stone-300 dark:bg-stone-700 rounded-full mx-auto mb-4 shrink-0"></div>
          <div class="flex items-center justify-between mb-4 shrink-0">
            <div>
              <span class="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#FF5200] block">${isAr ? 'تصفح سريع' : 'Navigation Rapide'}</span>
              <h3 class="text-xl font-extrabold tracking-tight">${isAr ? 'كافة الأقسام والتصنيفات' : 'Toutes nos Catégories'}</h3>
            </div>
            <button type="button" onclick="window.closeStitchCategoryDrawer()" class="w-9 h-9 rounded-full bg-stone-200/70 dark:bg-white/10 flex items-center justify-center">
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          <div class="overflow-y-auto space-y-5 pr-1 pb-4">
            <!-- Group 1: Brunch & Plats -->
            <div class="bg-white dark:bg-white/5 rounded-2xl p-4 border border-stone-200/70 dark:border-white/10 shadow-sm">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-2.5">
                  <div class="w-9 h-9 rounded-xl bg-orange-50 text-[#FF5200] flex items-center justify-center">
                    <span class="material-symbols-outlined text-[20px]">brunch_dining</span>
                  </div>
                  <div>
                    <h4 class="text-sm font-extrabold">${isAr ? 'برانش وأطباق مالحة' : 'Brunch & Plats Salés'}</h4>
                    <p class="text-[10px] text-stone-400 font-semibold">${isAr ? '38 وصفة محضرة عند الطلب' : '38 recettes préparées minute'}</p>
                  </div>
                </div>
                <button type="button" onclick="window.jumpToMenuCategory('brunch', 'all')" class="text-xs font-extrabold text-[#FF5200] hover:underline">${isAr ? 'عرض الكل' : 'Tout voir'}</button>
              </div>
              <div class="grid grid-cols-3 gap-2">
                <button type="button" onclick="window.jumpToMenuCategory('brunch', 'breakfast')" class="p-2.5 rounded-xl bg-[#FAF8F5] dark:bg-white/5 hover:border-[#FF5200] border border-stone-200/70 text-start transition-all">
                  <span class="material-symbols-outlined text-[16px] text-[#FF5200]">egg_alt</span>
                  <p class="text-xs font-bold mt-1 truncate">${isAr ? 'فطور صباحي' : 'Petit-Déjeuner'}</p>
                  <p class="text-[10px] text-stone-400">${isAr ? '10 أصناف' : '10 articles'}</p>
                </button>
                <button type="button" onclick="window.jumpToMenuCategory('brunch', 'toast')" class="p-2.5 rounded-xl bg-[#FAF8F5] dark:bg-white/5 hover:border-[#FF5200] border border-stone-200/70 text-start transition-all">
                  <span class="material-symbols-outlined text-[16px] text-[#FF5200]">lunch_dining</span>
                  <p class="text-xs font-bold mt-1 truncate">${isAr ? 'توست وسلطات' : 'Toasts & Salades'}</p>
                  <p class="text-[10px] text-stone-400">${isAr ? '15 صنفاً' : '15 articles'}</p>
                </button>
                <button type="button" onclick="window.jumpToMenuCategory('brunch', 'fastfood')" class="p-2.5 rounded-xl bg-[#FAF8F5] dark:bg-white/5 hover:border-[#FF5200] border border-stone-200/70 text-start transition-all">
                  <span class="material-symbols-outlined text-[16px] text-[#FF5200]">fastfood</span>
                  <p class="text-xs font-bold mt-1 truncate">${isAr ? 'برغر وسناكس' : 'Burgers & Tacos'}</p>
                  <p class="text-[10px] text-stone-400">${isAr ? '13 صنفاً' : '13 articles'}</p>
                </button>
              </div>
            </div>

            <!-- Group 2: Café & Boissons Chaudes -->
            <div class="bg-white dark:bg-white/5 rounded-2xl p-4 border border-stone-200/70 dark:border-white/10 shadow-sm">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-2.5">
                  <div class="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
                    <span class="material-symbols-outlined text-[20px]">coffee</span>
                  </div>
                  <div>
                    <h4 class="text-sm font-extrabold">${isAr ? 'قهوة مختصة ومشروبات ساخنة' : 'Torréfaction & Boissons Chaudes'}</h4>
                    <p class="text-[10px] text-stone-400 font-semibold">${isAr ? '24 إبداع باريستا وأعشاب' : '24 créations barista & infusions'}</p>
                  </div>
                </div>
                <button type="button" onclick="window.jumpToMenuCategory('brew', 'all')" class="text-xs font-extrabold text-[#FF5200] hover:underline">${isAr ? 'عرض الكل' : 'Tout voir'}</button>
              </div>
              <div class="grid grid-cols-3 gap-2">
                <button type="button" onclick="window.jumpToMenuCategory('brew', 'black')" class="p-2.5 rounded-xl bg-[#FAF8F5] dark:bg-white/5 hover:border-[#FF5200] border border-stone-200/70 text-start transition-all">
                  <span class="material-symbols-outlined text-[16px] text-amber-800">local_cafe</span>
                  <p class="text-xs font-bold mt-1 truncate">${isAr ? 'قهوة سوداء' : 'Black Coffee'}</p>
                  <p class="text-[10px] text-stone-400">${isAr ? '6 أصناف' : '6 articles'}</p>
                </button>
                <button type="button" onclick="window.jumpToMenuCategory('brew', 'latte')" class="p-2.5 rounded-xl bg-[#FAF8F5] dark:bg-white/5 hover:border-[#FF5200] border border-stone-200/70 text-start transition-all">
                  <span class="material-symbols-outlined text-[16px] text-amber-800">coffee_maker</span>
                  <p class="text-xs font-bold mt-1 truncate">${isAr ? 'لاتيه وكريمة' : 'Lattés & Crème'}</p>
                  <p class="text-[10px] text-stone-400">${isAr ? '9 أصناف' : '9 articles'}</p>
                </button>
                <button type="button" onclick="window.jumpToMenuCategory('brew', 'tea')" class="p-2.5 rounded-xl bg-[#FAF8F5] dark:bg-white/5 hover:border-[#FF5200] border border-stone-200/70 text-start transition-all">
                  <span class="material-symbols-outlined text-[16px] text-emerald-700">emoji_food_beverage</span>
                  <p class="text-xs font-bold mt-1 truncate">${isAr ? 'شاي وأعشاب' : 'Thés & Infusions'}</p>
                  <p class="text-[10px] text-stone-400">${isAr ? '9 أصناف' : '9 articles'}</p>
                </button>
              </div>
            </div>

            <!-- Group 3: Boissons Froides -->
            <div class="bg-white dark:bg-white/5 rounded-2xl p-4 border border-stone-200/70 dark:border-white/10 shadow-sm">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-2.5">
                  <div class="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                    <span class="material-symbols-outlined text-[20px]">local_bar</span>
                  </div>
                  <div>
                    <h4 class="text-sm font-extrabold">${isAr ? 'مشروبات باردة وعصائر منعشة' : 'Boissons Froides & Fraîcheur'}</h4>
                    <p class="text-[10px] text-stone-400 font-semibold">${isAr ? '42 عصائر طبيعية، سموذي وميلك شيك' : '42 jus pressés, smoothies & shakes'}</p>
                  </div>
                </div>
                <button type="button" onclick="window.jumpToMenuCategory('cold', 'all')" class="text-xs font-extrabold text-[#FF5200] hover:underline">${isAr ? 'عرض الكل' : 'Tout voir'}</button>
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button type="button" onclick="window.jumpToMenuCategory('cold', 'juice')" class="p-2.5 rounded-xl bg-[#FAF8F5] dark:bg-white/5 hover:border-[#FF5200] border border-stone-200/70 text-start transition-all">
                  <span class="material-symbols-outlined text-[16px] text-orange-500">nutrition</span>
                  <p class="text-xs font-bold mt-1 truncate">${isAr ? 'عصائر طبيعية' : 'Jus Frais'}</p>
                  <p class="text-[10px] text-stone-400">${isAr ? '11 صنفاً' : '11 articles'}</p>
                </button>
                <button type="button" onclick="window.jumpToMenuCategory('cold', 'smoothie')" class="p-2.5 rounded-xl bg-[#FAF8F5] dark:bg-white/5 hover:border-[#FF5200] border border-stone-200/70 text-start transition-all">
                  <span class="material-symbols-outlined text-[16px] text-rose-500">blender</span>
                  <p class="text-xs font-bold mt-1 truncate">${isAr ? 'سموذي فواكه' : 'Smoothies'}</p>
                  <p class="text-[10px] text-stone-400">${isAr ? '11 صنفاً' : '11 articles'}</p>
                </button>
                <button type="button" onclick="window.jumpToMenuCategory('cold', 'milkshake')" class="p-2.5 rounded-xl bg-[#FAF8F5] dark:bg-white/5 hover:border-[#FF5200] border border-stone-200/70 text-start transition-all">
                  <span class="material-symbols-outlined text-[16px] text-pink-500">icecream</span>
                  <p class="text-xs font-bold mt-1 truncate">${isAr ? 'ميلك شيك' : 'Milkshakes'}</p>
                  <p class="text-[10px] text-stone-400">${isAr ? '8 أصناف' : '8 articles'}</p>
                </button>
                <button type="button" onclick="window.jumpToMenuCategory('cold', 'iced')" class="p-2.5 rounded-xl bg-[#FAF8F5] dark:bg-white/5 hover:border-[#FF5200] border border-stone-200/70 text-start transition-all">
                  <span class="material-symbols-outlined text-[16px] text-sky-600">ac_unit</span>
                  <p class="text-xs font-bold mt-1 truncate">${isAr ? 'مشروبات مثلجة' : 'Mojitos & Iced'}</p>
                  <p class="text-[10px] text-stone-400">${isAr ? '12 صنفاً' : '12 articles'}</p>
                </button>
              </div>
            </div>

            <!-- Group 4: Pâtisserie & Boulangerie -->
            <div class="bg-white dark:bg-white/5 rounded-2xl p-4 border border-stone-200/70 dark:border-white/10 shadow-sm">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-2.5">
                  <div class="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                    <span class="material-symbols-outlined text-[20px]">bakery_dining</span>
                  </div>
                  <div>
                    <h4 class="text-sm font-extrabold">${isAr ? 'مخبوزات وحلويات فرنسية' : 'Boulangerie & Haute Pâtisserie'}</h4>
                    <p class="text-[10px] text-stone-400 font-semibold">${isAr ? '26 صنفاً طازجاً من الفرن والحلويات' : '26 viennoiseries, pains & douceurs'}</p>
                  </div>
                </div>
                <button type="button" onclick="window.jumpToMenuCategory('pastry', 'all')" class="text-xs font-extrabold text-[#FF5200] hover:underline">${isAr ? 'عرض الكل' : 'Tout voir'}</button>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <button type="button" onclick="window.jumpToMenuCategory('pastry', 'sweet')" class="p-2.5 rounded-xl bg-[#FAF8F5] dark:bg-white/5 hover:border-[#FF5200] border border-stone-200/70 text-start transition-all">
                  <span class="material-symbols-outlined text-[16px] text-rose-500">cake</span>
                  <p class="text-xs font-bold mt-1 truncate">${isAr ? 'حلويات، كريب وبان كيك' : 'Pâtisseries, Crêpes & Pancakes'}</p>
                  <p class="text-[10px] text-stone-400">${isAr ? '14 صنفاً' : '14 articles'}</p>
                </button>
                <button type="button" onclick="window.jumpToMenuCategory('pastry', 'bread')" class="p-2.5 rounded-xl bg-[#FAF8F5] dark:bg-white/5 hover:border-[#FF5200] border border-stone-200/70 text-start transition-all">
                  <span class="material-symbols-outlined text-[16px] text-amber-700">breakfast_dining</span>
                  <p class="text-xs font-bold mt-1 truncate">${isAr ? 'فطائر ومخبوزات طازجة' : 'Viennoiseries & Pains'}</p>
                  <p class="text-[10px] text-stone-400">${isAr ? '12 صنفاً' : '12 articles'}</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    updateCartModalModeUI();
  }

  window.openStitchCategoryDrawer = function () {
    ensureStitchCartModal();
    document.getElementById('stitch-category-drawer')?.classList.remove('hidden');
  };

  window.closeStitchCategoryDrawer = function () {
    document.getElementById('stitch-category-drawer')?.classList.add('hidden');
  };

  window.jumpToMenuCategory = function (mainCat, subCat) {
    window.closeStitchCategoryDrawer();
    if (isHomeMenuPage() && typeof window.selectTwoLevelCategory === 'function') {
      window.selectTwoLevelCategory(mainCat, subCat, true);
      return;
    }
    const mode = getActiveOrderMode();
    const activeTable = getActiveTable();
    const query = mode === 'delivery'
      ? `?mode=delivery&cat=${encodeURIComponent(mainCat)}&sub=${encodeURIComponent(subCat)}`
      : `?table=${encodeURIComponent(activeTable)}&cat=${encodeURIComponent(mainCat)}&sub=${encodeURIComponent(subCat)}`;
    window.location.href = `../swiggy-style_elite_main_menu_390x2500/index.html${query}#menu-sticky-anchor`;
  };

  window.clientTipAmount = 0;
  window.setClientTip = function(amount) {
    window.clientTipAmount = parseFloat(amount) || 0;
    const isAr = getUiLang() === 'ar';
    const curr = isAr ? 'د.م.' : 'DH';
    const tipDisplay = document.getElementById('stitch-cart-tip-display');
    if (tipDisplay) tipDisplay.textContent = `+${window.clientTipAmount.toFixed(2)} ${curr}`;

    document.querySelectorAll('.client-tip-btn').forEach(btn => {
      const match = parseFloat(btn.dataset.tip) === window.clientTipAmount;
      btn.classList.toggle('border-amber-500', match);
      btn.classList.toggle('bg-amber-50', match);
      btn.classList.toggle('dark:bg-amber-950/40', match);
      btn.classList.toggle('text-amber-600', match);
      btn.classList.toggle('font-black', match);
    });

    // Recalculate modal total
    const items = readNormalizedCart();
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalEl = document.getElementById('stitch-modal-total');
    if (totalEl) totalEl.textContent = `${(subtotal + window.clientTipAmount).toFixed(2)} ${curr}`;
  };

  function renderStitchCartModalItems() {
    ensureStitchCartModal();
    updateCartModalModeUI();
    const listEl = document.getElementById('stitch-cart-items-list');
    const subEl = document.getElementById('stitch-modal-subtotal');
    const totalEl = document.getElementById('stitch-modal-total');
    const submitBtn = document.getElementById('stitch-submit-order-btn');
    if (!listEl) return;

    const isAr = getUiLang() === 'ar';
    const curr = isAr ? 'د.م.' : 'DH';
    const items = readNormalizedCart();

    if (items.length === 0) {
      listEl.innerHTML = `
        <div class="py-10 text-center text-stone-400">
          <span class="material-symbols-outlined text-4xl mb-2 opacity-40">shopping_bag</span>
          <p class="text-xs font-bold uppercase tracking-wider">${isAr ? 'سلتك فارغة حالياً' : 'Votre panier est vide'}</p>
          <p class="text-[11px] mt-1">${isAr ? 'أضف أطباقك ومشروباتك المفضلة من القائمة للطلب.' : 'Ajoutez des articles depuis le menu pour commander.'}</p>
        </div>
      `;
      if (subEl) subEl.textContent = `0.00 ${curr}`;
      if (totalEl) totalEl.textContent = `0.00 ${curr}`;
      if (submitBtn) submitBtn.disabled = true;
      return;
    }

    if (submitBtn) submitBtn.disabled = false;
    let subtotal = 0;

    listEl.innerHTML = items.map(item => {
      const lineTotal = item.price * item.quantity;
      subtotal += lineTotal;
      const modsText = Array.isArray(item.mods) && item.mods.length ? item.mods.join(' • ') : '';
      const localizedName = (typeof getLocalizedItemName === 'function')
        ? getLocalizedItemName(item.name || item.id)
        : (item.name || 'Article');

      return `
        <div class="flex items-center gap-3 bg-white dark:bg-white/5 p-3 rounded-2xl border border-stone-200/80 dark:border-white/10 shadow-sm">
          <img src="${item.image}" alt="${localizedName}" class="w-12 h-12 rounded-xl object-cover shrink-0 bg-stone-100" onerror="this.onerror=null;this.src='../assets/waiter.jpg'" />
          <div class="flex-1 min-w-0">
            <h4 class="font-extrabold text-xs sm:text-sm truncate">${localizedName}</h4>
            ${modsText ? `<p class="text-[10px] text-stone-500 dark:text-stone-400 truncate mt-0.5">${modsText}</p>` : ''}
            <p class="text-xs font-black text-[#FF5200] mt-0.5">${item.price.toFixed(2)} ${curr}</p>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <button type="button" onclick="window.changeStitchCartQty('${item.id}', -1)" class="w-7 h-7 rounded-full bg-stone-100 dark:bg-white/10 flex items-center justify-center font-bold text-sm hover:bg-stone-200">-</button>
            <span class="text-xs font-black w-5 text-center">${item.quantity}</span>
            <button type="button" onclick="window.changeStitchCartQty('${item.id}', 1)" class="w-7 h-7 rounded-full bg-stone-900 hover:bg-[#FF5200] text-white flex items-center justify-center font-bold text-sm transition-colors">+</button>
          </div>
        </div>
      `;
    }).join('');

    if (subEl) subEl.textContent = `${subtotal.toFixed(2)} ${curr}`;
    const finalTotal = subtotal + (window.clientTipAmount || 0);
    if (totalEl) totalEl.textContent = `${finalTotal.toFixed(2)} ${curr}`;
  }

  window.openStitchCartModal = function () {
    ensureStitchCartModal();
    const tableInput = document.getElementById('stitch-cart-table-input');
    if (tableInput) tableInput.value = getActiveTable();
    renderStitchCartModalItems();
    document.getElementById('stitch-universal-cart-modal')?.classList.remove('hidden');
  };

  window.closeStitchCartModal = function () {
    document.getElementById('stitch-universal-cart-modal')?.classList.add('hidden');
  };

  window.submitStitchLiveOrder = async function () {
    const isAr = getUiLang() === 'ar';
    const items = readNormalizedCart();
    if (items.length === 0) {
      alert(isAr ? 'سلتك فارغة حالياً!' : 'Votre panier est vide !');
      return;
    }

    const orderMode = getActiveOrderMode();
    const btn = document.getElementById('stitch-submit-order-btn');
    const tableInput = document.getElementById('stitch-cart-table-input');
    const nameInput = document.getElementById('stitch-cart-customer-name');
    const notesInput = document.getElementById('stitch-cart-notes');
    const phoneInput = document.getElementById('stitch-cart-delivery-phone');
    const addressInput = document.getElementById('stitch-cart-delivery-address');
    const gpsInput = document.getElementById('stitch-cart-delivery-gps');
    const paymentSelect = document.getElementById('stitch-cart-payment-method');

    const customerName = (nameInput?.value || '').trim();
    const notes = (notesInput?.value || '').trim();
    const deliveryPhone = (phoneInput?.value || '').trim();
    const deliveryAddress = (addressInput?.value || '').trim();
    const deliveryGps = (gpsInput?.value || '').trim();
    const paymentMethod = paymentSelect?.value || 'cash';

    if (orderMode === 'delivery') {
      if (!deliveryPhone || !deliveryAddress) {
        alert(isAr ? 'بالنسبة للتوصيل، يرجى ملء رقم الهاتف والعنوان بالتفصيل.' : 'Pour la livraison, veuillez indiquer votre numéro de téléphone et votre adresse.');
        return;
      }
      try {
        localStorage.setItem('stitch_delivery_phone', deliveryPhone);
        localStorage.setItem('stitch_delivery_address', deliveryAddress);
      } catch (_) {}
    }

    const rawTable = (tableInput?.value || getActiveTable() || '12').trim().replace(/^Table\s+/i, '') || '12';
    const tableLabel = orderMode === 'delivery'
      ? (isAr ? 'توصيل منزلي' : 'Livraison')
      : (orderMode === 'takeaway' ? `${rawTable} (${isAr ? 'سفري' : 'À Emporter'})` : rawTable);

    try {
      if (orderMode !== 'delivery') localStorage.setItem('stitch_current_table', rawTable);
      if (customerName) localStorage.setItem('stitch_customer_name', customerName);
    } catch (_) {}

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tip = window.clientTipAmount || 0;
    const total = subtotal + tip;
    const orderId = (orderMode === 'delivery' ? 'LIV-' : 'ORD-') + Math.floor(100 + Math.random() * 900) + '-' + String(Date.now()).slice(-3);

    const payload = {
      id: orderId,
      table: tableLabel,
      orderType: orderMode,
      customerName: customerName || undefined,
      guestName: customerName || undefined,
      deliveryPhone: orderMode === 'delivery' ? deliveryPhone : undefined,
      deliveryAddress: orderMode === 'delivery' ? deliveryAddress : undefined,
      deliveryGps: orderMode === 'delivery' ? deliveryGps : undefined,
      paymentMethod,
      items: items.map(it => ({
        id: it.id,
        name: it.name,
        qty: it.quantity,
        quantity: it.quantity,
        price: it.price,
        image_url: it.image || it.image_url,
        mods: it.mods || []
      })),
      notes: notes || undefined,
      tip: tip > 0 ? tip : undefined,
      subtotal,
      total,
      status: 'Received',
      time: Date.now()
    };

    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `<span class="material-symbols-outlined text-[18px] animate-spin">progress_activity</span><span>${isAr ? 'جارِ الإرسال...' : 'Envoi en cours...'}</span>`;
    }

    try {
      const storedOrders = JSON.parse(localStorage.getItem('stitch_live_orders') || '[]');
      storedOrders.unshift(payload);
      localStorage.setItem('stitch_live_orders', JSON.stringify(storedOrders));
      localStorage.setItem('stitch_active_order_id', orderId);
    } catch (_) {}

    try {
      await fetch(`${getLiveApiBase()}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (apiErr) {
      console.warn('API sync failed (fallback to local & cloud sync):', apiErr);
    }

    // Broadcast order via Real-Time Cloud Sync Engine
    if (window.stitchSync && typeof window.stitchSync.sendNewOrder === 'function') {
      try {
        window.stitchSync.sendNewOrder(payload);
      } catch (syncErr) {
        console.warn('Real-time sync broadcast failed:', syncErr);
      }
    }

    writeNormalizedCart([]);
    window.closeStitchCartModal();

    const targetUrl = `../order_success_page/index.html?orderId=${encodeURIComponent(payload.id)}&table=${encodeURIComponent(payload.table)}${orderMode === 'delivery' ? '&mode=delivery' : ''}`;
    window.location.href = targetUrl;
  };

  function setupSmartScrollHideShow() {
    let lastScrollY = window.scrollY || document.documentElement.scrollTop || 0;
    let isHiddenByScroll = false;

    function applyScrollVisibility(hide) {
      if (hide === isHiddenByScroll) return;
      isHiddenByScroll = hide;

      const navBar = document.querySelector('nav.standard-nav-bar');
      const floatingBar = document.getElementById('stitch-floating-cart-bar');

      if (navBar) {
        navBar.style.transform = hide ? 'translateY(115%)' : 'translateY(0)';
      }
      if (floatingBar) {
        if (hide) {
          floatingBar.style.transform = 'translate(-50%, 170%)';
          floatingBar.style.opacity = '0';
          floatingBar.style.pointerEvents = 'none';
        } else {
          floatingBar.style.transform = 'translate(-50%, 0)';
          floatingBar.style.opacity = '1';
          floatingBar.style.pointerEvents = 'auto';
        }
      }
    }

    window.addEventListener('scroll', function () {
      const currentScrollY = Math.max(0, window.scrollY || document.documentElement.scrollTop || 0);
      const delta = currentScrollY - lastScrollY;

      if (currentScrollY <= 35) {
        applyScrollVisibility(false);
        lastScrollY = currentScrollY;
        return;
      }

      if (delta > 6) {
        applyScrollVisibility(true);
        lastScrollY = currentScrollY;
      } else if (delta < -5) {
        applyScrollVisibility(false);
        lastScrollY = currentScrollY;
      }
    }, { passive: true });
  }

  function initNavBar() {
    const activeTable = getActiveTable();
    const orderMode = getActiveOrderMode();
    const lang = getUiLang();
    const isAr = lang === 'ar';

    if (isProductDetailPage()) {
      updateGlobalCartCount();
      return;
    }

    const oldNavs = document.querySelectorAll('nav.standard-nav-bar, nav.floating-cart, #bottom-tabbar');
    oldNavs.forEach(el => el.remove());

    document.body.classList.add('pb-32');

    const homeQuery = orderMode === 'delivery'
      ? '?mode=delivery'
      : (activeTable ? `?table=${encodeURIComponent(activeTable)}` : '');

    const navHTML = `
      <nav class="standard-nav-bar bg-white/95 dark:bg-[#1e1510]/95 border-t border-stone-200/80 dark:border-white/10 shadow-[0_-8px_30px_rgba(24,18,14,0.08)] backdrop-blur-xl h-[60px] md:h-[66px] flex items-stretch justify-between px-6 md:px-12 fixed bottom-0 left-0 right-0 z-50 w-full transition-transform duration-300 ease-out" dir="${isAr ? 'rtl' : 'ltr'}">
        <button type="button" onclick="window.location.href='../swiggy-style_elite_main_menu_390x2500/index.html${homeQuery}'" class="flex-1 flex flex-col items-center justify-center gap-0.5 text-stone-700 dark:text-stone-300 hover:text-[#FF5200] transition-colors">
          <span class="material-symbols-outlined text-[22px]">restaurant_menu</span>
          <span class="text-[10px] font-extrabold uppercase tracking-wider">${isAr ? 'القائمة' : 'Carte'}</span>
        </button>
        <button type="button" onclick="window.openStitchCategoryDrawer()" class="flex-1 flex flex-col items-center justify-center gap-0.5 text-stone-700 dark:text-stone-300 hover:text-[#FF5200] transition-colors">
          <span class="material-symbols-outlined text-[22px]">grid_view</span>
          <span class="text-[10px] font-extrabold uppercase tracking-wider">${isAr ? 'الأقسام' : 'Catégories'}</span>
        </button>
        <button type="button" onclick="window.openStitchCartModal()" class="relative flex-1 flex flex-col items-center justify-center gap-0.5 text-stone-700 dark:text-stone-300 hover:text-[#FF5200] transition-colors">
          <span class="material-symbols-outlined text-[22px]">shopping_bag</span>
          <span class="text-[10px] font-extrabold uppercase tracking-wider">${isAr ? 'السلة' : 'Panier'}</span>
          <span id="global-cart-count" class="absolute top-1 right-4 md:right-8 bg-[#FF5200] text-white text-[10px] font-extrabold px-1.5 py-[1px] rounded-full hidden">0</span>
        </button>
        <button type="button" onclick="window.location.href='../order_success_page/index.html${homeQuery}'" class="flex-1 flex flex-col items-center justify-center gap-0.5 text-stone-700 dark:text-stone-300 hover:text-[#FF5200] transition-colors">
          <span class="material-symbols-outlined text-[22px]">receipt_long</span>
          <span class="text-[10px] font-extrabold uppercase tracking-wider">${isAr ? 'متابعة' : 'Suivi'}</span>
        </button>
      </nav>
    `;

    document.body.insertAdjacentHTML('beforeend', navHTML);
    ensureStitchCartModal();
    updateGlobalCartCount();
    setupSmartScrollHideShow();
  }

  // Reactive Language Listener
  document.addEventListener('languageChanged', function () {
    document.getElementById('stitch-universal-cart-modal')?.remove();
    document.getElementById('stitch-floating-cart-bar')?.remove();
    document.getElementById('stitch-category-drawer')?.remove();
    const nav = document.querySelector('nav.standard-nav-bar');
    if (nav) nav.remove();
    initNavBar();
  });

  document.addEventListener('DOMContentLoaded', initNavBar);
})();

// =========================================================================
// TABLE CONFLICT WARNING (PREPARING ORDER BANNER) & OUT OF STOCK NOTIFIER
// =========================================================================
let tableConflictDismissed = false;

window.dismissTableConflictBanner = function() {
  tableConflictDismissed = true;
  const banner = document.getElementById('table-conflict-warning-card');
  if (banner) {
    banner.style.opacity = '0';
    banner.style.transform = 'translateY(-10px)';
    setTimeout(() => banner.remove(), 300);
  }
};

function checkAndRenderTableConflictBanner() {
  const container = document.getElementById('stitch-table-conflict-container');
  if (!container) return;

  const mode = (typeof window.getStitchOrderMode === 'function')
    ? window.getStitchOrderMode()
    : ((new URLSearchParams(window.location.search).get('mode') === 'delivery') ? 'delivery' : 'dine_in');

  if (mode === 'delivery' || tableConflictDismissed) {
    container.innerHTML = '';
    return;
  }

  const rawTable = String(currentTable || '12').replace(/^Table\s+/i, '').trim().toLowerCase();
  if (!rawTable || rawTable === 'livraison') {
    container.innerHTML = '';
    return;
  }

  // Check live orders in localStorage or via stitchSync
  const orders = JSON.parse(localStorage.getItem('stitch_live_orders') || '[]');
  const preparingOrder = orders.find(o => {
    if (!o || o.status !== 'Preparing') return false;
    const oTable = String(o.table || '').replace(/^Table\s+/i, '').trim().toLowerCase();
    return oTable === rawTable;
  });

  if (!preparingOrder) {
    container.innerHTML = '';
    return;
  }

  const lang = (typeof getLang === 'function') ? getLang() : (localStorage.getItem('stitch_lang') || 'fr');
  const isRtl = lang === 'ar';

  const conflictMsg = lang === 'ar'
    ? `يوجد طلب قيد التحضير بالفعل للطاولة ${currentTable}. يمكنك إضافة عناصر إضافية.`
    : lang === 'en'
      ? `An order is already being prepared for Table ${currentTable}. You can add extra items.`
      : `Une commande est déjà en cours de préparation pour la Table ${currentTable}. Vous pouvez ajouter des articles supplémentaires.`;

  const badgeLabel = lang === 'ar' ? 'قيد التحضير' : lang === 'en' ? 'Preparing' : 'En préparation';
  const trackLabel = lang === 'ar' ? 'متابعة الطلب' : lang === 'en' ? 'Track Order' : 'Voir le suivi';
  const dismissLabel = lang === 'ar' ? 'حسناً، متابعة' : lang === 'en' ? 'Got it, add more' : 'Compris, ajouter';

  container.innerHTML = `
    <div id="table-conflict-warning-card" class="bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border-2 border-amber-500/40 backdrop-blur-md rounded-2xl p-4 shadow-lg text-stone-900 dark:text-white my-3 transition-all duration-300" dir="${isRtl ? 'rtl' : 'ltr'}">
      <div class="flex items-start gap-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shrink-0 shadow-md">
          <span class="material-symbols-outlined text-[22px] animate-pulse">soup_kitchen</span>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500 text-white shadow-xs">
              <span class="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              ${badgeLabel}
            </span>
            <span class="text-[11px] font-bold text-amber-700 dark:text-amber-400 font-mono">#${preparingOrder.id}</span>
          </div>
          <p class="text-xs sm:text-sm font-bold mt-1 text-stone-800 dark:text-stone-100 leading-snug">
            ${conflictMsg}
          </p>
          <div class="mt-2.5 flex items-center gap-2 flex-wrap">
            <a href="../order_success_page/index.html?orderId=${encodeURIComponent(preparingOrder.id)}&table=${encodeURIComponent(currentTable)}"
               class="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-black hover:opacity-90 transition-all no-underline shadow-sm">
              <span class="material-symbols-outlined text-[14px]">visibility</span>
              <span>${trackLabel}</span>
            </a>
            <button type="button" onclick="window.dismissTableConflictBanner()"
               class="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/80 dark:bg-white/10 border border-stone-200 dark:border-white/10 text-stone-700 dark:text-stone-300 text-xs font-bold hover:bg-stone-100 transition-all cursor-pointer">
              <span>${dismissLabel}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}
window.checkAndRenderTableConflictBanner = checkAndRenderTableConflictBanner;

window.showOutOfStockAlert = function(productName) {
  const lang = (typeof getLang === 'function') ? getLang() : (localStorage.getItem('stitch_lang') || 'fr');
  const msg = lang === 'ar'
    ? `عذراً، "${productName || 'هذا المنتج'}" غير متوفر حالياً (نفد المخزون).`
    : lang === 'en'
      ? `Sorry, "${productName || 'this item'}" is currently out of stock.`
      : `Désolé, "${productName || 'cet article'}" est actuellement en rupture de stock.`;

  const existingToast = document.getElementById('stitch-stock-toast');
  if (existingToast) existingToast.remove();

  const toast = document.createElement('div');
  toast.id = 'stitch-stock-toast';
  toast.dir = lang === 'ar' ? 'rtl' : 'ltr';
  toast.className = 'fixed bottom-24 left-1/2 -translate-x-1/2 z-[200] max-w-sm w-[90%] bg-stone-900/95 dark:bg-black/95 text-white px-4 py-3 rounded-2xl shadow-2xl border border-red-500/50 backdrop-blur-md flex items-center gap-3 transition-all duration-300';
  toast.innerHTML = `
    <div class="w-8 h-8 rounded-xl bg-red-600/30 text-red-400 flex items-center justify-center shrink-0">
      <span class="material-symbols-outlined text-[18px]">block</span>
    </div>
    <div class="flex-1 text-xs font-bold leading-tight">${msg}</div>
    <button type="button" onclick="this.parentElement.remove()" class="text-stone-400 hover:text-white text-xs font-black px-1.5 py-0.5">✕</button>
  `;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
};

function getTableZone(tableNum) {
    const num = parseInt(tableNum, 10);
    if (num >= 1 && num <= 4) return "Terrasse";
    if (num >= 5 && num <= 8) return "Salle Principale";
    if (num >= 9 && num <= 12) return "1er Étage";
    return "Salle";
}

function apiBase() {
  try {
    return localStorage.getItem('stitch_api_base') || (typeof window !== 'undefined' && window.STITCH_API_BASE) || null;
  } catch {
    return null;
  }
}

let bestsellers = (typeof window !== 'undefined' && Array.isArray(window.allMenuItems) && window.allMenuItems.length > 0) ? window.allMenuItems : [];
let cart = [];
const _urlParams = new URLSearchParams(window.location.search);
const _isExplicitDelivery = _urlParams.get('mode') === 'delivery' || (!_urlParams.get('table') && localStorage.getItem('stitch_order_mode') === 'delivery');
let currentTable = _isExplicitDelivery ? 'Livraison' : (_urlParams.get('table') || localStorage.getItem('stitch_current_table') || '12');

if (_isExplicitDelivery) {
  try {
    localStorage.setItem('stitch_order_mode', 'delivery');
    localStorage.setItem('stitch_qr_branch', 'external');
  } catch (_) {}
} else if (_urlParams.get('table')) {
  try {
    localStorage.setItem('stitch_current_table', currentTable);
    if (localStorage.getItem('stitch_order_mode') === 'delivery') {
      localStorage.setItem('stitch_order_mode', 'dine_in');
    }
  } catch (_) {}
}

function normalizeImagePath(path) {
  if (!path || typeof path !== 'string') return path;
  if (path.startsWith('../../images/')) return path.replace('../../images/', '../images/');
  if (path.startsWith('assets/')) return '../' + path;
  return path;
}

// Consolidated Product Data from all sub-categories


let activeMainCat = 'all';
let activeSubCat = 'all';

const SUB_CAT_METADATA = {
  breakfast: { label: 'Petit-Déjeuner', mainCat: 'brunch', icon: 'egg_alt', img: '../images/sub catégories icons/Breakfast.jpg' },
  toast: { label: 'Toasts & Tartines', mainCat: 'brunch', icon: 'breakfast_dining', img: '../images/sub catégories icons/sandwich or toast icon .jpg' },
  fastfood: { label: 'Burgers & Snacks', mainCat: 'brunch', icon: 'lunch_dining', img: '../images/sub catégories icons/Snack Food.jpg' },
  black: { label: 'Cafés Noirs', mainCat: 'brew', icon: 'coffee_maker', img: '../images/sub catégories icons/black coffe icon.jpg' },
  latte: { label: 'Lattes & Crémeux', mainCat: 'brew', icon: 'local_cafe', img: '../images/sub catégories icons/latté icon.jpg' },
  tea: { label: 'Thés & Infusions', mainCat: 'brew', icon: 'emoji_food_beverage', img: '../images/sub catégories icons/tea icon .png' },
  iced: { label: 'Iced & Rafraîchissants', mainCat: 'cold', icon: 'ac_unit', img: '../images/sub catégories icons/Cold drinks icon.jpg' },
  juice: { label: 'Jus Pressés Frais', mainCat: 'cold', icon: 'nutrition', img: '../images/sub catégories icons/juces icon.png' },
  smoothie: { label: 'Smoothies Fruits', mainCat: 'cold', icon: 'blender', img: '../images/sub catégories icons/smoothie icon.png' },
  milkshake: { label: 'Milkshakes Gourmands', mainCat: 'cold', icon: 'icecream', img: '../images/sub catégories icons/milkshake icon.png' },
  sweet: { label: 'Douceurs & Gâteaux', mainCat: 'pastry', icon: 'cake', img: '../images/sub catégories icons/sweet pastry icon.png' },
  bread: { label: 'Boulangerie Artisanale', mainCat: 'pastry', icon: 'bakery_dining', img: '../images/sub catégories icons/pastry,.jpg' }
};

const MAIN_CAT_LABELS = {
  all: { title: 'Toutes nos Spécialités', kicker: 'Carte Complète • 129 Créations' },
  brunch: { title: 'Brunch & Plats Salés', kicker: 'Cuisine Fraîche • 38 Créations' },
  brew: { title: 'Cafés de Spécialité & Thés', kicker: 'Torréfaction Artisanale • 24 Boissons' },
  cold: { title: 'Boissons Fraîches & Jus', kicker: 'Fruits Frais & Glacés • 42 Fraîcheurs' },
  pastry: { title: 'Pâtisseries & Boulangerie', kicker: 'Fait Maison Chaque Matin • 25 Douceurs' }
};

function fetchBestsellers() {
  const menuData = (typeof allMenuItems !== 'undefined' && Array.isArray(allMenuItems)) ? allMenuItems : [];
  if (!menuData.length) {
    console.error('Menu data not loaded. Check menu.js path.');
  }
  bestsellers = menuData;
  const params = new URLSearchParams(window.location.search);
  const initCat = params.get('cat') || 'all';
  const initSub = params.get('sub') || 'all';
  window.selectTwoLevelCategory(initCat, initSub, Boolean(params.get('cat') || params.get('sub')));
}

function getGourmetCategoryMeta(item) {
  if (!item) return { slug: 'brunch', tag: 'Fait minute', icon: 'restaurant' };
  const cat = (item.category || '').toLowerCase();
  const sub = (item.subCat || '').toLowerCase();
  const main = (item.mainCat || '').toLowerCase();

  if (main === 'brunch' || sub === 'breakfast' || cat.includes('dejeuner') || cat.includes('breakfast')) {
    return { slug: 'brunch', tag: 'Fait minute', icon: 'egg_alt' };
  }
  if (sub === 'toast' || cat.includes('toast') || cat.includes('salade') || cat.includes('salad')) {
    return { slug: 'toast', tag: 'Pain Levain & Bio', icon: 'lunch_dining' };
  }
  if (sub === 'fastfood' || cat.includes('burger') || cat.includes('snack') || cat.includes('fast food')) {
    return { slug: 'fastfood', tag: 'Recette Chef', icon: 'fastfood' };
  }
  if ((main === 'brew' && sub === 'black') || cat.includes('black') || cat.includes('espresso') || cat.includes('noir')) {
    return { slug: 'coffee', tag: '100% Arabica', icon: 'local_cafe' };
  }
  if ((main === 'brew' && sub === 'latte') || cat.includes('latte') || cat.includes('latté') || cat.includes('creme')) {
    return { slug: 'latte', tag: 'Barista Choice', icon: 'coffee_maker' };
  }
  if ((main === 'brew' && sub === 'tea') || cat.includes('tea') || cat.includes('thé') || cat.includes('infusion')) {
    return { slug: 'tea', tag: 'Feuilles Entières', icon: 'emoji_food_beverage' };
  }
  if ((main === 'cold' && sub === 'juice') || cat.includes('juice') || cat.includes('jus')) {
    return { slug: 'juice', tag: 'Pressé minute', icon: 'nutrition' };
  }
  if ((main === 'cold' && sub === 'smoothie') || cat.includes('smoothie')) {
    return { slug: 'smoothie', tag: 'Superfood Boost', icon: 'blender' };
  }
  if ((main === 'cold' && sub === 'milkshake') || cat.includes('shake')) {
    return { slug: 'milkshake', tag: 'Glace Artisanale', icon: 'icecream' };
  }
  if ((main === 'cold' && sub === 'iced') || cat.includes('iced') || cat.includes('mojito') || cat.includes('mokhito')) {
    return { slug: 'iced', tag: 'Ultra Givré', icon: 'ac_unit' };
  }
  if ((main === 'pastry' && sub === 'sweet') || cat.includes('pastry') || cat.includes('sweet') || cat.includes('cake') || cat.includes('pancake')) {
    return { slug: 'pastry', tag: 'Pur Beurre AOP', icon: 'cake' };
  }
  if ((main === 'pastry' && sub === 'bread') || cat.includes('bread') || cat.includes('pain') || cat.includes('croissant')) {
    return { slug: 'bread', tag: 'Farine Meule', icon: 'breakfast_dining' };
  }
  return { slug: 'brunch', tag: 'Signature Stitch', icon: 'restaurant' };
}


const ARABIC_GOURMET_TAGS = {
  'Fait minute': 'تحضير فوري',
  'Pain Levain & Bio': 'خبز مخمر طبيعي',
  'Recette Chef': 'وصفة الشيف',
  '100% Arabica': '100% أرابيكا',
  'Barista Choice': 'اختيار الباريستا',
  'Feuilles Entières': 'أوراق شاي كاملة',
  'Pressé minute': 'معصور طازج',
  'Superfood Boost': 'طاقة طبيعية',
  'Glace Artisanale': 'مثلجات حرفية',
  'Ultra Givré': 'مشروب مثلج',
  'Pur Beurre AOP': 'زبدة ممتازة',
  'Farine Meule': 'طحين مطحون',
  'Signature Stitch': 'توقيع ستيتش'
};

const ARABIC_COMBOS = {
  'matin-royal': {
    title: "باقة الصباح الملكي",
    subtitle: "إسبريسو محمص + كرواسون بالزبدة الطبيعية + عصير برتقال طبيعي معصور",
    badge: "☀️ وفر 19 د.م."
  },
  'duo-dejeuner': {
    title: "باقة الغداء الفاخر",
    subtitle: "توست أفوكادو بالسلمون والبيض + سموذي توت العليق الطازج",
    badge: "🥑 اختيار الشيف المميز"
  },
  'pause-gouter': {
    title: "باقة استراحة الشاي والحلويات",
    subtitle: "فلات وايت مخملي ناعم + قطعة تشيز كيك بالليمون المنعش",
    badge: "☕ متعة المذاق 100%"
  }
};

const GOURMET_COMBOS = [
  {
    id: 'matin-royal',
    title: "Formule Matin Royal",
    subtitle: "Espresso Torréfié + Croissant Pur Beurre + Verre d'Orange Pressé",
    price: "29.00",
    oldPrice: "48.00",
    savings: "19.00",
    badge: "☀️ ÉCONOMISEZ 19 DH",
    heroImg: "assets/sweet-butter-croissant.jpg",
    items: [
      { name: "Single Origin Espresso", price: 18, image: "assets/coffee-single-origin-espresso.jpg" },
      { name: "Butter Croissant", price: 18, image: "assets/sweet-butter-croissant.jpg" },
      { name: "Fresh Orange Juice", price: 12, image: "assets/juice-fresh-orange.jpg" }
    ]
  },
  {
    id: 'duo-dejeuner',
    title: "Duo Déjeuner Gourmet",
    subtitle: "Toast Avocat Saumon & Œuf Mollet + Smoothie Baies Sauvages Frais",
    price: "49.00",
    oldPrice: "68.00",
    savings: "19.00",
    badge: "🥑 COUP DE CŒUR DU CHEF",
    heroImg: "assets/toast-avocado.jpg",
    items: [
      { name: "Toast Avocat & Saumon Fumé", price: 48, image: "assets/toast-avocado.jpg" },
      { name: "Raspberry Smoothie", price: 20, image: "../images/sub catégorie images/smoothie/raspberry-smoothie_1150-18529.jpg" }
    ]
  },
  {
    id: 'pause-gouter',
    title: "Pause Goûter Pâtisserie",
    subtitle: "Velvet Flat White Artisanal + Part de Cheesecake Citron Frais",
    price: "32.00",
    oldPrice: "42.00",
    savings: "10.00",
    badge: "☕ 100% PUR PLAISIR",
    heroImg: "assets/coffee-velvet-flat-white.jpg",
    items: [
      { name: "Velvet Flat White", price: 22, image: "assets/coffee-velvet-flat-white.jpg" },
      { name: "Cheese Cake au Citron", price: 20, image: "../images/sub catégorie images/sweets/Chees Cake au Citron.jpg" }
    ]
  }
];

let currentSelectedComboIndex = null;

function renderGourmetComboCard(comboIndex) {
  const activeTh = (typeof window.getStitchActiveTheme === 'function' ? window.getStitchActiveTheme() : localStorage.getItem('stitch_menu_theme')) || 'swiggy-bold';
  if (activeTh === 'classic') return '';

  const idx = comboIndex % GOURMET_COMBOS.length;
  const combo = GOURMET_COMBOS[idx];

  return `
    <div onclick="window.openFormulaModal(${idx})"
      class="gourmet-only-section col-span-full my-3 p-5 rounded-[2.2rem] text-white shadow-2xl relative overflow-hidden border border-white/20 cursor-pointer group hover:scale-[1.01] active:scale-[0.99] transition-all duration-300"
      style="background: linear-gradient(90deg, rgba(16, 9, 5, 0.94) 0%, rgba(28, 15, 9, 0.88) 55%, rgba(16, 9, 5, 0.65) 100%), url('${combo.heroImg}') center/cover no-repeat;">
      
      <div class="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-amber-500/10 blur-2xl pointer-events-none"></div>

      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="space-y-1.5 flex-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-stone-950 text-[10px] font-black uppercase tracking-wider shadow-md">
            <span class="material-symbols-outlined text-[13px]">verified</span>
            <span>${combo.badge}</span>
          </div>
          <h3 class="gourmet-serif text-2xl md:text-3xl font-black tracking-wide text-white leading-tight drop-shadow-sm group-hover:text-amber-300 transition-colors">${combo.title}</h3>
          <p class="text-xs text-white/85 font-medium leading-relaxed max-w-xl">${combo.subtitle}</p>
        </div>
        
        <div class="flex items-center gap-4 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/10 justify-between md:justify-end">
          <div class="text-left md:text-right">
            <span class="text-[11px] text-white/50 line-through block font-bold">${combo.oldPrice} DH</span>
            <div class="flex items-baseline gap-1">
              <span class="text-2xl font-black text-amber-300 font-outfit">${combo.price}</span>
              <span class="text-xs font-black text-amber-400">DH</span>
            </div>
          </div>
          <button type="button" onclick="event.stopPropagation(); window.openFormulaModal(${idx})"
            class="px-5 py-3 rounded-2xl bg-[#FF5200] hover:bg-[#e04800] text-white text-xs font-black uppercase tracking-wider shadow-lg flex items-center gap-2 active:scale-95 transition-all">
            <span class="material-symbols-outlined text-[16px]">visibility</span>
            <span>Voir la formule</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

window.openFormulaModal = function(comboIndex) {
  currentSelectedComboIndex = comboIndex;
  const combo = GOURMET_COMBOS[comboIndex];
  if (!combo) return;

  const modal = document.getElementById('gourmet-combo-modal');
  if (!modal) return;

  const imgEl = document.getElementById('combo-modal-img');
  const titleEl = document.getElementById('combo-modal-title');
  const subEl = document.getElementById('combo-modal-subtitle');
  const badgeEl = document.getElementById('combo-modal-badge');
  const listEl = document.getElementById('combo-modal-items-list');
  const savingsEl = document.getElementById('combo-modal-savings-text');
  const oldPriceEl = document.getElementById('combo-modal-old-price');
  const priceEl = document.getElementById('combo-modal-price');
  const addLabelEl = document.getElementById('combo-modal-add-label');

  if (imgEl) imgEl.src = combo.heroImg;
  if (titleEl) titleEl.textContent = combo.title;
  if (subEl) subEl.textContent = combo.subtitle;
  if (badgeEl) badgeEl.textContent = combo.badge;
  if (savingsEl) savingsEl.textContent = `Économisez ${combo.savings} DH avec cette formule !`;
  if (oldPriceEl) oldPriceEl.textContent = `${combo.oldPrice} DH`;
  if (priceEl) priceEl.textContent = `${combo.price} DH`;
  if (addLabelEl) addLabelEl.textContent = `Prendre la formule (${combo.price} DH)`;

  if (listEl) {
    listEl.innerHTML = combo.items.map(it => `
      <div class="flex items-center justify-between p-2.5 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-200/60 dark:border-white/5">
        <div class="flex items-center gap-3">
          <img src="${it.image}" alt="${it.name}" class="w-11 h-11 rounded-xl object-cover shadow-sm shrink-0" onerror="this.onerror=null;this.src='assets/coffee-single-origin-espresso.jpg'" />
          <div>
            <h4 class="text-xs font-black text-stone-900 dark:text-white">${it.name}</h4>
            <span class="text-[10px] text-stone-400 font-bold">Inclus dans la formule</span>
          </div>
        </div>
        <div class="text-right">
          <span class="text-xs font-black text-stone-700 dark:text-stone-300">${it.price.toFixed(2)} DH</span>
        </div>
      </div>
    `).join('');
  }

  modal.classList.remove('hidden');
  modal.classList.add('flex');
};

window.closeFormulaModal = function() {
  const modal = document.getElementById('gourmet-combo-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
  currentSelectedComboIndex = null;
};

window.confirmAddFormulaToCart = function() {
  if (currentSelectedComboIndex === null) return;
  const combo = GOURMET_COMBOS[currentSelectedComboIndex];
  if (!combo) return;

  let curCart = getStoredCart();
  const existingIndex = curCart.findIndex(x => x.name === combo.title);
  if (existingIndex > -1) {
    curCart[existingIndex].quantity = (curCart[existingIndex].quantity || 1) + 1;
  } else {
    curCart.push({
      id: 'formula-' + combo.id,
      name: combo.title,
      description: combo.subtitle,
      price: parseFloat(combo.price),
      quantity: 1,
      image: combo.heroImg,
      image_url: combo.heroImg,
      category: 'Formule'
    });
  }

  localStorage.setItem('stitch_cart', JSON.stringify(curCart));
  cart = curCart;
  updateCartUI();
  window.closeFormulaModal();

  if (typeof window.showOrderNotification === 'function') {
    window.showOrderNotification(`✨ ${combo.title} ajoutée au panier (${combo.price} DH)`);
  }
};


window.addEventListener('stitchThemeChanged', () => {
  renderCategories();
  renderBestsellers(bestsellers);
});

function renderBestsellers(items) {
  const container = document.getElementById('bestsellers') || document.getElementById('bestsellers-grid');
  if (!container) return;

  if (!items || items.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center bg-white dark:bg-[#2a1e19] rounded-3xl border border-stone-200/80 dark:border-white/10 p-8">
        <span class="material-symbols-outlined text-4xl text-stone-300 mb-2">restaurant_menu</span>
        <p class="text-sm font-bold text-stone-600 dark:text-stone-300">Aucun article trouvé dans cette sélection</p>
        <button type="button" onclick="window.selectTwoLevelCategory('all', 'all', false)" class="mt-3 px-4 py-2 rounded-full bg-primary text-white text-xs font-extrabold">Voir toute la carte</button>
      </div>
    `;
    return;
  }

  const ordered = items;
  let html = '';
  let comboCount = 0;

  ordered.forEach((item, index) => {
    try {
      if (!item) return;

      let imgUrl = normalizeImagePath(item.image || item.image_url);
      const isDefault = imgUrl && imgUrl.includes('photo-1546069901');
      const displayImg = (imgUrl && !isDefault) ? imgUrl : normalizeImagePath(getFallbackImage(item, index));
      const rating = typeof item.rating === 'number' ? item.rating : getRatingForItem(item);
      const fallback = normalizeImagePath(getFallbackImage(item, index + 50));
      
      item._displayImage = displayImg;

      const nameText = (() => {
        try {
          const base = getMenuTranslation(item, 'name') || item.name || 'Unknown Item';
          return getLang() === 'en' ? summarizeEnglishName(canonicalizeEnglishName(base)) : base;
        } catch (e) {
          return item.name || 'Item';
        }
      })();

      const descText = (() => {
        try {
          return getMenuTranslation(item, 'description') || item.description || '';
        } catch (e) {
          return item.description || '';
        }
      })();

      const priceNum = typeof item.price === 'number' ? item.price : parseFloat(item.price || 0);
      const priceText = Number.isInteger(priceNum) ? priceNum.toString() : priceNum.toFixed(2);
      const subMeta = SUB_CAT_METADATA[item.subCat] || { label: item.category || 'Spécialité', icon: getCategoryIcon(item.category) };
      const gourmetMeta = getGourmetCategoryMeta(item);

      const outOfStockIds = (window.stitchSync && typeof window.stitchSync.getOutOfStockIds === 'function')
        ? window.stitchSync.getOutOfStockIds()
        : JSON.parse(localStorage.getItem('stitch_out_of_stock_ids') || '[]');
      const isOutOfStock = outOfStockIds.includes(String(item.id)) || item.stock === 0 || item.is_available === false;
      const langCode = typeof getLang === 'function' ? getLang() : 'fr';
      const outOfStockLabel = langCode === 'ar' ? 'نفد المخزون' : langCode === 'en' ? 'Out of Stock' : 'Épuisé';

      html += `
      <div ${isOutOfStock ? `onclick="event.stopPropagation(); window.showOutOfStockAlert('${nameText.replace(/'/g, "\\'")}')"` : `onclick="addToCart('${item.id}')"`}
        class="gourmet-card gourmet-cat-${gourmetMeta.slug} group ${isOutOfStock ? 'opacity-60 grayscale-[35%] cursor-not-allowed border-red-300/40 dark:border-red-900/30' : 'cursor-pointer'} bg-white dark:bg-[#231915] rounded-[1.6rem] p-3.5 shadow-md border border-stone-200/80 dark:border-white/10 hover:border-primary/50 flex gap-3.5 items-center relative transition-all duration-300 hover:-translate-y-1"
        data-category="${item.category || 'all'}" data-maincat="${item.mainCat || ''}" data-subcat="${item.subCat || ''}">
        
        <div class="swiggy-img-box w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden bg-stone-100 dark:bg-black/25 relative shrink-0 shadow-inner">
          <img id="menu-card-img-${item.id}" src="${displayImg}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="${nameText}" loading="lazy" onerror="this.onerror=null;this.src='${fallback}'">
          <div class="absolute top-1.5 left-1.5 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center gap-0.5 text-white shadow-sm z-10">
            <span class="material-symbols-outlined text-[12px] text-amber-400" style="font-variation-settings: 'FILL' 1">star</span>
            <span class="text-[10px] font-extrabold">${Number(rating).toFixed(1)}</span>
          </div>
          ${isOutOfStock
            ? `<span class="absolute top-1.5 right-1.5 bg-red-600 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-md z-10 flex items-center gap-0.5"><span class="material-symbols-outlined text-[10px]">block</span><span>${outOfStockLabel}</span></span>`
            : `<span class="swiggy-photo-badge absolute top-1.5 right-1.5 gourmet-tag text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-md z-10">${gourmetMeta.tag}</span>`
          }
        </div>

        <div class="flex-1 min-w-0 flex flex-col min-h-[5rem] md:min-h-[5.5rem] justify-between py-0.5 relative z-10">
          <div>
            <div class="flex items-center justify-between gap-2 mb-1">
              <div class="flex items-center gap-1 min-w-0">
                <span class="material-symbols-outlined text-[12px] text-primary shrink-0">${subMeta.icon}</span>
                <span class="text-[10px] font-extrabold uppercase tracking-wider text-stone-400 dark:text-stone-400 truncate">${subMeta.label}</span>
              </div>
              <span class="swiggy-inline-badge gourmet-tag text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 shadow-xs">${gourmetMeta.tag}</span>
            </div>
            <h4 class="font-extrabold text-[14px] md:text-[15px] text-stone-900 dark:text-white leading-snug line-clamp-1 group-hover:text-primary transition-colors">${nameText}</h4>
            <p class="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-2 mt-0.5 leading-snug">${descText}</p>
          </div>

          <div class="flex items-center justify-between mt-1 pt-1 border-t border-stone-100/80 dark:border-white/5">
            <div class="flex items-baseline gap-1">
              <span class="text-base md:text-lg font-black text-stone-900 dark:text-white font-outfit">${priceText}</span>
              <span class="text-[11px] font-black text-primary">${itemCurr}</span>
            </div>
            ${isOutOfStock ? `
            <button type="button" onclick="event.stopPropagation(); window.showOutOfStockAlert('${nameText.replace(/'/g, "\\'")}')"
              class="gourmet-action-btn-disabled px-3.5 py-1.5 rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-500 dark:text-stone-400 text-[11px] font-black uppercase tracking-wider flex items-center gap-1 cursor-not-allowed shadow-none">
              <span class="material-symbols-outlined text-[14px]">block</span>
              <span>${outOfStockLabel}</span>
            </button>
            ` : `
            <button type="button" onclick="event.stopPropagation(); addToCart('${item.id}')"
              class="gourmet-action-btn px-3.5 py-1.5 rounded-xl text-white text-[11px] font-black uppercase tracking-wider flex items-center gap-1 shadow-sm active:scale-95 transition-all">
              <span class="material-symbols-outlined text-[14px]">add</span>
              <span>${getTranslation('add') || 'Ajouter'}</span>
            </button>
            `}
          </div>
        </div>
      </div>
      `;

      // Inject Swiggy-style formula banner every 8 items to change rhythm
      if ((index + 1) % 8 === 0) {
        html += renderGourmetComboCard(comboCount++);
      }

      // (Promo carousels removed from grid to keep cards uniform and normal-sized)
    } catch (err) {
      console.error('Critical error rendering item at index', index, err);
    }
  });

  container.innerHTML = html;
}

function renderSmallPromoCarousel() {
  const variations = [
    { tag: 'Torréfaction Maison', title: 'Arabica Éthiopie G1', desc: 'Notes florales & chocolat noir intense', img: '../images/header images of sub catégorie/black coffee header image .jpg', mainCat: 'brew', subCat: 'black' },
    { tag: 'Matin Gourmand', title: 'Viennoiseries Pur Beurre', desc: 'Cuisson dorée au four chaque matin', img: '../images/sub catégories icons/Breakfast.jpg', mainCat: 'brunch', subCat: 'breakfast' },
    { tag: '100% Naturel', title: 'Smoothies Fruits Frais', desc: 'Mixés à la minute sans sucre ajouté', img: '../images/sub catégorie images/smoothie/raspberry-smoothie_1150-18529.jpg', mainCat: 'cold', subCat: 'smoothie' },
    { tag: 'Artisan Boulanger', title: 'Levain Naturel', desc: 'Pains spéciaux & focaccias maison', img: '../assets/subcat_icons/artisanal bread.jpg', mainCat: 'pastry', subCat: 'bread' },
    { tag: 'Fraîcheur Intense', title: 'Jus Pressés à Froid', desc: 'Oranges du Maroc & cocktails détox', img: '../images/header images of sub catégorie/juces header image.jpg', mainCat: 'cold', subCat: 'juice' },
    { tag: 'Haute Pâtisserie', title: 'Créations du Chef', desc: 'Cheesecakes, tartes & entremets fins', img: '../images/header images of sub catégorie/sweet pastries header image.jpg', mainCat: 'pastry', subCat: 'sweet' },
    { tag: 'Pause Onctueuse', title: 'Milkshakes Signature', desc: 'Chocolat belge, vanille & fruits rouges', img: '../images/header images of sub catégorie/milkshake header image.jpg', mainCat: 'cold', subCat: 'milkshake' },
    { tag: 'Brunch Salé', title: 'Toasts & Avocado', desc: 'Œufs pochés fermiers & pain complet', img: '../images/sub catégorie images/toast/Toast Champignon Frommage.jpg', mainCat: 'brunch', subCat: 'toast' },
    { tag: 'Instant Zen', title: 'Thés & Infusions Bio', desc: 'Thé marocain à la menthe & Matcha', img: '../assets/images/Tea an infussion header image.jpg', mainCat: 'brew', subCat: 'tea' }
  ];

  let slidesHtml = variations.map(v => `
      <div style="width: 11.11111%;" class="shrink-0 h-full relative border border-white/10 group bg-[#1a0f08] flex items-center px-6 shadow-xl">
        <div class="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent z-10"></div>
        <div class="absolute right-0 top-0 bottom-0 w-1/2 opacity-45 group-hover:opacity-65 transition-opacity">
            <img src="${v.img}" class="w-full h-full object-cover">
        </div>
        <div class="relative z-20 flex-1 flex flex-col justify-center py-4">
            <span class="bg-primary/25 text-amber-300 text-[10px] font-extrabold w-fit px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1.5 inline-block border border-amber-400/20">${v.tag}</span>
            <h3 class="text-white font-extrabold text-base md:text-lg leading-tight">${v.title}</h3>
            <p class="text-white/70 text-[11px] mt-0.5">${v.desc}</p>
        </div>
        <div class="relative z-20 flex items-center">
            <button type="button" onclick="window.selectTwoLevelCategory('${v.mainCat}', '${v.subCat}', true)" class="bg-primary text-white text-[11px] font-extrabold px-4 py-2.5 rounded-full uppercase shadow-glow active:scale-95 transition-transform flex items-center gap-1">
                <span>Découvrir</span>
                <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
        </div>
      </div>
  `).join('');

  return `
  <div class="col-span-full my-3">
    <div class="w-full h-24 rounded-[1.75rem] overflow-hidden relative promo-container shadow-md">
      <div class="promo-track-left flex w-[900%] h-full transition-transform duration-500 ease-in-out">
        ${slidesHtml}
      </div>
    </div>
  </div>
  `;
}

function renderBannerPromoCarousel() {
  const variations = [
    { color: 'amber', badge: 'Formule Matin • 55 DH', name: 'Petit-Déj Royal Marocain', desc: 'Boisson chaude + Jus d\'orange frais + Viennoiserie & Amlou', img: '../images/sub catégories icons/Breakfast.jpg', mainCat: 'brunch', subCat: 'breakfast' },
    { color: 'orange', badge: 'Formule Duo • 135 DH', name: 'Brunch Signature pour 2', desc: '2 Plats Brunch au choix + 2 Boissons chaudes + 2 Jus pressés', img: '../images/sub catégorie images/toast/Toast Champignon Frommage.jpg', mainCat: 'brunch', subCat: 'toast' },
    { color: 'rose', badge: 'Pause Goûter • 48 DH', name: 'Duo Pâtisserie & Latte', desc: 'Gâteau artisanal du Chef + Cappuccino ou Matcha Latte', img: '../images/header images of sub catégorie/sweet pastries header image.jpg', mainCat: 'pastry', subCat: 'sweet' },
    { color: 'emerald', badge: 'Formule Détox • 42 DH', name: 'Toast Avocat & Smoothie', desc: 'Tartine avocat œuf poché + Smoothie fruits rouges frais', img: '../images/sub catégorie images/smoothie/raspberry-smoothie_1150-18529.jpg', mainCat: 'cold', subCat: 'smoothie' },
    { color: 'amber', badge: 'Tradition • 35 DH', name: 'Thé Menthe & Pâtisseries', desc: 'Théière marocaine traditionnelle + Assortiment sucré', img: '../assets/images/Tea an infussion header image.jpg', mainCat: 'brew', subCat: 'tea' },
    { color: 'orange', badge: 'Menu Gourmand • 75 DH', name: 'Burger Artisan & Boisson', desc: 'Burger brioché maison + Frites dorées + Jus ou Soda frais', img: '../images/sub catégories icons/Snack Food.jpg', mainCat: 'brunch', subCat: 'fastfood' },
    { color: 'blue', badge: 'Fraîcheur • 38 DH', name: 'Duo Milkshake & Cookie', desc: 'Milkshake onctueux + Cookie géant aux pépites de chocolat', img: '../images/header images of sub catégorie/milkshake header image.jpg', mainCat: 'cold', subCat: 'milkshake' },
    { color: 'amber', badge: 'Barista • 32 DH', name: 'Espresso & Croissant Doré', desc: 'Double Espresso Arabica + Croissant pur beurre chaud', img: '../images/header images of sub catégorie/black coffee header image .jpg', mainCat: 'brew', subCat: 'black' },
    { color: 'orange', badge: 'Boulangerie • 45 DH', name: 'Panier Boulanger Maison', desc: 'Sélection de pains au levain, beurre fermier & miel pur', img: '../assets/subcat_icons/artisanal bread.jpg', mainCat: 'pastry', subCat: 'bread' }
  ];

  let slidesHtml = variations.map(theme => `
      <div style="width: 11.11111%;" class="shrink-0 h-full relative group">
        <div class="w-full h-full bg-gradient-to-r from-stone-50 via-orange-50/60 to-amber-50/80 dark:from-stone-900 dark:to-stone-800 border border-stone-200/80 dark:border-white/10 relative overflow-hidden flex items-center p-5 shadow-md">
          <div class="relative z-10 w-full flex justify-between items-center gap-4">
              <div class="flex-1 min-w-0">
                  <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-extrabold text-[10px] uppercase tracking-wider mb-1">
                    <span class="material-symbols-outlined text-[12px]">verified</span>
                    ${theme.badge}
                  </span>
                  <p class="font-extrabold text-base md:text-lg text-stone-900 dark:text-white leading-tight truncate">${theme.name}</p>
                  <p class="text-[11px] text-stone-500 dark:text-stone-400 truncate mt-0.5">${theme.desc}</p>
                  <button type="button" onclick="window.selectTwoLevelCategory('${theme.mainCat}', '${theme.subCat}', true)" class="mt-2 inline-flex items-center gap-1.5 text-primary text-[11px] font-extrabold uppercase tracking-wider cursor-pointer hover:gap-2.5 transition-all">
                      <span>Voir la sélection</span> 
                      <span class="material-symbols-outlined text-[15px]">arrow_forward</span>
                  </button>
              </div>
              <div class="shrink-0">
                  <div class="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden shadow-lg border-2 border-white dark:border-white/10">
                      <img src="${theme.img}" class="w-full h-full object-cover" alt="${theme.name}">
                  </div>
              </div>
          </div>
        </div>
      </div>
  `).join('');

  return `
  <div class="col-span-full my-3">
    <div class="w-full h-[124px] rounded-[1.75rem] overflow-hidden relative promo-container shadow-sm">
      <div class="promo-track-right flex w-[900%] h-full transition-transform duration-500 ease-in-out" style="transform: translateX(-88.8888%);">
        ${slidesHtml}
      </div>
    </div>
  </div>
  `;
}

// Global Carousel Animation logic
let promoCarouselIndex = 0;
let promoCarouselInterval = null;

function startPromoCarousels() {
  if (promoCarouselInterval) clearInterval(promoCarouselInterval);

  const rightTracks = document.querySelectorAll('.promo-track-right');
  rightTracks.forEach(track => {
    track.style.transform = `translateX(-88.8888%)`;
  });

  promoCarouselInterval = setInterval(() => {
    promoCarouselIndex = (promoCarouselIndex + 1) % 9;
    
    const leftTracks = document.querySelectorAll('.promo-track-left');
    leftTracks.forEach(track => {
      track.style.transform = `translateX(-${promoCarouselIndex * 11.1111}%)`;
    });

    const rightTracks = document.querySelectorAll('.promo-track-right');
    rightTracks.forEach(track => {
      const reverseIndex = 8 - promoCarouselIndex;
      track.style.transform = `translateX(-${reverseIndex * 11.1111}%)`;
    });
  }, 3500);
}

function renderCategories() {
  const subCategories = [
    { mainCat: 'brunch', subCat: 'breakfast', name: 'Petit-Déjeuner', img: '../images/sub catégories icons/Breakfast.jpg' },
    { mainCat: 'brunch', subCat: 'toast', name: 'Toasts & Brunch', img: '../images/sub catégories icons/sandwich or toast icon .jpg' },
    { mainCat: 'brunch', subCat: 'fastfood', name: 'Burgers & Snacks', img: '../images/sub catégories icons/Snack Food.jpg' },
    { mainCat: 'brew', subCat: 'black', name: 'Cafés Noirs', img: '../images/sub catégories icons/black coffe icon.jpg' },
    { mainCat: 'brew', subCat: 'latte', name: 'Lattes & Crémeux', img: '../images/sub catégories icons/latté icon.jpg' },
    { mainCat: 'brew', subCat: 'tea', name: 'Thés & Infusions', img: '../images/sub catégories icons/tea icon .png' },
    { mainCat: 'cold', subCat: 'juice', name: 'Jus Frais', img: '../images/sub catégories icons/juces icon.png' },
    { mainCat: 'cold', subCat: 'smoothie', name: 'Smoothies', img: '../images/sub catégories icons/smoothie icon.png' },
    { mainCat: 'cold', subCat: 'milkshake', name: 'Milkshakes', img: '../images/sub catégories icons/milkshake icon.png' },
    { mainCat: 'cold', subCat: 'iced', name: 'Iced Drinks', img: '../images/sub catégories icons/Cold drinks icon.jpg' },
    { mainCat: 'pastry', subCat: 'sweet', name: 'Pâtisseries', img: '../images/sub catégories icons/sweet pastry icon.png' },
    { mainCat: 'pastry', subCat: 'bread', name: 'Boulangerie', img: '../images/sub catégories icons/pastry,.jpg' }
  ];

  const container = document.getElementById('explore-categories');
  if (!container) return;

  container.innerHTML = subCategories.map(cat => {
    const isSelected = activeSubCat === cat.subCat;
    return `
    <div class="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group" onclick="window.selectTwoLevelCategory('${cat.mainCat}', '${cat.subCat}', true)">
      <div class="p-[2.5px] rounded-full ${isSelected ? 'bg-primary shadow-md scale-105' : 'bg-stone-200 dark:bg-stone-700 group-hover:bg-primary'} transition-all">
        <div class="bg-white dark:bg-[#1a100c] p-0.5 rounded-full">
          <div class="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden relative">
            <img src="${cat.img}" alt="${cat.name}" loading="lazy" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" onerror="this.onerror=null;this.src='../assets/waiter.jpg'">
          </div>
        </div>
      </div>
      <p class="text-[11px] font-bold ${isSelected ? 'text-primary' : 'text-stone-700 dark:text-stone-200'} text-center leading-tight max-w-[5.5rem] truncate">${cat.name}</p>
    </div>
  `;
  }).join('');
}

window.selectTwoLevelCategory = function(mainCat = 'all', subCat = 'all', scrollIntoView = false) {
  activeMainCat = mainCat || 'all';
  activeSubCat = subCat || 'all';

  const sourceItems = (typeof window !== 'undefined' && Array.isArray(window.allMenuItems) && window.allMenuItems.length > 0) ? window.allMenuItems : ((typeof allMenuItems !== 'undefined' && Array.isArray(allMenuItems) && allMenuItems.length > 0) ? allMenuItems : (bestsellers || []));
  let filtered = sourceItems;

  if (activeMainCat !== 'all') {
    filtered = filtered.filter(i => i.mainCat === activeMainCat);
  }
  if (activeSubCat !== 'all') {
    filtered = filtered.filter(i => i.subCat === activeSubCat);
  }

  // Update Level 1 Main Category Pills
  document.querySelectorAll('.sticky-main-pill').forEach(btn => {
    const cat = btn.getAttribute('data-maincat');
    const isActive = cat === activeMainCat;
    btn.className = isActive
      ? 'sticky-main-pill shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-white text-xs font-extrabold shadow-sm transition-all'
      : 'sticky-main-pill shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white dark:bg-white/5 text-stone-700 dark:text-stone-200 border border-stone-200/90 dark:border-white/10 text-xs font-bold hover:border-primary/40 transition-all';
  });

  // Update Level 2 Sub-Category Pills
  const subRow = document.getElementById('sticky-subcat-row');
  if (subRow) {
    const subKeys = Object.keys(SUB_CAT_METADATA).filter(k => activeMainCat === 'all' || SUB_CAT_METADATA[k].mainCat === activeMainCat);
    const allCount = activeMainCat === 'all'
      ? sourceItems.length
      : sourceItems.filter(i => i.mainCat === activeMainCat).length;

    let subHtml = `
      <button type="button" onclick="window.selectTwoLevelCategory('${activeMainCat}', 'all', false)"
        class="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-extrabold transition-all ${activeSubCat === 'all' ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900 shadow-sm' : 'bg-stone-100 dark:bg-white/5 text-stone-600 dark:text-stone-300 hover:bg-stone-200/70'}">
        <span class="material-symbols-outlined text-[13px]">apps</span>
        <span>${(typeof getLang === 'function' && getLang() === 'ar') ? 'الكل' : 'Tout'} (${allCount})</span>
      </button>
    `;

    subKeys.forEach(subKey => {
      const meta = SUB_CAT_METADATA[subKey];
      const count = sourceItems.filter(i => i.subCat === subKey).length;
      const isSubActive = activeSubCat === subKey;
      subHtml += `
        <button type="button" onclick="window.selectTwoLevelCategory('${meta.mainCat}', '${subKey}', false)"
          class="shrink-0 inline-flex items-center gap-1.5 pr-3 pl-1.5 py-1 rounded-full text-[11px] font-bold transition-all border ${isSubActive ? 'bg-primary/10 border-primary text-primary font-extrabold shadow-sm' : 'bg-white dark:bg-white/5 border-stone-200/80 dark:border-white/10 text-stone-700 dark:text-stone-300 hover:border-primary/40'}">
          <img src="${meta.img}" alt="" class="w-5 h-5 rounded-full object-cover" onerror="this.style.display='none'">
          <span>${(typeof getLang === 'function' && getLang() === 'ar' && typeof ARABIC_SUBCAT_LABELS !== 'undefined' && ARABIC_SUBCAT_LABELS[subKey]) ? ARABIC_SUBCAT_LABELS[subKey] : meta.label}</span>
          <span class="text-[10px] opacity-65">(${count})</span>
        </button>
      `;
    });
    subRow.innerHTML = subHtml;
  }

  // Update Section Title & Kicker
  const titleEl = document.getElementById('active-category-title');
  const kickerEl = document.getElementById('active-category-kicker');
  if (activeSubCat !== 'all' && SUB_CAT_METADATA[activeSubCat]) {
    const sMeta = SUB_CAT_METADATA[activeSubCat];
    if (titleEl) titleEl.textContent = sMeta.label;
    if (kickerEl) kickerEl.textContent = `${MAIN_CAT_LABELS[sMeta.mainCat]?.title || 'Sélection'} • ${filtered.length} Articles`;
  } else {
    const mMeta = MAIN_CAT_LABELS[activeMainCat] || MAIN_CAT_LABELS.all;
    if (titleEl) titleEl.textContent = mMeta.title;
    if (kickerEl) kickerEl.textContent = `${mMeta.kicker.split('•')[0]} • ${filtered.length} Articles`;
  }

  renderCategories();
  renderBestsellers(filtered);

  if (scrollIntoView) {
    const anchor = document.getElementById('menu-sticky-anchor') || document.getElementById('luxury-sticky-nav');
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
};

function getCategoryIcon(cat) {
  const icons = {
    'Brew': 'coffee',
    'Cold Brew': 'coffee', // Added Cold Brew
    'Pastry': 'bakery_dining',
    'Brunch': 'brunch_dining',
    'Cold Drink': 'local_bar',
    'Tea': 'emoji_food_beverage',
    'Coffee': 'coffee',
    'Juice': 'local_drink',
    'Smoothie': 'blender',
    'Shake': 'icecream',
    'Bread': 'breakfast_dining',
    'Toast': 'breakfast_dining',
    'Fast Food': 'fastfood'
  };
  return icons[cat] || 'restaurant';
}

function getRatingForItem(item) {
  const map = {
    'Coffee': 4.5,
    'Cold Brew': 4.5,
    'Tea': 4.4,
    'Juice': 4.3,
    'Smoothie': 4.4,
    'Shake': 4.3,
    'Pastry': 4.5,
    'Brunch': 4.4,
    'Toast': 4.3,
    'Bread': 4.4,
    'Fast Food': 4.6
  };
  const base = map[item.category] || 4.4;
  return base;
}

function buildCustomizationUrl(item) {
  if (!item) return '../pure_noir_espresso_customization_view_1/index.html';
  const category = (item.category || '').toLowerCase();
  let customizationPage = '../brunch_customization_view/index.html';
  if (category.includes('brunch') || category.includes('toast')) {
    customizationPage = '../toast_brunch_customization_view/index.html';
  } else if (category.includes('tea') || category.includes('infusion')) {
    customizationPage = '../tea_customization_view/index.html';
  } else if (category.includes('coffee') || category.includes('brew')) {
    customizationPage = '../pure_noir_espresso_customization_view_1/index.html';
  } else if (category.includes('pastry') || category.includes('bakery')) {
    customizationPage = '../sweet_pastries_customization_view/index.html';
  } else if (category.includes('fast food')) {
    customizationPage = '../fast_food_customization_view/index.html';
  } else if (category.includes('bread')) {
    customizationPage = '../petit pain bakery_customization_view/index.html';
  } else if (category.includes('juice') || category.includes('drink')) {
    customizationPage = '../orange juce_customization_view_1/index.html';
  } else if (category.includes('smoothie')) {
    customizationPage = '../smothie customisation review/index.html';
  } else if (category.includes('milkshake') || category.includes('shake')) {
    customizationPage = '../milkshake_customization_view/index.html';
  }

  // Use the stored display image if available, else original, else fallback
  let imgPath = normalizeImagePath(item._displayImage || item.image || getFallbackImage(item, 0));

  const isDelivery = (typeof window.getStitchOrderMode === 'function' ? window.getStitchOrderMode() : localStorage.getItem('stitch_order_mode')) === 'delivery';

  const params = new URLSearchParams({
    id: item.id || '',
    name: item.name || '',
    price: item.price ?? '',
    image: imgPath,
    category: item.category || ''
  });

  if (isDelivery) {
    params.set('mode', 'delivery');
  } else if (currentTable && currentTable !== 'Livraison') {
    params.set('table', currentTable);
  }

  return `${customizationPage}?${params.toString()}`;
}

function getFallbackImage(item, seed = 0) {
  // Try to match specific keywords in name to local assets
  const name = item.name.toLowerCase();
  if (name.includes('milkshake')) return '../images/sub catégorie images/milshake/close-up-milkshake-glass-plate_.jpg';
  if (name.includes('smoothie')) return '../images/sub catégorie images/smoothie/raspberry-smoothie_1150-18529.jpg';
  if (name.includes('juice') || name.includes('orange')) return '../images/sub catégorie images/Jus/glass-iced-orange-cocktail-garnished-with-orange-zest-strawberry-shape_140725-6038.avif';
  if (name.includes('tea')) return '../images/sub catégorie images/tea/Tea Citron Délise.jpg';
  if (name.includes('toast') || name.includes('benedict')) return '../images/sub catégorie images/toast/Toast Champignon Frommage.jpg';
  if (name.includes('pancake')) return '../images/sub catégorie images/sweets/vertical-shot-pancakes-with-fruits-top_181624-23923.jpg';
  if (name.includes('pastry') || name.includes('croissant')) return '../images/sub catégorie images/sweets/French Toast.jpg';
  if (name.includes('mango')) return '../images/sub catégorie images/Jus/delicious-indian-mango-drink-high-angle_23-2148734680.avif';

  // Fallback pool of local images
  const pool = [
    '../images/sub catégorie images/Brunch food/Salade Cesar.jpg',
    '../images/sub catégorie images/Brunch food/Salade Mexicaine.jpg',
    '../images/sub catégorie images/Brunch food/Pumpkin Stew.jpg',
    '../images/sub catégorie images/sweets/panne cake with berries .png',
    '../images/sub catégorie images/Jus/colorful-cocktail-with-orange-slice-cocktail-umbrella-green-black-straw_140725-10521.avif',
    '../images/sub catégorie images/tea/Tea Nordique.jpg',
    '../images/sub catégorie images/black coffee/Café Noir Italien.jpg',
    '../images/sub catégorie images/sweets/Orange Chesse Cake.jpg'
  ];

  // Deterministic selection based on item name char code sum + seed
  const safeName = item.name || 'item';
  const hash = safeName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + seed;
  return pool[hash % pool.length];
}

function startHeroCarousel() {
  console.log('Hero carousel is disabled in this script. using carousel-auto-loop.js instead.');
  return;
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Cart (single source of truth in stitch_cart)
  localStorage.removeItem('stitch_last_order');
  cart = getStoredCart();
  updateCartUI();

  fetchBestsellers();
  renderCategories();
  handleTableContext();
  // startHeroCarousel(); // Disabled - using auto-loop instead
  startPromoCarousels();
  initSearch();
  setupEvents();
  if (typeof window.updateGlobalCartCount === 'function') {
    window.updateGlobalCartCount();
  }
});

function handleTableContext() {
  const mode = (typeof window.getStitchOrderMode === 'function')
    ? window.getStitchOrderMode()
    : ((new URLSearchParams(window.location.search).get('mode') === 'delivery') ? 'delivery' : 'dine_in');

  window.syncHeaderOrderModeUI(mode);

  if (mode === 'delivery') return;
  if (!currentTable) return;

  // Check Reservation Status for Dine-In Table
  const reservations = JSON.parse(localStorage.getItem('stitch_reservations') || '[]');
  const isReserved = reservations.some(res => String(res.tableId) === String(currentTable) && res.status === 'Occupied');

  if (isReserved) {
    showReservationOverlay();
  }

  // Check Table Conflict Warning (Preparing order on this table)
  checkAndRenderTableConflictBanner();
}

window.syncHeaderOrderModeUI = function(mode) {
  const tableRow = document.getElementById('header-table-mode-row');
  const deliveryRow = document.getElementById('header-delivery-mode-row');
  const badge = document.getElementById('table-badge');
  const btnDine = document.getElementById('header-btn-dinein');
  const btnTake = document.getElementById('header-btn-takeaway');

  if (mode === 'delivery') {
    if (tableRow) {
      tableRow.classList.add('hidden');
      tableRow.classList.remove('flex');
    }
    if (deliveryRow) {
      deliveryRow.classList.remove('hidden');
      deliveryRow.classList.add('flex');
    }
    if (badge) {
      badge.innerHTML = `
        <div class="w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-br from-primary to-amber-500 rounded-full flex items-center justify-center shadow-sm shrink-0">
          <span class="material-symbols-outlined text-[13px] text-white">two_wheeler</span>
        </div>
        <div class="min-w-0 flex flex-col leading-none">
          <span class="text-xs font-black tracking-tight text-stone-900 truncate">Livraison</span>
          <span class="text-[9px] font-bold text-amber-700 truncate">À domicile</span>
        </div>
      `;
      badge.classList.remove('hidden');
    }
  } else {
    if (tableRow) {
      tableRow.classList.remove('hidden');
      tableRow.classList.add('flex');
    }
    if (deliveryRow) {
      deliveryRow.classList.add('hidden');
      deliveryRow.classList.remove('flex');
    }
    if (badge) {
      const zoneName = getTableZone(currentTable);
      badge.innerHTML = `
        <div class="w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center shadow-sm shrink-0">
          <span class="material-symbols-outlined text-[13px] sm:text-[14px] text-white">restaurant</span>
        </div>
        <div class="min-w-0 flex flex-col leading-none">
          <span class="text-xs font-black tracking-tight text-stone-900 truncate">Table ${currentTable || '12'}</span>
          <span class="text-[9px] font-bold text-amber-700 truncate">${zoneName}</span>
        </div>
      `;
      badge.classList.remove('hidden');
    }

    if (btnDine && btnTake) {
      if (mode === 'takeaway') {
        btnTake.className = 'header-btn flex items-center gap-1.5 bg-white text-stone-900 px-4 py-2 rounded-full text-xs font-extrabold shadow-md transition-all duration-300';
        btnDine.className = 'header-btn flex items-center gap-1.5 bg-transparent text-white/90 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 hover:bg-white/10';
      } else {
        btnDine.className = 'header-btn flex items-center gap-1.5 bg-white text-stone-900 px-4 py-2 rounded-full text-xs font-extrabold shadow-md transition-all duration-300';
        btnTake.className = 'header-btn flex items-center gap-1.5 bg-transparent text-white/90 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 hover:bg-white/10';
      }
    }
  }
};

window.openTableServicesModal = function() {
  const modal = document.getElementById('table-services-modal');
  const title = document.getElementById('service-modal-table-title');
  const feedback = document.getElementById('table-service-feedback');
  if (title) title.textContent = `Services Table ${currentTable || '12'}`;
  if (feedback) feedback.classList.add('hidden');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

window.closeTableServicesModal = function() {
  const modal = document.getElementById('table-services-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

window.sendTableServiceAlert = async function(type, label) {
  const feedback = document.getElementById('table-service-feedback');
  const payload = {
    table: String(currentTable || '12'),
    type: type || 'waiter',
    label: label || 'Appel Serveur'
  };

  try {
    const alerts = JSON.parse(localStorage.getItem('stitch_table_alerts') || '[]');
    alerts.unshift({ id: 'ALT-' + Date.now(), ...payload, time: Date.now() });
    localStorage.setItem('stitch_table_alerts', JSON.stringify(alerts.slice(0, 30)));
    if (window.stitchSync && typeof window.stitchSync.sendTableAlert === 'function') {
      try { window.stitchSync.sendTableAlert(payload); } catch (_) {}
    }
  } catch (_) {}

  try {
    await fetch(`${window.location.origin}/api/table-alerts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (_) {}

  if (feedback) {
    feedback.textContent = `✓ ${label} envoyé pour la Table ${currentTable || '12'}. Un serveur arrive !`;
    feedback.classList.remove('hidden');
  }
  setTimeout(() => {
    window.closeTableServicesModal();
  }, 1600);
};

function showReservationOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex flex-col items-center justify-center p-8 text-center text-white';
  overlay.innerHTML = `
    <div class="w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center mb-6 border border-primary/30">
        <span class="material-symbols-outlined text-[48px] text-primary">event_busy</span>
    </div>
    <h2 class="text-3xl font-serif italic mb-2">Table Reserved</h2>
    <p class="text-gray-400 mb-8 max-w-xs">This table is currently booked for a client. Please see our staff for assistance.</p>
    <button onclick="window.history.back()" class="bg-primary text-white px-8 py-4 rounded-2xl font-bold shadow-glow">Go Back</button>
  `;
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
}

// Intercept Place Order to sync with Dashboard
const originalPlaceOrder = window.placeOrder; // Not defined yet or defined differently
window.placeOrder = () => {
  if (cart.length === 0) return;

  const orderData = {
    id: 'ORD-' + Math.floor(Math.random() * 10000).toString().padStart(3, '0'),
    table: currentTable || 'Online',
    items: cart,
    total: cart.reduce((acc, item) => acc + (item.price * item.quantity), 0),
    status: 'Received',
    time: Date.now()
  };

  // 1. Sync to LocalStorage for Dashboard
  const liveOrders = JSON.parse(localStorage.getItem('stitch_live_orders') || '[]');
  liveOrders.push(orderData);
  localStorage.setItem('stitch_live_orders', JSON.stringify(liveOrders));

  // 2. Clear Cart and Notify
  cart = [];
  localStorage.removeItem('cart');
  renderCart();

  // Custom success view
  showOrderSuccess(orderData.id);
};

function showOrderSuccess(orderId) {
  const success = document.createElement('div');
  success.className = 'fixed inset-0 bg-white dark:bg-[#1a100c] z-[110] flex flex-col items-center justify-center p-8 text-center';
  success.innerHTML = `
        <div class="w-32 h-32 bg-green-500/10 rounded-full flex items-center justify-center mb-8 relative">
            <div class="absolute inset-0 bg-green-500/5 rounded-full animate-ping"></div>
            <span class="material-symbols-outlined text-[64px] text-green-500">check_circle</span>
        </div>
        <h2 class="text-3xl font-serif italic mb-2">Order Confirmed!</h2>
        <p class="text-gray-500 mb-2">Your order <span class="font-bold text-primary">#${orderId}</span> is now being prepared.</p>
        <p class="text-xs text-gray-400 mb-10">We'll bring it to your table shortly.</p>
        <button onclick="location.reload()" class="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-10 py-4 rounded-2xl font-bold">Done</button>
    `;
  document.body.appendChild(success);
}

window.navigateToCategory = (category) => {
  const categoryId = category.toLowerCase();

  // Navigation logic for Main Categories
  if (categoryId === 'brew') {
    window.location.href = '../Brew catégorie page/index.html';
    return;
  }
  if (categoryId === 'bakery' || categoryId === 'pastry') {
    window.location.href = '../artisanal bread sub catégorie page/index.html'; // Assuming this is where artisan bread/pastry is
    return;
  }
  if (categoryId === 'sweet pastries') {
    window.location.href = '../sweet pastries sub catégorie page/index.html';
    return;
  }
  if (categoryId === 'fast food') {
    window.location.href = '../fast food sub catégorie page/index.html';
    return;
  }
  if (categoryId === 'cold drink') {
    window.location.href = '../cold drinks catégorie page/index.html';
    return;
  }
  if (categoryId === 'branch') {
    console.log('Branch category selected');
  }
  if (categoryId === 'brunch') {
    window.location.href = '../long_scroll_brunch_explorer/index.html';
    return;
  }
  if (categoryId === 'toast') {
    window.location.href = '../toast brunch sub catégorie page/index.html';
    return;
  }
  if (categoryId === 'tea' || categoryId === 'tea & infusion') {
    window.location.href = '../tea and infusion sub catégorie page/index.html';
    return;
  }
  if (categoryId === 'milkshake' || categoryId === 'shake') { // Added shake alias
    window.location.href = '../milkshake sub catégorie page/index.html';
    return;
  }
  if (categoryId === 'juice') {
    window.location.href = '../juces sub catégorie page/index.html';
    return;
  }
  if (categoryId === 'black coffee') {
    window.location.href = '../black coffee sub catégorie page/index.html';
    return;
  }
  if (categoryId === 'latte') {
    window.location.href = '../latté hot drink sub catégorie page/index.html';
    return;
  }
  if (categoryId === 'creme') { // Added creme
    window.location.href = '../creme or latté fuite juces sub catégorie page/index.html';
    return;
  }
  if (categoryId === 'smoothie') {
    window.location.href = '../smothie sub catégorie page/index.html';
    return;
  }
  if (categoryId === 'artisanal bread' || categoryId === 'bread') { // Added bread alias
    window.location.href = '../artisanal bread sub catégorie page/index.html';
    return;
  }

  // Fallback to filtering if something goes wrong, though paths should cover all
  filterByCategory(category);
};

window.filterByCategory = (category) => {
  const filtered = bestsellers.filter(i => i.category === category);
  renderBestsellers(filtered);
};

window.addToCart = (id) => {
  const outOfStockIds = (window.stitchSync && typeof window.stitchSync.getOutOfStockIds === 'function')
    ? window.stitchSync.getOutOfStockIds()
    : JSON.parse(localStorage.getItem('stitch_out_of_stock_ids') || '[]');

  if (outOfStockIds.includes(String(id))) {
    const itemObj = (typeof allMenuItems !== 'undefined' ? allMenuItems.find(i => String(i.id) === String(id)) : null) || (typeof bestsellers !== 'undefined' ? bestsellers.find(i => String(i.id) === String(id)) : null);
    window.showOutOfStockAlert(itemObj ? itemObj.name : 'Produit');
    return;
  }
  const itemFromBestsellers = bestsellers.find(i => i.id === id);
  const itemFromAll = typeof allMenuItems !== 'undefined' ? allMenuItems.find(i => i.id === id) : null;
  const item = itemFromBestsellers || itemFromAll;
  if (!item) {
    window.location.href = '../pure_noir_espresso_customization_view_1/index.html';
    return;
  }

  const cardImg = document.getElementById(`menu-card-img-${id}`);
  if (cardImg && cardImg.getAttribute('src')) {
    item._displayImage = cardImg.getAttribute('src');
  }

  localStorage.setItem('stitch_customizing_item', JSON.stringify(item));
  window.location.href = buildCustomizationUrl(item);
};

function updateCartUI() {
  const badge = document.getElementById('cart-items-text');
  if (badge) {
    const total = cart.reduce((acc, item) => acc + item.quantity, 0);
    const itemsText = getTranslation('items');
    badge.textContent = `${total} ${itemsText}`;
    badge.classList.toggle('hidden', total === 0);
  }
}

function openOrderModal() {
  if (typeof window.openStitchCartModal === 'function') {
    window.openStitchCartModal();
    return;
  }
  const modal = document.getElementById('order-modal');
  if (modal) {
    modal.classList.remove('hidden');
    renderCartItems();
  }
}

function closeOrderModal() {
  const modal = document.getElementById('order-modal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

function renderCartItems() {
  const container = document.getElementById('order-items');
  const subtotalEl = document.getElementById('modal-subtotal');
  const taxEl = document.getElementById('modal-tax');
  const totalEl = document.getElementById('modal-total');

  if (!container) return;

  container.innerHTML = '';

  let subtotal = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    const div = document.createElement('div');
    div.className = 'flex items-center gap-3 bg-gray-50 dark:bg-white/5 p-3 rounded-xl';

    // Get translated name
    const itemName = getMenuTranslation(item, 'name');

    div.innerHTML = `
      <div class="w-12 h-12 rounded-lg overflow-hidden shrink-0">
        <img src="${item.image}" class="w-full h-full object-cover" alt="${itemName}">
      </div>
      <div class="flex-1 min-w-0">
        <h4 class="font-bold text-sm truncate dark:text-white">${itemName}</h4>
        <div class="flex items-center gap-2 mt-1">
          <span class="text-xs text-gray-500 dark:text-gray-400">${item.price}DH</span>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <button onclick="updateItemQuantity('${item.id}', -1)" class="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold">-</button>
        <span class="text-sm font-bold w-4 text-center dark:text-white">${item.quantity}</span>
        <button onclick="updateItemQuantity('${item.id}', 1)">ADD</button>
      </div>
    `;
    container.appendChild(div);
  });

  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  if (subtotalEl) subtotalEl.textContent = `${subtotal.toFixed(2)}DH`;
  if (taxEl) taxEl.textContent = `${tax.toFixed(2)}DH`;
  if (totalEl) totalEl.textContent = `${total.toFixed(2)}DH`;
}

window.updateItemQuantity = (id, change) => {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.id !== id);
    }
    updateCartUI();
    renderCartItems();
    localStorage.setItem('stitch_cart', JSON.stringify(cart));
  }
};

// Helper to get stored cart
function getStoredCart() {
  if (typeof window.getStitchCart === 'function') {
    return window.getStitchCart();
  }
  try {
    const stored = JSON.parse(localStorage.getItem('stitch_cart') || '[]');
    return Array.isArray(stored) ? stored.map(i => ({
      ...i,
      quantity: i.quantity ?? i.qty ?? 1,
      qty: i.qty ?? i.quantity ?? 1,
      image: i.image || i.image_url || '../assets/waiter.jpg'
    })) : [];
  } catch {
    return [];
  }
}

// Setup basic events
function setupEvents() {
  // Search button is now handled by initSearch input listener
  // but we can add a focus shortcut here if needed
  const searchBtn = document.querySelector('.material-symbols-outlined.text-xl'); 
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      document.getElementById('search-input')?.focus();
    });
  }

  const cartBtn = document.getElementById('view-cart-btn');
  if (cartBtn) {
    cartBtn.addEventListener('click', openOrderModal);
  }

  const closeBtn = document.getElementById('order-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeOrderModal);
  }

  const placeOrderBtn = document.getElementById('order-place-btn');
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', placeOrder);
  }
}

async function placeOrder() {
  if (typeof window.submitStitchLiveOrder === 'function') {
    await window.submitStitchLiveOrder();
    return;
  }
  cart = getStoredCart();
  if (cart.length === 0) {
    alert(getTranslation('cart_empty') || "Your cart is empty!");
    return;
  }
  const total = cart.reduce((acc, item) => acc + (item.price * (item.quantity || item.qty || 1)), 0);
  const orderId = 'ORD-' + Math.floor(100 + Math.random() * 900) + '-' + String(Date.now()).slice(-3);
  const isDelivery = (typeof window.getStitchOrderMode === 'function' ? window.getStitchOrderMode() : localStorage.getItem('stitch_order_mode')) === 'delivery';
  const tableLabel = isDelivery ? 'Livraison' : (currentTable || '12');

  const payload = {
    id: orderId,
    table: tableLabel,
    orderType: isDelivery ? 'delivery' : 'dine_in',
    customerName: localStorage.getItem('stitch_customer_name') || (isDelivery ? (localStorage.getItem('stitch_delivery_name') || 'Client Livraison') : 'Guest'),
    deliveryPhone: isDelivery ? localStorage.getItem('stitch_delivery_phone') : undefined,
    deliveryAddress: isDelivery ? localStorage.getItem('stitch_delivery_address') : undefined,
    deliveryGps: isDelivery ? localStorage.getItem('stitch_delivery_gps') : undefined,
    paymentMethod: localStorage.getItem('stitch_payment_method') || 'cash',
    items: cart.map(item => ({
      name: getMenuTranslation(item, 'name') || item.name,
      qty: item.quantity || item.qty || 1,
      price: item.price,
      image_url: item.image || item.image_url || ''
    })),
    total: Number(total.toFixed(2)),
    status: 'Received',
    time: Date.now()
  };
  try {
    await fetch(`${window.location.origin}/api/live-orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (_) {}
  const liveOrders = JSON.parse(localStorage.getItem('stitch_live_orders') || '[]');
  liveOrders.push(payload);
  localStorage.setItem('stitch_live_orders', JSON.stringify(liveOrders));
  localStorage.setItem('stitch_active_customer_order', JSON.stringify(payload));
  cart = [];
  localStorage.removeItem('stitch_cart');
  updateCartUI();
  closeOrderModal();
  window.location.href = `../order_success_page/index.html?orderId=${encodeURIComponent(orderId)}&table=${encodeURIComponent(payload.table)}${isDelivery ? '&mode=delivery' : ''}`;
}

// Menu translations are now managed globally in i18n.js

function canonicalizeEnglishName(s) {
  if (!s || typeof s !== 'string') return s;
  let t = s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  t = t.replace(/’/g, "'");
  const lowers = t.toLowerCase();
  const fruitMap = {
    'ananas': 'pineapple',
    'fraise': 'strawberry',
    'pomme': 'apple',
    'mangue': 'mango',
    'citron': 'lemon',
    'peche': 'peach',
    'framboise': 'raspberry',
    'myrtille': 'blueberry',
    'banane': 'banana',
    'orange': 'orange',
    'kiwi': 'kiwi',
    'avocat': 'avocado',
    'papae': 'papaya',
    'grenadine': 'pomegranate'
  };
  let out = lowers;
  out = out.replace(/\bjus\s+(d'|de\s+)?([a-z]+(?:\s+[a-z]+)*)/g, (_, __, fruit) => {
    const words = fruit.trim().split(/\s+/).map(w => fruitMap[w] || w);
    return `${words.join(' ')} juice`;
  });
  out = out.replace(/\bsalade\s+(de|d')\s+([a-z]+(?:\s+[a-z]+)*)/g, (_, __, what) => {
    return `${what.trim()} salad`;
  });
  const repl = [
    ['petit dejeuner', 'breakfast'],
    ['oeufs', 'eggs'],
    ['oeuf', 'egg'],
    ['cafe au lait', 'coffee with milk'],
    ['cafe', 'coffee'],
    ['noire', 'black'],
    ['noir', 'black'],
    ['italien', 'italian'],
    ['marocain', 'moroccan'],
    ['marocaine', 'moroccan'],
    ['nordique', 'nordic'],
    ['latino', 'latin'],
    ['cesar', 'caesar'],
    ['salade', 'salad'],
    ['creme', 'cream'],
    ['citron', 'lemon'],
    ['fraise', 'strawberry'],
    ['gaufre', 'waffle'],
    ['chocolat', 'chocolate'],
    ['lait', 'milk'],
    ['vanille', 'vanilla'],
    ['caramel', 'caramel'],
    ['banane', 'banana'],
    ['frommage', 'cheese'],
    ['fromage', 'cheese'],
    ['champignon', 'mushroom'],
    ['the', 'tea'],
    ['menthe', 'mint'],
    ['lavande', 'lavender'],
    ['myrtille', 'blueberry'],
    ['pomme', 'apple'],
    ['mangue', 'mango'],
    ['peche', 'peach'],
    ['avocat', 'avocado'],
    ['russe', 'russian'],
    ['mexicaine', 'mexican'],
    ['belge', 'belgian'],
    ['citronnelle', 'lemongrass'],
    ['citronnelle', 'lemongrass'],
    ['citron vert', 'lime'],
    ['focaccia', 'focaccia'],
    ['babka', 'babka'],
    ['croissant', 'croissant'],
    ['tarte', 'tart'],
    ['gateau', 'cake'],
    ['velours', 'velvet'],
    ['eclair', 'eclair'],
    ['espresso', 'espresso']
  ];
  repl.forEach(([a, b]) => {
    const r = new RegExp(`\\b${a}\\b`, 'g');
    out = out.replace(r, b);
  });
  out = out.replace(/\bau\b/g, 'to').replace(/\bde\b/g, 'of').replace(/\bet\b/g, 'and').replace(/\bavec\b/g, 'with').replace(/\bla\b/g, '').replace(/\ble\b/g, '').replace(/\bdu\b/g, '').replace(/\bdes\b/g, '');
  out = out.replace(/\bsalad\s+([a-z]+)/g, (_, adj) => `${adj} salad`);
  out = out.replace(/[_\-]+/g, ' ').replace(/\s{2,}/g, ' ').trim();
  const small = new Set(['and','or','of','the','with','to','a','an','in','on','for']);
  out = out.split(' ').map((w,i) => {
    if (!w) return w;
    if (small.has(w) && i !== 0) return w;
    return w.charAt(0).toUpperCase() + w.slice(1);
  }).join(' ');
  return out;
}

function summarizeEnglishName(s) {
  if (!s || typeof s !== 'string') return s;
  const cleaned = s
    .replace(/\.(png|jpg|jpeg|avif|webp)$/i, '')
    .replace(/\b\d{3,}\b/g, ' ')
    .replace(/\bpng\b|\bjpeg\b|\bjpg\b|\bavif\b|\bwebp\b/gi, ' ')
    .replace(/\bisolated\b|\btransparent\b|\bbackground\b|\bimage\b/gi, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
  const stop = new Set(['with','and','of','the','to','for','on','in','or','from','by','over','under','into','a','an','at','as','is','are','was','were','be','being','been','served','serving','fresh','delicious','tasty','garnished','creating','featuring','perfect','presentation','high','angle','close','up','bursting','shape','glass','umbrella','straw','plate','breakfast','brunch','english']);
  const words = cleaned.split(/[\s\-_,/]+/).filter(Boolean);
  const uniq = [];
  for (const w of words) {
    const lw = w.toLowerCase();
    if (stop.has(lw)) continue;
    if (/^\d+$/.test(lw)) continue;
    if (lw.length < 2) continue;
    if (!uniq.includes(lw)) uniq.push(lw);
  }
  const has = (k) => uniq.includes(k);
  if (has('salad')) {
    if (has('caesar') || has('cesar')) return 'Cesar Salad';
    if (has('moroccan') || has('marocain') || has('marocaine')) return 'Moroccan Salad';
    return 'Salad';
  }
  const keyOrder = ['benedict','eggs','egg','breakfast','brunch','salmon','omelette','scrambled','waffle','pancake','toast','salad','croissant','tart','cake','eclair','babka','focaccia','latte','espresso','coffee','tea','juice','smoothie','milkshake','cocktail','mango','orange','blueberry','strawberry','lemon'];
  const eggIdx = uniq.indexOf('egg');
  if (eggIdx !== -1 && !uniq.includes('eggs')) {
    uniq[eggIdx] = 'eggs';
  }
  uniq.sort((a,b) => {
    const ia = keyOrder.indexOf(a);
    const ib = keyOrder.indexOf(b);
    const sa = ia === -1 ? 999 : ia;
    const sb = ib === -1 ? 999 : ib;
    if (sa !== sb) return sa - sb;
    return 0;
  });
  const top = uniq.slice(0,3).map(w => w.charAt(0).toUpperCase() + w.slice(1));
  return top.join(' ').trim() || s;
}

function generateFrenchFromEnglishSummary(name) {
  if (!name || typeof name !== 'string') return name;
  const dict = {
    'benedict':'Bénédicte','eggs':'Œufs','egg':'Œuf','salmon':'Saumon','omelette':'Omelette','scrambled':'Brouillés','waffle':'Gaufre','pancake':'Pancake','toast':'Toast','salad':'Salade','croissant':'Croissant','tart':'Tarte','cake':'Gâteau','eclair':'Éclair','babka':'Babka','focaccia':'Focaccia','latte':'Latte','espresso':'Espresso','coffee':'Café','tea':'Thé','juice':'Jus','smoothie':'Smoothie','milkshake':'Milkshake','cocktail':'Cocktail','mango':'Mangue','orange':'Orange','blueberry':'Myrtille','strawberry':'Fraise','raspberry':'Framboise','banana':'Banane','apple':'Pomme','peach':'Pêche','lemon':'Citron','lime':'Citron vert','lemongrass':'Citronnelle','avocado':'Avocat','mint':'Menthe','rosemary':'Romarin','iced':'Glacé','indian':'Indien','drink':'Boisson','slice':'Tranche','zest':'Zeste','cheese':'Fromage','chesse':'Fromage','vanilla':'Vanille','caramel':'Caramel','chocolate':'Chocolat','caesar':'César','cesar':'César'
  };
  return name.split(' ').map(t => dict[t.toLowerCase()] || t).join(' ');
}

function generateArabicFromEnglishSummary(name) {
  if (!name || typeof name !== 'string') return name;
  const tokens = name.toLowerCase().split(/\s+/).filter(Boolean);
  const has = (k) => tokens.includes(k);
  const flavors = ['mango','orange','lemon','lime','apple','peach','banana','strawberry','blueberry','raspberry','avocado','vanilla','caramel','chocolate','mint','rosemary'];
  const arDef = {
    mango:'المانجو', orange:'البرتقال', lemon:'الليمون', lime:'الليمون الأخضر', apple:'التفاح', peach:'الخوخ', banana:'الموز',
    strawberry:'الفراولة', blueberry:'التوت الأزرق', raspberry:'التوت الأحمر', avocado:'الأفوكادو',
    vanilla:'الفانيليا', caramel:'الكراميل', chocolate:'الشوكولاتة', mint:'النعناع', rosemary:'إكليل الجبل',
    salmon:'السلمون', cheese:'الجبن', mushroom:'الفطر', moroccan:'المغربية', caesar:'قيصر', cesar:'قيصر'
  };
  const pickFlavor = () => {
    for (const f of flavors) if (has(f)) return f;
    return null;
  };
  const flavor = pickFlavor();
  if (has('juice')) {
    if (flavor) return `عصير ${arDef[flavor] || ''}`.trim();
    return 'عصير';
  }
  if (has('smoothie')) {
    if (flavor) return `سموثي ${arDef[flavor] || ''}`.trim();
    return 'سموثي';
  }
  if (has('milkshake')) {
    if (flavor) return `ميلك شيك ${arDef[flavor] || ''}`.trim();
    return 'ميلك شيك';
  }
  if (has('latte')) {
    const iced = has('iced');
    if (flavor) return `لاتيه ${arDef[flavor] || ''}${iced ? ' مثلج' : ''}`.trim();
    return iced ? 'لاتيه مثلج' : 'لاتيه';
  }
  if (has('espresso')) {
    return 'إسبريسو';
  }
  if (has('coffee')) {
    const iced = has('iced');
    return iced ? 'قهوة مثلجة' : 'قهوة';
  }
  if (has('tea')) {
    if (has('moroccan') && has('mint')) return 'شاي مغربي بالنعناع';
    if (has('mint')) return 'شاي بالنعناع';
    if (flavor) return `شاي ${arDef[flavor] || ''}`.trim();
    return 'شاي';
  }
  if (has('benedict')) {
    if (has('salmon')) return 'بيض بنديكت بالسلمون';
    return 'بيض بنديكت';
  }
  if (has('omelette')) {
    if (has('cheese') && has('mushroom')) return 'عجة بالجبن والفطر';
    if (has('cheese')) return 'عجة بالجبن';
    if (has('mushroom')) return 'عجة بالفطر';
    return 'عجة';
  }
  if (has('scrambled') && has('eggs')) {
    if (has('rosemary')) return 'بيض مخفوق بإكليل الجبل';
    return 'بيض مخفوق';
  }
  if (has('salad')) {
    if (has('moroccan')) return 'سلطة مغربية';
    if (has('caesar')) return 'سلطة قيصر';
    if (flavor) return `سلطة ${arDef[flavor] || ''}`.trim();
    return 'سلطة';
  }
  if (has('cake')) {
    if (has('cheese') && flavor) return `كعكة الجبن بـ${arDef[flavor] ? arDef[flavor].replace(/^ال/,'ال') : ''}`.trim();
    if (has('cheese')) return 'كعكة الجبن';
    if (flavor) return `كيك ${arDef[flavor] || ''}`.trim();
    return 'كيك';
  }
  if (has('tart')) {
    if (flavor) return `تارت ${arDef[flavor] || ''}`.trim();
    return 'تارت';
  }
  if (has('eclair')) {
    if (flavor) return `إكلير ${arDef[flavor] || ''}`.trim();
    return 'إكلير';
  }
  if (has('croissant')) {
    if (has('benedict') && has('salmon')) return 'كرواسون بنديكت بالسلمون';
    if (has('benedict')) return 'كرواسون بنديكت';
    if (flavor) return `كرواسون ${arDef[flavor] || ''}`.trim();
    return 'كرواسون';
  }
  if (has('waffle')) {
    if (flavor) return `وافل بـ${arDef[flavor] ? arDef[flavor].replace(/^ال/,'ال') : ''}`.trim();
    return 'وافل';
  }
  if (has('pancake')) {
    if (flavor) return `بان كيك بـ${arDef[flavor] ? arDef[flavor].replace(/^ال/,'ال') : ''}`.trim();
    return 'بان كيك';
  }
  if (has('toast')) {
    if (has('avocado')) return 'توست بالأفوكادو';
    if (has('cheese') && has('mushroom')) return 'توست بالجبن والفطر';
    if (has('cheese')) return 'توست بالجبن';
    if (has('mushroom')) return 'توست بالفطر';
    return 'توست';
  }
  if (has('infusion')) return 'نقيع';
  if (has('brew') || has('cold') && has('brew')) return 'كولد برو';
  if (has('matcha')) return 'ماتشا';
  if (has('chai') || has('masala')) return 'تشاي ماسالا';
  if (has('hibiscus')) return 'كركديه';
  if (has('moroccan') || has('marocain')) return 'مغربي';
  if (has('nordic') || has('nordique')) return 'شمالي';
  if (has('citron') || has('lemon')) return 'ليمون';
  if (has('royal')) return 'رويال';
  if (has('normal')) return 'قهوة عادية';
  if (has('américain') || has('americain')) return 'قهوة أمريكية';
  if (has('noire') || has('noir')) return 'قهوة سوداء';
  if (has('italien') || has('italian')) return 'إيطالي';
  if (has('léger') || has('leger')) return 'خفيف';
  if (has('au') && has('lait')) return 'قهوة بالحليب';
  if (has('crème') || has('creme')) return 'كريمة';
  if (has('au') && has('lait') && has('artisanal')) return 'قهوة حرفية بالحليب';
  if (has('chocolate') || has('chocolat')) return 'شوكولاتة';
  if (has('fondue')) return 'شوكولاتة مذابة';
  if (has('split')) return 'سبليت';
  if (has('french')) return 'فرنسي';
  if (has('mille') && has('feuilles')) return 'ميل فوي';
  if (has('teramisu') || has('tiramisu')) return 'تيراميسو';
  if (has('waffels') || has('waffle')) return 'وافل';
  if (has('chees') || has('cheese')) return 'جبن';
  if (has('citron') || has('lemon')) return 'ليمون';
  if (has('dark') && has('white')) return 'شوكولاتة بيضاء وداكنة';
  if (has('oreo')) return 'أوريو';
  if (has('caramel')) return 'كراميل';
  if (has('banane') || has('banana')) return 'موز';
  if (has('fraise') || has('strawberry')) return 'فراولة';
  if (has('myrtille') || has('blueberry')) return 'توت أزرق';
  if (has('framboise') || has('raspberry')) return 'توت أحمر';
  if (has('kiwi')) return 'كيوي';
  if (has('ananas') || has('pineapple')) return 'أناناس';
  if (has('pêche') || has('peach')) return 'خوخ';
  if (has('pomme') || has('apple')) return 'تفاح';
  if (has('d\'ananas')) return 'عصير أناناس';
  if (has('de') && has('pomme')) return 'عصير تفاح';
  if (has('de') && has('fraise')) return 'عصير فراولة';
  if (has('de') && has('mangue')) return 'عصير مانجو';
  if (has('mang')) return 'مانجو';
  if (has('cub') && has('mokhito')) return 'كوبا موكيتو';
  if (has('cuba')) return 'كوبا';
  if (has('mokhito') || has('mojito')) return 'موخيتو';
  if (has('glass') || has('iced')) return 'مثلج';
  if (has('milk') || has('shake')) return 'ميلك شيك';
  if (has('milkshake') || has('milkshake')) return 'ميلك شيك';
  if (has('blue') && has('berry')) return 'توت أزرق';
  if (has('green')) return 'أخضر';
  if (has('golden') || has('turmeric')) return 'كركم ذهبي';
  if (has('brazilian')) return 'برازيلي';
  if (has('dragon') && has('fruit')) return 'فاكهة التنين';
  if (has('greek') && has('yogurt')) return 'زبادي يوناني';
  if (has('tropical')) return 'استوائي';
  if (has('protein')) return 'بروتين';
  if (has('acai')) return 'آساي';
  if (has('bowl')) return 'بولة';
  if (has('citron') || has('delise')) return 'ليمون';
  if (has('floral')) return 'زهري';
  if (has('lavender')) return 'لافندر';
  if (has('ginger')) return 'زنجبيل';
  if (has('rosey') || has('rose')) return 'وردي';
  if (has('hazelnut')) return 'بنسل';
  if (has('spanish')) return 'إسباني';
  if (has('lotus')) return 'لوتس';
  if (has('cannelle') || has('cinnamon')) return 'قرفة';
  if (has('chocolate')) return 'شوكولاتة';
  if (has('close') && has('up')) return 'لقطة قريبة';
  if (has('glass')) return 'كأس';
  if (has('plate')) return 'طبق';
  if (has('photo')) return 'صورة';
  if (has('png') || has('jpg') || has('jpeg')) return '';
  if (has('delicious') || has('tasty')) return '';
  if (has('high') && has('angle')) return '';
  if (has('isolated') || has('transparent')) return '';
  if (has('background')) return '';
  if (has('perfect') || has('perfect')) return '';
  if (has('vibrant') || has('appetizing')) return '';
  if (has('presentation')) return '';
  if (has('fresh') || has('served')) return '';
  if (has('with') || has('and')) return '';
  const dict = {
    benedict:'بنديكت',eggs:'بيض',egg:'بيض',salmon:'سلمون',omelette:'عجة',scrambled:'مخلوط',waffle:'وافل',pancake:'بان كيك',toast:'توست',salad:'سلطة',croissant:'كرواسون',tart:'تارت',cake:'كيك',eclair:'إكلير',babka:'بابكا',focaccia:'فوكاتشيا',latte:'لاتيه',espresso:'إسبريسو',coffee:'قهوة',tea:'شاي',juice:'عصير',smoothie:'سموثي',milkshake:'ميلك شيك',cocktail:'كوكتيل',mango:'مانجو',orange:'برتقال',blueberry:'توت أزرق',strawberry:'فراولة',raspberry:'توت أحمر',banana:'موز',apple:'تفاح',peach:'خوخ',lemon:'ليمز',lime:'ليمز أخضر',lemongrass:'عشب الليمز',avocado:'أفوكادو',mint:'نعناع',rosemary:'إكليل الجبل',iced:'مثلج',indian:'هندي',drink:'مشروب',slice:'شريحة',zest:'قشر',cheese:'جبن',chesse:'جبن',vanilla:'فانيليا',caramel:'كراميل',chocolate:'شوكولاتة',
    // Additional words
    cafe:'قهوة',café:'قهوة',creme:'كريمة',crème:'كريمة',pain:'خبز',sandwich:'ساندويتش',pizza:'بيتزا',burger:'برغر',soupe:'شوربة',riz:'أرز',pates:'معكرونة',pâtes:'معكرونة',volaille:'دواجن',poulet:'دجاج',viande:'لحم',poisson:'سمك',bacon:'لحم مقدد',saucisse:'سجق',chorizo:'تشوريزو',jambon:'هام',frites:'بطاطس مقلية',pommes:'تفاح',petit:'صغير',grand:'كبير',medium:'متوسط', Chaud:'ساخن',froid:'بارد',doux:'حلو',sale:'مالح',nouveau:'جديد',special:'خاص',deluxe:'ديلكس',mix:'ميمكس',breakfast:'فطور',brunch:'برانش',dinner:'عشاء',lunch:'غداء',fermier:'ريفي',artisanal:'حرفي',fresh:'طازج',home:'منزل',house:'منزل',chef:'شيف',king:'ملك',queen:'ملكة',deluxe:'ديلكس',supreme:'سوبريم',complet:'كامل',simple:'بسيط',naturel:'طبيعي',bio:'عضوي',organic:'عضوي',healthy:'صحي',light:'خفيف',heavy:'ثقل',spicy:'حار',mild:'خفيف',hot:'ساخن',warm:'دافئ',cold:'بارد',gratin:'جرتان',royale:'رويال',mousse:'موس',flan:'فلان',soufflé:'سفله',fondue:'فوندو',rizotto:'ريزوتو',burger:'برغر',tacos:'تاكو',burrito:'بوريتو',wrap:'راب',bagel:'بيغل',donut:'دونات',muffin:'مافن',croissant:'كرواسون',brioche:'بريوش',chausson:'شوسون',feuilletée:'فيليتي',feuillete:'فيليتي',pithivier:'بيتيفييه',galette:'جاليت',crpe:'كريب',crêpe:'كريب',blinis:'بليني',blini:'بليني',naan:'نان',pita:'بيتا',khobz:'خBread',focaccia:'فوكاتشيا',ciabatta:'سياباتا',baguette:'باغيت',baton:'باتون',torsette:'تورسيت',ficelle:'فيسيل',sandwich:'ساندويتش',club:'كلوب',panini:'بانيي',bagel:'بيغل',croque:'كروك',croissant:'كرواسون',chausson:'شوسون',viennoiserie:'فيانوازري',patisserie:'باتيسري',gteau:'جاتو',gâteau:'جاتو',tarte:'تارت',flan:'فلان',pouding:'بودينغ',crumble:'كرمبل',cobbler:'كوبler',trifle:'ترايفل',bavarois:'بافاروا',mousse:'موس',gelée:'جيلي',pâte:'بات',pate:'بات',marzipan:'مارزيبان',nougat:'نوقات',praline:'برالين',caramel:'كراميل',sirop:'شربات',syrup:'شربات',miel:'عسل',confiture:'مربى',pâte:'معجون',nutella:'نوتيلا',pistache:' fistash',pistachio:'فستق',amande:'لوز',noix:'جوز',noisette:'هيزل',cacahuète:'كاشو',arachide:'فول سوداني',noix:'جوز',coco:'جوز الهند',cocoa:'كاكاو',vanille:'فانيليا',cinnamon:'قرفة',cannelle:'قرفة',gingembre:'زنجبيل',curcuma:'كركم',cardamome:'هيل',poivre:'فلفل',sel:'ملح',sucre:' sugar',sucre:'سكب',épice:'توابل',herbes:'أعشاب',basilic:'ريحان',ciboulette:'شبت',persil:'بقدونس',estragon:'إستراجون',sauge:'مريمية',thym:'زعتر',romarin:'إكليل الجبل',lavande:'لافندر',fleur:'زهر',fleurs:'زهور',rose:'وردي',violette:'بنفسجي',jasmin:'ياسمين',fleur:'زهرة',
    // Menu specific items
    frittata:'فريتاتا',champignon:'فطر',frommage:'جبن',avocat:'أفوكادو',fromage:'جبن',mache:'جرجير',roquette:'روكيت',laitue:'خس',tomate:'طماطم',oignon:'بصل',poivron:'فطر',pomme:'تفاح',pomme:'بطاطس',patate:'بطاطس',carotte:'جزر',celeri:' كرفس',brocoli:'بروكلي',haricot:'فاصوليا',pois:'بازلاء',lentille:'عدس',chickpeas:'حمص',quinoa:'كينوا',couscous:'كسكس', Boulgour:'برغل',riz:'أرز',pates:'معكرونة',nouilles:'نودلز',vermicelle:'فيرميسيل',lasagne:'لازانيا',ravioli:'رافيولي',tortellini:'تورتيليني',gnocchi:'نيوكي',risotto:'ريزوتو',arancini:'أرانسيني',falafel:'فلافل',tabbouleh:'تبولة',houmous:'حمص',baba:'بابا',ganache:'غاناش',glacage:'تلج',crème:'كريمة',pâte:'عجينة',levure:'خميرة',levain:'عجين',beurre:'زبدة',lait:'حليب',crème:'كريمة',yaourt:'زبادي',fromage:'جبن',chèvre:'ماعز',brebis:'ضأن',comté:'كومتي',gruyère:'غرويير',mozzarella:'موزاريلا',parmesan:'بارميزان',cheddar:'شيدر',bleu:'أزرق',roquefort:'روكفور',feta:'فيتا',ricotta:'ريكوتا',mascarpone:'ماسكاربوني',philadelphia:'فيلادلفيا',boursin:'بورسان',nordique:'شمالي',marocain:'مغربي',espagnol:'إسباني',italien:'إيطالي',français:'فرنسي',américain:'أمريكي',asiatique:'آسيوي',indien:'هندي',arabe:'عربي',méditerran:'متوسطي',oriental:'شرقي',occidental:'غربي',traditionnel:'تقليدي',moderne:'حديث',classique:'كلاسيكي',rustique:'ريفي',gastronom:'غاسترونوم',bio:'عضوي',naturel:'طبيعي',pur:'نقي',fin:'رفيع',premium:'بريميوم',luxe:'فاخر',elite:'نخبة',signature:'توقيع',chef:'شيف',master:' master',grand:'كبير',petit:'صغير',giant:'عملاق',mini:'صغير',size:'حجم',portion:'حصة',assiette:'طبق',menu:'قائمة',carte:'خريطة',list:'قائمة',special:'خاص',offre:'عرض',promo:'برومو',deal:'صفقة',combo:'كومبو',set:'مجموعة',pack:'حزمة',box:'صندوق',tray:'صينية',plateau:'طاولة',serviette:'منديل',couvercle:'غطاء',verre:'كأس',tasse:'فنجان',bol:'وعاء',mug:'ماغ',carafe:'carafe',bouteille:'زجاجة',cannette:'علبة',can:'علبة',paille:'ماصة',cuiller:'ملعة',fourchette:'شوكة',couteau:'سكين',serviette:'منديل',nappe:'مفرش',tapis:'سجادة',sets:'طقم',cadeau:'هدية',bonus:'مكافأة',point:'نقطة',credit:'ائتمان',carte:'بطاقة',ticket:'تذكرة',coupon:'كوبون',voucher:'فاوشر',gift:'هدية',reward:'مكافأة',promotion:'ترقية',reduction:'تخفيض',discount:'خصم',soldes:'تنزيلات',solde:'تنزيل',gratis:'مجاني',offert:'مقدم',inclus:'مشمول',extra:'إضافي',supplément:'إضافة',option:'خيار',choix:'اختيار',alternative:'بديل',substitut:'بديل',autre:'أخرى',encore:'مرة أخرى',autres:'آخرين',plus:'أكثر',moins:'أقل',tres:'جدا',bien:'جيد',tres:' very',super:'سوبر',hyper:'هابر',mega:'ميغا',extra:'إكسترا',ultra:'ألترا',
    // New additions for better coverage
    petit:'صغير',dejeuner:'غداء',déjeuner:'غداء',diner:'عشاء',dîner:'عشاء',collation:'وجبة خفيفة',snack:'سناك', amuse:'أمuze',bouffe:'طعام',repas:'وجبة',plats:'أطباق',plat:'طبق',entrée:'مقبلات',dessert:'حلويات',boisson:'مشروبات',accompagnement:'إضافة',côtée:'جنب',gratinée:'جراتين',composée:'مركبة',mêlée:'مخلوطة',froide:'باردة',chaude:'ساخنة',légère:'خفيفة',corsée:'قوية',foncée:'داكنة',claire:'فاتحة',nature:'طبيعية',suivie:'متبوعة',servie:'مخدمة',préparée:'محضرة',cuisinée:'مطبوخة',rôtie:'مشوية',grillée:'مشوية',pochée:'مسلوقة',battue:'مخفوقة',mixée:'ممزوجة',filtrée:'مصفاة',infusée:'منقوعة',bouillie:' مسلوقة',cuite:'مطبوخة',crue:'نيئة',fraiche:'طازجة',salée:'مملحة',sucrée:'محلاة',épicerée:'متبل',fumée:'مدخنة',marinée:'متبلة',confite:'مربى',séchée:'مجففة',congélée:'مجمدية',réfrigérée:'مبردة',chauffée:'مسخنة',réchauffée:'مسخنة',emportée:'مغلفة',livrée:'مسلمة',commandée:'مطلوبة',réservée:'محجوزة',confirmée:'مؤكدة',annulée:'ملغاة',reportée:'مؤجلة',accepted:'مقبول',refused:'مرفوض',pending:'قيد الانتظار',complete:'مكتمل',incomplet:'غير مكتمل',urgent:'عاجل',prioritaire:'أولوية',normal:'عادي',express:'سريع',rapide:'سريع',lent:'بطيء',court:'قصير',long:' طويل',large:'واسع',étroit:'ضيق',haut:'عالي',bas:'منخفض',gros:'سميك',mince:'رفيع',lourd:'ثقيل',leger:'خفيف',fort:'قوي',doux:' softer',dur:'صعب',mou:'لين',sec:'جاف',humide:'رطب',mouillé:'مبلل',cassé:'مكسور',entier:'كامل',moitié:'نصف',quart:'ربع',tiers:'ثلث',trois:' three',deux:' two',un:' one',zero:'صفر',premier:'الأول',deuxième:'الثاني',troisième:'الثالث',dernier:'الأخير',suivant:'التالي',précédent:'السابق',autre:'آخر',différent:'مختلف',simile:'مشابه',identique:'متطابق',équivalent:'مكافئ',opposé:'معاكس',contraire:'ضد',semblable:'ماثل',comparalbe:'مقارن',différent:'مغاير',
  };
  const out = tokens.map(t => dict[t]).filter(Boolean);
  return out.length > 0 ? out.join(' ') : 'منتج';
}


/**
 * PREMIUM SEARCH ENGINE
 */
function initSearch() {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const resultsList = document.getElementById('results-list');
  const resultsCount = document.getElementById('results-count');

  if (!searchInput || !searchResults || !resultsList) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    
    if (query.length < 1) {
      searchResults.classList.add('hidden');
      return;
    }

    const catalog = (typeof window !== 'undefined' && Array.isArray(window.allMenuItems)) ? window.allMenuItems : bestsellers;
    const matches = catalog.filter(item => {
      const name = (getMenuTranslation(item, 'name') || item.name || '').toLowerCase();
      const desc = (getMenuTranslation(item, 'description') || item.description || '').toLowerCase();
      const cat = (item.category || '').toLowerCase();
      return name.includes(query) || desc.includes(query) || cat.includes(query);
    });

    renderSearchResults(matches);
  });

  // Close on click outside
  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.classList.add('hidden');
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      searchResults.classList.add('hidden');
      searchInput.blur();
    }
  });
}

function renderSearchResults(matches) {
  const searchResults = document.getElementById('search-results');
  const resultsList = document.getElementById('results-list');
  const resultsCount = document.getElementById('results-count');

  if (matches.length === 0) {
    resultsList.innerHTML = `
      <div class="p-8 text-center">
        <span class="material-symbols-outlined text-gray-300 text-4xl mb-2">search_off</span>
        <p class="text-sm text-gray-500">No dishes found for this search</p>
      </div>
    `;
    resultsCount.textContent = "0 found";
  } else {
    resultsCount.textContent = `${matches.length} found`;
    resultsList.innerHTML = matches.map(item => {
      const name = getMenuTranslation(item, 'name') || item.name;
      const price = typeof item.price === 'number' ? item.price.toFixed(2) : item.price;
      const img = normalizeImagePath(item.image || getFallbackImage(item));
      
      return `
        <div class="p-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors active:scale-[0.98]" 
             onclick="navigateToProduct('${item.id}')">
          <div class="w-12 h-12 rounded-xl overflow-hidden shrink-0 shadow-sm border border-gray-100 dark:border-white/5">
            <img src="${img}" class="w-full h-full object-cover" alt="${name}" onerror="this.src='../assets/waiter.jpg'">
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="text-sm font-bold text-gray-900 dark:text-white truncate">${name}</h4>
            <div class="flex items-center gap-2 mt-0.5">
              <span class="text-[10px] font-bold text-primary">${price}DH</span>
              <span class="text-[9px] text-gray-400 uppercase tracking-tighter bg-gray-100 dark:bg-white/5 px-1.5 py-0.5 rounded-full">${item.category}</span>
            </div>
          </div>
          <span class="material-symbols-outlined text-gray-300 text-[18px]">chevron_right</span>
        </div>
      `;
    }).join('');
  }

  searchResults.classList.remove('hidden');
}

window.navigateToProduct = (id) => {
  const catalog = (typeof window !== 'undefined' && Array.isArray(window.allMenuItems)) ? window.allMenuItems : bestsellers;
  const item = catalog.find(i => i.id === id);
  if (item) {
    localStorage.setItem('stitch_customizing_item', JSON.stringify(item));
    window.location.href = buildCustomizationUrl(item);
  }
};


// Respond to language changes
document.addEventListener('languageChanged', (e) => {
  const lang = e.detail.lang;
  
  const greetingEl = document.getElementById('header-greeting');
  if (greetingEl) {
    const h = new Date().getHours();
    const key = h < 12 ? 'greeting_morning' : h < 17 ? 'greeting_afternoon' : 'greeting_evening';
    greetingEl.textContent = getTranslation(key);
  }

  // Re-render content
  if (typeof bestsellers !== 'undefined' && bestsellers.length) {
    renderBestsellers(bestsellers);
  }
  renderCategories();
  updateCartUI();

  const modal = document.getElementById('order-modal');
  if (modal && !modal.classList.contains('hidden')) {
    renderCartItems();
  }
});

// --- HERO BANNER ROTATION ---
const HERO_IMAGES = [
  '../images/sub catégorie images/black coffee/Café Royal.jpg',
  '../images/sub catégorie images/Brunch food/delicious-and-hearty-full-english-breakfast-plate-with-fried-eggs-sausages-toast-beans-and-tomatoes-isolated-on-transparent-background-png.png',
  '../images/sub catégorie images/sweets/Chocolat Cake with Stawberrys.jpg',
  '../images/sub catégorie images/latté/Matcha Latte.jpg'
];

function initHeroRotation() {
  const heroVideo = document.getElementById('menu-hero-video');
  if (heroVideo) {
    const isPortrait = window.matchMedia('(max-aspect-ratio: 4/5)').matches || window.innerWidth < 768;
    heroVideo.src = isPortrait ? '../assets/video/hero-mobile.mp4' : '../assets/video/hero-desktop.mp4';
    heroVideo.poster = isPortrait ? '../assets/video/hero-poster-mobile.jpg' : '../assets/video/hero-poster.jpg';
    heroVideo.muted = true;
    heroVideo.loop = true;
    heroVideo.playsInline = true;
    const tryPlay = () => heroVideo.play().catch(() => {});
    if (heroVideo.readyState >= 2) tryPlay();
    else heroVideo.addEventListener('canplay', tryPlay, { once: true });
    return;
  }

  const container = document.getElementById('hero-bg-container');
  if (!container) return;
  
  let currentIndex = 0;
  
  // Create first image
  const img1 = document.createElement('img');
  img1.src = HERO_IMAGES[currentIndex];
  img1.className = 'absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 opacity-100';
  container.insertBefore(img1, container.firstChild);
  
  setInterval(() => {
    currentIndex = (currentIndex + 1) % HERO_IMAGES.length;
    
    const nextImg = document.createElement('img');
    nextImg.src = HERO_IMAGES[currentIndex];
    nextImg.className = 'absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 opacity-0';
    container.insertBefore(nextImg, container.firstChild); // Insert behind the gradient overlay
    
    // Trigger reflow
    nextImg.offsetHeight;
    
    nextImg.classList.remove('opacity-0');
    nextImg.classList.add('opacity-100');
    img1.classList.remove('opacity-100');
    img1.classList.add('opacity-0');
    
    setTimeout(() => {
      if (img1.parentNode) img1.parentNode.removeChild(img1);
      Object.assign(img1, nextImg);
    }, 1000);
  }, 5000);
}

document.addEventListener('DOMContentLoaded', () => {
  initHeroRotation();
  
  // Apply Global Theme
  const savedColor = localStorage.getItem('stitch_theme_primary');
  if (savedColor) {
      document.documentElement.style.setProperty('--theme-primary', savedColor);
  }
});

window.addEventListener('storage', (e) => {
    if (e.key === 'stitch_theme_primary' && e.newValue) {
        document.documentElement.style.setProperty('--theme-primary', e.newValue);
    }
});




// Quick Client Theme Switcher (Synchronizes active theme directly on phone)
window.switchMenuThemeQuick = function(theme) {
    if (typeof window.setStitchTheme === 'function') {
        window.setStitchTheme(theme);
    } else {
        localStorage.setItem('stitch_menu_theme', theme);
        location.reload();
    }
};


// --- THREE-DOTS MENU & MOBILE CONTROLS ---
window.toggleOptionsMenu = function(show) {
  const sheet = document.getElementById('menu-options-sheet');
  if (!sheet) return;
  const shouldOpen = typeof show === 'boolean' ? show : sheet.classList.contains('hidden');
  if (shouldOpen) {
    // Highlight active theme button
    const curTheme = (typeof window.getStitchActiveTheme === 'function' ? window.getStitchActiveTheme() : localStorage.getItem('stitch_menu_theme')) || 'swiggy-bold';
    document.querySelectorAll('.theme-opt-btn').forEach(btn => {
      const match = btn.dataset.theme === curTheme;
      btn.classList.toggle('border-primary', match);
      btn.classList.toggle('bg-primary/10', match);
    });

    // Highlight active lang button
    const curLang = getLang();
    document.querySelectorAll('.lang-opt-btn').forEach(btn => {
      const match = btn.dataset.lang === curLang;
      btn.classList.toggle('border-primary', match);
      btn.classList.toggle('bg-primary/10', match);
      btn.classList.toggle('text-primary', match);
    });

    sheet.classList.remove('hidden');
    sheet.classList.add('flex');
  } else {
    sheet.classList.add('hidden');
    sheet.classList.remove('flex');
  }
};

window.switchMenuThemeFromMobile = function(theme) {
  if (typeof window.setStitchActiveTheme === 'function') {
    window.setStitchActiveTheme(theme, true);
  } else {
    localStorage.setItem('stitch_menu_theme', theme);
  }
  
  // Update URL without full reload so sharing/bookmarks keep theme
  try {
    const u = new URL(window.location.href);
    u.searchParams.set('theme', theme);
    window.history.replaceState({}, '', u.href);
  } catch (_) {}

  window.toggleOptionsMenu(false);
  
  const names = { 'swiggy-bold': 'Swiggy Bold 🚀', 'gourmet': 'Gourmet Reserve ✨', 'classic': 'Classique Minimaliste ☕' };
  if (typeof window.showOrderNotification === 'function') {
    window.showOrderNotification(`🎨 Thème activé : ${names[theme] || theme}`);
  }
};

window.setMenuLanguage = function(lang) {
  if (!['fr', 'ar', 'en'].includes(lang)) return;
  try {
    localStorage.setItem('stitch_lang', lang);
  } catch (_) {}
  
  // Set html lang and dir
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  window.toggleOptionsMenu(false);
  
  // Re-render items and translations
  if (typeof renderAllMenuItems === 'function') {
    renderAllMenuItems(bestsellers);
  }
  if (typeof updatePageTranslations === 'function') {
    updatePageTranslations();
  }
};

window.scrollToMenu = function() {
  const target = document.getElementById('bestsellers') || document.getElementById('bestsellers-grid') || document.querySelector('.main-menu-section');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};


// Real-Time Cloud Sync Listeners for Customer Menu
if (window.stitchSync) {
  window.stitchSync.onStockUpdate(() => {
    if (typeof renderMenuItems === 'function') renderMenuItems();
  });
  window.stitchSync.onOrderStatus(() => {
    checkAndRenderTableConflictBanner();
  });
  window.stitchSync.onNewOrder(() => {
    checkAndRenderTableConflictBanner();
  });
}

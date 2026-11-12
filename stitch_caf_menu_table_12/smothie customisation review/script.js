document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);

  // Load fallback from localStorage if navigated from menu
  let storedItem = null;
  try {
    storedItem = JSON.parse(localStorage.getItem('stitch_customizing_item') || 'null');
  } catch (_) {}

  const rawId = params.get('id') || storedItem?.id || ('item-' + Date.now());
  const rawName = (params.get('name') || storedItem?.name || 'Produit Stitch').trim();
  const rawPrice = parseFloat(params.get('price') || storedItem?.price || '12.00');
  const rawCategory = (params.get('category') || storedItem?.category || 'Menu').trim();

  // Resolve exact product image
  let rawImage = params.get('image') || storedItem?._displayImage || storedItem?.image || storedItem?.image_url || '../assets/waiter.jpg';
  try {
    rawImage = decodeURIComponent(rawImage);
  } catch (_) {}
  if (rawImage.startsWith('../../images/')) {
    rawImage = rawImage.replace('../../images/', '../images/');
  } else if (rawImage.startsWith('assets/')) {
    rawImage = '../' + rawImage;
  }

  const basePrice = Number.isFinite(rawPrice) && rawPrice > 0 ? rawPrice : 12.00;

  // Determine whether this product is a Drink or Food/Dish
  const combinedText = (rawCategory + ' ' + rawName + ' ' + window.location.pathname).toLowerCase();
  const foodKeywords = ['brunch', 'toast', 'salad', 'salade', 'burger', 'tacos', 'pizza', 'pastry', 'bakery', 'bread', 'pain', 'croissant', 'cake', 'gateau', 'gâteau', 'tart', 'tarte', 'eclair', 'éclair', 'mille', 'tiramisu', 'teramisu', 'waffle', 'waffel', 'pancake', 'panne', 'omelette', 'egg', 'oeuf', 'benedict', 'dejeuner', 'déjeuner', 'breakfast', 'fast food', 'fastfood', 'sandwich', 'babka', 'focaccia', 'brioche', 'cookie', 'muffin', 'stew', 'pumpkin', 'split', 'fondue', 'frites', 'hot dog', 'baklawa', 'basbousa', 'donut'];
  const drinkKeywords = ['coffee', 'café', 'cafe', 'brew', 'espresso', 'latte', 'latté', 'tea', 'thé', 'the ', 'infusion', 'matcha', 'chai', 'juice', 'jus', 'smoothie', 'smothie', 'milkshake', 'shake', 'drink', 'boisson', 'mojito', 'mokhito', 'cocktail', 'hibiscus', 'lemonade', 'citronnade', 'chocolat chaud'];

  const isExplicitFood = foodKeywords.some(k => combinedText.includes(k));
  const isExplicitDrink = drinkKeywords.some(k => combinedText.includes(k));
  const isDrink = isExplicitDrink && !isExplicitFood;

  // Rich Storytelling & Valorization Generator (Shown ONLY on the product detail page)
  function buildProductStory(name, category, drinkFlag) {
    const n = name.toLowerCase();

    if (n.includes('benedict') || n.includes('salmon')) {
      return {
        desc: "Un grand classique du brunch revisité avec raffinement : croissant pur beurre légèrement toasté, fines tranches de saumon fumé, œuf poché au cœur coulant et nappage généreux de sauce hollandaise maison citronnée.",
        prep: "Dressé à la minute avec sa jeune salade croquante assaisonnée à l'huile d'olive vierge. Un équilibre parfait entre le fondant du saumon et le croustillant du feuilletage."
      };
    }
    if (n.includes('omelette') || n.includes('scrambled') || n.includes('frittata')) {
      return {
        desc: "Œufs frais de ferme battus à la main et cuits doucement au beurre demi-sel pour une texture aérienne et fondante, relevés de fromage affiné et de fines herbes fraîchement ciselées.",
        prep: "Cuisson minute à la poêle selon la tradition bistrot, servi bien chaud avec son accompagnement gourmand."
      };
    }
    if (n.includes('petit déjeuner') || n.includes('english breakfast')) {
      return {
        desc: "L'assiette matinale complète et généreuse par excellence : préparations chaudes, accompagnements savoureux et pain artisanal toasté pour démarrer la journée avec énergie et gourmandise.",
        prep: "Tous les éléments chauds sont cuisinés à la commande pour vous garantir une assiette fraîche, copieuse et conviviale."
      };
    }
    if (n.includes('salade')) {
      return {
        desc: "Une composition fraîche et colorée préparée avec des légumes croquants du marché, herbes aromatiques et une vinaigrette maison équilibrée qui sublime chaque ingrédient.",
        prep: "Découpée et assaisonnée juste avant le service pour conserver toute la fraîcheur et le croquant des crudités."
      };
    }
    if (n.includes('toast') || n.includes('avocado') || n.includes('focaccia')) {
      return {
        desc: "Tranche épaisse de pain artisanal au levain grillée à la perfection, garnie d'ingrédients frais et généreux, relevée d'un filet d'huile d'olive extra-vierge et d'épices douces.",
        prep: "Pain toasté minute pour un contraste irrésistible entre la croûte dorée croustillante et la garniture fondante."
      };
    }
    if (n.includes('burger') || n.includes('tacos') || n.includes('sandwich') || n.includes('hot dog')) {
      return {
        desc: "Une recette gourmande et généreuse : viande savoureuse saisie à la plancha, fromage fondant, crudités fraîches et sauce signature maison dans un pain moelleux légèrement toasté.",
        prep: "Saisi à haute température à la commande pour garder tout le juteux et le goût authentique du fait-maison."
      };
    }
    if (n.includes('waffel') || n.includes('waffle') || n.includes('pancake') || n.includes('french toast')) {
      return {
        desc: "Pâte maison reposée et dorée à souhait : croustillante à l'extérieur, ultra-moelleuse à l'intérieur, sublimée par sa garniture gourmande aux fruits frais, miel ou chocolat.",
        prep: "Cuit sur plaque chaude à la minute et nappé juste avant d'arriver à votre table."
      };
    }
    if (n.includes('chees') || n.includes('tiramisu') || n.includes('teramisu') || n.includes('mille') || n.includes('cake') || n.includes('babka') || n.includes('chocolat fondu')) {
      return {
        desc: "Une création pâtissière artisanale à la texture onctueuse et délicate, préparée avec du chocolat grand cru, de la crème fraîche et des ingrédients sélectionnés avec soin.",
        prep: "Réalisé par notre chef pâtissier selon un savoir-faire artisanal pour une douceur équilibrée en bouche."
      };
    }
    if (n.includes('croissant') || n.includes('pain au') || n.includes('pain suisse') || n.includes('baklawa') || n.includes('cookie') || n.includes('donut')) {
      return {
        desc: "Viennoiserie et pâtisserie dorée au four, au feuilletage pur beurre croustillant et au cœur généreux qui fond délicatement en bouche.",
        prep: "Fournée du jour préparée sur place pour un parfum authentique de boulangerie artisanale."
      };
    }
    if (n.includes('matcha') || n.includes('tea') || n.includes('thé') || n.includes('the ') || n.includes('infusion') || n.includes('hibiscus')) {
      return {
        desc: "Une infusion délicate et aromatique aux feuilles et fleurs sélectionnées, offrant des notes apaisantes, florales et parfaitement équilibrées.",
        prep: "Infusé à la température idéale par notre barista pour libérer tous les arômes naturels sans amertume."
      };
    }
    if (n.includes('jus') || n.includes('orange') || n.includes('mokhito') || n.includes('cocktail') || n.includes('mango')) {
      return {
        desc: "Un concentré de fraîcheur 100% naturel préparé à partir de fruits mûris au soleil, riche en vitamines et naturellement désaltérant.",
        prep: "Pressé et préparé à la minute au bar dès validation de votre commande, sans conservateurs."
      };
    }
    if (n.includes('smoothie') || n.includes('milkshake') || n.includes('shake')) {
      return {
        desc: "Une boisson glacée veloutée et ultra-gourmande, mixée à partir de fruits frais, de lait onctueux et d'une touche de douceur irrésistible.",
        prep: "Mixé minute au blender pour obtenir une texture aérienne, fraîche et crémeuse."
      };
    }
    if (drinkFlag) {
      return {
        desc: "Café de spécialité aux grains fraîchement moulus, offrant une crema dense, des notes aromatiques intenses et une longueur en bouche exceptionnelle.",
        prep: "Extrait à la minute par notre barista avec une maîtrise parfaite de la mouture et de la température du lait."
      };
    }
    return {
      desc: "Une création signature de notre carte, préparée avec des ingrédients frais du jour sélectionnés avec exigence pour leur goût authentique.",
      prep: "Cuisiné et dressé à la commande par notre équipe pour vous offrir une expérience gourmande irréprochable."
    };
  }

  // Curated Cross-Selling Recommendations (Drinks -> Pastries/Dishes, Dishes -> Drinks)
  const RECOMMENDED_PASTRIES_AND_DISHES = [
    {
      id: 'rec-vien-1',
      name: 'Croissant Pur Beurre',
      hook: 'Feuilletage doré & croustillant du jour',
      price: 4.50,
      category: 'Pastry',
      image: '../images/sub catégorie images/Pastry/Croissant.jpg'
    },
    {
      id: 'rec-pastry-3',
      name: 'Teramisu au Chocolat',
      hook: 'Crème mascarpone onctueuse & cacao',
      price: 4.75,
      category: 'Pastry',
      image: '../images/sub catégorie images/sweets/Teramisu au Chocolat.jpg'
    },
    {
      id: 'rec-pastry-2',
      name: 'Mille Feuilles Artisanal',
      hook: 'Pâte feuilletée caramélisée & vanille',
      price: 5.25,
      category: 'Pastry',
      image: '../images/sub catégorie images/sweets/Mille Feuilles.jpg'
    },
    {
      id: 'rec-brunch-2',
      name: 'Croissant Benedict Salmon',
      hook: 'Saumon fumé, œuf poché & hollandaise',
      price: 16.00,
      category: 'Brunch',
      image: '../images/sub catégorie images/Brunch food/croissant-benedict-salmon-with-poched-egg-hollandaise-sauce-served-with-fresh-salad_140725-1329.avif'
    }
  ];

  const RECOMMENDED_DRINKS = [
    {
      id: 'rec-cold-1',
      name: "Jus D'Orange Pressé",
      hook: 'Oranges Valencia pressées à la minute',
      price: 4.50,
      category: 'Juice',
      image: "../images/sub catégorie images/Jus/Jus D'Orange.jpg"
    },
    {
      id: 'rec-latte-2',
      name: 'Café au Lait Artisanal',
      hook: 'Double espresso & mousse veloutée',
      price: 5.10,
      category: 'Coffee',
      image: '../images/sub catégorie images/latté/Café au Lait Artisanal.jpg'
    },
    {
      id: 'rec-tea-4',
      name: 'Thé Marocain à la Menthe',
      hook: 'Infusion traditionnelle à la menthe fraîche',
      price: 4.50,
      category: 'Tea',
      image: '../images/sub catégorie images/tea/The Marocain a la Menthe.jpg'
    },
    {
      id: 'rec-cold-2',
      name: 'Raspberry Smoothie',
      hook: 'Framboises fraîches & yaourt onctueux',
      price: 5.75,
      category: 'Smoothie',
      image: '../images/sub catégorie images/smoothie/raspberry-smoothie_1150-18529.jpg'
    }
  ];

  // Elements
  const heroImg = document.getElementById('product-hero-img');
  const titleEl = document.getElementById('product-title');
  const basePriceEl = document.getElementById('base-price');
  const descEl = document.getElementById('product-desc');
  const prepDetailEl = document.getElementById('product-prep-detail');
  const catBadgeEl = document.getElementById('product-category-badge');
  const drinkSection = document.getElementById('drink-options-section');
  const noteInput = document.getElementById('custom-item-note');
  const crossSellTitle = document.getElementById('cross-sell-title');
  const crossSellSubtitle = document.getElementById('cross-sell-subtitle');
  const crossSellGrid = document.getElementById('cross-sell-grid');
  const qtyMinus = document.getElementById('qty-minus');
  const qtyPlus = document.getElementById('qty-plus');
  const qtyValue = document.getElementById('qty-value');
  const totalPriceEl = document.getElementById('total-price');
  const addBtn = document.getElementById('add-to-order-btn');
  const addBtnLabel = document.getElementById('add-btn-label');
  const backBtn = document.getElementById('back-btn');
  const favBtn = document.getElementById('fav-btn');
  const favIcon = document.getElementById('fav-icon');
  const shareBtn = document.getElementById('share-btn');

  // Populate UI
  if (titleEl) titleEl.textContent = rawName;
  if (basePriceEl) basePriceEl.textContent = `${basePrice.toFixed(2)} DH`;
  if (catBadgeEl) catBadgeEl.textContent = rawCategory || (isDrink ? 'Boisson' : 'Plat');

  const story = buildProductStory(rawName, rawCategory, isDrink);
  if (descEl) descEl.textContent = story.desc;
  if (prepDetailEl) prepDetailEl.textContent = story.prep;

  if (heroImg) {
    heroImg.src = rawImage;
    heroImg.alt = rawName;
    heroImg.onerror = function () {
      this.onerror = null;
      if (storedItem?.fallbackImage) {
        this.src = storedItem.fallbackImage;
      } else {
        this.src = '../assets/waiter.jpg';
      }
    };
  }

  // Show drink options ONLY if it's a drink
  if (drinkSection) {
    if (isDrink) {
      drinkSection.classList.remove('hidden');
      if (noteInput) noteInput.placeholder = 'Ex: Lait végétal, bien chaud, glaçons à part...';
    } else {
      drinkSection.classList.add('hidden');
      if (noteInput) noteInput.placeholder = 'Ex: Sans oignon, sauce à part, bien cuit...';
    }
  }

  // State
  let qty = 1;
  let selectedSugar = 'Sucre normal';
  let selectedSize = 'Standard';
  let sizeExtra = 0;
  let isFav = false;
  const selectedRecIds = new Set();

  // Filter out current product from recommendations just in case
  const recommendations = (isDrink ? RECOMMENDED_PASTRIES_AND_DISHES : RECOMMENDED_DRINKS)
    .filter(r => r.name.toLowerCase() !== rawName.toLowerCase());

  if (crossSellTitle) {
    crossSellTitle.textContent = isDrink
      ? 'Accompagnez votre boisson 🥐'
      : 'Sublimez votre plat avec une boisson ☕';
  }
  if (crossSellSubtitle) {
    crossSellSubtitle.textContent = isDrink
      ? 'Nos pâtisseries & douceurs préparées du jour pour accompagner votre boisson :'
      : 'Ajoutez une boisson fraîche ou un café artisanal en 1 clic :';
  }

  function renderCrossSell() {
    if (!crossSellGrid) return;
    crossSellGrid.innerHTML = recommendations.map(rec => {
      const isSelected = selectedRecIds.has(rec.id);
      return `
        <div data-rec-id="${rec.id}" class="rec-card cursor-pointer rounded-2xl border ${isSelected ? 'border-2 border-primary bg-orange-50/60 dark:bg-orange-950/30 shadow-md' : 'border-gray-200 dark:border-zinc-800 bg-gray-50/60 dark:bg-zinc-900/60'} p-2.5 flex flex-col justify-between transition-all active:scale-95">
          <div>
            <div class="relative w-full h-24 rounded-xl overflow-hidden bg-gray-200 dark:bg-zinc-800 mb-2">
              <img src="${rec.image}" alt="${rec.name}" class="w-full h-full object-cover" onerror="this.onerror=null;this.src='../assets/waiter.jpg'" />
              <span class="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full bg-black/65 backdrop-blur-xs text-white text-[10px] font-extrabold">
                +${rec.price.toFixed(2)} DH
              </span>
            </div>
            <h4 class="font-bold text-xs text-gray-900 dark:text-white leading-tight line-clamp-1">${rec.name}</h4>
            <p class="text-[10px] text-gray-500 dark:text-gray-400 leading-snug mt-0.5 line-clamp-2">${rec.hook}</p>
          </div>
          <button type="button" class="mt-2.5 w-full py-1.5 rounded-xl text-[11px] font-extrabold uppercase tracking-wider flex items-center justify-center gap-1 transition-all ${isSelected ? 'bg-primary text-white shadow-xs' : 'bg-white dark:bg-zinc-800 text-primary border border-primary/30'}">
            <span class="material-symbols-outlined text-[14px]">${isSelected ? 'check' : 'add'}</span>
            <span>${isSelected ? 'Ajouté' : 'Ajouter'}</span>
          </button>
        </div>
      `;
    }).join('');

    crossSellGrid.querySelectorAll('.rec-card').forEach(card => {
      card.addEventListener('click', () => {
        const recId = card.getAttribute('data-rec-id');
        if (!recId) return;
        if (selectedRecIds.has(recId)) {
          selectedRecIds.delete(recId);
        } else {
          selectedRecIds.add(recId);
        }
        renderCrossSell();
        updateTotals();
      });
    });
  }

  function updateTotals() {
    const unit = basePrice + (isDrink ? sizeExtra : 0);
    const recsTotal = recommendations
      .filter(r => selectedRecIds.has(r.id))
      .reduce((sum, r) => sum + r.price, 0);
    const total = (unit * qty) + recsTotal;
    if (qtyValue) qtyValue.textContent = String(qty);
    if (totalPriceEl) totalPriceEl.textContent = `${total.toFixed(2)} DH`;
    if (addBtnLabel) {
      addBtnLabel.textContent = selectedRecIds.size > 0
        ? `Ajouter (+${selectedRecIds.size} accomp.)`
        : 'Ajouter';
    }
  }

  // Sugar buttons
  document.querySelectorAll('.sugar-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sugar-btn').forEach(b => {
        b.className = 'sugar-btn py-2.5 px-3 rounded-2xl border border-gray-200 dark:border-zinc-700 text-xs font-bold text-gray-700 dark:text-gray-300 transition-all';
      });
      btn.className = 'sugar-btn active-opt py-2.5 px-3 rounded-2xl border-2 border-primary bg-primary/10 text-xs font-extrabold text-primary transition-all';
      selectedSugar = btn.dataset.sugar || 'Sucre normal';
    });
  });

  // Size buttons
  document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.size-btn').forEach(b => {
        b.className = 'size-btn py-3 px-3 rounded-2xl border border-gray-200 dark:border-zinc-700 text-center transition-all';
        const firstSpan = b.querySelector('span:first-child');
        if (firstSpan) firstSpan.className = 'block text-xs font-bold text-gray-700 dark:text-gray-300';
      });
      btn.className = 'size-btn active-opt py-3 px-3 rounded-2xl border-2 border-primary bg-primary/10 text-center transition-all';
      const activeFirstSpan = btn.querySelector('span:first-child');
      if (activeFirstSpan) activeFirstSpan.className = 'block text-xs font-extrabold text-primary';
      selectedSize = btn.dataset.size || 'Standard';
      sizeExtra = parseFloat(btn.dataset.extra || '0') || 0;
      updateTotals();
    });
  });

  // Quantity controls
  qtyMinus?.addEventListener('click', () => {
    if (qty > 1) {
      qty--;
      updateTotals();
    }
  });

  qtyPlus?.addEventListener('click', () => {
    qty++;
    updateTotals();
  });

  // Back button
  backBtn?.addEventListener('click', () => {
    const activeTable = localStorage.getItem('stitch_current_table') || '12';
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = (localStorage.getItem('stitch_order_mode') === 'delivery') ? '../swiggy-style_elite_main_menu_390x2500/index.html?mode=delivery' : `../swiggy-style_elite_main_menu_390x2500/index.html?table=${encodeURIComponent(activeTable)}`;
    }
  });

  // Favorite button
  favBtn?.addEventListener('click', () => {
    isFav = !isFav;
    if (favIcon) {
      favIcon.style.fontVariationSettings = isFav ? "'FILL' 1" : "'FILL' 0";
      favIcon.classList.toggle('text-red-500', isFav);
    }
  });

  // Share button
  shareBtn?.addEventListener('click', async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: rawName, text: `Découvrez ${rawName} chez Stitch Café`, url: shareUrl });
        return;
      } catch (_) {}
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      const toast = document.createElement('div');
      toast.className = 'fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg';
      toast.textContent = '✓ Lien copié !';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 1800);
    } catch (_) {}
  });

  // Add to Order (Single clean insertion into stitch_cart + selected cross-sell recommendations)
  let isSubmitting = false;
  addBtn?.addEventListener('click', () => {
    if (isSubmitting) return;
    isSubmitting = true;

    const unitPrice = Number((basePrice + (isDrink ? sizeExtra : 0)).toFixed(2));
    const mods = [];
    if (isDrink) {
      if (selectedSugar) mods.push(selectedSugar);
      if (selectedSize && selectedSize !== 'Standard') mods.push(selectedSize);
    }
    const noteText = (noteInput?.value || '').trim();
    if (noteText) {
      mods.push(`Note: ${noteText}`);
    }

    const displayedHeroSrc = heroImg?.src || rawImage;

    // Clear any legacy stitch_last_order to prevent double addition
    localStorage.removeItem('stitch_last_order');

    let currentCart = [];
    try {
      currentCart = JSON.parse(localStorage.getItem('stitch_cart') || '[]');
      if (!Array.isArray(currentCart)) currentCart = [];
    } catch (_) {
      currentCart = [];
    }

    // 1. Add main product
    const modsKey = mods.join('|');
    const existingIndex = currentCart.findIndex(item => item && item.name === rawName && (item.mods || []).join('|') === modsKey);

    if (existingIndex > -1) {
      const prevQty = parseInt(currentCart[existingIndex].quantity ?? currentCart[existingIndex].qty ?? 1, 10) || 1;
      currentCart[existingIndex].quantity = prevQty + qty;
      currentCart[existingIndex].qty = prevQty + qty;
    } else {
      currentCart.push({
        id: rawId + '-' + Date.now(),
        name: rawName,
        price: unitPrice,
        quantity: qty,
        qty: qty,
        image: displayedHeroSrc,
        image_url: displayedHeroSrc,
        category: rawCategory,
        mods,
        notes: noteText
      });
    }

    // 2. Add any selected Cross-Sell Recommendations
    const chosenRecs = recommendations.filter(r => selectedRecIds.has(r.id));
    for (const rec of chosenRecs) {
      const recIndex = currentCart.findIndex(item => item && item.name === rec.name && !(item.mods && item.mods.length));
      if (recIndex > -1) {
        const prevQty = parseInt(currentCart[recIndex].quantity ?? currentCart[recIndex].qty ?? 1, 10) || 1;
        currentCart[recIndex].quantity = prevQty + 1;
        currentCart[recIndex].qty = prevQty + 1;
      } else {
        currentCart.push({
          id: rec.id + '-' + Date.now(),
          name: rec.name,
          price: Number(rec.price.toFixed(2)),
          quantity: 1,
          qty: 1,
          image: rec.image,
          image_url: rec.image,
          category: rec.category,
          mods: ['Accompagnement recommandé'],
          notes: ''
        });
      }
    }

    localStorage.setItem('stitch_cart', JSON.stringify(currentCart));

    addBtn.innerHTML = '<span class="uppercase tracking-wider mx-auto">✓ Ajouté au panier !</span>';
    addBtn.classList.replace('bg-primary', 'bg-green-600');

    const activeTable = localStorage.getItem('stitch_current_table') || '12';
    setTimeout(() => {
      window.location.href = (localStorage.getItem('stitch_order_mode') === 'delivery') ? '../swiggy-style_elite_main_menu_390x2500/index.html?mode=delivery' : `../swiggy-style_elite_main_menu_390x2500/index.html?table=${encodeURIComponent(activeTable)}`;
    }, 350);
  });

  renderCrossSell();
  updateTotals();
});

const products = [
  { id: "toast_1", name: "Croissant Benedict Salmon", description: "Croissant pur beurre, saumon fumé, œuf poché et hollandaise", price: 16.00, image: "../images/sub catégorie images/Brunch food/croissant-benedict-salmon-with-poched-egg-hollandaise-sauce-served-with-fresh-salad_140725-1329.avif", category: "eggs" },
  { id: "toast_2", name: "Toast Champignon Fromage", description: "Champignons sautés, fromage fondant sur pain au levain", price: 14.50, image: "../images/sub catégorie images/toast/Toast Champignon Frommage.jpg", category: "eggs" },
  { id: "toast_3", name: "Toast Frittata", description: "Frittata aux herbes, champignons et huile parfumée", price: 12.50, image: "../images/sub catégorie images/toast/Toast Frittata.jpg", category: "eggs" },
  { id: "toast_4", name: "Toast Avocat", description: "Pain artisanal grillé et avocat écrasé minute", price: 10.50, image: "../images/sub catégorie images/toast/toast.jpg", category: "toast" },
  { id: "toast_5", name: "Toast Vegan", description: "Pain complet aux céréales, légumes grillés et pousses", price: 12.00, image: "../images/sub catégorie images/toast/Toast Vegan.jpg", category: "vegan" },
  { id: "toast_6", name: "Herbed Focaccia", description: "Focaccia tiède au romarin et huile d'olive vierge", price: 9.50, image: "../images/sub catégorie images/Brunch food/Herbed Focaccia.jpg", category: "toast" },
  { id: "toast_7", name: "Pumpkin Stew", description: "Mijoté doux aux tomates, poivrons et œufs", price: 11.25, image: "../images/sub catégorie images/Brunch food/Pumpkin Stew.jpg", category: "eggs" },
  { id: "toast_8", name: "Soupe de Fèves (Bissara)", description: "Velouté traditionnel de fèves à l'huile d'olive", price: 10.00, image: "../images/sub catégorie images/Brunch food/Soupe de Fèves.jpg", category: "vegan" },
  { id: "toast_9", name: "Salade César", description: "Romaine croquante, volaille grillée, croûtons et parmesan", price: 14.00, image: "../images/sub catégorie images/Brunch food/Salade Cesar.jpg", category: "vegan" },
  { id: "toast_10", name: "Salade Marocaine", description: "Tomates fraîches, poivrons grillés et herbes ciselées", price: 12.50, image: "../images/sub catégorie images/Brunch food/Salade Marocaine.jpg", category: "vegan" },
  { id: "toast_11", name: "Salade Espagnole", description: "Olives, tomates mûres, fromage frais et herbes", price: 11.00, image: "../images/sub catégorie images/Brunch food/Salade Espagnol.jpg", category: "eggs" },
  { id: "toast_12", name: "Salade Mozzarella", description: "Mozzarella fondante, tomates cerises et basilic frais", price: 13.50, image: "../images/sub catégorie images/Brunch food/Salade avec  Modzarelle.jpg", category: "vegan" },
  { id: "toast_13", name: "Salade de Poulet Grillé", description: "Émincé de poulet mariné et crudités croquantes", price: 15.00, image: "../images/sub catégorie images/Brunch food/Salade de Poulet.jpg", category: "eggs" },
  { id: "toast_14", name: "Salade Mexicaine", description: "Maïs doux, haricots rouges, avocat et citron vert", price: 13.50, image: "../images/sub catégorie images/Brunch food/Salade Mexicaine.jpg", category: "vegan" },
  { id: "toast_15", name: "Salade Russe", description: "Macédoine gourmande de légumes fondants, thon et riz", price: 12.50, image: "../images/sub catégorie images/Brunch food/Salade Russe.jpg", category: "eggs" }
];

let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  setupEventListeners();
});

function redirectToCustomization(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  try {
    localStorage.setItem('stitch_customizing_item', JSON.stringify(product));
  } catch (_) {}
  const url = `../toast_brunch_customization_view/index.html?id=${encodeURIComponent(product.id)}&name=${encodeURIComponent(product.name)}&price=${encodeURIComponent(product.price)}&image=${encodeURIComponent(product.image)}&category=Toast`;
  window.location.href = url;
}

function addToCart(productId) {
  redirectToCustomization(productId);
}

function renderProducts(filter = 'all') {
  const list = document.getElementById('product-list');
  if (!list) return;

  const filteredProducts = filter === 'all' ? products : products.filter(p => p.category === filter);

  list.innerHTML = filteredProducts.map((product, index) => `
        <div onclick="redirectToCustomization('${product.id}')" class="flex flex-col bg-white dark:bg-slate-800 p-3 rounded-2xl border-2 border-white/70 dark:border-white/10 ring-1 ring-black/5 dark:ring-white/5 ring-offset-1 ring-offset-white dark:ring-offset-[#1a100c] shadow-[0_4px_14px_rgba(0,0,0,0.12)] hover:shadow-[0_10px_24px_rgba(0,0,0,0.18)] fade-in-up cursor-pointer group transition-all duration-300 transform hover:-translate-y-1" style="animation-delay: ${index * 0.05}s">
            <div class="product-image w-full h-44 rounded-xl bg-cover bg-center mb-3 relative overflow-hidden" role="img" aria-label="${product.name}" style="background-image: url(&quot;${product.image}&quot;);">
                <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity"></div>
            </div>
            <div class="flex-1 flex flex-col px-1">
                <h4 class="font-bold text-[14px] text-gray-800 dark:text-white leading-tight mb-1 line-clamp-1">${product.name}</h4>
                <div class="flex items-center gap-1.5 mb-2">
                    <div class="flex items-center gap-0.5">
                        <span class="material-symbols-outlined text-[#FFC107] text-[12px]">star</span>
                        <span class="text-[10px] font-bold text-green-700 dark:text-green-300">4.8</span>
                    </div>
                    <span class="text-[9px] text-gray-400 dark:text-gray-500">(2.3k+)</span>
                </div>
                <p class="text-[10px] text-gray-500 dark:text-gray-400 line-clamp-2 mb-3 leading-relaxed">${product.description}</p>
                <div class="flex items-center justify-between gap-2 mt-auto">
                    <span class="text-primary font-extrabold text-[14px]">${product.price.toFixed(2)}DH</span>
                    <button class="w-[64px] h-[32px] rounded-full bg-[#FF5200] flex items-center justify-center !text-white text-[11px] font-bold uppercase shadow-sm active:scale-95 hover:bg-primary/90 transition-all font-outfit border-2 border-orange-400 ring-2 ring-orange-500/50 ring-offset-1 ring-orange-200 dark:ring-offset-[#1a100c] shadow-[0_2px_8px_rgba(0,0,0,0.18)] hover:shadow-lg" style="color: white !important;" onclick="event.stopPropagation(); redirectToCustomization('${product.id}')">ADD</button>
                </div>
            </div>
        </div>
    `).join('');
}

function setupEventListeners() {
  const backBtn = document.getElementById('back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      const _activeTbl = localStorage.getItem('stitch_current_table') || '12'; window.location.href = (localStorage.getItem('stitch_order_mode') === 'delivery') ? '../swiggy-style_elite_main_menu_390x2500/index.html?mode=delivery' : ('../swiggy-style_elite_main_menu_390x2500/index.html?table=' + encodeURIComponent(_activeTbl));
    });
  }

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      currentFilter = e.currentTarget.dataset.filter;
      renderProducts(currentFilter);
    });
  });
}

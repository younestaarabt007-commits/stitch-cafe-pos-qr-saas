const products = [
  { id: "creme_latte_fuite_juice_1", name: "Jus D'Orange Pressé", description: "Oranges Valencia pressées à froid à la minute", price: 4.50, image: "../images/sub catégorie images/Jus/Jus D'Orange.jpg", category: "pure" },
  { id: "creme_latte_fuite_juice_2", name: "Jus D'Avocat Onctueux", description: "Avocat frais mixé au lait froid et fruits secs", price: 6.50, image: "../images/sub catégorie images/Jus/Jus D'avocat.jpg", category: "creamy" },
  { id: "creme_latte_fuite_juice_3", name: "Cocktail Exotique", description: "Fruits exotiques frais et douceur lactée", price: 6.50, image: "../images/sub catégorie images/Jus/Exotic-cocktail-.avif", category: "creamy" },
  { id: "creme_latte_fuite_juice_4", name: "Iced Orange Zest", description: "Orange givrée et mousse légère", price: 5.50, image: "../images/sub catégorie images/Jus/glass-iced-orange-cocktail-garnished-with-orange-zest-strawberry-shape_140725-6038.avif", category: "creamy" },
  { id: "creme_latte_fuite_juice_5", name: "Mango Indian Drink", description: "Purée de mangue Alphonso et crème légère", price: 5.75, image: "../images/sub catégorie images/Jus/delicious-indian-mango-drink-high-angle_23-2148734680.avif", category: "creamy" },
  { id: "creme_latte_fuite_juice_6", name: "Jus de Fraise Frais", description: "Fraises fraîches du jour mixées minute", price: 5.20, image: "../images/sub catégorie images/Jus/Jus de Fraise .jpg", category: "pure" },
  { id: "creme_latte_fuite_juice_7", name: "Jus de Mangue Pur", description: "Nectar 100% mangue fraîche", price: 5.25, image: "../images/sub catégorie images/Jus/Jus Mangue.jpg", category: "pure" }
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
  window.location.href = `../orange juce_customization_view_1/index.html?id=${encodeURIComponent(product.id)}&price=${encodeURIComponent(product.price)}&name=${encodeURIComponent(product.name)}&image=${encodeURIComponent(product.image)}&category=Juice`;
}

function renderProducts(filter = 'all') {
  const list = document.getElementById('product-list');
  if (!list) return;

  const searchTerm = document.getElementById('search-input')?.value.toLowerCase() || '';
  const filteredProducts = products.filter(p => {
    const matchesCategory = filter === 'all' || p.category === filter;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  if (filteredProducts.length === 0) {
    list.innerHTML = '<div class="col-span-1 text-center py-8 text-gray-500">Aucun produit trouvé</div>';
    return;
  }

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
              <button class="w-[64px] h-[32px] rounded-full bg-[#FF5200] flex items-center justify-center !text-white text-[11px] font-bold uppercase shadow-sm active:scale-95 hover:bg-primary/90 transition-all font-outfit border-2 border-orange-400 ring-2 ring-orange-500/50 ring-offset-1 ring-orange-200 dark:ring-offset-[#1a100c]" style="color: white !important;" onclick="event.stopPropagation(); addToCart('${product.id}')">ADD</button>
          </div>
      </div>
    </div>
  `).join('');
}

function addToCart(productId) {
  redirectToCustomization(productId);
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
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active', 'bg-black', 'text-white'));
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.add('bg-white', 'text-slate-800'));

      e.currentTarget.classList.remove('bg-white', 'text-slate-800');
      e.currentTarget.classList.add('active', 'bg-black', 'text-white');

      currentFilter = e.currentTarget.dataset.filter;
      renderProducts(currentFilter);
    });
  });
}

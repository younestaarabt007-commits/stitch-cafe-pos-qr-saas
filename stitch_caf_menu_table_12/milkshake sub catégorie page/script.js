const products = [
  {
    id: "shake_1",
    name: "Milkshake Café Chocolat",
    description: "Cacao intense, espresso et crème glacée onctueuse",
    calories: "480 kcal",
    price: 5.20,
    image: "../images/sub catégorie images/milshake/Milkshake Café Chocolat.jpg",
    category: "chocolate"
  },
  {
    id: "shake_2",
    name: "Milkshake Oreo",
    description: "Éclats d'Oreo croquants et vanille de Madagascar",
    calories: "460 kcal",
    price: 5.00,
    image: "../images/sub catégorie images/milshake/Milkshake Oreo.jpg",
    category: "chocolate"
  },
  {
    id: "shake_3",
    name: "Strawberry Ice Milkshake",
    description: "Fraises fraîches, glace vanille et chantilly",
    calories: "430 kcal",
    price: 5.40,
    image: "../images/sub catégorie images/milshake/strawberry-ice milkshake.jpg",
    category: "fruit"
  },
  {
    id: "shake_4",
    name: "Milkshake Banane Caramel",
    description: "Banane fraîche et filet de caramel beurre salé",
    calories: "445 kcal",
    price: 5.60,
    image: "../images/sub catégorie images/milshake/Milkshake Banane.jpg",
    category: "fruit"
  },
  {
    id: "shake_5",
    name: "Greek Yogurt Fruit Shake",
    description: "Yaourt grec glacé et fruits rouges frais",
    calories: "410 kcal",
    price: 5.30,
    image: "../images/sub catégorie images/milshake/Greek Yogurt Fruit.jpg",
    category: "fruit"
  },
  {
    id: "shake_6",
    name: "Milkshake Caramel Beurre Salé",
    description: "Glace vanille onctueuse et nappage caramel maison",
    calories: "470 kcal",
    price: 5.40,
    image: "../images/sub catégorie images/milshake/Milkshake Caramel.jpg",
    category: "chocolate"
  },
  {
    id: "shake_7",
    name: "Peanut Butter Milkshake",
    description: "Beurre de cacahuète torréfié et lait glacé",
    calories: "490 kcal",
    price: 5.60,
    image: "../images/sub catégorie images/milshake/Peanut Milkshak.jpg",
    category: "protein"
  },
  {
    id: "shake_8",
    name: "Kiwi Milkshake",
    description: "Kiwi frais mixé à la crème glacée vanille",
    calories: "420 kcal",
    price: 5.10,
    image: "../images/sub catégorie images/milshake/kiwi-milk-shake-.jpg",
    category: "fruit"
  },
  {
    id: "shake_9",
    name: "Chocolate Milkshake Classique",
    description: "Chocolat noir 70%, glace vanille et chantilly",
    calories: "440 kcal",
    price: 6.25,
    image: "../images/sub catégorie images/milshake/close-up-milkshake-glass-plate_.jpg",
    category: "chocolate"
  }
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
  window.location.href = `../milkshake_customization_view/index.html?id=${encodeURIComponent(product.id)}&price=${encodeURIComponent(product.price)}&name=${encodeURIComponent(product.name)}&image=${encodeURIComponent(product.image)}&category=Shake`;
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
                    <button class="w-[64px] h-[32px] rounded-full bg-[#FF5200] flex items-center justify-center !text-white text-[11px] font-bold uppercase shadow-sm active:scale-95 hover:bg-primary/90 transition-all font-outfit border-2 border-orange-400 ring-2 ring-orange-500/50 ring-offset-1 ring-orange-200 dark:ring-offset-[#1a100c]" style="color: white !important;" onclick="event.stopPropagation(); addToCart('${product.id}')">ADD</button>
                </div>
            </div>
        </div>
    `).join('');
}

function setupEventListeners() {
  const backBtn = document.getElementById('back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      window.history.back();
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

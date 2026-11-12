const products = [
    { id: "sweet_1", name: "Cheese Cake Oreo", description: "Creamy oreo cheesecake with cookie crust", price: 18.00, image: "../images/sub catégorie images/sweets/Cheese Cake Oreo.jpg", category: "cheesecake" },
    { id: "sweet_2", name: "Cheese Cake au Caramel", description: "Rich caramel cheesecake topping", price: 17.00, image: "../images/sub catégorie images/sweets/Cheese Cake au Caramel.jpg", category: "cheesecake" },
    { id: "sweet_3", name: "Cheese Cake au Citron", description: "Zesty lemon cheesecake", price: 16.00, image: "../images/sub catégorie images/sweets/Chees Cake au Citron.jpg", category: "cheesecake" },
    { id: "sweet_4", name: "Orange Cheese Cake", description: "Fresh orange flavored cheesecake", price: 16.50, image: "../images/sub catégorie images/sweets/Orange Chesse Cake.jpg", category: "cheesecake" },
    { id: "sweet_5", name: "Chocolat Fondu", description: "Melted dark chocolate with fruits", price: 22.00, image: "../images/sub catégorie images/sweets/Chocolat Fondu.jpg", category: "chocolate" },
    { id: "sweet_6", name: "Chocolat Cake", description: "Rich chocolate cake with strawberries", price: 20.00, image: "../images/sub catégorie images/sweets/Chocolat Cake with Stawberrys.jpg", category: "chocolate" },
    { id: "sweet_7", name: "Dark & White Chocolat", description: "Mixed chocolate cake", price: 21.00, image: "../images/sub catégorie images/sweets/Dark an White Chocolat Cake .jpg", category: "chocolate" },
    { id: "sweet_8", name: "Tiramisu au Chocolat", description: "Classic Italian chocolate tiramisu", price: 19.00, image: "../images/sub catégorie images/sweets/Teramisu au Chocolat.jpg", category: "dessert" },
    { id: "sweet_9", name: "Crème Caramel", description: "Smooth caramel custard", price: 14.00, image: "../images/sub catégorie images/sweets/Crème Caramel.jpg", category: "dessert" },
    { id: "sweet_10", name: "Waffels au Miel", description: "Waffles with honey and cream", price: 15.00, image: "../images/sub catégorie images/sweets/Waffels au Miels Crème.jpg", category: "waffles" },
    { id: "sweet_11", name: "Waffels au Fruits", description: "Waffles topped with fresh fruits", price: 16.00, image: "../images/sub catégorie images/sweets/Waffels au fruit.jpg", category: "waffles" },
    { id: "sweet_12", name: "Banana Split", description: "Classic banana split with ice cream", price: 20.00, image: "../images/sub catégorie images/sweets/Banana Split.jpg", category: "icecream" },
    { id: "sweet_13", name: "French Toast", description: "Crispy French toast with syrup", price: 12.00, image: "../images/sub catégorie images/sweets/French Toast.jpg", category: "toast" },
    { id: "sweet_14", name: "Mille Feuilles", description: "Frangipane layered pastry", price: 14.00, image: "../images/sub catégorie images/sweets/Mille Feuilles.jpg", category: "patisserie" },
    { id: "sweet_15", name: "Pancake aux Fruits", description: "Fluffy pancakes with fresh berries", price: 18.00, image: "../images/sub catégorie images/sweets/pancake avec fraise et chocolat.jpg", category: "pancake" }
];

let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupEventListeners();
});

function redirectToCustomization(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const n = product.name;
    const img = product.image;
    const pr = product.price;
    window.location.href = `../sweet_pastries_customization_view/index.html?name=${encodeURIComponent(n)}&image=${encodeURIComponent(img)}&price=${pr}`;
}

function addToCart(productId) {
    redirectToCustomization(productId);
}

function renderProducts(filter = 'all') {
    const list = document.getElementById('product-list');
    if (!list) return;
    const filteredProducts = filter === 'all' ? products : products.filter(p => p.category.toLowerCase() === filter.toLowerCase());
    list.innerHTML = filteredProducts.map((product, index) => `
        <div onclick="redirectToCustomization('${product.id}')" class="flex flex-col bg-white dark:bg-slate-800 p-3 rounded-2xl border-2 border-white/70 dark:border-white/10 ring-1 ring-black/5 dark:ring-white/5 ring-offset-1 ring-offset-white dark:ring-offset-[#1a100c] shadow-[0_4px_14px_rgba(0,0,0,0.12)] hover:shadow-[0_10px_24px_rgba(0,0,0,0.18)] fade-in-up cursor-pointer group transition-all duration-300 transform hover:-translate-y-1" style="animation-delay:${index * 0.05}s">
            <div class="product-image w-full h-44 rounded-xl bg-cover bg-center mb-3 relative overflow-hidden" role="img" aria-label="${product.name}" style="background-image: url('${product.image}');">
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
            const _activeTbl = localStorage.getItem('stitch_current_table') || '12'; window.location.href = (localStorage.getItem('stitch_order_mode') === 'delivery') ? '../swiggy-style_elite_main_menu_390x2500/index.html?mode=delivery' : ('../swiggy-style_elite_main_menu_390x2500/index.html?table=' + encodeURIComponent(_activeTbl));
        });
    }

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.remove('active', 'bg-primary', 'text-white');
                b.classList.add('bg-white', 'dark:bg-zinc-800', 'text-zinc-500', 'dark:text-white');
            });
            e.currentTarget.classList.remove('bg-white', 'dark:bg-zinc-800', 'text-zinc-500', 'dark:text-white');
            e.currentTarget.classList.add('active', 'bg-primary', 'text-white');

            currentFilter = e.currentTarget.dataset.filter;
            renderProducts(currentFilter);
        });
    });
}
// Product Data - Viennoiserie + Patisserie
const products = [
    // ============ VIENNOISERIE ============
    { id: 1, name: "Croissant", description: "Buttery flaky pastry", price: 4.50, image: "../images/sub catégorie images/Pastry/Croissant.jpg", category: "viennoiserie" },
    { id: 2, name: "Pain au Chocolat", description: "Rich chocolate bread", price: 4.80, image: "../images/sub catégorie images/Pastry/Petit Pain au Chocolat.jpg", category: "viennoiserie" },
    { id: 3, name: "Pain aux Raisins", description: "Raisin pastry with cream", price: 5.00, image: "../images/sub catégorie images/Pastry/Pain Raisins.jpg", category: "viennoiserie" },
    { id: 4, name: "Pain Suisse", description: "Swiss pastry with cream", price: 5.50, image: "../images/sub catégorie images/Pastry/Pain Suise.jpg", category: "viennoiserie" },

    // ============ PATISSERIE ============
    { id: 5, name: "French Toast", description: "Flaky layers, French butter", price: 4.50, image: "../images/sub catégorie images/sweets/French Toast.jpg", category: "patisserie" },
    { id: 6, name: "Mille Feuilles", description: "Frangipane, toasted almond", price: 5.25, image: "../images/sub catégorie images/sweets/Mille Feuilles.jpg", category: "patisserie" },
    { id: 7, name: "Tiramisu au Chocolat", description: "Choux pastry, rich ganache", price: 4.75, image: "../images/sub catégorie images/sweets/Teramisu au Chocolat.jpg", category: "patisserie" },
    { id: 8, name: "Waffle with Fruits", description: "Vanilla custard, fresh berries", price: 5.80, image: "../images/sub catégorie images/sweets/Waffels au fruit.jpg", category: "patisserie" },
    { id: 9, name: "Honey Waffle", description: "Honey and cream waffle", price: 5.60, image: "../images/sub catégorie images/sweets/Waffels au Miels Crème.jpg", category: "patisserie" },
    { id: 10, name: "Lemon Cheesecake", description: "Zesty curd, torched meringue", price: 5.90, image: "../images/sub catégorie images/sweets/Chees Cake au Citron.jpg", category: "patisserie" },
    { id: 11, name: "Orange Cheesecake", description: "Orange flavored cheesecake", price: 18.00, image: "../images/sub catégorie images/sweets/Orange Chesse Cake.jpg", category: "patisserie" },
    { id: 12, name: "Oreo Cheesecake", description: "Creamy cheesecake with Oreo crust", price: 5.90, image: "../images/sub catégorie images/sweets/Cheese Cake Oreo.jpg", category: "patisserie" },
    { id: 13, name: "Caramel Cheesecake", description: "Smooth caramel cheesecake", price: 5.90, image: "../images/sub catégorie images/sweets/Cheese Cake au Caramel.jpg", category: "patisserie" },
    { id: 14, name: "Dark & White Chocolate Cake", description: "Moist crumb, vanilla frosting", price: 4.95, image: "../images/sub catégorie images/sweets/Dark an White Chocolat Cake .jpg", category: "patisserie" },
    { id: 15, name: "Chocolate Cake with Strawberries", description: "Rich chocolate with fresh strawberries", price: 6.50, image: "../images/sub catégorie images/sweets/Chocolat Cake with Stawberrys.jpg", category: "patisserie" },
    { id: 16, name: "Crème Caramel", description: "Silky baked custard with caramel", price: 4.20, image: "../images/sub catégorie images/sweets/Crème Caramel.jpg", category: "patisserie" },
    { id: 17, name: "Banana Split", description: "Banana, ice cream, chocolate", price: 5.50, image: "../images/sub catégorie images/sweets/Banana Split.jpg", category: "patisserie" },
    { id: 18, name: "Pancake with Fruits", description: "Fluffy pancakes with fresh fruits", price: 6.50, image: "../images/sub catégorie images/sweets/pancake avec fraise et chocolat.jpg", category: "patisserie" },
    { id: 19, name: "Chocolat Fondu", description: "70% Cacao, Double Espresso", price: 6.00, image: "../images/sub catégorie images/sweets/Chocolat Fondu.jpg", category: "patisserie" },
    { id: 20, name: "Baklawa", description: "Flaky layers with nuts & honey", price: 5.50, image: "../images/sub catégorie images/Pastry/Baklawa.jpg", category: "patisserie" },
    { id: 21, name: "Basbousa", description: "Semolina cake with syrup", price: 4.75, image: "../images/sub catégorie images/Pastry/Basbousa.jpg", category: "patisserie" },
    { id: 22, name: "Cookies au Chocolat", description: "Rich chocolate cookies", price: 6.00, image: "../images/sub catégorie images/Pastry/Cokkies au chocolat.jpg", category: "patisserie" },
    { id: 23, name: "Donuts", description: "Classic glazed donuts", price: 5.00, image: "../images/sub catégorie images/Pastry/Donuts.jpg", category: "patisserie" }
];

let currentFilter = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupEventListeners();
});

// Render Products
function renderProducts(filter = 'all') {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    const filteredProducts = filter === 'all'
        ? products
        : products.filter(p => p.category === filter);

    grid.innerHTML = filteredProducts.map((product, index) => `
        <div onclick="redirectToCustomization('${product.id}')" class="flex flex-col bg-white dark:bg-slate-800 p-3 rounded-2xl border-2 border-white/70 dark:border-white/10 ring-1 ring-black/5 dark:ring-white/5 ring-offset-1 ring-offset-white dark:ring-offset-[#1a100c] shadow-[0_4px_14px_rgba(0,0,0,0.12)] hover:shadow-[0_10px_24px_rgba(0,0,0,0.18)] fade-in-up cursor-pointer group transition-all duration-300 transform hover:-translate-y-1" style="animation-delay: ${index * 0.05}s">
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

function addToCart(productId) {
    redirectToCustomization(productId);
}

// Redirect to Customization Page
function redirectToCustomization(productId) {
    const product = products.find(p => String(p.id) === String(productId));
    if (!product) return;

    let customizationUrl = '../petit pain bakery_customization_view/index.html'; // Default

    // Logic to determine customization page based on product or category
    if (product.category === 'viennoiserie' ||
        product.category === 'patisserie' ||
        product.name.toLowerCase().includes('brioche') ||
        product.name.toLowerCase().includes('baguette') ||
        product.name.toLowerCase().includes('croissant') ||
        product.name.toLowerCase().includes('cake')) {
        customizationUrl = '../fast_food_customization_view/index.html';
    } else {
        customizationUrl = '../petit pain bakery_customization_view/index.html';
    }

    // Append price, name, and image to URL
    window.location.href = `${customizationUrl}?price=${product.price}&name=${encodeURIComponent(product.name)}&image=${encodeURIComponent(product.image)}`;
}

// Setup Event Listeners
function setupEventListeners() {
    // Back Button
    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            const _activeTbl = localStorage.getItem('stitch_current_table') || '12'; window.location.href = (localStorage.getItem('stitch_order_mode') === 'delivery') ? '../swiggy-style_elite_main_menu_390x2500/index.html?mode=delivery' : ('../swiggy-style_elite_main_menu_390x2500/index.html?table=' + encodeURIComponent(_activeTbl));
        });
    }

    // Search Input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filtered = products.filter(p =>
                p.name.toLowerCase().includes(searchTerm) ||
                p.description.toLowerCase().includes(searchTerm)
            );

            const grid = document.getElementById('product-grid');
            if (grid) {
                grid.innerHTML = filtered.map((product, index) => `
        <div onclick="redirectToCustomization('${product.id}')" class="flex flex-col bg-white dark:bg-slate-800 p-3 rounded-2xl border-2 border-white/70 dark:border-white/10 ring-1 ring-black/5 dark:ring-white/5 ring-offset-1 ring-offset-white dark:ring-offset-[#1a100c] shadow-[0_4px_14px_rgba(0,0,0,0.12)] hover:shadow-[0_10px_24px_rgba(0,0,0,0.18)] fade-in-up cursor-pointer group transition-all duration-300 transform hover:-translate-y-1" style="animation-delay: ${index * 0.05}s">
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
        });
    }

    // Filter Buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');

            currentFilter = e.currentTarget.dataset.filter;
            renderProducts(currentFilter);
        });
    });
}

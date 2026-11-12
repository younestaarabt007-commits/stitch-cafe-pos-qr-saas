const products = [
    { id: "bakery_1", name: "Croissant", description: "Buttery flaky pastry", price: 4.50, image: "../images/sub catégorie images/Pastry/Croissant.jpg", category: "viennoiserie" },
    { id: "bakery_2", name: "Pain au Chocolat", description: "Rich chocolate bread", price: 4.80, image: "../images/sub catégorie images/Pastry/Petit Pain au Chocolat.jpg", category: "viennoiserie" },
    { id: "bakery_3", name: "Pain aux Raisins", description: "Raisin pastry with cream", price: 5.00, image: "../images/sub catégorie images/Pastry/Pain Raisins.jpg", category: "viennoiserie" },
    { id: "bakery_4", name: "Pain Suisse", description: "Swiss pastry with cream", price: 5.50, image: "../images/sub catégorie images/Pastry/Pain Suise.jpg", category: "viennoiserie" },
    { id: "bakery_5", name: "Baklawa", description: "Flaky layers with nuts & honey", price: 5.50, image: "../images/sub catégorie images/Pastry/Baklawa.jpg", category: "patisserie" },
    { id: "bakery_6", name: "Basbousa", description: "Semolina cake with syrup", price: 4.75, image: "../images/sub catégorie images/Pastry/Basbousa.jpg", category: "patisserie" },
    { id: "bakery_7", name: "Cookies au Chocolat", description: "Rich chocolate cookies", price: 6.00, image: "../images/sub catégorie images/Pastry/Cokkies au chocolat.jpg", category: "patisserie" },
    { id: "bakery_8", name: "Donuts", description: "Classic glazed donuts", price: 5.00, image: "../images/sub catégorie images/Pastry/Donuts.jpg", category: "patisserie" },
    { id: "bakery_9", name: "French Toast", description: "Flaky layers, French butter", price: 3.50, image: "../images/sub catégorie images/sweets/French Toast.jpg", category: "patisserie" },
    { id: "bakery_10", name: "Mille Feuilles", description: "Frangipane, toasted almond", price: 5.25, image: "../images/sub catégorie images/sweets/Mille Feuilles.jpg", category: "patisserie" }
];

let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupEventListeners();
});

// Navigate to customization page
function redirectToCustomization(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const n = product.name;
    const img = product.image;
    const pr = product.price;
    window.location.href = `../petit pain bakery_customization_view/index.html?name=${encodeURIComponent(n)}&image=${encodeURIComponent(img)}&price=${pr}`;
}

// Global Add to Cart
function addToCart(productId) {
    redirectToCustomization(productId);
}

function renderProducts(filter = 'all') {
    const list = document.getElementById('product-list');
    if (!list) return;
    const filteredProducts = filter === 'all' ? products : products.filter(p => p.category.toLowerCase() === filter.toLowerCase());
    list.innerHTML = filteredProducts.map((product, index) => `
            <div onclick="redirectToCustomization('${product.id}')" class="flex flex-col bg-white dark:bg-slate-800 p-3 rounded-2xl border-2 border-white/70 dark:border-white/10 ring-1 ring-black/5 dark:ring-white/5 ring-offset-1 ring-offset-white dark:ring-offset-[#1a100c] shadow-[0_4px_14px_rgba(0,0,0,0.12)] hover:shadow-[0_10px_24px_rgba(0,0,0,0.18)] fade-in-up cursor-pointer group transition-all duration-300 transform hover:-translate-y-1" style="animation-delay:${index * 0.05}s">
                <div class="product-image w-full h-44 rounded-xl bg-cover bg-center mb-3 relative overflow-hidden" role="img" aria-label="${product.name}" style="background-image:url('${product.image}')">
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

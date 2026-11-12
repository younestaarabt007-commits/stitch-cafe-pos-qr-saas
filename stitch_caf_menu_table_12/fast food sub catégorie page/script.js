const products = [
    { id: "fast_1", name: "Tacos Mixte", description: "Mixed tacos with meat and fries", price: 18.00, image: "../images/sub catégorie images/fast food/Tacos Mixe.jpg", category: "tacos" },
    { id: "fast_2", name: "Tacos Viande Haché", description: "Ground meat tacos", price: 16.00, image: "../images/sub catégorie images/fast food/Tacos Viande Haché.jpg", category: "tacos" },
    { id: "fast_3", name: "American Burger", description: "Classic American burger", price: 22.00, image: "../images/sub catégorie images/fast food/American Burger .jpg", category: "burger" },
    { id: "fast_4", name: "Double Cheese Burger", description: "Double patty with cheese", price: 28.00, image: "../images/sub catégorie images/fast food/Double Cheese Burger.jpg", category: "burger" },
    { id: "fast_5", name: "Chicken Burger", description: "Crispy chicken burger", price: 20.00, image: "../images/sub catégorie images/fast food/Chiken Burger.jpg", category: "burger" },
    { id: "fast_6", name: "Chicken Crunchy Burger", description: "Crispy crunchy chicken burger", price: 22.00, image: "../images/sub catégorie images/fast food/Burger Chiken Crunchy.jpg", category: "burger" },
    { id: "fast_7", name: "Chicken Pickle Burger", description: "Chicken burger with pickles", price: 21.00, image: "../images/sub catégorie images/fast food/Chiken Pickle Burger.jpg", category: "burger" },
    { id: "fast_8", name: "Burger Viande Boeuf", description: "Beef burger", price: 19.00, image: "../images/sub catégorie images/fast food/Burger Viande Beuf.jpg", category: "burger" },
    { id: "fast_9", name: "Burger Crevette", description: "Shrimp burger", price: 24.00, image: "../images/sub catégorie images/fast food/Burger Crevette.jpg", category: "burger" },
    { id: "fast_10", name: "Sandwich Poulet", description: "Chicken sandwich", price: 14.00, image: "../images/sub catégorie images/fast food/Sandwich Poulet.jpg", category: "sandwich" },
    { id: "fast_11", name: "Sandwich Viande Haché", description: "Ground meat sandwich", price: 15.00, image: "../images/sub catégorie images/fast food/Sandwich Viand Hache.jpg", category: "sandwich" },
    { id: "fast_12", name: "Sandwich Viande", description: "Meat sandwich", price: 16.00, image: "../images/sub catégorie images/fast food/Sandwich de Viande.jpg", category: "sandwich" },
    { id: "fast_13", name: "Hot Dog", description: "Classic hot dog", price: 12.00, image: "../images/sub catégorie images/fast food/Hot Dog.jpg", category: "hotdog" },
    { id: "fast_14", name: "Frites", description: "Crispy french fries", price: 8.00, image: "../images/sub catégorie images/fast food/Frites.jpg", category: "sides" }
];

let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupEventListeners();
    updateGlobalCartCount();
});

// Navigate to customization page
function redirectToCustomization(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const name = product.name;
    const price = product.price;
    const image = product.image;
    const url = `../fast_food_customization_view/index.html?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&image=${encodeURIComponent(image)}`;
    window.location.href = url;
}

// Global Add to Cart
function addToCart(productId) {
    redirectToCustomization(productId);
}

function renderProducts(filter = 'all') {
    const list = document.getElementById('product-list');
    if (!list) return;
    const filteredProducts = filter === 'all' ? products : products.filter(p => p.category === filter);
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

    const searchBtn = document.getElementById('search-btn');
    if (searchBtn) searchBtn.addEventListener('click', () => alert('Search coming soon'));

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            currentFilter = e.currentTarget.dataset.filter;
            renderProducts(currentFilter);
        });
    });
}

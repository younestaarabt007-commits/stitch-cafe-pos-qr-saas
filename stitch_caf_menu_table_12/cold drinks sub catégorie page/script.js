const products = [
    { id: "cold_1", name: "Coca-Cola", description: "Servi très frais avec rondelle de citron", price: 3.00, image: "../images/sub catégorie images/cold drinks/Coka Cola.jpg", category: "soda" },
    { id: "cold_2", name: "Sprite", description: "Boisson gazeuse citron-lime ultra fraîche", price: 3.00, image: "../images/sub catégorie images/cold drinks/Sprite.jpg", category: "soda" },
    { id: "cold_3", name: "Hawaii Tropical", description: "Boisson gazeuse aux saveurs tropicales", price: 5.00, image: "../images/sub catégorie images/cold drinks/Hawei.jpg", category: "soda" },
    { id: "cold_4", name: "Mokhito Classique", description: "Menthe fraîche pilée, citron vert et glace pilée", price: 8.00, image: "../images/sub catégorie images/cold drinks/Mokhito.jpg", category: "cocktail" },
    { id: "cold_5", name: "Wild Berry Drink", description: "Infusion glacée aux baies sauvages", price: 7.00, image: "../images/sub catégorie images/cold drinks/Wild Berry Drink.jpg", category: "cocktail" },
    { id: "cold_6", name: "Cold Pomelo", description: "Boisson fraîche au pamplemousse rose pressé", price: 6.50, image: "../images/sub catégorie images/cold drinks/Cold Ponplemouse .jpg", category: "cocktail" },
    { id: "cold_7", name: "Miami Cocktail", description: "Création tropicale façon Miami aux fruits exotiques", price: 9.00, image: "../images/sub catégorie images/cold drinks/Miami Coktail.jpg", category: "cocktail" },
    { id: "cold_8", name: "Tropical Drink", description: "Punch de fruits tropicaux frais servi glacé", price: 7.50, image: "../images/sub catégorie images/cold drinks/Tripical Drink.jpg", category: "cocktail" },
    { id: "cold_9", name: "Cocktail Purple Berry Lime", description: "Cocktail rafraîchissant aux fruits rouges et citron vert", price: 8.50, image: "../images/sub catégorie images/cold drinks/Coktail purple berry lime .jpg", category: "cocktail" }
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
    window.location.href = `../orange juce_customization_view_1/index.html?id=${encodeURIComponent(product.id)}&name=${encodeURIComponent(product.name)}&image=${encodeURIComponent(product.image)}&price=${encodeURIComponent(product.price)}&category=Cold+Drink`;
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

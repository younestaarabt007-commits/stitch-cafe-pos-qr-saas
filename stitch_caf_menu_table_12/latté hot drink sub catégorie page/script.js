const products = [
    { id: "latte_1", name: "Café au Lait avec la Crème", description: "Double shot espresso et mousse de crème onctueuse", price: 6.50, image: "../images/sub catégorie images/latté/Café au lait avec la Creme.jpg", category: "classic" },
    { id: "latte_2", name: "Café au Lait Artisanal", description: "Alliance parfaite d'espresso et de lait chaud velouté", price: 5.10, image: "../images/sub catégorie images/latté/Café au Lait Artisanal.jpg", category: "classic" },
    { id: "latte_3", name: "Café Crème", description: "Double shot espresso sur lait finement moussé", price: 5.50, image: "../images/sub catégorie images/latté/Café Crème.jpg", category: "classic" },
    { id: "latte_4", name: "Coffee Latté Lotus", description: "Latte gourmand au spéculoos Lotus caramélisé", price: 6.20, image: "../images/sub catégorie images/latté/Coffe Latté Lotus.jpg", category: "flavored" },
    { id: "latte_5", name: "Chocolat Chaud à la Cannelle", description: "Chocolat noir fondu au lait chaud et pointe de cannelle", price: 5.80, image: "../images/sub catégorie images/latté/Chocolat Chaud au Cannelle.jpg", category: "flavored" },
    { id: "latte_6", name: "Ethiopian Yirgacheffe Latte", description: "Grand cru d'Éthiopie aux notes florales et lactées", price: 5.50, image: "../images/sub catégorie images/latté/Ethiopian Yirgacheffe.jpg", category: "plant-based" },
    { id: "latte_7", name: "Matcha Latte", description: "Thé vert Matcha cérémoniel fouetté au lait chaud", price: 7.25, image: "../images/sub catégorie images/latté/Matcha Latte.jpg", category: "iced" },
    { id: "latte_8", name: "Caramel Cold Shake Latte", description: "Latte glacé au filet de caramel beurre salé", price: 5.80, image: "../images/sub catégorie images/sweets/caramel-cold-shake-with-cream_.avif", category: "iced" }
];

let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupEventListeners();
    if (window.updateGlobalCartCount) {
        window.updateGlobalCartCount();
    }
});

function redirectToCustomization(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    try {
        localStorage.setItem('stitch_customizing_item', JSON.stringify(product));
    } catch (_) {}
    window.location.href = `../latte_customization_view_2/index.html?price=${encodeURIComponent(product.price)}&id=${encodeURIComponent(product.id)}&name=${encodeURIComponent(product.name)}&image=${encodeURIComponent(product.image)}&category=Latte`;
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
            const _activeTbl = localStorage.getItem('stitch_current_table') || '12'; window.location.href = (localStorage.getItem('stitch_order_mode') === 'delivery') ? '../swiggy-style_elite_main_menu_390x2500/index.html?mode=delivery' : ('../swiggy-style_elite_main_menu_390x2500/index.html?table=' + encodeURIComponent(_activeTbl));
        });
    }

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active', 'bg-primary', 'text-white'));
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.add('bg-card-tan', 'dark:bg-slate-800', 'text-[#1c160d]', 'dark:text-white'));

            e.currentTarget.classList.remove('bg-card-tan', 'dark:bg-slate-800', 'text-[#1c160d]', 'dark:text-white');
            e.currentTarget.classList.add('active', 'bg-primary', 'text-white');

            currentFilter = e.currentTarget.dataset.filter;
            renderProducts(currentFilter);
        });
    });
}

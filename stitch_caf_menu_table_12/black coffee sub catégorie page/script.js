const products = [
    {
        id: 1,
        name: "Café Normal",
        description: "Double shot espresso à la crema dorée",
        price: 4.80,
        image: "../images/sub catégorie images/black coffee/Café normal  .jpg",
        category: "black"
    },
    {
        id: 2,
        name: "Café Américain",
        description: "Espresso allongé doux et aromatique",
        price: 5.50,
        image: "../images/sub catégorie images/black coffee/Café Américain.jpg",
        category: "black"
    },
    {
        id: 3,
        name: "Café Noir Expresso",
        description: "Extraction serrée aux notes intenses de cacao",
        price: 3.50,
        image: "../images/sub catégorie images/black coffee/Café Noire Expresso.jpg",
        category: "espresso"
    },
    {
        id: 4,
        name: "Café Noir Italien",
        description: "Torréfaction italienne corsée et veloutée",
        price: 6.50,
        image: "../images/sub catégorie images/black coffee/Café Noir Italien.jpg",
        category: "espresso"
    },
    {
        id: 5,
        name: "Café Léger",
        description: "Infusion douce filtrée à la main, notes florales",
        price: 4.80,
        image: "../images/sub catégorie images/black coffee/Café Léger .jpg",
        category: "cold"
    },
    {
        id: 6,
        name: "Café Royal",
        description: "Double shot signature aux épices douces maison",
        price: 6.75,
        image: "../images/sub catégorie images/black coffee/Café Royal.jpg",
        category: "espresso"
    }
];

let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupEventListeners();
});

function renderProducts(filter = 'all') {
    const list = document.getElementById('product-list');
    if (!list) return;

    const filteredProducts = filter === 'all'
        ? products
        : products.filter(p => p.category === filter);

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

function redirectToCustomization(productId) {
    const product = products.find(p => String(p.id) === String(productId));
    if (!product) return;
    try {
        localStorage.setItem('stitch_customizing_item', JSON.stringify(product));
    } catch (_) {}
    window.location.href = `../pure_noir_espresso_customization_view_1/index.html?id=${encodeURIComponent(product.id)}&name=${encodeURIComponent(product.name)}&image=${encodeURIComponent(product.image)}&price=${encodeURIComponent(product.price)}&category=Coffee`;
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
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');

            currentFilter = e.currentTarget.dataset.filter;
            renderProducts(currentFilter);
        });
    });
}

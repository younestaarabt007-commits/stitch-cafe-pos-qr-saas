const products = [
    { id: "smoothie_1", name: "Blue Berry Smoothie", description: "Myrtilles, fraises fraîches et yaourt onctueux", price: 5.20, image: "../images/sub catégorie images/smoothie/Blue Berry Smoothie.jpg", category: "berry" },
    { id: "smoothie_2", name: "Kiwi Smoothie", description: "Kiwi, pomme verte et banane fraîche", price: 5.00, image: "../images/sub catégorie images/smoothie/Kiwi Smoothie.jpg", category: "green" },
    { id: "smoothie_5", name: "Raspberry Smoothie", description: "Purée de framboises fraîches et yaourt grec", price: 5.75, image: "../images/sub catégorie images/smoothie/raspberry-smoothie_1150-18529.jpg", category: "berry" },
    { id: "smoothie_6", name: "Mango Lassi Smoothie", description: "Mangue Alphonso, yaourt onctueux et cardamome", price: 5.00, image: "../images/sub catégorie images/Jus/Jus Mangue.jpg", category: "tropical" },
    { id: "smoothie_7", name: "Brazilian Smoothie", description: "Cocktail de fruits tropicaux façon Brésil", price: 5.60, image: "../images/sub catégorie images/smoothie/Brazilian Smoothie.jpg", category: "tropical" },
    { id: "smoothie_8", name: "Dragon Fruit Smoothie", description: "Smoothie intense au fruit du dragon rose", price: 5.70, image: "../images/sub catégorie images/smoothie/Dragon Fruit Smoothie .jpg", category: "tropical" },
    { id: "smoothie_9", name: "Golden Turmeric Smoothie", description: "Mangue, banane, curcuma doux et gingembre", price: 5.30, image: "../images/sub catégorie images/smoothie/Golden Turmeric.jpg", category: "protein" },
    { id: "smoothie_10", name: "Greek Yogurt & Fruits", description: "Yaourt grec brassé, céréales croquantes et fruits", price: 5.40, image: "../images/sub catégorie images/smoothie/Greek Yogurt with cereal and fruits .jpg", category: "protein" },
    { id: "smoothie_11", name: "Tropical Smoothie", description: "Mangue, ananas et banane glacée", price: 5.50, image: "../images/sub catégorie images/smoothie/tropical Smoothie.jpg", category: "tropical" }
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
    window.location.href = `../smothie customisation review/index.html?id=${encodeURIComponent(product.id)}&name=${encodeURIComponent(product.name)}&image=${encodeURIComponent(product.image)}&price=${encodeURIComponent(product.price)}&category=Smoothie`;
}

function addToCart(productId) {
    redirectToCustomization(productId);
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
        list.innerHTML = '<div class="col-span-2 text-center py-8 text-gray-500">Aucun smoothie trouvé</div>';
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

function setupEventListeners() {
    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
        backBtn.onclick = () => {
            const _activeTbl = localStorage.getItem('stitch_current_table') || '12'; window.location.href = (localStorage.getItem('stitch_order_mode') === 'delivery') ? '../swiggy-style_elite_main_menu_390x2500/index.html?mode=delivery' : ('../swiggy-style_elite_main_menu_390x2500/index.html?table=' + encodeURIComponent(_activeTbl));
        };
    }

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            renderProducts(currentFilter);
        });
    }

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = e.currentTarget;
            if (target.classList.contains('px-5')) {
                document.querySelectorAll('.filter-btn.px-5').forEach(b => {
                    b.classList.remove('active', 'bg-primary', 'text-white');
                    b.classList.add('bg-white', 'dark:bg-slate-800', 'text-[#1c160d]', 'dark:text-white');
                });
                target.classList.remove('bg-white', 'dark:bg-slate-800', 'text-[#1c160d]', 'dark:text-white');
                target.classList.add('active', 'bg-primary', 'text-white');
            }
            currentFilter = target.dataset.filter;
            renderProducts(currentFilter);
        });
    });
}

// Complete Hot Drinks & Brew Product Data (24 items across Black Coffee, Lattes & Teas)
const products = [
    // --- CAFÉS NOIRS & ESPRESSO (6) ---
    {
        id: "hot-coffee-1",
        name: "Café Normal",
        description: "Double shot espresso équilibré à la crema dorée",
        price: 4.80,
        image: "../images/sub catégorie images/black coffee/Café normal  .jpg",
        category: "dark",
        subCategory: "Coffee"
    },
    {
        id: "hot-coffee-2",
        name: "Café Américain",
        description: "Espresso allongé doux et aromatique",
        price: 5.50,
        image: "../images/sub catégorie images/black coffee/Café Américain.jpg",
        category: "dark",
        subCategory: "Coffee"
    },
    {
        id: "hot-coffee-3",
        name: "Café Noir Expresso",
        description: "Extraction serrée aux notes intenses de cacao",
        price: 3.50,
        image: "../images/sub catégorie images/black coffee/Café Noire Expresso.jpg",
        category: "dark",
        subCategory: "Coffee"
    },
    {
        id: "hot-coffee-4",
        name: "Café Noir Italien",
        description: "Torréfaction italienne corsée et veloutée",
        price: 6.50,
        image: "../images/sub catégorie images/black coffee/Café Noir Italien.jpg",
        category: "dark",
        subCategory: "Coffee"
    },
    {
        id: "hot-coffee-5",
        name: "Café Léger",
        description: "Infusion douce filtrée à la main, notes florales",
        price: 4.80,
        image: "../images/sub catégorie images/black coffee/Café Léger .jpg",
        category: "dark",
        subCategory: "Coffee"
    },
    {
        id: "hot-coffee-6",
        name: "Café Royal",
        description: "Double shot signature aux épices douces maison",
        price: 6.75,
        image: "../images/sub catégorie images/black coffee/Café Royal.jpg",
        category: "dark",
        subCategory: "Coffee"
    },

    // --- LATTÉS, CRÈMES & CHOCOLATS CHAUDS (7) ---
    {
        id: "hot-latte-1",
        name: "Café au Lait Artisanal",
        description: "Alliance parfaite d'espresso et de lait chaud velouté",
        price: 5.10,
        image: "../images/sub catégorie images/latté/Café au Lait Artisanal.jpg",
        category: "cold",
        subCategory: "Latte"
    },
    {
        id: "hot-latte-2",
        name: "Café au Lait avec la Crème",
        description: "Double espresso sous une mousse de crème onctueuse",
        price: 6.50,
        image: "../images/sub catégorie images/latté/Café au lait avec la Creme.jpg",
        category: "cold",
        subCategory: "Latte"
    },
    {
        id: "hot-latte-3",
        name: "Café Crème",
        description: "Espresso corsé adouci d'une micro-mousse de lait",
        price: 5.50,
        image: "../images/sub catégorie images/latté/Café Crème.jpg",
        category: "cold",
        subCategory: "Latte"
    },
    {
        id: "hot-latte-4",
        name: "Coffee Latté Lotus",
        description: "Latte gourmand au spéculoos Lotus caramélisé",
        price: 6.20,
        image: "../images/sub catégorie images/latté/Coffe Latté Lotus.jpg",
        category: "cold",
        subCategory: "Latte"
    },
    {
        id: "hot-latte-5",
        name: "Chocolat Chaud à la Cannelle",
        description: "Chocolat noir fondu au lait chaud et pointe de cannelle",
        price: 5.80,
        image: "../images/sub catégorie images/latté/Chocolat Chaud au Cannelle.jpg",
        category: "cold",
        subCategory: "Latte"
    },
    {
        id: "hot-latte-6",
        name: "Ethiopian Yirgacheffe Latte",
        description: "Grand cru d'Éthiopie aux notes florales et lactées",
        price: 5.50,
        image: "../images/sub catégorie images/latté/Ethiopian Yirgacheffe.jpg",
        category: "cold",
        subCategory: "Latte"
    },
    {
        id: "hot-latte-7",
        name: "Matcha Latte",
        description: "Thé vert Matcha cérémoniel fouetté au lait chaud",
        price: 7.25,
        image: "../images/sub catégorie images/latté/Matcha Latte.jpg",
        category: "cold",
        subCategory: "Latte"
    },

    // --- THÉS & INFUSIONS (11) ---
    {
        id: "hot-tea-1",
        name: "Thé Marocain à la Menthe",
        description: "Thé vert traditionnel infusé à la menthe fraîche",
        price: 4.50,
        image: "../images/sub catégorie images/tea/The Marocain a la Menthe.jpg",
        category: "seasonal",
        subCategory: "Tea"
    },
    {
        id: "hot-tea-2",
        name: "Tea Citron Délice",
        description: "Infusion réconfortante au citron frais et miel",
        price: 5.50,
        image: "../images/sub catégorie images/tea/Tea Citron Délise.jpg",
        category: "seasonal",
        subCategory: "Tea"
    },
    {
        id: "hot-tea-3",
        name: "Tea Nordique",
        description: "Infusion aromatique aux baies nordiques et agrumes",
        price: 4.75,
        image: "../images/sub catégorie images/tea/Tea Nordique.jpg",
        category: "seasonal",
        subCategory: "Tea"
    },
    {
        id: "hot-tea-4",
        name: "Floral Tea",
        description: "Thé noir parfumé aux pétales de fleurs et bergamote",
        price: 7.00,
        image: "../images/sub catégorie images/tea/Floral Tea.jpg",
        category: "seasonal",
        subCategory: "Tea"
    },
    {
        id: "hot-tea-5",
        name: "Thé de Hibiscus",
        description: "Infusion florale de fleurs d'hibiscus rubis",
        price: 6.50,
        image: "../images/sub catégorie images/tea/The de Hibiscus.jpg",
        category: "seasonal",
        subCategory: "Tea"
    },
    {
        id: "hot-tea-6",
        name: "Lavender Tea",
        description: "Infusion apaisante à la fleur de lavande et miel",
        price: 5.50,
        image: "../images/sub catégorie images/tea/lavender Tea.jpg",
        category: "seasonal",
        subCategory: "Tea"
    },
    {
        id: "hot-tea-7",
        name: "Blue Tea Butterfly Pea",
        description: "Infusion bleue naturelle aux fleurs de pois papillon",
        price: 5.00,
        image: "../images/sub catégorie images/tea/Blue Tea.jpg",
        category: "seasonal",
        subCategory: "Tea"
    },
    {
        id: "hot-tea-8",
        name: "Chinese Green Tea",
        description: "Thé vert impérial de Chine aux feuilles entières",
        price: 4.80,
        image: "../images/sub catégorie images/tea/Chinese Tea.jpg",
        category: "seasonal",
        subCategory: "Tea"
    },
    {
        id: "hot-tea-9",
        name: "Thé Médicinal Bien-Être",
        description: "Mélange d'herbes aromatiques et plantes digestives",
        price: 6.00,
        image: "../images/sub catégorie images/tea/Thé Médicinal.jpg",
        category: "seasonal",
        subCategory: "Tea"
    },
    {
        id: "hot-tea-10",
        name: "Thé de Grenadine",
        description: "Infusion fruitée aux notes de grenade fraîche",
        price: 5.20,
        image: "../images/sub catégorie images/tea/Thé de Grenadine.jpg",
        category: "seasonal",
        subCategory: "Tea"
    },
    {
        id: "hot-tea-11",
        name: "Golden Turmeric Latte",
        description: "Infusion dorée au curcuma, gingembre et lait chaud",
        price: 6.25,
        image: "../images/sub catégorie images/smoothie/Golden Turmeric.jpg",
        category: "seasonal",
        subCategory: "Tea"
    }
];

let currentFilter = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts('all');
    setupEventListeners();
});

// Render Products (All 24 items shown when filter === 'all')
function renderProducts(filter = 'all', query = '') {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    let filteredProducts = filter === 'all'
        ? products
        : products.filter(p => p.category === filter);

    if (query) {
        filteredProducts = filteredProducts.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
        );
    }

    grid.innerHTML = filteredProducts.map((product, index) => {
        const name = typeof getMenuTranslation === 'function' ? getMenuTranslation(product, 'name') : product.name;
        const desc = typeof getMenuTranslation === 'function' ? getMenuTranslation(product, 'description') : product.description;

        return `
        <div onclick="redirectToCustomization('${product.id}')" class="flex flex-col bg-white dark:bg-slate-800 p-3 rounded-2xl border-2 border-white/70 dark:border-white/10 ring-1 ring-black/5 dark:ring-white/5 ring-offset-1 ring-offset-white dark:ring-offset-[#1a100c] shadow-[0_4px_14px_rgba(0,0,0,0.12)] hover:shadow-[0_10px_24px_rgba(0,0,0,0.18)] fade-in-up cursor-pointer group transition-all duration-300 transform hover:-translate-y-1" style="animation-delay: ${Math.min(index * 0.03, 0.4)}s">
            <div class="product-image w-full h-44 rounded-xl bg-cover bg-center mb-3 relative overflow-hidden bg-stone-100" role="img" aria-label="${name}" style="background-image: url(&quot;${product.image}&quot;);">
                <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity"></div>
            </div>
            <div class="flex-1 flex flex-col px-1">
                <h4 class="font-bold text-[14px] text-gray-800 dark:text-white leading-tight mb-1 line-clamp-1">${name}</h4>
                <div class="flex items-center gap-1.5 mb-2">
                    <div class="flex items-center gap-0.5">
                        <span class="material-symbols-outlined text-[#FFC107] text-[12px]">star</span>
                        <span class="text-[10px] font-bold text-green-700 dark:text-green-300">4.8</span>
                    </div>
                    <span class="text-[9px] text-gray-400 dark:text-gray-500">• ${product.subCategory || 'Chaud'}</span>
                </div>
                <p class="text-[10px] text-gray-500 dark:text-gray-400 line-clamp-2 mb-3 leading-relaxed">${desc}</p>
                <div class="flex items-center justify-between gap-2 mt-auto">
                    <span class="text-primary font-extrabold text-[14px]">${product.price.toFixed(2)}DH</span>
                    <button class="w-[64px] h-[32px] rounded-full bg-[#FF5200] flex items-center justify-center !text-white text-[11px] font-bold uppercase shadow-sm active:scale-95 hover:bg-primary/90 transition-all font-outfit border-2 border-orange-400 ring-2 ring-orange-500/50 ring-offset-1 ring-orange-200 dark:ring-offset-[#1a100c]" style="color: white !important;" onclick="event.stopPropagation(); addToCart('${product.id}')">ADD</button>
                </div>
            </div>
        </div>
        `;
    }).join('');
}

function addToCart(productId) {
    redirectToCustomization(productId);
}

// Redirect to Customization Page
function redirectToCustomization(productId) {
    const product = products.find(p => String(p.id) === String(productId));
    let customizationUrl = '../pure_noir_espresso_customization_view_1/index.html';

    if (product) {
        if (product.category === 'seasonal' || product.subCategory === 'Tea') {
            customizationUrl = '../tea_customization_view/index.html';
        } else if (product.category === 'cold' || product.subCategory === 'Latte') {
            customizationUrl = '../latte_customization_view_2/index.html';
        } else {
            customizationUrl = '../pure_noir_espresso_customization_view_1/index.html';
        }
        try {
            localStorage.setItem('stitch_customizing_item', JSON.stringify(product));
        } catch (_) {}
        window.location.href = `${customizationUrl}?id=${encodeURIComponent(product.id)}&name=${encodeURIComponent(product.name)}&image=${encodeURIComponent(product.image)}&price=${encodeURIComponent(product.price)}&category=${encodeURIComponent(product.subCategory || 'Coffee')}`;
    } else {
        window.location.href = customizationUrl;
    }
}

// Setup Event Listeners
function setupEventListeners() {
    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.history.back();
        });
    }

    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            window.location.href = '../order_success_page/index.html';
        });
    }

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            renderProducts(currentFilter, query);
        });
    }

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.remove('active', 'bg-espresso', 'text-white', 'shadow-lg', 'shadow-espresso/20');
                b.classList.add('bg-white', 'text-espresso', 'border', 'border-stone-200');
            });
            const target = e.currentTarget;
            target.classList.remove('bg-white', 'text-espresso', 'border', 'border-stone-200');
            target.classList.add('active', 'bg-espresso', 'text-white', 'shadow-lg', 'shadow-espresso/20');

            currentFilter = target.dataset.filter || 'all';
            const query = document.getElementById('search-input')?.value.toLowerCase() || '';
            renderProducts(currentFilter, query);
        });
    });
}

document.addEventListener('languageChanged', () => {
    const query = document.getElementById('search-input')?.value.toLowerCase() || '';
    renderProducts(currentFilter, query);
});

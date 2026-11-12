const products = [
    {
        id: 1,
        name: "Petit Déjeuner Américain",
        description: "Œufs, pancakes moelleux et accompagnements frais",
        price: 17.50,
        image: "../images/sub catégorie images/petit dejeuner/Petit Déjeuner Américain.jpg",
        category: "classic"
    },
    {
        id: 2,
        name: "Petit Déjeuner Complet",
        description: "Assiette matinale équilibrée et généreuse",
        price: 16.80,
        image: "../images/sub catégorie images/petit dejeuner/Petit Déjeuner Complet.jpg",
        category: "classic"
    },
    {
        id: 3,
        name: "Petit Déjeuner Marocain",
        description: "Msemen, harcha, œufs beldi, miel, jben et huile d'olive",
        price: 16.20,
        image: "../images/sub catégorie images/petit dejeuner/Petit Déjeuner Maroccain.jpg",
        category: "moroccan"
    },
    {
        id: 4,
        name: "Petit Déjeuner Royal",
        description: "Sélection prestige complète pour bien démarrer la journée",
        price: 22.00,
        image: "../images/sub catégorie images/petit dejeuner/Petit Déjeuner Royal.jpg",
        category: "deluxe"
    },
    {
        id: 5,
        name: "Petit Déjeuner Turc",
        description: "Plateau matinal façon Istanbul aux fromages, olives et œufs",
        price: 18.50,
        image: "../images/sub catégorie images/petit dejeuner/Petit Déjeuner Turk.jpg",
        category: "traditional"
    },
    {
        id: 6,
        name: "Petit Déjeuner Latino",
        description: "Œufs pochés en sauce tomate épicée et pain grillé",
        price: 15.50,
        image: "../images/sub catégorie images/Brunch food/Petit Déjeuner Latino.jpg",
        category: "traditional"
    },
    {
        id: 7,
        name: "Petit Déjeuner Nordique",
        description: "Œufs brouillés onctueux et accompagnements nordiques",
        price: 16.00,
        image: "../images/sub catégorie images/Brunch food/Petit Déjeuner Nordique.jpg",
        category: "deluxe"
    },
    {
        id: 8,
        name: "Full English Breakfast",
        description: "Œufs au plat, saucisses, haricots cuisinés, tomates et toasts",
        price: 22.00,
        image: "../images/sub catégorie images/Brunch food/delicious-and-hearty-full-english-breakfast-plate-with-fried-eggs-sausages-toast-beans-and-tomatoes-isolated-on-transparent-background-png.png",
        category: "deluxe"
    },
    {
        id: 9,
        name: "Farm Omelette Fermière",
        description: "Œufs fermiers battus, fromage fondant et fines herbes",
        price: 12.50,
        image: "../images/sub catégorie images/Brunch food/delicious-omelette-bursting-with-fillings-featuring-eggs-vegetables-and-cheese-creating-vibrant-and-appetizing-presentation-png.png",
        category: "classic"
    },
    {
        id: 10,
        name: "Fluffy Scrambled Eggs",
        description: "Œufs brouillés aériens au beurre demi-sel et romarin",
        price: 13.50,
        image: "../images/sub catégorie images/Brunch food/fluffy-scrambled-eggs-garnished-with-rosemary-png.png",
        category: "classic"
    }
];

let currentFilter = "all";

document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    setupEventListeners();
});

function renderProducts(filter = "all") {
    const list = document.getElementById("product-list");
    if (!list) return;

    const filteredProducts = filter === "all"
        ? products
        : products.filter((product) => product.category === filter);

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
    `).join("");
}

function redirectToCustomization(productId) {
    const product = products.find((p) => String(p.id) === String(productId));
    if (!product) return;
    try {
        localStorage.setItem('stitch_customizing_item', JSON.stringify(product));
    } catch (_) {}
    window.location.href = `../brunch_customization_view/index.html?id=${encodeURIComponent(product.id)}&name=${encodeURIComponent(product.name)}&image=${encodeURIComponent(product.image)}&price=${encodeURIComponent(product.price)}&category=Brunch`;
}

function addToCart(productId) {
    redirectToCustomization(productId);
}

function setupEventListeners() {
    const backBtn = document.getElementById("back-btn");
    if (backBtn) {
        backBtn.addEventListener("click", () => {
            const _activeTbl = localStorage.getItem('stitch_current_table') || '12'; window.location.href = (localStorage.getItem('stitch_order_mode') === 'delivery') ? '../swiggy-style_elite_main_menu_390x2500/index.html?mode=delivery' : ('../swiggy-style_elite_main_menu_390x2500/index.html?table=' + encodeURIComponent(_activeTbl));
        });
    }

    document.querySelectorAll(".filter-btn").forEach((btn) => {
        btn.addEventListener("click", (event) => {
            document.querySelectorAll(".filter-btn").forEach((button) => button.classList.remove("active"));
            event.currentTarget.classList.add("active");
            currentFilter = event.currentTarget.dataset.filter;
            renderProducts(currentFilter);
        });
    });
}

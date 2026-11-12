// === BRUNCH EXPLORER — COMPLETE PRODUCTS (38 ITEMS) ===
// Sources: Breakfast (Petit Déjeuner & Eggs) + Fast Food + Healthy Food (Toasts & Salads)

const products = [
    // ---- BREAKFAST & EGGS (10 items) ----
    {
        id: "bk_1",
        name: "Petit Déjeuner Américain",
        description: "Œufs, pancakes moelleux et accompagnements frais",
        price: 17.50,
        image: "../images/sub catégorie images/petit dejeuner/Petit Déjeuner Américain.jpg",
        category: "breakfast",
        badge: "Morning",
        customizationUrl: "../brunch_customization_view/index.html"
    },
    {
        id: "bk_2",
        name: "Petit Déjeuner Complet",
        description: "Assiette matinale équilibrée et généreuse",
        price: 16.80,
        image: "../images/sub catégorie images/petit dejeuner/Petit Déjeuner Complet.jpg",
        category: "breakfast",
        badge: null,
        customizationUrl: "../brunch_customization_view/index.html"
    },
    {
        id: "bk_3",
        name: "Petit Déjeuner Marocain",
        description: "Assortiment traditionnel beldi, msemen, harcha, miel et huile d'olive",
        price: 16.20,
        image: "../images/sub catégorie images/petit dejeuner/Petit Déjeuner Maroccain.jpg",
        category: "breakfast",
        badge: "Beldi",
        customizationUrl: "../brunch_customization_view/index.html"
    },
    {
        id: "bk_4",
        name: "Petit Déjeuner Royal",
        description: "Sélection prestige complète pour bien démarrer la journée",
        price: 22.00,
        image: "../images/sub catégorie images/petit dejeuner/Petit Déjeuner Royal.jpg",
        category: "breakfast",
        badge: "Royal",
        customizationUrl: "../brunch_customization_view/index.html"
    },
    {
        id: "bk_5",
        name: "Petit Déjeuner Turc",
        description: "Plateau matinal façon Istanbul aux fromages, olives et œufs",
        price: 18.50,
        image: "../images/sub catégorie images/petit dejeuner/Petit Déjeuner Turk.jpg",
        category: "breakfast",
        badge: null,
        customizationUrl: "../brunch_customization_view/index.html"
    },
    {
        id: "bk_6",
        name: "Petit Déjeuner Latino",
        description: "Œufs pochés en sauce tomate épicée et pain grillé",
        price: 15.50,
        image: "../images/sub catégorie images/Brunch food/Petit Déjeuner Latino.jpg",
        category: "breakfast",
        badge: "Chef",
        customizationUrl: "../brunch_customization_view/index.html"
    },
    {
        id: "bk_7",
        name: "Petit Déjeuner Nordique",
        description: "Œufs brouillés onctueux, accompagnements nordiques et pain complet",
        price: 16.00,
        image: "../images/sub catégorie images/Brunch food/Petit Déjeuner Nordique.jpg",
        category: "breakfast",
        badge: null,
        customizationUrl: "../brunch_customization_view/index.html"
    },
    {
        id: "bk_8",
        name: "Full English Breakfast",
        description: "Œufs au plat, saucisses, haricots cuisinés, tomates grillées et toasts",
        price: 22.00,
        image: "../images/sub catégorie images/Brunch food/delicious-and-hearty-full-english-breakfast-plate-with-fried-eggs-sausages-toast-beans-and-tomatoes-isolated-on-transparent-background-png.png",
        category: "breakfast",
        badge: "Complet",
        customizationUrl: "../brunch_customization_view/index.html"
    },
    {
        id: "bk_9",
        name: "Farm Omelette Fermière",
        description: "Œufs fermiers battus, fromage fondant, légumes frais et fines herbes",
        price: 12.50,
        image: "../images/sub catégorie images/Brunch food/delicious-omelette-bursting-with-fillings-featuring-eggs-vegetables-and-cheese-creating-vibrant-and-appetizing-presentation-png.png",
        category: "breakfast",
        badge: null,
        customizationUrl: "../brunch_customization_view/index.html"
    },
    {
        id: "bk_10",
        name: "Fluffy Scrambled Eggs",
        description: "Œufs brouillés aériens au beurre demi-sel et brin de romarin",
        price: 13.50,
        image: "../images/sub catégorie images/Brunch food/fluffy-scrambled-eggs-garnished-with-rosemary-png.png",
        category: "breakfast",
        badge: null,
        customizationUrl: "../brunch_customization_view/index.html"
    },

    // ---- HEALTHY FOOD: TOASTS & SALADS (14 items) ----
    {
        id: "hf_1",
        name: "Croissant Benedict Salmon",
        description: "Croissant pur beurre, saumon fumé, œuf poché et sauce hollandaise",
        price: 16.00,
        image: "../images/sub catégorie images/Brunch food/croissant-benedict-salmon-with-poched-egg-hollandaise-sauce-served-with-fresh-salad_140725-1329.avif",
        category: "healthy",
        badge: "Best-Seller",
        customizationUrl: "../toast_brunch_customization_view/index.html"
    },
    {
        id: "hf_2",
        name: "Toast Champignon Fromage",
        description: "Champignons sautés à l'ail, fromage fondant sur pain au levain",
        price: 14.50,
        image: "../images/sub catégorie images/toast/Toast Champignon Frommage.jpg",
        category: "healthy",
        badge: "Veg",
        customizationUrl: "../toast_brunch_customization_view/index.html"
    },
    {
        id: "hf_3",
        name: "Toast Frittata",
        description: "Frittata aux herbes, champignons et filet d'huile parfumée",
        price: 12.50,
        image: "../images/sub catégorie images/toast/Toast Frittata.jpg",
        category: "healthy",
        badge: null,
        customizationUrl: "../toast_brunch_customization_view/index.html"
    },
    {
        id: "hf_4",
        name: "Toast Avocat",
        description: "Pain artisanal grillé, avocat écrasé minute et graines croquantes",
        price: 10.50,
        image: "../images/sub catégorie images/toast/toast.jpg",
        category: "healthy",
        badge: "Healthy",
        customizationUrl: "../toast_brunch_customization_view/index.html"
    },
    {
        id: "hf_5",
        name: "Toast Vegan",
        description: "Pain complet aux céréales, légumes grillés et jeunes pousses",
        price: 12.00,
        image: "../images/sub catégorie images/toast/Toast Vegan.jpg",
        category: "healthy",
        badge: "Vegan",
        customizationUrl: "../toast_brunch_customization_view/index.html"
    },
    {
        id: "hf_6",
        name: "Herbed Focaccia",
        description: "Focaccia tiède au romarin, ail doux et huile d'olive vierge",
        price: 9.50,
        image: "../images/sub catégorie images/Brunch food/Herbed Focaccia.jpg",
        category: "healthy",
        badge: "Maison",
        customizationUrl: "../toast_brunch_customization_view/index.html"
    },
    {
        id: "hf_7",
        name: "Pumpkin Stew",
        description: "Mijoté automnal doux, tomates, poivrons et œufs",
        price: 11.25,
        image: "../images/sub catégorie images/Brunch food/Pumpkin Stew.jpg",
        category: "healthy",
        badge: null,
        customizationUrl: "../toast_brunch_customization_view/index.html"
    },
    {
        id: "hf_8",
        name: "Soupe de Fèves (Bissara)",
        description: "Velouté traditionnel de fèves à l'huile d'olive et cumin",
        price: 10.00,
        image: "../images/sub catégorie images/Brunch food/Soupe de Fèves.jpg",
        category: "healthy",
        badge: "Beldi",
        customizationUrl: "../toast_brunch_customization_view/index.html"
    },
    {
        id: "hf_9",
        name: "Salade César",
        description: "Romaine croquante, blanc de volaille grillé, croûtons et parmesan",
        price: 14.00,
        image: "../images/sub catégorie images/Brunch food/Salade Cesar.jpg",
        category: "healthy",
        badge: null,
        customizationUrl: "../toast_brunch_customization_view/index.html"
    },
    {
        id: "hf_10",
        name: "Salade Marocaine",
        description: "Tomates fraîches, poivrons grillés, oignons doux et herbes ciselées",
        price: 12.50,
        image: "../images/sub catégorie images/Brunch food/Salade Marocaine.jpg",
        category: "healthy",
        badge: "Fraîcheur",
        customizationUrl: "../toast_brunch_customization_view/index.html"
    },
    {
        id: "hf_11",
        name: "Salade Espagnole",
        description: "Olives, tomates mûres, fromage frais et vinaigrette méditerranéenne",
        price: 11.00,
        image: "../images/sub catégorie images/Brunch food/Salade Espagnol.jpg",
        category: "healthy",
        badge: null,
        customizationUrl: "../toast_brunch_customization_view/index.html"
    },
    {
        id: "hf_12",
        name: "Salade Mozzarella",
        description: "Mozzarella fondante, tomates cerises et basilic frais",
        price: 13.50,
        image: "../images/sub catégorie images/Brunch food/Salade avec  Modzarelle.jpg",
        category: "healthy",
        badge: null,
        customizationUrl: "../toast_brunch_customization_view/index.html"
    },
    {
        id: "hf_13",
        name: "Salade de Poulet Grillé",
        description: "Émincé de poulet mariné, crudités croquantes et sauce maison",
        price: 15.00,
        image: "../images/sub catégorie images/Brunch food/Salade de Poulet.jpg",
        category: "healthy",
        badge: "Protéiné",
        customizationUrl: "../toast_brunch_customization_view/index.html"
    },
    {
        id: "hf_14",
        name: "Salade Mexicaine",
        description: "Maïs doux, haricots rouges, avocat, poivrons et citron vert",
        price: 13.50,
        image: "../images/sub catégorie images/Brunch food/Salade Mexicaine.jpg",
        category: "healthy",
        badge: null,
        customizationUrl: "../toast_brunch_customization_view/index.html"
    },

    // ---- FAST FOOD (14 items) ----
    {
        id: "ff_1",
        name: "Tacos Mixte",
        description: "Tacos gratiné garni de viandes marinées, frites et sauce fromagère",
        price: 18.00,
        image: "../images/sub catégorie images/fast food/Tacos Mixe.jpg",
        category: "fastfood",
        badge: null,
        customizationUrl: "../fast_food_customization_view/index.html"
    },
    {
        id: "ff_2",
        name: "Tacos Viande Hachée",
        description: "Tacos généreux à la viande hachée assaisonnée et sauce fromagère",
        price: 16.00,
        image: "../images/sub catégorie images/fast food/Tacos Viande Haché.jpg",
        category: "fastfood",
        badge: null,
        customizationUrl: "../fast_food_customization_view/index.html"
    },
    {
        id: "ff_3",
        name: "American Burger",
        description: "Steak de bœuf grillé, cheddar fondu, salade, tomate et sauce burger",
        price: 22.00,
        image: "../images/sub catégorie images/fast food/American Burger .jpg",
        category: "fastfood",
        badge: null,
        customizationUrl: "../fast_food_customization_view/index.html"
    },
    {
        id: "ff_4",
        name: "Double Cheese Burger",
        description: "Double steak de bœuf saisi à la plancha et double cheddar fondant",
        price: 28.00,
        image: "../images/sub catégorie images/fast food/Double Cheese Burger.jpg",
        category: "fastfood",
        badge: "XL",
        customizationUrl: "../fast_food_customization_view/index.html"
    },
    {
        id: "ff_5",
        name: "Chicken Burger",
        description: "Filet de poulet pané doré, salade croquante et sauce crémeuse",
        price: 20.00,
        image: "../images/sub catégorie images/fast food/Chiken Burger.jpg",
        category: "fastfood",
        badge: null,
        customizationUrl: "../fast_food_customization_view/index.html"
    },
    {
        id: "ff_6",
        name: "Chicken Crunchy Burger",
        description: "Poulet ultra-croustillant, cheddar et sauce signature",
        price: 22.00,
        image: "../images/sub catégorie images/fast food/Burger Chiken Crunchy.jpg",
        category: "fastfood",
        badge: "Crispy",
        customizationUrl: "../fast_food_customization_view/index.html"
    },
    {
        id: "ff_7",
        name: "Chicken Pickle Burger",
        description: "Poulet croustillant, cornichons pickles acidulés et sauce maison",
        price: 21.00,
        image: "../images/sub catégorie images/fast food/Chiken Pickle Burger.jpg",
        category: "fastfood",
        badge: null,
        customizationUrl: "../fast_food_customization_view/index.html"
    },
    {
        id: "ff_8",
        name: "Burger Viande Bœuf",
        description: "Bœuf 100% pur frais grillé minute dans un pain brioché",
        price: 19.00,
        image: "../images/sub catégorie images/fast food/Burger Viande Beuf.jpg",
        category: "fastfood",
        badge: null,
        customizationUrl: "../fast_food_customization_view/index.html"
    },
    {
        id: "ff_9",
        name: "Burger Crevettes",
        description: "Crevettes croustillantes, salade fraîche et sauce tartare maison",
        price: 24.00,
        image: "../images/sub catégorie images/fast food/Burger Crevette.jpg",
        category: "fastfood",
        badge: null,
        customizationUrl: "../fast_food_customization_view/index.html"
    },
    {
        id: "ff_10",
        name: "Sandwich Poulet",
        description: "Émincé de poulet mariné dans un pain baguette croustillant",
        price: 14.00,
        image: "../images/sub catégorie images/fast food/Sandwich Poulet.jpg",
        category: "fastfood",
        badge: null,
        customizationUrl: "../fast_food_customization_view/index.html"
    },
    {
        id: "ff_11",
        name: "Sandwich Viande Hachée",
        description: "Viande hachée grillée aux épices douces, crudités et sauce",
        price: 15.00,
        image: "../images/sub catégorie images/fast food/Sandwich Viand Hache.jpg",
        category: "fastfood",
        badge: null,
        customizationUrl: "../fast_food_customization_view/index.html"
    },
    {
        id: "ff_12",
        name: "Sandwich Émincé de Viande",
        description: "Lamelles de bœuf sautées, oignons caramélisés et fromage",
        price: 16.00,
        image: "../images/sub catégorie images/fast food/Sandwich de Viande.jpg",
        category: "fastfood",
        badge: null,
        customizationUrl: "../fast_food_customization_view/index.html"
    },
    {
        id: "ff_13",
        name: "Hot Dog Classique",
        description: "Saucisse grillée, pain moelleux, moutarde douce et ketchup",
        price: 12.00,
        image: "../images/sub catégorie images/fast food/Hot Dog.jpg",
        category: "fastfood",
        badge: null,
        customizationUrl: "../fast_food_customization_view/index.html"
    },
    {
        id: "ff_14",
        name: "Portion de Frites Maison",
        description: "Frites dorées et croustillantes servies bien chaudes",
        price: 8.00,
        image: "../images/sub catégorie images/fast food/Frites.jpg",
        category: "fastfood",
        badge: null,
        customizationUrl: "../fast_food_customization_view/index.html"
    }
];

let currentFilter = "all";

document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    updateItemCount();
});

function updateItemCount() {
    const badge = document.getElementById("item-count-badge");
    if (badge) badge.textContent = products.length + " ARTICLES";
}

function redirectToCustomization(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    try {
        localStorage.setItem('stitch_customizing_item', JSON.stringify(product));
    } catch (_) {}
    const url = `${product.customizationUrl}?id=${encodeURIComponent(product.id)}&name=${encodeURIComponent(product.name)}&price=${encodeURIComponent(product.price)}&image=${encodeURIComponent(product.image)}&category=Brunch`;
    window.location.href = url;
}

function renderProducts(filter = "all") {
    const list = document.getElementById("product-list");
    if (!list) return;

    const filtered = filter === "all" ? products : products.filter(p => p.category === filter);

    list.innerHTML = filtered.map((product, index) => `
            <div onclick="redirectToCustomization('${product.id}')" class="flex flex-col bg-white dark:bg-slate-800 p-3 rounded-2xl border-2 border-white/70 dark:border-white/10 ring-1 ring-black/5 dark:ring-white/5 ring-offset-1 ring-offset-white dark:ring-offset-[#1a100c] shadow-[0_4px_14px_rgba(0,0,0,0.12)] hover:shadow-[0_10px_24px_rgba(0,0,0,0.18)] fade-in-up cursor-pointer group transition-all duration-300 transform hover:-translate-y-1" style="animation-delay:${Math.min(index * 0.03, 0.4)}s">
                <div class="product-image w-full h-36 rounded-xl bg-cover bg-center mb-3 relative overflow-hidden" style="background-image:url(&quot;${product.image}&quot;)" data-name="${product.name}" data-price="${product.price}">
                    <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity"></div>
                    ${product.badge ? `<div class="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-md text-[10px] font-bold text-slate-800 shadow-sm z-10">${product.badge}</div>` : ''}
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
                        <button class="w-[64px] h-[32px] rounded-full bg-[#FF5200] flex items-center justify-center !text-white text-[11px] font-bold uppercase shadow-sm active:scale-95 hover:bg-primary/90 transition-all font-outfit border-2 border-orange-400 ring-2 ring-orange-500/50 ring-offset-1 ring-orange-200 dark:ring-offset-[#1a100c] shadow-[0_2px_8px_rgba(0,0,0,0.18)] hover:shadow-lg" style="color: white !important;" onclick="event.stopPropagation(); redirectToCustomization('${product.id}')">ADD</button>
                    </div>
                </div>
            </div>
    `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", e => {
            document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            e.currentTarget.classList.add("active");
            currentFilter = e.currentTarget.dataset.filter || "all";
            renderProducts(currentFilter);
        });
    });
});

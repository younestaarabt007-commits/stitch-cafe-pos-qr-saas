// ============================================================
// STITCH MERCHANT DASHBOARD — DEMO MODE
// All API calls are gracefully degraded to static demo data.
// No customer data or tokens are exposed.
// ============================================================

// --- DEMO DATA ---
const DEMO_MENU = [
    { id: 'brunch-1', name: "Farm Omelette", price: 12.5, category: "Brunch", image_url: "../images/sub catégorie images/Brunch food/Salade Cesar.jpg", hasModifiers: false, stock: null },
    { id: 'brunch-2', name: "Croissant Benedict Salmon", price: 16, category: "Brunch", image_url: "../images/sub catégorie images/Brunch food/croissant-benedict-salmon-with-poched-egg-hollandaise-sauce-served-with-fresh-salad_140725-1329.avif", hasModifiers: false, stock: null },
    { id: 'brunch-3', name: "Petit Déjeuner Latino", price: 15.5, category: "Brunch", image_url: "../images/sub catégorie images/Brunch food/Petit Déjeuner Latino.jpg", hasModifiers: false, stock: null },
    { id: 'brunch-4', name: "Salade Marocaine", price: 14.5, category: "Brunch", image_url: "../images/sub catégorie images/Brunch food/Salade Marocaine.jpg", hasModifiers: false, stock: null },
    { id: 'brunch-5', name: "Petit Déjeuner Nordique", price: 13, category: "Brunch", image_url: "../images/sub catégorie images/Brunch food/Petit Déjeuner Nordique.jpg", hasModifiers: false, stock: null },
    { id: 'brunch-6', name: "Orange Chesse Cake", price: 19.5, category: "Brunch", image_url: "../images/sub catégorie images/sweets/Orange Chesse Cake.jpg", hasModifiers: false, stock: null },
    { id: 'brunch-7', name: "Fluffy Scrambled Eggs", price: 13.5, category: "Brunch", image_url: "../images/sub catégorie images/Brunch food/fluffy-scrambled-eggs-garnished-with-rosemary-png.png", hasModifiers: false, stock: null },
    { id: 'brunch-8', name: "Crème Caramel", price: 11, category: "Brunch", image_url: "../images/sub catégorie images/sweets/Crème Caramel.jpg", hasModifiers: false, stock: null },
    { id: 'brunch-9', name: "Toast Frittata", price: 14.75, category: "Brunch", image_url: "../images/sub catégorie images/toast/Toast Frittata.jpg", hasModifiers: false, stock: null },
    { id: 'brunch-10', name: "Pancake with Berries", price: 12, category: "Brunch", image_url: "../images/sub catégorie images/sweets/Orange Chesse Cake.jpg", hasModifiers: false, stock: null },
    { id: 'brunch-11', name: "Waffles with Honey and Creme", price: 11.5, category: "Brunch", image_url: "../images/sub catégorie images/sweets/waffles with Honey and Creme.jpg", hasModifiers: false, stock: null },
    { id: 'brunch-12', name: "Full English Breakfast", price: 22, category: "Brunch", image_url: "../images/sub catégorie images/Brunch food/delicious-and-hearty-full-english-breakfast-plate-with-fried-eggs-sausages-toast-beans-and-tomatoes-isolated-on-transparent-background-png.png", hasModifiers: false, stock: null },
    { id: 'brew-1', name: "Café Noir Italien", price: 6.5, category: "Coffee", image_url: "../images/sub catégorie images/black coffee/Café Noir Italien.jpg", hasModifiers: false, stock: null },
    { id: 'brew-2', name: "Matcha Latte", price: 7.25, category: "Tea", image_url: "../images/sub catégorie images/latté/Matcha Latte.jpg", hasModifiers: false, stock: null },
    { id: 'brew-3', name: "Ethiopian Yirgacheffe", price: 5, category: "Coffee", image_url: "../images/sub catégorie images/latté/Ethiopian Yirgacheffe.jpg", hasModifiers: false, stock: null },
    { id: 'brew-4', name: "Café Royal", price: 6.75, category: "Coffee", image_url: "../images/sub catégorie images/black coffee/Café Royal.jpg", hasModifiers: false, stock: null },
    { id: 'brew-5', name: "Café au Lait Artisanal", price: 4.5, category: "Coffee", image_url: "../images/sub catégorie images/latté/Café au Lait Artisanal.jpg", hasModifiers: false, stock: null },
    { id: 'brew-6', name: "lavender Tea", price: 7.5, category: "Tea", image_url: "../images/sub catégorie images/tea/lavender Tea.jpg", hasModifiers: false, stock: null },
    { id: 'brew-7', name: "Golden Turmeric", price: 6.25, category: "Tea", image_url: "../images/sub catégorie images/smoothie/Golden Turmeric.jpg", hasModifiers: false, stock: null },
    { id: 'brew-8', name: "Café au lait avec la Creme", price: 6.5, category: "Coffee", image_url: "../images/sub catégorie images/latté/Café au lait avec la Creme.jpg", hasModifiers: false, stock: null },
    { id: 'brew-9', name: "Café Léger ", price: 8, category: "Coffee", image_url: "../images/sub catégorie images/black coffee/Café Léger .jpg", hasModifiers: false, stock: null },
    { id: 'brew-10', name: "Blueberry Infusion", price: 5.75, category: "Tea", image_url: "../images/sub catégorie images/Jus/Blueberry Infusion.jpg", hasModifiers: false, stock: null },
    { id: 'bread-1', name: "Chocolate Babka", price: 12, category: "Pastry", image_url: "../images/sub catégorie images/sweets/Chocolate Babka.jpg", hasModifiers: false, stock: null },
    { id: 'bread-3', name: "Salade Espagnol", price: 10.5, category: "Bread", image_url: "../images/sub catégorie images/Brunch food/Salade Espagnol.jpg", hasModifiers: false, stock: null },
    { id: 'bread-4', name: "Herbed Focaccia", price: 7.5, category: "Bread", image_url: "../images/sub catégorie images/Brunch food/Herbed Focaccia.jpg", hasModifiers: false, stock: null },
    { id: 'bread-5', name: "Waffels au Miels Crème", price: 11.25, category: "Bread", image_url: "../images/sub catégorie images/sweets/Waffels au Miels Crème.jpg", hasModifiers: false, stock: null },
    { id: 'bread-6', name: "Salade Cesar", price: 8.75, category: "Bread", image_url: "../images/sub catégorie images/Brunch food/Salade Cesar.jpg", hasModifiers: false, stock: null },
    { id: 'bread-7', name: "Sandwich Viand Hache", price: 4.5, category: "Bread", image_url: "../images/sub catégorie images/Snack food/Sandwich Viand Hache.jpg", hasModifiers: false, stock: null },
    { id: 'bread-8', name: "Banana Split", price: 9.5, category: "Bread", image_url: "../images/sub catégorie images/sweets/Banana Split.jpg", hasModifiers: false, stock: null },
    { id: 'coffee-1', name: "Café normal  ", price: 4.8, category: "Coffee", image_url: "../images/sub catégorie images/black coffee/Café normal  .jpg", hasModifiers: false, stock: null },
    { id: 'coffee-2', name: "Café Américain", price: 5.5, category: "Coffee", image_url: "../images/sub catégorie images/black coffee/Café Américain.jpg", hasModifiers: false, stock: null },
    { id: 'coffee-3', name: "Café au Lait Artisanal", price: 5.2, category: "Coffee", image_url: "../images/sub catégorie images/latté/Café au Lait Artisanal.jpg", hasModifiers: false, stock: null },
    { id: 'coffee-4', name: "Café Noire Expresso", price: 3.5, category: "Coffee", image_url: "../images/sub catégorie images/black coffee/Café Noire Expresso.jpg", hasModifiers: false, stock: null },
    { id: 'coffee-5', name: "Chocolat Fondu", price: 6, category: "Coffee", image_url: "../images/sub catégorie images/sweets/Chocolat Fondu.jpg", hasModifiers: false, stock: null },
    { id: 'cold-1', name: "Jus D'Orange", price: 4.5, category: "Juices", image_url: "../images/sub catégorie images/Jus/Jus D'Orange.jpg", hasModifiers: false, stock: null },
    { id: 'cold-2', name: "Raspberry Smoothie", price: 5.75, category: "Smoothie", image_url: "../images/sub catégorie images/smoothie/raspberry-smoothie_1150-18529.jpg", hasModifiers: false, stock: null },
    { id: 'cold-3', name: "Chocolate Milkshake", price: 6.25, category: "Shakes", image_url: "../images/sub catégorie images/milshake/close-up-milkshake-glass-plate_.jpg", hasModifiers: false, stock: null },
    { id: 'cold-4', name: "Café Crème", price: 5.5, category: "Coffee", image_url: "../images/sub catégorie images/latté/Café Crème.jpg", hasModifiers: false, stock: null },
    { id: 'cold-5', name: "Jus Mangue", price: 5, category: "Smoothie", image_url: "../images/sub catégorie images/Jus/Jus Mangue.jpg", hasModifiers: false, stock: null },
    { id: 'cold-6', name: "Café Noir Italien", price: 4.9, category: "Coffee", image_url: "../images/sub catégorie images/black coffee/Café Noir Italien.jpg", hasModifiers: false, stock: null },
    { id: 'creme-1', name: "Iced Orange Mocktail", price: 5.5, category: "Coffee", image_url: "../images/sub catégorie images/Jus/glass-iced-orange-cocktail-garnished-with-orange-zest-strawberry-shape_140725-6038.avif", hasModifiers: false, stock: null },
    { id: 'creme-2', name: "Tropical Umbrella Cocktail", price: 4.25, category: "Juices", image_url: "../images/sub catégorie images/Jus/colorful-cocktail-with-orange-slice-cocktail-umbrella-green-black-straw_140725-10521.avif", hasModifiers: false, stock: null },
    { id: 'creme-3', name: "Mango Indian Drink", price: 5.75, category: "Cold Drinks", image_url: "../images/sub catégorie images/Jus/delicious-indian-mango-drink-high-angle_23-2148734680.avif", hasModifiers: false, stock: null },
    { id: 'creme-4', name: "Jus de Pomme", price: 4, category: "Juices", image_url: "../images/sub catégorie images/Jus/Jus de Pomme.jpg", hasModifiers: false, stock: null },
    { id: 'creme-5', name: "Jus de Fraise ", price: 5.2, category: "Juices", image_url: "../images/sub catégorie images/Jus/Jus de Fraise .jpg", hasModifiers: false, stock: null },
    { id: 'juice-1', name: "Cuba Mokhito", price: 4.1, category: "Juices", image_url: "../images/sub catégorie images/Jus/Cuba Mokhito.avif", hasModifiers: false, stock: null },
    { id: 'juice-2', name: "Jus D'ananas", price: 4.8, category: "Juices", image_url: "../images/sub catégorie images/Jus/Jus D'ananas.jpg", hasModifiers: false, stock: null },
    { id: 'juice-3', name: "Jus Mangue", price: 5.25, category: "Juices", image_url: "../images/sub catégorie images/Jus/Jus Mangue.jpg", hasModifiers: false, stock: null },
    { id: 'latte-1', name: "Café au lait avec la Creme", price: 4.8, category: "Coffee", image_url: "../images/sub catégorie images/latté/Café au lait avec la Creme.jpg", hasModifiers: false, stock: null },
    { id: 'latte-2', name: "Café au Lait Artisanal", price: 5.1, category: "Coffee", image_url: "../images/sub catégorie images/latté/Café au Lait Artisanal.jpg", hasModifiers: false, stock: null },
    { id: 'latte-3', name: "Caramel Cold Shake", price: 5.1, category: "Coffee", image_url: "../images/sub catégorie images/sweets/caramel-cold-shake-with-cream_.avif", hasModifiers: false, stock: null },
    { id: 'latte-4', name: "Chocolat Cake with Stawberrys", price: 5.4, category: "Coffee", image_url: "../images/sub catégorie images/sweets/Chocolat Cake with Stawberrys.jpg", hasModifiers: false, stock: null },
    { id: 'tea-1', name: "Matcha Latte", price: 12, category: "Tea", image_url: "../images/sub catégorie images/latté/Matcha Latte.jpg", hasModifiers: false, stock: null },
    { id: 'tea-2', name: "Tea Citron Délise", price: 5.5, category: "Tea", image_url: "../images/sub catégorie images/tea/Tea Citron Délise.jpg", hasModifiers: false, stock: null },
    { id: 'tea-3', name: "Tea Nordique", price: 4.75, category: "Tea", image_url: "../images/sub catégorie images/tea/Tea Nordique.jpg", hasModifiers: false, stock: null },
    { id: 'tea-4', name: "The Marocain a la Menthe", price: 4.5, category: "Tea", image_url: "../images/sub catégorie images/tea/The Marocain a la Menthe.jpg", hasModifiers: false, stock: null },
    { id: 'tea-5', name: "Floral Tea", price: 7, category: "Tea", image_url: "../images/sub catégorie images/tea/Floral Tea.jpg", hasModifiers: false, stock: null },
    { id: 'tea-6', name: "The de Hibiscus", price: 6.5, category: "Tea", image_url: "../images/sub catégorie images/tea/The de Hibiscus.jpg", hasModifiers: false, stock: null },
    { id: 'smoothie-1', name: "Blue Berry Smoothie", price: 5.2, category: "Smoothie", image_url: "../images/sub catégorie images/smoothie/Blue Berry Smoothie.jpg", hasModifiers: false, stock: null },
    { id: 'smoothie-2', name: "Kiwi Smoothie", price: 5, category: "Smoothie", image_url: "../images/sub catégorie images/smoothie/Kiwi Smoothie.jpg", hasModifiers: false, stock: null },
    { id: 'shake-1', name: "Milkshake Café Chocolat", price: 5.2, category: "Shakes", image_url: "../images/sub catégorie images/milshake/Milkshake Café Chocolat.jpg", hasModifiers: false, stock: null },
    { id: 'shake-2', name: "Milkshake Oreo", price: 5, category: "Shakes", image_url: "../images/sub catégorie images/milshake/Milkshake Oreo.jpg", hasModifiers: false, stock: null },
    { id: 'shake-3', name: "strawberry-ice milkshake", price: 5.4, category: "Shakes", image_url: "../images/sub catégorie images/milshake/strawberry-ice milkshake.jpg", hasModifiers: false, stock: null },
    { id: 'shake-4', name: "Milkshake Banane", price: 5.6, category: "Shakes", image_url: "../images/sub catégorie images/milshake/Milkshake Banane.jpg", hasModifiers: false, stock: null },
    { id: 'toast-1', name: "Toast Champignon Frommage", price: 14.5, category: "Sandwich or Toast", image_url: "../images/sub catégorie images/toast/Toast Champignon Frommage.jpg", hasModifiers: false, stock: null },
    { id: 'toast-2', name: "Toast Frittata", price: 12.5, category: "Sandwich or Toast", image_url: "../images/sub catégorie images/toast/Toast Frittata.jpg", hasModifiers: false, stock: null },
    { id: 'toast-3', name: "Pumpkin Stew", price: 11.25, category: "Sandwich or Toast", image_url: "../images/sub catégorie images/Brunch food/Pumpkin Stew.jpg", hasModifiers: false, stock: null },
    { id: 'toast-4', name: "Toast Avocado", price: 10.5, category: "Sandwich or Toast", image_url: "../images/sub catégorie images/toast/toast.jpg", hasModifiers: false, stock: null },
    { id: 'toast-5', name: "Croissant Benedict Salmon", price: 13.5, category: "Sandwich or Toast", image_url: "../images/sub catégorie images/Brunch food/croissant-benedict-salmon-with-poched-egg-hollandaise-sauce-served-with-fresh-salad_140725-1329.avif", hasModifiers: false, stock: null },
    { id: 'toast-6', name: "Toast Vegan", price: 12, category: "Sandwich or Toast", image_url: "../images/sub catégorie images/toast/Toast Vegan.jpg", hasModifiers: false, stock: null },
    { id: 'pastry-1', name: "French Toast", price: 4.5, category: "Pastry", image_url: "../images/sub catégorie images/sweets/French Toast.jpg", hasModifiers: false, stock: null },
    { id: 'pastry-2', name: "Mille Feuilles", price: 5.25, category: "Pastry", image_url: "../images/sub catégorie images/sweets/Mille Feuilles.jpg", hasModifiers: false, stock: null },
    { id: 'pastry-3', name: "Teramisu au Chocolat", price: 4.75, category: "Pastry", image_url: "../images/sub catégorie images/sweets/Teramisu au Chocolat.jpg", hasModifiers: false, stock: null },
    { id: 'pastry-4', name: "Waffels au fruit", price: 5.8, category: "Pastry", image_url: "../images/sub catégorie images/sweets/Waffels au fruit.jpg", hasModifiers: false, stock: null },
    { id: 'pastry-5', name: "Chees Cake au Citron", price: 5.9, category: "Pastry", image_url: "../images/sub catégorie images/sweets/Chees Cake au Citron.jpg", hasModifiers: false, stock: null },
    { id: 'pastry-6', name: "Dark an White Chocolat Cake ", price: 4.95, category: "Pastry", image_url: "../images/sub catégorie images/sweets/Dark an White Chocolat Cake .jpg", hasModifiers: false, stock: null },
    { id: 'sweet_1', name: "Cheese Cake Oreo", price: 18, category: "Pastry", image_url: "../images/sub catégorie images/sweets/Cheese Cake Oreo.jpg", hasModifiers: false, stock: null },
    { id: 'sweet_2', name: "Cheese Cake au Caramel", price: 17, category: "Pastry", image_url: "../images/sub catégorie images/sweets/Cheese Cake au Caramel.jpg", hasModifiers: false, stock: null },
    { id: 'sweet_5', name: "Chocolat Fondu", price: 22, category: "Pastry", image_url: "../images/sub catégorie images/sweets/Chocolat Fondu.jpg", hasModifiers: false, stock: null },
    { id: 'sweet_12', name: "Banana Split", price: 20, category: "Pastry", image_url: "../images/sub catégorie images/sweets/Banana Split.jpg", hasModifiers: false, stock: null },
    { id: 'sweet_15', name: "Pancake aux Fruits", price: 18, category: "Pastry", image_url: "../images/sub catégorie images/sweets/pancake avec fraise et chocolat.jpg", hasModifiers: false, stock: null },
    { id: 'vien_1', name: "Croissant", price: 4.5, category: "Pastry", image_url: "../images/sub catégorie images/Pastry/Croissant.jpg", hasModifiers: false, stock: null },
    { id: 'vien_2', name: "Pain au Chocolat", price: 4.8, category: "Pastry", image_url: "../images/sub catégorie images/Pastry/Petit Pain au Chocolat.jpg", hasModifiers: false, stock: null },
    { id: 'vien_3', name: "Pain aux Raisins", price: 5, category: "Pastry", image_url: "../images/sub catégorie images/Pastry/Pain Raisins.jpg", hasModifiers: false, stock: null },
    { id: 'vien_4', name: "Pain Suisse", price: 5.5, category: "Pastry", image_url: "../images/sub catégorie images/Pastry/Pain Suise.jpg", hasModifiers: false, stock: null },
    { id: 'pastry-7', name: "Baklawa", price: 5.5, category: "Pastry", image_url: "../images/sub catégorie images/Pastry/Baklawa.jpg", hasModifiers: false, stock: null },
    { id: 'pastry-8', name: "Basbousa", price: 4.75, category: "Pastry", image_url: "../images/sub catégorie images/Pastry/Basbousa.jpg", hasModifiers: false, stock: null },
    { id: 'pastry-9', name: "Cookies au Chocolat", price: 6, category: "Pastry", image_url: "../images/sub catégorie images/Pastry/Cokkies au chocolat.jpg", hasModifiers: false, stock: null },
    { id: 'pastry-10', name: "Donuts", price: 5, category: "Pastry", image_url: "../images/sub catégorie images/Pastry/Donuts.jpg", hasModifiers: false, stock: null },
    { id: 'fast_1', name: "Tacos Mixte", price: 18, category: "Snack Food", image_url: "../images/sub catégorie images/fast food/Tacos Mixe.jpg", hasModifiers: false, stock: null },
    { id: 'fast_2', name: "Tacos Viande Haché", price: 16, category: "Snack Food", image_url: "../images/sub catégorie images/fast food/Tacos Viande Haché.jpg", hasModifiers: false, stock: null },
    { id: 'fast_3', name: "American Burger", price: 22, category: "Snack Food", image_url: "../images/sub catégorie images/fast food/American Burger .jpg", hasModifiers: false, stock: null },
    { id: 'fast_4', name: "Double Cheese Burger", price: 28, category: "Snack Food", image_url: "../images/sub catégorie images/fast food/Double Cheese Burger.jpg", hasModifiers: false, stock: null },
    { id: 'fast_5', name: "Chicken Burger", price: 20, category: "Snack Food", image_url: "../images/sub catégorie images/fast food/Chiken Burger.jpg", hasModifiers: false, stock: null },
    { id: 'fast_6', name: "Chicken Crunchy Burger", price: 22, category: "Snack Food", image_url: "../images/sub catégorie images/fast food/Burger Chiken Crunchy.jpg", hasModifiers: false, stock: null },
    { id: 'fast_7', name: "Chicken Pickle Burger", price: 21, category: "Snack Food", image_url: "../images/sub catégorie images/fast food/Chiken Pickle Burger.jpg", hasModifiers: false, stock: null },
    { id: 'fast_8', name: "Burger Viande Boeuf", price: 19, category: "Snack Food", image_url: "../images/sub catégorie images/fast food/Burger Viande Beuf.jpg", hasModifiers: false, stock: null },
    { id: 'fast_9', name: "Burger Crevette", price: 24, category: "Snack Food", image_url: "../images/sub catégorie images/fast food/Burger Crevette.jpg", hasModifiers: false, stock: null },
    { id: 'fast_10', name: "Sandwich Poulet", price: 14, category: "Snack Food", image_url: "../images/sub catégorie images/fast food/Sandwich Poulet.jpg", hasModifiers: false, stock: null },
    { id: 'fast_11', name: "Sandwich Viande Haché", price: 15, category: "Snack Food", image_url: "../images/sub catégorie images/fast food/Sandwich Viand Hache.jpg", hasModifiers: false, stock: null },
    { id: 'fast_12', name: "Sandwich Viande", price: 16, category: "Snack Food", image_url: "../images/sub catégorie images/fast food/Sandwich de Viande.jpg", hasModifiers: false, stock: null },
    { id: 'fast_13', name: "Hot Dog", price: 12, category: "Snack Food", image_url: "../images/sub catégorie images/fast food/Hot Dog.jpg", hasModifiers: false, stock: null },
    { id: 'fast_14', name: "Frites", price: 8, category: "Snack Food", image_url: "../images/sub catégorie images/fast food/Frites.jpg", hasModifiers: false, stock: null },
    { id: 'drink-w1', name: "Still Water", price: 0, category: "Juices", image_url: "../images/sub catégorie images/Jus/glass-iced-orange-cocktail-garnished-with-orange-zest-strawberry-shape_140725-6038.avif", hasModifiers: false, stock: null },
    { id: 'drink-w2', name: "Sparkling Water", price: 5, category: "Juices", image_url: "../images/sub catégorie images/Jus/glass-iced-orange-cocktail-garnished-with-orange-zest-strawberry-shape_140725-6038.avif", hasModifiers: false, stock: null },
    { id: 'pairing-1', name: "Fresh Juice", price: 15, category: "Juices", image_url: "../images/sub catégorie images/Jus/Jus D'Orange.jpg", hasModifiers: false, stock: null },
    { id: 'pairing-2', name: "Flat White", price: 18, category: "Coffee", image_url: "../images/sub catégorie images/latté/Café au lait avec la Creme.jpg", hasModifiers: false, stock: null },
    { id: 'pairing-3', name: "Avocado Side", price: 10, category: "Sandwich or Toast", image_url: "../images/sub catégorie images/toast/toast.jpg", hasModifiers: false, stock: null },
    { id: 'pairing-4', name: "Mint Tea", price: 12, category: "Tea", image_url: "../images/sub catégorie images/tea/The Marocain a la Menthe.jpg", hasModifiers: false, stock: null },
    { id: 'pairing-5', name: "Cappuccino", price: 18, category: "Coffee", image_url: "../images/sub catégorie images/latté/Café au Lait Artisanal.jpg", hasModifiers: false, stock: null },
    { id: 'pairing-6', name: "Hot Latte", price: 18, category: "Coffee", image_url: "../images/sub catégorie images/latté/Café au lait avec la Creme.jpg", hasModifiers: false, stock: null },
];

// Helper to fix image paths (handling spaces in URLs)
const fixImagePath = (url) => {
    if (!url) return url;
    if (!url.includes(' ')) return url;
    return url.split('/').map(part => {
        if (part === '..') return part;
        return encodeURIComponent(part);
    }).join('/');
};

DEMO_MENU.forEach(item => {
    item.image_url = fixImagePath(item.image_url);
});

// --- DEMO DATA RE-MAPPING ---
const categoryMap = {
    "Coffee": "Hot Drinks", "Tea": "Hot Drinks", "Latté": "Hot Drinks",
    "Juices": "Cold Drinks", "Smoothie": "Cold Drinks", "Shakes": "Cold Drinks", "Cold Drinks": "Cold Drinks",
    "Brunch": "Brunch & Food", "Sandwich or Toast": "Brunch & Food", "Snack Food": "Brunch & Food", "Bread": "Brunch & Food", "Breakfast": "Brunch & Food",
    "Pastry": "Sweets", "Bakery": "Sweets", "Sweet Pastries": "Sweets"
};
DEMO_MENU.forEach(item => {
    if (categoryMap[item.category]) {
        item.subcategory = item.category;
        item.category = categoryMap[item.category];
    }
});
const DEMO_ORDERS = [];

const getOrders = () => {
    // 1. Try CentralStore (Real-time sync)
    if (window.CentralStore) {
        return window.CentralStore.getOrders('m1').map(o => ({
            id: o.id,
            table: o.table,
            customerName: o.customer || 'Guest',
            notes: o.notes || '',
            items: o.itemsList || [], 
            total: parseFloat(o.total) || 0,
            status: o.status,
            time: o.timestamp || Date.now()
        }));
    }
    
    // 2. Try Local Cache (Persistence on refresh)
    try {
        const cached = localStorage.getItem('stitch_live_orders');
        if (cached) {
            const parsed = JSON.parse(cached);
            if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
    } catch (e) {
        console.warn('Failed to parse cached orders:', e);
    }

    // 3. Fallback to Demo
    return DEMO_ORDERS;
};

const updateOrderStatusInStore = (orderId, status) => {
    if (window.CentralStore) {
        window.CentralStore.updateOrderStatus(orderId, status);
    } else {
        const order = DEMO_ORDERS.find(o => o.id === orderId);
        if (order) order.status = status;
    }
    renderOrders();
};

// --- TRANSLATIONS ---
const DASHBOARD_TRANSLATIONS = {
    en: {
        dashboard: "Dashboard",
        take_order: "Take Order",
        live_orders: "Live Orders",
        kitchen_display: "Kitchen Display",
        menu_manager: "Menu Manager",
        qr_center: "QR Center",
        reservations: "Reservations",
        sign_out: "Sign Out",
        summary_title: "Today's Summary",
        summary_subtitle: "Manage your shop in real-time.",
        manual_order: "Manual Order",
        kitchen_online: "Kitchen Online",
        total_revenue: "Total Revenue",
        active_tables: "Active Tables",
        pending_orders: "Pending",
        completed_orders: "Completed",
        search_placeholder: "Search menu items...",
        add_to_cart: "Add to Order",
        checkout: "Checkout",
        table: "Table",
        status: "Status",
        items: "Items",
        total: "Total",
        action: "Action",
        total_sales: "Total Sales",
        total_orders: "Total Orders",
        today: "Today",
        avg_prep: "Avg. Preparation",
        fast: "Fast",
        in_progress: "In Progress",
        quick_actions: "Quick Actions",
        generate_qr: "<p class='font-bold'>Generate QR</p><p class='text-[10px] text-gray-400 font-bold uppercase tracking-widest'>New Table QR</p>",
        welcome_ali: "<h2 class='text-xl font-bold'>Good Morning, Ali! 👋</h2><p class='text-gray-500 mt-2'>Here's what's happening at Stitch today.</p>",
        end_shift: "End Shift",
        floor_plan: "Floor Plan",
        avg_order: "Avg. Order",
        retention: "Retention",
        revenue_dynamics: "Revenue Dynamics",
        revenue_subtitle: "Real-time financial flow analysis",
        last_24h: "Last 24 Hours",
        last_7d: "Last 7 Days",
        live_activity: "Live Activity",
        view_all: "View All Activity",
        peak_traffic: "Peak Traffic Hours",
        top_products: "Top Performing Products",
        order_history_title: "Order History",
        order_history_subtitle: "Review and manage all past transactions",
        order_id: "Order ID",
        customer: "Customer / Table",
        items: "Items",
        total: "Total",
        status: "Status",
        date: "Date",
        actions: "Actions",
        showing_orders: "Showing 1-10 of 124 orders",
        search_your_product: "Search your Product..."
    },
    fr: {
        dashboard: "Tableau de Bord",
        take_order: "Prendre Commande",
        live_orders: "Commandes en Direct",
        kitchen_display: "Affichage Cuisine",
        menu_manager: "Gestion Menu",
        qr_center: "Centre QR",
        reservations: "Réservations",
        sign_out: "Déconnexion",
        summary_title: "Résumé d'aujourd'hui",
        summary_subtitle: "Gérez votre boutique en temps réel.",
        manual_order: "Commande Manuelle",
        kitchen_online: "Cuisine en Ligne",
        total_revenue: "Chiffre d'Affaire",
        active_tables: "Tables Actives",
        pending_orders: "En attente",
        completed_orders: "Terminées",
        search_placeholder: "Rechercher des articles...",
        add_to_cart: "Ajouter à la commande",
        checkout: "Payer",
        table: "Table",
        status: "Statut",
        items: "Articles",
        total: "Total",
        action: "Action",
        total_sales: "Ventes Totales",
        total_orders: "Commandes Totales",
        today: "Aujourd'hui",
        avg_prep: "Préparation Moy.",
        fast: "Rapide",
        in_progress: "En Cours",
        quick_actions: "Actions Rapides",
        generate_qr: "<p class='font-bold'>Générer QR</p><p class='text-[10px] text-gray-400 font-bold uppercase tracking-widest'>Nouveau QR Table</p>",
        welcome_ali: "<h2 class='text-xl font-bold'>Bonjour, Ali ! 👋</h2><p class='text-gray-500 mt-2'>Voici ce qui se passe chez Stitch aujourd'hui.</p>",
        end_shift: "Fin de service",
        floor_plan: "Plan de salle",
        avg_order: "Commande Moy.",
        retention: "Rétention",
        revenue_dynamics: "Dynamique des Revenus",
        revenue_subtitle: "Analyse des flux financiers en temps réel",
        last_24h: "Dernières 24 Heures",
        last_7d: "7 Derniers Jours",
        live_activity: "Activité en Direct",
        view_all: "Voir Toute l'Activité",
        peak_traffic: "Heures de Pointe",
        top_products: "Produits les Plus Vendus",
        order_history_title: "Historique des Commandes",
        order_history_subtitle: "Consultez et gérez toutes les transactions passées",
        order_id: "ID Commande",
        customer: "Client / Table",
        items: "Articles",
        total: "Total",
        status: "Statut",
        date: "Date",
        actions: "Actions",
        showing_orders: "Affichage 1-10 sur 124 commandes",
        search_your_product: "Chercher votre Produit..."
    },
    ar: {
        dashboard: "لوحة التحكم",
        take_order: "طلب جديد",
        live_orders: "الطلبات المباشرة",
        kitchen_display: "شاشة المطبخ",
        menu_manager: "إدارة القائمة",
        qr_center: "مركز QR",
        reservations: "الحجوزات",
        settings: "الإعدادات",
        sign_out: "تسجيل الخروج",
        summary_title: "ملخص اليوم",
        summary_subtitle: "إدارة متجرك في الوقت الفعلي.",
        manual_order: "طلب يدوي",
        kitchen_online: "المطبخ متصل",
        total_revenue: "إجمالي الإيرادات",
        active_tables: "الطاولات النشطة",
        pending_orders: "قيد الانتظار",
        completed_orders: "مكتمل",
        search_placeholder: "البحث في القائمة...",
        add_to_cart: "إضافة للطلب",
        checkout: "الدفع",
        table: "طاولة",
        status: "الحالة",
        items: "العناصر",
        total: "المجموع",
        action: "إجراء",
        total_sales: "إجمالي المبيعات",
        total_orders: "إجمالي الطلبات",
        today: "اليوم",
        avg_prep: "متوسط التحضير",
        fast: "سريع",
        in_progress: "قيد التنفيذ",
        quick_actions: "إجراءات سريعة",
        generate_qr: "<p class='font-bold'>إنشاء QR</p><p class='text-[10px] text-gray-400 font-bold uppercase tracking-widest'>QR طاولة جديد</p>",
        welcome_ali: "<h2 class='text-xl font-bold'>صباح الخير، علي! 👋</h2><p class='text-gray-500 mt-2'>إليك ما يحدث في Stitch اليوم.</p>",
        end_shift: "إنهاء الوردية",
        floor_plan: "مخطط الصالة",
        active_order: "الطلب الحالي",
        items_selected: "عناصر محددة",
        subtotal: "المجموع الفرعي",
        validate_order: "تأكيد الطلب",
        print_receipt: "طباعة الإيصال",
        full_details: "التفاصيل الكاملة",
        start_preparing: "بدء التحضير",
        mark_as_ready: "جاهز للتسليم",
        complete_archive: "إكمال وأرشفة",
        avg_order: "متوسط الطلب",
        retention: "الاحتفاظ بالعملاء",
        revenue_dynamics: "ديناميكيات الإيرادات",
        revenue_subtitle: "تحليل التدفق المالي في الوقت الفعلي",
        last_24h: "آخر 24 ساعة",
        last_7d: "آخر 7 أيام",
        live_activity: "النشاط المباشر",
        view_all: "عرض كل النشاط",
        peak_traffic: "ساعات الذروة",
        top_products: "المنتجات الأكثر مبيعاً",
        order_history_title: "سجل الطلبات",
        order_history_subtitle: "مراجعة وإدارة جميع المعاملات السابقة",
        order_id: "رقم الطلب",
        customer: "العميل / الطاولة",
        items: "العناصر",
        total: "المجموع",
        status: "الحالة",
        date: "التاريخ",
        actions: "الإجراءات",
        showing_orders: "عرض 1-10 من أصل 124 طلباً",
        search_your_product: "ابحث عن منتجك..."
    }
};

let currentLang = localStorage.getItem('stitch_dashboard_lang') || 'en';

function switchLanguage(lang) {
    currentLang = lang;
    window.posLanguage = lang.toUpperCase();
    localStorage.setItem('stitch_dashboard_lang', lang);
    localStorage.setItem('stitch_language', window.posLanguage);

    // Set direction
    const isRtl = lang === 'ar';
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);

    // Update translations
    document.querySelectorAll('[data-i18n], [data-i18n-inner]').forEach(el => {
        const key = el.getAttribute('data-i18n') || el.getAttribute('data-i18n-inner');
        if (DASHBOARD_TRANSLATIONS[lang] && DASHBOARD_TRANSLATIONS[lang][key]) {
            if (el.hasAttribute('data-i18n-inner')) {
                el.innerHTML = DASHBOARD_TRANSLATIONS[lang][key];
            } else {
                el.textContent = DASHBOARD_TRANSLATIONS[lang][key];
            }
        }
    });

    if (typeof applyTranslation === 'function') applyTranslation();

    // Update UI active state
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active-lang', 'bg-primary', 'text-white');
        if (btn.id === `lang-${lang}`) {
            btn.classList.add('active-lang', 'bg-primary', 'text-white');
        }
    });

    // Update cycle button text
    const langCycleText = document.getElementById('lang-cycle-text');
    if (langCycleText) {
        langCycleText.textContent = lang.toUpperCase();
    }

    // Handle dynamic text elements
    if (typeof updateDynamicTranslations === 'function') {
        updateDynamicTranslations();
    }
}

function updateDynamicTranslations() {
    const title = document.getElementById('page-title');
    const subtitle = document.getElementById('page-subtitle');

    // Only update if they exist and are matched to summary
    if (title && (title.textContent.includes('Summary') || title.textContent.includes('Résumé') || title.textContent.includes('ملخص'))) {
        title.textContent = DASHBOARD_TRANSLATIONS[currentLang].summary_title;
    }
}

function cycleLanguage() {
    const languages = ['en', 'fr', 'ar'];
    const currentIndex = languages.indexOf(currentLang);
    const nextIndex = (currentIndex + 1) % languages.length;
    const nextLang = languages[nextIndex];
    
    // Update the button text
    const langCycleText = document.getElementById('lang-cycle-text');
    const langCycleTextKitchen = document.getElementById('lang-cycle-text-kitchen');
    if (langCycleText) langCycleText.textContent = nextLang.toUpperCase();
    if (langCycleTextKitchen) langCycleTextKitchen.textContent = nextLang.toUpperCase();
    
    // Switch to the next language
    switchLanguage(nextLang);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    switchLanguage(currentLang);
    
    // Initialize cycle button text
    const langCycleText = document.getElementById('lang-cycle-text');
    const langCycleTextKitchen = document.getElementById('lang-cycle-text-kitchen');
    if (langCycleText) langCycleText.textContent = currentLang.toUpperCase();
    if (langCycleTextKitchen) langCycleTextKitchen.textContent = currentLang.toUpperCase();
    
    // Sidebar Toggle Initialization
    const sidebarState = localStorage.getItem('stitch_sidebar_state') || 'expanded';
    if (sidebarState === 'collapsed' && window.innerWidth >= 768) {
        document.body.classList.add('sidebar-collapsed');
    }

    // Header Toggle Initialization
    const headerState = localStorage.getItem('stitch_header_state') || 'expanded';
    if (headerState === 'collapsed') {
        document.body.classList.add('header-collapsed');
    }
});

function toggleSidebar() {
    const isMobile = window.innerWidth < 768;
    const sidebar = document.getElementById('sidebar');
    
    if (isMobile) {
        sidebar.classList.toggle('-translate-x-full');
    } else {
        document.body.classList.toggle('sidebar-collapsed');
        const isCollapsed = document.body.classList.contains('sidebar-collapsed');
        localStorage.setItem('stitch_sidebar_state', isCollapsed ? 'collapsed' : 'expanded');
    }
}

function toggleHeader() {
    document.body.classList.toggle('header-collapsed');
    const isCollapsed = document.body.classList.contains('header-collapsed');
    localStorage.setItem('stitch_header_state', isCollapsed ? 'collapsed' : 'expanded');
}


// --- STATE ---
let posCart = [];
let menuItems = [...DEMO_MENU];

let globalCategories = [
    { name: 'Hot Drinks', image_url: '../images/sub catégories icons/black coffe icon.jpg' },
    { name: 'Cold Drinks', image_url: '../images/sub catégories icons/Cold drinks icon.jpg' },
    { name: 'Brunch & Food', image_url: '../images/sub catégories icons/Breakfast.jpg' },
    { name: 'Sweets', image_url: '../images/sub catégories icons/sweet pastry icon.png' }
];

let globalSubcategories = [
    { id: 'sub-1', parentCategory: 'Hot Drinks', name: 'Coffee' },
    { id: 'sub-2', parentCategory: 'Hot Drinks', name: 'Tea' },
    { id: 'sub-3', parentCategory: 'Hot Drinks', name: 'Latté' },
    { id: 'sub-4', parentCategory: 'Cold Drinks', name: 'Juices' },
    { id: 'sub-5', parentCategory: 'Cold Drinks', name: 'Smoothie' },
    { id: 'sub-6', parentCategory: 'Cold Drinks', name: 'Shakes' },
    { id: 'sub-7', parentCategory: 'Brunch & Food', name: 'Brunch' },
    { id: 'sub-8', parentCategory: 'Brunch & Food', name: 'Sandwich or Toast' },
    { id: 'sub-9', parentCategory: 'Brunch & Food', name: 'Snack Food' },
    { id: 'sub-10', parentCategory: 'Brunch & Food', name: 'Bread' },
    { id: 'sub-11', parentCategory: 'Sweets', name: 'Pastry' }
];

let liveOrders = getOrders(); 
let completedOrders = JSON.parse(localStorage.getItem('stitch_completed_orders') || '[]'); // Track completed orders for Z-Report

// Listen for CentralStore updates
window.addEventListener('stitch_data_updated', () => {
    console.log('⚡ CentralStore updated, refreshing dashboard...');
    liveOrders = getOrders();
    
    // Refresh current tab if it depends on orders
    const activeTabId = document.querySelector('.tab-content:not(.hidden)')?.id.replace('-tab', '');
    if (activeTabId === 'dashboard') renderDashboard();
    if (activeTabId === 'orders') renderOrders();
    if (activeTabId === 'kitchen') renderKitchenDisplay();
});

function renderOrders() {
    const container = document.getElementById('orders-history-list');
    if (!container) return;

    // Use liveOrders and completedOrders
    const allHistoricalOrders = [...liveOrders, ...completedOrders].sort((a, b) => (b.time || 0) - (a.time || 0));

    if (allHistoricalOrders.length === 0) {
        container.innerHTML = `
            <tr>
                <td colspan="7" class="px-6 py-12 text-center text-slate-400 font-bold italic">
                    No order history found.
                </td>
            </tr>
        `;
        return;
    }

    container.innerHTML = allHistoricalOrders.map(order => {
        const date = new Date(order.time || Date.now());
        const formattedDate = date.toLocaleDateString(currentLang === 'ar' ? 'ar-MA' : (currentLang === 'fr' ? 'fr-FR' : 'en-US'), {
            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });

        let statusClass = "bg-slate-100 text-slate-600";
        if (order.status === 'Ready' || order.status === 'Completed') statusClass = "bg-green-100 text-green-600";
        if (order.status === 'Preparing') statusClass = "bg-blue-100 text-blue-600";
        if (order.status === 'Received' || order.status === 'Pending') statusClass = "bg-amber-100 text-amber-600";

        const itemsCount = Array.isArray(order.items) ? order.items.length : 0;
        const total = typeof order.total === 'number' ? order.total.toFixed(2) : '0.00';

        return `
            <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all group">
                <td class="px-6 py-4 font-black text-xs text-slate-400">#${order.id.toString().slice(-6).toUpperCase()}</td>
                <td class="px-6 py-4">
                    <p class="text-sm font-bold">${order.customerName || 'Guest'}</p>
                    <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">${order.table ? `Table ${order.table}` : 'Walk-in'}</p>
                </td>
                <td class="px-6 py-4 text-sm font-medium text-slate-600">${itemsCount} Items</td>
                <td class="px-6 py-4 text-sm font-black text-primary">${total}DH</td>
                <td class="px-6 py-4">
                    <span class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${statusClass}">
                        ${order.status}
                    </span>
                </td>
                <td class="px-6 py-4 text-xs font-bold text-slate-400">${formattedDate}</td>
                <td class="px-6 py-4 text-right">
                    <button class="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all">
                        <span class="material-symbols-outlined text-sm">visibility</span>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function renderDashboard() {
    // This could update the charts or dynamic stats if we had real data
    console.log('Rendering Dashboard Stats...');
}
let globalDiscount = { amount: 0, type: '%' };
let currentModItem = null; // Item currently being customized
let activePosCartItemId = null;
let kitchenFilter = 'all'; // Kitchen display filter: 'all', 'Received', 'Preparing', 'Ready'
let hasHydratedMenuFromAPI = false;
let menuRequestPromise = null;
let hasInitializedMenuManager = false;
let initialHydrationFinished = false;

function waitForMaterialSymbols(timeoutMs = 1200) {
    if (!document.fonts?.load) return Promise.resolve();
    return Promise.race([
        document.fonts.load('20px "Material Symbols Outlined"'),
        new Promise(resolve => setTimeout(resolve, timeoutMs))
    ]);
}

function finishInitialHydration() {
    if (initialHydrationFinished) return;
    initialHydrationFinished = true;
    document.body.classList.remove('app-preload');
}

function revealMaterialIcons() {
    document.body.classList.remove('icons-pending');
}

window.addEventListener('error', () => {
    finishInitialHydration();
    revealMaterialIcons();
}, { once: true });
window.addEventListener('unhandledrejection', () => {
    finishInitialHydration();
    revealMaterialIcons();
}, { once: true });

// --- API HELPER (gracefully falls back to demo data) ---
function apiBase() {
    try {
        return localStorage.getItem('stitch_api_base') || 'http://localhost:3000';
    } catch {
        return 'http://localhost:3000';
    }
}

async function fetchJSON(url, options = {}) {
    const { timeoutMs = 2500, ...restOptions } = options;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    const token = localStorage.getItem('stitch_token');
    try {
        const res = await fetch(url, {
            ...restOptions,
            signal: controller.signal,
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', ...(restOptions.headers || {}) }
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
    } finally {
        clearTimeout(timeoutId);
    }
}

function hydrateMenuFromCache() {
    try {
        const cached = JSON.parse(localStorage.getItem('stitch_menu_cache') || '[]');
        if (Array.isArray(cached) && cached.length > 0) menuItems = cached;
    } catch { }
}

function persistMenuCache(items) {
    try {
        localStorage.setItem('stitch_menu_cache', JSON.stringify(items));
    } catch { }
}

async function ensureMenuData() {
    if (hasHydratedMenuFromAPI) return;
    if (menuRequestPromise) {
        await menuRequestPromise;
        return;
    }

    const token = localStorage.getItem('stitch_token');
    const apiBaseUrl = apiBase();
    if (!token && apiBaseUrl === 'http://localhost:3000') {
        hasHydratedMenuFromAPI = true;
        return;
    }

    menuRequestPromise = (async () => {
        try {
            const result = await fetchJSON(`${apiBaseUrl}/api/v1/menu`, { timeoutMs: 1500 });
            if (result.success && Array.isArray(result.data) && result.data.length > 0) {
                menuItems = result.data;
                persistMenuCache(menuItems);
            }
        } catch { }
        hasHydratedMenuFromAPI = true;
        menuRequestPromise = null;
    })();

    await menuRequestPromise;
}

// --- TAB SWITCHING ---
const pageTitle = document.getElementById('page-title');
const pageSubtitle = document.getElementById('page-subtitle');

function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));
    
    const activeTab = document.getElementById(`${tabId}-tab`);
    if (activeTab) activeTab.classList.remove('hidden');

    const globalCart = document.getElementById('global-cart-wrapper');
    if (globalCart) {
        if (tabId === 'pos') {
            globalCart.classList.remove('hidden');
            globalCart.classList.add('flex');
        } else {
            globalCart.classList.add('hidden');
            globalCart.classList.remove('flex');
        }
    }

    // Toggle Manual Order button visibility (Hide only on POS tab as requested)
    const manualOrderBtn = document.getElementById('pos-quick-btn');
    if (manualOrderBtn) {
        if (tabId === 'pos') {
            manualOrderBtn.classList.add('hidden');
        } else {
            manualOrderBtn.classList.remove('hidden');
        }
    }

    document.querySelectorAll('#collapsed-quick-rail .collapsed-nav-btn .material-symbols-outlined').forEach(el => {
        el.classList.remove('icon-active-gradient');
    });
    const activeCollapsedIcon = document.querySelector(`#collapsed-quick-rail .collapsed-nav-btn[data-tab="${tabId}"] .material-symbols-outlined`);
    if (activeCollapsedIcon) {
        activeCollapsedIcon.classList.add('icon-active-gradient');
    }

    // Update Premium Sidebar Active State
    document.querySelectorAll('#sidebar .nav-btn').forEach(btn => {
        if (btn.dataset.tab === tabId) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    const dict = DASHBOARD_TRANSLATIONS[currentLang] || DASHBOARD_TRANSLATIONS.en;
    const titles = {
        dashboard: [dict.summary_title || "Today's Summary", dict.summary_subtitle || "Manage your shop in real-time."],
        pos: [dict.take_order || "Point of Sale", ""],
        orders: [dict.live_orders || "Order History", "Review and manage all past orders."],
        kitchen: [dict.kitchen_display || "Kitchen Display", "Manage orders in the kitchen."],
        menu: [dict.menu_manager || "Menu Management", "Add, edit, or remove products from your shop."],
        qr: [dict.qr_center || "QR Command Center", "Manage table status and generate ordering codes."],
        reservations: [dict.reservations || "Reservations", "Manage bookings and walk-ins."],
        settings: [dict.settings || "Settings", "Configure your dashboard preferences."],
    };
    if (pageTitle && titles[tabId]) {
        pageTitle.textContent = titles[tabId][0];
        if (pageSubtitle) {
            if (tabId === 'pos') {
                // Hide subtitle in POS mode
                pageSubtitle.style.display = 'none';
            } else {
                // Show subtitle and set text for other tabs
                pageSubtitle.style.display = 'block';
                pageSubtitle.textContent = titles[tabId][1];
            }
        }
    }

    if (tabId === 'dashboard') { renderDashboard(); }
    if (tabId === 'pos') { loadPOSMenu(); }
    if (tabId === 'orders') { renderOrders(); }
    if (tabId === 'kitchen') { renderKitchenDisplay(); }
    if (tabId === 'menu') { loadMenuManager(); }
    if (tabId === 'qr') { loadQRTab(); }
    if (tabId === 'reservations') { loadReservationsTab(); }
    if (tabId === 'settings') { initSettingsTab(); }

    // Hide header for POS and Kitchen tabs to maximize screen space
    const pageHeader = document.querySelector('.pos-page-header');
    if (pageHeader) {
        if (tabId === 'pos' || tabId === 'kitchen') {
            pageHeader.style.display = 'none';
        } else {
            pageHeader.style.display = '';
        }
    }
}

// --- QR CENTER TAB ---
const DEFAULT_TABLE_DATA = {
    "Floor A": [
        { id: "A-1", status: "Available", seats: 4 },
        { id: "A-2", status: "Available", seats: 4 },
        { id: "A-3", status: "Available", seats: 2 },
        { id: "A-4", status: "Occupied", seats: 6 },
        { id: "A-5", status: "Available", seats: 4 },
        { id: "A-6", status: "Available", seats: 4 },
    ],
    "Floor B": [
        { id: "B-1", status: "Available", seats: 4 },
        { id: "B-2", status: "Available", seats: 4 },
        { id: "B-3", status: "Available", seats: 4 },
    ],
    "Terrace": [
        { id: "T-1", status: "Available", seats: 2 },
        { id: "T-2", status: "Available", seats: 2 },
        { id: "T-3", status: "Available", seats: 4 },
    ]
};

let TABLE_DATA = JSON.parse(localStorage.getItem('stitch_tables')) || DEFAULT_TABLE_DATA;
let reservations = JSON.parse(localStorage.getItem('stitch_reservations')) || [];
let qrPrintSize = 'small'; // small, medium, large

function saveTableData() {
    localStorage.setItem('stitch_tables', JSON.stringify(TABLE_DATA));
}

let qrSelectedTables = []; // Array of table IDs
let currentQRFloor = "Floor A";
let currentViewedTable = null; // Object {id, floor}
let currentQRMode = 'prod'; // 'prod' or 'local'

function loadQRTab() {
    renderQRFloors();
    renderTableGrid(currentQRFloor);
    updateQRSelectionPanel();
    bindQRBlankClickDeselect();
}

function renderQRFloors() {
    const container = document.getElementById('qr-floors');
    if (!container) return;
    const floors = Object.keys(TABLE_DATA);
    container.innerHTML = floors.map(floor => `
        <button onclick="switchQRFloor('${floor}')" class="px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${floor === currentQRFloor ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'}">
            ${floor}
        </button>
    `).join('');
}

window.switchQRFloor = (floor) => {
    currentQRFloor = floor;
    renderQRFloors();
    renderTableGrid(floor);
};

function renderTableGrid(floor) {
    const grid = document.getElementById('qr-grid');
    if (!grid) return;
    const tables = TABLE_DATA[floor] || [];

    grid.innerHTML = tables.map(t => {
        const isSelected = qrSelectedTables.includes(t.id);
        const isReserved = reservations.some(r => r.tableId === t.id);
        const status = isReserved ? 'Reserved' : t.status;
        
        let statusBadge = `<span class="badge badge-success">Available</span>`;
        if (status === 'Occupied') statusBadge = `<span class="badge badge-danger">Occupied</span>`;
        if (status === 'Reserved') statusBadge = `<span class="badge badge-warning">Reserved</span>`;

        return `
            <div class="premium-card qr-premium-card p-6 flex flex-col items-center text-center group">
                <div class="w-full aspect-square bg-slate-50 dark:bg-slate-900 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden group-hover:shadow-inner transition-all">
                    <div class="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
                        <span class="material-symbols-outlined text-9xl">qr_code_2</span>
                    </div>
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Table${t.id}" class="w-40 h-40 relative z-10 drop-shadow-md group-hover:scale-105 transition-transform">
                </div>
                
                <div class="mb-4">
                    <h4 class="text-xl font-black text-slate-900 dark:text-white">Table ${t.id}</h4>
                    <p class="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">${floor}</p>
                </div>

                <div class="mb-6">
                    ${statusBadge}
                </div>

                <div class="flex w-full gap-2 mt-auto">
                    <button onclick="viewTable('${t.id}', '${floor}')" class="flex-1 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">Manage</button>
                    <button onclick="printCurrentQR('${t.id}')" class="w-12 h-12 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-500 hover:text-primary transition-all">
                        <span class="material-symbols-outlined text-lg">print</span>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

window.toggleTableSelection = (id) => {
    const idx = qrSelectedTables.indexOf(id);
    if (idx > -1) qrSelectedTables.splice(idx, 1);
    else qrSelectedTables.push(id);

    updateQRBulkActions();
    renderTableGrid(currentQRFloor);
};

function updateQRBulkActions() {
    const bar = document.getElementById('qr-bulk-actions');
    const text = document.getElementById('selected-count-text');
    if (!bar || !text) return;

    if (qrSelectedTables.length > 0) {
        bar.classList.remove('hidden');
        text.textContent = `${qrSelectedTables.length} Table${qrSelectedTables.length > 1 ? 's' : ''} Selected`;
    } else {
        bar.classList.add('hidden');
    }
}

function updateQRSelectionPanel() {
    const noSel = document.getElementById('qr-no-selection');
    const activeSel = document.getElementById('qr-active-selection');
    if (!noSel || !activeSel) return;

    if (!currentViewedTable) {
        noSel.classList.remove('hidden');
        activeSel.classList.add('hidden');
    } else {
        noSel.classList.add('hidden');
        activeSel.classList.remove('hidden');

        const table = TABLE_DATA[currentViewedTable.floor].find(t => t.id === currentViewedTable.id);
        document.getElementById('qr-sel-id').textContent = `Table ${table.id}`;
        document.getElementById('qr-sel-area').textContent = currentViewedTable.floor;

        // Update status buttons
        document.querySelectorAll('.status-toggle-btn').forEach(btn => {
            const isMatch = btn.dataset.status === table.status;
            btn.classList.toggle('bg-primary', isMatch && table.status === 'Occupied');
            btn.classList.toggle('bg-green-500', isMatch && table.status === 'Available');
            btn.classList.toggle('text-white', isMatch);
            btn.classList.toggle('border-transparent', isMatch);
        });

        // Update size buttons
        document.querySelectorAll('.size-option-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.size === qrPrintSize);
            btn.classList.toggle('bg-primary', btn.dataset.size === qrPrintSize);
            btn.classList.toggle('text-white', btn.dataset.size === qrPrintSize);
        });

        generateQRPreview(table.id);
    }
}

function clearViewedTableSelection() {
    if (!currentViewedTable) return;
    currentViewedTable = null;
    renderTableGrid(currentQRFloor);
    updateQRSelectionPanel();
}

function bindQRBlankClickDeselect() {
    const grid = document.getElementById('qr-table-grid');
    const leftColumn = grid?.closest('.lg\\:col-span-2');
    if (!grid || !leftColumn || leftColumn.dataset.blankDeselectBound === '1') return;

    leftColumn.dataset.blankDeselectBound = '1';
    grid.addEventListener('click', (event) => {
        if (event.target === grid) {
            clearViewedTableSelection();
        }
    });

    leftColumn.addEventListener('click', (event) => {
        const clickedInteractive = event.target.closest('button, input, label, a');
        if (clickedInteractive) return;
        clearViewedTableSelection();
    });

    if (document.body.dataset.qrEscDeselectBound !== '1') {
        document.body.dataset.qrEscDeselectBound = '1';
        document.addEventListener('keydown', (event) => {
            if (event.key !== 'Escape') return;
            const qrTab = document.getElementById('qr-tab');
            if (qrTab?.classList.contains('hidden')) return;
            clearViewedTableSelection();
        });
    }
}

window.viewTable = (id, floor) => {
    currentViewedTable = { id, floor };
    renderTableGrid(floor);
    updateQRSelectionPanel();
};

window.setTableStatus = (status) => {
    if (!currentViewedTable) return;
    const table = TABLE_DATA[currentViewedTable.floor].find(t => t.id === currentViewedTable.id);
    if (table) {
        table.status = status;
        saveTableData();
        renderTableGrid(currentViewedTable.floor);
        updateQRSelectionPanel();
    }
};

window.setPrintSize = (size) => {
    qrPrintSize = size;
    
    // Update radio card active states
    const buttons = document.querySelectorAll('.btn-radio-card');
    buttons.forEach(btn => {
        if (btn.dataset.size === size) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    updateQRSelectionPanel();
};

function overlayQRCode(ctx, canvas, qrImg, tableId) {
    // Calculate position for QR code to fit perfectly in brackets
    const qrSize = 175; 
    const qrX = (canvas.width - qrSize) / 2;
    const qrY = 118; // Adjusted to sit inside brackets

    // 1. Draw white background for QR area to cover the "QR" placeholder
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(qrX - 2, qrY - 2, qrSize + 4, qrSize + 4);
    
    // 2. Draw QR code
    ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);
    
    // 3. Draw background color patch to cover messy instructions
    // Using a color close to the template's yellow/light area if possible, 
    // but the template is mostly white/light in that area. 
    // Let's use the background color of the template area.
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(20, 305, 210, 80); // Covering the instruction block

    // 4. Draw Clear Instructions
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    
    // Instruction 1
    ctx.font = '700 9px "Plus Jakarta Sans", sans-serif';
    ctx.fillText("1. OUVREZ L'APPAREIL PHOTO", canvas.width / 2, 315);
    ctx.font = '500 8px "Plus Jakarta Sans", sans-serif';
    ctx.fillText("DE VOTRE TÉLÉPHONE", canvas.width / 2, 325);
    
    // Instruction 2
    ctx.font = '700 9px "Plus Jakarta Sans", sans-serif';
    ctx.fillText("2. POINTEZ LE QR CODE", canvas.width / 2, 340);
    
    // Instruction 3
    ctx.font = '700 9px "Plus Jakarta Sans", sans-serif';
    ctx.fillText("3. APPUYEZ SUR LA NOTIFICATION", canvas.width / 2, 355);
    ctx.font = '500 8px "Plus Jakarta Sans", sans-serif';
    ctx.fillText("POUR AFFICHER NOTRE MENU", canvas.width / 2, 365);
    
    // 5. Add table number text at bottom area
    ctx.fillStyle = '#000000'; 
    ctx.font = '800 24px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${tableId}`, canvas.width / 2, 400);
}

function generateQRPreview(tableId) {
    const container = document.getElementById('qr-preview-canvas');
    if (!container) return;
    container.innerHTML = '';

    // The user requested the link structure like Vercel
    const productionBase = 'https://stitch-cafe-menu.vercel.app';
    let localBase = window.location.origin;
    
    // Fix for local file:// execution
    if (window.location.protocol === 'file:') {
        localBase = window.location.href.substring(0, window.location.href.indexOf('/merchant_dashboard_premium'));
    }
    
    const baseUrl = currentQRMode === 'prod' ? productionBase : localBase;
    const url = `${baseUrl}/swiggy-style_elite_main_menu_390x2500/index.html?table=${tableId}`;

    // Update debug info in UI
    const debugUrlEl = document.getElementById('qr-debug-url');
    if (debugUrlEl) {
        debugUrlEl.innerHTML = `
            <div class="flex flex-col gap-1">
                <div class="flex items-center justify-between">
                    <span class="text-[8px] opacity-50 uppercase font-black tracking-tighter">Target URL</span>
                    <span class="text-[8px] font-black uppercase px-1 rounded ${currentQRMode === 'prod' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'}">
                        ${currentQRMode === 'prod' ? 'Production' : 'Local Test'}
                    </span>
                </div>
                <span class="break-all leading-tight">${url}</span>
                <div class="flex gap-1.5 mt-2">
                    <button onclick="switchQRMode('prod', '${tableId}')" class="flex-1 text-[9px] py-1 rounded-lg border-2 ${currentQRMode === 'prod' ? 'bg-primary text-white border-primary shadow-glow' : 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-500'} font-bold transition-all">Vercel (Real)</button>
                    <button onclick="switchQRMode('local', '${tableId}')" class="flex-1 text-[9px] py-1 rounded-lg border-2 ${currentQRMode === 'local' ? 'bg-primary text-white border-primary shadow-glow' : 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-500'} font-bold transition-all">Local (Dev)</button>
                </div>
            </div>
        `;
    }

    // Create a temporary div for QRCode.js to render into
    const tempDiv = document.createElement('div');
    new QRCode(tempDiv, {
        text: url,
        width: 256,
        height: 256,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    // Create canvas for the template preview
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 250;
    canvas.height = 420;
    canvas.className = 'rounded-3xl shadow-combined';

    // Load the template image
    const backgroundImage = new Image();
    backgroundImage.onload = function() {
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        
        setTimeout(() => {
            const qrImg = tempDiv.querySelector('img') || tempDiv.querySelector('canvas');
            if (qrImg) {
                overlayQRCode(ctx, canvas, qrImg, tableId);
            }
            container.appendChild(canvas);
            canvas.id = "stylized-qr-canvas";
        }, 50);
    };
    
    // Fallback if template image fails to load
    backgroundImage.onerror = function() {
        console.warn('Template image failed to load, using default preview');
        
        // Fallback to original design
        setTimeout(() => {
            const qrImg = tempDiv.querySelector('img') || tempDiv.querySelector('canvas');
            if (!qrImg) return;

            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, 250, 420);

            ctx.lineWidth = 10;
            ctx.strokeStyle = '#FF5200';
            ctx.strokeRect(5, 5, 240, 410);

            ctx.drawImage(qrImg, 25, 80, 200, 200);

            ctx.fillStyle = '#FF5200';
            ctx.font = 'bold 24px "Instrument Serif", serif';
            ctx.textAlign = 'center';
            ctx.fillText('STITCH CAFÉ', 125, 380);

            container.appendChild(canvas);
            canvas.id = "stylized-qr-canvas";
        }, 50);
    };
    
    // Load the template image
    backgroundImage.src = '../images/qr code .jpg';
}

window.refreshCurrentQR = () => {
    if (currentViewedTable) generateQRPreview(currentViewedTable.id);
};

window.switchQRMode = (mode, tableId) => {
    currentQRMode = mode;
    generateQRPreview(tableId);
};

window.printCurrentQR = () => {
    if (!currentViewedTable) return;

    const sourceCanvas = document.getElementById('stylized-qr-canvas');
    if (!sourceCanvas) return;

    const printSection = document.getElementById('print-section');
    printSection.innerHTML = '';

    const printCanvas = document.createElement('canvas');
    const pctx = printCanvas.getContext('2d');

    // Size Mapping (roughly mapping mm to px at 96dpi)
    const sizes = {
        small: { w: 320, h: 210 }, // Card (~85x55mm)
        medium: { w: 450, h: 450 }, // ~120x120mm
        large: { w: 750, h: 750 }   // ~200x200mm
    };

    const target = sizes[qrPrintSize] || sizes.small;
    printCanvas.width = target.w;
    printCanvas.height = target.h;

    // Draw background white
    pctx.fillStyle = '#ffffff';
    pctx.fillRect(0, 0, target.w, target.h);

    if (qrPrintSize === 'small') {
        // Card layout: QR on left, Text on right
        pctx.drawImage(sourceCanvas, 10, 10, 190, 190);
        pctx.fillStyle = '#FF5200';
        pctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
        pctx.fillText('STITCH', 210, 50);
        pctx.font = '12px "Plus Jakarta Sans", sans-serif';
        pctx.fillStyle = '#666';
        pctx.fillText(`TABLE ${currentViewedTable.id}`, 210, 80);
        pctx.fillText('Scan to Order', 210, 100);
    } else {
        // Square layout: Center QR
        const qrSize = target.w * 0.8;
        const offset = (target.w - qrSize) / 2;
        pctx.drawImage(sourceCanvas, offset, offset, qrSize, qrSize);
    }

    printSection.appendChild(printCanvas);
    printSection.classList.remove('hidden');
    window.print();
    printSection.classList.add('hidden');
};

window.printCurrentQRWithTemplate = () => {
    if (!currentViewedTable) return;

    const sourceCanvas = document.getElementById('stylized-qr-canvas');
    if (!sourceCanvas) return;

    const printSection = document.getElementById('print-section');
    printSection.innerHTML = '';

    const printCanvas = document.createElement('canvas');
    const pctx = printCanvas.getContext('2d');

    // Set dimensions for the template (A5-ish aspect ratio)
    printCanvas.width = 1200;
    printCanvas.height = 1800;

    // Create background image
    const backgroundImage = new Image();
    backgroundImage.onload = function() {
        // Draw the background template
        pctx.drawImage(backgroundImage, 0, 0, printCanvas.width, printCanvas.height);
        
        // Get QR code from QRCode.js instead of sourceCanvas for higher quality
        const tableId = currentViewedTable.id;
        const url = `${window.location.origin}/stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/index.html?table=${tableId}`;
        
        const qrContainer = document.createElement('div');
        new QRCode(qrContainer, {
            text: url,
            width: 1024,
            height: 1024,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        setTimeout(() => {
            const qrImg = qrContainer.querySelector('img') || qrContainer.querySelector('canvas');
            if (qrImg) {
                const qrSize = 840; // 4.8x the 175 from preview
                const qrX = (printCanvas.width - qrSize) / 2;
                const qrY = 500; // Adjusted for print template

                // 1. Draw white background
                pctx.fillStyle = '#FFFFFF';
                pctx.fillRect(qrX - 10, qrY - 10, qrSize + 20, qrSize + 20);

                // 2. Draw QR code
                pctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);
                
                // 3. Draw background patch for instructions
                pctx.fillStyle = '#FFFFFF';
                pctx.fillRect(100, 1340, 1000, 300);

                // 4. Draw Clear Instructions
                pctx.fillStyle = '#000000';
                pctx.textAlign = 'center';
                
                // Instruction 1
                pctx.font = '700 42px "Plus Jakarta Sans", sans-serif';
                pctx.fillText("1. OUVREZ L'APPAREIL PHOTO", printCanvas.width / 2, 1380);
                pctx.font = '500 36px "Plus Jakarta Sans", sans-serif';
                pctx.fillText("DE VOTRE TÉLÉPHONE", printCanvas.width / 2, 1430);
                
                // Instruction 2
                pctx.font = '700 42px "Plus Jakarta Sans", sans-serif';
                pctx.fillText("2. POINTEZ LE QR CODE", printCanvas.width / 2, 1500);
                
                // Instruction 3
                pctx.font = '700 42px "Plus Jakarta Sans", sans-serif';
                pctx.fillText("3. APPUYEZ SUR LA NOTIFICATION", printCanvas.width / 2, 1570);
                pctx.font = '500 36px "Plus Jakarta Sans", sans-serif';
                pctx.fillText("POUR AFFICHER NOTRE MENU", printCanvas.width / 2, 1620);
                
                // 5. Add table number
                pctx.fillStyle = '#000000';
                pctx.font = '800 120px "Plus Jakarta Sans", sans-serif';
                pctx.textAlign = 'center';
                pctx.fillText(`${tableId}`, printCanvas.width / 2, 1750);
            }
            
            // Add to print section and trigger print
            printSection.appendChild(printCanvas);
            printSection.classList.remove('hidden');
            window.print();
            printSection.classList.add('hidden');
        }, 100);
    };
    
    // Load your template image
    backgroundImage.src = '../../image new/qr code .jpg';
    
    // Fallback if image fails to load
    backgroundImage.onerror = function() {
        console.warn('Template image failed to load, using default print');
        printCurrentQR();
    };
};

window.shareCurrentQR = () => {
    if (!currentViewedTable) return;
    const url = `${window.location.origin}/order?table=${currentViewedTable.id}`;
    if (navigator.share) {
        navigator.share({ title: `Order from Table ${currentViewedTable.id}`, url });
    } else {
        alert(`Link copied: ${url}`);
    }
};

window.downloadSelectedQRs = () => {
    if (qrSelectedTables.length === 0) return;

    alert(`⚡ Generating ${qrSelectedTables.length} QR codes for download...`);

    // In a real app, we'd loop through selected tables, 
    // generate canvases, and trigger downloads or a ZIP.
    // For demo: simulation
    setTimeout(() => {
        alert("✅ Download ready! (Simulated)");
        qrSelectedTables = [];
        updateQRBulkActions();
        renderTableGrid(currentQRFloor);
    }, 1500);
};

// --- MENU MANAGER TAB ---
function loadMenuManager() {
    renderMenuManagerList(menuItems);
}

function renderMenuManagerList(items) {
    const container = document.getElementById('menu-manager-list');
    if (!container) return;

    if (items.length === 0) {
        container.innerHTML = `
            <tr>
                <td colspan="5" class="px-6 py-12 text-center text-slate-400 font-bold italic">
                    No products found.
                </td>
            </tr>
        `;
        return;
    }

    container.innerHTML = items.map(item => `
        <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
            <td class="px-6 py-4 flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0">
                    <img src="${item.image}" class="w-full h-full object-cover" onerror="this.src='../assets/placeholder.jpg'">
                </div>
                <div>
                    <div class="font-bold text-sm text-slate-900 dark:text-white">${item.name}</div>
                    <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">ID: ${item.id}</div>
                </div>
            </td>
            <td class="px-6 py-4">
                <div class="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-black inline-block text-slate-500 uppercase tracking-widest">${item.category}</div>
            </td>
            <td class="px-6 py-4">
                <div class="font-black text-sm text-primary">${item.price.toFixed(2)}DH</div>
            </td>
            <td class="px-6 py-4">
                <span class="badge badge-success">In Stock</span>
            </td>
            <td class="px-6 py-4 text-right whitespace-nowrap">
                <button class="w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-all mr-1 inline-flex items-center justify-center">
                    <span class="material-symbols-outlined text-lg">edit</span>
                </button>
                <button class="w-8 h-8 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500 transition-all inline-flex items-center justify-center">
                    <span class="material-symbols-outlined text-lg">delete</span>
                </button>
            </td>
        </tr>
    `).join('');
}

window.filterMenuManager = (query) => {
    const q = query.toLowerCase();
    const filtered = menuItems.filter(item => 
        item.name.toLowerCase().includes(q) || 
        item.category.toLowerCase().includes(q)
    );
    renderMenuManagerList(filtered);
};

// --- RESERVATIONS TAB ---
function loadReservationsTab() {
    renderReservationList();
}

function renderReservationList() {
    const container = document.getElementById('reservations-list');
    if (!container) return;

    if (reservations.length === 0) {
        container.innerHTML = `
            <tr>
                <td colspan="6" class="px-6 py-12 text-center text-slate-400 font-bold italic">
                    No upcoming reservations.
                </td>
            </tr>
        `;
        return;
    }

    container.innerHTML = reservations.map((res, index) => `
        <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
            <td class="px-6 py-4">
                <div class="font-bold text-sm text-slate-900 dark:text-white">${res.clientName}</div>
                <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">${res.phone || '+212 ...'}</div>
            </td>
            <td class="px-6 py-4">
                <div class="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-black inline-block">${res.tableId}</div>
            </td>
            <td class="px-6 py-4">
                <div class="font-black text-xs text-primary">${res.date} • ${res.time}</div>
            </td>
            <td class="px-6 py-4">
                <span class="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold">${res.people || 2} Pers</span>
            </td>
            <td class="px-6 py-4">
                <span class="badge badge-success">Confirmed</span>
            </td>
            <td class="px-6 py-4 text-right">
                <button onclick="deleteReservation(${index})" class="w-8 h-8 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500 transition-all">
                    <span class="material-symbols-outlined text-lg">delete</span>
                </button>
            </td>
        </tr>
    `).join('');
}

function initSettingsTab() {
    // Synchronize settings with current state
    const themeToggle = document.getElementById('theme-toggle-settings');
    if (themeToggle) {
        themeToggle.checked = document.body.classList.contains('dark');
        themeToggle.onchange = () => {
            document.body.classList.toggle('dark');
            localStorage.setItem('stitch_dark_mode', document.body.classList.contains('dark'));
        };
    }
}

window.openReservationModal = () => {
    // Populate table select
    const select = document.getElementById('res-table-id');
    if (select) {
        const allTables = [];
        Object.keys(TABLE_DATA).forEach(floor => {
            TABLE_DATA[floor].forEach(t => allTables.push(t.id));
        });
        select.innerHTML = allTables.map(id => `<option value="${id}">${id}</option>`).join('');
    }

    // Set default date to today
    const dateInput = document.getElementById('res-date');
    if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];

    document.getElementById('reservation-modal').classList.remove('hidden');
};

window.closeReservationModal = () => {
    document.getElementById('reservation-modal').classList.add('hidden');
};

window.saveReservation = () => {
    const clientName = document.getElementById('res-client-name').value;
    const tableId = document.getElementById('res-table-id').value;
    const date = document.getElementById('res-date').value;
    const time = document.getElementById('res-time').value;

    if (!clientName || !tableId || !date || !time) {
        alert("Please fill all fields");
        return;
    }

    reservations.push({ clientName, tableId, date, time });
    localStorage.setItem('stitch_reservations', JSON.stringify(reservations));
    renderReservationList();
    closeReservationModal();

    // Update dashboard grid if we are in QR view
    if (!document.getElementById('qr-tab').classList.contains('hidden')) {
        renderTableGrid(currentQRFloor);
    }
};

window.deleteReservation = (index) => {
    reservations.splice(index, 1);
    localStorage.setItem('stitch_reservations', JSON.stringify(reservations));
    renderReservationList();
    if (!document.getElementById('qr-tab').classList.contains('hidden')) {
        renderTableGrid(currentQRFloor);
    }
};

// --- ORDER SYNC LISTENER ---
window.addEventListener('storage', (e) => {
    if (e.key === 'stitch_live_orders') {
        const newOrders = JSON.parse(e.newValue || '[]');
        if (newOrders.length > liveOrders.length) {
            // New order added!
            liveOrders = newOrders;
            renderLiveOrders(liveOrders);
            // Play a sound or notify?
            console.log("🔔 New order synced from menu!");
        }
    }
});

// --- DASHBOARD TAB ---
function renderDashboard() {
    renderLiveOrders(liveOrders); // In complete app: fetch from API, otherwise use local state
}

function getStatusStyle(status) {
    if (status === 'Received') return 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400';
    if (status === 'Preparing') return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
    if (status === 'Ready') return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
    return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
}

function timeAgo(ms) {
    const min = Math.floor((Date.now() - ms) / 60000);
    return min === 0 ? 'Just now' : `${min}m ago`;
}

function renderLiveOrders(orders) {
    const container = document.querySelector('#dashboard-tab .col-span-2 .grid');
    if (!container) return;

    if (!window.liveOrderInterval) {
        window.liveOrderInterval = setInterval(() => renderLiveOrders(liveOrders), 60000);
    }

    if (orders.length === 0) {
        container.innerHTML = '<div class="col-span-full py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">No active orders</div>';
        return;
    }

    // Hybrid Grouping: Group orders by table
    const groupedOrders = {};
    orders.forEach(order => {
        const table = order.table || 'Walk-in';
        if (!groupedOrders[table]) groupedOrders[table] = [];
        groupedOrders[table].push(order);
    });

    let html = '';

    // Sort tables so the one with the oldest active order is first
    const sortedTables = Object.keys(groupedOrders).sort((a, b) => {
        const oldestA = Math.min(...groupedOrders[a].map(o => o.time));
        const oldestB = Math.min(...groupedOrders[b].map(o => o.time));
        return oldestA - oldestB;
    });

    sortedTables.forEach(table => {
        const tableOrders = groupedOrders[table];

        // Table Header
        html += `
            <div class="bg-gray-50/50 dark:bg-black/10 rounded-[2.5rem] p-4 sm:p-6 border border-gray-200 dark:border-white/5 mb-6 col-span-full">
                <div class="flex items-center gap-4 mb-4 pb-4 border-b border-gray-200 dark:border-white/5">
                    <div class="w-12 h-12 bg-white dark:bg-[#2a1e19] rounded-2xl flex items-center justify-center border border-gray-100 dark:border-white/5 shadow-sm">
                        <span class="material-symbols-outlined text-primary">table_restaurant</span>
                    </div>
                    <div>
                        <h4 class="text-xl font-black">Table ${table}</h4>
                        <p class="text-[10px] text-gray-500 font-bold uppercase tracking-widest">${tableOrders.length} Active Tickets</p>
                    </div>
                </div>
                <div class="grid grid-cols-1 gap-4">
        `;

        // Individual Orders - Visual Cards
        tableOrders.forEach(o => {
            const displayName = o.guestName ? o.guestName : `Order ${o.id}`;
            const guestIcon = o.guestName ? o.guestName.charAt(0).toUpperCase() : '#';

            // Build visual item thumbnails
            const visualItemsHtml = o.items.map(i => `
                <div class="relative group/item shrink-0">
                    <div class="w-12 h-12 bg-gray-100 dark:bg-white/5 rounded-full border-2 border-white dark:border-[#2a1e19] shadow-sm overflow-hidden flex items-center justify-center">
                        ${i.image_url
                    ? `<img src="${i.image_url}" class="w-full h-full object-cover" onerror="this.parentElement.innerHTML='<span class=\\'material-symbols-outlined text-gray-400 text-[18px]\\'>coffee</span>'">`
                    : `<span class="material-symbols-outlined text-gray-400 text-[18px]">coffee</span>`}
                    </div>
                    <span class="absolute -top-1 -right-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-[#2a1e19] shadow-sm">${i.qty}x</span>
                    <!-- Hover Tooltip -->
                    <div class="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/item:opacity-100 transition-opacity bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap pointer-events-none z-10 w-max shadow-xl">
                        ${i.name}
                    </div>
                </div>
            `).join('');

            html += `
                <div class="bg-white dark:bg-[#2a1e19] rounded-[2.5rem] p-5 sm:p-6 border border-gray-100 dark:border-white/5 shadow-soft shadow-lg flex flex-col items-stretch transition-all gap-5 relative overflow-hidden group pos-card btn-white">
                    
                    ${o.status === 'Received' ? '<div class="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-[2.5rem] pointer-events-none"><div class="bg-orange-500 text-white text-[8px] font-bold uppercase tracking-widest text-center py-1 absolute w-24 top-4 -right-6 rotate-45 shadow-sm">NEW</div></div>' : ''}

                    <!-- Top Row: Meta -->
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 ${getStatusStyle(o.status)} rounded-2xl flex flex-col items-center justify-center shrink-0 transition-colors shadow-sm">
                                <span class="text-xl font-black font-serif italic opacity-90">${guestIcon}</span>
                            </div>
                            <div>
                                <div class="flex items-center gap-3 mb-0.5">
                                    <span class="text-lg font-bold">${displayName}</span>
                                    <span class="px-2 py-0.5 ${getStatusStyle(o.status)} text-[10px] font-bold rounded-full border border-current/20 shadow-sm">${o.status}</span>
                                </div>
                                <div class="flex items-center gap-3 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                    <span class="font-mono">#${o.id}</span>
                                    <span class="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                                    <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[12px]">schedule</span> ${timeAgo(o.time)}</span>
                                </div>
                            </div>
                        </div>
                        <div class="hidden sm:block">
                            <span class="font-black text-lg px-2 text-primary bg-orange-50 dark:bg-orange-900/10 py-1.5 rounded-xl border border-orange-100 dark:border-orange-900/30">${o.total.toFixed(2)}DH</span>
                        </div>
                    </div>

                    <!-- Middle Row: Visual Order Items -->
                    <div class="bg-gray-50 dark:bg-black/20 p-4 rounded-2xl border border-gray-100 dark:border-white/5 flex items-center gap-2 overflow-x-auto hide-scrollbar">
                        ${visualItemsHtml}
                        <div class="ml-2 text-xs font-bold text-gray-400 whitespace-nowrap hidden sm:block">
                            ${o.items.length} ${o.items.length === 1 ? 'Item' : 'Items'} Total
                        </div>
                    </div>

                    <!-- Bottom Row: Explicit Actions -->
                    <div class="flex items-center justify-between mt-1 sm:mt-0">
                        <div class="sm:hidden">
                            <span class="font-black text-lg text-primary">${o.total.toFixed(2)}DH</span>
                        </div>
                        <div class="flex items-center gap-3 ml-auto">
                            <button onclick="openReceiptModal('${o.id}')" class="px-4 py-2.5 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-white/10 transition-all flex items-center gap-2 pos-button" title="Print Receipt">
                                <span class="material-symbols-outlined text-[18px]">print</span>
                                <span class="hidden sm:inline text-xs">Print</span>
                            </button>
                            <button onclick="openOrderDetailsModal('${o.id}')" class="px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl shadow-lg hover:scale-105 transition-all flex items-center gap-2">
                                <span class="material-symbols-outlined text-[18px]">receipt_long</span>
                                <span class="text-sm border-l border-white/20 dark:border-gray-900/20 pl-2 ml-1">Full Details</span>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });

        html += `</div></div>`; // Close grid and table block
    });

    container.innerHTML = html;
}

// --- KDS: ORDER DETAILS MODAL ---
window.openOrderDetailsModal = (orderId) => {
    const order = liveOrders.find(o => o.id === orderId);
    if (!order) return;

    document.getElementById('order-details-id').textContent = order.guestName ? `${order.guestName}'s Order` : `ORD-${order.id}`;
    document.getElementById('order-details-table').textContent = order.table || '—';
    document.getElementById('order-details-time').textContent = timeAgo(order.time);
    document.getElementById('order-details-total').textContent = `${order.total.toFixed(2)}DH`;

    const badge = document.getElementById('order-details-status-badge');
    badge.textContent = order.status;
    badge.className = `px-2 py-0.5 ${getStatusStyle(order.status)} text-[10px] font-bold rounded-full uppercase tracking-widest border border-current/20`;

    // Items list
    document.getElementById('order-details-items').innerHTML = order.items.map(item => `
        <div class="bg-white dark:bg-[#2a1e19] p-4 rounded-2xl border border-gray-100 dark:border-white/5 flex items-start gap-4 pos-card btn-white shadow-soft">
            <div class="w-10 h-10 bg-gray-50 dark:bg-black/20 rounded-xl flex items-center justify-center font-black text-primary shrink-0">${item.qty}x</div>
            <div class="flex-1">
                <p class="font-bold text-sm text-gray-800 dark:text-white">${item.name}</p>
                ${item.mods && item.mods.length > 0 ? `<p class="text-xs text-gray-500 mt-1">${item.mods.join(', ')}</p>` : ''}
                ${item.notes ? `<p class="text-[10px] text-orange-500 font-medium mt-1 uppercase tracking-widest"><span class="material-symbols-outlined text-[10px] align-middle">warning</span> ${item.notes}</p>` : ''}
            </div>
            <div class="font-bold text-xs shrink-0">${(item.price * item.qty).toFixed(2)}DH</div>
        </div>
    `).join('');

    // Action buttons based on status
    const actions = document.getElementById('order-details-actions');
    if (order.status === 'Received') {
        actions.innerHTML = `<button onclick="updateOrderStatus('${order.id}', 'Preparing')" class="col-span-2 py-4 bg-blue-500 text-white font-bold rounded-2xl shadow-glow transition-transform hover:scale-105">Start Preparing</button>`;
    } else if (order.status === 'Preparing') {
        actions.innerHTML = `<button onclick="updateOrderStatus('${order.id}', 'Ready')" class="col-span-2 py-4 bg-green-500 text-white font-bold rounded-2xl shadow-glow transition-transform hover:scale-105">Mark as Ready</button>`;
    } else if (order.status === 'Ready') {
        actions.innerHTML = `
            <button onclick="updateOrderStatus('${order.id}', 'Completed')" class="py-4 bg-gray-800 text-white font-bold rounded-2xl transition-transform hover:scale-105">Complete & Archive</button>
            <button onclick="openReceiptModal('${order.id}'); closeOrderDetailsModal()" class="py-4 border border-gray-200 text-gray-800 font-bold rounded-2xl transition-transform hover:scale-105 flex items-center justify-center gap-2"><span class="material-symbols-outlined">print</span> Print</button>`;
    }

    document.getElementById('order-details-modal').classList.remove('hidden');
};

window.closeOrderDetailsModal = () => document.getElementById('order-details-modal').classList.add('hidden');

window.updateOrderStatus = (orderId, newStatus, event) => {
    const order = liveOrders.find(o => o.id === orderId);
    if (!order) return;
    
    // Animate button if event is passed (Kitchen View)
    if (event && event.currentTarget) {
        const btn = event.currentTarget;
        const originalHtml = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = `<span class="material-symbols-outlined animate-spin text-lg">loop</span> <span data-i18n="in_progress">${lang.in_progress || 'In Progress...'}</span>`;
        
        setTimeout(() => {
            executeOrderStatusUpdate(orderId, newStatus, order);
        }, 2000);
        return;
    }
    
    executeOrderStatusUpdate(orderId, newStatus, order);
};

function executeOrderStatusUpdate(orderId, newStatus, order) {
    order.status = newStatus;

    // Sync with CentralStore if available
    if (window.CentralStore) {
        window.CentralStore.updateOrderStatus(orderId, newStatus);
    }

    if (newStatus === 'Completed') {
        // Move from live display to completed history
        completedOrders.unshift({ ...order, completedAt: Date.now() });
        liveOrders = liveOrders.filter(o => o.id !== orderId);
        
        // Persist both lists
        localStorage.setItem('stitch_completed_orders', JSON.stringify(completedOrders));
        localStorage.setItem('stitch_live_orders', JSON.stringify(liveOrders));
        
        closeOrderDetailsModal();
    } else {
        // Persist live status change
        localStorage.setItem('stitch_live_orders', JSON.stringify(liveOrders));
        // Re-open details to show new state
        openOrderDetailsModal(orderId);
    }
    
    renderLiveOrders(liveOrders);
    renderKitchenDisplay(); // Ensure kitchen view updates too
    renderDashboard();
    renderOrders();
};

// --- KDS: RECEIPT PRINTING MODAL ---
window.openReceiptModal = (orderId) => {
    // If order was passed, use it. Otherwise find it.
    let order = liveOrders.find(o => o.id === orderId);
    if (!order) {
        // For completed demo orders not in live state anymore, or fallback
        order = DEMO_ORDERS.find(o => o.id === orderId) || DEMO_ORDERS[0];
    }

    document.getElementById('receipt-date').textContent = new Date(order.time).toLocaleString();
    document.getElementById('receipt-order-id').textContent = `Order: ${order.id}`;
    document.getElementById('receipt-table').textContent = `Table: ${order.table}`;

    // Items
    document.getElementById('receipt-items').innerHTML = order.items.map(i => `
        <div class="flex justify-between items-start mb-2">
            <div class="w-8 shrink-0">${i.qty}x</div>
            <div class="flex-1 px-2">
                <div>${i.name}</div>
                ${i.mods && i.mods.length > 0 ? `<div class="text-[10px] text-gray-500 italic mt-0.5">• ${i.mods.join(', ')}</div>` : ''}
            </div>
            <div class="w-16 text-right">${(i.price * i.qty).toFixed(2)}</div>
        </div>
    `).join('');

    const sub = order.total / 1.1; // Simple reverse tax calculation for demo
    document.getElementById('receipt-subtotal').textContent = sub.toFixed(2);
    document.getElementById('receipt-tax').textContent = (order.total - sub).toFixed(2);
    document.getElementById('receipt-total').textContent = order.total.toFixed(2);

    document.getElementById('receipt-modal').classList.remove('hidden');
};

window.closeReceiptModal = () => document.getElementById('receipt-modal').classList.add('hidden');

window.printReceipt = () => {
    // In a real app, this would trigger a thermal printer API like StarPRNT or Epson ePOS.
    // Here we just trigger the browser print dialog and use CSS to format it.
    const originalTitle = document.title;
    document.title = "Receipt";

    // Quick hack for demo to only print the paper
    const printContent = document.getElementById('receipt-paper').innerHTML;
    const originalBody = document.body.innerHTML;

    document.body.innerHTML = `<div style="padding:20px; font-family:monospace; max-width:300px; margin:auto;">${printContent}</div>`;
    window.print();

    // Restore
    document.body.innerHTML = originalBody;
    document.title = originalTitle;
    location.reload(); // Reload to re-bind event listeners after destructive body text replace
};

// --- Z-REPORT / END OF SHIFT ---
window.openEndOfShiftModal = () => {
    // For demo, we'll calculate totals from both Completed and any remaining Live Orders just to show data
    const allToday = [...completedOrders, ...liveOrders];

    document.getElementById('end-shift-time').textContent = new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    document.getElementById('z-total-qty').textContent = allToday.length;

    const grossTotal = allToday.reduce((sum, o) => sum + o.total, 0);
    document.getElementById('z-total-amount').textContent = `${grossTotal.toFixed(2)}DH`;

    document.getElementById('end-shift-modal').classList.remove('hidden');
};

window.closeEndOfShiftModal = () => document.getElementById('end-shift-modal').classList.add('hidden');

window.printZReport = () => {
    const allToday = [...completedOrders, ...liveOrders];
    const grossTotal = allToday.reduce((sum, o) => sum + o.total, 0);

    const originalTitle = document.title;
    document.title = "Z-Report";

    const printContent = `
        <div style="padding:20px; font-family:monospace; max-width:300px; margin:auto; text-align:center;">
            <h2 style="font-size:24px; font-weight:bold; margin-bottom: 5px;">STITCH Z-REPORT</h2>
            <p style="font-size:12px; border-bottom:1px dashed #000; padding-bottom:10px; margin-bottom:10px;">End of Shift: ${new Date().toLocaleString()}</p>
            
            <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                <span>Total Transactions:</span>
                <strong>${allToday.length}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:15px; font-size:18px; font-weight:bold; border-bottom:1px dashed #000; padding-bottom:10px;">
                <span>Gross Sales:</span>
                <span>${grossTotal.toFixed(2)}DH</span>
            </div>
            
            <p style="font-size:10px; margin-top:20px;">Register Closed</p>
        </div>
    `;

    const originalBody = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();

    document.body.innerHTML = originalBody;
    document.title = originalTitle;
    location.reload();
};

window.closeShift = () => {
    if (!confirm("Are you sure you want to close the register and reset today's data?")) return;

    // Reset Data
    completedOrders = [];
    liveOrders = [];

    closeEndOfShiftModal();
    renderDashboard();
    renderOrders();
    alert('Shift Closed. Register has been reset.');
};

// --- ORDERS TAB (HISTORY) ---
function renderOrders() {
    const ordersTab = document.getElementById('orders-tab');
    if (!ordersTab) return;

    // Combine all orders for history view, sort newest first
    const historyOrders = [...liveOrders, ...completedOrders].sort((a, b) => b.time - a.time);
    const renderKey = historyOrders.map(o => `${o.id}|${o.status}|${o.time}|${o.total}`).join('||');
    if (ordersTab.dataset.renderKey === renderKey) return;
    ordersTab.dataset.renderKey = renderKey;

    if (historyOrders.length === 0) {
        ordersTab.innerHTML = `
            <div class="flex items-center justify-between mb-6">
                <h4 class="text-xl font-bold">All Orders</h4>
            </div>
            <div class="text-center py-20 bg-white dark:bg-[#2a1e19] rounded-[2.5rem] border border-gray-200 dark:border-white/5 shadow-sm text-gray-400">
                <span class="material-symbols-outlined text-[48px] mb-2 opacity-20">receipt_long</span>
                <p class="text-xs font-bold uppercase tracking-widest">No order history available</p>
            </div>`;
        return;
    }

    ordersTab.innerHTML = `
        <div class="space-y-4">
            <div class="flex items-center justify-between mb-6">
                <h4 class="text-xl font-bold">All Orders</h4>
                <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">${historyOrders.length} Today</span>
            </div>
            <div class="bg-white dark:bg-[#2a1e19] rounded-[2.5rem] border border-gray-200 dark:border-white/5 shadow-sm overflow-hidden overflow-x-auto">
                <table class="w-full text-left min-w-[600px]">
                    <thead>
                        <tr class="text-[10px] font-bold uppercase tracking-widest text-gray-400 bg-gray-50/50 dark:bg-black/10">
                            <th class="px-6 py-4">Time</th>
                            <th class="px-6 py-4">Order</th>
                            <th class="px-6 py-4">Guest/Table</th>
                            <th class="px-6 py-4">Items</th>
                            <th class="px-6 py-4">Total</th>
                            <th class="px-6 py-4">Status</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100 dark:divide-white/5">
                        ${historyOrders.map(o => `
                        <tr class="hover:bg-gray-50/50 dark:hover:bg-black/5 transition-colors cursor-pointer" onclick="openOrderDetailsModal('${o.id}')">
                            <td class="px-6 py-4 text-xs font-bold text-gray-500 whitespace-nowrap">${new Date(o.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                            <td class="px-6 py-4 font-mono text-xs text-gray-500 font-bold">${o.id}</td>
                            <td class="px-6 py-4">
                                <div class="font-bold text-primary truncate max-w-[120px]">${o.guestName || 'Table ' + o.table}</div>
                                ${o.guestName ? `<div class="text-[10px] text-gray-400">Tb: ${o.table}</div>` : ''}
                            </td>
                            <td class="px-6 py-4 text-xs text-gray-600 dark:text-gray-400 truncate max-w-[200px]">${o.items.map(i => `${i.qty}x ${i.name}`).join(', ')}</td>
                            <td class="px-6 py-4 font-bold text-sm">${o.total.toFixed(2)}DH</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-3 py-1 ${o.status === 'Completed' ? 'bg-gray-800 text-white dark:bg-white dark:text-black' : getStatusStyle(o.status)} text-[10px] font-bold rounded-full border border-current/20 shadow-sm">${o.status}</span>
                            </td>
                        </tr>`).join('')}
                    </tbody>
                </table>
            </div>
        </div>`;
}

// --- KITCHEN FILTER ---
window.filterKitchenOrders = (filter) => {
    kitchenFilter = filter;
    
    // Update active button state
    document.querySelectorAll('.kitchen-filter-btn').forEach(btn => {
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    renderKitchenDisplay();
};

// --- KITCHEN ITEM DETAIL MODAL ---
window.openKitchenItemModal = (item) => {
    const modal = document.getElementById('kitchen-item-modal');
    const img = document.getElementById('kitchen-modal-img');
    const imgPlaceholder = document.getElementById('kitchen-modal-img-placeholder');
    const name = document.getElementById('kitchen-modal-name');
    const price = document.getElementById('kitchen-modal-price');
    const qty = document.getElementById('kitchen-modal-qty');
    const descWrap = document.getElementById('kitchen-modal-desc-wrap');
    const desc = document.getElementById('kitchen-modal-desc');
    const modsWrap = document.getElementById('kitchen-modal-mods-wrap');
    const mods = document.getElementById('kitchen-modal-mods');
    const catWrap = document.getElementById('kitchen-modal-cat-wrap');
    const cat = document.getElementById('kitchen-modal-cat');

    if (!modal) return;

    name.textContent = item.name || 'Item';
    price.textContent = `${(item.price || 0).toFixed(2)}DH`;
    qty.innerHTML = `<span class="text-lg font-black text-primary">${item.qty || 1}x</span>`;

    if (item.image_url) {
        img.src = item.image_url;
        img.alt = item.name;
        img.classList.remove('hidden');
        imgPlaceholder.classList.add('hidden');
        imgPlaceholder.classList.remove('flex');
    } else {
        img.classList.add('hidden');
        imgPlaceholder.classList.remove('hidden');
        imgPlaceholder.classList.add('flex');
    }

    if (item.description) {
        descWrap.classList.remove('hidden');
        desc.textContent = item.description;
    } else {
        descWrap.classList.add('hidden');
    }

    if (item.mods && item.mods.length > 0) {
        modsWrap.classList.remove('hidden');
        mods.innerHTML = item.mods.map(m => `<span class="px-2.5 py-1 bg-primary/10 text-primary text-xs font-bold rounded-lg">${m}</span>`).join('');
    } else {
        modsWrap.classList.add('hidden');
    }

    if (item.category) {
        catWrap.classList.remove('hidden');
        cat.textContent = item.category;
    } else {
        catWrap.classList.add('hidden');
    }

    modal.classList.remove('hidden');
};

window.closeKitchenItemModal = () => {
    const modal = document.getElementById('kitchen-item-modal');
    if (modal) modal.classList.add('hidden');
};

// --- KITCHEN DISPLAY TAB ---
function renderKitchenDisplay() {
    const kitchenTab = document.getElementById('kitchen-tab');
    if (!kitchenTab) return;
    
    const container = document.getElementById('kitchen-orders-container');
    const emptyState = document.getElementById('kitchen-empty-state');
    
    // Filter orders that need kitchen attention (not completed)
    const kitchenOrders = liveOrders.filter(order => order.status !== 'Completed');
    
    // Update status counts
    const countAll = document.getElementById('kitchen-count-all');
    const countReceived = document.getElementById('kitchen-count-received');
    const countPreparing = document.getElementById('kitchen-count-preparing');
    const countReady = document.getElementById('kitchen-count-ready');
    if (countAll) countAll.textContent = kitchenOrders.length;
    if (countReceived) countReceived.textContent = kitchenOrders.filter(o => o.status === 'Received').length;
    if (countPreparing) countPreparing.textContent = kitchenOrders.filter(o => o.status === 'Preparing').length;
    if (countReady) countReady.textContent = kitchenOrders.filter(o => o.status === 'Ready').length;
    
    // Apply active filter
    const filteredOrders = kitchenFilter === 'all' 
        ? kitchenOrders 
        : kitchenOrders.filter(o => o.status === kitchenFilter);
    
    if (filteredOrders.length === 0) {
        container.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }
    
    emptyState.classList.add('hidden');
    
    // Sort by time (oldest first for kitchen priority)
    const sortedOrders = filteredOrders.sort((a, b) => a.time - b.time);
    
    const getStatusBorderColor = (status) => {
        if (status === 'Received') return 'border-orange-400 dark:border-orange-600';
        if (status === 'Preparing') return 'border-blue-400 dark:border-blue-600';
        if (status === 'Ready') return 'border-green-400 dark:border-green-600';
        return 'border-gray-300 dark:border-gray-600';
    };

    const getStatusBg = (status) => {
        if (status === 'Received') return 'bg-orange-50 dark:bg-orange-950/30';
        if (status === 'Preparing') return 'bg-blue-50 dark:bg-blue-950/30';
        if (status === 'Ready') return 'bg-green-50 dark:bg-green-950/30';
        return 'bg-gray-50 dark:bg-gray-800/30';
    };

    const getStatusAccent = (status) => {
        if (status === 'Received') return 'bg-orange-500';
        if (status === 'Preparing') return 'bg-blue-500';
        if (status === 'Ready') return 'bg-green-500';
        return 'bg-gray-400';
    };

    const getStatusBtn = (status) => {
        if (status === 'Received') return 'bg-blue-500 hover:bg-blue-600';
        if (status === 'Preparing') return 'bg-green-500 hover:bg-green-600';
        if (status === 'Ready') return 'bg-orange-500 hover:bg-orange-600';
        return 'bg-gray-500 hover:bg-gray-600';
    };

    const getStatusBtnLabel = (status) => {
        if (status === 'Received') return `<span data-i18n="start_preparing">${lang.start_preparing || 'Start Preparing'}</span>`;
        if (status === 'Preparing') return `<span data-i18n="mark_ready">${lang.mark_ready || 'Mark Ready'}</span>`;
        if (status === 'Ready') return `<span data-i18n="complete_order">${lang.complete_order || 'Complete Order'}</span>`;
        return `<span data-i18n="update_btn">${lang.update_btn || 'Update'}</span>`;
    };

    const getNextStatus = (status) => {
        if (status === 'Received') return 'Preparing';
        if (status === 'Preparing') return 'Ready';
        if (status === 'Ready') return 'Completed';
        return status;
    };

    const getTimerColor = (minutes) => {
        if (minutes >= 15) return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
        if (minutes >= 10) return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400';
        return 'text-gray-500 bg-gray-100 dark:bg-gray-800/30 dark:text-gray-400';
    };

    container.innerHTML = sortedOrders.map(order => {
        const elapsed = Math.floor((Date.now() - order.time) / 60000);
        const totalItems = order.items.reduce((sum, i) => sum + i.qty, 0);
        
        const getStatusColor = (status) => {
            if (status === 'Received') return 'text-orange-500 bg-orange-50';
            if (status === 'Preparing') return 'text-blue-500 bg-blue-50';
            if (status === 'Ready') return 'text-green-500 bg-green-50';
            return 'text-slate-400 bg-slate-50';
        };

        return `
        <div class="premium-card overflow-hidden flex flex-col group">
            <div class="p-6">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-4">
                        <div class="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center shrink-0">
                            <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Table</span>
                            <span class="text-xl font-black text-primary leading-none">${(order.table === 'Walk-in' || !order.table) ? '0' : order.table}</span>
                        </div>
                        <div>
                            <h4 class="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">${order.id}</h4>
                            <div class="flex items-center gap-2 mt-1">
                                <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold ${getStatusColor(order.status)}">${order.status}</span>
                                <span class="text-[10px] font-bold text-slate-400">${totalItems} items</span>
                            </div>
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="flex items-center gap-1 text-slate-400">
                            <span class="material-symbols-outlined text-sm">schedule</span>
                            <span class="text-xs font-bold">${elapsed}m</span>
                        </div>
                    </div>
                </div>

                <div class="space-y-2">
                    ${order.items.map(item => `
                        <div class="flex flex-col gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-transparent hover:border-primary/20 transition-all cursor-pointer">
                            <div class="flex items-center gap-3">
                                <div class="w-8 h-8 rounded-lg bg-white overflow-hidden shrink-0 border border-slate-100">
                                    ${item.image_url ? `<img src="${item.image_url}" class="w-full h-full object-cover">` : `<span class="material-symbols-outlined text-slate-300 text-sm flex items-center justify-center h-full">restaurant</span>`}
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="text-xs font-bold truncate">${item.name}</p>
                                    ${item.mods && item.mods.length > 0 ? `<p class="text-[9px] text-slate-400 truncate">${item.mods.join(', ')}</p>` : ''}
                                </div>
                                <span class="text-xs font-black text-primary bg-primary/10 px-1.5 py-0.5 rounded-lg">${item.qty}x</span>
                            </div>
                            ${item.notes ? `
                            <div class="p-2 bg-amber-50 rounded-lg border border-amber-100 flex gap-2 ml-11">
                                <span class="material-symbols-outlined text-amber-500 text-[14px]">chat_bubble</span>
                                <p class="text-[10px] font-bold text-amber-700 leading-tight">${item.notes}</p>
                            </div>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="mt-auto p-6 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800/50">
                <button onclick="updateOrderStatus('${order.id}', '${getNextStatus(order.status)}', event)" 
                    class="w-full py-4 ${getStatusBtn(order.status)} text-white rounded-2xl font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2">
                    <span class="material-symbols-outlined text-lg">${order.status === 'Received' ? 'fire_truck' : order.status === 'Preparing' ? 'check_circle' : 'done_all'}</span>
                    ${getStatusBtnLabel(order.status)}
                </button>
            </div>
        </div>
    `}).join('');
}

// --- POS TAB ---
async function loadPOSMenu() {
    const grid = document.getElementById('pos-menu-grid');
    if (!grid) return;

    renderPOSCategories();
    renderPOSMenu(menuItems);

    await ensureMenuData();

    const searchValue = document.getElementById('pos-search')?.value?.toLowerCase().trim() || '';
    const filtered = searchValue
        ? menuItems.filter(i => i.name.toLowerCase().includes(searchValue) || i.category.toLowerCase().includes(searchValue))
        : menuItems;
    renderPOSMenu(filtered);
}

function renderPOSCategories() {
    const container = document.getElementById('pos-category-rail');
    if (!container) return;

    const categoriesToRender = [{ name: 'All', image_url: null }, ...globalSubcategories];

    container.innerHTML = categoriesToRender.map(cat => {
        const isActive = cat.name === 'All';
        const img = cat.image_url;
        
        return `
        <div onclick="filterPOSByCategory('${cat.name}')" data-category="${cat.name}" class="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group category-bubble">
            <div class="p-[3px] rounded-full transition-all duration-300 bubble-ring ${cat.name === 'All' ? 'mt-4' : ''} ${isActive ? 'bg-primary shadow-glow ring-2 ring-primary ring-offset-2 dark:ring-offset-[#1a100c]' : 'bg-gray-200 dark:bg-gray-700 group-hover:bg-primary'}">
                <div class="bg-white dark:bg-[#1a100c] p-1 rounded-full">
                    <div class="${cat.name === 'All' ? 'w-8 h-8' : 'w-12 h-12'} rounded-full overflow-hidden relative flex items-center justify-center bg-gray-100 dark:bg-white/5">
                        ${img 
                            ? `<img src="${img}" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" onerror="this.onerror=null;this.src='../assets/waiter.jpg'">`
                            : `<span class="material-symbols-outlined ${isActive ? 'text-primary' : 'text-gray-400'} group-hover:scale-110 transition-transform">restaurant_menu</span>`
                        }
                    </div>
                </div>
            </div>
            <p class="bubble-text text-[9px] font-bold text-center leading-tight max-w-[4rem] transition-colors ${isActive ? 'text-primary' : 'text-gray-500 dark:text-gray-400 group-hover:text-primary'}">${cat.name}</p>
        </div>
    `}).join('');
}

window.filterPOSByCategory = (category) => {
    // 1. Update Category Bubbles
    document.querySelectorAll('.category-bubble').forEach(bubble => {
        const isActive = bubble.dataset.category === category;
        const ring = bubble.querySelector('.bubble-ring');
        const text = bubble.querySelector('.bubble-text');
        
        if (ring) {
            if (isActive) {
                ring.className = "p-[3px] rounded-full transition-all duration-300 bubble-ring bg-primary shadow-glow ring-2 ring-primary ring-offset-2 dark:ring-offset-[#1a100c]";
                if (text) text.className = "bubble-text text-[9px] font-bold text-center leading-tight max-w-[4rem] text-primary";
            } else {
                ring.className = "p-[3px] rounded-full transition-all duration-300 bubble-ring bg-gray-200 dark:bg-gray-700 group-hover:bg-primary";
                if (text) text.className = "bubble-text text-[9px] font-bold text-center leading-tight max-w-[4rem] text-gray-500 dark:text-gray-400 group-hover:text-primary";
            }
        }
    });

    // 2. Hide old subcategory rail as requested by user
    const subContainer = document.getElementById('pos-subcategory-rail');
    if (subContainer) {
        subContainer.classList.add('hidden');
    }
    
    // 3. Filter items directly by subcategory
    const searchValue = document.getElementById('pos-search')?.value.toLowerCase().trim() || '';
    
    let filtered = menuItems;
    if (category !== 'All') {
        // Here 'category' variable actually holds the name of the subcategory clicked (e.g. 'Coffee')
        filtered = filtered.filter(i => i.subcategory === category);
    }
    
    if (searchValue) {
        filtered = filtered.filter(i => i.name.toLowerCase().includes(searchValue) || (i.subcategory && i.subcategory.toLowerCase().includes(searchValue)));
    }
    
    renderPOSMenu(filtered);
};

// We can keep this empty or remove it as it's no longer used
window.filterPOSBySubcategory = (category, subcategory) => {};

function renderPOSMenu(items) {
    const grid = document.getElementById('pos-menu-grid');
    if (!grid) return;
    if (items.length === 0) {
        grid.innerHTML = '<div class="col-span-full flex flex-col items-center justify-center py-20 opacity-30"><span class="material-symbols-outlined text-6xl">search_off</span><p class="font-bold text-xs uppercase tracking-widest mt-4">No items found</p></div>';
        return;
    }
    grid.innerHTML = items.map(item => {
        const outOfStock = item.stock !== null && item.stock <= 0;
        const curr = window.posCurrency || 'DH';
        
        return `
        <div onclick="${!outOfStock ? `addToCart('${item.id}')` : ''}" 
             class="bg-white dark:bg-[#2a1e19] p-2.5 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-md transition-all group relative overflow-hidden pos-card hover:border-primary/50 cursor-pointer ${outOfStock ? 'opacity-50 grayscale' : ''}">
            
            <div class="w-full aspect-square bg-gray-50 dark:bg-black/20 rounded-lg mb-2 overflow-hidden relative flex items-center justify-center">
                ${item.image_url
                ? `<img src="${item.image_url}" loading="lazy" decoding="async" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onerror="this.parentElement.innerHTML='<span class=\'material-symbols-outlined text-gray-400 text-3xl\'>restaurant</span>'">`
                : `<span class="material-symbols-outlined text-gray-400 text-3xl">restaurant</span>`}
                
                ${outOfStock ? `
                <div class="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span class="bg-red-500 text-white text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-widest">Sold Out</span>
                </div>` : `
                <div class="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all flex items-center justify-center">
                    <span class="material-symbols-outlined text-primary opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all bg-white rounded-full p-1.5 shadow-lg text-[18px]">add</span>
                </div>`}
            </div>

            <h5 class="font-bold text-xs mb-0.5 truncate pr-1 leading-tight text-slate-800 dark:text-slate-100">${item.name}</h5>
            
            <div class="flex items-center justify-between mt-1">
                <span class="text-primary font-black text-sm leading-none">${Number(item.price).toFixed(2)}${curr}</span>
                ${item.stock !== null && item.stock > 0 ? `
                <span class="text-[9px] font-bold text-orange-500 px-1 py-0.5 bg-orange-50 dark:bg-orange-900/20 rounded-md shadow-sm border border-orange-100 dark:border-orange-800/30 leading-none">${item.stock} left</span>
                ` : `
                <span class="text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-none">${item.category}</span>
                `}
            </div>
        </div>
    `}).join('');
}

window.filterPOSBySearch = (query) => {
    const q = query.toLowerCase().trim();
    
    // Switch to POS tab if searching from elsewhere
    const posTab = document.getElementById('pos-tab');
    if (posTab && posTab.classList.contains('hidden') && q.length > 0) {
        switchTab('pos');
    }

    const filtered = menuItems.filter(i => 
        i.name.toLowerCase().includes(q) || 
        i.category.toLowerCase().includes(q)
    );
    renderPOSMenu(filtered);
};

window.addToCart = (itemId) => {
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;

    // Reject if out of stock
    if (item.stock !== null && item.stock <= 0) {
        alert('This item is currently out of stock.');
        return;
    }

    // Check if adding exceeds current stock
    const cartCount = posCart.filter(c => c.id === itemId).reduce((sum, current) => sum + current.quantity, 0);
    if (item.stock !== null && cartCount >= item.stock) {
        alert(`Cannot add more. Only ${item.stock} left in stock.`);
        return;
    }

    // Always open customization modal for every item so staff can add notes/toppings
    openModifierModal(item);
};

// --- MODIFIER MODAL LOGIC ---
const modifiersConfig = {
    Coffee: [
        {
            name: "Milk Options", type: "radio", options: [
                { label: "Whole Milk", price: 0 },
                { label: "Oat Milk", price: 5 },
                { label: "Almond Milk", price: 4 }
            ]
        },
        {
            name: "Extras", type: "checkbox", options: [
                { label: "Extra Shot", price: 5 },
                { label: "Vanilla Syrup", price: 3 },
                { label: "Caramel Syrup", price: 3 }
            ]
        }
    ],
    Brunch: [
        {
            name: "Sides", type: "checkbox", options: [
                { label: "Extra Egg", price: 5 },
                { label: "Side Avocado", price: 8 },
                { label: "Crispy Bacon", price: 10 }
            ]
        }
    ],
    Tea: [
        {
            name: "Sweetener", type: "radio", options: [
                { label: "No Sugar", price: 0 },
                { label: "Honey", price: 2 },
                { label: "Brown Sugar", price: 0 }
            ]
        }
    ],
    Juices: [
        {
            name: "Extras", type: "checkbox", options: [
                { label: "Fresh Mint", price: 2 },
                { label: "Ginger Shot", price: 5 },
                { label: "Extra Ice", price: 0 }
            ]
        }
    ]
};

function openModifierModal(item) {
    currentModItem = { ...item, basePrice: item.price };
    const modal = document.getElementById('pos-modifier-modal');
    if (!modal) return;

    document.getElementById('mod-item-name').textContent = item.name;
    document.getElementById('mod-item-price').textContent = `${item.price.toFixed(2)}DH`;
    document.getElementById('mod-item-notes').value = '';
    
    const imgEl = document.getElementById('mod-item-img');
    const placeholderEl = document.getElementById('mod-item-img-placeholder');
    if (imgEl && placeholderEl) {
        if (item.image_url) {
            imgEl.src = item.image_url;
            imgEl.classList.remove('hidden');
            placeholderEl.classList.add('hidden');
        } else {
            imgEl.classList.add('hidden');
            placeholderEl.classList.remove('hidden');
        }
    }

    const container = document.getElementById('mod-options-container');
    const mods = modifiersConfig[item.category] || [];

    container.innerHTML = mods.map((mod, gIdx) => `
        <div>
            <h4 class="text-sm font-bold mb-3">${mod.name}</h4>
            <div class="space-y-2">
                ${mod.options.map((opt, oIdx) => `
                    <label class="flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-white/5 bg-white dark:bg-[#2a1e19] cursor-pointer hover:border-primary/50 transition-all pos-button btn-white shadow-soft">
                        <div class="flex items-center gap-3">
                            <input type="${mod.type}" name="mod-${gIdx}" value="${opt.price}" data-label="${opt.label}" class="text-primary focus:ring-primary ${mod.type === 'radio' ? 'rounded-full' : 'rounded'} border-gray-300" ${mod.type === 'radio' && oIdx === 0 ? 'checked' : ''} onchange="calculateModPrice()">
                            <span class="text-sm font-medium">${opt.label}</span>
                        </div>
                        <span class="text-xs font-bold text-gray-400">${opt.price > 0 ? '+' + opt.price + 'DH' : 'Free'}</span>
                    </label>
                `).join('')}
            </div>
        </div>
    `).join('');

    calculateModPrice();
    modal.classList.remove('hidden');
}

window.closeModifierModal = () => {
    document.getElementById('pos-modifier-modal')?.classList.add('hidden');
    currentModItem = null;
};

window.calculateModPrice = () => {
    if (!currentModItem) return;
    let total = currentModItem.basePrice;

    document.querySelectorAll('#mod-options-container input:checked').forEach(input => {
        total += parseFloat(input.value);
    });

    const curr = window.posCurrency || 'DH';
    document.getElementById('mod-final-price').textContent = `${total.toFixed(2)}${curr}`;
};

document.getElementById('mod-add-btn')?.addEventListener('click', () => {
    if (!currentModItem) return;

    let addedPrice = 0;
    let selectedMods = [];

    document.querySelectorAll('#mod-options-container input:checked').forEach(input => {
        const val = parseFloat(input.value);
        if (val > 0 || input.type !== 'radio') { // Dont list "Whole Milk (Free)" as a mod to keep it clean, unless you want to
            selectedMods.push(input.dataset.label);
        }
        addedPrice += val;
    });

    const notes = document.getElementById('mod-item-notes').value.trim();
    const tableNo = document.getElementById('mod-item-table').value.trim() || '0';
    const finalPrice = currentModItem.basePrice + addedPrice;

    // Create a unique cart ID based on options so identical customizations stack
    const modString = selectedMods.sort().join('|') + '|' + notes + '|' + tableNo;
    const cartId = `${currentModItem.id}-${btoa(modString).substring(0, 10)}`;

    const existing = posCart.find(c => c.cartId === cartId);
    if (existing) {
        existing.quantity++;
        activePosCartItemId = cartId;
    } else {
        posCart.push({
            ...currentModItem,
            cartId,
            quantity: 1,
            price: finalPrice,
            mods: selectedMods,
            notes: notes,
            table: tableNo
        });
        activePosCartItemId = cartId;
    }

    renderCart();
    closeModifierModal();
});

window.focusPosCartItem = (cartId) => {
    activePosCartItemId = cartId;
    renderCart();
};

function renderCart() {
    const cartList = document.getElementById('pos-cart-list');
    const checkoutBtn = document.getElementById('pos-checkout-btn');
    const cartCount = document.getElementById('pos-cart-count');
    if (!cartList) return;

    const totalItems = posCart.reduce((sum, i) => sum + i.quantity, 0);
    if (cartCount) cartCount.textContent = totalItems;

    const emptyState = `
            <div class="flex-1 flex flex-col items-center justify-center py-20 text-center opacity-40 h-full">
                <div class="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6 shadow-inner border border-slate-200 dark:border-slate-700">
                    <span class="material-symbols-outlined text-5xl text-slate-400">shopping_basket</span>
                </div>
                <p class="text-sm font-black uppercase tracking-widest text-slate-500">Cart is empty</p>
                <p class="text-[10px] font-bold mt-2 text-slate-400">Tap products to start building an order</p>
            </div>`;

    if (posCart.length === 0) {
        cartList.innerHTML = emptyState;
        cartList.classList.add('flex', 'flex-col'); // Ensure flex for centering
        if (checkoutBtn) checkoutBtn.disabled = true;
    } else {
        cartList.classList.remove('flex', 'flex-col'); // Remove centering flex for items list
        cartList.innerHTML = posCart.map(item => `
            <div onclick="focusPosCartItem('${item.cartId}')" 
                 class="group relative flex items-center gap-4 p-4 bg-white dark:bg-slate-800/80 rounded-[1.5rem] border border-slate-100 dark:border-slate-700 transition-all hover:border-primary/50 shadow-sm ${activePosCartItemId === item.cartId ? 'ring-2 ring-primary/30 border-primary shadow-primary/10' : ''}">
                
                <div class="w-14 h-14 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-900 shrink-0 border border-slate-100 dark:border-slate-700 shadow-inner">
                    ${item.image_url 
                        ? `<img src="${item.image_url}" class="w-full h-full object-cover">`
                        : `<div class="w-full h-full flex items-center justify-center"><span class="material-symbols-outlined text-slate-300 text-2xl">restaurant</span></div>`}
                </div>

                <div class="flex-1 min-w-0 flex flex-col justify-between h-14">
                    <div class="flex items-center justify-between">
                        <h5 class="text-xs font-black truncate pr-2">${item.name}</h5>
                        <span class="text-sm font-black text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <div class="flex items-center justify-between mt-auto">
                        <div class="flex flex-col">
                            ${item.mods && item.mods.length > 0 ? `<p class="text-[9px] text-slate-400 font-bold truncate">${item.mods.join(', ')}</p>` : ''}
                            ${item.table && item.table !== '0' ? `<p class="text-[9px] font-black text-orange-500 uppercase tracking-widest bg-orange-50 dark:bg-orange-500/10 px-1.5 py-0.5 rounded-md inline-block w-max">Table ${item.table}</p>` : ''}
                        </div>
                        
                        <div class="flex items-center gap-1 bg-slate-50 dark:bg-slate-900 rounded-xl p-1 border border-slate-100 dark:border-slate-700">
                            <button onclick="event.stopPropagation(); updateQty('${item.cartId}', -1)" class="w-7 h-7 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-500 shadow-sm transition-all"><span class="material-symbols-outlined text-sm">remove</span></button>
                            <span class="text-xs font-black w-6 text-center">${item.quantity}</span>
                            <button onclick="event.stopPropagation(); updateQty('${item.cartId}', 1)" class="w-7 h-7 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary shadow-sm transition-all"><span class="material-symbols-outlined text-sm">add</span></button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
        if (checkoutBtn) checkoutBtn.disabled = false;
    }
    updateTotals();
}

window.updateQty = (cartId, delta) => {
    const item = posCart.find(c => c.cartId === cartId);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) posCart = posCart.filter(c => c.cartId !== cartId);
    if (delta > 0) activePosCartItemId = cartId;
    if (!posCart.some(c => c.cartId === activePosCartItemId)) activePosCartItemId = posCart[0]?.cartId || null;
    renderCart();
};

function updateTotals() {
    const subtotal = posCart.reduce((sum, i) => sum + i.price * i.quantity, 0);

    // Read discount from the new UI elements
    const discountVal = parseFloat(document.getElementById('discount-value')?.value) || 0;
    const discountType = document.getElementById('discount-type')?.value || '%';

    let discountAmount = 0;
    if (discountVal > 0) {
        discountAmount = discountType === '%' ? subtotal * (discountVal / 100) : discountVal;
    }

    const total = Math.max(0, subtotal - discountAmount);
    const subtotalEl = document.getElementById('pos-cart-subtotal');
    const totalEl = document.getElementById('pos-cart-total');
    const mobileTotalEl = document.getElementById('mobile-cart-total');
    const mobileModalTotalEl = document.getElementById('mobile-modal-total');
    
    const curr = window.posCurrency || 'DH';
    
    if (subtotalEl) subtotalEl.textContent = `${subtotal.toFixed(2)}${curr}`;
    if (totalEl) totalEl.textContent = `${total.toFixed(2)}${curr}`;
    if (mobileTotalEl) mobileTotalEl.textContent = `${total.toFixed(2)}${curr}`;
    if (mobileModalTotalEl) mobileModalTotalEl.textContent = `${total.toFixed(2)}${curr}`;

    // Reset cash calculator when totals change
    calculateChange();
}

window.calculateChange = () => {
    const curr = window.posCurrency || 'DH';
    const totalText = document.getElementById('pos-cart-total')?.textContent || '0';
    const total = parseFloat(totalText.replace(curr, '').replace('DH', '')) || 0;
    const received = parseFloat(document.getElementById('cash-received')?.value) || 0;
    
    // Target both legacy change-amount and new change-to-return
    const changeAmount = document.getElementById('change-amount');
    const changeToReturn = document.getElementById('change-to-return');

    if (received > 0 && total > 0) {
        const change = received - total;
        
        if (changeAmount) {
            changeAmount.textContent = `${change.toFixed(2)}${curr}`;
            changeAmount.className = change >= 0 ? 'text-lg font-black text-green-500' : 'text-lg font-black text-red-500';
        }
        if (changeToReturn) {
            changeToReturn.textContent = `${change.toFixed(2)}${curr}`;
            changeToReturn.className = change >= 0 ? 'text-sm font-extrabold text-emerald-600 dark:text-emerald-400' : 'text-sm font-extrabold text-red-500';
        }
    } else {
        if (changeToReturn) {
            changeToReturn.textContent = `0.00${curr}`;
            changeToReturn.className = 'text-sm font-extrabold text-slate-400 dark:text-slate-500';
        }
    }
};

// --- Visual Currency Modal Logic ---
let currentVisualCash = 0;

// --- VISUAL CASH ---
window.toggleVisualCash = () => {
    const expandedView = document.getElementById('visual-cash-expanded');
    const chevron = document.getElementById('visual-cash-chevron');
    
    if (expandedView.classList.contains('hidden')) {
        expandedView.classList.remove('hidden');
        if (chevron) chevron.textContent = 'expand_more';
    } else {
        expandedView.classList.add('hidden');
        if (chevron) chevron.textContent = 'expand_less';
    }
};

window.openCurrencyModal = () => {
    const modal = document.getElementById('currency-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        
        // Sync current input value if it exists
        const currentInput = parseFloat(document.getElementById('cash-received')?.value) || 0;
        currentVisualCash = currentInput;
        document.getElementById('visual-cash-display').textContent = currentVisualCash.toFixed(2);
    }
};

window.closeCurrencyModal = () => {
    const modal = document.getElementById('currency-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
    }
};

window.addVisualCash = (amount) => {
    currentVisualCash += amount;
    document.getElementById('visual-cash-display').textContent = currentVisualCash.toFixed(2);
    
    // Auto-update the underlying input field and recalculate
    const input = document.getElementById('cash-received');
    if (input) {
        input.value = currentVisualCash.toFixed(2);
        calculateChange();
    }
};

window.clearVisualCash = () => {
    currentVisualCash = 0;
    document.getElementById('visual-cash-display').textContent = '0.00';
    
    const input = document.getElementById('cash-received');
    if (input) {
        input.value = '';
        calculateChange();
    }
};

window.openCashDrawer = () => {
    alert('Opening Cash Drawer... (Hardware Signal Sent)');
    // In Electron, this would trigger a serial command to the receipt printer
};

window.clearCart = () => {
    posCart = [];
    activePosCartItemId = null;
    const discountEl = document.getElementById('discount-value');
    if (discountEl) discountEl.value = '';
    const cashEl = document.getElementById('cash-received');
    if (cashEl) cashEl.value = '';
    renderCart();
};

window.checkoutPOS = async () => {
    if (posCart.length === 0) return;
    
    // --- HR DATABASE SIMULATION (Smart Gate) ---
    // Simulating a real-time ping to Oracle HRMS or Active Directory
    const randomFail = Math.random();
    if (randomFail < 0.2) { // 20% chance to simulate a fraud/invalid scan
        let errorMsg = "TRANSACTION DENIED: Employee Badge Expired.";
        if (randomFail < 0.1) errorMsg = "TRANSACTION DENIED: Employee is registered as 'Maladie' (Sick Leave) today. Card blocked.";
        else if (randomFail < 0.15) errorMsg = "TRANSACTION DENIED: Daily Meal Quota Reached.";
        
        // Show premium alert
        alert(`🚨 ADMINISTRATION HR ALERT 🚨\n\n${errorMsg}\n\nOrder blocked by central database.`);
        
        // Ensure checkout button is re-enabled if it was disabled
        const checkoutBtn = document.getElementById('pos-checkout-btn');
        if (checkoutBtn) checkoutBtn.disabled = false;
        return; // Block checkout
    }
    
    try {
        const result = await fetchJSON(`${apiBase()}/api/v1/orders`, {
            method: 'POST',
            body: JSON.stringify({ items: posCart.map(i => ({ menu_item_id: i.id, quantity: i.quantity })) })
        });
        if (result.success) {
            alert('✅ Order placed successfully!');
            posCart = [];
            renderCart();
            switchTab('dashboard');
            return;
        }
    } catch { /* Demo fallback */ }
    
    // Demo: simulate successful order & decrement stock logically
    const total = posCart.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const orderId = 'POS-' + Date.now();
    const tableNo = posCart[0]?.table || '0';
    const newOrder = {
        id: orderId,
        table: tableNo,
        items: posCart.map(c => ({ name: c.name, qty: c.quantity, price: c.price, mods: c.mods || [], notes: c.notes || '', image_url: c.image_url || '' })),
        total,
        status: 'Received',
        time: Date.now()
    };
    
    // Decrement stock for tracked items
    posCart.forEach(cartItem => {
        const activeItem = menuItems.find(i => i.id === cartItem.id);
        if (activeItem && activeItem.stock !== null) {
            activeItem.stock = Math.max(0, activeItem.stock - cartItem.quantity);
        }
    });
    
    // Save to CentralStore if available
    if (window.CentralStore) {
        window.CentralStore.addOrder({
            merchantId: 'm1',
            table: tableNo,
            customer: 'Guest',
            itemsList: newOrder.items,
            total: total,
            status: 'Received',
            timestamp: Date.now()
        });
    }
    
    liveOrders.unshift(newOrder);
    localStorage.setItem('stitch_live_orders', JSON.stringify(liveOrders));
    posCart = [];
    activePosCartItemId = null;
    renderCart();
    renderDashboard();
    renderKitchenDisplay(); // <--- FIX: Update kitchen instantly
    renderLiveOrders(liveOrders); // <--- FIX: Update live orders instantly
    alert(`✅ Order ${orderId} placed successfully! Total: ${total.toFixed(2)}DH`);
    switchTab('orders');
};

window.filterPOSBySearch = (query) => {
    const q = query.toLowerCase().trim();
    const filtered = q ? menuItems.filter(i => i.name.toLowerCase().includes(q) || i.category.toLowerCase().includes(q)) : menuItems;
    renderPOSMenu(filtered);
};


// --- MENU MANAGER TAB ---
let activeMenuSubTab = 'catalog'; // 'catalog' or 'inventory'

async function loadMenuManager() {
    const container = document.getElementById('menu-tab');
    if (!container) return;
    if (!hasInitializedMenuManager) {
        container.innerHTML = `
        <div class="space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div class="flex items-center gap-2 bg-gray-100 dark:bg-black/20 p-1 rounded-xl self-start overflow-x-auto w-full sm:w-auto">
                <button onclick="switchMenuSubTab('catalog')" id="subtab-catalog" class="px-6 py-2 rounded-lg text-sm font-bold transition-all flex-shrink-0 ${activeMenuSubTab === 'catalog' ? 'bg-white dark:bg-[#2a1e19] text-primary shadow-sm' : 'text-gray-500 hover:text-gray-800 dark:hover:text-white'}">Catalog</button>
                <button onclick="switchMenuSubTab('categories')" id="subtab-categories" class="px-6 py-2 rounded-lg text-sm font-bold transition-all flex-shrink-0 ${activeMenuSubTab === 'categories' ? 'bg-white dark:bg-[#2a1e19] text-primary shadow-sm' : 'text-gray-500 hover:text-gray-800 dark:hover:text-white'}">Categories</button>
                <button onclick="switchMenuSubTab('subcategories')" id="subtab-subcategories" class="px-6 py-2 rounded-lg text-sm font-bold transition-all flex-shrink-0 ${activeMenuSubTab === 'subcategories' ? 'bg-white dark:bg-[#2a1e19] text-primary shadow-sm' : 'text-gray-500 hover:text-gray-800 dark:hover:text-white'}">Sub Categories</button>
                <button onclick="switchMenuSubTab('inventory')" id="subtab-inventory" class="px-6 py-2 rounded-lg text-sm font-bold transition-all flex-shrink-0 ${activeMenuSubTab === 'inventory' ? 'bg-white dark:bg-[#2a1e19] text-primary shadow-sm' : 'text-gray-500 hover:text-gray-800 dark:hover:text-white'}">Inventory</button>
            </div>
                <button onclick="showAddProductModal()" class="bg-primary text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-glow hover:scale-105 transition-all w-full sm:w-auto justify-center">
                    <span class="material-symbols-outlined">add</span> Add Product
                </button>
            </div>
            
            <!-- Dynamic Content Area -->
            <div id="menu-manager-content"></div>
        </div>

        <!-- Add Product Modal -->
        <div id="add-product-modal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
            <div class="bg-white dark:bg-[#2a1e19] w-full max-w-md p-8 rounded-[2.5rem] shadow-2xl">
                <h3 class="text-2xl font-bold mb-6">Add New Product</h3>
                <div class="space-y-4">
                    <div>
                        <label class="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Product Name</label>
                        <input type="text" id="new-product-name" class="w-full px-5 py-4 bg-gray-50 dark:bg-black/20 border-none rounded-2xl mt-1 focus:ring-1 focus:ring-primary" placeholder="e.g. Iced Vanilla Latte">
                    </div>
                    <div>
                        <label class="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Price (DH)</label>
                        <input type="number" id="new-product-price" step="0.5" class="w-full px-5 py-4 bg-gray-50 dark:bg-black/20 border-none rounded-2xl mt-1 focus:ring-1 focus:ring-primary" placeholder="28.00">
                    </div>
                    <div>
                        <label class="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Category</label>
                        <select id="new-product-category" class="w-full px-5 py-4 bg-gray-50 dark:bg-black/20 border-none rounded-2xl mt-1 focus:ring-1 focus:ring-primary" onchange="updateNewProductSubcategories()">
                        </select>
                    </div>
                    <div id="new-product-subcategory-container" class="hidden">
                        <label class="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Sub Category</label>
                        <select id="new-product-subcategory" class="w-full px-5 py-4 bg-gray-50 dark:bg-black/20 border-none rounded-2xl mt-1 focus:ring-1 focus:ring-primary">
                        </select>
                    </div>
                    <div>
                        <label class="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Initial Stock (Optional)</label>
                        <input type="number" id="new-product-stock" class="w-full px-5 py-4 bg-gray-50 dark:bg-black/20 border-none rounded-2xl mt-1 focus:ring-1 focus:ring-primary" placeholder="Leave blank for infinite">
                    </div>
                    <div class="pt-4 flex gap-3">
                        <button onclick="hideAddProductModal()" class="flex-1 py-4 font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 rounded-2xl transition-all">Cancel</button>
                        <button onclick="saveNewProduct()" class="flex-1 py-4 bg-primary text-white font-bold rounded-2xl shadow-glow hover:scale-105 transition-all">Save Product</button>
                    </div>
                </div>
            </div>
        </div>
    `;
        hasInitializedMenuManager = true;
    }

    switchMenuSubTab(activeMenuSubTab);
    await ensureMenuData();
    switchMenuSubTab(activeMenuSubTab);
}

window.showAddProductModal = () => {
    const catSelect = document.getElementById('new-product-category');
    if (catSelect) {
        catSelect.innerHTML = globalCategories.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
        updateNewProductSubcategories();
    }
    document.getElementById('add-product-modal')?.classList.remove('hidden');
};

window.updateNewProductSubcategories = () => {
    const cat = document.getElementById('new-product-category')?.value;
    const subContainer = document.getElementById('new-product-subcategory-container');
    const subSelect = document.getElementById('new-product-subcategory');
    if (!subContainer || !subSelect) return;

    const subs = globalSubcategories.filter(s => s.parentCategory === cat);
    if (subs.length > 0) {
        subContainer.classList.remove('hidden');
        subSelect.innerHTML = '<option value="">-- None --</option>' + subs.map(s => `<option value="${s.name}">${s.name}</option>`).join('');
    } else {
        subContainer.classList.add('hidden');
        subSelect.innerHTML = '';
        subSelect.value = '';
    }
};

window.hideAddProductModal = () => document.getElementById('add-product-modal')?.classList.add('hidden');

window.switchMenuSubTab = (tab) => {
    activeMenuSubTab = tab;

    // Update active styles
    ['catalog', 'categories', 'subcategories', 'inventory'].forEach(t => {
        const btn = document.getElementById(`subtab-${t}`);
        if (btn) {
            btn.className = `px-6 py-2 rounded-lg text-sm font-bold transition-all flex-shrink-0 ${activeMenuSubTab === t ? 'bg-white dark:bg-[#2a1e19] text-primary shadow-sm' : 'text-gray-500 hover:text-gray-800 dark:hover:text-white'}`;
        }
    });

    const content = document.getElementById('menu-manager-content');
    if (!content) return;

    // Sub-renderer
    if (tab === 'catalog') {
        content.innerHTML = '<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6" id="menu-manager-grid"></div>';
        renderMenuManagerItems(menuItems);
    } else if (tab === 'categories') {
        renderCategoryManager();
    } else if (tab === 'subcategories') {
        renderSubcategoryManager();
    } else {
        renderInventoryManager(menuItems);
    }
};

window.renderCategoryManager = () => {
    const content = document.getElementById('menu-manager-content');
    if (!content) return;

    let html = `
    <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-bold">Categories</h3>
        <button onclick="promptAddCategory()" class="bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold shadow-glow hover:scale-105 transition-all">
            <span class="material-symbols-outlined text-sm align-middle mr-1">add</span> New Category
        </button>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    `;

    globalCategories.forEach((cat, index) => {
        html += `
        <div class="bg-white dark:bg-[#2a1e19] p-4 rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm flex items-center justify-between group">
            <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-gray-100 dark:bg-black/20 overflow-hidden flex items-center justify-center shrink-0">
                    ${cat.image_url 
                        ? `<img src="${cat.image_url}" class="w-full h-full object-cover">`
                        : `<span class="material-symbols-outlined text-gray-400">category</span>`
                    }
                </div>
                <div class="font-bold text-sm">${cat.name}</div>
            </div>
            <button onclick="deleteCategory(${index})" class="w-8 h-8 rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                <span class="material-symbols-outlined text-[16px]">delete</span>
            </button>
        </div>
        `;
    });

    html += `</div>`;
    content.innerHTML = html;
};

window.promptAddCategory = () => {
    const name = prompt("Enter new category name:");
    if (!name || name.trim() === '') return;
    const catName = name.trim();
    if (globalCategories.some(c => c.name.toLowerCase() === catName.toLowerCase())) {
        alert("Category already exists!");
        return;
    }
    const img = prompt("Enter image URL for category (optional):");
    globalCategories.push({ name: catName, image_url: img || null });
    renderCategoryManager();
    renderPOSCategories(); // Refresh POS
};

window.deleteCategory = (index) => {
    const catName = globalCategories[index].name;
    const itemsCount = menuItems.filter(i => i.category === catName).length;
    if (itemsCount > 0) {
        if (!confirm(`Warning: This category contains ${itemsCount} items. Deleting it will keep the items but they won't show under this category. Delete anyway?`)) {
            return;
        }
    }
    globalCategories.splice(index, 1);
    globalSubcategories = globalSubcategories.filter(s => s.parentCategory !== catName);
    renderCategoryManager();
    renderPOSCategories(); // Refresh POS
};

window.renderSubcategoryManager = () => {
    const content = document.getElementById('menu-manager-content');
    if (!content) return;

    let html = `
    <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-bold">Sub Categories</h3>
        <button onclick="promptAddSubcategory()" class="bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold shadow-glow hover:scale-105 transition-all">
            <span class="material-symbols-outlined text-sm align-middle mr-1">add</span> New Sub Category
        </button>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    `;

    if (globalSubcategories.length === 0) {
        html += `<div class="col-span-full text-center py-10 text-gray-400 font-bold uppercase tracking-widest text-xs">No subcategories yet.</div>`;
    }

    globalSubcategories.forEach((sub, index) => {
        html += `
        <div class="bg-white dark:bg-[#2a1e19] p-4 rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm flex items-center justify-between group">
            <div>
                <div class="font-bold text-sm">${sub.name}</div>
                <div class="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Under: ${sub.parentCategory}</div>
            </div>
            <button onclick="deleteSubcategory(${index})" class="w-8 h-8 rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                <span class="material-symbols-outlined text-[16px]">delete</span>
            </button>
        </div>
        `;
    });

    html += `</div>`;
    content.innerHTML = html;
};

window.promptAddSubcategory = () => {
    if (globalCategories.length === 0) {
        alert("Please add a Category first.");
        return;
    }
    const cats = globalCategories.map((c, i) => `${i + 1}. ${c.name}`).join('\\n');
    const catIdxStr = prompt(`Select Parent Category by number:\\n${cats}`);
    if (!catIdxStr) return;
    const catIdx = parseInt(catIdxStr) - 1;
    if (isNaN(catIdx) || catIdx < 0 || catIdx >= globalCategories.length) {
        alert("Invalid selection.");
        return;
    }
    const parentCategory = globalCategories[catIdx].name;

    const name = prompt("Enter new subcategory name:");
    if (!name || name.trim() === '') return;
    
    globalSubcategories.push({ id: 'sub-' + Date.now(), parentCategory, name: name.trim() });
    renderSubcategoryManager();
};

window.deleteSubcategory = (index) => {
    if (!confirm("Delete this subcategory?")) return;
    globalSubcategories.splice(index, 1);
    renderSubcategoryManager();
};

window.saveNewProduct = async () => {
    const name = document.getElementById('new-product-name')?.value?.trim();
    const price = document.getElementById('new-product-price')?.value;
    const category = document.getElementById('new-product-category')?.value;
    const subcategory = document.getElementById('new-product-subcategory')?.value || undefined;
    const stockVal = document.getElementById('new-product-stock')?.value;

    if (!name || !price) return alert('Please fill in all fields.');

    const stock = stockVal ? parseInt(stockVal) : null;
    const newItem = { id: 'local-' + Date.now(), name, price: parseFloat(price), category, subcategory, image_url: '', stock, hasModifiers: category === 'Coffee' };

    try {
        const result = await fetchJSON(`${apiBase()}/api/v1/menu`, {
            method: 'POST',
            body: JSON.stringify({ name, price: parseFloat(price), category, image_url: '' })
        });
        if (result.success) newItem.id = result.data.id;
    } catch { /* demo: just add locally */ }

    menuItems.push(newItem);
    hideAddProductModal();

    // Clear form for next time
    ['new-product-name', 'new-product-price', 'new-product-stock'].forEach(id => {
        if (document.getElementById(id)) document.getElementById(id).value = '';
    });

    switchMenuSubTab(activeMenuSubTab); // Re-render current subtab
};

window.deleteProduct = async (id) => {
    if (!confirm('Delete this product?')) return;
    try {
        await fetchJSON(`${apiBase()}/api/v1/menu/${id}`, { method: 'DELETE' });
    } catch { /* demo: delete locally */ }
    menuItems = menuItems.filter(i => i.id !== id);
    switchMenuSubTab(activeMenuSubTab);
};

function renderMenuManagerItems(items) {
    const grid = document.getElementById('menu-manager-grid');
    if (!grid) return;
    if (items.length === 0) {
        grid.innerHTML = '<div class="col-span-full text-center py-20 text-gray-400 font-bold uppercase tracking-widest text-xs">No items in menu. Add your first product!</div>';
        return;
    }
    grid.innerHTML = items.map(item => `
        <div class="bg-white dark:bg-[#2a1e19] p-4 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-all">
            <div class="w-full aspect-square bg-gray-50 dark:bg-black/20 rounded-2xl mb-4 overflow-hidden flex items-center justify-center">
                ${item.image_url
            ? `<img src="${item.image_url}" loading="lazy" decoding="async" class="w-full h-full object-cover" onerror="this.parentElement.innerHTML='<span class=\\'material-symbols-outlined text-4xl text-gray-300\\'>coffee</span>'">`
            : `<span class="material-symbols-outlined text-4xl text-gray-300">coffee</span>`}
            </div>
            <h5 class="font-bold text-sm mb-1 truncate">${item.name}</h5>
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">${item.category}</span>
            <div class="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 dark:border-white/5">
                <div>
                    <span class="text-primary font-black">${Number(item.price).toFixed(2)}DH</span>
                    ${item.stock !== null ? `<span class="block text-[10px] text-gray-500 font-bold mt-0.5">Stock: ${item.stock}</span>` : `<span class="block text-[10px] text-gray-400 mt-0.5 italic">Infinite Stock</span>`}
                </div>
                <button onclick="deleteProduct('${item.id}')" class="text-gray-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 p-2 rounded-lg transition-all">
                    <span class="material-symbols-outlined text-[18px]">delete</span>
                </button>
            </div>
        </div>
    `).join('');
}

// --- INVENTORY VIEW ---
function renderInventoryManager(items) {
    const content = document.getElementById('menu-manager-content');
    if (!content) return;

    if (items.length === 0) {
        content.innerHTML = '<div class="text-center py-20 text-gray-400 font-bold uppercase tracking-widest text-xs">No items in inventory.</div>';
        return;
    }

    content.innerHTML = `
        <div class="bg-white dark:bg-[#2a1e19] rounded-[2.5rem] border border-gray-200 dark:border-white/5 shadow-sm overflow-hidden">
            <table class="w-full text-left">
                <thead>
                    <tr class="text-[10px] font-bold uppercase tracking-widest text-gray-400 bg-gray-50/50 dark:bg-black/10">
                        <th class="px-6 py-4">Product Name</th>
                        <th class="px-6 py-4">Category</th>
                        <th class="px-6 py-4">Status</th>
                        <th class="px-6 py-4 text-center">Stock Quantity</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 dark:divide-white/5">
                    ${items.map(item => `
                    <tr class="hover:bg-gray-50/50 dark:hover:bg-black/5 transition-colors group">
                        <td class="px-6 py-4">
                            <div class="flex items-center gap-3">
                                <div class="w-8 h-8 rounded-lg bg-gray-100 shrink-0 overflow-hidden flex items-center justify-center">
                                    ${item.image_url ? `<img src="${item.image_url}" loading="lazy" decoding="async" class="w-full h-full object-cover">` : '<span class="material-symbols-outlined text-[16px] text-gray-400">coffee</span>'}
                                </div>
                                <span class="font-bold text-sm truncate max-w-[150px] sm:max-w-xs">${item.name}</span>
                            </div>
                        </td>
                        <td class="px-6 py-4 text-xs font-bold text-gray-400 tracking-widest uppercase">${item.category}</td>
                        <td class="px-6 py-4">
                            ${item.stock === null ? '<span class="px-2 py-1 bg-gray-100 text-gray-500 text-[10px] font-bold rounded-md">Unlimited</span>'
            : item.stock <= 0 ? '<span class="px-2 py-1 bg-red-100 text-red-600 border border-red-200 text-[10px] font-bold rounded-md uppercase tracking-wider">Out of Stock</span>'
                : item.stock <= 5 ? '<span class="px-2 py-1 bg-orange-100 text-orange-600 border border-orange-200 text-[10px] font-bold rounded-md uppercase tracking-wider">Low Stock</span>'
                    : '<span class="px-2 py-1 bg-green-100 text-green-600 border border-green-200 text-[10px] font-bold rounded-md uppercase tracking-wider">In Stock</span>'}
                        </td>
                        <td class="px-6 py-4">
                            ${item.stock !== null ? `
                            <div class="flex items-center justify-center gap-3">
                                <button onclick="adjustStock('${item.id}', -1)" class="w-6 h-6 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600 rounded drop-shadow-sm transition-all focus:ring-1">-</button>
                                <span class="font-mono font-bold w-10 text-center">${item.stock}</span>
                                <button onclick="adjustStock('${item.id}', 1)" class="w-6 h-6 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600 rounded drop-shadow-sm transition-all focus:ring-1">+</button>
                            </div>` : `<div class="text-center text-gray-300 text-xl font-black">∞</div>`}
                        </td>
                    </tr>`).join('')}
                </tbody>
            </table>
        </div>
    `;
}

window.adjustStock = (id, delta) => {
    const item = menuItems.find(i => i.id === id);
    if (!item || item.stock === null) return;

    item.stock = Math.max(0, item.stock + delta);
    renderInventoryManager(menuItems);
};

function applyTheme(isDark) {
    if (isDark) {
        document.documentElement.classList.add('dark');
        const icon = document.getElementById('theme-toggle')?.querySelector('span');
        if (icon) icon.textContent = 'dark_mode';
    } else {
        document.documentElement.classList.remove('dark');
        const icon = document.getElementById('theme-toggle')?.querySelector('span');
        if (icon) icon.textContent = 'light_mode';
    }
    localStorage.setItem('stitch_dark_mode', isDark ? '1' : '0');
}

window.toggleMobileCart = () => {
    const modal = document.getElementById('pos-mobile-cart-modal');
    if (!modal) return;
    
    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    } else {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
};

// ============================================================
// INIT — everything starts here after DOM is ready
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    const hydrationTimeout = setTimeout(() => finishInitialHydration(), 2200);
    const iconFontReadyPromise = waitForMaterialSymbols().then(() => revealMaterialIcons());

    // DEMO MODE: no redirect if no token
    const token = localStorage.getItem('stitch_token');
    const role = localStorage.getItem('stitch_role');
    if (!token) {
        console.info('[Stitch] Demo mode active — no auth token found.');
        // In a real deployment, redirect to login:
        // window.location.href = '../auth_login_page/index.html';
    }

    // Theme
    applyTheme(localStorage.getItem('stitch_dark_mode') === '1');
    hydrateMenuFromCache();

    // Sidebar nav buttons
    document.querySelectorAll('.nav-btn[data-tab], .collapsed-nav-btn[data-tab]').forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            switchTab(tab);
            if (window.innerWidth < 768) {
                document.getElementById('sidebar')?.classList.add('-translate-x-full');
            }
        });
    });

    // Quick "Manual Order" header button
    document.getElementById('pos-quick-btn')?.addEventListener('click', () => switchTab('pos'));

    // Theme toggle (Dark Mode)
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
        const isDark = document.documentElement.classList.contains('dark');
        applyTheme(!isDark);
        
        // Update icon manually for instant feedback
        const icon = document.getElementById('theme-toggle').querySelector('span');
        if (icon) icon.textContent = isDark ? 'light_mode' : 'dark_mode';
    });

    // Logout
    document.getElementById('logout-btn')?.addEventListener('click', () => {
        if (confirm('Sign out?')) {
            localStorage.removeItem('stitch_token');
            localStorage.removeItem('stitch_role');
            localStorage.removeItem('stitch_user');
            window.location.href = '../auth_login_page/index.html';
        }
    });

    // POS Search
    document.getElementById('pos-search')?.addEventListener('input', e => {
        const q = e.target.value.toLowerCase();
        renderPOSMenu(menuItems.filter(i =>
            i.name.toLowerCase().includes(q) || i.category.toLowerCase().includes(q)
        ));
    });

    // Discount Inputs
    const discountInput = document.getElementById('pos-discount-input');
    const discountType = document.getElementById('pos-discount-type');

    if (discountInput && discountType) {
        const applyDiscount = () => {
            globalDiscount.amount = parseFloat(discountInput.value) || 0;
            globalDiscount.type = discountType.value;
            updateTotals();
        };
        discountInput.addEventListener('input', applyDiscount);
        discountType.addEventListener('change', applyDiscount);
    }

    // POS Checkout
    document.getElementById('pos-checkout-btn')?.addEventListener('click', async () => {
        const btn = document.getElementById('pos-checkout-btn');
        btn.disabled = true;
        btn.innerHTML = '<span class="animate-spin material-symbols-outlined">sync</span> Processing...';
        
        try {
            // Call the original checkoutPOS function and wait for it to complete
            await checkoutPOS();
        } finally {
            // Reset button state after checkout completes (success or failure)
            btn.disabled = false;
            btn.innerHTML = '<span class="material-symbols-outlined">receipt_long</span> Place Order';
        }
    });

    // --- QR CODE GENERATOR ---
    window.openQRModal = () => {
        document.getElementById('qr-table-input').value = '';
        document.getElementById('qr-result-area').classList.add('hidden');
        document.getElementById('qr-canvas-container').innerHTML = '';
        document.getElementById('qr-modal').classList.remove('hidden');
    };

    window.closeQRModal = () => document.getElementById('qr-modal').classList.add('hidden');

    let currentQRData = '';

    window.generateQR = () => {
        const tableId = document.getElementById('qr-table-input').value.trim() || 'Undefined';

        // Construct the demo URL representing the storefront link
        const url = new URL(window.location.href);
        const baseUrl = url.origin + url.pathname.replace('/stitch_caf_menu_table_12/merchant_dashboard/index.html', '/stitch_caf_menu_table_12');
        currentQRData = `${baseUrl}?table=${encodeURIComponent(tableId)}`;

        document.getElementById('qr-link-text').textContent = currentQRData;

        const container = document.getElementById('qr-canvas-container');
        container.innerHTML = ''; // Clear previous

        // Generate new QR using the included CDN library
        new QRCode(container, {
            text: currentQRData,
            width: 135, // Reduced by 25% from 180
            height: 135, // Reduced by 25% from 180
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        document.getElementById('qr-result-area').classList.remove('hidden');
    };

    window.printQRCode = () => {
        const tableId = document.getElementById('qr-table-input').value.trim() || 'Undefined';
        const qrImage = document.querySelector('#qr-canvas-container img')?.src || document.querySelector('#qr-canvas-container canvas')?.toDataURL();

        if (!qrImage) return alert('Please generate a QR code first.');

        const originalTitle = document.title;
        document.title = `Table_${tableId}_QR`;

        const printContent = `
            <div style="padding:40px; text-align:center; font-family:sans-serif; max-width:300px; margin:auto; border: 2px dashed #ccc; border-radius: 20px;">
                <h2 style="font-size:32px; font-weight:900; margin-bottom: 5px; text-transform:uppercase;">STITCH</h2>
                <p style="font-size:14px; color:#666; font-weight:bold; letter-spacing:2px; margin-bottom:20px; text-transform:uppercase;">Order Here</p>
                
                <img src="${qrImage}" style="width:200px; height:200px; margin:auto; display:block;" />
                
                <div style="margin-top:20px; padding-top:20px; border-top: 2px solid #eee;">
                    <p style="font-size:12px; color:#999; text-transform:uppercase; font-weight:bold; letter-spacing:1px; margin-bottom:5px;">Table</p>
                    <p style="font-size:48px; font-weight:900; margin:0; line-height:1;">${tableId}</p>
                </div>
            </div>
        `;

        const originalBody = document.body.innerHTML;
        document.body.innerHTML = printContent;
        window.print();

        document.body.innerHTML = originalBody;
        document.title = originalTitle;
        location.reload();
    };

    // Mobile Sidebar toggle is handled in toggleSidebar() above.
    document.getElementById('mobile-menu-toggle')?.addEventListener('click', () => {
        sidebar?.classList.remove('-translate-x-full');
    });
    document.getElementById('mobile-menu-close')?.addEventListener('click', () => {
        sidebar?.classList.add('-translate-x-full');
    });
    document.getElementById('sidebar-retract-trigger')?.addEventListener('click', () => {
        if (!sidebar) return;
        if (window.innerWidth >= 768) {
            const isExpanded = sidebar.classList.contains('md:translate-x-0');
            setDesktopSidebar(!isExpanded);
            return;
        }
        sidebar.classList.toggle('-translate-x-full');
    });
    document.getElementById('sidebar-expand-trigger')?.addEventListener('click', () => {
        if (window.innerWidth >= 768) {
            setDesktopSidebar(true);
            return;
        }
        sidebar?.classList.remove('-translate-x-full');
    });
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (window.innerWidth < 768) document.getElementById('sidebar')?.classList.add('-translate-x-full');
        });
    });

    // Close POS modal on outside click
    window.onclick = (e) => {
        const addModal = document.getElementById('add-product-modal');
        const modModal = document.getElementById('pos-modifier-modal');
        const mobileCartModal = document.getElementById('pos-mobile-cart-modal');
        if (addModal && e.target === addModal) hideAddProductModal();
        if (modModal && e.target === modModal) closeModifierModal();
        if (mobileCartModal && e.target === mobileCartModal) toggleMobileCart();
    };

// Load initial dashboard
    switchTab('dashboard');
    switchMenuSubTab('catalog'); // init menu manager subtab state

    // --- QUICK ACTIONS ---
    const posQuickBtn = document.getElementById('pos-quick-btn');
    if (posQuickBtn) {
        posQuickBtn.addEventListener('click', () => switchTab('pos'));
    }

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark');
            localStorage.setItem('stitch_dark_mode', isDark);
            themeToggle.innerHTML = `<span class="material-symbols-outlined">${isDark ? 'light_mode' : 'dark_mode'}</span>`;
        });
        
        // Init theme from local storage
        if (localStorage.getItem('stitch_dark_mode') === 'true') {
            document.body.classList.add('dark');
            themeToggle.innerHTML = `<span class="material-symbols-outlined">light_mode</span>`;
        } else {
            themeToggle.innerHTML = `<span class="material-symbols-outlined">dark_mode</span>`;
        }
    }

    Promise.allSettled([iconFontReadyPromise, ensureMenuData()])
        .then(() => {
            clearTimeout(hydrationTimeout);
            finishInitialHydration();
            initSettings(); // Initialize POS Settings
        });
});

// --- GLOBAL THEMING ---
function setThemeColor(hexColor) {
    // Save to localStorage so it persists across POS and Customer menu
    localStorage.setItem('stitch_theme_primary', hexColor);
    
    // Apply locally
    document.documentElement.style.setProperty('--theme-primary', hexColor);
    
    // If inside an iframe or communicating across tabs, dispatch event
    window.dispatchEvent(new Event('theme_changed'));
}

// Initialize theme and settings on load
document.addEventListener('DOMContentLoaded', () => {
    const savedColor = localStorage.getItem('stitch_theme_primary');
    if (savedColor) {
        document.documentElement.style.setProperty('--theme-primary', savedColor);
    }
    
    // Apply Restaurant Name if saved
    const savedName = localStorage.getItem('stitch_restaurant_name');
    if (savedName) {
        const nameInput = document.getElementById('restaurant-name-input');
        if (nameInput) nameInput.value = savedName;
        // Also update any UI elements showing the name if they exist
        document.querySelectorAll('.restaurant-name-display').forEach(el => el.textContent = savedName);
    }

    // Save Settings Button
    const saveBtn = document.getElementById('save-settings-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            const nameInput = document.getElementById('restaurant-name-input');
            if (nameInput) {
                localStorage.setItem('stitch_restaurant_name', nameInput.value);
                document.querySelectorAll('.restaurant-name-display').forEach(el => el.textContent = nameInput.value);
            }
            alert('Settings saved successfully!');
        });
    }
});

// Real-time sync across POS tabs
window.addEventListener('storage', (e) => {
    if (e.key === 'stitch_theme_primary' && e.newValue) {
        document.documentElement.style.setProperty('--theme-primary', e.newValue);
    }
    if (e.key === 'stitch_restaurant_name' && e.newValue) {
        document.querySelectorAll('.restaurant-name-display').forEach(el => el.textContent = e.newValue);
        const nameInput = document.getElementById('restaurant-name-input');
        if (nameInput) nameInput.value = e.newValue;
    }
});

// Settings & Translation Functionality
const translations = {
    EN: {
        dashboard: "Dashboard",
        take_order: "Take Order",
        live_orders: "Live Orders",
        kitchen_display: "Kitchen Display",
        menu_manager: "Menu Manager",
        qr_center: "QR Center",
        reservations: "Reservations",
        settings: "Settings",
        sign_out: "Sign Out",
        manual_order: "Manual Order",
        active_order: "Active Order",
        items_selected: "Items Selected",
        subtotal: "Subtotal",
        total: "Total",
        validate_order: "VALIDATE ORDER",
        todays_summary: "Today's Summary",
        kitchen_live: "Kitchen Live",
        total_revenue: "Total Revenue",
        total_orders: "Total Orders",
        avg_order: "Avg. Order",
        retention: "Retention",
        avg_prep: "Avg. Preparation",
        start_preparing: "Start Preparing",
        mark_ready: "Mark Ready",
        complete_order: "Complete Order",
        update_btn: "Update",
        in_progress: "In Progress...",
        store_settings: "Store Settings",
        settings_desc: "Configure your restaurant profile and preferences",
        save_changes: "Save Changes",
        general_information: "General Information",
        restaurant_name: "Restaurant Name",
        store_email: "Store Email",
        phone_number: "Phone Number",
        currency: "Currency",
        appearance: "Appearance",
        dark_mode: "Dark Mode",
        dark_mode_desc: "Toggle interface theme",
        rtl_layout: "RTL Layout",
        rtl_desc: "Right-to-left support",
        theme_color: "Theme Color",
        theme_color_desc: "Select primary accent color",
        qr_command_center: "QR Command Center",
        qr_desc: "Generate and manage table QR codes",
        print_all: "Print All",
        new_table: "New Table",
        menu_management: "Menu Management",
        menu_desc: "Add, edit, or remove products from your catalog",
        new_item: "New Item",
        reservations_title: "Reservations",
        reservations_desc: "Managing upcoming guest bookings",
        upcoming: "Upcoming",
        past: "Past",
        visual_cash: "Visual Cash (Tap Here)",
        drawer: "Drawer",
        customer: "Customer",
        items: "Items",
        status: "Status",
        date: "Date",
        actions: "Actions",
        showing_orders: "Showing orders",
        total_amount: "Total Amount"
    },
    FR: {
        dashboard: "Tableau de Bord",
        take_order: "Prendre Commande",
        live_orders: "Commandes Actives",
        kitchen_display: "Écran Cuisine",
        menu_manager: "Gestion Menu",
        qr_center: "Centre QR",
        reservations: "Réservations",
        settings: "Paramètres",
        sign_out: "Déconnexion",
        manual_order: "Commande Manuelle",
        active_order: "Commande Active",
        items_selected: "Articles Sélectionnés",
        subtotal: "Sous-total",
        total: "Total",
        validate_order: "VALIDER LA COMMANDE",
        todays_summary: "Résumé du Jour",
        kitchen_live: "Cuisine en Direct",
        total_revenue: "Revenu Total",
        total_orders: "Total Commandes",
        avg_order: "Commande Moy.",
        retention: "Rétention",
        avg_prep: "Temps Moy. Prép.",
        start_preparing: "Commencer",
        mark_ready: "Marquer Prêt",
        complete_order: "Terminer Commande",
        update_btn: "Mettre à Jour",
        in_progress: "En Cours...",
        store_settings: "Paramètres du Magasin",
        settings_desc: "Configurez le profil et les préférences de votre restaurant",
        save_changes: "Enregistrer",
        general_information: "Informations Générales",
        restaurant_name: "Nom du Restaurant",
        store_email: "Email du Magasin",
        phone_number: "Numéro de Téléphone",
        currency: "Devise",
        appearance: "Apparence",
        dark_mode: "Mode Sombre",
        dark_mode_desc: "Basculer le thème de l'interface",
        rtl_layout: "Mise en page RTL",
        rtl_desc: "Support de droite à gauche",
        theme_color: "Couleur du Thème",
        theme_color_desc: "Sélectionnez la couleur d'accent",
        qr_command_center: "Centre de Commande QR",
        qr_desc: "Générer et gérer les codes QR des tables",
        print_all: "Tout Imprimer",
        new_table: "Nouvelle Table",
        menu_management: "Gestion du Menu",
        menu_desc: "Ajouter, modifier ou supprimer des produits",
        new_item: "Nouvel Article",
        reservations_title: "Réservations",
        reservations_desc: "Gérer les réservations à venir",
        upcoming: "À venir",
        past: "Passé",
        visual_cash: "Caisse Visuelle (Cliquer)",
        drawer: "Tiroir-caisse",
        customer: "Client",
        items: "Articles",
        status: "Statut",
        date: "Date",
        actions: "Actions",
        showing_orders: "Affichage des commandes",
        total_amount: "Montant Total"
    },
    AR: {
        dashboard: "لوحة القيادة",
        take_order: "أخذ طلب",
        live_orders: "الطلبات الحالية",
        kitchen_display: "شاشة المطبخ",
        menu_manager: "إدارة القائمة",
        qr_center: "مركز QR",
        reservations: "الحجوزات",
        settings: "الإعدادات",
        sign_out: "تسجيل الخروج",
        manual_order: "طلب يدوي",
        active_order: "الطلب الحالي",
        items_selected: "عناصر محددة",
        subtotal: "المجموع الفرعي",
        total: "المجموع",
        validate_order: "تأكيد الطلب",
        todays_summary: "ملخص اليوم",
        kitchen_live: "المطبخ مباشر",
        total_revenue: "إجمالي الإيرادات",
        total_orders: "إجمالي الطلبات",
        avg_order: "متوسط الطلب",
        retention: "الاحتفاظ بالعملاء",
        avg_prep: "متوسط وقت التحضير",
        start_preparing: "بدء التحضير",
        mark_ready: "تحديد كجاهز",
        complete_order: "إكمال الطلب",
        update_btn: "تحديث",
        in_progress: "جاري المعالجة...",
        store_settings: "إعدادات المتجر",
        settings_desc: "قم بإعداد ملف تعريف المطعم والتفضيلات",
        save_changes: "حفظ التغييرات",
        general_information: "معلومات عامة",
        restaurant_name: "اسم المطعم",
        store_email: "البريد الإلكتروني",
        phone_number: "رقم الهاتف",
        currency: "العملة",
        appearance: "المظهر",
        dark_mode: "الوضع الداكن",
        dark_mode_desc: "تبديل مظهر الواجهة",
        rtl_layout: "تخطيط من اليمين لليسار",
        rtl_desc: "دعم اللغة من اليمين إلى اليسار",
        theme_color: "لون السمة",
        theme_color_desc: "حدد اللون الأساسي",
        qr_command_center: "مركز تحكم QR",
        qr_desc: "إنشاء وإدارة رموز QR للطاولات",
        print_all: "طباعة الكل",
        new_table: "طاولة جديدة",
        menu_management: "إدارة القائمة",
        menu_desc: "إضافة أو تعديل أو إزالة المنتجات",
        new_item: "عنصر جديد",
        reservations_title: "الحجوزات",
        reservations_desc: "إدارة حجوزات الضيوف القادمة",
        upcoming: "القادمة",
        past: "السابقة",
        visual_cash: "الصندوق المرئي (انقر هنا)",
        drawer: "الدرج",
        customer: "العميل",
        items: "العناصر",
        status: "الحالة",
        date: "التاريخ",
        actions: "إجراءات",
        showing_orders: "عرض الطلبات",
        total_amount: "المبلغ الإجمالي"
    }
};

let selectedThemeColor = localStorage.getItem('stitch_theme_color') || '#FF5200';
window.posDensity = localStorage.getItem('stitch_pos_density') || 'compact';
window.posCurrency = localStorage.getItem('stitch_currency') || 'DH';
window.posLanguage = localStorage.getItem('stitch_language') || 'EN';

function applyTranslation() {
    const lang = translations[window.posLanguage] || translations.EN;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (lang[key]) {
            // Keep badges inside if they exist
            const badge = el.querySelector('span.ml-auto');
            el.textContent = lang[key];
            if (badge) el.appendChild(badge);
        }
    });
    
    // Quick specific overrides for POS
    const checkoutBtn = document.getElementById('pos-checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.innerHTML = `<span class="material-symbols-outlined text-[18px] text-ultra-contrast">verified</span> ${lang.validate_order || 'VALIDATE ORDER'}`;
    }
}

function initSettings() {
    // Apply saved color immediately
    document.documentElement.style.setProperty('--color-primary', selectedThemeColor);
    
    // Apply Translations
    applyTranslation();
    
    // UI Init for Colors
    document.querySelectorAll('.theme-btn').forEach(btn => {
        if (btn.dataset.color === selectedThemeColor) {
            btn.innerHTML = '<span class="material-symbols-outlined absolute inset-0 m-auto text-white text-[20px] font-bold">check</span>';
        } else {
            btn.innerHTML = '';
        }
        btn.addEventListener('click', (e) => {
            const color = e.currentTarget.dataset.color;
            selectedThemeColor = color;
            document.documentElement.style.setProperty('--color-primary', color);
            document.querySelectorAll('.theme-btn').forEach(b => b.innerHTML = '');
            e.currentTarget.innerHTML = '<span class="material-symbols-outlined absolute inset-0 m-auto text-white text-[20px] font-bold">check</span>';
        });
    });

    // UI Init for Density
    document.querySelectorAll('.density-label').forEach(label => {
        if (label.dataset.density === window.posDensity) {
            label.querySelector('.indicator').classList.remove('hidden');
        } else {
            label.querySelector('.indicator').classList.add('hidden');
        }
        label.addEventListener('click', (e) => {
            const density = e.currentTarget.dataset.density;
            window.posDensity = density;
            document.querySelectorAll('.density-label').forEach(l => l.querySelector('.indicator').classList.add('hidden'));
            e.currentTarget.querySelector('.indicator').classList.remove('hidden');
            if (window.menuItems && window.menuItems.length > 0) renderPOSMenu(window.menuItems);
        });
    });

    // UI Init for Language/Currency
    const currSelect = document.getElementById('settings-currency');
    const langSelect = document.getElementById('settings-language');
    if (currSelect) currSelect.value = window.posCurrency;
    if (langSelect) langSelect.value = window.posLanguage;
}

window.applySettings = () => {
    localStorage.setItem('stitch_theme_color', selectedThemeColor);
    localStorage.setItem('stitch_pos_density', window.posDensity);
    
    const currSelect = document.getElementById('settings-currency');
    const langSelect = document.getElementById('settings-language');
    if (currSelect) {
        window.posCurrency = currSelect.value;
        localStorage.setItem('stitch_currency', window.posCurrency);
    }
    if (langSelect) {
        window.posLanguage = langSelect.value;
        localStorage.setItem('stitch_language', window.posLanguage);
    }

    // Apply currency format across UI
    if (window.menuItems && window.menuItems.length > 0) renderPOSMenu(window.menuItems);
    renderCart();
    
    // Apply Translations
    applyTranslation();

    // Show a small confirmation
    alert('Settings applied successfully! Dashboard updated.');
};

// --- NEW LOGIC FOR TOP BAR & QR ---
function updateTopClock() {
    const now = new Date();
    const dateEl = document.getElementById('top-date');
    const timeEl = document.getElementById('top-time');
    if (dateEl) dateEl.textContent = now.toLocaleDateString();
    if (timeEl) timeEl.textContent = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}
setInterval(updateTopClock, 1000);
// Need to delay first run slightly to ensure DOM is ready
document.addEventListener('DOMContentLoaded', updateTopClock);

window.cycleLanguage = () => {
    const langs = ['EN', 'FR', 'AR'];
    let currentIndex = langs.indexOf(window.posLanguage);
    if (currentIndex === -1) currentIndex = 0;
    
    currentIndex = (currentIndex + 1) % langs.length;
    window.posLanguage = langs[currentIndex];
    localStorage.setItem('stitch_language', window.posLanguage);
    
    // Update button visually
    const langBtn = document.getElementById('lang-toggle-btn');
    if (langBtn) langBtn.textContent = window.posLanguage;
    
    // Update direction for AR
    if (window.posLanguage === 'AR') {
        document.documentElement.dir = 'rtl';
    } else {
        document.documentElement.dir = 'ltr';
    }
    
    applyTranslation();
};

window.addNewTable = () => {
    const grid = document.getElementById('qr-grid');
    if (!grid) return;
    const tableNum = grid.children.length + 1;
    const paddedNum = tableNum.toString().padStart(2, '0');
    
    const card = document.createElement('div');
    card.className = "premium-card qr-premium-card p-6 flex flex-col items-center text-center group";
    card.innerHTML = `
        <div class="w-full aspect-square bg-slate-50 dark:bg-slate-900 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden group-hover:shadow-inner transition-all">
            <div class="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
                <span class="material-symbols-outlined text-9xl">qr_code_2</span>
            </div>
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Table${tableNum}" class="w-48 h-48 relative z-10">
        </div>
        <h4 class="text-lg font-black mb-1">Table ${paddedNum}</h4>
        <p class="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-4">Main Dining Area</p>
        <div class="flex w-full gap-2 mt-auto">
            <button class="flex-1 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">Download</button>
            <button onclick="this.closest('.premium-card').remove()" class="w-12 h-12 flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-red-500 transition-all">
                <span class="material-symbols-outlined text-lg">delete</span>
            </button>
        </div>
    `;
    grid.appendChild(card);
};

// initialize current language state on page load
document.addEventListener('DOMContentLoaded', () => {
    const langBtn = document.getElementById('lang-toggle-btn');
    if (langBtn) langBtn.textContent = window.posLanguage || 'EN';
    if (window.posLanguage === 'AR') {
        document.documentElement.dir = 'rtl';
    }
    // ensure initial QR table if grid is empty
    const grid = document.getElementById('qr-grid');
    if (grid && grid.children.length === 0) {
        window.addNewTable();
        window.addNewTable();
        window.addNewTable();
    }
});

const products = [
  // --- COLD DRINKS: COCKTAILS & SODAS (9) ---
  { id: "cd-1", name: "Cocktail Purple Berry Lime", description: "Cocktail rafraîchissant aux fruits rouges et citron vert", price: 8.50, image: "../images/sub catégorie images/cold drinks/Coktail purple berry lime .jpg", category: "iced_coffee", subCategory: "Cocktail" },
  { id: "cd-2", name: "Cold Pomelo", description: "Boisson fraîche au pamplemousse rose pressé", price: 7.00, image: "../images/sub catégorie images/cold drinks/Cold Ponplemouse .jpg", category: "iced_coffee", subCategory: "Cold Drink" },
  { id: "cd-3", name: "Miami Cocktail", description: "Création tropicale façon Miami aux fruits exotiques", price: 9.00, image: "../images/sub catégorie images/cold drinks/Miami Coktail.jpg", category: "iced_coffee", subCategory: "Cocktail" },
  { id: "cd-4", name: "Mokhito Classique", description: "Menthe fraîche pilée, citron vert et glace pilée", price: 8.00, image: "../images/sub catégorie images/cold drinks/Mokhito.jpg", category: "iced_coffee", subCategory: "Cocktail" },
  { id: "cd-5", name: "Tropical Drink", description: "Punch de fruits tropicaux frais servi glacé", price: 7.50, image: "../images/sub catégorie images/cold drinks/Tripical Drink.jpg", category: "iced_coffee", subCategory: "Cold Drink" },
  { id: "cd-6", name: "Wild Berry Drink", description: "Infusion glacée aux baies sauvages", price: 7.00, image: "../images/sub catégorie images/cold drinks/Wild Berry Drink.jpg", category: "iced_coffee", subCategory: "Cold Drink" },
  { id: "cd-7", name: "Coca-Cola", description: "Servi très frais avec rondelle de citron", price: 3.00, image: "../images/sub catégorie images/cold drinks/Coka Cola.jpg", category: "iced_coffee", subCategory: "Soda" },
  { id: "cd-8", name: "Sprite", description: "Boisson gazeuse citron-lime ultra fraîche", price: 3.00, image: "../images/sub catégorie images/cold drinks/Sprite.jpg", category: "iced_coffee", subCategory: "Soda" },
  { id: "cd-9", name: "Hawaii Tropical", description: "Boisson gazeuse aux saveurs tropicales", price: 5.00, image: "../images/sub catégorie images/cold drinks/Hawei.jpg", category: "iced_coffee", subCategory: "Soda" },

  // --- JUICES / JUS FRAIS (16) ---
  { id: "ju-1", name: "Jus D'Orange Pressé", description: "Oranges Valencia pressées à froid à la minute", price: 4.50, image: "../images/sub catégorie images/Jus/Jus D'Orange.jpg", category: "juices", subCategory: "Juice" },
  { id: "ju-2", name: "Cuba Mokhito Citron Menthe", description: "Citron pressé frais et feuilles de menthe", price: 4.10, image: "../images/sub catégorie images/Jus/Cuba Mokhito.avif", category: "juices", subCategory: "Juice" },
  { id: "ju-3", name: "Jus D'Ananas", description: "Ananas tropical frais mixé minute", price: 4.80, image: "../images/sub catégorie images/Jus/Jus D'ananas.jpg", category: "juices", subCategory: "Juice" },
  { id: "ju-4", name: "Jus de Pomme", description: "Pommes croquantes pressées à froid", price: 4.00, image: "../images/sub catégorie images/Jus/Jus de Pomme.jpg", category: "juices", subCategory: "Juice" },
  { id: "ju-5", name: "Jus de Mangue", description: "Purée de mangue Alphonso fraîche et veloutée", price: 5.25, image: "../images/sub catégorie images/Jus/Jus Mangue.jpg", category: "juices", subCategory: "Juice" },
  { id: "ju-6", name: "Jus de Kiwi", description: "Kiwi frais riche en vitamine C", price: 5.50, image: "../images/sub catégorie images/Jus/jus de kiwi.jpg", category: "juices", subCategory: "Juice" },
  { id: "ju-7", name: "Blueberry Infusion", description: "Cocktail antioxydant aux myrtilles fraîches", price: 5.75, image: "../images/sub catégorie images/Jus/Blueberry Infusion.jpg", category: "juices", subCategory: "Juice" },
  { id: "ju-8", name: "Mango Indian Drink", description: "Douceur de mangue fraîche façon Lassi léger", price: 5.75, image: "../images/sub catégorie images/Jus/delicious-indian-mango-drink-high-angle_23-2148734680.avif", category: "juices", subCategory: "Juice" },
  { id: "ju-9", name: "Iced Orange Zest", description: "Orange givrée et zeste d'agrumes frais", price: 5.50, image: "../images/sub catégorie images/Jus/glass-iced-orange-cocktail-garnished-with-orange-zest-strawberry-shape_140725-6038.avif", category: "juices", subCategory: "Juice" },
  { id: "ju-10", name: "Cocktail Exotique", description: "Mélange vitaminé de fruits exotiques", price: 5.50, image: "../images/sub catégorie images/Jus/Exotic-cocktail-.avif", category: "juices", subCategory: "Juice" },
  { id: "ju-11", name: "Jus de Papaye", description: "Papaye mûre mixée, douce et rafraîchissante", price: 5.50, image: "../images/sub catégorie images/Jus/Jus de Papae .jpg", category: "juices", subCategory: "Juice" },
  { id: "ju-12", name: "Jus D'Avocat Onctueux", description: "Avocat frais mixé au lait froid et fruits secs", price: 6.50, image: "../images/sub catégorie images/Jus/Jus D'avocat.jpg", category: "juices", subCategory: "Juice" },
  { id: "ju-13", name: "Jus de Banane", description: "Bananes mûres mixées pour une douceur naturelle", price: 4.60, image: "../images/sub catégorie images/Jus/Jus De Banane.jpg", category: "juices", subCategory: "Juice" },
  { id: "ju-14", name: "Jus au Fruit du Dragon", description: "Pitaya rose frais aux notes délicates", price: 5.20, image: "../images/sub catégorie images/Jus/Jus au Fruit de Dragon.jpg", category: "juices", subCategory: "Juice" },
  { id: "ju-15", name: "Jus de Fraise", description: "Fraises fraîches du jour mixées minute", price: 5.20, image: "../images/sub catégorie images/Jus/Jus de Fraise .jpg", category: "juices", subCategory: "Juice" },
  { id: "ju-16", name: "Jus de Pêche", description: "Nectar de pêche fraîche doux et parfumé", price: 4.70, image: "../images/sub catégorie images/Jus/Jus de Peche.jpg", category: "juices", subCategory: "Juice" },

  // --- SMOOTHIES (8) ---
  { id: "sm-1", name: "Blue Berry Smoothie", description: "Myrtilles, fraises fraîches et yaourt onctueux", price: 5.20, image: "../images/sub catégorie images/smoothie/Blue Berry Smoothie.jpg", category: "smoothies", subCategory: "Smoothie" },
  { id: "sm-2", name: "Kiwi Smoothie", description: "Kiwi, pomme verte et banane fraîche", price: 5.00, image: "../images/sub catégorie images/smoothie/Kiwi Smoothie.jpg", category: "smoothies", subCategory: "Smoothie" },
  { id: "sm-3", name: "Raspberry Smoothie", description: "Purée de framboises fraîches et yaourt grec", price: 5.75, image: "../images/sub catégorie images/smoothie/raspberry-smoothie_1150-18529.jpg", category: "smoothies", subCategory: "Smoothie" },
  { id: "sm-4", name: "Brazilian Smoothie", description: "Cocktail de fruits tropicaux façon Brésil", price: 5.60, image: "../images/sub catégorie images/smoothie/Brazilian Smoothie.jpg", category: "smoothies", subCategory: "Smoothie" },
  { id: "sm-5", name: "Dragon Fruit Smoothie", description: "Smoothie intense au fruit du dragon rose", price: 5.70, image: "../images/sub catégorie images/smoothie/Dragon Fruit Smoothie .jpg", category: "smoothies", subCategory: "Smoothie" },
  { id: "sm-6", name: "Golden Turmeric Smoothie", description: "Mangue, banane, curcuma doux et gingembre", price: 5.30, image: "../images/sub catégorie images/smoothie/Golden Turmeric.jpg", category: "smoothies", subCategory: "Smoothie" },
  { id: "sm-7", name: "Greek Yogurt & Fruits", description: "Yaourt grec brassé, céréales croquantes et fruits", price: 5.40, image: "../images/sub catégorie images/smoothie/Greek Yogurt with cereal and fruits .jpg", category: "smoothies", subCategory: "Smoothie" },
  { id: "sm-8", name: "Tropical Smoothie", description: "Mangue, ananas et banane glacée", price: 5.50, image: "../images/sub catégorie images/smoothie/tropical Smoothie.jpg", category: "smoothies", subCategory: "Smoothie" },

  // --- MILKSHAKES (9) ---
  { id: "mk-1", name: "Milkshake Café Chocolat", description: "Cacao intense, espresso et glace vanille", price: 5.20, image: "../images/sub catégorie images/milshake/Milkshake Café Chocolat.jpg", category: "shakes", subCategory: "Shake" },
  { id: "mk-2", name: "Milkshake Oreo", description: "Éclats d'Oreo croquants et crème glacée vanille", price: 5.00, image: "../images/sub catégorie images/milshake/Milkshake Oreo.jpg", category: "shakes", subCategory: "Shake" },
  { id: "mk-3", name: "Strawberry Ice Milkshake", description: "Fraises fraîches, crème fouettée et glace", price: 5.40, image: "../images/sub catégorie images/milshake/strawberry-ice milkshake.jpg", category: "shakes", subCategory: "Shake" },
  { id: "mk-4", name: "Milkshake Banane Caramel", description: "Banane fraîche et filet de caramel beurre salé", price: 5.60, image: "../images/sub catégorie images/milshake/Milkshake Banane.jpg", category: "shakes", subCategory: "Shake" },
  { id: "mk-5", name: "Milkshake Caramel", description: "Crème glacée onctueuse et caramel fondant", price: 5.40, image: "../images/sub catégorie images/milshake/Milkshake Caramel.jpg", category: "shakes", subCategory: "Shake" },
  { id: "mk-6", name: "Peanut Milkshake", description: "Beurre de cacahuète torréfié et lait glacé", price: 5.60, image: "../images/sub catégorie images/milshake/Peanut Milkshak.jpg", category: "shakes", subCategory: "Shake" },
  { id: "mk-7", name: "Kiwi Milkshake", description: "Kiwi frais mixé à la crème glacée vanille", price: 5.10, image: "../images/sub catégorie images/milshake/kiwi-milk-shake-.jpg", category: "shakes", subCategory: "Shake" },
  { id: "mk-8", name: "Greek Yogurt Fruit Shake", description: "Douceur glacée au yaourt grec et fruits rouges", price: 5.30, image: "../images/sub catégorie images/milshake/Greek Yogurt Fruit.jpg", category: "shakes", subCategory: "Shake" },
  { id: "mk-9", name: "Chocolate Milkshake Classique", description: "Chocolat noir 70%, glace vanille et chantilly", price: 6.25, image: "../images/sub catégorie images/milshake/close-up-milkshake-glass-plate_.jpg", category: "shakes", subCategory: "Shake" }
];

let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
  renderProducts('all');
  setupEventListeners();
});

function redirectToCustomization(productId) {
  const product = products.find(p => String(p.id) === String(productId));
  if (!product) return;

  let targetPage = '../orange juce_customization_view_1/index.html';
  if (product.category === 'smoothies') {
    targetPage = '../smothie customisation review/index.html';
  } else if (product.category === 'shakes') {
    targetPage = '../milkshake_customization_view/index.html';
  }

  try {
    localStorage.setItem('stitch_customizing_item', JSON.stringify(product));
  } catch (_) {}

  window.location.href = `${targetPage}?id=${encodeURIComponent(product.id)}&name=${encodeURIComponent(product.name)}&image=${encodeURIComponent(product.image)}&price=${encodeURIComponent(product.price)}&category=${encodeURIComponent(product.subCategory || 'Cold Drink')}`;
}

function addToCart(productId) {
  redirectToCustomization(productId);
}

function renderProducts(filter = 'all') {
  const list = document.getElementById('product-list');
  if (!list) return;

  const filteredProducts = filter === 'all'
    ? products
    : products.filter(p => p.category === filter);

  list.innerHTML = filteredProducts.map((product, index) => `
    <div onclick="redirectToCustomization('${product.id}')" class="flex flex-col bg-white dark:bg-slate-800 p-3 rounded-2xl border-2 border-white/70 dark:border-white/10 ring-1 ring-black/5 dark:ring-white/5 ring-offset-1 ring-offset-white dark:ring-offset-[#1a100c] shadow-[0_4px_14px_rgba(0,0,0,0.12)] hover:shadow-[0_10px_24px_rgba(0,0,0,0.18)] fade-in-up cursor-pointer group transition-all duration-300 transform hover:-translate-y-1" style="animation-delay: ${Math.min(index * 0.03, 0.4)}s">
      <div class="product-image w-full h-44 rounded-xl bg-cover bg-center mb-3 relative overflow-hidden bg-gray-100 dark:bg-zinc-900" role="img" aria-label="${product.name}" style="background-image: url(&quot;${product.image}&quot;);">
        <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity"></div>
      </div>
      <div class="flex-1 flex flex-col px-1">
        <h4 class="font-bold text-[14px] text-gray-800 dark:text-white leading-tight mb-1 line-clamp-1">${product.name}</h4>
        <div class="flex items-center gap-1.5 mb-2">
          <div class="flex items-center gap-0.5">
            <span class="material-symbols-outlined text-[#FFC107] text-[12px]">star</span>
            <span class="text-[10px] font-bold text-green-700 dark:text-green-300">4.8</span>
          </div>
          <span class="text-[9px] text-gray-400 dark:text-gray-500">• ${product.subCategory || 'Frais'}</span>
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
        b.classList.remove('active', 'bg-primary', 'text-white', 'shadow-lg', 'shadow-primary/20');
        b.classList.add('bg-white', 'dark:bg-zinc-800', 'text-zinc-500');
      });
      const target = e.currentTarget;
      target.classList.remove('bg-white', 'dark:bg-zinc-800', 'text-zinc-500');
      target.classList.add('active', 'bg-primary', 'text-white', 'shadow-lg', 'shadow-primary/20');
      currentFilter = target.dataset.filter || 'all';
      renderProducts(currentFilter);
    });
  });
}

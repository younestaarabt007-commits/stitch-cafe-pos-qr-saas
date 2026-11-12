
function apiBase() {
  try {
    return localStorage.getItem('stitch_api_base') || (typeof window !== 'undefined' && window.STITCH_API_BASE) || null;
  } catch {
    return null;
  }
}

let bestsellers = [];
let cart = [];
let currentTable = new URLSearchParams(window.location.search).get('table') || null;

// Consolidated Product Data from all sub-categories


function fetchBestsellers() {
  // Force local data usage to ensure items appear correctly with original images
  console.log('Forcing local menu data display');
  bestsellers = allMenuItems;
  renderBestsellers(bestsellers);
}

function renderBestsellers(items) {
  const container = document.getElementById('bestsellers') || document.getElementById('bestsellers-grid');
  if (!container) return;

  // Debug check
  if (!items || items.length === 0) {
    console.error('No items to render!');
    return;
  }

  // Simply use the provided items directly
  const ordered = items;

  container.innerHTML = ordered.map((item, index) => {
    let imgUrl = item.image || item.image_url;
    if (imgUrl && imgUrl.startsWith('assets/')) {
      imgUrl = '../../' + imgUrl;
    }
    // Use fallback if image is missing or is the default Unsplash placeholder
    const isDefault = imgUrl && imgUrl.includes('photo-1546069901');
    const displayImg = (imgUrl && !isDefault) ? imgUrl : getFallbackImage(item, index);
    const rating = typeof item.rating === 'number' ? item.rating : getRatingForItem(item);

    const fallback = getFallbackImage(item, index + 50); // Different seed for fallback

    return `
    <div class="bg-white dark:bg-[#2a1e19] rounded-[1.5rem] p-3 shadow-md border border-gray-100 dark:border-white/5 flex gap-4 items-center relative" data-category="${item.category}">
      <div class="absolute top-3 right-3 bg-white/90 dark:bg-black/60 px-2 py-1 rounded-full shadow-sm z-10">
        <span class="material-symbols-outlined text-[14px] text-green-600 dark:text-green-400">${getCategoryIcon(item.category)}</span>
      </div>
      <div class="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-gray-50 dark:bg-black/20 relative shrink-0">
        <img src="${displayImg}" class="w-full h-full object-cover" alt="${item.name}" loading="lazy" onerror="this.onerror=null;this.src='${fallback}'">
      </div>
      <div class="flex-1 min-w-0 flex flex-col h-24 md:h-32 justify-between py-0.5">
        <div>
          <h4 class="font-bold text-[13px] md:text-sm text-gray-900 dark:text-white leading-tight pr-6">${getMenuTranslation(item, 'name')}</h4>
          <div class="flex items-center gap-1 mt-1">
            <span class="material-symbols-outlined text-[14px] text-[#FFC107]" style="font-variation-settings: 'FILL' 1">star</span>
            <span class="text-[11px] text-gray-700 dark:text-gray-300 font-semibold">${Number(rating).toFixed(1)}</span>
            <span class="text-[10px] text-gray-400">(${Math.floor(Number(rating) * 25)}+)</span>
          </div>
          <p class="text-[10px] md:text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">${getMenuTranslation(item, 'description')}</p>
        </div>
        <div class="flex items-center justify-between mt-auto">
          <span class="text-xs font-bold text-primary">${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}DH</span>
          <a href="${buildCustomizationUrl(item)}" class="w-[84px] h-[36px] rounded-full bg-primary flex items-center justify-center text-white text-[12px] font-bold uppercase shadow-sm active:scale-95 transition-transform">
            ${getTranslation('add')}
          </a>
        </div>
      </div>
    </div>
  `}).join('');
}

function renderCategories(items) {
  // SUB-CATEGORIES to be displayed as circles with real images
  const subCategories = [
    { name: getTranslation('Tea & Infusion'), img: 'assets/subcat_icons/tea icon .png', link: '../tea and infusion sub cat├⌐gorie page/index.html' },
    { name: getTranslation('Milkshake'), img: 'assets/subcat_icons/milkshake icon.png', link: '../milkshake sub cat├⌐gorie page/index.html' },
    { name: getTranslation('Juice'), img: 'assets/subcat_icons/juces icon.png', link: '../juces sub cat├⌐gorie page/index.html' },
    { name: getTranslation('Sweet Pastries'), img: '../images/sub catégories icons/Snack Food.jpg', link: '../sweet pastries sub cat├⌐gorie page/index.html' },
    { name: getTranslation('Black Coffee'), img: 'assets/subcat_icons/black coffe icon.jpg', link: '../black coffee sub cat├⌐gorie page/index.html' },
    { name: getTranslation('Latte'), img: 'assets/subcat_icons/latt├⌐ icon.jpg', link: '../latt├⌐ hot drink sub cat├⌐gorie page/index.html' },
    { name: getTranslation('Smoothie'), img: 'assets/subcat_icons/smoothie icon.png', link: '../smothie sub cat├⌐gorie page/index.html' },
    { name: getTranslation('Toast'), img: 'assets/subcat_icons/sandwich or toast icon .jpg', link: '../toast brunch sub cat├⌐gorie page/index.html' },
    { name: getTranslation('Artisanal Bread'), img: 'assets/subcat_icons/artisanal bread.jpg', link: '../artisanal bread sub cat├⌐gorie page/index.html' }
  ];

  const container = document.getElementById('explore-categories');
  if (!container) return;

  container.innerHTML = subCategories.map(cat => `
    <div class="flex flex-col items-center gap-2 shrink-0 cursor-pointer group" onclick="window.location.href='${cat.link}'">
      <div class="p-[3px] rounded-full bg-gray-200 dark:bg-gray-700 group-hover:bg-primary transition-all">
        <div class="bg-white dark:bg-[#1a100c] p-1 rounded-full">
          <div class="w-16 h-16 rounded-full overflow-hidden relative">
            <img src="${cat.img}" alt="${cat.name}" loading="lazy" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" onerror="this.onerror=null;this.src='../../assets/waiter.jpg'">
          </div>
        </div>
      </div>
      <p class="text-[10px] text-gray-800 dark:text-white text-center leading-tight max-w-[5rem]">${cat.name}</p>
    </div>
  `).join('');
}

function getCategoryIcon(cat) {
  const icons = {
    'Brew': 'coffee',
    'Cold Brew': 'coffee', // Added Cold Brew
    'Pastry': 'bakery_dining',
    'Brunch': 'brunch_dining',
    'Cold Drink': 'local_bar',
    'Tea': 'emoji_food_beverage',
    'Coffee': 'coffee',
    'Juice': 'local_drink',
    'Smoothie': 'blender',
    'Shake': 'icecream',
    'Bread': 'breakfast_dining',
    'Toast': 'breakfast_dining'
  };
  return icons[cat] || 'restaurant';
}

function getRatingForItem(item) {
  const map = {
    'Coffee': 4.5,
    'Cold Brew': 4.5,
    'Tea': 4.4,
    'Juice': 4.3,
    'Smoothie': 4.4,
    'Shake': 4.3,
    'Pastry': 4.5,
    'Brunch': 4.4,
    'Toast': 4.3,
    'Bread': 4.4
  };
  const base = map[item.category] || 4.4;
  return base;
}

function buildCustomizationUrl(item) {
  if (!item) return '/pure_noir_espresso_customization_view_1/index.html';
  const category = (item.category || '').toLowerCase();
  let customizationPage = 'brunch_customization_view/index.html';
  if (category.includes('brunch') || category.includes('toast')) {
    customizationPage = 'toast_brunch_customization_view/index.html';
  } else if (category.includes('tea') || category.includes('infusion')) {
    customizationPage = 'tea_customization_view/index.html';
  } else if (category.includes('coffee') || category.includes('brew')) {
    customizationPage = 'pure_noir_espresso_customization_view_1/index.html';
  } else if (category.includes('pastry') || category.includes('bakery')) {
    customizationPage = 'fast_food_customization_view/index.html';
  } else if (category.includes('bread')) {
    customizationPage = 'petit pain bakery_customization_view/index.html';
  } else if (category.includes('juice') || category.includes('drink')) {
    customizationPage = 'orange juce_customization_view_1/index.html';
  } else if (category.includes('smoothie')) {
    customizationPage = 'smothie customisation review/index.html';
  } else if (category.includes('milkshake') || category.includes('shake')) {
    customizationPage = 'milkshake_customization_view/index.html';
  }

  let imgPath = item.image;
  if (imgPath && !imgPath.startsWith('/') && !imgPath.startsWith('http')) {
    if (imgPath.startsWith('../')) {
      imgPath = '/' + imgPath.replace(/^(\.\.\/)+/, '');
    } else {
      imgPath = '/' + imgPath;
    }
  }

  const params = new URLSearchParams({
    id: item.id || '',
    name: item.name || '',
    price: item.price ?? '',
    image: imgPath || '',
    category: item.category || ''
  });

  return `/${customizationPage}?${params.toString()}`;
}

function getFallbackImage(item, seed = 0) {
  // Try to match specific keywords in name to local assets
  const name = item.name.toLowerCase();
  if (name.includes('milkshake')) return '../../assets/close-up-milkshake-glass-plate_117406-7215.jpg';
  if (name.includes('smoothie')) return '../../assets/raspberry-smoothie_1150-18529.jpg';
  if (name.includes('juice') || name.includes('orange')) return '../../assets/glass-iced-orange-cocktail-garnished-with-orange-zest-strawberry-shape_140725-6038.avif';
  if (name.includes('tea')) return '../../assets/exotic-cocktail-closeup_181624-983.avif';
  if (name.includes('toast') || name.includes('benedict')) return '../../assets/croissant-benedict-salmon-with-poched-egg-hollandaise-sauce-served-with-fresh-salad_140725-1329.avif';
  if (name.includes('pancake')) return '../../assets/vertical-shot-pancakes-with-fruits-top_181624-23923.jpg';
  if (name.includes('pastry') || name.includes('croissant')) return '../../assets/pastry.jpg';
  if (name.includes('mango')) return '../../assets/delicious-indian-mango-drink-high-angle_23-2148734680.avif';

  // Fallback pool of high-quality images
  const pool = [
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500', // Salad/Bowl
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=500', // Pizza/Flatbread
    'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=500', // Toast/Egg
    'https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=500', // French Toast
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500', // Healthy Bowl
    'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=500', // Drink
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=500', // Coffee
    'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=500'  // Coffee beans
  ];

  // Deterministic selection based on item name char code sum + seed
  const safeName = item.name || 'item';
  const hash = safeName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + seed;
  return pool[hash % pool.length];
}

function startHeroCarousel() {
  console.log('Hero carousel is disabled in this script. using carousel-auto-loop.js instead.');
  return;
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Cart
  cart = getStoredCart();
  updateCartUI();

  // 2. Check for returning customization order
  try {
    const lastOrder = localStorage.getItem('stitch_last_order');
    if (lastOrder) {
      const order = JSON.parse(lastOrder);
      // Create a cart item from the order
      const cartItem = {
        id: 'custom-' + Date.now(), // Unique ID for custom item
        name: order.item,
        price: order.unit_price, // Use the customized unit price
        image: order.image && order.image.startsWith('assets/') ? '../../' + order.image : (order.image || '../../assets/waiter.jpg'), // Use passed image or fallback
        category: 'Custom',
        quantity: order.qty,
        options: order.options
      };
      
      // Add to cart
      cart.push(cartItem);
      updateCartUI();
      localStorage.setItem('stitch_cart', JSON.stringify(cart));
      
      // Clear the temp storage
      localStorage.removeItem('stitch_last_order');
    }
  } catch (e) {
    console.error('Error processing last order', e);
  }

  fetchBestsellers();
  renderCategories();
  handleTableContext();
  // startHeroCarousel(); // Disabled - using auto-loop instead
});

function handleTableContext() {
  if (!currentTable) return;

  // 1. Update Table Badge in UI
  const badge = document.getElementById('table-badge');
  if (badge) {
    badge.textContent = `Table ${currentTable}`;
    badge.classList.remove('hidden');
  }

  // 2. Check Reservation Status
  const reservations = JSON.parse(localStorage.getItem('stitch_reservations') || '[]');
  const isReserved = reservations.some(res => res.tableId === currentTable);

  if (isReserved) {
    showReservationOverlay();
  }
}

function showReservationOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex flex-col items-center justify-center p-8 text-center text-white';
  overlay.innerHTML = `
    <div class="w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center mb-6 border border-primary/30">
        <span class="material-symbols-outlined text-[48px] text-primary">event_busy</span>
    </div>
    <h2 class="text-3xl font-serif italic mb-2">Table Reserved</h2>
    <p class="text-gray-400 mb-8 max-w-xs">This table is currently booked for a client. Please see our staff for assistance.</p>
    <button onclick="window.history.back()" class="bg-primary text-white px-8 py-4 rounded-2xl font-bold shadow-glow">Go Back</button>
  `;
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
}

// Intercept Place Order to sync with Dashboard
const originalPlaceOrder = window.placeOrder; // Not defined yet or defined differently
window.placeOrder = () => {
  if (cart.length === 0) return;

  const orderData = {
    id: 'ORD-' + Math.floor(Math.random() * 10000).toString().padStart(3, '0'),
    table: currentTable || 'Online',
    items: cart,
    total: cart.reduce((acc, item) => acc + (item.price * item.quantity), 0),
    status: 'Received',
    time: Date.now()
  };

  // 1. Sync to LocalStorage for Dashboard
  const liveOrders = JSON.parse(localStorage.getItem('stitch_live_orders') || '[]');
  liveOrders.push(orderData);
  localStorage.setItem('stitch_live_orders', JSON.stringify(liveOrders));

  // 2. Clear Cart and Notify
  cart = [];
  localStorage.removeItem('cart');
  renderCart();

  // Custom success view
  showOrderSuccess(orderData.id);
};

function showOrderSuccess(orderId) {
  const success = document.createElement('div');
  success.className = 'fixed inset-0 bg-white dark:bg-[#1a100c] z-[110] flex flex-col items-center justify-center p-8 text-center';
  success.innerHTML = `
        <div class="w-32 h-32 bg-green-500/10 rounded-full flex items-center justify-center mb-8 relative">
            <div class="absolute inset-0 bg-green-500/5 rounded-full animate-ping"></div>
            <span class="material-symbols-outlined text-[64px] text-green-500">check_circle</span>
        </div>
        <h2 class="text-3xl font-serif italic mb-2">Order Confirmed!</h2>
        <p class="text-gray-500 mb-2">Your order <span class="font-bold text-primary">#${orderId}</span> is now being prepared.</p>
        <p class="text-xs text-gray-400 mb-10">We'll bring it to your table shortly.</p>
        <button onclick="location.reload()" class="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-10 py-4 rounded-2xl font-bold">Done</button>
    `;
  document.body.appendChild(success);
}

window.navigateToCategory = (category) => {
  const categoryId = category.toLowerCase();

  // Navigation logic for Main Categories
  if (categoryId === 'brew') {
    window.location.href = '../Brew cat├⌐gorie page/index.html';
    return;
  }
  if (categoryId === 'bakery' || categoryId === 'pastry' || categoryId === 'sweet pastries') {
    window.location.href = '../sweet pastries sub cat├⌐gorie page/index.html';
    return;
  }
  if (categoryId === 'cold drink') {
    window.location.href = '../cold drinks cat├⌐gorie page/index.html';
    return;
  }
  if (categoryId === 'branch') {
    console.log('Branch category selected');
  }
  if (categoryId === 'brunch') {
    window.location.href = '../long_scroll_brunch_explorer/index.html';
    return;
  }
  if (categoryId === 'toast') {
    window.location.href = '../toast brunch sub cat├⌐gorie page/index.html';
    return;
  }
  if (categoryId === 'tea' || categoryId === 'tea & infusion') {
    window.location.href = '../tea and infusion sub cat├⌐gorie page/index.html';
    return;
  }
  if (categoryId === 'milkshake' || categoryId === 'shake') { // Added shake alias
    window.location.href = '../milkshake sub cat├⌐gorie page/index.html';
    return;
  }
  if (categoryId === 'juice') {
    window.location.href = '../juces sub cat├⌐gorie page/index.html';
    return;
  }
  if (categoryId === 'black coffee') {
    window.location.href = '../black coffee sub cat├⌐gorie page/index.html';
    return;
  }
  if (categoryId === 'latte') {
    window.location.href = '../latt├⌐ hot drink sub cat├⌐gorie page/index.html';
    return;
  }
  if (categoryId === 'creme') { // Added creme
    window.location.href = '../creme or latt├⌐ fuite juces sub cat├⌐gorie page/index.html';
    return;
  }
  if (categoryId === 'smoothie') {
    window.location.href = '../smothie sub cat├⌐gorie page/index.html';
    return;
  }
  if (categoryId === 'artisanal bread' || categoryId === 'bread') { // Added bread alias
    window.location.href = '../artisanal bread sub cat├⌐gorie page/index.html';
    return;
  }

  // Fallback to filtering if something goes wrong, though paths should cover all
  filterByCategory(category);
};

window.filterByCategory = (category) => {
  const filtered = bestsellers.filter(i => i.category === category);
  renderBestsellers(filtered);
};

window.addToCart = (id) => {
  const itemFromBestsellers = bestsellers.find(i => i.id === id);
  const itemFromAll = typeof allMenuItems !== 'undefined' ? allMenuItems.find(i => i.id === id) : null;
  const item = itemFromBestsellers || itemFromAll;
  if (!item) {
    window.location.href = '/pure_noir_espresso_customization_view_1/index.html';
    return;
  }

  localStorage.setItem('stitch_customizing_item', JSON.stringify(item));
  window.location.href = buildCustomizationUrl(item);
};

function updateCartUI() {
  const badge = document.getElementById('cart-items-text');
  if (badge) {
    const total = cart.reduce((acc, item) => acc + item.quantity, 0);
    const itemsText = getTranslation('items');
    badge.textContent = `${total} ${itemsText}`;
    badge.classList.toggle('hidden', total === 0);
  }
}

function openOrderModal() {
  const modal = document.getElementById('order-modal');
  if (modal) {
    modal.classList.remove('hidden');
    renderCartItems();
  }
}

function closeOrderModal() {
  const modal = document.getElementById('order-modal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

function renderCartItems() {
  const container = document.getElementById('order-items');
  const subtotalEl = document.getElementById('modal-subtotal');
  const taxEl = document.getElementById('modal-tax');
  const totalEl = document.getElementById('modal-total');

  if (!container) return;

  container.innerHTML = '';

  let subtotal = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    const div = document.createElement('div');
    div.className = 'flex items-center gap-3 bg-gray-50 dark:bg-white/5 p-3 rounded-xl';

    // Get translated name
    const itemName = getMenuTranslation(item, 'name');

    div.innerHTML = `
      <div class="w-12 h-12 rounded-lg overflow-hidden shrink-0">
        <img src="${item.image}" class="w-full h-full object-cover" alt="${itemName}">
      </div>
      <div class="flex-1 min-w-0">
        <h4 class="font-bold text-sm truncate dark:text-white">${itemName}</h4>
        <div class="flex items-center gap-2 mt-1">
          <span class="text-xs text-gray-500 dark:text-gray-400">${item.price}DH</span>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <button onclick="updateItemQuantity('${item.id}', -1)" class="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold">-</button>
        <span class="text-sm font-bold w-4 text-center dark:text-white">${item.quantity}</span>
        <button onclick="updateItemQuantity('${item.id}', 1)">ADD</button>
      </div>
    `;
    container.appendChild(div);
  });

  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  if (subtotalEl) subtotalEl.textContent = `${subtotal.toFixed(2)}DH`;
  if (taxEl) taxEl.textContent = `${tax.toFixed(2)}DH`;
  if (totalEl) totalEl.textContent = `${total.toFixed(2)}DH`;
}

window.updateItemQuantity = (id, change) => {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.id !== id);
    }
    updateCartUI();
    renderCartItems();
    localStorage.setItem('stitch_cart', JSON.stringify(cart));
  }
};

// Helper to get stored cart
function getStoredCart() {
  try {
    const stored = localStorage.getItem('stitch_cart');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Setup basic events
function setupEvents() {
  const searchBtn = document.querySelector('.material-symbols-outlined.text-xl'); // Assuming search icon
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      alert(getTranslation('search_feature_soon'));
    });
  }

  const cartBtn = document.getElementById('view-cart-btn');
  if (cartBtn) {
    cartBtn.addEventListener('click', openOrderModal);
  }

  const closeBtn = document.getElementById('order-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeOrderModal);
  }
}

// Language Helper
const translations = {
  en: {
    table_12: "Table 12",
    stitch_cafe: "Stitch Caf├⌐",
    dine_in: "Dine In",
    take_away: "Take Away",
    chefs_choice: "Chef's Choice",
    no1_seller: "N┬░1 seller",
    brunch: "BRUNCH",
    favorites: "FAVORITES",
    savory_brunch: "Savory brunch classics.",
    order_now: "Order Now",
    new_arrival: "New Arrival",
    hot: "≡ƒöÑ Hot",
    velvet: "VELVET",
    sips: "SIPS",
    smooth_iced_blends: "Smooth iced blends.",
    morning_special: "Morning Special",
    trend: "Trend",
    morning: "MORNING",
    brew: "BREW",
    freshly_brewed_coffee: "Freshly brewed coffee.",
    sweet_treats: "Sweet Treats",
    popular: "Γ¡É Popular",
    sweet: "SWEET",
    delights: "DELIGHTS",
    fluffy_pancakes: "Fluffy pancakes, sweet treats.",
    explore: "Explore",
    view_all: "View All",
    milkshake: "Milkshake",
    juice: "Juice",
    sweet_pastries: "Sweet Pastries",
    toast: "Toast",
    black_coffee: "Black Coffee",
    latte: "Latte",
    smoothie: "Smoothie",
    tea_infusion: "Tea & Infusion",
    artisanal_bread: "Pastry",
    our_menu: "Our Menu",
    toasts_bowls: "Toasts & Bowls",
    coffee_tea: "Coffee & Tea",
    cold_drink: "Cold Drink",
    juices_shakes: "Juices & Shakes",
    pastry: "Pastry",
    bakery_sweets: "Bakery & Sweets",
    trending_now: "Trending Now",
    all_items: "All variety of items",
    home: "Home",
    cart: "Cart",
    profile: "Profile",
    search_placeholder: "Search...",
    search_feature_soon: "Search feature coming soon!",
    items: "items",
    add: "ADD",
    subtotal: "Subtotal",
    tax: "Tax (10%)",
    total: "Total",
    close: "Close",
    place_order: "Place Order",
    order_status: "Order Status",
    received: "Received",
    // Categories
    'Tea & Infusion': "Tea & Infusion",
    'Milkshake': "Milkshake",
    'Juice': "Juice",
    'Sweet Pastries': "Sweet Pastries",
    'Black Coffee': "Black Coffee",
    'Latte': "Latte",
    'Smoothie': "Smoothie",
    'Toast': "Toast",
    'Artisanal Bread': "Pastry"
  },
  fr: {
    table_12: "Table 12",
    stitch_cafe: "Stitch Caf├⌐",
    dine_in: "Sur Place",
    take_away: "├Ç Emporter",
    chefs_choice: "Choix du Chef",
    no1_seller: "N┬░1 des ventes",
    brunch: "BRUNCH",
    favorites: "FAVORIS",
    savory_brunch: "Classiques sal├⌐s du brunch.",
    order_now: "Commander",
    new_arrival: "Nouveaut├⌐",
    hot: "≡ƒöÑ Chaud",
    velvet: "VELOURS",
    sips: "GORGEES",
    smooth_iced_blends: "M├⌐langes glac├⌐s onctueux.",
    morning_special: "Sp├⌐cial Matin",
    trend: "Tendance",
    morning: "MATIN",
    brew: "INFUSION",
    freshly_brewed_coffee: "Caf├⌐ fra├«chement pr├⌐par├⌐.",
    sweet_treats: "Douceurs Sucr├⌐es",
    popular: "Γ¡É Populaire",
    sweet: "DOUCEUR",
    delights: "DELICES",
    fluffy_pancakes: "Pancakes moelleux, douceurs.",
    explore: "Explorer",
    view_all: "Voir Tout",
    milkshake: "Milkshake",
    juice: "Jus",
    sweet_pastries: "P├ótisseries Sucr├⌐es",
    toast: "Tartine",
    black_coffee: "Caf├⌐ Noir",
    latte: "Latte",
    smoothie: "Smoothie",
    tea_infusion: "Th├⌐ & Infusion",
    artisanal_bread: "Pain Artisanal",
    our_menu: "Notre Menu",
    toasts_bowls: "Tartines & Bols",
    coffee_tea: "Caf├⌐ & Th├⌐",
    cold_drink: "Boissons Froides",
    juices_shakes: "Jus & Shakes",
    pastry: "P├ótisserie",
    bakery_sweets: "Boulangerie & Douceurs",
    trending_now: "Tendances",
    all_items: "Toute la vari├⌐t├⌐",
    home: "Accueil",
    cart: "Panier",
    profile: "Profil",
    search_placeholder: "Rechercher...",
    search_feature_soon: "Fonction de recherche bient├┤t disponible !",
    items: "articles",
    add: "AJOUTER",
    subtotal: "Sous-total",
    tax: "Taxe (10%)",
    total: "Total",
    close: "Fermer",
    place_order: "Commander",
    order_status: "Statut de la commande",
    received: "Re├ºu",
    // Categories
    'Tea & Infusion': "Th├⌐ & Infusion",
    'Milkshake': "Milkshake",
    'Juice': "Jus",
    'Sweet Pastries': "P├ótisseries Sucr├⌐es",
    'Black Coffee': "Caf├⌐ Noir",
    'Latte': "Latte",
    'Smoothie': "Smoothie",
    'Toast': "Tartine",
    'Artisanal Bread': "Pain Artisanal"
  },
  ar: {
    table_12: "╪╖╪º┘ê┘ä╪⌐ 12",
    stitch_cafe: "╪│╪¬┘è╪¬╪┤ ┘â╪º┘ü┘è┘ç",
    dine_in: "╪¬┘å╪º┘ê┘ä ┘ç┘å╪º",
    take_away: "╪│┘ü╪▒┘è",
    chefs_choice: "╪º╪«╪¬┘è╪º╪▒ ╪º┘ä╪┤┘è┘ü",
    no1_seller: "╪º┘ä╪ú┘â╪½╪▒ ┘à╪¿┘è╪╣╪º┘ï",
    brunch: "┘ü╪╖┘ê╪▒ ┘à╪¬╪ú╪«╪▒",
    favorites: "╪º┘ä┘à┘ü╪╢┘ä╪⌐",
    savory_brunch: "┘â┘ä╪º╪│┘è┘â┘è╪º╪¬ ╪º┘ä┘ü╪╖┘ê╪▒ ╪º┘ä┘à╪º┘ä╪¡.",
    order_now: "╪º╪╖┘ä╪¿ ╪º┘ä╪ó┘å",
    new_arrival: "┘ê╪╡┘ä ╪¡╪»┘è╪½╪º┘ï",
    hot: "≡ƒöÑ ╪│╪º╪«┘å",
    velvet: "┘à╪«┘à┘ä┘è",
    sips: "╪▒╪┤┘ü╪º╪¬",
    smooth_iced_blends: "┘à╪┤╪▒┘ê╪¿╪º╪¬ ┘à╪½┘ä╪¼╪⌐ ┘å╪º╪╣┘à╪⌐.",
    morning_special: "╪╣╪▒╪╢ ╪º┘ä╪╡╪¿╪º╪¡",
    trend: "╪▒╪º╪ª╪¼",
    morning: "╪º┘ä╪╡╪¿╪º╪¡",
    brew: "┘é┘ç┘ê╪⌐",
    freshly_brewed_coffee: "┘é┘ç┘ê╪⌐ ╪╖╪º╪▓╪¼╪⌐ ╪º┘ä╪¬╪¡╪╢┘è╪▒.",
    sweet_treats: "╪¡┘ä┘ê┘è╪º╪¬",
    popular: "Γ¡É ┘à╪┤┘ç┘ê╪▒",
    sweet: "╪¡┘ä┘ê┘ë",
    delights: "┘ä╪░┘è╪░╪⌐",
    fluffy_pancakes: "╪¿╪º┘å ┘â┘è┘â ┘ç╪┤╪î ╪¡┘ä┘ê┘è╪º╪¬.",
    explore: "╪º╪│╪¬┘â╪┤┘ü",
    view_all: "╪╣╪▒╪╢ ╪º┘ä┘â┘ä",
    milkshake: "┘à┘è┘ä┘â ╪┤┘è┘â",
    juice: "╪╣╪╡┘è╪▒",
    sweet_pastries: "┘à╪╣╪¼┘å╪º╪¬ ╪¡┘ä┘ê╪⌐",
    toast: "╪¬┘ê╪│╪¬",
    black_coffee: "┘é┘ç┘ê╪⌐ ╪│┘ê╪»╪º╪í",
    latte: "┘ä╪º╪¬┘è┘ç",
    smoothie: "╪│┘à┘ê╪½┘è",
    tea_infusion: "╪┤╪º┘è ┘ê╪ú╪╣╪┤╪º╪¿",
    artisanal_bread: "╪«╪¿╪▓ ╪¡╪▒┘ü┘è",
    our_menu: "┘é╪º╪ª┘à╪¬┘å╪º",
    toasts_bowls: "╪¬┘ê╪│╪¬ ┘ê╪│┘ä╪╖╪º┘å┘è╪º╪¬",
    coffee_tea: "┘é┘ç┘ê╪⌐ ┘ê╪┤╪º┘è",
    cold_drink: "┘à╪┤╪▒┘ê╪¿╪º╪¬ ╪¿╪º╪▒╪»╪⌐",
    juices_shakes: "╪╣╪╡╪º╪ª╪▒ ┘ê┘à╪«┘ü┘ê┘é╪º╪¬",
    pastry: "┘à╪╣╪¼┘å╪º╪¬",
    bakery_sweets: "┘à╪«╪¿┘ê╪▓╪º╪¬ ┘ê╪¡┘ä┘ê┘è╪º╪¬",
    trending_now: "╪º┘ä╪ú┘â╪½╪▒ ╪▒┘ê╪º╪¼╪º┘ï",
    all_items: "╪¼┘à┘è╪╣ ╪º┘ä╪ú╪╡┘å╪º┘ü",
    home: "╪º┘ä╪▒╪ª┘è╪│┘è╪⌐",
    cart: "╪º┘ä╪│┘ä╪⌐",
    profile: "╪º┘ä┘à┘ä┘ü ╪º┘ä╪┤╪«╪╡┘è",
    search_placeholder: "╪¿╪¡╪½...",
    add: "╪Ñ╪╢╪º┘ü╪⌐",
    search_feature_soon: "┘à┘è╪▓╪⌐ ╪º┘ä╪¿╪¡╪½ ┘é╪▒┘è╪¿╪º!",
    items: "╪╣┘å╪º╪╡╪▒",
    order_status: "╪¡╪º┘ä╪⌐ ╪º┘ä╪╖┘ä╪¿",
    received: "╪¬┘à ╪º┘ä╪º╪│╪¬┘ä╪º┘à",
    subtotal: "╪º┘ä┘à╪¼┘à┘ê╪╣ ╪º┘ä┘ü╪▒╪╣┘è",
    tax: "╪╢╪▒┘è╪¿╪⌐ (10%)",
    total: "╪º┘ä┘à╪¼┘à┘ê╪╣",
    close: "╪Ñ╪║┘ä╪º┘é",
    place_order: "╪¬╪ú┘â┘è╪» ╪º┘ä╪╖┘ä╪¿",
    // Categories
    'Tea & Infusion': "╪┤╪º┘è ┘ê╪ú╪╣╪┤╪º╪¿",
    'Milkshake': "┘à┘è┘ä┘â ╪┤┘è┘â",
    'Juice': "╪╣╪╡┘è╪▒",
    'Sweet Pastries': "┘à╪╣╪¼┘å╪º╪¬ ╪¡┘ä┘ê╪⌐",
    'Black Coffee': "┘é┘ç┘ê╪⌐ ╪│┘ê╪»╪º╪í",
    'Latte': "┘ä╪º╪¬┘è┘ç",
    'Smoothie': "╪│┘à┘ê╪½┘è",
    'Toast': "╪¬┘ê╪│╪¬",
    'Artisanal Bread': "╪«╪¿╪▓ ╪¡╪▒┘ü┘è"
  }
};

const menuTranslations = {
  // Brunch
  'brunch-1': {
    fr: { name: "Omelette Fermi├¿re", description: "┼Æufs bio, cheddar, herbes fra├«ches." },
    ar: { name: "╪╣╪¼╪⌐ ╪▒┘è┘ü┘è╪⌐", description: "╪¿┘è╪╢ ╪╣╪╢┘ê┘è╪î ╪¼╪¿┘å ╪┤┘è╪»╪▒╪î ╪ú╪╣╪┤╪º╪¿ ╪╖╪º╪▓╪¼╪⌐." }
  },
  'brunch-2': {
    fr: { name: "┼Æufs B├⌐n├⌐dicte", description: "Muffin anglais, bacon, sauce hollandaise." },
    ar: { name: "╪¿┘è╪╢ ╪¿┘å╪»┘è┘â╪¬", description: "┘à╪º┘ü┘å ╪Ñ┘å╪¼┘ä┘è╪▓┘è╪î ┘ä╪¡┘à ┘à┘é╪»╪»╪î ╪╡┘ä╪╡╪⌐ ┘ç┘ê┘ä┘å╪»┘è╪▓." }
  },
  'brunch-3': {
    fr: { name: "Shakshuka ├ëpic├⌐e", description: "┼Æufs poch├⌐s dans une sauce tomate ├⌐pic├⌐e." },
    ar: { name: "╪┤┘â╪┤┘ê┘â╪⌐ ╪¡╪º╪▒╪⌐", description: "╪¿┘è╪╢ ┘à╪│┘ä┘ê┘é ┘ü┘è ╪╡┘ä╪╡╪⌐ ╪╖┘à╪º╪╖┘à ╪¡╪º╪▒╪⌐." }
  },
  'brunch-4': {
    fr: { name: "Po├¬l├⌐e du Jardin", description: "Pommes de terre r├┤ties, chou fris├⌐, poivrons." },
    ar: { name: "┘à┘é┘ä╪º╪⌐ ╪º┘ä╪¡╪»┘è┘é╪⌐", description: "╪¿╪╖╪º╪╖╪│ ┘à╪┤┘ê┘è╪⌐╪î ┘â╪▒┘å╪¿╪î ┘ü┘ä┘ü┘ä." }
  },
  'brunch-5': {
    fr: { name: "Burrito Brunch", description: "Chorizo, ┼ôufs brouill├⌐s, haricots." },
    ar: { name: "╪¿┘ê╪▒┘è╪¬┘ê ╪º┘ä┘ü╪╖┘ê╪▒", description: "╪¬╪┤┘ê╪▒┘è╪▓┘ê╪î ╪¿┘è╪╢ ┘à╪«┘ü┘ê┘é╪î ┘ü╪º╪╡┘ê┘ä┘è╪º." }
  },
  'brunch-6': {
    fr: { name: "Steak & ┼Æufs", description: "Faux-filet 6oz, deux ┼ôufs au choix." },
    ar: { name: "╪│╪¬┘è┘â ┘ê╪¿┘è╪╢", description: "╪┤╪▒┘è╪¡╪⌐ ┘ä╪¡┘à 6 ╪ú┘ê┘å╪╡╪⌐╪î ╪¿┘è╪╢╪¬╪º┘å ╪¡╪│╪¿ ╪º┘ä╪▒╪║╪¿╪⌐." }
  },
  'brunch-7': {
    fr: { name: "Blanc d'┼Æuf Fitness", description: "├ëpinards, fromage de ch├¿vre, blancs d'┼ôufs." },
    ar: { name: "╪¿┘è╪º╪╢ ╪º┘ä╪¿┘è╪╢ ╪º┘ä╪╡╪¡┘è", description: "╪│╪¿╪º┘å╪«╪î ╪¼╪¿┘å ┘à╪º╪╣╪▓╪î ╪¿┘è╪º╪╢ ╪¿┘è╪╢." }
  },
  'brunch-8': {
    fr: { name: "Tacos Brunch", description: "Tortillas de ma├»s, oignons marin├⌐s, avocat." },
    ar: { name: "╪¬╪º┘â┘ê ╪º┘ä┘ü╪╖┘ê╪▒", description: "╪¬┘ê╪▒╪¬┘è┘ä╪º ╪░╪▒╪⌐╪î ╪¿╪╡┘ä ┘à╪«┘ä┘ä╪î ╪ú┘ü┘ê┘â╪º╪»┘ê." }
  },
  'brunch-9': {
    fr: { name: "Frittata de Fer", description: "Oignons, pommes de terre, cheddar vieilli." },
    ar: { name: "┘ü╪▒┘è╪¬╪º╪¬╪º ╪º┘ä╪¡╪»┘è╪»", description: "╪¿╪╡┘ä╪î ╪¿╪╖╪º╪╖╪│╪î ╪┤┘è╪»╪▒ ┘à╪╣╪¬┘é." }
  },
  'brunch-10': {
    fr: { name: "D├⌐lice A├ºa├»", description: "Baies m├⌐lang├⌐es, granola, miel." },
    ar: { name: "╪»┘è┘ä┘â ╪ó╪│╪º┘è", description: "╪¬┘ê╪¬ ┘à╪┤┘â┘ä╪î ╪¼╪▒╪º┘å┘ê┘ä╪º╪î ╪╣╪│┘ä." }
  },
  'brunch-11': {
    fr: { name: "Gaufre Belge", description: "Gaufres croustillantes, baies, cr├¿me." },
    ar: { name: "┘ê╪º┘ü┘ä ╪¿┘ä╪¼┘è┘â┘è", description: "┘ê╪º┘ü┘ä ┘à┘é╪▒┘à╪┤╪î ╪¬┘ê╪¬╪î ┘â╪▒┘è┘à╪⌐." }
  },
  'brunch-12': {
    fr: { name: "Petit D├⌐jeuner Anglais", description: "Saucisse, bacon, ┼ôufs, haricots, toast." },
    ar: { name: "┘ü╪╖┘ê╪▒ ╪Ñ┘å╪¼┘ä┘è╪▓┘è ┘â╪º┘à┘ä", description: "╪│╪¼┘é╪î ┘ä╪¡┘à ┘à┘é╪»╪»╪î ╪¿┘è╪╢╪î ┘ü╪º╪╡┘ê┘ä┘è╪º╪î ╪¬┘ê╪│╪¬." }
  },

  // Brew
  'brew-1': {
    fr: { name: "Nitro Cold Brew", description: "Infusion 18h, infus├⌐ ├á l'azote." },
    ar: { name: "┘å┘è╪¬╪▒┘ê ┘â┘ê┘ä╪» ╪¿╪▒┘ê", description: "┘å┘é╪╣ 18 ╪│╪º╪╣╪⌐╪î ┘à╪┤╪¿╪╣ ╪¿╪º┘ä┘å┘è╪¬╪▒┘ê╪¼┘è┘å." }
  },
  'brew-2': {
    fr: { name: "Matcha C├⌐r├⌐monial", description: "Matcha d'Uji avec lait d'avoine." },
    ar: { name: "┘à╪º╪¬╪┤╪º ╪º╪¡╪¬┘ü╪º┘ä┘è", description: "┘à╪º╪¬╪┤╪º ┘à┘å ╪ú┘ê╪¼┘è ┘à╪╣ ╪¡┘ä┘è╪¿ ╪º┘ä╪┤┘ê┘ü╪º┘å." }
  },
  'brew-3': {
    fr: { name: "Yirgacheffe ├ëthiopien", description: "Notes florales avec une finale citronn├⌐e." },
    ar: { name: "┘è╪▒╪¼╪º╪┤┘è┘ü ╪Ñ╪½┘è┘ê╪¿┘è", description: "┘å┘â┘ç╪º╪¬ ╪▓┘ç╪▒┘è╪⌐ ┘à╪╣ ┘ä┘à╪│╪⌐ ╪¡┘à╪╢┘è╪⌐." }
  },
  'brew-4': {
    fr: { name: "Dirty Masala Chai", description: "├ëpices maison, double dose." },
    ar: { name: "╪»┘è╪▒╪¬┘è ┘à╪º╪│╪º┘ä╪º ╪¬╪┤╪º┘è", description: "╪¬┘ê╪º╪¿┘ä ┘à┘å╪▓┘ä┘è╪⌐╪î ╪¼╪▒╪╣╪⌐ ┘à╪▓╪»┘ê╪¼╪⌐." }
  },
  'brew-5': {
    fr: { name: "Cortado Lait d'Avoine", description: "Parts ├⌐gales expresso & lait." },
    ar: { name: "┘â┘ê╪▒╪¬╪º╪»┘ê ╪¡┘ä┘è╪¿ ╪º┘ä╪┤┘ê┘ü╪º┘å", description: "┘â┘à┘è╪º╪¬ ┘à╪¬╪│╪º┘ê┘è╪⌐ ┘à┘å ╪º┘ä╪Ñ╪│╪¿╪▒┘è╪│┘ê ┘ê╪º┘ä╪¡┘ä┘è╪¿." }
  },
  'brew-6': {
    fr: { name: "Miel Lavande", description: "Infusion florale avec miel local." },
    ar: { name: "╪╣╪│┘ä ╪º┘ä┘ä╪º┘ü┘å╪»╪▒", description: "┘å┘é┘è╪╣ ╪▓┘ç╪▒┘è ┘à╪╣ ╪╣╪│┘ä ┘à╪¡┘ä┘è." }
  },
  'brew-7': {
    fr: { name: "Curcuma Dor├⌐", description: "Infusion curative ├⌐pic├⌐e." },
    ar: { name: "┘â╪▒┘â┘à ╪░┘ç╪¿┘è", description: "┘à╪┤╪▒┘ê╪¿ ╪╣┘ä╪º╪¼┘è ┘à╪¬╪¿┘ä." }
  },
  'brew-8': {
    fr: { name: "Caramel Macchiato", description: "Expresso ├⌐tag├⌐ & vanille." },
    ar: { name: "┘â╪▒╪º┘à┘è┘ä ┘à╪º┘â┘è╪º╪¬┘ê", description: "╪╖╪¿┘é╪º╪¬ ╪Ñ╪│╪¿╪▒┘è╪│┘ê ┘ê┘ü╪º┘å┘è┘ä┘è╪º." }
  },
  'brew-9': {
    fr: { name: "V60 Origine Unique", description: "Perfection vers├⌐e ├á la main." },
    ar: { name: "V60 ╪ú╪╡┘ä ┘ê╪º╪¡╪»", description: "╪¬╪¡╪╢┘è╪▒ ┘è╪»┘ê┘è ┘à╪¬┘é┘å." }
  },
  'brew-10': {
    fr: { name: "Infusion Myrtille", description: "M├⌐lange riche en antioxydants." },
    ar: { name: "┘å┘é┘è╪╣ ╪º┘ä╪¬┘ê╪¬ ╪º┘ä╪ú╪▓╪▒┘é", description: "╪«┘ä┘è╪╖ ╪║┘å┘è ╪¿┘à╪╢╪º╪»╪º╪¬ ╪º┘ä╪ú┘â╪│╪»╪⌐." }
  },

  // Artisanal Bread
  'bread-1': {
    fr: { name: "Babka Chocolat", description: "Tourbillon de ganache chocolat noir riche." },
    ar: { name: "╪¿╪º╪¿┘â╪º ╪º┘ä╪┤┘ê┘â┘ê┘ä╪º╪¬╪⌐", description: "╪»┘ê╪º┘à╪⌐ ╪║╪º┘å╪º╪┤ ╪º┘ä╪┤┘ê┘â┘ê┘ä╪º╪¬╪⌐ ╪º┘ä╪»╪º┘â┘å╪⌐ ╪º┘ä╪║┘å┘è╪⌐." }
  },
  'bread-2': {
    fr: { name: "Multigrains", description: "Garni ├á la main de lin & avoine." },
    ar: { name: "╪«╪¿╪▓ ┘à╪¬╪╣╪»╪» ╪º┘ä╪¡╪¿┘ê╪¿", description: "┘à╪║╪╖┘ë ┘è╪»┘ê┘è╪º┘ï ╪¿╪º┘ä┘â╪¬╪º┘å ┘ê╪º┘ä╪┤┘ê┘ü╪º┘å." }
  },
  'bread-3': {
    fr: { name: "Pain de Seigle Noir", description: "Seigle dense style allemand robuste." },
    ar: { name: "╪▒╪║┘è┘ü ╪º┘ä╪¼╪º┘ê╪»╪º╪▒ ╪º┘ä╪»╪º┘â┘å", description: "╪¼╪º┘ê╪»╪º╪▒ ┘â╪½┘è┘ü ╪╣┘ä┘ë ╪º┘ä╪╖╪▒╪º╪▓ ╪º┘ä╪ú┘ä┘à╪º┘å┘è." }
  },
  'bread-4': {
    fr: { name: "Focaccia aux Herbes", description: "Romarin, ail & huile d'olive." },
    ar: { name: "┘ü┘ê┘â╪º╪┤┘è╪º ╪¿╪º┘ä╪ú╪╣╪┤╪º╪¿", description: "╪Ñ┘â┘ä┘è┘ä ╪º┘ä╪¼╪¿┘ä╪î ╪½┘ê┘à ┘ê╪▓┘è╪¬ ╪▓┘è╪¬┘ê┘å." }
  },
  'bread-5': {
    fr: { name: "Brioche au Miel", description: "Pain du matin ultra-doux et beurr├⌐." },
    ar: { name: "╪¿╪▒┘è┘ê╪┤ ╪¿╪º┘ä╪╣╪│┘ä", description: "╪▒╪║┘è┘ü ╪╡╪¿╪º╪¡┘è ┘ü╪º╪ª┘é ╪º┘ä┘å╪╣┘ê┘à╪⌐ ┘ê╪º┘ä╪▓╪¿╪»╪⌐." }
  },
  'bread-6': {
    fr: { name: "Bl├⌐ Moulu sur Pierre", description: "100% grains entiers nutritifs." },
    ar: { name: "┘é┘à╪¡ ┘à╪╖╪¡┘ê┘å ╪╣┘ä┘ë ╪º┘ä╪¡╪¼╪▒", description: "╪¡╪¿┘ê╪¿ ┘â╪º┘à┘ä╪⌐ ┘à╪║╪░┘è╪⌐ 100%." }
  },
  'bread-7': {
    fr: { name: "Baguette Parisienne", description: "Cro├╗te classique avec mie a├⌐r├⌐e." },
    ar: { name: "╪¿╪º╪║┘è╪¬ ╪¿╪º╪▒┘è╪│┘è", description: "┘é╪┤╪▒╪⌐ ┘â┘ä╪º╪│┘è┘â┘è╪⌐ ┘à╪╣ ┘ä╪¿ ┘ç┘ê╪º╪ª┘è." }
  },
  'bread-8': {
    fr: { name: "Canneberge Noix", description: "Pain artisanal doux & acidul├⌐." },
    ar: { name: "╪¬┘ê╪¬ ╪¿╪▒┘è ┘ê╪¼┘ê╪▓", description: "╪▒╪║┘è┘ü ╪¡╪▒┘ü┘è ╪¡┘ä┘ê ┘ê╪¡╪º┘à╪╢." }
  },

  // Black Coffee
  'coffee-1': {
    fr: { name: "Flat White Velours", description: "Double dose, micromousse soyeuse" },
    ar: { name: "┘ü┘ä╪º╪¬ ┘ê╪º┘è╪¬ ┘à╪«┘à┘ä┘è", description: "╪¼╪▒╪╣╪⌐ ┘à╪▓╪»┘ê╪¼╪⌐╪î ╪▒╪║┘ê╪⌐ ┘å╪º╪╣┘à╪⌐ ╪¡╪▒┘è╪▒┘è╪⌐" }
  },
  'coffee-2': {
    fr: { name: "Kyoto Cold Brew", description: "Extraction goutte ├á goutte lente 12h" },
    ar: { name: "┘â┘è┘ê╪¬┘ê ┘â┘ê┘ä╪» ╪¿╪▒┘ê", description: "╪º╪│╪¬╪«┘ä╪º╪╡ ╪¿╪º┘ä╪¬┘å┘é┘è╪╖ ╪º┘ä╪¿╪╖┘è╪í ┘ä┘à╪»╪⌐ 12 ╪│╪º╪╣╪⌐" }
  },
  'coffee-3': {
    fr: { name: "Latte Lait d'Avoine", description: "Cr├⌐meux, sans noix, v├⌐g├⌐talien" },
    ar: { name: "┘ä╪º╪¬┘è┘ç ╪¡┘ä┘è╪¿ ╪º┘ä╪┤┘ê┘ü╪º┘å", description: "┘â╪▒┘è┘à┘è╪î ╪«╪º┘ä┘è ┘à┘å ╪º┘ä┘à┘â╪│╪▒╪º╪¬╪î ┘å╪¿╪º╪¬┘è" }
  },
  'coffee-4': {
    fr: { name: "Espresso Origine Unique", description: "Notes de baies intenses" },
    ar: { name: "╪Ñ╪│╪¿╪▒┘è╪│┘ê ╪ú╪╡┘ä ┘ê╪º╪¡╪»", description: "┘å┘â┘ç╪º╪¬ ╪¬┘ê╪¬ ┘é┘ê┘è╪⌐" }
  },
  'coffee-5': {
    fr: { name: "Moka Noir", description: "70% Cacao, Double Expresso" },
    ar: { name: "┘à┘ê┘â╪º ╪»╪º┘â┘å", description: "70% ┘â╪º┘â╪º┘ê╪î ╪Ñ╪│╪¿╪▒┘è╪│┘ê ┘à╪▓╪»┘ê╪¼" }
  },

  // Cold Drinks
  'cold-1': {
    fr: { name: "Jus d'Orange Frais", description: "Oranges Valencia press├⌐es ├á froid" },
    ar: { name: "╪╣╪╡┘è╪▒ ╪¿╪▒╪¬┘é╪º┘ä ╪╖╪º╪▓╪¼", description: "╪¿╪▒╪¬┘é╪º┘ä ┘ü╪º┘ä┘å╪│┘è╪º ┘à╪╣╪╡┘ê╪▒ ╪╣┘ä┘ë ╪º┘ä╪¿╪º╪▒╪»" }
  },
  'cold-2': {
    fr: { name: "Smoothie Fraise", description: "Yaourt grec, pur├⌐e de fraise" },
    ar: { name: "╪│┘à┘ê╪½┘è ╪º┘ä┘ü╪▒╪º┘ê┘ä╪⌐", description: "╪▓╪¿╪º╪»┘è ┘è┘ê┘å╪º┘å┘è╪î ┘ç╪▒┘è╪│ ╪º┘ä┘ü╪▒╪º┘ê┘ä╪⌐" }
  },
  'cold-3': {
    fr: { name: "Shake Chocolat", description: "70% cacao, glace vanille" },
    ar: { name: "╪┤┘è┘â ╪º┘ä╪┤┘ê┘â┘ê┘ä╪º╪¬╪⌐", description: "70% ┘â╪º┘â╪º┘ê╪î ╪ó┘è╪│ ┘â╪▒┘è┘à ┘ü╪º┘å┘è┘ä┘è╪º" }
  },
  'cold-4': {
    fr: { name: "Latte Glac├⌐", description: "Double dose sur lait glac├⌐" },
    ar: { name: "┘ä╪º╪¬┘è┘ç ┘à╪½┘ä╪¼", description: "╪¼╪▒╪╣╪⌐ ┘à╪▓╪»┘ê╪¼╪⌐ ╪╣┘ä┘ë ╪¡┘ä┘è╪¿ ╪¿╪º╪▒╪»" }
  },
  'cold-5': {
    fr: { name: "Mango Lassi", description: "Mangue Alphonso, yaourt, cardamome" },
    ar: { name: "┘à╪º┘å╪¼┘ê ┘ä╪º╪│┘è", description: "┘à╪º┘å╪¼┘ê ╪ú┘ä┘ü┘ê┘å╪│┘ê╪î ╪▓╪¿╪º╪»┘è╪î ┘ç┘è┘ä" }
  },
  'cold-6': {
    fr: { name: "Cold Brew", description: "Infusion 12h, finale douce" },
    ar: { name: "┘â┘ê┘ä╪» ╪¿╪▒┘ê", description: "┘å┘é╪╣ 12 ╪│╪º╪╣╪⌐╪î ┘å┘ç╪º┘è╪⌐ ╪│┘ä╪│╪⌐" }
  },

  // Creme/Latte
  'creme-1': {
    fr: { name: "Latte Orange Cr├⌐meux", description: "Orange fra├«che avec mousse de lait" },
    ar: { name: "┘ä╪º╪¬┘è┘ç ╪¿╪▒╪¬┘é╪º┘ä ┘â╪▒┘è┘à┘è", description: "╪¿╪▒╪¬┘é╪º┘ä ╪╖╪º╪▓╪¼ ┘à╪╣ ╪▒╪║┘ê╪⌐ ╪¡┘ä┘è╪¿" }
  },
  'creme-2': {
    fr: { name: "├ëtincelle Agrumes", description: "Citron-lime avec menthe" },
    ar: { name: "╪┤╪▒╪º╪▒╪⌐ ╪º┘ä╪¡┘à╪╢┘è╪º╪¬", description: "┘ä┘è┘à┘ê┘å ┘ê┘ä┘è┘à┘ê┘å ╪¡╪º┘à╪╢ ┘à╪╣ ┘å╪╣┘å╪º╪╣" }
  },
  'creme-3': {
    fr: { name: "Fizz Mangue Cr├¿me", description: "Pur├⌐e de mangue et cr├¿me l├⌐g├¿re" },
    ar: { name: "┘ü┘è╪▓ ┘à╪º┘å╪¼┘ê ┘ê┘â╪▒┘è┘à╪⌐", description: "┘ç╪▒┘è╪│ ┘à╪º┘å╪¼┘ê ┘ê┘â╪▒┘è┘à╪⌐ ╪«┘ü┘è┘ü╪⌐" }
  },
  'creme-4': {
    fr: { name: "Jus de Pomme Classique", description: "Pommes press├⌐es ├á froid" },
    ar: { name: "╪╣╪╡┘è╪▒ ╪¬┘ü╪º╪¡ ┘â┘ä╪º╪│┘è┘â┘è", description: "╪¬┘ü╪º╪¡ ┘à╪╣╪╡┘ê╪▒ ╪╣┘ä┘ë ╪º┘ä╪¿╪º╪▒╪»" }
  },
  'creme-5': {
    fr: { name: "Agrumes Baies", description: "Fraise et pamplemousse" },
    ar: { name: "╪¡┘à╪╢┘è╪º╪¬ ┘ê╪¬┘ê╪¬", description: "┘ü╪▒╪º┘ê┘ä╪⌐ ┘ê╪¼╪▒┘è╪¿ ┘ü╪▒┘ê╪¬" }
  },

  // Juices
  'juice-1': {
    fr: { name: "Citron Menthe", description: "Citron piquant avec menthe" },
    ar: { name: "┘ä┘è┘à┘ê┘å ┘ê┘å╪╣┘å╪º╪╣", description: "┘ä┘è┘à┘ê┘å ┘ä╪º╪░╪╣ ┘à╪╣ ┘å╪╣┘å╪º╪╣" }
  },
  'juice-2': {
    fr: { name: "Punch Ananas", description: "M├⌐lange ananas tropical" },
    ar: { name: "╪¿┘å╪┤ ╪º┘ä╪ú┘å╪º┘å╪º╪│", description: "┘à╪▓┘è╪¼ ╪ú┘å╪º┘å╪º╪│ ╪º╪│╪¬┘ê╪º╪ª┘è" }
  },
  'juice-3': {
    fr: { name: "├ëclat Mangue", description: "Pur├⌐e de mangue Alphonso" },
    ar: { name: "╪¬┘ê┘ç╪¼ ╪º┘ä┘à╪º┘å╪¼┘ê", description: "┘ç╪▒┘è╪│ ┘à╪º┘å╪¼┘ê ╪ú┘ä┘ü┘ê┘å╪│┘ê" }
  },

  // Latte Hot
  'latte-1': {
    fr: { name: "Latte Classique", description: "Double dose, lait vapeur" },
    ar: { name: "┘ä╪º╪¬┘è┘ç ┘â┘ä╪º╪│┘è┘â┘è", description: "╪¼╪▒╪╣╪⌐ ┘à╪▓╪»┘ê╪¼╪⌐╪î ╪¡┘ä┘è╪¿ ┘à╪¿╪«╪▒" }
  },
  'latte-2': {
    fr: { name: "Latte Vanille", description: "Sirop vanille maison" },
    ar: { name: "┘ä╪º╪¬┘è┘ç ┘ü╪º┘å┘è┘ä┘è╪º", description: "╪┤╪▒╪º╪¿ ┘ü╪º┘å┘è┘ä┘è╪º ┘à┘å╪▓┘ä┘è" }
  },
  'latte-3': {
    fr: { name: "Latte Caramel", description: "Filet de caramel au beurre" },
    ar: { name: "┘ä╪º╪¬┘è┘ç ┘â╪▒╪º┘à┘è┘ä", description: "╪▒╪░╪º╪░ ┘â╪▒╪º┘à┘è┘ä ╪¿╪º┘ä╪▓╪¿╪»╪⌐" }
  },
  'latte-4': {
    fr: { name: "Pumpkin Spice Latte", description: "├ëpices de saison & pur├⌐e" },
    ar: { name: "┘ä╪º╪¬┘è┘ç ╪¬┘ê╪º╪¿┘ä ╪º┘ä┘è┘é╪╖┘è┘å", description: "╪¬┘ê╪º╪¿┘ä ┘à┘ê╪│┘à┘è╪⌐ ┘ê┘ç╪▒┘è╪│" }
  },

  // Tea
  'tea-1': {
    fr: { name: "Matcha C├⌐r├⌐monial", description: "Moulu sur pierre, riche en umami" },
    ar: { name: "┘à╪º╪¬╪┤╪º ╪º╪¡╪¬┘ü╪º┘ä┘è", description: "┘à╪╖╪¡┘ê┘å ╪╣┘ä┘ë ╪º┘ä╪¡╪¼╪▒╪î ╪║┘å┘è ╪¿╪º┘ä╪ú┘ê┘à╪º┘à┘è" }
  },
  'tea-2': {
    fr: { name: "Masala Chai", description: "├ëpic├⌐, cr├⌐meux, r├⌐chauffant" },
    ar: { name: "┘à╪º╪│╪º┘ä╪º ╪¬╪┤╪º┘è", description: "┘à╪¬╪¿┘ä╪î ┘â╪▒┘è┘à┘è╪î ╪»╪º┘ü╪ª" }
  },
  'tea-3': {
    fr: { name: "Gingembre Citron", description: "Piquant, infusion apaisante" },
    ar: { name: "╪▓┘å╪¼╪¿┘è┘ä ┘ê┘ä┘è┘à┘ê┘å", description: "┘ä╪º╪░╪╣╪î ┘å┘é┘è╪╣ ┘à┘ç╪»╪ª" }
  },
  'tea-4': {
    fr: { name: "Menthe Marocaine", description: "Th├⌐ vert rafra├«chissant" },
    ar: { name: "╪┤╪º┘è ┘à╪║╪▒╪¿┘è ╪¿╪º┘ä┘å╪╣┘å╪º╪╣", description: "╪┤╪º┘è ╪ú╪«╪╢╪▒ ┘à┘å╪╣╪┤" }
  },
  'tea-5': {
    fr: { name: "Th├⌐ au Lait Royal", description: "Th├⌐ noir, lait, caramel" },
    ar: { name: "╪┤╪º┘è ╪¿╪º┘ä╪¡┘ä┘è╪¿ ┘à┘ä┘â┘è", description: "╪┤╪º┘è ╪ú╪│┘ê╪»╪î ╪¡┘ä┘è╪¿╪î ┘â╪▒╪º┘à┘è┘ä" }
  },
  'tea-6': {
    fr: { name: "Oolong P├¬che Glac├⌐", description: "Fruit├⌐, floral, frais" },
    ar: { name: "╪ú┘ê┘ä┘ê┘å╪║ ╪º┘ä╪«┘ê╪« ╪º┘ä┘à╪½┘ä╪¼", description: "┘ü╪º┘â┘ç┘è╪î ╪▓┘ç╪▒┘è╪î ╪¿╪º╪▒╪»" }
  },

  // Smoothie & Shake
  'smoothie-1': {
    fr: { name: "Explosion de Baies", description: "Fraise, myrtille, yaourt" },
    ar: { name: "╪º┘å┘ü╪¼╪º╪▒ ╪º┘ä╪¬┘ê╪¬", description: "┘ü╪▒╪º┘ê┘ä╪⌐╪î ╪¬┘ê╪¬ ╪ú╪▓╪▒┘é╪î ╪▓╪¿╪º╪»┘è" }
  },
  'smoothie-2': {
    fr: { name: "Force Verte", description: "├ëpinards, pomme, banane" },
    ar: { name: "╪º┘ä┘é┘ê╪⌐ ╪º┘ä╪«╪╢╪▒╪º╪í", description: "╪│╪¿╪º┘å╪«╪î ╪¬┘ü╪º╪¡╪î ┘à┘ê╪▓" }
  },
  'shake-1': {
    fr: { name: "Shake Chocolat Classique", description: "Cacao riche, base cr├⌐meuse" },
    ar: { name: "╪┤┘è┘â ╪┤┘ê┘â┘ê┘ä╪º╪¬╪⌐ ┘â┘ä╪º╪│┘è┘â┘è", description: "┘â╪º┘â╪º┘ê ╪║┘å┘è╪î ┘é╪º╪╣╪»╪⌐ ┘â╪▒┘è┘à┘è╪⌐" }
  },
  'shake-2': {
    fr: { name: "Shake Vanille", description: "Vanille de Madagascar, onctueux" },
    ar: { name: "╪┤┘è┘â ┘ü╪º┘å┘è┘ä┘è╪º", description: "┘ü╪º┘å┘è┘ä┘è╪º ┘à╪»╪║╪┤┘é╪▒╪î ┘å╪º╪╣┘à" }
  },
  'shake-3': {
    fr: { name: "D├⌐lice Fraise", description: "Fraises fra├«ches, cr├¿me" },
    ar: { name: "╪¿┘ç╪¼╪⌐ ╪º┘ä┘ü╪▒╪º┘ê┘ä╪⌐", description: "┘ü╪▒╪º┘ê┘ä╪⌐ ╪╖╪º╪▓╪¼╪⌐╪î ┘â╪▒┘è┘à╪⌐" }
  },
  'shake-4': {
    fr: { name: "Banane Caramel", description: "Banane, filet de caramel" },
    ar: { name: "┘à┘ê╪▓ ┘ê┘â╪▒╪º┘à┘è┘ä", description: "┘à┘ê╪▓╪î ╪▒╪░╪º╪░ ┘â╪▒╪º┘à┘è┘ä" }
  },

  // Toast
  'toast-1': {
    fr: { name: "B├⌐n├⌐dicte Signature", description: "┼Æufs poch├⌐s, hollandaise" },
    ar: { name: "╪¿┘å╪»┘è┘â╪¬ ╪º┘ä┘à┘à┘è╪▓", description: "╪¿┘è╪╢ ┘à╪│┘ä┘ê┘é╪î ┘ç┘ê┘ä┘å╪»┘è╪▓" }
  },
  'toast-2': {
    fr: { name: "Omelette Truffe", description: "Champignons, huile de truffe" },
    ar: { name: "╪╣╪¼╪⌐ ╪º┘ä┘â┘à╪ú╪⌐", description: "┘ü╪╖╪▒╪î ╪▓┘è╪¬ ╪º┘ä┘â┘à╪ú╪⌐" }
  },
  'toast-3': {
    fr: { name: "Shakshuka", description: "Tomate, poivrons, ┼ôufs" },
    ar: { name: "╪┤┘â╪┤┘ê┘â╪⌐", description: "╪╖┘à╪º╪╖┘à╪î ┘ü┘ä┘ü┘ä╪î ╪¿┘è╪╢" }
  },
  'toast-4': {
    fr: { name: "Toast Avocat", description: "Levain, avocat ├⌐cras├⌐" },
    ar: { name: "╪¬┘ê╪│╪¬ ╪º┘ä╪ú┘ü┘ê┘â╪º╪»┘ê", description: "╪«╪¿╪▓ ╪º┘ä╪╣╪¼┘è┘å ╪º┘ä┘à╪«┘à╪▒╪î ╪ú┘ü┘ê┘â╪º╪»┘ê ┘à┘ç╪▒┘ê╪│" }
  },
  'toast-5': {
    fr: { name: "B├⌐n├⌐dicte Classique", description: "Jambon, hollandaise" },
    ar: { name: "╪¿┘å╪»┘è┘â╪¬ ┘â┘ä╪º╪│┘è┘â┘è", description: "┘ä╪¡┘à╪î ┘ç┘ê┘ä┘å╪»┘è╪▓" }
  },
  'toast-6': {
    fr: { name: "Bol ├ënergie Vegan", description: "Graines, l├⌐gumes verts" },
    ar: { name: "┘ê╪╣╪º╪í ╪º┘ä╪╖╪º┘é╪⌐ ╪º┘ä┘å╪¿╪º╪¬┘è", description: "╪¡╪¿┘ê╪¿╪î ╪«╪╢╪▒┘ê╪º╪¬" }
  },

  // Pastry
  'pastry-1': {
    fr: { name: "Croissant au Beurre", description: "Feuillet├⌐, beurre fran├ºais" },
    ar: { name: "┘â╪▒┘ê╪º╪│┘ê┘å ╪¿╪º┘ä╪▓╪¿╪»╪⌐", description: "╪╖╪¿┘é╪º╪¬ ┘ç╪┤╪⌐╪î ╪▓╪¿╪»╪⌐ ┘ü╪▒┘å╪│┘è╪⌐" }
  },
  'pastry-2': {
    fr: { name: "Croissant aux Amandes", description: "Frangipane, amandes grill├⌐es" },
    ar: { name: "┘â╪▒┘ê╪º╪│┘ê┘å ╪¿╪º┘ä┘ä┘ê╪▓", description: "┘ü╪▒╪º┘å╪¼┘è╪¿╪º┘å╪î ┘ä┘ê╪▓ ┘à╪¡┘à╪╡" }
  },
  'pastry-3': {
    fr: { name: "├ëclair au Chocolat", description: "P├óte ├á choux, ganache riche" },
    ar: { name: "╪Ñ┘â┘ä┘è╪▒ ╪º┘ä╪┤┘ê┘â┘ê┘ä╪º╪¬╪⌐", description: "╪╣╪¼┘è┘å╪⌐ ╪º┘ä╪┤┘ê╪î ╪║╪º┘å╪º╪┤ ╪║┘å┘è" }
  },
  'pastry-4': {
    fr: { name: "Tarte aux Fraises", description: "Cr├¿me p├ótissi├¿re, fraises fra├«ches" },
    ar: { name: "╪¬╪º╪▒╪¬ ╪º┘ä┘ü╪▒╪º┘ê┘ä╪⌐", description: "┘â╪º╪│╪¬╪▒╪» ╪º┘ä┘ü╪º┘å┘è┘ä┘è╪º╪î ┘ü╪▒╪º┘ê┘ä╪⌐ ╪╖╪º╪▓╪¼╪⌐" }
  },
  'pastry-5': {
    fr: { name: "Tarte Citron Meringu├⌐e", description: "Caill├⌐ piquant, meringue br├╗l├⌐e" },
    ar: { name: "╪¬╪º╪▒╪¬ ╪º┘ä┘ä┘è┘à┘ê┘å ┘ê╪º┘ä┘à┘è╪▒┘è┘å╪║", description: "╪«╪½╪▒╪⌐ ┘ä╪º╪░╪╣╪⌐╪î ┘à┘è╪▒┘è┘å╪║ ┘à╪¡┘à╪▒" }
  },
  'pastry-6': {
    fr: { name: "Part de G├óteau Velours", description: "Mie moelleuse, gla├ºage vanille" },
    ar: { name: "╪┤╪▒┘è╪¡╪⌐ ┘â┘è┘â ┘à╪«┘à┘ä┘è", description: "┘ü╪¬╪º╪¬ ╪▒╪╖╪¿╪î ┘â╪▒┘è┘à╪⌐ ┘ü╪º┘å┘è┘ä┘è╪º" }
  }
};

function getTranslation(key) {
  const lang = getLang();
  return (translations[lang] && translations[lang][key]) || (translations['en'] && translations['en'][key]) || key;
}

function getMenuTranslation(item, field) {
  const lang = getLang();
  if (lang === 'en') return item[field];

  if (menuTranslations[item.id] && menuTranslations[item.id][lang] && menuTranslations[item.id][lang][field]) {
    return menuTranslations[item.id][lang][field];
  }
  return item[field];
}

function applyLang(lang) {
  document.documentElement.lang = lang;
  localStorage.setItem('stitch_lang', lang);

  // RTL Support
  if (lang === 'ar') {
    document.documentElement.dir = 'rtl';
    document.body.classList.add('rtl');
  } else {
    document.documentElement.dir = 'ltr';
    document.body.classList.remove('rtl');
  }

  // Update static text
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key && translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key && translations[lang] && translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });

  // Update Toggle UI
  const toggle = document.getElementById('language-toggle');
  const label = document.getElementById('current-language');
  if (toggle && label) {
    toggle.classList.remove('lang-en', 'lang-fr', 'lang-ar');
    toggle.classList.add(`lang-${lang}`);
    label.textContent = lang === 'en' ? 'English' : (lang === 'fr' ? 'Fran├ºais' : '╪º┘ä╪╣╪▒╪¿┘è╪⌐');
  }

  // Re-render content
  if (typeof bestsellers !== 'undefined' && bestsellers.length) {
    renderBestsellers(bestsellers);
  }
  // renderCategories();
  updateCartUI();

  const modal = document.getElementById('order-modal');
  if (modal && !modal.classList.contains('hidden')) {
    renderCartItems();
  }
}

function getLang() {
  return localStorage.getItem('stitch_lang') || 'en';
}

document.addEventListener('DOMContentLoaded', () => {
  cart = getStoredCart();
  updateCartUI();
  fetchBestsellers();
  // // renderCategories();
  setupEvents();

  // Check for language preference
  const lang = getLang();
  applyLang(lang); // Always apply to ensure UI sync

  setupLanguageToggle();
});

function setupLanguageToggle() {
  const toggle = document.getElementById('language-toggle');

  if (!toggle) return;

  toggle.addEventListener('click', function () {
    const current = getLang();
    let next = 'en';
    if (current === 'en') next = 'fr';
    else if (current === 'fr') next = 'ar';
    else if (current === 'ar') next = 'en';

    applyLang(next);
  });
}

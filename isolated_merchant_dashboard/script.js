// ============================================================
// STITCH MERCHANT DASHBOARD — DEMO MODE
// Without a login token, orders stay in this browser as local demo data.
// An API failure never becomes a simulated successful server order.
// ============================================================

// Public customer menu used by QR previews, downloads, sharing and the generator.
let detectedNetworkMenuUrl = null;
let detectedExternalPortalUrl = null;
function liveOrdersApiBase() {
    try {
        const custom = localStorage.getItem('stitch_live_api_base');
        if (custom) return custom.replace(/\/$/, '');
    } catch { }
    if (typeof window !== 'undefined' && (window.location.protocol === 'http:' || window.location.protocol === 'https:')) {
        return window.location.origin;
    }
    return 'http://127.0.0.1:8000';
}

function buildCustomerMenuUrl(tableId) {
    const base = detectedNetworkMenuUrl
        || (typeof window !== 'undefined' && (window.location.protocol === 'http:' || window.location.protocol === 'https:')
            ? `${window.location.origin}/stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/index.html`
            : 'http://127.0.0.1:8000/stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/index.html');
    const url = new URL(base);
    url.searchParams.set('table', String(tableId));
    return url.href;
}

function buildExternalPortalUrl() {
    return detectedExternalPortalUrl
        || (typeof window !== 'undefined' && (window.location.protocol === 'http:' || window.location.protocol === 'https:')
            ? `${window.location.origin}/stitch_caf_menu_table_12/welcome_portal/index.html`
            : 'http://127.0.0.1:8000/stitch_caf_menu_table_12/welcome_portal/index.html');
}

function isDeliveryOrder(order) {
    if (!order) return false;
    return order.orderType === 'delivery'
        || String(order.table || '').toLowerCase().includes('livraison')
        || Boolean(order.deliveryAddress);
}

function isTakeawayOrder(order) {
    if (!order) return false;
    return order.orderType === 'takeaway'
        || String(order.table || '').toLowerCase().includes('emporter');
}

// --- DEMO DATA ---
const DEMO_MENU = [
    // Brunch
    { id: 'brunch-1', name: "Farm Omelette", price: 12.50, category: "Brunch", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/salty food and sweet brunch/0a928a23c6c3fb861e9c4ec54ae78b7d.jpg", hasModifiers: false, stock: 15 },
    { id: 'brunch-2', name: "Eggs Benedict", price: 16.00, category: "Brunch", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/salty food and sweet brunch/3f108fda33cdb811f37bf5dc2035c3dc.jpg", hasModifiers: false, stock: 12 },
    { id: 'brunch-3', name: "Spicy Shakshuka", price: 15.50, category: "Brunch", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/salty food and sweet brunch/5d9c920def5bef64b91715b917d667b2.jpg", hasModifiers: false, stock: 10 },
    { id: 'brunch-4', name: "Garden Skillet", price: 14.50, category: "Brunch", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/salty food and sweet brunch/5ec903108923b0eda69e0de6ab77a1f3.jpg", hasModifiers: false, stock: 8 },
    { id: 'brunch-5', name: "Brunch Burrito", price: 13.00, category: "Brunch", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/salty food and sweet brunch/62e25e1c33624e2bc57b6e4531a36dc5.jpg", hasModifiers: false, stock: 14 },
    { id: 'brunch-6', name: "Citrus Cheese Cake", price: 19.50, category: "Brunch", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/salty food and sweet brunch/69c52da929160d633bd0def179265173.jpg", hasModifiers: false, stock: 6 },
    { id: 'brunch-7', name: "Fit Egg-White", price: 13.50, category: "Brunch", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/salty food and sweet brunch/89648609962eda9536c1eecdedbdf8ef.jpg", hasModifiers: false, stock: 20 },
    { id: 'brunch-8', name: "Crème Caramel", price: 11.00, category: "Brunch", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/salty food and sweet brunch/902f3561ca86aba6382aad94c75b11f4.jpg", hasModifiers: false, stock: 15 },
    { id: 'brunch-9', name: "Iron Frittata", price: 14.75, category: "Brunch", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/salty food and sweet brunch/eb058f0421ae783ed7c55319ca504911.jpg", hasModifiers: false, stock: 10 },
    { id: 'brunch-10', name: "Acai Delight", price: 12.00, category: "Brunch", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/smoothie-acai-bowl.jpg", hasModifiers: false, stock: 12 },
    { id: 'brunch-11', name: "Belgian Gold", price: 11.50, category: "Brunch", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/vertical-shot-pancakes-with-fruits-top_181624-23923.jpg", hasModifiers: false, stock: null },
    { id: 'brunch-12', name: "Full English", price: 22.00, category: "Brunch", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/brunch-full-english.jpg", hasModifiers: false, stock: null },

    // Brew & Coffee
    { id: 'brew-1', name: "Nitro Cold Brew", price: 6.50, category: "Coffee", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/coffee-nitro-brew.jpg", hasModifiers: true, stock: null },
    { id: 'brew-2', name: "Matcha Latte", price: 7.25, category: "Tea", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/Matcha Latte.jpg", hasModifiers: true, stock: null },
    { id: 'brew-3', name: "Ethiopian Yirgacheffe", price: 5.00, category: "Coffee", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/Ethiopian Yirgacheffe.jpg", hasModifiers: true, stock: null },
    { id: 'brew-4', name: "Chiken Pizaa", price: 6.75, category: "Tea", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/tea-dirty-chai-espresso.jpg", hasModifiers: true, stock: null },
    { id: 'brew-5', name: "Oat Milk Cortado", price: 4.50, category: "Coffee", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/coffee-oat-milk-latte.jpg", hasModifiers: true, stock: null },
    { id: 'brew-6', name: "Lavender Honey", price: 7.50, category: "Tea", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/tea-lavender-earl.jpg", hasModifiers: true, stock: null },
    { id: 'brew-7', name: "Golden Turmeric", price: 6.25, category: "Tea", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/Golden Turmeric.jpg", hasModifiers: true, stock: null },
    { id: 'brew-8', name: "Caramel Macchiato", price: 6.50, category: "Coffee", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/latte-caramel-macchiato.jpg", hasModifiers: true, stock: null },
    { id: 'brew-9', name: "Light Black Coffee", price: 8.00, category: "Coffee", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/Light Black Coffee.jpg", hasModifiers: true, stock: null },
    { id: 'brew-10', name: "Blueberry Infusion", price: 5.75, category: "Tea", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/Blueberry Infusion.jpg", hasModifiers: true, stock: null },

    { id: 'coffee-1', name: "Velvet Flat White", price: 4.80, category: "Coffee", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/coffee-velvet-flat-white.jpg", hasModifiers: true, stock: null },
    { id: 'coffee-2', name: "Kyoto Cold Brew", price: 5.50, category: "Coffee", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/coffee-kyoto-cold-brew.jpg", hasModifiers: true, stock: null },
    { id: 'coffee-3', name: "Oat Milk Latte", price: 5.20, category: "Coffee", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/latte-oat.jpg", hasModifiers: true, stock: null },
    { id: 'coffee-4', name: "Single Origin Espresso", price: 3.50, category: "Coffee", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/coffee-single-origin-espresso.jpg", hasModifiers: true, stock: null },
    { id: 'coffee-5', name: "Dark Mocha", price: 6.00, category: "Coffee", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/coffee-dark-mocha.jpg", hasModifiers: true, stock: null },

    // Artisanal Bread
    { id: 'bread-1', name: "Chocolate Babka", price: 12.00, category: "Bakery", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/Chocolate Babka.jpg", hasModifiers: false, stock: 10 },
    { id: 'bread-2', name: "Seeded Multigrain", price: 9.00, category: "Bread", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/bakery-seeded-multigrain.jpg", hasModifiers: false, stock: 15 },
    { id: 'bread-3', name: "Dark Rye Loaf", price: 10.50, category: "Bread", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/bakery-dark-rye-loaf.jpg", hasModifiers: false, stock: 8 },
    { id: 'bread-4', name: "Herbed Focaccia", price: 7.50, category: "Bread", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/Herbed Focaccia.jpg", hasModifiers: false, stock: 12 },
    { id: 'bread-5', name: "Honey Brioche", price: 11.25, category: "Bread", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/bakery-honey-brioche.jpg", hasModifiers: false, stock: 6 },
    { id: 'bread-6', name: "Stoneground Wheat", price: 8.75, category: "Bread", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/bakery-stoneground-wheat.jpg", hasModifiers: false, stock: 20 },
    { id: 'bread-7', name: "Parisian Baguette", price: 4.50, category: "Bread", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/bakery-parisian-baguette.jpg", hasModifiers: false, stock: 30 },
    { id: 'bread-8', name: "Cranberry Walnut", price: 9.50, category: "Bread", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/bakery-cranberry-walnut.jpg", hasModifiers: false, stock: 5 },

    // Bakery & Sweets
    { id: 'pastry-1', name: "Butter Croissant", price: 4.50, category: "Bakery", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/sweet-butter-croissant.jpg", hasModifiers: false, stock: 20 },
    { id: 'pastry-2', name: "Almond Croissant", price: 5.25, category: "Bakery", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/sweet-almond-croissant.jpg", hasModifiers: false, stock: 10 },
    { id: 'pastry-3', name: "Chocolate Éclair", price: 4.75, category: "Bakery", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/bakery-chocolate-eclair.jpg", hasModifiers: false, stock: 15 },
    { id: 'pastry-4', name: "Strawberry Tart", price: 5.80, category: "Bakery", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/sweet-strawberry-tart.jpg", hasModifiers: false, stock: 8 },
    { id: 'pastry-5', name: "Lemon Meringue Tart", price: 5.90, category: "Bakery", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/sweet-lemon-meringue.jpg", hasModifiers: false, stock: 12 },
    { id: 'pastry-6', name: "Velvet Cake Slice", price: 4.95, category: "Bakery", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/sweet-velvet-cake.jpg", hasModifiers: false, stock: 18 },

    // Juices & Cold Drinks
    { id: 'juice-1', name: "Lemon Mint", price: 4.10, category: "Juices", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/juice-lemon-mint.jpg", hasModifiers: false, stock: null },
    { id: 'juice-2', name: "Pineapple Punch", price: 4.80, category: "Juices", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/juice-pineapple-punch.jpg", hasModifiers: false, stock: null },
    { id: 'juice-3', name: "Mango Glow", price: 5.25, category: "Juices", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/juice-mango-glow.jpg", hasModifiers: false, stock: null },
    { id: 'cold-1', name: "Fresh Orange Juice", price: 4.50, category: "Juices", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/juice-fresh-orange.jpg", hasModifiers: false, stock: null },

    // Smoothies & Shakes
    { id: 'smoothie-1', name: "Berry Burst", price: 5.20, category: "Smoothie", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/smoothie-berry-cream.jpg", hasModifiers: false, stock: null },
    { id: 'smoothie-2', name: "Green Power", price: 5.00, category: "Smoothie", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/smoothie-green-power.jpg", hasModifiers: false, stock: null },
    { id: 'shake-1', name: "Classic Chocolate Shake", price: 5.20, category: "Shakes", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/smoothie-choco-malt.jpg", hasModifiers: false, stock: null },
    { id: 'shake-2', name: "Vanilla Bean Shake", price: 5.00, category: "Shakes", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/shake-vanilla-bean.jpg", hasModifiers: false, stock: null },
    { id: 'shake-3', name: "Strawberry Bliss", price: 5.40, category: "Shakes", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/shake-strawberry.jpg", hasModifiers: false, stock: null },
    { id: 'shake-4', name: "Banana Caramel", price: 5.60, category: "Shakes", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/shake-banana-caramel.jpg", hasModifiers: false, stock: null },

    // Toasts & Benedicts
    { id: 'toast-1', name: "Signature Benedict", price: 14.50, category: "Brunch", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/toast-signature-benedict.jpg", hasModifiers: false, stock: null },
    { id: 'toast-2', name: "Truffle Omelette", price: 12.50, category: "Brunch", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/brunch-farm-omelette.jpg", hasModifiers: false, stock: null },
    { id: 'toast-3', name: "Shakshuka", price: 11.25, category: "Brunch", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/toast-shakshuka.jpg", hasModifiers: false, stock: null },
    { id: 'toast-4', name: "Avocado Toast", price: 10.50, category: "Brunch", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/toast-avocado.jpg", hasModifiers: false, stock: null },
    { id: 'toast-5', name: "Classic Benedict", price: 13.50, category: "Brunch", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/toast-benedict.jpg", hasModifiers: false, stock: null },
    { id: 'toast-6', name: "Vegan Power Bowl", price: 12.00, category: "Brunch", image_url: "../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/toast-vegan-bowl.jpg", hasModifiers: false, stock: null },
];

const DEMO_ORDERS = [
    { id: 'ORD-001', table: '12', customerName: 'Yassine', notes: 'No nuts. Allergic.', items: [{ name: 'Velvet Flat White', qty: 2, price: 20, image_url: '../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/coffee-velvet-flat-white.jpg' }, { name: 'Butter Croissant', qty: 1, price: 18, image_url: '../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/sweet-butter-croissant.jpg' }], total: 58, status: 'Received', time: Date.now() - 1000 * 60 * 2 },
    { id: 'ORD-002', table: '5', customerName: 'Amal', notes: 'Less salt. Serve hot.', items: [{ name: 'Avocado Toast', qty: 1, price: 45, image_url: '../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/toast-avocado.jpg' }, { name: 'Fresh Orange Juice', qty: 1, price: 30, image_url: '../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/juice-fresh-orange.jpg' }], total: 75, status: 'Preparing', time: Date.now() - 1000 * 60 * 12 },
    { id: 'ORD-003', table: '3', customerName: 'Karim', notes: 'Oat milk, extra hot.', items: [{ name: 'Single Origin Espresso', qty: 3, price: 18, mods: ['Extra Shot', 'Oat Milk'], image_url: '../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/coffee-single-origin-espresso.jpg' }], total: 78, status: 'Ready', time: Date.now() - 1000 * 60 * 25 },
];

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
        floor_plan: "Floor Plan"
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
        floor_plan: "Plan de salle"
    },
    ar: {
        dashboard: "لوحة التحكم",
        take_order: "اتخاذ الطلب",
        live_orders: "الطلبات المباشرة",
        kitchen_display: "عرض المطبخ",
        menu_manager: "مدير القائمة",
        qr_center: "مركز QR",
        reservations: "الحجوزات",
        sign_out: "تسجيل الخروج",
        summary_title: "ملخص اليوم",
        summary_subtitle: "إدارة متجرك في الوقت الحقيقي.",
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
        welcome_ali: "<h2 class='text-xl font-bold'>صباح الخير يا علي! 👋</h2><p class='text-gray-500 mt-2'>إليك ما يحدث في Stitch اليوم.</p>",
        end_shift: "إنهاء الوردية",
        floor_plan: "مخطط الطوابق"
    }
};

let currentLang = localStorage.getItem('stitch_dashboard_lang') || 'en';

function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('stitch_dashboard_lang', lang);

    // Set direction
    const isRtl = lang === 'ar';
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);

    // Update translations (text only)
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (DASHBOARD_TRANSLATIONS[lang][key]) {
            el.textContent = DASHBOARD_TRANSLATIONS[lang][key];
        }
    });

    // Update translations (HTML inner)
    document.querySelectorAll('[data-i18n-inner]').forEach(el => {
        const key = el.getAttribute('data-i18n-inner');
        if (DASHBOARD_TRANSLATIONS[lang][key]) {
            el.innerHTML = DASHBOARD_TRANSLATIONS[lang][key];
        }
    });

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
    
    // ... existing init logic
});

// Authoritative catalog initializer from client menu.js (129 items)
function getClientMenuCatalog() {
    if (typeof window !== 'undefined' && Array.isArray(window.allMenuItems) && window.allMenuItems.length > 0) {
        return window.allMenuItems.map(item => ({
            id: String(item.id),
            name: item.name || 'Produit sans nom',
            price: Number(item.price) || 0,
            category: item.category || 'Specialty',
            mainCat: item.mainCat || '',
            subCat: item.subCat || '',
            description: item.description || '',
            image_url: normalizeProductImage(item.image || item.image_url),
            hasModifiers: Boolean(item.customizationUrl || item.hasModifiers),
            stock: 35
        }));
    }
    return DEMO_MENU;
}

// --- STATE ---
let posCart = [];
let menuItems = getClientMenuCatalog();
let liveOrders = [...DEMO_ORDERS]; // Mutable state for KDS dashboard
let completedOrders = []; // Track completed orders for Z-Report
let globalDiscount = { amount: 0, type: '%' };
let currentModItem = null; // Item currently being customized
let activePosCartItemId = null;
let kitchenFilter = 'all'; // Kitchen display filter: 'all', 'Received', 'Preparing', 'Ready'
let hasHydratedMenuFromAPI = false;
let menuRequestPromise = null;
let hasInitializedMenuManager = false;
let initialHydrationFinished = false;
let activePOSCategory = 'All';
let posSearchQuery = '';
let checkoutInProgress = false;
const MERCHANT_SESSION_KEY = 'stitch_merchant_session_v1';
const PRODUCT_PLACEHOLDER = 'assets/product-placeholder.svg';

function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

function normalizeProductImage(path) {
    if (typeof path !== 'string' || !path.trim()) return PRODUCT_PLACEHOLDER;
    const clean = path.trim();
    if (clean.startsWith('data:') || clean.startsWith('http://') || clean.startsWith('https://')) return clean;
    if (clean.startsWith('../images/')) {
        return '../stitch_caf_menu_table_12/' + clean.slice(3);
    }
    if (clean.startsWith('images/')) {
        return '../stitch_caf_menu_table_12/' + clean;
    }
    if (clean.startsWith('../stitch_caf_menu_table_12/')) {
        return clean;
    }
    if (clean.startsWith('./assets/') || clean.startsWith('assets/')) {
        return clean;
    }
    return clean.replace('../swiggy-style_elite_main_menu_390x2500/assets/', '../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/');
}

function validOrder(order) {
    return order && typeof order.id === 'string' && Number.isFinite(order.total) && order.total >= 0
        && Number.isFinite(order.time) && ['Received', 'Preparing', 'Ready', 'Completed'].includes(order.status)
        && Array.isArray(order.items) && order.items.every(item => item && typeof item.name === 'string'
            && Number.isFinite(item.price) && item.price >= 0 && Number.isInteger(item.qty) && item.qty > 0);
}

function restoreMerchantSession() {
    try {
        const saved = JSON.parse(localStorage.getItem(MERCHANT_SESSION_KEY) || 'null');
        if (saved && saved.version === 1) {
            if (Array.isArray(saved.liveOrders) && saved.liveOrders.every(validOrder)) liveOrders = saved.liveOrders;
            if (Array.isArray(saved.completedOrders) && saved.completedOrders.every(validOrder)) completedOrders = saved.completedOrders;
            if (Array.isArray(saved.cart) && saved.cart.every(item => item && typeof item.id === 'string'
                && typeof item.cartId === 'string' && typeof item.name === 'string' && Number.isFinite(item.price)
                && item.price >= 0 && Number.isInteger(item.quantity) && item.quantity > 0)) posCart = saved.cart;
            if (saved.discount && Number.isFinite(saved.discount.amount) && saved.discount.amount >= 0) {
                globalDiscount = { amount: saved.discount.amount, type: saved.discount.type === '%' ? '%' : 'DH' };
            }
        } else {
            const previousOrders = JSON.parse(localStorage.getItem('stitch_live_orders') || 'null');
            if (Array.isArray(previousOrders) && previousOrders.every(validOrder)) liveOrders = previousOrders;
        }
        [...liveOrders, ...completedOrders].forEach(order => order.items.forEach(item => { item.image_url = normalizeProductImage(item.image_url); }));
        posCart.forEach(item => { item.image_url = normalizeProductImage(item.image_url); });
        activePosCartItemId = posCart[0]?.cartId || null;
    } catch { /* Invalid or unavailable storage must not prevent opening the dashboard. */ }
}

function persistMerchantSession(syncOrders = false) {
    try {
        localStorage.setItem(MERCHANT_SESSION_KEY, JSON.stringify({ version: 1, liveOrders, completedOrders, cart: posCart, discount: globalDiscount }));
        if (syncOrders) localStorage.setItem('stitch_live_orders', JSON.stringify(liveOrders));
    } catch { /* Keep the current browser session usable when storage is full or disabled. */ }
    refreshMerchantNavigation();
}

function refreshMerchantNavigation() {
    const count = liveOrders.filter(order => order.status !== 'Completed').length;
    for (const tab of ['orders', 'kitchen']) {
        const badge = document.querySelector(`#sidebar [data-tab="${tab}"] .ml-auto`);
        if (badge) badge.textContent = String(count);
    }
    const deliveryCount = liveOrders.filter(order => order.status !== 'Completed' && isDeliveryOrder(order)).length;
    const resCount = typeof reservations !== 'undefined' ? reservations.length : 0;
    
    // Unified badge for merged Livraisons & Réservations tab
    const unifiedBadge = document.getElementById('delivery-res-count-badge');
    if (unifiedBadge) {
        unifiedBadge.textContent = String(deliveryCount + resCount);
    }
    const hubDelBadge = document.getElementById('hub-deliveries-count');
    if (hubDelBadge) hubDelBadge.textContent = String(deliveryCount);
    const hubResBadge = document.getElementById('hub-reservations-count');
    if (hubResBadge) hubResBadge.textContent = String(resCount);

    const figmaActiveDel = document.getElementById('figma-active-deliveries-count');
    if (figmaActiveDel) {
        figmaActiveDel.textContent = `${deliveryCount} En Route`;
    }

    // Legacy badges support
    const delBadge = document.getElementById('delivery-count-badge');
    if (delBadge) delBadge.textContent = String(deliveryCount);
    const resBadge = document.getElementById('reservations-count-badge');
    if (resBadge) {
        resBadge.textContent = String(resCount);
        resBadge.classList.toggle('hidden', resCount === 0);
    }

    if (typeof renderFigmaDeliveryQueue === 'function') {
        renderFigmaDeliveryQueue();
    }
}

function showMerchantNotice(message, isError = false) {
    document.getElementById('merchant-notice')?.remove();
    const notice = document.createElement('div');
    notice.id = 'merchant-notice';
    notice.setAttribute('role', isError ? 'alert' : 'status');
    notice.className = `merchant-notice fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] rounded-xl px-5 py-4 text-sm font-semibold shadow-lg ${isError ? 'bg-red-700' : 'bg-gray-900'} text-white`;
    notice.textContent = message;
    document.body.appendChild(notice);
    setTimeout(() => notice.remove(), 6000);
}

function waitForMaterialSymbols(timeoutMs = 1200) {
    return Promise.resolve(); // SVG icons are bundled locally.
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
        if (Array.isArray(cached) && cached.length > 0) {
            const hasLegacyMock = cached.some(item => item && (item.id === 'brunch-1' || item.name === 'Farm Omelette' || item.name === 'Chiken Pizaa'));
            if (!hasLegacyMock && cached.every(item => item && typeof item.id === 'string' && typeof item.name === 'string' && Number.isFinite(Number(item.price)))) {
                menuItems = cached.map(item => ({ ...item, price: Number(item.price), image_url: normalizeProductImage(item.image_url) }));
                return;
            }
        }
    } catch { }
    menuItems = getClientMenuCatalog();
    persistMenuCache(menuItems);
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
                menuItems = result.data.map(item => ({ ...item, price: Number(item.price), image_url: normalizeProductImage(item.image_url) }));
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

let activeDeliveryHubSubTab = 'deliveries';

function switchDeliveryHubSubTab(subtab) {
    activeDeliveryHubSubTab = subtab;
    const delView = document.getElementById('hub-deliveries-view');
    const resView = document.getElementById('hub-reservations-view');
    const delBtn = document.getElementById('hub-subtab-deliveries-btn');
    const resBtn = document.getElementById('hub-subtab-reservations-btn');
    const newResBtn = document.getElementById('hub-btn-new-reservation');

    if (subtab === 'deliveries') {
        if (delView) delView.classList.remove('hidden');
        if (resView) resView.classList.add('hidden');
        if (newResBtn) newResBtn.classList.add('hidden');

        if (delBtn) {
            delBtn.className = 'px-4 py-2 rounded-xl bg-white dark:bg-[#3a2b24] text-primary shadow-sm font-extrabold flex items-center gap-1.5 transition-all cursor-pointer';
        }
        if (resBtn) {
            resBtn.className = 'px-4 py-2 rounded-xl text-gray-500 hover:text-gray-900 dark:hover:text-white font-bold flex items-center gap-1.5 transition-all cursor-pointer';
        }
        renderDeliveryTab();
    } else {
        if (delView) delView.classList.add('hidden');
        if (resView) resView.classList.remove('hidden');
        if (newResBtn) newResBtn.classList.remove('hidden');

        if (resBtn) {
            resBtn.className = 'px-4 py-2 rounded-xl bg-white dark:bg-[#3a2b24] text-primary shadow-sm font-extrabold flex items-center gap-1.5 transition-all cursor-pointer';
        }
        if (delBtn) {
            delBtn.className = 'px-4 py-2 rounded-xl text-gray-500 hover:text-gray-900 dark:hover:text-white font-bold flex items-center gap-1.5 transition-all cursor-pointer';
        }
        loadReservationsTab();
    }
}
window.switchDeliveryHubSubTab = switchDeliveryHubSubTab;

function renderDeliveryHubTab() {
    switchDeliveryHubSubTab(activeDeliveryHubSubTab);
}
window.renderDeliveryHubTab = renderDeliveryHubTab;

// --- DASHBOARD LAYOUT MANAGEMENT (POS VS FOOD DELIVERY SAAS) ---
let currentDashboardLayout = localStorage.getItem('stitch_dashboard_layout') || 'pos';





function renderFigmaDeliveryQueue() {
    const container = document.getElementById('figma-delivery-orders-list');
    if (!container) return;
    const deliveryOrders = liveOrders.filter(order => order.status !== 'Completed' && isDeliveryOrder(order));
    if (deliveryOrders.length === 0) {
        container.innerHTML = '<div class="py-6 text-center text-gray-400 text-xs font-medium">Aucune commande en attente de dispatch. Prêt pour les prochaines livraisons !</div>';
        return;
    }
    container.innerHTML = deliveryOrders.map(o => `
        <div class="p-3.5 rounded-2xl bg-gray-50/80 dark:bg-black/20 border border-gray-100 dark:border-white/5 flex items-center justify-between gap-3">
            <div class="flex items-center gap-3 min-w-0">
                <div class="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined text-[20px]">two_wheeler</span>
                </div>
                <div class="min-w-0">
                    <div class="flex items-center gap-2">
                        <span class="font-mono text-xs font-bold">${escapeHTML(o.id)}</span>
                        <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${getStatusStyle(o.status)}">${escapeHTML(o.status)}</span>
                    </div>
                    <p class="text-xs font-bold truncate text-gray-800 dark:text-gray-200 mt-0.5">${escapeHTML(o.customerName || 'Client')} · ${escapeHTML(o.deliveryAddress || 'Adresse non renseignée')}</p>
                </div>
            </div>
            <div class="text-right shrink-0">
                <span class="font-black text-sm text-primary block">${Number(o.total).toFixed(2)} DH</span>
                <span class="text-[10px] font-medium text-gray-400">${timeAgo(o.time)}</span>
            </div>
        </div>
    `).join('');
}

function switchTab(tabId) {
    let targetSubTab = null;
    if (tabId === 'delivery') {
        tabId = 'delivery-hub';
        targetSubTab = 'deliveries';
    } else if (tabId === 'reservations') {
        tabId = 'delivery-hub';
        targetSubTab = 'reservations';
    } else if (tabId === 'qr') {
        tabId = 'tables';
    }

    const mainContent = document.getElementById('main-content');
    if (mainContent) mainContent.setAttribute('data-active-tab', tabId);

    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));
    
    // Look for target tab (tables-tab or fallback qr-tab)
    let activeTab = document.getElementById(`${tabId}-tab`);
    if (!activeTab && tabId === 'tables') {
        activeTab = document.getElementById('qr-tab');
    }
    if (activeTab) activeTab.classList.remove('hidden');

    document.querySelectorAll('#collapsed-quick-rail .collapsed-nav-btn .material-symbols-outlined').forEach(el => {
        el.classList.remove('icon-active-gradient');
    });
    const activeCollapsedIcon = document.querySelector(`#collapsed-quick-rail .collapsed-nav-btn[data-tab="${tabId}"] .material-symbols-outlined`)
        || document.querySelector(`#collapsed-quick-rail .collapsed-nav-btn[data-tab="tables"] .material-symbols-outlined`);
    if (activeCollapsedIcon) {
        activeCollapsedIcon.classList.add('icon-active-gradient');
    }

    const titles = {
        dashboard: ["Today's Summary", "Manage your shop in real-time."],
        pos: ["Point of Sale", "Take manual orders directly from the counter."],
        orders: ["Order History", "Review and manage all past orders."],
        'delivery-hub': ["Livraisons & Réservations", "Commandes à domicile et gestion des réservations de tables."],
        delivery: ["Livraisons & Réservations", "Commandes à domicile et gestion des réservations de tables."],
        kitchen: ["Kitchen Display", "Manage orders in the kitchen."],
        menu: ["Menu Management", "Add, edit, or remove products from your shop."],
        tables: ["Plan des Tables & QR (12 Tables)", "Supervision des 12 tables (Terrasse, Salle Principale, 1er Étage) et QR Codes."],
        qr: ["Plan des Tables & QR (12 Tables)", "Supervision des 12 tables (Terrasse, Salle Principale, 1er Étage) et QR Codes."],
        reservations: ["Livraisons & Réservations", "Commandes à domicile et gestion des réservations de tables."],
        'theme-manager': ["Apparence & Thèmes du Menu", "Personnalisez l'ambiance visuelle du menu QR client en un clic."]
    };
    if (pageTitle && titles[tabId]) {
        pageTitle.textContent = titles[tabId][0];
        if (pageSubtitle) {
            if (tabId === 'pos') {
                pageSubtitle.style.display = 'none';
            } else {
                pageSubtitle.style.display = 'block';
                pageSubtitle.textContent = titles[tabId][1];
            }
        }
    }

    if (tabId === 'dashboard') { renderDashboard(); }
    if (tabId === 'pos') { loadPOSMenu(); }
    if (tabId === 'orders') { renderOrders(); }
    if (tabId === 'delivery-hub') {
        if (targetSubTab) {
            switchDeliveryHubSubTab(targetSubTab);
        } else {
            renderDeliveryHubTab();
        }
    }
    if (tabId === 'kitchen') { renderKitchenDisplay(); }
    if (tabId === 'menu') { loadMenuManager(); }
    if (tabId === 'tables' || tabId === 'qr') { loadQRTab(); }
    if (tabId === 'theme-manager') { loadThemeManagerTab(); }

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
window.switchTab = switchTab;

// --- QR CENTER TAB ---
const DEFAULT_TABLE_DATA = {
    "Terrasse": [
        { id: "1", number: 1, name: "Table 1", zone: "Terrasse", status: "Available", seats: 4 },
        { id: "2", number: 2, name: "Table 2", zone: "Terrasse", status: "Available", seats: 2 },
        { id: "3", number: 3, name: "Table 3", zone: "Terrasse", status: "Available", seats: 4 },
        { id: "4", number: 4, name: "Table 4", zone: "Terrasse", status: "Occupied", seats: 4, currentOrder: "#882" }
    ],
    "Salle Principale": [
        { id: "5", number: 5, name: "Table 5", zone: "Salle Principale", status: "Available", seats: 4 },
        { id: "6", number: 6, name: "Table 6", zone: "Salle Principale", status: "Available", seats: 6 },
        { id: "7", number: 7, name: "Table 7", zone: "Salle Principale", status: "Occupied", seats: 2, currentOrder: "#885" },
        { id: "8", number: 8, name: "Table 8", zone: "Salle Principale", status: "Bill_Requested", seats: 4, currentOrder: "#881" }
    ],
    "1er Étage": [
        { id: "9", number: 9, name: "Table 9", zone: "1er Étage", status: "Available", seats: 4 },
        { id: "10", number: 10, name: "Table 10", zone: "1er Étage", status: "Reserved", seats: 4 },
        { id: "11", number: 11, name: "Table 11", zone: "1er Étage", status: "Available", seats: 2 },
        { id: "12", number: 12, name: "Table 12", zone: "1er Étage", status: "Occupied", seats: 4, currentOrder: "#884" }
    ]
};

let storedTables = null;
try {
    storedTables = JSON.parse(localStorage.getItem('stitch_tables'));
    if (!storedTables || !storedTables['Terrasse'] || !storedTables['Salle Principale'] || !storedTables['1er Étage']) {
        storedTables = DEFAULT_TABLE_DATA;
        localStorage.setItem('stitch_tables', JSON.stringify(DEFAULT_TABLE_DATA));
    }
} catch (_) {
    storedTables = DEFAULT_TABLE_DATA;
}
let TABLE_DATA = storedTables;
let currentQRFloor = "Terrasse";
let reservations = JSON.parse(localStorage.getItem('stitch_reservations')) || [];
let qrPrintSize = 'small'; // small, medium, large

function saveTableData() {
    localStorage.setItem('stitch_tables', JSON.stringify(TABLE_DATA));
}

let qrSelectedTables = [];
let currentViewedTable = null; // Object {id, floor}
let activeQRBranch = 'tables'; // 'tables' | 'external'
let tableAlerts = [];

function loadQRTab() {
    renderQRFloors();
    renderTableGrid(currentQRFloor);
    updateQRSelectionPanel();
    bindQRBlankClickDeselect();
    window.renderExternalPortalQR();
    window.switchQRBranch(activeQRBranch);
}

window.switchQRBranch = (branch) => {
    activeQRBranch = branch === 'external' ? 'external' : 'tables';
    const tablesPanel = document.getElementById('qr-branch-tables-panel');
    const extPanel = document.getElementById('qr-branch-external-panel');
    const btnTables = document.getElementById('qr-branch-btn-tables');
    const btnExt = document.getElementById('qr-branch-btn-external');

    if (activeQRBranch === 'external') {
        tablesPanel?.classList.add('hidden');
        extPanel?.classList.remove('hidden');
        if (btnExt) btnExt.className = 'px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 bg-primary text-white shadow-sm';
        if (btnTables) btnTables.className = 'px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900';
        window.renderExternalPortalQR();
    } else {
        extPanel?.classList.add('hidden');
        tablesPanel?.classList.remove('hidden');
        if (btnTables) btnTables.className = 'px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 bg-primary text-white shadow-sm';
        if (btnExt) btnExt.className = 'px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900';
    }
};

window.renderExternalPortalQR = () => {
    const box = document.getElementById('external-qr-canvas-box');
    const urlText = document.getElementById('external-qr-url-text');
    const openBtn = document.getElementById('external-qr-open-btn');
    const portalUrl = buildExternalPortalUrl();

    if (urlText) urlText.textContent = portalUrl;
    if (openBtn) openBtn.href = portalUrl;
    if (!box || typeof QRCode === 'undefined') return;

    box.innerHTML = '';
    new QRCode(box, {
        text: portalUrl,
        width: 210,
        height: 210,
        colorDark: "#181411",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
};

window.copyExternalPortalUrl = () => {
    const portalUrl = buildExternalPortalUrl();
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(portalUrl).then(() => {
            showMerchantNotice(`Lien du Portail Livraison & Réservation copié : ${portalUrl}`);
        }).catch(() => {
            showMerchantNotice(`Lien : ${portalUrl}`);
        });
    } else {
        showMerchantNotice(`Lien : ${portalUrl}`);
    }
};

window.printExternalPortalQR = () => {
    window.renderExternalPortalQR();
    setTimeout(() => {
        const qrImg = document.querySelector('#external-qr-canvas-box img')?.src
            || document.querySelector('#external-qr-canvas-box canvas')?.toDataURL();
        if (!qrImg) return showMerchantNotice('Générez d’abord le QR code.', true);

        const win = window.open('', '_blank', 'width=520,height=720');
        if (!win) return window.print();
        win.document.write(`
            <!DOCTYPE html>
            <html><head><title>Flyer QR Livraison & Réservation — Stitch Café</title>
            <style>
              body { font-family: system-ui, sans-serif; background: #FAF8F5; margin: 0; padding: 32px; text-align: center; color: #181411; }
              .card { max-width: 400px; margin: 0 auto; background: #fff; border: 3px solid #FF5200; border-radius: 28px; padding: 32px 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); }
              .badge { display: inline-block; background: #FFF3EC; color: #FF5200; font-size: 11px; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; padding: 6px 14px; border-radius: 99px; margin-bottom: 12px; }
              h1 { font-size: 28px; margin: 0 0 6px; letter-spacing: -0.02em; }
              p.sub { font-size: 13px; color: #665e57; margin: 0 0 22px; }
              .qr-box { display: inline-block; padding: 16px; border-radius: 20px; border: 2px dashed #e5e0d8; background: #fff; }
              .steps { margin-top: 22px; text-align: left; background: #FAF8F5; padding: 16px; border-radius: 16px; font-size: 12px; line-height: 1.6; }
              .footer { margin-top: 18px; font-size: 11px; font-weight: 800; color: #FF5200; letter-spacing: 0.1em; text-transform: uppercase; }
            </style></head>
            <body>
              <div class="card">
                <div class="badge">Scannez depuis chez vous</div>
                <h1>STITCH CAFÉ</h1>
                <p class="sub">Livraison à Domicile &amp; Réservation de Table</p>
                <div class="qr-box"><img src="${qrImg}" width="220" height="220" /></div>
                <div class="steps">
                  <strong>1. Livraison Rapide :</strong> Commandez toute notre carte directement chez vous.<br/>
                  <strong>2. Réservation VIP :</strong> Réservez votre table (Salle, Terrasse ou Salon Lounge) en 30 secondes.
                </div>
                <div class="footer">Sans application • Paiement Espèces ou TPE</div>
              </div>
              <script>window.onload = () => { window.print(); };<\/script>
            </body></html>
        `);
        win.document.close();
    }, 100);
};

function renderQRFloors() {
    const container = document.getElementById('qr-floors');
    if (!container) return;
    const floors = Object.keys(TABLE_DATA);
    container.innerHTML = floors.map(floor => `
        <button onclick="switchQRFloor('${floor}')" class="floor-btn px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap shadow-sm transition-all ${floor === currentQRFloor ? 'bg-primary text-white' : 'bg-white dark:bg-zinc-800 border border-accent-grey dark:border-white/5 text-industrial-slate dark:text-zinc-300'}">
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
    const grid = document.getElementById('qr-table-grid');
    if (!grid) return;
    const tables = TABLE_DATA[floor] || [];

    grid.innerHTML = tables.map(t => {
        const isSelected = qrSelectedTables.includes(t.id);
        const isReserved = reservations.some(r => r.tableId === t.id);
        const status = isReserved ? 'Reserved' : t.status;
        const statusColor = status === 'Available' ? 'text-green-500' : status === 'Reserved' ? 'text-purple-500' : 'text-primary';
        const bgOpacity = status === 'Available' ? 'bg-green-500/5' : status === 'Reserved' ? 'bg-purple-500/5' : 'bg-primary/5';

        return `
            <div class="relative group">
                <button onclick="viewTable('${t.id}', '${floor}')" class="w-full text-left p-4 sm:p-5 rounded-[2rem] border-2 transition-all pos-card btn-white shadow-soft ${currentViewedTable?.id === t.id ? 'border-primary bg-primary/5 shadow-lg scale-[1.02]' : 'border-gray-100 dark:border-white/5 bg-white dark:bg-[#2a1e19] hover:border-gray-200'}">
                    <div class="flex items-center justify-between mb-3">
                        <span class="text-lg font-black">${t.id}</span>
                        <div class="flex items-center gap-1.5 px-2 py-0.5 rounded-full ${bgOpacity}">
                            <span class="w-1.5 h-1.5 rounded-full ${statusColor.replace('text', 'bg')} animate-pulse"></span>
                            <span class="text-[9px] font-black uppercase tracking-widest ${statusColor}">${t.status}</span>
                        </div>
                    </div>
                    <div class="flex items-center gap-2 text-gray-400">
                        <span class="material-symbols-outlined text-sm">person</span>
                        <span class="text-[10px] font-bold">Seats: ${t.seats}</span>
                    </div>
                </button>
                <!-- Selection Checkbox -->
                <div class="absolute top-3 right-3 z-10">
                    <input type="checkbox" ${isSelected ? 'checked' : ''} onchange="toggleTableSelection('${t.id}')" class="w-5 h-5 rounded-lg border-2 border-slate-200 text-primary focus:ring-primary cursor-pointer transition-all">
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

    const url = buildCustomerMenuUrl(tableId);

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
    backgroundImage.src = '../../image new/qr code .jpg';
}

window.refreshCurrentQR = () => {
    if (currentViewedTable) generateQRPreview(currentViewedTable.id);
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
        const url = buildCustomerMenuUrl(tableId);
        
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
    const url = buildCustomerMenuUrl(currentViewedTable.id);
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

// --- RESERVATIONS TAB ---
function loadReservationsTab() {
    renderReservationList();
}

function renderReservationList() {
    const container = document.getElementById('reservation-list');
    const emptyState = document.getElementById('reservation-empty');
    if (!container || !emptyState) return;
    refreshMerchantNavigation();

    if (reservations.length === 0) {
        container.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');
    container.innerHTML = reservations.map((res, index) => {
        const isConfirmed = res.status === 'Confirmed' || res.status === 'Confirmée';
        const phoneClean = String(res.phone || '').replace(/[^0-9+]/g, '');
        const waPhone = phoneClean.startsWith('0') ? '212' + phoneClean.slice(1) : phoneClean.replace(/^\+/, '');
        const guestsLabel = res.guests ? `${res.guests} Convives` : 'Table réservée';
        const zoneLabel = res.zoneLabel || res.zone || res.tableId || 'Salle Principale';

        return `
        <div class="bg-white dark:bg-[#2a1e19] p-5 rounded-[2rem] border border-gray-200 dark:border-white/5 shadow-sm flex flex-col justify-between gap-4 reservation-card">
            <div class="flex items-start justify-between gap-3">
                <div class="flex items-center gap-3.5">
                    <div class="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 rounded-2xl flex flex-col items-center justify-center text-purple-600 font-black shrink-0 border border-purple-200/60">
                        <span class="text-sm leading-none">${res.guests || 'VIP'}</span>
                        <span class="text-[8px] uppercase tracking-wider mt-0.5">Pers.</span>
                    </div>
                    <div>
                        <div class="flex items-center gap-2 flex-wrap">
                            <h5 class="font-extrabold text-base">${escapeHTML(res.clientName || 'Client')}</h5>
                            <span class="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${isConfirmed ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
                                ${isConfirmed ? 'Confirmée' : 'Nouvelle'}
                            </span>
                        </div>
                        <p class="text-xs font-bold text-primary mt-0.5">${escapeHTML(res.date)} à ${escapeHTML(res.time)} • ${escapeHTML(zoneLabel)}</p>
                        ${res.id ? `<span class="text-[10px] font-mono text-gray-400">#${escapeHTML(res.id)}</span>` : ''}
                    </div>
                </div>
                <button onclick="deleteReservation(${index})" title="Supprimer" class="p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all">
                    <span class="material-symbols-outlined text-[18px]">delete</span>
                </button>
            </div>

            ${(res.phone || res.occasion || res.notes) ? `
            <div class="p-3.5 rounded-2xl bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-white/5 space-y-1.5 text-xs">
                ${res.phone ? `
                <div class="flex items-center justify-between gap-2">
                    <span class="font-bold text-gray-600 dark:text-gray-300 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-[15px] text-primary">call</span>
                        ${escapeHTML(res.phone)}
                    </span>
                    <div class="flex items-center gap-1.5">
                        <a href="tel:${phoneClean}" class="px-2.5 py-1 rounded-lg bg-white dark:bg-white/10 border border-gray-200 text-[10px] font-extrabold text-gray-700 dark:text-white no-underline">Appeler</a>
                        ${waPhone ? `<a href="https://wa.me/${waPhone}" target="_blank" class="px-2.5 py-1 rounded-lg bg-emerald-600 text-[10px] font-extrabold text-white no-underline">WhatsApp</a>` : ''}
                    </div>
                </div>` : ''}
                ${res.occasion ? `<p class="text-[11px] text-gray-500"><strong>Occasion :</strong> ${escapeHTML(res.occasion)}</p>` : ''}
                ${res.notes ? `<p class="text-[11px] text-amber-600 font-semibold"><strong>Note :</strong> ${escapeHTML(res.notes)}</p>` : ''}
            </div>
            ` : ''}

            <div class="flex items-center justify-between pt-1 border-t border-gray-100 dark:border-white/5">
                <span class="text-[10px] font-bold uppercase tracking-widest text-gray-400">${escapeHTML(guestsLabel)}</span>
                ${!isConfirmed ? `
                <button onclick="window.confirmReservationStatus(${index})" class="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-sm hover:opacity-95 transition-all">
                    <span class="material-symbols-outlined text-[15px]">check_circle</span>
                    <span>Confirmer Réservation</span>
                </button>` : `
                <span class="text-xs font-extrabold text-emerald-600 flex items-center gap-1">
                    <span class="material-symbols-outlined text-[15px]">verified</span> Table Réservée
                </span>`}
            </div>
        </div>
        `;
    }).join('');
}

window.confirmReservationStatus = (index) => {
    const res = reservations[index];
    if (!res) return;
    res.status = 'Confirmed';
    localStorage.setItem('stitch_reservations', JSON.stringify(reservations));
    renderReservationList();
    if (res.id) {
        fetch(`${liveOrdersApiBase()}/api/reservations/${encodeURIComponent(res.id)}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'Confirmed' })
        }).catch(() => {});
    }
    showMerchantNotice(`Réservation de ${res.clientName} confirmée.`);
};

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

    const newRes = {
        id: 'RES-' + Math.floor(1000 + Math.random() * 9000),
        clientName,
        tableId,
        zoneLabel: `Table ${tableId}`,
        guests: 2,
        date,
        time,
        status: 'Confirmed',
        createdAt: Date.now()
    };
    reservations.unshift(newRes);
    localStorage.setItem('stitch_reservations', JSON.stringify(reservations));
    fetch(`${liveOrdersApiBase()}/api/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRes)
    }).catch(() => {});
    renderReservationList();
    closeReservationModal();

    if (!document.getElementById('qr-tab').classList.contains('hidden')) {
        renderTableGrid(currentQRFloor);
    }
};

window.deleteReservation = (index) => {
    const target = reservations[index];
    reservations.splice(index, 1);
    localStorage.setItem('stitch_reservations', JSON.stringify(reservations));
    if (target && target.id) {
        fetch(`${liveOrdersApiBase()}/api/reservations/${encodeURIComponent(target.id)}`, {
            method: 'DELETE'
        }).catch(() => {});
    }
    renderReservationList();
    if (!document.getElementById('qr-tab').classList.contains('hidden')) {
        renderTableGrid(currentQRFloor);
    }
};

// --- THEME MANAGER TAB (MENU APPEARANCE & STYLES) ---
let currentMerchantTheme = 'gourmet';

async function fetchMerchantThemeSettings() {
    try {
        const res = await fetch(`${liveOrdersApiBase()}/api/settings`, { cache: 'no-store' });
        if (res.ok) {
            const data = await res.json();
            if (data && data.data && data.data.activeTheme) {
                currentMerchantTheme = data.data.activeTheme;
                try { localStorage.setItem('stitch_menu_theme', currentMerchantTheme); } catch (_) {}
            }
        }
    } catch (_) {
        const stored = localStorage.getItem('stitch_menu_theme');
        if (stored) currentMerchantTheme = stored;
    }
    return currentMerchantTheme;
}

function updateThemeManagerUI(activeTheme) {
    currentMerchantTheme = activeTheme || currentMerchantTheme;

    const label = document.getElementById('merchant-active-theme-label');
    const badgeClassic = document.getElementById('badge-theme-classic');
    const badgeGourmet = document.getElementById('badge-theme-gourmet');
    const badgeSwiggy = document.getElementById('badge-theme-swiggy-bold');
    
    const cardClassic = document.getElementById('theme-card-classic');
    const cardGourmet = document.getElementById('theme-card-gourmet');
    const cardSwiggy = document.getElementById('theme-card-swiggy-bold');
    
    const btnClassic = document.getElementById('btn-activate-classic');
    const btnGourmet = document.getElementById('btn-activate-gourmet');
    const btnSwiggy = document.getElementById('btn-activate-swiggy-bold');

    const theme = currentMerchantTheme;

    if (label) {
        if (theme === 'swiggy-bold') {
            label.innerHTML = `<span class="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></span> Swiggy Bold (Photos XXL) 🚀`;
        } else if (theme === 'classic') {
            label.innerHTML = `<span class="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse"></span> Classique Minimal`;
        } else {
            label.innerHTML = `<span class="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span> Gourmet Reserve ✨`;
        }
    }

    // Reset all cards
    [
        { card: cardClassic, badge: badgeClassic, btn: btnClassic, id: 'classic', name: 'Classique' },
        { card: cardGourmet, badge: badgeGourmet, btn: btnGourmet, id: 'gourmet', name: 'Gourmet Reserve' },
        { card: cardSwiggy, badge: badgeSwiggy, btn: btnSwiggy, id: 'swiggy-bold', name: 'Swiggy Bold 🚀' }
    ].forEach(item => {
        if (!item.card) return;
        const isActive = item.id === theme;
        if (isActive) {
            item.card.classList.add('border-primary', 'shadow-2xl', 'ring-4', 'ring-primary/25');
            item.card.classList.remove('border-gray-200', 'dark:border-white/10');
            if (item.badge) {
                item.badge.className = 'px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-green-500 text-white shadow-sm flex items-center gap-1';
                item.badge.innerHTML = '<span class="material-symbols-outlined text-[14px]">check</span> Actif';
            }
            if (item.btn) {
                item.btn.disabled = true;
                item.btn.className = 'w-full py-3.5 px-5 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 bg-green-600 text-white cursor-default shadow-md';
                item.btn.innerHTML = '<span class="material-symbols-outlined text-[18px]">verified</span> <span>Thème Actuellement Actif</span>';
            }
        } else {
            item.card.classList.remove('border-primary', 'border-amber-500', 'border-orange-500', 'shadow-2xl', 'ring-4', 'ring-primary/25', 'ring-amber-500/20', 'ring-orange-500/20');
            item.card.classList.add('border-gray-200', 'dark:border-white/10');
            if (item.badge) {
                item.badge.className = 'px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-gray-100 dark:bg-white/10 text-gray-500';
                item.badge.textContent = 'Inactif';
            }
            if (item.btn) {
                item.btn.disabled = false;
                item.btn.className = 'w-full py-3.5 px-5 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 border-2 border-gray-300 dark:border-white/20 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer';
                item.btn.innerHTML = `<span class="material-symbols-outlined text-[18px]">swap_horiz</span> <span>Appliquer le Style ${item.name}</span>`;
            }
        }
    });
}

async function setMerchantTheme(newTheme) {
    if (!['classic', 'gourmet', 'swiggy-bold'].includes(newTheme)) return;
    currentMerchantTheme = newTheme;
    try { localStorage.setItem('stitch_menu_theme', newTheme); } catch (_) {}
    updateThemeManagerUI(newTheme);

    // Sync with backend API
    try {
        await fetch(`${liveOrdersApiBase()}/api/settings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ activeTheme: newTheme })
        });
    } catch (e) {
        console.warn('Erreur synchronisation thème avec API:', e);
    }

    // Refresh Simulator Iframe
    const iframe = document.getElementById('menu-theme-preview-iframe');
    if (iframe) {
        iframe.src = `../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/index.html?theme=${newTheme}&t=${Date.now()}`;
    }

    const openLink = document.getElementById('btn-open-menu-client-tab');
    if (openLink) {
        openLink.href = `../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/index.html?theme=${newTheme}`;
    }

    const names = {
        'classic': 'Classique Minimaliste',
        'gourmet': 'Gourmet Reserve ✨',
        'swiggy-bold': 'Swiggy Bold (Photos XXL) 🚀'
    };
    showMerchantNotice(`Thème "${names[newTheme] || newTheme}" activé avec succès ! Vos clients QR reçoivent la nouvelle interface en direct.`);
}
window.setMerchantTheme = setMerchantTheme;

function loadThemeManagerTab() {
    
    fetchMerchantThemeSettings().then(theme => {
        updateThemeManagerUI(theme);
    });
}
window.loadThemeManagerTab = loadThemeManagerTab;

function setSimViewport(mode) {
    const frame = document.getElementById('sim-viewport-frame');
    const btnMobile = document.getElementById('sim-btn-mobile');
    const btnTablet = document.getElementById('sim-btn-tablet');
    const btnFull = document.getElementById('sim-btn-full');

    [btnMobile, btnTablet, btnFull].forEach(b => {
        if (!b) return;
        b.className = 'px-3 py-1.5 rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-white cursor-pointer';
    });

    if (mode === 'mobile') {
        if (frame) {
            frame.style.width = '390px';
            frame.style.borderRadius = '2.5rem';
            frame.style.borderWidth = '8px';
        }
        if (btnMobile) btnMobile.className = 'px-3 py-1.5 rounded-lg bg-white dark:bg-white/20 text-primary shadow-sm font-bold cursor-pointer';
    } else if (mode === 'tablet') {
        if (frame) {
            frame.style.width = '768px';
            frame.style.borderRadius = '1.75rem';
            frame.style.borderWidth = '8px';
        }
        if (btnTablet) btnTablet.className = 'px-3 py-1.5 rounded-lg bg-white dark:bg-white/20 text-primary shadow-sm font-bold cursor-pointer';
    } else {
        if (frame) {
            frame.style.width = '100%';
            frame.style.borderRadius = '1rem';
            frame.style.borderWidth = '2px';
        }
        if (btnFull) btnFull.className = 'px-3 py-1.5 rounded-lg bg-white dark:bg-white/20 text-primary shadow-sm font-bold cursor-pointer';
    }
}
window.setSimViewport = setSimViewport;

function reloadThemeSimulator() {
    const iframe = document.getElementById('menu-theme-preview-iframe');
    if (iframe) {
        iframe.src = `../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/index.html?theme=${currentMerchantTheme}&t=${Date.now()}`;
        showMerchantNotice("Simulateur client rechargé.");
    }
}
window.reloadThemeSimulator = reloadThemeSimulator;

// --- ORDER SYNC LISTENER ---
window.addEventListener('storage', (e) => {
    if (e.key === 'stitch_live_orders') {
        try {
            const newOrders = JSON.parse(e.newValue || '[]');
            if (!Array.isArray(newOrders) || !newOrders.every(validOrder)) return;
            liveOrders = newOrders;
            renderDashboard();
            renderOrders();
            renderDeliveryTab();
            renderKitchenDisplay();
            persistMerchantSession();
        } catch { /* Ignore malformed updates from other tabs. */ }
    }
});

// --- TABLE SERVICE ALERTS BANNER ---
function renderTableServiceAlerts() {
    const banner = document.getElementById('table-alerts-banner');
    if (!banner) return;
    if (!Array.isArray(tableAlerts) || tableAlerts.length === 0) {
        banner.classList.add('hidden');
        banner.innerHTML = '';
        return;
    }
    banner.classList.remove('hidden');
    banner.innerHTML = tableAlerts.map(alert => `
        <div class="flex items-center justify-between gap-4 bg-amber-500 text-white px-5 py-3 rounded-2xl shadow-lg">
            <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-[22px]">notifications_active</span>
                <div>
                    <span class="text-xs font-black uppercase tracking-wider">Table ${escapeHTML(alert.table)} — ${escapeHTML(alert.label)}</span>
                    <span class="text-[11px] opacity-90 block">Demande reçue ${timeAgo(alert.time || Date.now())}</span>
                </div>
            </div>
            <button onclick="window.dismissTableAlert('${escapeHTML(alert.id)}')" class="px-3.5 py-1.5 rounded-xl bg-white text-amber-600 text-xs font-extrabold hover:bg-amber-50 transition-all">
                Traité
            </button>
        </div>
    `).join('');
}

window.dismissTableAlert = (id) => {
    tableAlerts = tableAlerts.filter(a => a.id !== id);
    renderTableServiceAlerts();
    fetch(`${liveOrdersApiBase()}/api/table-alerts/${encodeURIComponent(id)}`, { method: 'DELETE' }).catch(() => {});
};

// --- DELIVERY TAB (DEDICATED EXTERNAL QR DELIVERY SECTION) ---
function renderDeliveryTab() {
    const container = document.getElementById('delivery-orders-container');
    if (!container) return;
    refreshMerchantNavigation();

    const deliveryOrders = [...liveOrders, ...completedOrders]
        .filter(isDeliveryOrder)
        .sort((a, b) => b.time - a.time);

    if (deliveryOrders.length === 0) {
        container.innerHTML = `
            <div class="col-span-full bg-white dark:bg-[#2a1e19] rounded-[2.5rem] p-12 text-center border border-gray-200 dark:border-white/5 shadow-sm">
                <div class="w-20 h-20 rounded-3xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-4">
                    <span class="material-symbols-outlined text-[42px]">two_wheeler</span>
                </div>
                <h4 class="text-lg font-black">Aucune commande en livraison pour le moment</h4>
                <p class="text-xs text-gray-400 max-w-md mx-auto mt-1 mb-6">
                    Les commandes passées via le QR Code Externe (Livraison &amp; Réservation) s'afficheront ici avec le numéro WhatsApp, l'adresse complète et le point GPS Google Maps.
                </p>
                <div class="flex items-center justify-center gap-3 flex-wrap">
                    <button type="button" onclick="window.createDemoDeliveryOrder()"
                        class="px-5 py-3 rounded-2xl bg-primary text-white text-xs font-extrabold shadow-glow flex items-center gap-2 hover:scale-[1.02] transition-all">
                        <span class="material-symbols-outlined text-[18px]">add</span>
                        <span>Simuler une Commande Livraison</span>
                    </button>
                    <a href="../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/index.html?mode=delivery" target="_blank"
                        class="px-5 py-3 rounded-2xl bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-white text-xs font-extrabold flex items-center gap-2 no-underline">
                        <span class="material-symbols-outlined text-[18px]">open_in_new</span>
                        <span>Ouvrir le Menu Livraison</span>
                    </a>
                </div>
            </div>
        `;
        return;
    }

    container.innerHTML = deliveryOrders.map(o => {
        const phoneClean = String(o.deliveryPhone || '').replace(/[^0-9+]/g, '');
        const waPhone = phoneClean.startsWith('0') ? '212' + phoneClean.slice(1) : phoneClean.replace(/^\+/, '');
        const paymentLabel = o.paymentMethod === 'card' ? 'Carte TPE au livreur' : 'Espèces (Cash)';
        const gpsUrl = o.deliveryGps && o.deliveryGps.mapsUrl ? o.deliveryGps.mapsUrl : null;

        return `
        <div class="bg-white dark:bg-[#2a1e19] rounded-[2.2rem] p-6 border-2 ${o.status === 'Received' ? 'border-amber-400' : 'border-gray-100 dark:border-white/10'} shadow-lg flex flex-col justify-between gap-4">
            <div class="flex items-start justify-between gap-3">
                <div class="flex items-center gap-3.5">
                    <div class="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-600 flex items-center justify-center shrink-0">
                        <span class="material-symbols-outlined text-[26px]">two_wheeler</span>
                    </div>
                    <div>
                        <div class="flex items-center gap-2 flex-wrap">
                            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500 text-white">LIVRAISON</span>
                            <span class="font-mono text-xs font-bold text-gray-400">#${escapeHTML(o.id)}</span>
                            <span class="px-2.5 py-0.5 ${getStatusStyle(o.status)} text-[10px] font-bold rounded-full">${escapeHTML(o.status)}</span>
                        </div>
                        <h4 class="text-lg font-black mt-1">${escapeHTML(o.guestName || o.customerName || 'Client Livraison')}</h4>
                        <p class="text-[11px] text-gray-400 font-bold">${timeAgo(o.time)} • ${escapeHTML(paymentLabel)}</p>
                    </div>
                </div>
                <div class="text-right">
                    <span class="text-xl font-black text-primary">${o.total.toFixed(2)} DH</span>
                </div>
            </div>

            <!-- Delivery Contact & GPS Box -->
            <div class="p-4 rounded-2xl bg-amber-50/60 dark:bg-black/25 border border-amber-200/70 dark:border-white/10 space-y-2.5 text-xs">
                <div class="flex items-start gap-2">
                    <span class="material-symbols-outlined text-[16px] text-primary shrink-0 mt-0.5">location_on</span>
                    <div class="flex-1">
                        <span class="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 block">Adresse de Livraison</span>
                        <p class="font-bold text-gray-800 dark:text-gray-100">${escapeHTML(o.deliveryAddress || 'Adresse communiquée par téléphone')}</p>
                    </div>
                    ${gpsUrl ? `
                    <a href="${escapeHTML(gpsUrl)}" target="_blank"
                        class="px-3 py-1.5 rounded-xl bg-blue-600 text-white text-[11px] font-extrabold flex items-center gap-1 no-underline shrink-0 shadow-sm">
                        <span class="material-symbols-outlined text-[14px]">location_on</span>
                        <span>GPS Maps</span>
                    </a>` : ''}
                </div>

                ${o.deliveryPhone ? `
                <div class="flex items-center justify-between pt-2 border-t border-amber-200/50 dark:border-white/10">
                    <span class="font-extrabold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-[15px] text-emerald-600">call</span>
                        ${escapeHTML(o.deliveryPhone)}
                    </span>
                    <div class="flex items-center gap-2">
                        <a href="tel:${phoneClean}" class="px-3 py-1 rounded-lg bg-white dark:bg-white/10 border border-gray-200 text-[11px] font-bold text-gray-800 dark:text-white no-underline">Appeler</a>
                        ${waPhone ? `<a href="https://wa.me/${waPhone}" target="_blank" class="px-3 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold no-underline">WhatsApp</a>` : ''}
                    </div>
                </div>` : ''}
            </div>

            <!-- Items Summary -->
            <div class="space-y-1.5">
                ${o.items.map(i => `
                    <div class="flex items-center justify-between text-xs py-1 border-b border-gray-100 dark:border-white/5 last:border-0">
                        <span class="font-bold"><strong class="text-primary">${i.qty}x</strong> ${escapeHTML(i.name)}</span>
                        <span class="font-bold text-gray-500">${(i.price * i.qty).toFixed(2)} DH</span>
                    </div>
                `).join('')}
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center justify-between gap-2 pt-2 border-t border-gray-100 dark:border-white/5">
                <button onclick="openReceiptModal('${o.id}')" class="px-3.5 py-2.5 rounded-xl bg-gray-100 dark:bg-white/5 text-xs font-bold flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-[16px]">print</span> Ticket
                </button>
                <div class="flex items-center gap-2">
                    ${o.status === 'Received' ? `
                        <button onclick="updateOrderStatus('${o.id}', 'Preparing')" class="px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-extrabold shadow-sm">Lancer Préparation</button>
                    ` : o.status === 'Preparing' ? `
                        <button onclick="updateOrderStatus('${o.id}', 'Ready')" class="px-4 py-2.5 rounded-xl bg-amber-500 text-white text-xs font-extrabold shadow-sm">En Route (Livreur)</button>
                    ` : o.status === 'Ready' ? `
                        <button onclick="updateOrderStatus('${o.id}', 'Completed')" class="px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-extrabold shadow-sm">Marquer Livrée</button>
                    ` : `<span class="text-xs font-extrabold text-emerald-600">✓ Livrée</span>`}
                </div>
            </div>
        </div>
        `;
    }).join('');
}

window.createDemoDeliveryOrder = () => {
    const demoOrder = {
        id: 'LIV-' + Math.floor(100 + Math.random() * 900),
        table: 'Livraison',
        orderType: 'delivery',
        guestName: 'Salma Bennani',
        customerName: 'Salma Bennani',
        deliveryPhone: '06 61 42 89 10',
        deliveryAddress: 'Rue Oukaimeden, Résidence Les Orangers Appt 8, Agdal, Rabat',
        deliveryGps: {
            lat: 33.9982,
            lng: -6.8498,
            mapsUrl: 'https://www.google.com/maps?q=33.9982,-6.8498'
        },
        paymentMethod: 'cash',
        notes: 'Appeler en arrivant en bas de la résidence.',
        items: [
            { name: 'Croissant Benedict Salmon', qty: 1, price: 45, image_url: '../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/toast-signature-benedict.jpg' },
            { name: 'Matcha Latte Bio', qty: 2, price: 28, image_url: '../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/Matcha Latte.jpg' }
        ],
        total: 101,
        status: 'Received',
        time: Date.now()
    };
    liveOrders.unshift(demoOrder);
    persistMerchantSession(true);
    fetch(`${liveOrdersApiBase()}/api/live-orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(demoOrder)
    }).catch(() => {});
    renderDashboard();
    renderDeliveryTab();
    renderOrders();
    renderKitchenDisplay();
    showMerchantNotice('Commande Livraison démo créée (# ' + demoOrder.id + ')');
};

// --- DASHBOARD TAB ---
function renderDashboard() {
    renderLiveOrders(liveOrders);
    renderTableServiceAlerts();
}

function getStatusStyle(status) {
    if (status === 'Received') return 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400';
    if (status === 'Preparing') return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
    if (status === 'Ready') return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
    return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
}

function timeAgo(ms) {
    const min = Math.floor((Date.now() - ms) / 60000);
    return min <= 0 ? 'Just now' : `${min}m ago`;
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

    // Hybrid Grouping: Group orders by table / channel
    const groupedOrders = {};
    orders.forEach(order => {
        const groupKey = isDeliveryOrder(order) ? 'Livraison à Domicile' : (order.table || 'Walk-in');
        if (!groupedOrders[groupKey]) groupedOrders[groupKey] = [];
        groupedOrders[groupKey].push(order);
    });

    let html = '';

    const sortedTables = Object.keys(groupedOrders).sort((a, b) => {
        const oldestA = Math.min(...groupedOrders[a].map(o => o.time));
        const oldestB = Math.min(...groupedOrders[b].map(o => o.time));
        return oldestA - oldestB;
    });

    sortedTables.forEach(table => {
        const tableOrders = groupedOrders[table];
        const isDeliveryGroup = table === 'Livraison à Domicile';
        const headerTitle = isDeliveryGroup ? 'Livraisons à Domicile (QR Externe)' : (String(table).toLowerCase().startsWith('table') ? table : `Table ${table}`);
        const headerIcon = isDeliveryGroup ? 'two_wheeler' : 'table_restaurant';

        // Group Header
        html += `
            <div class="bg-gray-50/50 dark:bg-black/10 rounded-[2.5rem] p-4 sm:p-6 border ${isDeliveryGroup ? 'border-amber-300 dark:border-amber-500/30' : 'border-gray-200 dark:border-white/5'} mb-6 col-span-full">
                <div class="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-200 dark:border-white/5">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 bg-white dark:bg-[#2a1e19] rounded-2xl flex items-center justify-center border border-gray-100 dark:border-white/5 shadow-sm">
                            <span class="material-symbols-outlined text-primary">${headerIcon}</span>
                        </div>
                        <div>
                            <h4 class="text-xl font-black">${escapeHTML(headerTitle)}</h4>
                            <p class="text-[10px] text-gray-500 font-bold uppercase tracking-widest">${tableOrders.length} Active Tickets</p>
                        </div>
                    </div>
                    ${isDeliveryGroup ? `<button onclick="switchTab('delivery')" class="px-3.5 py-2 rounded-xl bg-amber-500 text-white text-xs font-extrabold">Ouvrir Section Livraisons</button>` : ''}
                </div>
                <div class="grid grid-cols-1 gap-4">
        `;

        // Individual Orders - Visual Cards
        tableOrders.forEach(o => {
            const displayName = o.guestName ? o.guestName : `Order ${o.id}`;
            const guestIcon = o.guestName ? o.guestName.charAt(0).toUpperCase() : '#';
            const isDel = isDeliveryOrder(o);
            const isTake = isTakeawayOrder(o);
            const modeBadge = isDel
                ? '<span class="px-2.5 py-0.5 bg-amber-500 text-white text-[9px] font-black rounded-full uppercase tracking-wider">LIVRAISON DOMICILE</span>'
                : isTake
                ? '<span class="px-2.5 py-0.5 bg-purple-600 text-white text-[9px] font-black rounded-full uppercase tracking-wider">À EMPORTER</span>'
                : '<span class="px-2.5 py-0.5 bg-emerald-600/15 text-emerald-700 text-[9px] font-black rounded-full uppercase tracking-wider">SUR PLACE</span>';

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
                <div class="bg-white dark:bg-[#2a1e19] rounded-[2.5rem] p-5 sm:p-6 border border-gray-100 dark:border-white/5 shadow-soft shadow-lg flex flex-col items-stretch transition-all gap-4 relative overflow-hidden group pos-card btn-white">
                    
                    ${o.status === 'Received' ? '<div class="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-[2.5rem] pointer-events-none"><div class="bg-orange-500 text-white text-[8px] font-bold uppercase tracking-widest text-center py-1 absolute w-24 top-4 -right-6 rotate-45 shadow-sm">NEW</div></div>' : ''}

                    <!-- Top Row: Meta -->
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 ${getStatusStyle(o.status)} rounded-2xl flex flex-col items-center justify-center shrink-0 transition-colors shadow-sm">
                                <span class="text-xl font-black font-serif italic opacity-90">${guestIcon}</span>
                            </div>
                            <div>
                                <div class="flex items-center gap-2 flex-wrap mb-0.5">
                                    <span class="text-lg font-bold">${escapeHTML(displayName)}</span>
                                    ${modeBadge}
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

                    ${isDel ? `
                    <div class="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-black/20 border border-amber-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                        <div>
                            <p class="font-bold text-gray-800 dark:text-white flex items-center gap-1.5">
                                <span class="material-symbols-outlined text-[15px] text-primary">location_on</span>
                                ${escapeHTML(o.deliveryAddress || 'Adresse Livraison')}
                            </p>
                            ${o.deliveryPhone ? `<p class="text-[11px] text-gray-500 font-bold mt-0.5">Tél : ${escapeHTML(o.deliveryPhone)} • ${o.paymentMethod === 'card' ? 'Carte TPE' : 'Espèces'}</p>` : ''}
                        </div>
                        ${o.deliveryGps && o.deliveryGps.mapsUrl ? `
                        <a href="${escapeHTML(o.deliveryGps.mapsUrl)}" target="_blank" class="px-3 py-1.5 rounded-xl bg-blue-600 text-white text-[11px] font-extrabold no-underline shrink-0 flex items-center gap-1">
                            <span class="material-symbols-outlined text-[14px]">location_on</span> Ouvrir GPS
                        </a>` : ''}
                    </div>
                    ` : ''}

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
    const order = [...liveOrders, ...completedOrders].find(o => o.id === orderId);
    if (!order) return;

    document.getElementById('order-details-id').textContent = order.guestName ? `${order.guestName}'s Order` : `ORD-${order.id}`;
    document.getElementById('order-details-table').textContent = order.table || '—';
    document.getElementById('order-details-time').textContent = timeAgo(order.time);
    document.getElementById('order-details-total').textContent = `${order.total.toFixed(2)}DH`;

    const badge = document.getElementById('order-details-status-badge');
    badge.textContent = order.status;
    badge.className = `px-2 py-0.5 ${getStatusStyle(order.status)} text-[10px] font-bold rounded-full uppercase tracking-widest border border-current/20`;

    const deliveryHeaderBlock = isDeliveryOrder(order) ? `
        <div class="bg-amber-50 dark:bg-black/30 p-4 rounded-2xl border border-amber-200 space-y-1.5 text-xs mb-3">
            <div class="font-black text-amber-700 uppercase tracking-wider text-[10px]">Détails Livraison à Domicile</div>
            <p class="font-bold text-gray-800 dark:text-white">Adresse : ${escapeHTML(order.deliveryAddress || 'Non précisée')}</p>
            ${order.deliveryPhone ? `<p class="font-bold text-gray-600 dark:text-gray-300">Téléphone : ${escapeHTML(order.deliveryPhone)}</p>` : ''}
            <p class="text-gray-500">Paiement : ${order.paymentMethod === 'card' ? 'Carte TPE à la livraison' : 'Espèces à la livraison'}</p>
            ${order.deliveryGps && order.deliveryGps.mapsUrl ? `<a href="${escapeHTML(order.deliveryGps.mapsUrl)}" target="_blank" class="inline-flex items-center gap-1 mt-1 px-3 py-1.5 rounded-lg bg-blue-600 text-white font-extrabold text-[11px] no-underline">Ouvrir Position GPS Google Maps</a>` : ''}
        </div>
    ` : '';

    // Items list
    document.getElementById('order-details-items').innerHTML = deliveryHeaderBlock + order.items.map(item => `
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
    } else {
        actions.innerHTML = `<button onclick="openReceiptModal('${order.id}'); closeOrderDetailsModal()" class="col-span-2 py-4 border border-gray-200 text-gray-800 font-bold rounded-2xl flex items-center justify-center gap-2"><span class="material-symbols-outlined">print</span> Print</button>`;
    }

    document.getElementById('order-details-modal').classList.remove('hidden');
};

window.closeOrderDetailsModal = () => document.getElementById('order-details-modal').classList.add('hidden');

window.updateOrderStatus = (orderId, newStatus) => {
    const order = liveOrders.find(o => o.id === orderId);
    if (!order || !['Received', 'Preparing', 'Ready', 'Completed'].includes(newStatus)) return;
    const detailsOpen = !document.getElementById('order-details-modal')?.classList.contains('hidden');
    order.status = newStatus;

    if (newStatus === 'Completed') {
        // Move from live display to completed history
        completedOrders.push({ ...order, completedAt: Date.now() });
        liveOrders = liveOrders.filter(o => o.id !== orderId);
        closeOrderDetailsModal();
    } else if (detailsOpen) {
        openOrderDetailsModal(orderId);
    }
    persistMerchantSession(true);
    renderDashboard();
    renderOrders();
    renderDeliveryTab();
    renderKitchenDisplay();

    // Sync status change with real-time server
    fetch(`${liveOrdersApiBase()}/api/live-orders/${encodeURIComponent(orderId)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
    }).catch(() => {});
};

// --- KDS: RECEIPT PRINTING MODAL ---
window.openReceiptModal = (orderId) => {
    // If order was passed, use it. Otherwise find it.
    const order = [...liveOrders, ...completedOrders].find(o => o.id === orderId);
    if (!order) return;

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
    persistMerchantSession(true);
    fetch(`${liveOrdersApiBase()}/api/live-orders/reset`, { method: 'POST' }).catch(() => {});

    closeEndOfShiftModal();
    renderDashboard();
    renderOrders();
    renderKitchenDisplay();
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
    
    const getKdsAccentBar = (status) => {
        if (status === 'Received') return 'bg-amber-500';
        if (status === 'Preparing') return 'bg-blue-500';
        if (status === 'Ready') return 'bg-emerald-500';
        return 'bg-gray-400';
    };

    const getKdsStatusBadge = (status) => {
        if (status === 'Received') return 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-300/50 dark:border-amber-700/40';
        if (status === 'Preparing') return 'bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300 border border-blue-300/50 dark:border-blue-700/40';
        if (status === 'Ready') return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-300/50 dark:border-emerald-700/40';
        return 'bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-300 border border-gray-200 dark:border-white/10';
    };

    const getKdsStatusBtn = (status) => {
        if (status === 'Received') return 'bg-gray-900 hover:bg-black dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 text-white';
        if (status === 'Preparing') return 'bg-primary hover:opacity-90 text-white';
        if (status === 'Ready') return 'bg-emerald-600 hover:bg-emerald-700 text-white';
        return 'bg-gray-800 text-white';
    };

    const getKdsBtnLabel = (status) => {
        if (status === 'Received') return 'Start Preparing';
        if (status === 'Preparing') return 'Mark Ready';
        if (status === 'Ready') return 'Complete Order';
        return 'Update';
    };

    const getNextStatus = (status) => {
        if (status === 'Received') return 'Preparing';
        if (status === 'Preparing') return 'Ready';
        if (status === 'Ready') return 'Completed';
        return status;
    };

    const getTimerBadge = (minutes) => {
        if (minutes >= 20) return 'text-rose-600 bg-rose-50 dark:bg-rose-950/30 dark:text-rose-400 border border-rose-200/50 dark:border-rose-900/40';
        if (minutes >= 12) return 'text-amber-600 bg-amber-50 dark:bg-amber-950/30 dark:text-amber-300 border border-amber-200/50 dark:border-amber-900/40';
        return 'text-gray-500 bg-gray-100/80 dark:bg-white/5 dark:text-gray-400 border border-gray-200/50 dark:border-white/5';
    };

    container.innerHTML = sortedOrders.map(order => {
        const elapsed = Math.floor((Date.now() - order.time) / 60000);
        const totalItems = order.items.reduce((sum, i) => sum + i.qty, 0);
        
        return `
        <div class="kitchen-card bg-white dark:bg-[#1f1714] rounded-2xl border border-gray-200/80 dark:border-white/10 shadow-sm overflow-hidden flex flex-col transition-all hover:shadow-md">
            <!-- Distinct Step Indicator Color Bar (Stage Color) -->
            <div class="h-2 ${getKdsAccentBar(order.status)} w-full"></div>
            <div class="px-5 pt-4 pb-3">
                <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-3">
                        <div class="w-11 h-11 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200/80 dark:border-white/10 flex flex-col items-center justify-center shrink-0">
                            <span class="text-[9px] font-bold text-gray-400 uppercase leading-none">Table</span>
                            <span class="text-base font-black text-gray-800 dark:text-white leading-tight">${escapeHTML(order.table || 'W')}</span>
                        </div>
                        <div>
                            <span class="font-mono text-xs font-bold text-gray-700 dark:text-gray-300">${escapeHTML(order.id)}</span>
                            <div class="flex items-center gap-2 mt-0.5">
                                <span class="px-2 py-0.5 ${getKdsStatusBadge(order.status)} text-[10px] font-bold rounded-md uppercase tracking-wider">${escapeHTML(order.status)}</span>
                                <span class="text-[10px] font-medium text-gray-400">${totalItems} item${totalItems > 1 ? 's' : ''}</span>
                            </div>
                        </div>
                    </div>
                    <!-- Minimalist Timer -->
                    <div class="flex flex-col items-end gap-0.5">
                        <div class="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${getTimerBadge(elapsed)}">
                            <span class="material-symbols-outlined text-[14px]">timer</span>
                            <span>${elapsed}m</span>
                        </div>
                        <span class="text-[9px] font-medium text-gray-400">${timeAgo(order.time)}</span>
                    </div>
                </div>
                
                ${order.customerName ? `
                <div class="flex items-center gap-2 mb-2 px-2.5 py-1 bg-gray-50 dark:bg-white/5 rounded-lg text-xs text-gray-600 dark:text-gray-400">
                    <span class="material-symbols-outlined text-[14px] text-gray-400">person</span>
                    <span class="font-semibold">${escapeHTML(order.customerName)}</span>
                </div>` : ''}
                
                ${order.notes ? `
                <div class="flex items-start gap-2 mb-2 px-2.5 py-1.5 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30 rounded-lg">
                    <span class="material-symbols-outlined text-[14px] text-amber-600 dark:text-amber-400 mt-0.5">chat_bubble</span>
                    <p class="text-xs font-medium text-amber-800 dark:text-amber-300">${escapeHTML(order.notes)}</p>
                </div>` : ''}
            </div>
            
            <!-- Items List -->
            <div class="px-5 pb-3 flex-1">
                <div class="space-y-1.5">
                    ${order.items.map(item => `
                        <div onclick="openKitchenItemModal({name:'${(item.name || '').replace(/'/g, "\\'")}',price:${item.price || 0},qty:${item.qty || 1},image_url:'${(item.image_url || '').replace(/'/g, "\\'")}',mods:${item.mods ? JSON.stringify(item.mods) : 'null'},category:'${(item.category || '').replace(/'/g, "\\'")}',description:'${(item.description || '').replace(/'/g, "\\'")}'})" class="flex items-center gap-3 px-3 py-2 bg-gray-50/70 dark:bg-white/[0.03] rounded-xl border border-gray-100 dark:border-white/5 cursor-pointer hover:border-gray-300 dark:hover:border-white/20 transition-all group">
                            <div class="w-9 h-9 rounded-lg bg-white dark:bg-[#2a1e19] border border-gray-200/60 dark:border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                                ${item.image_url ? `<img src="${escapeHTML(normalizeProductImage(item.image_url))}" alt="${escapeHTML(item.name)}" class="w-full h-full object-cover rounded-md" onerror="this.onerror=null;this.src='assets/product-placeholder.svg'">` : '<span class="material-symbols-outlined text-gray-400 text-[16px]">restaurant</span>'}
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="font-bold text-xs text-gray-800 dark:text-gray-100 truncate">${escapeHTML(item.name)}</p>
                                ${item.mods ? `<p class="text-[10px] text-gray-500 dark:text-gray-400 truncate font-medium">${escapeHTML(item.mods.join(', '))}</p>` : ''}
                            </div>
                            <div class="flex items-center gap-1.5">
                                <div class="w-7 h-7 rounded-lg bg-gray-200/80 dark:bg-white/10 flex items-center justify-center shrink-0">
                                    <span class="text-xs font-black text-gray-800 dark:text-gray-200">${item.qty}x</span>
                                </div>
                                <span class="material-symbols-outlined text-[14px] text-gray-300 group-hover:text-gray-600 dark:group-hover:text-gray-200 transition-all">open_in_new</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- Footer -->
            <div class="px-5 pb-4 mt-auto">
                <div class="flex items-center justify-between mb-3 py-2 border-t border-gray-100 dark:border-white/10">
                    <span class="text-[11px] font-bold uppercase tracking-wider text-gray-400">Total</span>
                    <span class="text-base font-black text-gray-900 dark:text-white">${Number(order.total).toFixed(2)} DH</span>
                </div>
                <button onclick="updateOrderStatus('${order.id}', '${getNextStatus(order.status)}')" 
                    class="w-full ${getKdsStatusBtn(order.status)} py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow active:scale-[0.99]">
                    <span class="material-symbols-outlined text-[16px]">${order.status === 'Received' ? 'local_fire_department' : order.status === 'Preparing' ? 'check_circle' : 'done_all'}</span>
                    <span>${getKdsBtnLabel(order.status)}</span>
                </button>
            </div>
        </div>
    `}).join('');
}

// --- POS TAB ---
async function loadPOSMenu() {
    const grid = document.getElementById('pos-menu-grid');
    if (!grid) return;

    renderPOSCategories(menuItems);
    applyPOSFilters();

    await ensureMenuData();

    renderPOSCategories(menuItems);
    applyPOSFilters();
}

function renderPOSCategories(items) {
    const container = document.getElementById('pos-categories');
    if (!container) return;
    const categories = ['All', ...new Set(items.map(i => i.category).filter(Boolean))];
    if (!categories.includes(activePOSCategory)) activePOSCategory = 'All';
    const categoryImages = {
        Brunch: 'sandwich or toast icon .jpg',
        Toast: 'sandwich or toast icon .jpg',
        'Fast Food': 'sandwich or toast icon .jpg',
        Coffee: 'black coffe icon.jpg',
        Tea: 'tea icon .png',
        Juice: 'juces icon.png',
        Juices: 'juces icon.png',
        Smoothie: 'smoothie icon.png',
        Shake: 'milkshake icon.png',
        Shakes: 'milkshake icon.png',
        Pastry: 'sweet pastry.png',
        Bakery: 'sweet pastry.png',
        Bread: 'artisanal bread.jpg'
    };
    const categoryIcon = category => categoryImages[category]
        ? `<img src="../stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/assets/subcat_icons/${encodeURIComponent(categoryImages[category])}" alt="" width="30" height="30" decoding="async">`
        : '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>';
    container.innerHTML = categories.map(cat => `
        <button type="button" data-category="${escapeHTML(cat)}" aria-pressed="${cat === activePOSCategory}" class="category-btn merchant-category-btn px-4 py-2 ${cat === activePOSCategory ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-white/5 text-gray-500'} text-xs font-bold rounded-xl transition-all whitespace-nowrap">
            <span class="merchant-category-icon" aria-hidden="true">${categoryIcon(cat)}</span>
            <span class="merchant-category-label">${escapeHTML(cat)}</span>
            <span class="merchant-category-count">${cat === 'All' ? items.length : items.filter(item => item.category === cat).length}</span>
        </button>
    `).join('');
    container.querySelectorAll('[data-category]').forEach(button => {
        button.addEventListener('click', () => filterPOSByCategory(button.dataset.category));
    });
}

window.filterPOSByCategory = (category) => {
    activePOSCategory = category;
    renderPOSCategories(menuItems);
    applyPOSFilters();
};

function applyPOSFilters() {
    const query = posSearchQuery.toLocaleLowerCase().trim();
    renderPOSMenu(menuItems.filter(item => (activePOSCategory === 'All' || item.category === activePOSCategory)
        && (!query || `${item.name} ${item.category || ''}`.toLocaleLowerCase().includes(query))));
}

function refreshPOSSelection() {
    document.querySelectorAll('.merchant-product-card').forEach(card => {
        const quantity = posCart.filter(item => item.id === card.dataset.productId).reduce((sum, item) => sum + item.quantity, 0);
        card.classList.toggle('is-selected', quantity > 0);
        const badge = card.querySelector('.merchant-product-quantity');
        if (badge) {
            badge.hidden = quantity === 0;
            badge.textContent = `${quantity} ×`;
        }
    });
}

function renderPOSMenu(items) {
    const grid = document.getElementById('pos-menu-grid');
    if (!grid) return;
    if (items.length === 0) {
        grid.innerHTML = '<div class="merchant-empty-state col-span-full text-center py-10 text-gray-500"><span class="material-symbols-outlined" aria-hidden="true">search_off</span><p>Aucun produit trouvé</p><p class="text-sm">Essayez une autre recherche ou catégorie.</p></div>';
        return;
    }
    grid.innerHTML = items.map(item => {
        const outOfStock = item.stock != null && item.stock <= 0;
        return `
        <button type="button" data-product-id="${escapeHTML(item.id)}" aria-label="Ajouter ${escapeHTML(item.name)}, ${Number(item.price).toFixed(2)} DH" ${outOfStock ? 'disabled' : ''} class="merchant-product-card bg-white dark:bg-[#2a1e19] p-4 rounded-2xl border border-gray-100 dark:border-white/5 transition-all group relative overflow-hidden pos-card text-left ${outOfStock ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary/50 cursor-pointer'}">
            <div class="merchant-product-image w-full aspect-square bg-gray-50 dark:bg-black/20 rounded-xl mb-4 overflow-hidden relative">
                <img src="${escapeHTML(normalizeProductImage(item.image_url))}" alt="${escapeHTML(item.name)}" loading="lazy" decoding="async" class="w-full h-full object-cover" onerror="this.onerror=null;this.src='assets/product-placeholder.svg'">
                <span class="merchant-product-quantity" hidden></span>
                ${outOfStock ? '<span class="merchant-product-soldout">Épuisé</span>' : '<span class="merchant-product-add material-symbols-outlined" aria-hidden="true">add</span>'}
            </div>
            <span class="merchant-product-name block font-bold text-sm mb-1">${escapeHTML(item.name)}</span>
            <div class="merchant-product-meta flex items-center justify-between mt-1">
                <span class="merchant-product-price text-primary font-black">${Number(item.price).toFixed(2)} <small>DH</small></span>
                <span class="merchant-product-stock text-[10px] font-bold text-gray-500">${item.stock != null ? `${item.stock} restants` : escapeHTML(item.category)}</span>
            </div>
        </button>
    `}).join('');
    grid.querySelectorAll('[data-product-id]').forEach(button => {
        button.addEventListener('click', () => addToCart(button.dataset.productId));
    });
    refreshPOSSelection();
}

window.addToCart = (itemId) => {
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;

    // Reject if out of stock
    if (item.stock != null && item.stock <= 0) {
        alert('This item is currently out of stock.');
        return;
    }

    // Check if adding exceeds current stock
    const cartCount = posCart.filter(c => c.id === itemId).reduce((sum, current) => sum + current.quantity, 0);
    if (item.stock != null && cartCount >= item.stock) {
        alert(`Cannot add more. Only ${item.stock} left in stock.`);
        return;
    }

    // Every item needs the same opportunity to specify its table and instructions.
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
    currentModItem = { ...item, basePrice: Number(item.price) };
    const modal = document.getElementById('pos-modifier-modal');
    if (!modal) return;

    document.getElementById('mod-item-name').textContent = item.name;
    document.getElementById('mod-item-price').textContent = `${Number(item.price).toFixed(2)}DH`;
    document.getElementById('mod-item-notes').value = '';
    const orderTable = posCart.find(cartItem => cartItem.table && cartItem.table !== 'Walk-in')?.table || '';
    document.getElementById('mod-item-table').value = orderTable;

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
    `).join('') || '<p class="merchant-no-options">No extra options for this item. You can specify the table and special instructions below.</p>';

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

    document.getElementById('mod-final-price').textContent = `${total.toFixed(2)}DH`;
};

document.getElementById('mod-add-btn')?.addEventListener('click', () => {
    if (!currentModItem) return;
    const product = menuItems.find(item => item.id === currentModItem.id);
    const quantityInCart = posCart.filter(item => item.id === currentModItem.id).reduce((sum, item) => sum + item.quantity, 0);
    if (product?.stock != null && quantityInCart >= product.stock) {
        showMerchantNotice(`Cannot add more. Only ${product.stock} left in stock.`, true);
        return;
    }

    let addedPrice = 0;
    let selectedMods = [];

    document.querySelectorAll('#mod-options-container input:checked').forEach(input => {
        const val = parseFloat(input.value);
        if (input.dataset.label) selectedMods.push(input.dataset.label);
        addedPrice += val;
    });

    const notes = document.getElementById('mod-item-notes').value.trim();
    const tableNo = document.getElementById('mod-item-table').value.trim() || 'Walk-in';
    const finalPrice = currentModItem.basePrice + addedPrice;

    // Create a unique cart ID based on options so identical customizations stack
    const modString = selectedMods.sort().join('|') + '|' + notes + '|' + tableNo;
    const cartId = `${currentModItem.id}-${Array.from(new TextEncoder().encode(modString), byte => byte.toString(16).padStart(2, '0')).join('')}`;

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
    const mobileCartCount = document.getElementById('mobile-cart-count');
    const mobileCheckoutBtn = document.getElementById('mobile-checkout-btn');
    if (!cartList) return;

    const totalItems = posCart.reduce((sum, i) => sum + i.quantity, 0);
    if (cartCount) cartCount.textContent = totalItems;
    if (mobileCartCount) mobileCartCount.textContent = totalItems;

    if (posCart.length === 0) {
        cartList.innerHTML = `
            <div class="text-center py-8 text-gray-400">
                <div class="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-3 mx-auto">
                    <span class="material-symbols-outlined text-[36px] opacity-40">shopping_cart</span>
                </div>
                <p class="text-xs font-bold uppercase tracking-widest">Cart is empty</p>
                <p class="text-[10px] text-gray-400 mt-1">Tap items to add them here</p>
            </div>`;
        if (checkoutBtn) checkoutBtn.disabled = true;
        if (mobileCheckoutBtn) mobileCheckoutBtn.disabled = true;
        
        // Reset Cash Calculator
        const cashInput = document.getElementById('cash-received');
        if (cashInput) cashInput.value = '';
        const changeEl = document.getElementById('change-to-return');
        if (changeEl) {
            changeEl.textContent = '0.00DH';
            changeEl.className = 'text-sm font-extrabold text-slate-400 dark:text-slate-500';
        }
    } else {
        cartList.innerHTML = posCart.map(item => {
            const isWalkin = !item.table || item.table === 'Walk-in' || item.table === '';
            const tableLabel = isWalkin ? 'Walk-in' : `Table ${item.table}`;
            
            return `
            <div onclick="focusPosCartItem('${item.cartId}')" class="pos-cart-item ${activePosCartItemId === item.cartId ? 'active' : ''} flex items-stretch gap-3 bg-white dark:bg-black/20 p-3 rounded-xl border-2 border-gray-200 dark:border-white/15 group cursor-pointer">
                <!-- Thumbnail -->
                <div class="w-12 h-12 rounded-xl bg-white dark:bg-[#3a2c25] border border-gray-200 dark:border-white/10 flex items-center justify-center overflow-hidden text-primary font-bold shrink-0 self-center">
                    ${item.image_url
                        ? `<img src="${escapeHTML(normalizeProductImage(item.image_url))}" alt="${escapeHTML(item.name)}" loading="lazy" decoding="async" class="w-full h-full object-cover" onerror="this.onerror=null;this.src='assets/product-placeholder.svg'">`
                        : `<span class="material-symbols-outlined text-[22px] text-primary/70">restaurant</span>`}
                </div>
                
                <!-- Product Metadata & Content -->
                <div class="flex-1 min-w-0 flex flex-col justify-between">
                    <div class="flex items-start justify-between gap-2">
                        <p class="font-extrabold text-sm text-gray-800 dark:text-gray-100 truncate">${escapeHTML(item.name)}</p>
                        <span class="text-xs font-black text-primary bg-primary/10 px-2 py-0.5 rounded-lg shrink-0">${item.quantity}x</span>
                    </div>
                    
                    <!-- Chips and custom details -->
                    ${item.mods && item.mods.length > 0 ? `
                        <div class="flex flex-wrap gap-1 mt-1 max-w-full">
                            ${item.mods.map(mod => `<span class="cart-mod-chip">${escapeHTML(mod)}</span>`).join('')}
                        </div>
                    ` : ''}
                    
                    ${item.notes ? `
                        <div class="flex items-center gap-1 mt-1 text-[9px] font-extrabold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20 px-2 py-0.5 rounded-md border border-amber-500/10 w-fit">
                            <span class="material-symbols-outlined text-[11px]">edit_note</span>
                            <span class="truncate max-w-[150px]">${escapeHTML(item.notes)}</span>
                        </div>
                    ` : ''}

                    <div class="flex items-center justify-between gap-2 mt-1.5 pt-1.5 border-t border-dashed border-gray-100 dark:border-white/5">
                        <span class="px-2 py-0.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-md text-[9px] font-black uppercase tracking-wide text-gray-500 dark:text-gray-400 shrink-0">
                            ${escapeHTML(tableLabel)}
                        </span>
                        <span class="text-sm font-black text-gray-800 dark:text-white shrink-0">${(item.price * item.quantity).toFixed(2)}DH</span>
                    </div>
                </div>

                <!-- Tactics Actions -->
                <div class="flex flex-col gap-1.5 items-center justify-center shrink-0 ml-1">
                    <button type="button" aria-label="Ajouter une unité de ${escapeHTML(item.name)}" onclick="event.stopPropagation(); updateQty('${item.cartId}', 1)" class="pos-cart-qty-btn">
                        <span class="material-symbols-outlined text-[14px] font-black">add</span>
                    </button>
                    <button type="button" aria-label="Retirer une unité de ${escapeHTML(item.name)}" onclick="event.stopPropagation(); updateQty('${item.cartId}', -1)" class="pos-cart-qty-btn">
                        <span class="material-symbols-outlined text-[14px] font-black">remove</span>
                    </button>
                </div>
            </div>
            `;
        }).join('');
        if (checkoutBtn) checkoutBtn.disabled = false;
        if (mobileCheckoutBtn) mobileCheckoutBtn.disabled = false;
    }
    updateTotals();
    refreshPOSSelection();
}

window.updateQty = (cartId, delta) => {
    const item = posCart.find(c => c.cartId === cartId);
    if (!item) return;
    const product = menuItems.find(product => product.id === item.id);
    const quantityInCart = posCart.filter(line => line.id === item.id).reduce((sum, line) => sum + line.quantity, 0);
    if (delta > 0 && product?.stock != null && quantityInCart + delta > product.stock) {
        showMerchantNotice(`Stock disponible : ${product.stock}.`, true);
        return;
    }
    item.quantity += delta;
    if (item.quantity <= 0) posCart = posCart.filter(c => c.cartId !== cartId);
    if (delta > 0) activePosCartItemId = cartId;
    if (!posCart.some(c => c.cartId === activePosCartItemId)) activePosCartItemId = posCart[0]?.cartId || null;
    renderCart();
};

function calculateCartTotals() {
    const subtotal = posCart.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const inputValue = parseFloat(document.getElementById('discount-value')?.value);
    const discountVal = Number.isFinite(inputValue) ? Math.max(0, inputValue) : 0;
    const discountType = document.getElementById('discount-type')?.value || '%';
    globalDiscount = { amount: discountVal, type: discountType };
    const discountAmount = Math.min(subtotal, discountType === '%' ? subtotal * Math.min(discountVal, 100) / 100 : discountVal);
    return { subtotal, discountAmount, total: Math.round((subtotal - discountAmount) * 100) / 100 };
}

function updateTotals() {
    const { subtotal, total } = calculateCartTotals();
    const subtotalEl = document.getElementById('pos-cart-subtotal');
    const totalEl = document.getElementById('pos-cart-total');
    const mobileTotalEl = document.getElementById('mobile-cart-total');
    if (subtotalEl) subtotalEl.textContent = `${subtotal.toFixed(2)}DH`;
    if (totalEl) totalEl.textContent = `${total.toFixed(2)}DH`;
    if (mobileTotalEl) mobileTotalEl.textContent = `${total.toFixed(2)}DH`;

    // Recalculate change in real-time when totals change
    updateChangeCalculator();
    persistMerchantSession();
}

window.updateChangeCalculator = () => {
    const totalEl = document.getElementById('pos-cart-total');
    if (!totalEl) return;
    const total = parseFloat(totalEl.textContent.replace('DH', '')) || 0;
    const cashInput = document.getElementById('cash-received');
    const changeEl = document.getElementById('change-to-return');
    if (!cashInput || !changeEl) return;

    const cashVal = parseFloat(cashInput.value) || 0;
    if (cashVal <= 0) {
        changeEl.textContent = '0.00DH';
        changeEl.className = 'text-sm font-extrabold text-slate-400 dark:text-slate-500';
        return;
    }

    const change = cashVal - total;
    if (change >= 0) {
        changeEl.textContent = `${change.toFixed(2)}DH`;
        changeEl.className = 'text-sm font-extrabold text-emerald-600 dark:text-emerald-400';
    } else {
        changeEl.textContent = `Reste: ${Math.abs(change).toFixed(2)}DH`;
        changeEl.className = 'text-xs font-bold text-rose-500';
    }
};

window.openCashDrawer = () => {
    // Show a beautiful premium feedback toast indicating the drawer opened
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-20 right-6 bg-slate-900/90 dark:bg-black/90 backdrop-blur-md text-white px-5 py-3.5 rounded-2xl shadow-2xl z-[100] flex items-center gap-3 border border-white/10 transition-all duration-300';
    toast.style.transform = 'translateY(50px)';
    toast.style.opacity = '0';
    toast.innerHTML = `
        <span class="material-symbols-outlined text-emerald-400 text-[24px]">inbox</span>
        <div>
            <p class="font-extrabold text-sm text-emerald-400">Simulation du tiroir-caisse</p>
            <p class="text-gray-400 font-medium text-[10px] mt-0.5">Mode démo · aucun équipement connecté</p>
        </div>
    `;
    document.body.appendChild(toast);
    
    // Trigger micro-animation
    requestAnimationFrame(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
    });

    setTimeout(() => {
        toast.style.transform = 'translateY(50px)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 400);
    }, 2800);
};

window.clearCart = () => {
    posCart = [];
    activePosCartItemId = null;
    const discountEl = document.getElementById('discount-value');
    if (discountEl) discountEl.value = '';
    
    // Reset Cash input
    const cashInput = document.getElementById('cash-received');
    if (cashInput) cashInput.value = '';
    
    renderCart();
};

window.checkoutPOS = async () => {
    if (posCart.length === 0 || checkoutInProgress) return;
    checkoutInProgress = true;
    const cartSnapshot = posCart.map(item => ({ ...item }));
    const { subtotal, discountAmount, total } = calculateCartTotals();
    const isDemo = !localStorage.getItem('stitch_token');
    let serverOrder = null;
    try {
        if (!isDemo) {
            const result = await fetchJSON(`${apiBase()}/api/v1/orders`, {
                method: 'POST',
                body: JSON.stringify({ items: cartSnapshot.map(item => ({ menu_item_id: item.id, quantity: item.quantity })) })
            });
            if (!result.success) throw new Error('Order rejected');
            serverOrder = result.data || {};
        }

        const orderId = String(serverOrder?.id || `POS-${Date.now()}`);
        const newOrder = {
            id: orderId,
            table: cartSnapshot[0]?.table || 'Walk-in',
            items: cartSnapshot.map(item => ({ name: item.name, qty: item.quantity, price: item.price, mods: item.mods || [], notes: item.notes || '', image_url: item.image_url || '' })),
            subtotal,
            discountAmount,
            total: Number.isFinite(Number(serverOrder?.total)) ? Number(serverOrder.total) : total,
            status: 'Received',
            source: isDemo ? 'local-demo' : 'api',
            time: Date.now()
        };

        cartSnapshot.forEach(cartItem => {
            const activeItem = menuItems.find(item => item.id === cartItem.id);
            if (activeItem?.stock != null) activeItem.stock = Math.max(0, activeItem.stock - cartItem.quantity);
        });
        persistMenuCache(menuItems);
        liveOrders.unshift(newOrder);
        clearCart();
        persistMerchantSession(true);
        fetch(`${liveOrdersApiBase()}/api/live-orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newOrder)
        }).catch(() => {});
        renderDashboard();
        renderKitchenDisplay();
        applyPOSFilters();
        showMerchantNotice(isDemo
            ? `Commande démo enregistrée dans ce navigateur · ${newOrder.total.toFixed(2)} DH. Aucun paiement effectué.`
            : `Commande envoyée · ${orderId}.`);
        switchTab('orders');
    } catch {
        showMerchantNotice('Envoi impossible. La commande reste dans le panier : vérifiez la connexion puis réessayez.', true);
    } finally {
        checkoutInProgress = false;
    }
};

window.filterPOSBySearch = (query) => {
    posSearchQuery = query;
    applyPOSFilters();
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
                <div class="flex items-center gap-2 bg-gray-100 dark:bg-black/20 p-1 rounded-xl self-start">
                    <button onclick="switchMenuSubTab('catalog')" id="subtab-catalog" class="px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeMenuSubTab === 'catalog' ? 'bg-white dark:bg-[#2a1e19] text-primary shadow-sm' : 'text-gray-500 hover:text-gray-800 dark:hover:text-white'}">Catalog</button>
                    <button onclick="switchMenuSubTab('inventory')" id="subtab-inventory" class="px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeMenuSubTab === 'inventory' ? 'bg-white dark:bg-[#2a1e19] text-primary shadow-sm' : 'text-gray-500 hover:text-gray-800 dark:hover:text-white'}">Inventory</button>
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
            <div class="bg-white dark:bg-[#2a1e19] w-full max-w-lg p-7 rounded-[2.5rem] shadow-2xl max-h-[90vh] overflow-y-auto">
                <div class="flex items-center justify-between mb-5">
                    <h3 class="text-xl font-bold">Ajouter un Nouveau Produit</h3>
                    <button onclick="hideAddProductModal()" class="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors">
                        <span class="material-symbols-outlined text-[18px]">close</span>
                    </button>
                </div>
                <div class="space-y-4">
                    <!-- Photo Upload Section with Live Preview -->
                    <div>
                        <label class="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Photo du Produit</label>
                        <div class="flex items-center gap-3 mt-1 p-3 bg-gray-50 dark:bg-black/20 rounded-2xl border border-dashed border-gray-200 dark:border-white/10">
                            <div id="new-product-img-box" class="w-16 h-16 rounded-xl bg-white dark:bg-[#3a2c25] border border-gray-200 dark:border-white/10 overflow-hidden flex items-center justify-center shrink-0 shadow-sm relative">
                                <span class="material-symbols-outlined text-gray-400 text-[26px]" id="new-product-img-icon">image</span>
                                <img id="new-product-img-el" class="w-full h-full object-cover hidden" alt="Aperçu">
                            </div>
                            <div class="flex-1 space-y-2 min-w-0">
                                <div>
                                    <label class="block text-[10px] font-bold text-gray-500 mb-1">Télécharger depuis votre appareil :</label>
                                    <input type="file" id="new-product-file" accept="image/*" class="w-full text-[11px] text-gray-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[11px] file:font-bold file:bg-primary file:text-white hover:file:opacity-90 cursor-pointer">
                                </div>
                                <input type="text" id="new-product-img-url" class="w-full px-3 py-1.5 bg-white dark:bg-[#201815] border border-gray-200 dark:border-white/10 rounded-xl text-xs placeholder:text-gray-400" placeholder="Ou coller une URL d'image (https://...)">
                            </div>
                        </div>
                    </div>
                    <div>
                        <label class="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Nom du Produit</label>
                        <input type="text" id="new-product-name" class="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border-none rounded-2xl mt-1 focus:ring-1 focus:ring-primary text-sm font-semibold" placeholder="ex: Café Crème Vanille">
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Prix (DH)</label>
                            <input type="number" id="new-product-price" step="0.5" class="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border-none rounded-2xl mt-1 focus:ring-1 focus:ring-primary text-sm font-semibold" placeholder="28.00">
                        </div>
                        <div>
                            <label class="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Catégorie</label>
                            <select id="new-product-category" class="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border-none rounded-2xl mt-1 focus:ring-1 focus:ring-primary text-sm font-semibold">
                                <option value="Brunch">Brunch</option>
                                <option value="Toast">Toast</option>
                                <option value="Fast Food">Fast Food</option>
                                <option value="Coffee">Coffee</option>
                                <option value="Tea">Tea</option>
                                <option value="Juice">Juice</option>
                                <option value="Smoothie">Smoothie</option>
                                <option value="Shake">Shake</option>
                                <option value="Pastry">Pastry</option>
                                <option value="Bread">Bread</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label class="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Stock Initial (Optionnel)</label>
                        <input type="number" id="new-product-stock" class="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border-none rounded-2xl mt-1 focus:ring-1 focus:ring-primary text-sm" placeholder="Laisser vide pour stock infini (30 par défaut)">
                    </div>
                    <div class="pt-3 flex gap-3">
                        <button onclick="hideAddProductModal()" class="flex-1 py-3.5 font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 rounded-2xl transition-all text-sm">Annuler</button>
                        <button onclick="saveNewProduct()" class="flex-1 py-3.5 bg-primary text-white font-bold rounded-2xl shadow-glow hover:scale-[1.02] transition-all text-sm">Enregistrer</button>
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

let newProductImageData = '';

function setupProductImageHandlers() {
    const fileInput = document.getElementById('new-product-file');
    const urlInput = document.getElementById('new-product-img-url');
    const imgEl = document.getElementById('new-product-img-el');
    const iconEl = document.getElementById('new-product-img-icon');

    if (fileInput) {
        fileInput.onchange = (e) => {
            const file = e.target.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                    newProductImageData = ev.target.result;
                    if (imgEl && iconEl) {
                        imgEl.src = newProductImageData;
                        imgEl.classList.remove('hidden');
                        iconEl.classList.add('hidden');
                    }
                };
                reader.readAsDataURL(file);
            }
        };
    }

    if (urlInput) {
        urlInput.oninput = (e) => {
            const val = e.target.value.trim();
            if (val) {
                newProductImageData = val;
                if (imgEl && iconEl) {
                    imgEl.src = val;
                    imgEl.classList.remove('hidden');
                    iconEl.classList.add('hidden');
                }
            } else if (!fileInput?.files?.length) {
                newProductImageData = '';
                if (imgEl && iconEl) {
                    imgEl.src = '';
                    imgEl.classList.add('hidden');
                    iconEl.classList.remove('hidden');
                }
            }
        };
    }
}

window.showAddProductModal = () => {
    newProductImageData = '';
    const imgEl = document.getElementById('new-product-img-el');
    const iconEl = document.getElementById('new-product-img-icon');
    if (imgEl) { imgEl.src = ''; imgEl.classList.add('hidden'); }
    if (iconEl) { iconEl.classList.remove('hidden'); }
    const fileInput = document.getElementById('new-product-file');
    if (fileInput) fileInput.value = '';
    const urlInput = document.getElementById('new-product-img-url');
    if (urlInput) urlInput.value = '';
    
    document.getElementById('add-product-modal')?.classList.remove('hidden');
    setupProductImageHandlers();
};

window.hideAddProductModal = () => document.getElementById('add-product-modal')?.classList.add('hidden');

window.switchMenuSubTab = (tab) => {
    activeMenuSubTab = tab;

    // Update active styles
    ['catalog', 'inventory'].forEach(t => {
        const btn = document.getElementById(`subtab-${t}`);
        if (btn) {
            btn.className = `px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeMenuSubTab === t ? 'bg-white dark:bg-[#2a1e19] text-primary shadow-sm' : 'text-gray-500 hover:text-gray-800 dark:hover:text-white'}`;
        }
    });

    const content = document.getElementById('menu-manager-content');
    if (!content) return;

    // Sub-renderer
    if (tab === 'catalog') {
        content.innerHTML = '<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6" id="menu-manager-grid"></div>';
        renderMenuManagerItems(menuItems);
    } else {
        renderInventoryManager(menuItems);
    }
};

window.saveNewProduct = async () => {
    const name = document.getElementById('new-product-name')?.value?.trim();
    const price = document.getElementById('new-product-price')?.value;
    const category = document.getElementById('new-product-category')?.value || 'Brunch';
    const stockVal = document.getElementById('new-product-stock')?.value;

    if (!name || !price) return alert('Veuillez remplir au moins le nom et le prix du produit.');

    const stock = stockVal ? parseInt(stockVal, 10) : 30;
    const finalImage = newProductImageData || document.getElementById('new-product-img-url')?.value?.trim() || PRODUCT_PLACEHOLDER;
    const newItem = {
        id: 'local-' + Date.now(),
        name,
        price: parseFloat(price),
        category,
        image_url: finalImage,
        stock,
        hasModifiers: category === 'Coffee'
    };

    try {
        const result = await fetchJSON(`${apiBase()}/api/v1/menu`, {
            method: 'POST',
            body: JSON.stringify({ name, price: parseFloat(price), category, image_url: finalImage })
        });
        if (result.success && result.data?.id) newItem.id = result.data.id;
    } catch { /* local demo fallback */ }

    menuItems.unshift(newItem);
    persistMenuCache(menuItems);
    hideAddProductModal();

    // Clear form for next time
    ['new-product-name', 'new-product-price', 'new-product-stock', 'new-product-img-url'].forEach(id => {
        if (document.getElementById(id)) document.getElementById(id).value = '';
    });
    const fileInput = document.getElementById('new-product-file');
    if (fileInput) fileInput.value = '';
    newProductImageData = '';

    switchMenuSubTab(activeMenuSubTab); // Re-render current subtab
};

window.deleteProduct = async (id) => {
    if (!confirm('Voulez-vous vraiment supprimer ce produit ?')) return;
    try {
        await fetchJSON(`${apiBase()}/api/v1/menu/${id}`, { method: 'DELETE' });
    } catch { /* demo: delete locally */ }
    menuItems = menuItems.filter(i => i.id !== id);
    persistMenuCache(menuItems);
    switchMenuSubTab(activeMenuSubTab);
};

function renderMenuManagerItems(items) {
    const grid = document.getElementById('menu-manager-grid');
    if (!grid) return;
    if (items.length === 0) {
        grid.innerHTML = '<div class="col-span-full text-center py-20 text-gray-400 font-bold uppercase tracking-widest text-xs">Aucun produit dans le menu. Ajoutez votre premier produit !</div>';
        return;
    }
    grid.innerHTML = items.map(item => `
        <div class="bg-white dark:bg-[#2a1e19] p-4 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-all">
            <div class="w-full aspect-square bg-gray-50 dark:bg-black/20 rounded-2xl mb-4 overflow-hidden flex items-center justify-center">
                ${item.image_url
            ? `<img src="${escapeHTML(normalizeProductImage(item.image_url))}" loading="lazy" decoding="async" class="w-full h-full object-cover" onerror="this.onerror=null;this.parentElement.innerHTML='<span class=\\'material-symbols-outlined text-4xl text-gray-300\\'>coffee</span>'">`
            : `<span class="material-symbols-outlined text-4xl text-gray-300">coffee</span>`}
            </div>
            <h5 class="font-bold text-sm mb-1 truncate">${escapeHTML(item.name)}</h5>
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">${escapeHTML(item.category)}</span>
            <div class="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 dark:border-white/5">
                <div>
                    <span class="text-primary font-black">${Number(item.price).toFixed(2)} DH</span>
                    ${item.stock !== null ? `<span class="block text-[10px] text-gray-500 font-bold mt-0.5">Stock: ${item.stock}</span>` : `<span class="block text-[10px] text-gray-400 mt-0.5 italic">Stock Infini</span>`}
                </div>
                <button onclick="deleteProduct('${escapeHTML(item.id)}')" class="text-gray-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 p-2 rounded-lg transition-all" title="Supprimer">
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

// --- THEME ---
function applyTheme(name) {
    document.documentElement.classList.remove('theme-blue', 'theme-emerald');
    if (name === 'blue') document.documentElement.classList.add('theme-blue');
    if (name === 'emerald') document.documentElement.classList.add('theme-emerald');
    localStorage.setItem('stitch_theme', name);
}

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
    applyTheme(localStorage.getItem('stitch_theme') || 'elite');
    
    hydrateMenuFromCache();
    restoreMerchantSession();

    // Sidebar nav buttons
    document.querySelectorAll('.nav-btn[data-tab]').forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });
    document.querySelectorAll('.collapsed-nav-btn[data-tab]').forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // Quick "Manual Order" header button
    document.getElementById('pos-quick-btn')?.addEventListener('click', () => switchTab('pos'));

    // Theme toggle
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
        const current = localStorage.getItem('stitch_theme') || 'elite';
        const next = current === 'elite' ? 'blue' : current === 'blue' ? 'emerald' : 'elite';
        applyTheme(next);
    });

    // Logout
    document.getElementById('logout-btn')?.addEventListener('click', () => {
        if (confirm('Sign out?')) {
            localStorage.removeItem('stitch_token');
            localStorage.removeItem('stitch_role');
            localStorage.removeItem('stitch_user');
            window.location.href = '../stitch_caf_menu_table_12/auth_login_page/index.html';
        }
    });

    // POS Search
    document.getElementById('pos-search')?.addEventListener('input', e => {
        filterPOSBySearch(e.target.value);
    });

    // Discount Inputs
    const discountInput = document.getElementById('discount-value');
    const discountType = document.getElementById('discount-type');

    if (discountInput && discountType) {
        discountInput.value = globalDiscount.amount || '';
        discountType.value = globalDiscount.type;
        const applyDiscount = () => {
            globalDiscount.amount = parseFloat(discountInput.value) || 0;
            globalDiscount.type = discountType.value;
            updateTotals();
        };
        discountInput.addEventListener('input', applyDiscount);
        discountType.addEventListener('change', applyDiscount);
    }
    // Cash Received input listener for change calculator
    document.getElementById('cash-received')?.addEventListener('input', () => {
        window.updateChangeCalculator();
    });

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
            btn.disabled = posCart.length === 0;
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

        currentQRData = buildCustomerMenuUrl(tableId);

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

    // Mobile Sidebar
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    const collapsedRail = document.getElementById('collapsed-quick-rail');
    const sidebarStateKey = 'merchant_sidebar_expanded';
    const setDesktopSidebar = (expanded) => {
        if (!sidebar || !mainContent) return;
        if (expanded) {
            sidebar.classList.add('md:translate-x-0');
            sidebar.classList.remove('-translate-x-full');
            mainContent.classList.remove('md:ml-20');
            mainContent.classList.add('md:ml-72');
            collapsedRail?.classList.add('hidden');
        } else {
            sidebar.classList.remove('md:translate-x-0');
            sidebar.classList.add('-translate-x-full');
            mainContent.classList.remove('md:ml-72');
            mainContent.classList.add('md:ml-20');
            collapsedRail?.classList.remove('hidden');
        }
        localStorage.setItem(sidebarStateKey, expanded ? '1' : '0');
    };
    if (window.innerWidth >= 768) {
        const savedExpanded = localStorage.getItem(sidebarStateKey) !== '0';
        setDesktopSidebar(savedExpanded);
    } else {
        collapsedRail?.classList.add('hidden');
    }
    window.addEventListener('resize', () => {
        if (window.innerWidth < 768) {
            collapsedRail?.classList.add('hidden');
            mainContent?.classList.remove('md:ml-20');
            mainContent?.classList.add('md:ml-72');
            sidebar?.classList.add('md:translate-x-0');
            return;
        }
        const savedExpanded = localStorage.getItem(sidebarStateKey) !== '0';
        setDesktopSidebar(savedExpanded);
    });
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
        if (addModal && e.target === addModal) hideAddProductModal();
        if (modModal && e.target === modModal) closeModifierModal();
    };

    // Load initial dashboard
    renderCart();
    switchTab('dashboard');
    switchMenuSubTab('catalog'); // init menu manager subtab state
    fetchMerchantThemeSettings(); // preload active menu theme

    // Auto-detect LAN URL for QR codes & start real-time order sync
    fetch(`${liveOrdersApiBase()}/api/network-info`)
        .then(r => r.ok ? r.json() : null)
        .then(info => {
            if (info?.success && info.data?.menuUrl) {
                detectedNetworkMenuUrl = info.data.menuUrl;
                if (info.data.externalPortalUrl) {
                    detectedExternalPortalUrl = info.data.externalPortalUrl;
                }
                if (currentViewedTable) generateQRPreview(currentViewedTable.id);
                window.renderExternalPortalQR();
            }
        })
        .catch(() => {});

    let lastKnownOrderIds = new Set(liveOrders.map(o => o.id));
    let lastKnownResIds = new Set((reservations || []).map(r => r.id));
    let lastKnownAlertIds = new Set();
    let isFirstLivePoll = true;

    function playNewOrderChime() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(880, ctx.currentTime);
            osc.frequency.setValueAtTime(1174.66, ctx.currentTime + 0.12);
            gain.gain.setValueAtTime(0.15, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.45);
        } catch { }
    }

    async function pollLiveOrdersFromServer() {
        try {
            const res = await fetch(`${liveOrdersApiBase()}/api/live-orders`, { cache: 'no-store' });
            if (!res.ok) return;
            const json = await res.json();
            if (!json?.success || !json.data) return;

            const serverLive = Array.isArray(json.data.liveOrders) ? json.data.liveOrders : [];
            const serverCompleted = Array.isArray(json.data.completedOrders) ? json.data.completedOrders : [];
            const serverReservations = Array.isArray(json.data.reservations) ? json.data.reservations : [];
            const serverAlerts = Array.isArray(json.data.tableAlerts) ? json.data.tableAlerts : [];

            serverLive.forEach(order => {
                if (Array.isArray(order.items)) {
                    order.items.forEach(item => { item.image_url = normalizeProductImage(item.image_url); });
                }
            });

            const validServerLive = serverLive.filter(validOrder);
            const validServerCompleted = serverCompleted.filter(validOrder);

            // Sync Reservations
            if (JSON.stringify(reservations) !== JSON.stringify(serverReservations)) {
                const newResArrived = serverReservations.filter(r => r.id && !lastKnownResIds.has(r.id));
                reservations = serverReservations;
                lastKnownResIds = new Set(serverReservations.map(r => r.id));
                localStorage.setItem('stitch_reservations', JSON.stringify(reservations));
                renderReservationList();
                if (!isFirstLivePoll && newResArrived.length > 0) {
                    const latestRes = newResArrived[0];
                    playNewOrderChime();
                    showMerchantNotice(`Nouvelle Réservation : ${latestRes.clientName} (${latestRes.guests || 2} pers.) • ${latestRes.date} à ${latestRes.time}`);
                }
            }

            // Sync Table Service Alerts
            if (JSON.stringify(tableAlerts) !== JSON.stringify(serverAlerts)) {
                const newAlertArrived = serverAlerts.filter(a => a.id && !lastKnownAlertIds.has(a.id));
                tableAlerts = serverAlerts;
                lastKnownAlertIds = new Set(serverAlerts.map(a => a.id));
                renderTableServiceAlerts();
                if (!isFirstLivePoll && newAlertArrived.length > 0) {
                    const latestAlert = newAlertArrived[0];
                    playNewOrderChime();
                    showMerchantNotice(`Table ${latestAlert.table} : ${latestAlert.label}`);
                }
            }

            // Check for brand new orders
            const newlyArrived = validServerLive.filter(o => !lastKnownOrderIds.has(o.id));
            const stateHashBefore = JSON.stringify(liveOrders.map(o => `${o.id}:${o.status}`)) + '|' + completedOrders.length;
            const stateHashAfter = JSON.stringify(validServerLive.map(o => `${o.id}:${o.status}`)) + '|' + validServerCompleted.length;

            if (stateHashBefore !== stateHashAfter) {
                liveOrders = validServerLive;
                completedOrders = validServerCompleted;
                lastKnownOrderIds = new Set(validServerLive.map(o => o.id));

                // Mark tables with active orders as Occupied
                validServerLive.forEach(o => {
                    Object.keys(TABLE_DATA).forEach(floor => {
                        const tbl = TABLE_DATA[floor].find(t => t.id === o.table);
                        if (tbl && tbl.status !== 'Occupied') {
                            tbl.status = 'Occupied';
                        }
                    });
                });
                saveTableData();

                persistMerchantSession(true);
                renderDashboard();
                renderOrders();
                renderDeliveryTab();
                renderKitchenDisplay();
                if (!document.getElementById('qr-tab')?.classList.contains('hidden')) {
                    renderTableGrid(currentQRFloor);
                }

                if (!isFirstLivePoll && newlyArrived.length > 0) {
                    const latest = newlyArrived[newlyArrived.length - 1];
                    playNewOrderChime();
                    const labelPrefix = isDeliveryOrder(latest) ? `Nouvelle Livraison (${latest.guestName || 'Client'})` : `Nouvelle commande Table ${latest.table}`;
                    showMerchantNotice(`${labelPrefix} (#${latest.id}) · ${latest.total.toFixed(2)} DH`);
                }
            }
            isFirstLivePoll = false;
        } catch { }
    }

    pollLiveOrdersFromServer();
    setInterval(pollLiveOrdersFromServer, 2000);

    Promise.allSettled([iconFontReadyPromise, ensureMenuData()])
        .then(() => {
            clearTimeout(hydrationTimeout);
            finishInitialHydration();
        });
});

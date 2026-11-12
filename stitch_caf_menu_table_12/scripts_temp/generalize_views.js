const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..');

const views = [
    { name: 'pure_noir_espresso_customization_view_1', type: 'coffee' },
    { name: 'latte_customization_view_2', type: 'coffee' },
    { name: 'toast_brunch_customization_view', type: 'brunch' },
    { name: 'brunch_customization_view', type: 'brunch' },
    { name: 'fast_food_customization_view', type: 'fast-food' },
    { name: 'milkshake_customization_view', type: 'cold-drink' },
    { name: 'orange juce_customization_view_1', type: 'cold-drink' },
    { name: 'smothie customisation review', type: 'cold-drink' },
    { name: 'petit pain bakery_customization_view', type: 'bakery' },
    { name: 'sweet_pastries_customization_view', type: 'bakery' },
    { name: 'tea_customization_view', type: 'hot-drink' }
];

const categoryData = {
    'coffee': {
        optionsTitle: 'Add Toppings',
        options: [
            { name: 'Vanilla Syrup', price: 1.50, icon: 'fluid_med' },
            { name: 'Caramel Syrup', price: 1.50, icon: 'star' },
            { name: 'Chocolate Drizzle', price: 1.50, icon: 'water_drop' }
        ],
        extraTitle: 'Sugar Level',
        extras: [
            { name: 'Zero Sugar', price: 0, icon: 'block' },
            { name: 'Low Sugar', price: 0, icon: 'opacity' },
            { name: 'Normal Sugar', price: 0, icon: 'water' },
            { name: 'High Sugar', price: 0, icon: 'shutter_speed' }
        ],
        pairings: [
            { name: 'Still Water', price: 5, image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=500' },
            { name: 'Cold Brew', price: 15, image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500' },
            { name: 'Orange Juice', price: 12, image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500' }
        ]
    },
    'fast-food': {
        optionsTitle: 'Choose Sauce',
        options: [
            { name: 'Mayonnaise', price: 0, icon: 'egg' },
            { name: 'Ketchup', price: 0, icon: 'nutrition' },
            { name: 'BBQ Sauce', price: 1.00, icon: 'fire_truck' }
        ],
        extraTitle: 'Extras',
        extras: [
            { name: 'Extra Cheese', price: 2.50, icon: 'cheese' },
            { name: 'Jalapeños', price: 1.50, icon: 'potted_plant' }
        ],
        pairings: [
            { name: 'French Fries', price: 15, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500' },
            { name: 'Coca Cola', price: 12, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500' },
            { name: 'Nuggets', price: 25, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=500' }
        ]
    },
    'bakery': {
        optionsTitle: 'Add Drizzle',
        options: [
            { name: 'Chocolate Drizzle', price: 1.50, icon: 'water_drop' },
            { name: 'Peanut Butter', price: 2.50, icon: 'nutrition' },
            { name: 'Honey', price: 1.50, icon: 'hive' }
        ],
        extraTitle: 'Preparation',
        extras: [
            { name: 'Heated', price: 0, icon: 'mode_heat' },
            { name: 'Cold', price: 0, icon: 'ac_unit' }
        ],
        pairings: [
            { name: 'Hot Latte', price: 18, image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=500' },
            { name: 'Mint Tea', price: 12, image: 'https://images.unsplash.com/photo-1544787210-2213d2422787?w=500' },
            { name: 'Cappuccino', price: 18, image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500' }
        ]
    },
    'brunch': {
        optionsTitle: 'Egg Style',
        options: [
            { name: 'Poached', price: 0, icon: 'egg' },
            { name: 'Fried', price: 0, icon: 'cooking' },
            { name: 'Scrambled', price: 0, icon: 'blender' }
        ],
        extraTitle: 'Toast Type',
        extras: [
            { name: 'Sourdough', price: 0, icon: 'bakery_dining' },
            { name: 'White Toast', price: 0, icon: 'toast' },
            { name: 'Brown Toast', price: 0, icon: 'breakfast_dining' }
        ],
        pairings: [
            { name: 'Fresh Juice', price: 15, image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500' },
            { name: 'Flat White', price: 18, image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500' },
            { name: 'Avocado Side', price: 10, image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=500' }
        ]
    },
    'cold-drink': {
        optionsTitle: 'Sweetness',
        options: [
            { name: 'No Sugar', price: 0, icon: 'block' },
            { name: 'Less Sugar', price: 0, icon: 'opacity' },
            { name: 'Normal', price: 0, icon: 'water' }
        ],
        extraTitle: 'Add-ons',
        extras: [
            { name: 'Extra Ice', price: 0, icon: 'ac_unit' },
            { name: 'Fresh Mint', price: 1, icon: 'eco' }
        ],
        pairings: [
            { name: 'Butter Croissant', price: 10, image: 'https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?w=500' },
            { name: 'Chocolate Muffin', price: 12, image: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=500' },
            { name: 'Mini Sandwich', price: 25, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500' }
        ]
    },
    'hot-drink': {
        optionsTitle: 'Sweetness',
        options: [
            { name: 'No Sugar', price: 0, icon: 'block' },
            { name: 'Honey', price: 2, icon: 'hive' },
            { name: 'Brown Sugar', price: 0, icon: 'grain' }
        ],
        extraTitle: 'Variations',
        extras: [
            { name: 'Extra Hot', price: 0, icon: 'mode_heat' },
            { name: 'With Milk', price: 2, icon: 'water_drop' }
        ],
        pairings: [
            { name: 'Almond Biscotti', price: 5, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500' },
            { name: 'Lemon Slice', price: 0, icon: 'eco' },
            { name: 'Date Fruit', price: 2, image: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=500' }
        ]
    }
};

function getHtml(view, data) {
    return `<!DOCTYPE html>
<html class="light" lang="en">
<head>
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <title>Customize - Stitch Café</title>
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
    <script src="../i18n.js"></script>
    <script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#f47b25",
                        "background-light": "#f8f7f5",
                        "background-dark": "#221710",
                    },
                    fontFamily: {
                        "display": ["Inter", "sans-serif"],
                        "sans": ["Inter", "sans-serif"]
                    },
                    borderRadius: {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "2xl": "1rem",
                        "3xl": "1.5rem",
                        "full": "9999px"
                    },
                },
            },
        }
    </script>
    <link rel="stylesheet" href="style.css" />
    <style>
        .no-scrollbar::-webkit-scrollbar { display: none !important; }
        .no-scrollbar { -ms-overflow-style: none !important; scrollbar-width: none !important; }
    </style>
</head>
<body class="bg-background-light dark:bg-background-dark text-[#1c130d] dark:text-white antialiased">
    <div class="relative mx-auto max-w-[390px] min-h-screen shadow-2xl overflow-x-hidden flex flex-col bg-background-light dark:bg-background-dark">
        <div class="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4">
            <button id="back-btn" class="size-10 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full text-white shadow-sm border border-white/30 active:scale-95 transition-transform">
                <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <div class="flex gap-2">
                <button class="size-10 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full text-white shadow-sm border border-white/30 active:scale-95 transition-transform">
                    <span class="material-symbols-outlined text-[22px]">favorite</span>
                </button>
                <button class="size-10 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full text-white shadow-sm border border-white/30 active:scale-95 transition-transform">
                    <span class="material-symbols-outlined text-[22px]">share</span>
                </button>
            </div>
        </div>
        <div id="customization-hero" class="relative h-[320px] w-full overflow-hidden shrink-0">
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
            <div id="hero-image" class="w-full h-full bg-center bg-no-repeat bg-cover"></div>
        </div>
        <div class="relative -mt-12 z-20 bg-background-light dark:bg-background-dark rounded-t-3xl pt-5 flex-1 pb-32">
            <div class="w-12 h-1 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-5"></div>
            <div class="px-4 mb-6">
                <div class="flex justify-between items-start mb-2">
                    <h1 id="product-title" class="text-[#1c130d] dark:text-white text-3xl font-bold leading-tight tracking-tight">Loading...</h1>
                    <div class="flex flex-col items-end">
                        <span id="header-price" class="text-xl font-bold text-primary">0.00DH</span>
                        <div class="flex items-center gap-1 mt-1">
                            <span class="material-symbols-outlined text-yellow-500 text-[16px] fill-current">star</span>
                            <span class="text-sm font-bold">4.9</span>
                            <span class="text-xs text-gray-500">(250+)</span>
                        </div>
                    </div>
                </div>
                <p id="product-description" class="text-[#9c6c49] dark:text-gray-400 text-[12px] leading-snug">
                    Customizing your selection to perfection.
                </p>
            </div>

            <!-- Primary Options -->
            <div class="px-4 mb-8">
                <h3 class="text-[20px] font-bold mb-4">${data.optionsTitle}</h3>
                <div class="grid grid-cols-3 gap-3">
                    ${data.options.map((opt, i) => `
                    <div data-option="${opt.name}" data-price="${opt.price}" class="option-card relative flex flex-col items-center justify-center px-2 py-4 rounded-[20px] border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 text-center h-28 cursor-pointer active:scale-95 transition-all">
                        <span class="material-symbols-outlined text-gray-400 mb-2 text-[24px]">${opt.icon}</span>
                        <p class="text-[11px] font-bold leading-tight dark:text-gray-200">${opt.name}</p>
                        ${opt.price > 0 ? `<p class="text-[10px] text-primary font-bold mt-1">+${opt.price.toFixed(2)}DH</p>` : `<p class="text-[10px] text-gray-400 mt-1">Free</p>`}
                    </div>`).join('')}
                </div>
            </div>

            <!-- Extras Section -->
            <div class="px-4 mb-8">
                <h3 class="text-[20px] font-bold mb-4">${data.extraTitle}</h3>
                <div class="${data.extraTitle === 'Sugar Level' || data.extraTitle === 'Sweetness' ? 'grid grid-cols-4 gap-2' : 'space-y-3'}">
                    ${data.extras.map(ext => {
                        if (data.extraTitle === 'Sugar Level' || data.extraTitle === 'Sweetness') {
                            return `
                            <div data-extra="${ext.name}" data-price="${ext.price}" class="extra-row relative flex flex-col items-center justify-center px-1 py-3 rounded-[16px] border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 text-center h-24 cursor-pointer active:scale-95 transition-all">
                                <span class="material-symbols-outlined text-gray-400 mb-1 text-[20px]">${ext.icon}</span>
                                <p class="text-[10px] font-bold leading-tight dark:text-gray-200">${ext.name}</p>
                                <div class="check-mark absolute top-[-4px] right-[-4px] bg-primary text-white rounded-full p-[1px] hidden">
                                    <span class="material-symbols-outlined text-[10px]">check</span>
                                </div>
                            </div>`;
                        }
                        return `
                        <div data-extra="${ext.name}" data-price="${ext.price}" class="extra-row flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-[20px] shadow-sm border border-gray-100 dark:border-gray-800 cursor-pointer active:scale-[0.99] transition-all">
                            <div class="flex items-center gap-4">
                                <div class="size-10 flex items-center justify-center bg-primary/10 rounded-xl text-primary">
                                    <span class="material-symbols-outlined text-[20px]">${ext.icon}</span>
                                </div>
                                <div>
                                    <p class="text-[14px] font-bold leading-none dark:text-white">${ext.name}</p>
                                    ${ext.price > 0 ? `<p class="text-[11px] text-primary font-bold mt-1.5">+${ext.price.toFixed(2)}DH</p>` : `<p class="text-[11px] text-gray-400 mt-1.5">No charge</p>`}
                                </div>
                            </div>
                            <div class="check-circle size-6 rounded-full border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center transition-colors">
                                <span class="material-symbols-outlined text-[16px] text-white hidden">check</span>
                            </div>
                        </div>`;
                    }).join('')}
                </div>
            </div>

            <!-- Perfect Pairing Section -->
            <div class="mb-6 perfect-pairing-section">
                <h2 class="px-4 text-[#1c130d] dark:text-white text-[20px] font-bold mb-4">Perfect Pairing</h2>
                <div class="flex overflow-x-auto no-scrollbar gap-4 pb-4 px-4">
                    ${data.pairings.map(pair => `
                    <div class="pairing-card flex-shrink-0 w-64 p-3 bg-white dark:bg-zinc-900 rounded-[24px] border border-[#e8d9ce] dark:border-zinc-800 flex items-center gap-3 active:scale-95 transition-transform cursor-pointer">
                        ${pair.image ? `<div class="w-16 h-16 rounded-2xl bg-cover bg-center shrink-0 shadow-sm" style="background-image: url('${pair.image}');"></div>` : `<div class="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0"><span class="material-symbols-outlined text-gray-400">${pair.icon || 'fastfood'}</span></div>`}
                        <div class="flex-1 min-w-0">
                            <p class="text-[14px] font-bold truncate text-[#1c130d] dark:text-white">${pair.name}</p>
                            <p class="text-[12px] font-bold text-primary mt-1">${pair.price.toFixed(2)}DH</p>
                        </div>
                        <button class="pairing-add-btn bg-primary/10 text-primary w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all">
                            <span class="material-symbols-outlined text-[20px]">add</span>
                        </button>
                    </div>`).join('')}
                </div>
            </div>

            <!-- Stacked Premium Action Section (Two-Section Design) -->
            <div class="sticky bottom-8 mx-auto w-full max-w-[350px] z-[100] flex flex-col items-center gap-4 mt-12 mb-4 pointer-events-none">
                <!-- Section 1: Minimal Quantity Pill -->
                <div class="pointer-events-auto bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl px-3 py-1.5 rounded-full border border-white/40 dark:border-zinc-800 shadow-[0_10px_30px_rgba(0,0,0,0.1)] flex items-center gap-4 scale-95 transition-all hover:scale-100">
                    <button id="qty-minus" class="w-8 h-8 flex items-center justify-center text-xl text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">−</button>
                    <div class="flex flex-col items-center min-w-[40px]">
                        <span class="text-[8px] text-gray-400 uppercase font-black tracking-tighter">Qty</span>
                        <span id="qty-value" class="text-sm font-black dark:text-white leading-none">1</span>
                    </div>
                    <button id="qty-plus" class="w-8 h-8 flex items-center justify-center text-xl text-primary hover:scale-125 transition-transform">+</button>
                </div>

                <!-- Section 2: Action & Price Pill -->
                <button id="add-to-order-btn" class="pointer-events-auto w-full bg-primary hover:bg-orange-600 h-16 rounded-[28px] text-white flex items-center justify-between px-8 shadow-[0_15px_40px_rgba(244,123,37,0.4)] active:scale-[0.98] transition-all group overflow-hidden relative">
                    <!-- Shine Effect -->
                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
                    
                    <div class="flex items-center gap-3">
                        <div class="bg-white/20 p-2 rounded-xl">
                            <span class="material-symbols-outlined text-[20px]">shopping_cart</span>
                        </div>
                        <span class="text-[14px] uppercase font-black tracking-widest">Add to Order</span>
                    </div>
                    
                    <div class="flex flex-col items-end">
                        <span class="text-[9px] opacity-70 uppercase font-bold tracking-widest">Total</span>
                        <span id="total-price" class="text-[18px] font-black leading-none">0.00DH</span>
                    </div>
                </button>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
    <script src="../nav-bar.js?v=9"></script>
    <script src="../pairing-handler.js"></script>
    <script src="../image-viewer.js"></script>
</body>
</html>`;
}

function getJs(view, data) {
    return `document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const itemName = params.get('name') || 'Item';
    const itemPrice = parseFloat(params.get('price') || '0');
    const itemImage = params.get('image');
    const itemId = params.get('id');

    const state = {
        basePrice: itemPrice,
        selectedOption: null,
        selectedExtras: [],
        qty: 1
    };

    // Initialize UI
    const titleEl = document.getElementById('product-title');
    const priceHeaderEl = document.getElementById('header-price');
    const heroImageEl = document.getElementById('hero-image');
    const totalPriceEl = document.getElementById('total-price');
    const qtyValueEl = document.getElementById('qty-value');

    titleEl.textContent = itemName;
    priceHeaderEl.textContent = itemPrice.toFixed(2) + 'DH';
    if (itemImage) {
        heroImageEl.style.backgroundImage = \`url('\${decodeURIComponent(itemImage)}')\`;
    }

    function updateUI() {
        let total = state.basePrice;
        
        // Add option price
        if (state.selectedOption) {
            total += state.selectedOption.price;
        }

        // Add extras prices
        state.selectedExtras.forEach(ext => {
            total += ext.price;
        });

        const finalTotal = total * state.qty;
        totalPriceEl.textContent = finalTotal.toFixed(2) + 'DH';
        qtyValueEl.textContent = state.qty;
    }

    // Option Selection
    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.option-card').forEach(c => {
                c.classList.remove('border-primary', 'bg-primary/5');
                c.classList.add('border-gray-200', 'dark:border-gray-800');
                const check = c.querySelector('.absolute.top-[-6px]');
                if (check) check.remove();
            });

            card.classList.add('border-primary', 'bg-primary/5');
            card.classList.remove('border-gray-200', 'dark:border-gray-800');

            const check = document.createElement('div');
            check.className = 'absolute top-[-6px] right-[-6px] bg-primary text-white rounded-full p-[2px]';
            check.innerHTML = '<span class="material-symbols-outlined text-[12px]">check</span>';
            card.appendChild(check);

            state.selectedOption = {
                name: card.dataset.option,
                price: parseFloat(card.dataset.price)
            };
            updateUI();
        });
    });

    // Extras Selection
    document.querySelectorAll('.extra-row').forEach(row => {
        row.addEventListener('click', () => {
            const name = row.dataset.extra;
            const price = parseFloat(row.dataset.price);
            const checkCircle = row.querySelector('.check-circle');
            const checkMark = row.querySelector('.check-mark');
            const checkIcon = checkCircle ? checkCircle.querySelector('span') : checkMark.querySelector('span');

            const index = state.selectedExtras.findIndex(e => e.name === name);
            if (index > -1) {
                state.selectedExtras.splice(index, 1);
                if (checkCircle) {
                    checkCircle.classList.remove('bg-primary', 'border-primary');
                    checkIcon.classList.add('hidden');
                } else {
                    row.classList.remove('border-primary', 'bg-primary/5');
                    row.classList.add('border-gray-200', 'dark:border-gray-800');
                    checkMark.classList.add('hidden');
                }
            } else {
                state.selectedExtras.push({ name, price });
                if (checkCircle) {
                    checkCircle.classList.add('bg-primary', 'border-primary');
                    checkIcon.classList.remove('hidden');
                } else {
                    row.classList.add('border-primary', 'bg-primary/5');
                    row.classList.remove('border-gray-200', 'dark:border-gray-800');
                    checkMark.classList.remove('hidden');
                }
            }
            updateUI();
        });
    });

    // Quantity
    document.getElementById('qty-plus').addEventListener('click', () => {
        state.qty++;
        updateUI();
    });
    document.getElementById('qty-minus').addEventListener('click', () => {
        if (state.qty > 1) {
            state.qty--;
            updateUI();
        }
    });

    // Add to Order
    document.getElementById('add-to-order-btn').addEventListener('click', (e) => {
        const btn = e.currentTarget;
        const originalHtml = btn.innerHTML;
        
        // Save to cart logic
        const cartItem = {
            id: itemId || 'custom-' + Date.now(),
            name: itemName,
            price: (state.basePrice + (state.selectedOption ? state.selectedOption.price : 0) + state.selectedExtras.reduce((s,e) => s+e.price, 0)),
            qty: state.qty,
            image_url: itemImage,
            options: {
                selection: state.selectedOption ? state.selectedOption.name : 'Standard',
                extras: state.selectedExtras.map(e => e.name).join(', ')
            }
        };

        const cart = JSON.parse(localStorage.getItem('stitch_cart') || '[]');
        cart.push(cartItem);
        localStorage.setItem('stitch_cart', JSON.stringify(cart));

        btn.innerHTML = '<span class="uppercase tracking-widest text-[14px]">Added to Order!</span><span class="material-symbols-outlined">check_circle</span>';
        btn.classList.replace('bg-primary', 'bg-green-600');

        setTimeout(() => {
            window.location.href = '../swiggy-style_elite_main_menu_390x2500/index.html';
        }, 1000);
    });

    // Back Button
    document.getElementById('back-btn').addEventListener('click', () => {
        window.history.back();
    });

    // Pairings
    document.querySelectorAll('.pairing-card').forEach(card => {
        card.addEventListener('click', () => {
            const name = card.querySelector('p.font-bold').textContent;
            const price = parseFloat(card.dataset.price || '0'); // Need to ensure price is in dataset or elsewhere
            // For now use a simpler feedback
            const addBtn = card.querySelector('.pairing-add-btn');
            addBtn.innerHTML = '<span class="material-symbols-outlined text-[20px]">check</span>';
            addBtn.classList.replace('bg-primary/10', 'bg-green-100');
            addBtn.classList.replace('text-primary', 'text-green-600');
            
            // Actually add to cart
            const pairItem = {
                id: 'pairing-' + Date.now(),
                name: name,
                price: parseFloat(card.querySelector('.text-primary').textContent),
                qty: 1,
                image_url: '' // Extract if needed
            };
            const cart = JSON.parse(localStorage.getItem('stitch_cart') || '[]');
            cart.push(pairItem);
            localStorage.setItem('stitch_cart', JSON.stringify(cart));

            setTimeout(() => {
                addBtn.innerHTML = '<span class="material-symbols-outlined text-[20px]">add</span>';
                addBtn.classList.replace('bg-green-100', 'bg-primary/10');
                addBtn.classList.replace('text-green-600', 'text-primary');
            }, 2000);
        });
    });

    updateUI();
});`;
}

// Main execution
views.forEach(view => {
    const data = categoryData[view.type];
    if (!data) return;

    const viewPath = path.join(baseDir, view.name);
    if (!fs.existsSync(viewPath)) {
        fs.mkdirSync(viewPath, { recursive: true });
    }

    fs.writeFileSync(path.join(viewPath, 'index.html'), getHtml(view, data));
    fs.writeFileSync(path.join(viewPath, 'script.js'), getJs(view, data));
    
    // Ensure style.css exists or is standard
    const cssPath = path.join(viewPath, 'style.css');
    if (!fs.existsSync(cssPath)) {
        fs.writeFileSync(cssPath, `@tailwind base;
@tailwind components;
@tailwind utilities;

.hide-scrollbar::-webkit-scrollbar {
    display: none;
}
.hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

body {
    -webkit-tap-highlight-color: transparent;
}

.option-card.active {
    border-color: #f47b25;
    background-color: rgba(244, 123, 37, 0.05);
}
`);
    }
});

console.log('Successfully generalized all customization views.');

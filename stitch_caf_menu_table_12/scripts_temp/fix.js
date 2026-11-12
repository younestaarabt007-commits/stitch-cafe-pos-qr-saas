const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..');

const views = [
    'brunch_customization_view',
    'fast_food_customization_view',
    'latte_customization_view_2',
    'milkshake_customization_view',
    'orange juce_customization_view_1',
    'petit pain bakery_customization_view',
    'pure_noir_espresso_customization_view_1',
    'sweet_pastries_customization_view',
    'tea_customization_view',
    'toast_brunch_customization_view'
];

const imgJuice = 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
const imgCroissant = 'https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
const imgToast = 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
const imgBurger = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
const imgSoda = 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
const imgCoffee = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMMajC442B9OyqOEg1kiXm5UdrfIxiqbwldpPV7swoS0uF2SzRZh7kfd5rSOktPwbiXq1VKiGcG33mn9Q3_gf1mSa96WwDF4BFJgLrg3DCGZp4Mfw-BPYpU_H7VS2nji829sdByGo2CSPJ2gumJLOfpa-x3EoHsOSL7TO6LcCGYpZ9vh9qSOQ8LnCT9uE8y-sGKuzCoGlUpj9d0bl_UEvXi7Afy0TDy74WcxbKhCXWKLAcpKlwA-JDTCsRhuCzv4WvUxGpKHwkVB8';
const imgPainChoc = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBX9qQ9_xXvGL_cbCEKCw8X6g6oOrR-dIMMY-tPuBPrJ_ohJBNs4TWqPMnY9yLfzTRCqt2pyuIfBOgf75tdzlGLWywAMRKAowMZTrXiP9klWLg0BJ_cw5Rk2NwHTDPS6HDSDTAhki60UXGFX-7bSYZEdQ6p7KkEaBUIlmf9ZSK8AKrfrlPAcKgFpF-Zt9ivUHQIqnNKEX5bgAaUvetTtSzFahEVek29OZKPk-sD1GLsq09PjKASiVvXAQBLKaUP_a7VyuFum91iCKs';
const imgBiscotti = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCijIJH9vIJ_HjbKsuBQJ76esws1gYzr5qA1OWmBVyC1EAUzh-VNVXxsR2ehd8ncwqNJHaaEvCoDTcVwWIoyq4jGr-r4CqvL7gBgnUYrdJMgxs67nT_9Lk1yzPwRHyxfvMj40B1OrPhOLwxoMjvNmh7Bt6UOZeOg1mXgwPKOnI_vBYckR7KXsxg_FViA3Z_s5_xsR84LKkc6fXJVE-P29Ox44RTjdha6G3xI7lryhdIjr5qNXLp6NY5o__zOA0IEPN4tCavRYybQNk';

function buildItem(img, name, price) {
    return `
          <div class="flex-shrink-0 w-60 p-2.5 bg-white dark:bg-zinc-900 rounded-[16px] border border-[#e8d9ce] dark:border-zinc-800 flex items-center gap-2.5">
            <div class="w-14 h-14 rounded-lg bg-cover bg-center shrink-0" style="background-image: url('${img}');"></div>
            <div class="flex-1 min-w-0">
              <p class="text-[13px] font-bold truncate text-[#1c130d] dark:text-white">${name}</p>
              <p class="text-[11px] font-semibold text-primary mt-0.5">${price}</p>
            </div>
            <button class="bg-primary/10 text-primary px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shrink-0">Add</button>
          </div>`;
}

const pairingA = `
      <div class="mb-6 perfect-pairing-section">
        <h2 class="text-[#1c130d] dark:text-white text-[20px] font-bold mb-4">Perfect Pairing</h2>
        <div class="flex overflow-x-auto hide-scrollbar gap-3 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
${buildItem(imgCoffee, 'Hot Latte', '18.00DH')}
${buildItem(imgJuice, 'Fresh Orange Juice', '15.00DH')}
${buildItem(imgBurger, 'Mini Sandwich', '25.00DH')}
${buildItem(imgPainChoc, 'Pain au Chocolat', '5.50DH')}
${buildItem(imgBiscotti, 'Almond Biscotti', '3.50DH')}
        </div>
      </div>`;

const pairingB = `
      <div class="mb-6 perfect-pairing-section">
        <h2 class="text-[#1c130d] dark:text-white text-[20px] font-bold mb-4">Perfect Pairing</h2>
        <div class="flex overflow-x-auto hide-scrollbar gap-3 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
${buildItem(imgSoda, 'Cold Cola', '12.00DH')}
${buildItem(imgCroissant, 'Butter Croissant', '10.00DH')}
${buildItem(imgToast, 'Avocado Toast', '35.00DH')}
${buildItem(imgJuice, 'Fresh Orange Juice', '15.00DH')}
${buildItem(imgCoffee, 'Iced Coffee', '20.00DH')}
        </div>
      </div>`;

for (const view of views) {
    const indexPath = path.join(baseDir, view, 'index.html');
    if (!fs.existsSync(indexPath)) continue;

    let html = fs.readFileSync(indexPath, 'utf-8');

    // Replace the first h1
    html = html.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/i, (match, textContent) => {
        return `<h1 id="product-title" class="text-[#1c130d] dark:text-white text-3xl font-bold leading-tight tracking-tight">${textContent.trim()}</h1>`;
    });

    let pairingHtml = view.includes('bakery') || view.includes('latte') || view.includes('pastries') || view.includes('tea') || view.includes('pure_noir') ? pairingA : pairingB;

    // This regex looks for the perfect pairing div.
    // It starts at <div class="mb-6"> containing "Perfect Pairing" and captures everything until the next <div class="mb-6"> or <!-- Add to Order or <div class="mt-10
    const rx = /<div class="mb-6">\s*<h[23][^>]*>Perfect (?:To-Go )?Pairings?[\s\S]*?(?=<div class="mb-6">|<div[^>]*class="mt-10 mb-8|<!-- Add to Order)/i;
    
    if (rx.test(html)) {
        html = html.replace(rx, pairingHtml + '\n      ');
    } else {
        html = html.replace(/(<!-- Add to Order Bar -->\s*<div[^>]*class="mt-10 mb-8)/, `${pairingHtml}\n      $1`);
    }

    fs.writeFileSync(indexPath, html, 'utf-8');
    console.log(`Updated ${view}/index.html`);
}

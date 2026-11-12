const fs = require('fs');
const path = require('path');
const baseDir = path.join(__dirname, 'stitch_caf_menu_table_12');

const foodBlock = `
      <div class="mb-6 px-4">
        <h2 class="text-[#1c130d] dark:text-white text-section font-bold mb-4">Extras & Add-ons</h2>
        <div class="flex flex-col gap-3">
          <button data-extra="extra-sauce" data-price="2.00"
            class="flex items-center justify-between p-3 rounded-lg border border-[#e8d9ce] dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
            <span class="font-bold text-product text-[#1c130d] dark:text-white">Extra Sauce / Drizzle</span>
            <span class="text-xs text-primary font-bold">+2.00DH</span>
          </button>
          <button data-extra="extra-serving" data-price="5.00"
            class="flex items-center justify-between p-3 rounded-lg border border-[#e8d9ce] dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
            <span class="font-bold text-product text-[#1c130d] dark:text-white">Extra Serving</span>
            <span class="text-xs text-primary font-bold">+5.00DH</span>
          </button>
        </div>
      </div>

      <div class="mb-6 px-4">
        <h2 class="text-[#1c130d] dark:text-white text-section font-bold mb-4">Perfect Pairing</h2>
        <div class="grid grid-cols-2 gap-4">
          <button data-extra="cold-drink" data-price="15.00"
            class="group relative p-4 rounded-[20px] border border-[#e8d9ce] dark:border-zinc-800 bg-white dark:bg-zinc-900/50 flex flex-col gap-1 cursor-pointer">
            <p class="font-bold text-product text-[#1c130d] dark:text-white">Cold Beverage</p>
            <p class="text-sm text-primary font-bold">+15.00DH</p>
          </button>
          <button data-extra="hot-coffee" data-price="18.00"
            class="group relative p-4 rounded-[20px] border border-[#e8d9ce] dark:border-zinc-800 bg-white dark:bg-zinc-900/50 flex flex-col gap-1 cursor-pointer">
            <p class="font-bold text-product text-[#1c130d] dark:text-white">Hot Coffee</p>
            <p class="text-sm text-primary font-bold">+18.00DH</p>
          </button>
        </div>
      </div>
`;

const drinkBlock = `
      <div class="mb-6 px-4">
        <h2 class="text-[#1c130d] dark:text-white text-section font-bold mb-4">Drink Options</h2>
        <div class="flex flex-col gap-3">
          <button data-extra="less-sweet" data-price="0"
            class="flex items-center justify-between p-3 rounded-lg border border-[#e8d9ce] dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
            <span class="font-bold text-product text-[#1c130d] dark:text-white">Less Sweet</span>
          </button>
          <button data-extra="extra-shot" data-price="4.00"
            class="flex items-center justify-between p-3 rounded-lg border border-[#e8d9ce] dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
            <span class="font-bold text-product text-[#1c130d] dark:text-white">Extra Flavor / Shot</span>
            <span class="text-xs text-primary font-bold">+4.00DH</span>
          </button>
        </div>
      </div>

      <div class="mb-6 px-4">
        <h2 class="text-[#1c130d] dark:text-white text-section font-bold mb-4">Perfect Pairing</h2>
        <div class="grid grid-cols-2 gap-4">
          <button data-extra="croissant" data-price="12.00"
            class="group relative p-4 rounded-[20px] border border-[#e8d9ce] dark:border-zinc-800 bg-white dark:bg-zinc-900/50 flex flex-col gap-1 cursor-pointer">
            <p class="font-bold text-product text-[#1c130d] dark:text-white">Butter Croissant</p>
            <p class="text-sm text-primary font-bold">+12.00DH</p>
          </button>
          <button data-extra="cookie" data-price="10.00"
            class="group relative p-4 rounded-[20px] border border-[#e8d9ce] dark:border-zinc-800 bg-white dark:bg-zinc-900/50 flex flex-col gap-1 cursor-pointer">
            <p class="font-bold text-product text-[#1c130d] dark:text-white">Chocolate Cookie</p>
            <p class="text-sm text-primary font-bold">+10.00DH</p>
          </button>
        </div>
      </div>
`;

function manualReplace(view, fileRegex, replacement) {
    const indexPath = path.join(baseDir, view, 'index.html');
    if (fs.existsSync(indexPath)) {
        let html = fs.readFileSync(indexPath, 'utf8');
        if(html.match(fileRegex)){
            html = html.replace(fileRegex, replacement);
            fs.writeFileSync(indexPath, html);
            console.log('Fixed ' + view);
        } else {
            console.log('Regex missed ' + view);
        }
    }
}

// brunch_customization_view
manualReplace('brunch_customization_view', /<!-- Choose Bread -->[\s\S]*?(?=<!-- Bottom Bar -->)/i, foodBlock + "\n            ");

// latte_customization_view_2
manualReplace('latte_customization_view_2', /<!-- Size Selection -->[\s\S]*?(?=<!-- Add to Order Bar -->)/i, drinkBlock + "\n            ");

// milkshake_customization_view
// It has `<div class="mt-8">` blocks and then `<!-- Add to Order Bar -->`
manualReplace('milkshake_customization_view', /(<\/p>\s*<\/div>\s*)<div class="mt-8">[\s\S]*?(?=<!-- Add to Order Bar -->)/i, "$1" + drinkBlock + "\n            ");

// pure_noir_espresso_customization_view_1
manualReplace('pure_noir_espresso_customization_view_1', /<!-- Brew Method -->[\s\S]*?(?=<!-- Fixed Bottom Bar -->)/i, drinkBlock + "\n            ");

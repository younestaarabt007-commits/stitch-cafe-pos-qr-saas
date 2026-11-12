const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'stitch_caf_menu_table_12');

const getDirs = source => fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && dirent.name.includes('customization_view'))
    .map(dirent => dirent.name);

const views = getDirs(baseDir);

const genericHeroBackgroundReplacement = (html) => {
    // We remove any complex CSS backgrounds or inline hardcoded URLs 
    // from the hero div and just let JS set it.
    let modified = html.replace(/style=['"]background-image:\s*url\([^)]+\);?['"]/gi, '');
    
    // Standardize Fonts
    modified = modified.replace(/<link[^>]*href=['"]https:\/\/fonts\.googleapis\.com\/css2\?family=[^>]*>/gi, '<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />');
    
    return modified;
};

// Simplified blocks
function getOptionsBlock(type) {
    if (type === 'food') {
        return `
      <div class="mt-8">
        <h2 class="text-[#1c130d] dark:text-white text-lg font-bold mb-4">Extras & Add-ons</h2>
        <div class="flex flex-col gap-3">
          <div class="flex items-center justify-between p-4 rounded-lg bg-background-light dark:bg-zinc-900 border border-primary/20 extra-option" data-name="Extra Sauce/Drizzle" data-price="2.00">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-800">
                <span class="material-symbols-outlined text-[20px]">add_circle</span>
              </div>
              <div>
                <p class="font-bold text-[#1c130d] dark:text-white">Extra Sauce / Drizzle</p>
                <p class="text-xs text-primary font-extrabold">+2.00DH</p>
              </div>
            </div>
            <div class="h-6 w-6 rounded-full border-2 border-[#e8d9ce] dark:border-zinc-700 checkmark-box"></div>
          </div>
          <div class="flex items-center justify-between p-4 rounded-lg border border-[#e8d9ce] dark:border-zinc-800 extra-option" data-name="Extra Piece / Serving" data-price="5.00">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-500">
                <span class="material-symbols-outlined text-[20px]">restaurant</span>
              </div>
              <div>
                <p class="font-bold text-[#1c130d] dark:text-white">Extra Serving</p>
                <p class="text-xs text-primary font-bold">+5.00DH</p>
              </div>
            </div>
            <div class="h-6 w-6 rounded-full border-2 border-[#e8d9ce] dark:border-zinc-700 checkmark-box"></div>
          </div>
        </div>
      </div>

      <div class="mt-8">
        <h2 class="text-[#1c130d] dark:text-white text-lg font-bold mb-4">Perfect Pairing</h2>
        <div class="grid grid-cols-2 gap-3">
          <div class="relative p-3 rounded-lg border border-[#e8d9ce] dark:border-zinc-800 bg-white dark:bg-zinc-900/50 flex flex-col gap-1 cursor-pointer extra-option" data-name="Cold Beverage" data-price="15.00">
            <p class="font-bold text-[#1c130d] dark:text-white">Cold Beverage</p>
            <p class="text-xs text-primary font-bold">+15.00DH</p>
          </div>
          <div class="relative p-3 rounded-lg border border-[#e8d9ce] dark:border-zinc-800 bg-white dark:bg-zinc-900/50 flex flex-col gap-1 cursor-pointer extra-option" data-name="Hot Coffee" data-price="18.00">
            <p class="font-bold text-[#1c130d] dark:text-white">Hot Coffee</p>
            <p class="text-xs text-primary font-bold">+18.00DH</p>
          </div>
        </div>
      </div>
        `;
    } else {
        return `
      <div class="mt-8">
        <h2 class="text-[#1c130d] dark:text-white text-lg font-bold mb-4">Drink Options</h2>
        <div class="grid grid-cols-2 gap-3">
          <div class="relative p-3 rounded-lg border-2 border-primary bg-primary/5 dark:bg-primary/10 flex flex-col gap-1 cursor-pointer pack-option" data-name="Standard Sweetness" data-price="0">
            <p class="font-bold text-[#1c130d] dark:text-white">Standard</p>
            <p class="text-xs text-[#9c6c49] dark:text-zinc-400">Regular Sweetness</p>
          </div>
          <div class="relative p-3 rounded-lg border border-[#e8d9ce] dark:border-zinc-800 bg-white dark:bg-zinc-900/50 flex flex-col gap-1 cursor-pointer pack-option" data-name="Less Sweet" data-price="0">
            <p class="font-bold text-[#1c130d] dark:text-white">Less Sweet</p>
          </div>
        </div>
      </div>

      <div class="mt-8">
        <h2 class="text-[#1c130d] dark:text-white text-lg font-bold mb-4">Perfect Pairing</h2>
        <div class="grid grid-cols-2 gap-3">
          <div class="relative p-3 rounded-lg border border-[#e8d9ce] dark:border-zinc-800 bg-white dark:bg-zinc-900/50 flex flex-col gap-1 cursor-pointer extra-option" data-name="Butter Croissant" data-price="12.00">
            <p class="font-bold text-[#1c130d] dark:text-white">Croissant</p>
            <p class="text-xs text-primary font-bold">+12.00DH</p>
          </div>
          <div class="relative p-3 rounded-lg border border-[#e8d9ce] dark:border-zinc-800 bg-white dark:bg-zinc-900/50 flex flex-col gap-1 cursor-pointer extra-option" data-name="Chocolate Cookie" data-price="10.00">
            <p class="font-bold text-[#1c130d] dark:text-white">Cookie</p>
            <p class="text-xs text-primary font-bold">+10.00DH</p>
          </div>
        </div>
      </div>
        `;
    }
}

// Map styles based on name
const drinkViews = ['latte', 'milkshake', 'orange', 'pure_noir', 'tea'];
function isDrink(viewName) {
    return drinkViews.some(d => viewName.includes(d));
}

function processHtml(viewName, html) {
    let clean = genericHeroBackgroundReplacement(html);
    
    // Replace EVERYTHING between <!-- Customization Options --> and <!-- Add To Order Bar --> or similar boundaries.
    // If no distinct boundaries, replace the divs after product title / description until the order bar.
    // Since structures differ natively, we do an assertive regex replacement for anything starting with <div class="mt-8"> up to the Add to order bar.
    
    // Using a simpler approach: finding the end of the product description and string replacement.
    const descEndRegex = /(<\/p>\s*<\/div>\s*)<div class="mt-8/i;
    const addOrderRegex = /(<!-- Add To Order Bar|<!-- Bottom Bar|<div[^>]*border-t[^>]*p-4)/i;
    
    const descMatch = clean.match(/(<\/div>\s*<div class="(?:mt-8|mb-6|px-4 pt-6)[^>]*>)/i);
    // If we can't safely extract, fallback
    
    // Another simpler strategy: 
    // Wipe specific problem classes and write generic.
    
    return clean;
}

views.forEach(view => {
    console.log('Processing view: ' + view);
    const scriptPath = path.join(baseDir, view, 'script.js');
    if (fs.existsSync(scriptPath)) {
        let script = fs.readFileSync(scriptPath, 'utf8');
        // Fix background image to forcefully use background and cover gradient
        script = script.replace(/hero\.style\.backgroundImage\s*=\s*`linear-gradient[^`]+`/, 
          `hero.style.background = \`linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url('\${decodeURIComponent(image)}') center/cover no-repeat\``);
        
        script = script.replace(/hero\.style\.backgroundImage\s*=\s*`url\([^`]+`/, 
          `hero.style.background = \`linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url('\${decodeURIComponent(image)}') center/cover no-repeat\``);
          
        fs.writeFileSync(scriptPath, script);
    }
    
    const cssPath = path.join(baseDir, view, 'style.css');
    if (fs.existsSync(cssPath)) {
        let css = fs.readFileSync(cssPath, 'utf8');
        // Remove overriding backgrounds
        css = css.replace(/background:\s*radial-gradient[^;]+;/gi, '');
        // Standardize font
        css = css.replace(/font-family:[^;]+;/gi, "font-family: 'Plus Jakarta Sans', sans-serif;");
        fs.writeFileSync(cssPath, css);
    }
});

console.log('Done script fixes. For HTML restructuring, I will overwrite explicitly to avoid regex madness.');

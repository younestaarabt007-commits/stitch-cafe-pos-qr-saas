const fs = require('fs');
const path = require('path');

const exclude = ['old_index.html'];

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory() && !fullPath.includes('.git') && !fullPath.includes('node_modules')) {
            processDir(fullPath);
        } else if (stat.isFile() && file === 'index.html' && !exclude.includes(fullPath)) {
            let html = fs.readFileSync(fullPath, 'utf8');
            let updated = false;

            // The new inner HTML for explore-categories
            let newSectionDefault = `
        <div class="flex flex-col items-center gap-2 shrink-0 cursor-pointer group" onclick="window.location.href='../tea and infusion sub catégorie page/index.html'">
            <div class="p-[3px] rounded-full bg-gray-200 dark:bg-gray-700 group-hover:bg-primary transition-all">
                <div class="bg-white dark:bg-[#1a100c] p-1 rounded-full">
                    <div class="w-16 h-16 rounded-full overflow-hidden relative">
                        <img src="../swiggy-style_elite_main_menu_390x2500/assets/subcat_icons/tea icon .png" alt="Tea &amp; Infusion" loading="lazy" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" onerror="this.onerror=null;this.src='../swiggy-style_elite_main_menu_390x2500/assets/waiter.jpg'">
                    </div>
                </div>
            </div>
            <p class="text-[10px] text-gray-800 dark:text-white text-center leading-tight max-w-[5rem]" data-i18n="tea_infusion">Tea &amp; Infusion</p>
        </div>
        <div class="flex flex-col items-center gap-2 shrink-0 cursor-pointer group" onclick="window.location.href='../milkshake sub catégorie page/index.html'">
            <div class="p-[3px] rounded-full bg-gray-200 dark:bg-gray-700 group-hover:bg-primary transition-all">
                <div class="bg-white dark:bg-[#1a100c] p-1 rounded-full">
                    <div class="w-16 h-16 rounded-full overflow-hidden relative">
                        <img src="../swiggy-style_elite_main_menu_390x2500/assets/subcat_icons/milkshake icon.png" alt="Milkshake" loading="lazy" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" onerror="this.onerror=null;this.src='../swiggy-style_elite_main_menu_390x2500/assets/waiter.jpg'">
                    </div>
                </div>
            </div>
            <p class="text-[10px] text-gray-800 dark:text-white text-center leading-tight max-w-[5rem]" data-i18n="milkshake">Milkshake</p>
        </div>
        <div class="flex flex-col items-center gap-2 shrink-0 cursor-pointer group" onclick="window.location.href='../juces sub catégorie page/index.html'">
            <div class="p-[3px] rounded-full bg-gray-200 dark:bg-gray-700 group-hover:bg-primary transition-all">
                <div class="bg-white dark:bg-[#1a100c] p-1 rounded-full">
                    <div class="w-16 h-16 rounded-full overflow-hidden relative">
                        <img src="../swiggy-style_elite_main_menu_390x2500/assets/subcat_icons/juces icon.png" alt="Juice" loading="lazy" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" onerror="this.onerror=null;this.src='../swiggy-style_elite_main_menu_390x2500/assets/waiter.jpg'">
                    </div>
                </div>
            </div>
            <p class="text-[10px] text-gray-800 dark:text-white text-center leading-tight max-w-[5rem]" data-i18n="juice">Juice</p>
        </div>
        <div class="flex flex-col items-center gap-2 shrink-0 cursor-pointer group" onclick="window.location.href='../fast food sub catégorie page/index.html'">
            <div class="p-[3px] rounded-full bg-gray-200 dark:bg-gray-700 group-hover:bg-primary transition-all">
                <div class="bg-white dark:bg-[#1a100c] p-1 rounded-full">
                    <div class="w-16 h-16 rounded-full overflow-hidden relative">
                        <img src="../images/sub catégories icons/Snack Food.jpg" alt="Fast Food" loading="lazy" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" onerror="this.onerror=null;this.src='../swiggy-style_elite_main_menu_390x2500/assets/waiter.jpg'">
                    </div>
                </div>
            </div>
            <p class="text-[10px] text-gray-800 dark:text-white text-center leading-tight max-w-[5rem]" data-i18n="fast_food">Fast Food</p>
        </div>
        <div class="flex flex-col items-center gap-2 shrink-0 cursor-pointer group" onclick="window.location.href='../black coffee sub catégorie page/index.html'">
            <div class="p-[3px] rounded-full bg-gray-200 dark:bg-gray-700 group-hover:bg-primary transition-all">
                <div class="bg-white dark:bg-[#1a100c] p-1 rounded-full">
                    <div class="w-16 h-16 rounded-full overflow-hidden relative">
                        <img src="../swiggy-style_elite_main_menu_390x2500/assets/subcat_icons/black coffe icon.jpg" alt="Black Coffee" loading="lazy" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" onerror="this.onerror=null;this.src='../swiggy-style_elite_main_menu_390x2500/assets/waiter.jpg'">
                    </div>
                </div>
            </div>
            <p class="text-[10px] text-gray-800 dark:text-white text-center leading-tight max-w-[5rem]" data-i18n="black_coffee">Black Coffee</p>
        </div>
        <div class="flex flex-col items-center gap-2 shrink-0 cursor-pointer group" onclick="window.location.href='../latté hot drink sub catégorie page/index.html'">
            <div class="p-[3px] rounded-full bg-gray-200 dark:bg-gray-700 group-hover:bg-primary transition-all">
                <div class="bg-white dark:bg-[#1a100c] p-1 rounded-full">
                    <div class="w-16 h-16 rounded-full overflow-hidden relative">
                        <img src="../swiggy-style_elite_main_menu_390x2500/assets/subcat_icons/latté icon.jpg" alt="Latte" loading="lazy" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" onerror="this.onerror=null;this.src='../swiggy-style_elite_main_menu_390x2500/assets/waiter.jpg'">
                    </div>
                </div>
            </div>
            <p class="text-[10px] text-gray-800 dark:text-white text-center leading-tight max-w-[5rem]" data-i18n="latte">Latte</p>
        </div>
        <div class="flex flex-col items-center gap-2 shrink-0 cursor-pointer group" onclick="window.location.href='../toast brunch sub catégorie page/index.html'">
            <div class="p-[3px] rounded-full bg-gray-200 dark:bg-gray-700 group-hover:bg-primary transition-all">
                <div class="bg-white dark:bg-[#1a100c] p-1 rounded-full">
                    <div class="w-16 h-16 rounded-full overflow-hidden relative">
                        <img src="../swiggy-style_elite_main_menu_390x2500/assets/subcat_icons/sandwich or toast icon .jpg" alt="Toast" loading="lazy" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" onerror="this.onerror=null;this.src='../swiggy-style_elite_main_menu_390x2500/assets/waiter.jpg'">
                    </div>
                </div>
            </div>
            <p class="text-[10px] text-gray-800 dark:text-white text-center leading-tight max-w-[5rem]" data-i18n="toast">Toast</p>
        </div>
        <div class="flex flex-col items-center gap-2 shrink-0 cursor-pointer group" onclick="window.location.href='../artisanal bread sub catégorie page/index.html'">
            <div class="p-[3px] rounded-full bg-gray-200 dark:bg-gray-700 group-hover:bg-primary transition-all">
                <div class="bg-white dark:bg-[#1a100c] p-1 rounded-full">
                    <div class="w-16 h-16 rounded-full overflow-hidden relative">
                        <img src="../swiggy-style_elite_main_menu_390x2500/assets/subcat_icons/artisanal bread.jpg" alt="Artisanal Bread" loading="lazy" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" onerror="this.onerror=null;this.src='../swiggy-style_elite_main_menu_390x2500/assets/waiter.jpg'">
                    </div>
                </div>
            </div>
            <p class="text-[10px] text-gray-800 dark:text-white text-center leading-tight max-w-[5rem]" data-i18n="artisanal_bread">Pastry</p>
        </div>
        <div class="flex flex-col items-center gap-2 shrink-0 cursor-pointer group" onclick="window.location.href='../petit dejeuner sub catégorie page/index.html'">
            <div class="p-[3px] rounded-full bg-gray-200 dark:bg-gray-700 group-hover:bg-primary transition-all">
                <div class="bg-white dark:bg-[#1a100c] p-1 rounded-full">
                    <div class="w-16 h-16 rounded-full overflow-hidden relative">
                        <img src="../images/sub catégories icons/Breakfast.jpg" alt="Breakfast" loading="lazy" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" onerror="this.onerror=null;this.src='../swiggy-style_elite_main_menu_390x2500/assets/waiter.jpg'">
                    </div>
                </div>
            </div>
            <p class="text-[10px] text-gray-800 dark:text-white text-center leading-tight max-w-[5rem]">Breakfast</p>
        </div>
`;

            let isMainMenu = fullPath.includes('swiggy-style_elite_main_menu_390x2500');
            let newSection = isMainMenu ? newSectionDefault.replace(/\.\.\/swiggy-style_elite_main_menu_390x2500\//g, '') : newSectionDefault;

            // Use regex to replace content inside <div id="explore-categories"...>...</div>
            // This regex finds <div id="explore-categories" ...> and stops at its closing </div>
            // Wait, nested divs make regex for HTML impossible.
            // But we know that the explore-categories block ends with a specific sequence.
            let idxStart = html.indexOf('id="explore-categories"');
            if (idxStart === -1) idxStart = html.indexOf('id="explore-categories-quick"');
            if (idxStart === -1) idxStart = html.indexOf('id="explore-categories-2"');
            if (idxStart === -1) idxStart = html.indexOf('id="explore-categories-2-alt"');
            
            if (idxStart !== -1) {
                // Find start of div
                let divStart = html.lastIndexOf('<div', idxStart);
                // Find the closing div of explore-categories... 
                // Since there are 9 items, it's easier to use a known end marker like `</section>`, `<div class="flex gap-2 px-4` or similar.
                
                // For safety, let's just use string replacement on known old portions if needed, 
                // OR we just write a simple nested div counter.
                
                let i = divStart;
                let depth = 0;
                let limit = html.length;
                let classCloseIdx = html.indexOf('>', divStart);
                let innerStart = classCloseIdx + 1;
                
                for (; i < limit; i++) {
                    if (html.substr(i, 4) === '<div') depth++;
                    if (html.substr(i, 6) === '</div') depth--;
                    if (depth === 0 && i > divStart) {
                        break;
                    }
                }
                
                let innerEnd = i;
                
                let before = html.substring(0, innerStart);
                let after = html.substring(innerEnd);
                html = before + "\n" + newSection + "    " + after;
                updated = true;
            }
            
            if (updated) {
                fs.writeFileSync(fullPath, html, 'utf8');
                console.log('Synchronized: ' + fullPath);
            }
        }
    }
}
processDir('.');

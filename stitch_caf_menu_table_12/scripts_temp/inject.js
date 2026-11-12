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

for (const view of views) {
    const indexPath = path.join(baseDir, view, 'index.html');
    if (!fs.existsSync(indexPath)) continue;

    let html = fs.readFileSync(indexPath, 'utf-8');

    // Only inject if not already present
    if (html.includes('pairing-handler.js')) continue;

    // Insert before closing </body>
    html = html.replace('</body>', '    <script src="../pairing-handler.js"></script>\n</body>');
    fs.writeFileSync(indexPath, html, 'utf-8');
    console.log(`Injected pairing-handler into ${view}/index.html`);
}

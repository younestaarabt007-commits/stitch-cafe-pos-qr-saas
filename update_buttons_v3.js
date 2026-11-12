const fs = require('fs');
const path = require('path');

const mappings = [
    {
        file: 'stitch_caf_menu_table_12/sweet pastries sub catégorie page/code.html',
        target: '../sweet_pastries_customization_view/index.html'
    },
    {
        file: 'stitch_caf_menu_table_12/latté hot drink sub catégorie page/code.html',
        target: '../latte_customization_view_2/code.html'
    },
    {
        file: 'stitch_caf_menu_table_12/artisanal bread sub catégorie page/code.html',
        target: '../petit pain bakery_customization_view/code.html'
    },
    {
        file: 'stitch_caf_menu_table_12/black coffee sub catégorie page/code.html',
        target: '../pure_noir_espresso_customization_view_1/code.html'
    },
    {
        file: 'stitch_caf_menu_table_12/juces sub catégorie page/code.html',
        target: '../orange juce_customization_view_1/code.html'
    },
    {
        file: 'stitch_caf_menu_table_12/smothie sub catégorie page/code.html',
        target: '../smothie customisation review/code.html'
    },
    {
        file: 'stitch_caf_menu_table_12/milkshake sub catégorie page/code.html',
        target: '../smothie customisation review/code.html'
    }
];

const regex = /<(button|div)([^>]*?)>\s*(<span class="material-symbols-outlined[^"]*?">add<\/span>)\s*<\/\1>/gi;

mappings.forEach(mapping => {
    const filePath = path.join(__dirname, mapping.file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        let count = 0;
        const newContent = content.replace(regex, (match, tag, attrs, inner) => {
            count++;
            // Remove type="button" if it exists to avoid issues in anchor, though not strictly necessary
            attrs = attrs.replace(/type="button"/g, '');
            return `<a href="${mapping.target}"${attrs}>${inner}</a>`;
        });

        if (count > 0) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`Updated ${mapping.file}: Replaced ${count} buttons.`);
        } else {
            console.log(`No matches in ${mapping.file}`);
        }
    } else {
        console.log(`File not found: ${mapping.file}`);
    }
});

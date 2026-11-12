const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'swiggy-style_elite_main_menu_390x2500', 'assets');

const copyMap = [
    { src: 'toast-shakshuka.jpg', dest: 'brunch-shakshuka.jpg' },
    { src: 'hero-omelette.png', dest: 'brunch-farm-omelette.jpg' },
    { src: 'toast-mediterranean.jpg', dest: 'brunch-frittata.jpg' },
    { src: 'hero-full-english.png', dest: 'brunch-full-english.jpg' },
    { src: 'cold-strawberry-smoothie.jpg', dest: 'shake-strawberry.jpg' },
    { src: 'toast-classic-benedict.jpg', dest: 'toast-signature-benedict.jpg' },
    { src: 'toast-vegan-bowl.jpg', dest: 'brunch-garden-skillet.jpg' },
    { src: 'smoothie-tropical-mango.jpg', dest: 'shake-vanilla-bean.jpg' } // Fallback for vanilla
];

console.log('Starting image copy fallback...');

copyMap.forEach(({ src, dest }) => {
    const srcPath = path.join(assetsDir, src);
    const destPath = path.join(assetsDir, dest);

    if (fs.existsSync(destPath)) {
        console.log(`Skipping ${dest} (already exists)`);
        return;
    }

    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied ${src} to ${dest}`);
    } else {
        console.error(`Source ${src} not found! Cannot create ${dest}`);
        // Attempt 2nd fallback for critical items if needed, or just leave it (will be broken image but valid path)
    }
});

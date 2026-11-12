const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'swiggy-style_elite_main_menu_390x2500', 'assets');

const copyMap = [
    { src: 'toast-avocado.jpg', dest: 'brunch-fit-egg-white.jpg' },
    { src: 'coffee-americano.jpg', dest: 'coffee-v60.jpg' },
    { src: 'coffee-velvet-flat-white.jpg', dest: 'coffee-nitro.jpg' }
];

console.log('Starting extra image copy fallback...');

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
    }
});

const fs = require('fs');
const path = require('path');
const https = require('https');

const assetsDir = path.join(__dirname, 'swiggy-style_elite_main_menu_390x2500', 'assets');
if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
}

const imagesToDownload = [
    { filename: 'brunch-frittata.jpg', url: 'https://source.unsplash.com/featured/?frittata' },
    { filename: 'brunch-farm-omelette.jpg', url: 'https://source.unsplash.com/featured/?omelette' },
    { filename: 'brunch-full-english.jpg', url: 'https://source.unsplash.com/featured/?english-breakfast' },
    { filename: 'shake-strawberry.jpg', url: 'https://source.unsplash.com/featured/?strawberry-milkshake' },
    { filename: 'toast-signature-benedict.jpg', url: 'https://source.unsplash.com/featured/?eggs-benedict' },
    { filename: 'brunch-shakshuka.jpg', url: 'https://source.unsplash.com/rzPVSqQjjqs/800x600' }, // Specific ID found
    { filename: 'brunch-garden-skillet.jpg', url: 'https://source.unsplash.com/featured/?skillet-food' },
    { filename: 'shake-vanilla-bean.jpg', url: 'https://source.unsplash.com/featured/?vanilla-milkshake' }
];

const downloadImage = (filename, url) => {
    const dest = path.join(assetsDir, filename);

    if (fs.existsSync(dest)) {
        console.log(`Skipping ${filename} (already exists)`);
        return;
    }

    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
        // Handle redirects (source.unsplash.com redirects to the actual image)
        if (response.statusCode === 301 || response.statusCode === 302) {
            downloadImage(filename, response.headers.location);
            return;
        }

        if (response.statusCode === 200) {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded ${filename}`);
            });
        } else {
            console.error(`Failed to download ${filename}: Status ${response.statusCode}`);
            fs.unlink(dest, () => {});
        }
    }).on('error', (err) => {
        fs.unlink(dest, () => {});
        console.error(`Error downloading ${filename}: ${err.message}`);
    });
};

console.log('Starting final polish download...');
imagesToDownload.forEach(({ filename, url }) => {
    downloadImage(filename, url);
});

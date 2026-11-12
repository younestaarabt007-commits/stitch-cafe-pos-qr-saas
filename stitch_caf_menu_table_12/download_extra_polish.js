const fs = require('fs');
const path = require('path');
const https = require('https');

const assetsDir = path.join(__dirname, 'swiggy-style_elite_main_menu_390x2500', 'assets');

const imagesToDownload = [
    { filename: 'brunch-fit-egg-white.jpg', url: 'https://source.unsplash.com/featured/?egg-white-omelette' },
    { filename: 'coffee-v60.jpg', url: 'https://source.unsplash.com/featured/?pour-over-coffee' },
    { filename: 'coffee-nitro.jpg', url: 'https://source.unsplash.com/featured/?nitro-cold-brew' }
];

const downloadImage = (filename, url) => {
    const dest = path.join(assetsDir, filename);
    if (fs.existsSync(dest)) {
        console.log(`Skipping ${filename} (already exists)`);
        return;
    }
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
        if (response.statusCode === 301 || response.statusCode === 302) {
            downloadImage(filename, response.headers.location);
            return;
        }
        if (response.statusCode === 200) {
            response.pipe(file);
            file.on('finish', () => { file.close(); console.log(`Downloaded ${filename}`); });
        } else {
            console.error(`Failed to download ${filename}: Status ${response.statusCode}`);
            fs.unlink(dest, () => {});
        }
    }).on('error', (err) => {
        fs.unlink(dest, () => {});
        console.error(`Error downloading ${filename}: ${err.message}`);
    });
};

console.log('Downloading 3 specific images...');
imagesToDownload.forEach(({ filename, url }) => {
    downloadImage(filename, url);
});

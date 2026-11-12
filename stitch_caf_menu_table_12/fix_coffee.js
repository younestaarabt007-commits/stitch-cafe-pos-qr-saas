const fs = require('fs');
const https = require('https');
const path = require('path');

const products = [
    {
        id: 1,
        name: "Velvet Flat White",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJM9FSOKFPG71oxcbIXHzPI3JdmEoDqoupcyjwC9zi4qM0_wzlzhU7jyyhzdsFBkrBDZ0trUkR2CHGtf5076WRM1DlU2A7jFcLloqG6H36WRzFPBk_iWTXnLxbIqdoYwrvldwmnItw2fAgMAEPzxihi54rg--ag7rjgu46TJJ9cC-ctMafRmvNycsZI7CduLb1jsxK7qqFWHYC-DVTOOg7Nc77RB-pX0U_BkKENzuNomH4nToUhZtRI6EO1kTT5wylECW-aPbq2LA"
    },
    {
        id: 2,
        name: "Kyoto Cold Brew",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtn0f__4r-Zd7zjbdjMWkXDfcehpvYArEfnyA93zREIUortA8qNbqch-Hgyq50txpdCPNAH7XO3VbkdDEK-EdD-miKytaxbg9EfR2cs8DsR7iHOvnLC4IWPlCUtpcLeIcqqgKHx9KBV3wweqk0AUsd8XbOkrr9_cxBxnhwKQW-xAZ3w96D8RrGueyQP9QaoaonSrZ9KkB-6gfB2dHqdNBjulpihqKMX1yB2jJRsZBRmvXY7ed0o0g7jCuKUo90CIh0PcAn_ufvCsQ"
    },
    {
        id: 3,
        name: "Oat Milk Latte",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQR8gezQl3jB0vULS45TC4ue2AuPbK8pkkeLXA4LLPhYMQyJc3W-IyxooLKy_1_iDXk9QQJ29kuhWJDFi9RJXTWzx7tX5CqvyubitdxsTRewMQdCFNbeTm4VHInQmyRgjiSLHjUG-vBcPIt272R1BQd4-Nc3Zlp2oW3YamR3WslvjodjKWR3PWoIeuC4t9IG4gKmkCfuTXsWC2Sl-ojhWkr4VR4eKRMXllKe1wUWliJ8ERkgCyF5AxVrxOXD4_ZOhmPqKUABX8jEQ"
    },
    {
        id: 4,
        name: "Single Origin Espresso",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5_ok0-V4teAzZiv_cSTVLPbiP7IMvsZ3rUxdWd0hhV5ydDN034HvlLw6_xuTEK0GSgBwSK8PvFN9S1xmkrP6nIBzIo7QafLqzmXpoHRYl87CDazinVUjtRhDf3BekGPoF_rrBylwEpG-N0MCGpEBLcE6h-fY92XE-EI91GwNFZJijR0LU1xHKTkjnE1fVH88qQpPSR0d_Acw7jJ7ecM5nrVvduD3_6T0pE9yZyUiDwr3Tn0RRbXwEB5jic36-V7jyNWfHhIlDFek"
    },
    {
        id: 5,
        name: "Dark Mocha",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCYOof3TzdY9V9-b2EBPVqq4uJJsqCz0GLTW10Dq9w46kRrdeBI2BpAAicfrCc4OS_2XD6KqI8sKTWXcGIwZ-U4ZHFb48UHP0SifNCmkJkP9e2txRlSerDgs6Jrwo2HJfz21TgBq-3TsoyWLeEbIi9yIxDGeWHgiW-biCeyLhVfSNtF7dhiubqN9mR5T7l0nUAhT2ss7E3aHykK2-5qvidgBXwwFsaMyRBgulEjQQVtY9RMIbE4EKToF7FUNSYGu3Lpj3p2ill10o"
    }
];

const assetsDir = path.join(__dirname, 'swiggy-style_elite_main_menu_390x2500', 'assets');

if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
}

const downloadImage = (url, filename) => {
    return new Promise((resolve, reject) => {
        const filepath = path.join(assetsDir, filename);
        const file = fs.createWriteStream(filepath);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Status code ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded ${filename}`);
                resolve(filename);
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => {});
            console.error(`Error downloading ${filename}: ${err.message}`);
            reject(err);
        });
    });
};

(async () => {
    for (const p of products) {
        const safeName = p.name.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
        const filename = `coffee-${safeName}.jpg`;
        try {
            await downloadImage(p.image, filename);
        } catch (e) {
            console.error(`Failed to download image for ${p.name}: ${e.message}`);
        }
    }

    const scriptPath = path.join(__dirname, 'black coffee sub catégorie page', 'script.js');
    if (fs.existsSync(scriptPath)) {
        let content = fs.readFileSync(scriptPath, 'utf8');
        
        const newProducts = [
            {
                id: 1,
                name: "Velvet Flat White",
                description: "Double Shot, Silky Microfoam",
                price: 4.80,
                image: "../swiggy-style_elite_main_menu_390x2500/assets/coffee-velvet-flat-white.jpg",
                category: "milk"
            },
            {
                id: 2,
                name: "Kyoto Cold Brew",
                description: "12-Hour Slow Drip Extraction",
                price: 5.50,
                image: "../swiggy-style_elite_main_menu_390x2500/assets/coffee-kyoto-cold-brew.jpg",
                category: "black"
            },
            {
                id: 3,
                name: "Oat Milk Latte",
                description: "Creamy, Nut-Free, Vegan",
                price: 5.20,
                image: "../swiggy-style_elite_main_menu_390x2500/assets/coffee-oat-milk-latte.jpg",
                category: "milk"
            },
            {
                id: 4,
                name: "Single Origin Espresso",
                description: "Intense Berry Notes",
                price: 3.50,
                image: "../swiggy-style_elite_main_menu_390x2500/assets/coffee-single-origin-espresso.jpg",
                category: "black"
            },
            {
                id: 5,
                name: "Dark Mocha",
                description: "70% Cacao, Double Espresso",
                price: 6.00,
                image: "../swiggy-style_elite_main_menu_390x2500/assets/coffee-dark-mocha.jpg",
                category: "milk"
            }
        ];
        
        const productsJson = JSON.stringify(newProducts, null, 4);
        const newContent = content.replace(/const products = \[[\s\S]*?\];/, `const products = ${productsJson};`);
        
        fs.writeFileSync(scriptPath, newContent, 'utf8');
        console.log('Updated black coffee script.js with new local image paths.');
    } else {
        console.error('Black coffee script.js not found!');
    }

})();

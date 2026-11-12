const fs = require('fs');
const https = require('https');
const path = require('path');

// Original Bakery Products with Google AIDA URLs
const products = [
    {
        id: 1,
        name: "Chocolate Babka",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4yxTrjplybSy3tivdZIqpAykri084L5Nj4ITNMaV9x8iiG-se_kiD1Wa5p5ZnMZXPyNzvUdGD-9c-ZLsKpl-74UVqutCJtd7YpMk3bbnJkH777pdAhEXu_F7jtei9Pu3oPh1_TSRBcaEhk5G9gk3aco5DSzS7bsfihmMjd7tfrgMdYFlf48mebUUQ0JD9Zm3C5fGrRZL7mmjCIPmVxW0o6QhP5cUCO-voI4uj6kMDiidWhU-AB3pNwIEDFrurwCYKWCK0obPceGo"
    },
    {
        id: 2,
        name: "Seeded Multigrain",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWXQYBr2UB9mKoM-3OljUM4Mbxqs0QeEqyCWbih9P2llDX1U2l_OCUTK6oizGPgdpSmloYOriqJP7lqzbSl-S_2WJb5b4yZibP6iRjAQWtYmZPcDYQ6uBeN1IKJHPrswHmKLeIQU8nTZCCuHgRj7Bi5t3p5s_zB8fdm7O-O7Qm_HED43a--LhjAHI664fTUwwqSH4OJum0FUowLkeXDkewdqtEYihwO9zJQVM-ekXCxwhzfrSSp-YDUl-9Eujlafqml2VaUB7kxQo"
    },
    {
        id: 3,
        name: "Dark Rye Loaf",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGwz6vJnJ9G1Ygn-TJfSbp9HWAl5oplo_g241pWY8yeoIwsUa3mNcLK88FJOl7CzrgsIKqclAlE5rY2vIFQiVzLMFWDfZVBJ8sDjrB1tEIzWghhllLO6WTSSW4Zp9ln50KL3-Wbo1Jx5wf2iXIBynTxnYmh5wNnnATdVV3fy-Lm5eYcIpP-3nulhml1MV8gr-VZafmLg7a8e6cJVzOr5kuuvbk2wCGQXAyD_aSIiYklo6z2JYWbD1KV4rYpKY_QlSYd2mpkbeMiIU"
    },
    {
        id: 4,
        name: "Herbed Focaccia",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsP00_mSkTTD7XOht1m0f1PLmaPLvSyyl_EGWPSSOiWpwmjKq7cxeuHpp4Xuj9GownfB0_6PO_pN15p8BHqqE5I4jI3UMBUmptIFoBsszRVnzFXh2tdy-s4bIGzA0w96Q92uIO4xLac3QDZ9TOiAR8pWlc5H_SOZfTGvPMlhuN6aVfLW7F_wafL5JOxsp4GQplcSsUBjTAz00KGzvYDEYxi8ORYUDf7Aj7XF_r0vTLKzvGH1OWOZ83WlIilWdCeiIYFdhvWJase8E"
    },
    {
        id: 5,
        name: "Honey Brioche",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2G_p_jRRdkHcAqubYRVvWsr1TxDFPx8O-eeNsiSLghADLxSJRYQMieySKjDUtFifCzsd3F-dp41WDMZS6BQsV9MuXPJB7S8_802mE8SaAJ2iVblIM-msYW4FEBDBjb0Cun4u2vABRTjKL4X_Y8gZWPR795SOb0eVEDBsWF6Ig-8WbcNbv_xJDYkp7pa08HoiMefRQPVBpz2BZLoZ_XNiyV6MkGws2F-96XCTkx3_Zr6N57U2Jd9a7Y4I35CKttKR9hFGK3kYQCfg"
    },
    {
        id: 6,
        name: "Stoneground Wheat",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5VgizJ__ivEI0Nk_U_DkH9m713CSJAOlDlQL-z_tsQrrypMAoFFIt1OJBOULcQN1LhWAZ4Nizg1qcMPMiRg4cNTyMZ_O4xrI5FIAtPii1AA_IUODdDTVRYnmSC3oi7ZqqgIXL1A5dxX6zKvK9kvH7RSmwXWue5NICBb-IA-N_c1NUYKoejQrj26e6Us28IsoMLpcWBOQtxZpVuVOheAhFdUVTjua_9ffuSzADsYSZvuF09UoDcls6m1YabthQpwgTxR8Xf4wZda0"
    },
    {
        id: 7,
        name: "Parisian Baguette",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuATB369qZC7VlSNGUPM_0qJa8T-pzAF0NXgK2y33TDOjiNuTz20PMb9T13YvwX7G0DdpxT0mjCUH5KBN0tljD8sVZiWDm0PNbOkJ5eO3rUzuBG8hCtaYZVMSigNVf4inqx6Z4ncEsQPI7l7tfDMQfR5iPDwxiyLYw4P9GcnvzfRnKYq-4U2ed1pOqc0UQMj7lGYwy2z5MQD7i585pXYoQSE3cAp-hHNq-0HTvDk8AVwX5a4Ruz1ogNkDkAJrA3q9yA87cqdfYoOltc"
    },
    {
        id: 8,
        name: "Cranberry Walnut",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8pqreXdQ1Y9lHmtpVLICGMk-g0UhtrGGdFAFguHz_tLj1CF_KDwddadNvBSNJ0AnSAnxbuv6aQ_12CTzf8r-jTt_G8Vhp8o6o4Izi72N0LIv6TM8I5To-K-QkTlFAUFSdLwI-Ub2UaXN7fNEbMvhbUXjAZpCZi439NhcMiJ17UARLvNHQRzwE9CbuMYAIbGYzKcWZ70-7KpJejlZZ8vPV60x-g05mILQPAPK6LJ16hasdVabqCt6lhRZy8AU8X1apmusvwgyyrnM"
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
    const newProductMap = {};

    for (const p of products) {
        const safeName = p.name.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
        const filename = `bakery-${safeName}.jpg`;
        try {
            await downloadImage(p.image, filename);
            newProductMap[p.id] = `../swiggy-style_elite_main_menu_390x2500/assets/${filename}`;
        } catch (e) {
            console.error(`Failed to download image for ${p.name}: ${e.message}`);
        }
    }

    // Now update the script.js file
    const scriptPath = path.join(__dirname, 'bakery catégorie page', 'script.js');
    if (fs.existsSync(scriptPath)) {
        let content = fs.readFileSync(scriptPath, 'utf8');
        
        // This regex assumes the structure of the products array in script.js matches roughly what we expect
        // We will look for image: "..." and replace it based on ID or name logic if possible.
        // But since we have IDs, let's try to be smart.
        // Alternatively, we can just rewrite the whole products array if we are confident.
        // Given I have the full list above (except descriptions/prices which might have changed?), 
        // I should probably read the current file, parse the products, update images, and write back.
        // But parsing JS file with regex is brittle.
        // Let's just do a string replacement for the image paths we know we put there (the placeholders).
        
        // Current placeholder: "../swiggy-style_elite_main_menu_390x2500/assets/pastry.jpg"
        // But we need to map specific IDs to specific new files.
        
        // Strategy: Iterate through products in the file content using regex to capture ID and replace image.
        
        // Regex to match: { id: (["']?)(.*?)\1,.*?image: (["'])(.*?)\3
        // This handles both number and string IDs.
        
        // Actually, let's just use the `products` array I have in `temp_old_bakery.js` as the source of truth for everything EXCEPT the image path, 
        // which I will update to the new local path.
        // Wait, `temp_old_bakery.js` has descriptions and prices too.
        // So I can just reconstruct the `products` variable entirely!
        
        const newProducts = [
            {
                id: 1,
                name: "Chocolate Babka",
                description: "Rich dark chocolate ganache swirl.",
                price: 12.00,
                image: "../swiggy-style_elite_main_menu_390x2500/assets/bakery-chocolate-babka.jpg",
                category: "patisserie"
            },
            {
                id: 2,
                name: "Seeded Multigrain",
                description: "Hand-topped with flax & oats.",
                price: 9.00,
                image: "../swiggy-style_elite_main_menu_390x2500/assets/bakery-seeded-multigrain.jpg",
                category: "sourdough"
            },
            {
                id: 3,
                name: "Dark Rye Loaf",
                description: "Robust German-style dense rye.",
                price: 10.50,
                image: "../swiggy-style_elite_main_menu_390x2500/assets/bakery-dark-rye-loaf.jpg",
                category: "sourdough"
            },
            {
                id: 4,
                name: "Herbed Focaccia",
                description: "Rosemary, garlic & olive oil.",
                price: 7.50,
                image: "../swiggy-style_elite_main_menu_390x2500/assets/bakery-herbed-focaccia.jpg",
                category: "viennoiserie"
            },
            {
                id: 5,
                name: "Honey Brioche",
                description: "Ultra-soft, buttery morning loaf.",
                price: 11.25,
                image: "../swiggy-style_elite_main_menu_390x2500/assets/bakery-honey-brioche.jpg",
                category: "viennoiserie"
            },
            {
                id: 6,
                name: "Stoneground Wheat",
                description: "Nutritious 100% whole grain.",
                price: 8.75,
                image: "../swiggy-style_elite_main_menu_390x2500/assets/bakery-stoneground-wheat.jpg",
                category: "sourdough"
            },
            {
                id: 7,
                name: "Parisian Baguette",
                description: "Classic crust with an airy crumb.",
                price: 4.50,
                image: "../swiggy-style_elite_main_menu_390x2500/assets/bakery-parisian-baguette.jpg",
                category: "viennoiserie"
            },
            {
                id: 8,
                name: "Cranberry Walnut",
                description: "Sweet & tart artisan loaf.",
                price: 9.50,
                image: "../swiggy-style_elite_main_menu_390x2500/assets/bakery-cranberry-walnut.jpg",
                category: "sourdough"
            }
        ];
        
        const productsJson = JSON.stringify(newProducts, null, 4);
        // We need to inject this into the file.
        // We look for `const products = [...]`
        
        const newContent = content.replace(/const products = \[[\s\S]*?\];/, `const products = ${productsJson};`);
        
        fs.writeFileSync(scriptPath, newContent, 'utf8');
        console.log('Updated bakery script.js with new local image paths.');
    } else {
        console.error('Bakery script.js not found!');
    }

})();

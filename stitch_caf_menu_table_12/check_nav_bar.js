const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const dirs = fs.readdirSync(rootDir).filter(f => fs.statSync(path.join(rootDir, f)).isDirectory());

dirs.forEach(dir => {
    // Skip hidden dirs or node_modules or assets
    if (dir.startsWith('.') || dir === 'node_modules' || dir.includes('assets')) return;
    
    // Skip main menu folder as it might have a different path structure or already has it
    if (dir === 'swiggy-style_elite_main_menu_390x2500') return;

    const indexPath = path.join(rootDir, dir, 'index.html');
    if (fs.existsSync(indexPath)) {
        let content = fs.readFileSync(indexPath, 'utf8');
        
        if (!content.includes('nav-bar.js')) {
            console.log(`Adding nav-bar.js to ${dir}/index.html`);
            
            // Add script before </body>
            if (content.includes('</body>')) {
                content = content.replace('</body>', '<script src="../nav-bar.js"></script>\n</body>');
            } else {
                content += '\n<script src="../nav-bar.js"></script>';
            }
            
            fs.writeFileSync(indexPath, content, 'utf8');
        } else {
            console.log(`nav-bar.js already present in ${dir}/index.html`);
        }
    }
});

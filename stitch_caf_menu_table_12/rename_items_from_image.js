const fs = require('fs');
const path = require('path');

const rootDir = __dirname;

function deriveNameFromImage(imagePath) {
  if (!imagePath || typeof imagePath !== 'string') return null;
  const normalized = imagePath.replace(/\\/g, '/');
  const parts = normalized.split('/');
  const filename = parts[parts.length - 1] || '';
  if (!filename) return null;
  const base = filename.replace(/\.[^.]+$/, '');
  return base || null;
}

function updateFileNames(filePath) {
  if (!fs.existsSync(filePath)) return { updated: 0, file: filePath };
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  let updated = 0;

  const itemRegex = /(name:\s*")([^"]+)("\s*,[\s\S]*?image:\s*")([^"]+)(")/g;

  content = content.replace(itemRegex, (match, p1, oldName, p3, imagePath, p5) => {
    const newName = deriveNameFromImage(imagePath);
    if (!newName || newName === oldName) return match;
    updated++;
    return `${p1}${newName}${p3}${imagePath}${p5}`;
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
  return { updated, file: filePath };
}

function isSubCategoryDir(dir) {
  if (dir.startsWith('.')) return false;
  const ignore = new Set([
    'swiggy-style_elite_main_menu_390x2500',
    'assets',
    'merchant_dashboard'
  ]);
  return !ignore.has(dir) && fs.statSync(path.join(rootDir, dir)).isDirectory();
}

function run() {
  const results = [];

  const mainMenuFile = path.join(rootDir, 'swiggy-style_elite_main_menu_390x2500', 'menu.js');
  if (fs.existsSync(mainMenuFile)) {
    results.push(updateFileNames(mainMenuFile));
  }

  const dirs = fs.readdirSync(rootDir).filter(isSubCategoryDir);
  for (const dir of dirs) {
    const scriptFile = path.join(rootDir, dir, 'script.js');
    if (fs.existsSync(scriptFile)) {
      results.push(updateFileNames(scriptFile));
    }
  }

  let total = 0;
  for (const r of results) {
    if (r.updated > 0) {
      console.log(`Renamed ${r.updated} item name(s) in ${path.relative(rootDir, r.file)}`);
      total += r.updated;
    }
  }
  if (total === 0) {
    console.log('No item names required updates based on image filenames.');
  } else {
    console.log(`Done. Total items renamed: ${total}`);
  }
}

run();

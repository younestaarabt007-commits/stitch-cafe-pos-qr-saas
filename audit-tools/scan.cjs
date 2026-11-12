const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const root = path.resolve(__dirname, '..');
const base = path.join(root, 'stitch_caf_menu_table_12');
let files=[];
function walk(dir) { for(const e of fs.readdirSync(dir,{withFileTypes:true})) { if(['node_modules','.git','.next','scripts_temp'].includes(e.name)) continue; const p=path.join(dir,e.name); if(e.isDirectory()) walk(p); else files.push(p); } }
walk(base);
const html=files.filter(p=>p.endsWith('.html'));
const broken=[];
for(const file of html) {
 const source=fs.readFileSync(file,'utf8');
 for(const m of source.matchAll(/\b(src|href)\s*=\s*["']([^"']+)["']/g)) {
  const url=m[2].replace(/&amp;/g,'&');
  if(/^(https?:|data:|mailto:|tel:|javascript:|#|\/\/)/i.test(url) || url.includes('${')) continue;
  let decoded; try {decoded=decodeURIComponent(url.split(/[?#]/)[0]);}catch {continue;}
  if(!decoded) continue;
  const target=decoded.startsWith('/') ? path.join(root,decoded) : path.resolve(path.dirname(file),decoded);
  if(!fs.existsSync(target)) broken.push({file:path.relative(root,file),attribute:m[1],url});
 }
}
const scripts=files.filter(p=>p.endsWith('.js'));
const syntaxErrors=[];
for(const file of scripts) {const r=cp.spawnSync(process.execPath,['--check',file],{encoding:'utf8'});if(r.status!==0)syntaxErrors.push({file:path.relative(root,file),error:r.stderr.slice(0,1200)});}
const out={date:'2026-10-21',htmlFiles:html.length,jsFiles:scripts.length,brokenReferences:broken.length,broken,syntaxErrors};
fs.writeFileSync(path.join(__dirname,'static-results.json'),JSON.stringify(out,null,2));
console.log(JSON.stringify({...out,broken:broken.slice(0,18)},null,2));

const fs = require('fs');
const results=[];
async function request(name, route, options={}) {
 try {const r=await fetch('http://127.0.0.1:3000'+route,{...options,signal:AbortSignal.timeout(15000)});const body=await r.json();results.push({name,status:r.status,body:JSON.parse(JSON.stringify(body,(k,v)=>k==='access_token'?'[REDACTED]':v))});return body;}catch(e){results.push({name,error:e.message});}
}
(async()=>{
 await request('health','/health');
 await request('ready','/ready');
 await request('orders without authentication','/api/v1/orders');
 const login=await request('manager with WRONG password','/api/v1/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:'merchant@cafe.com',password:'definitely-wrong-audit-password'})});
 const token=login?.data?.access_token;
 if(token){
 const headers={'Authorization':'Bearer '+token,'Content-Type':'application/json'};
 await request('me in simulator','/api/v1/me',{headers});
 await request('cash session in simulator','/api/v1/cash-session/current',{headers});
 await request('negative quantity accepted','/api/v1/orders',{method:'POST',headers,body:JSON.stringify({items:[{menu_item_id:'m1',quantity:-2}]})});
 await request('unknown item accepted','/api/v1/orders',{method:'POST',headers,body:JSON.stringify({items:[{menu_item_id:'unknown-audit',quantity:1}]})});
 await request('empty order accepted','/api/v1/orders',{method:'POST',headers,body:JSON.stringify({items:[]})});
 }
 for(const [name,url] of [['menu','http://127.0.0.1:8000/stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/index.html'],['missing central store','http://127.0.0.1:8000/stitch_caf_menu_table_12/central_store.js'],['POS','http://127.0.0.1:3001/'],['Kitchen','http://127.0.0.1:3002/']]) {
 try {const r=await fetch(url,{signal:AbortSignal.timeout(90000)});results.push({name,status:r.status,bytes:(await r.text()).length});}catch(e){results.push({name,error:e.message});}
 }
 fs.writeFileSync(require('path').join(__dirname,'runtime-results.json'),JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
})();

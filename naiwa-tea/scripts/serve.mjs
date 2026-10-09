import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const port=Number(process.env.PORT || 4173);
const mime={'.html':'text/html; charset=utf-8','.mjs':'text/javascript','.js':'text/javascript','.css':'text/css','.png':'image/png','.glb':'model/gltf-binary','.json':'application/json'};
const server=http.createServer(async(req,res)=>{
  try {
    let name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    // Match the repository's GitHub Pages subdirectory as well as local root.
    if(name.startsWith('/naiwa-tea/'))name=name.slice('/naiwa-tea'.length);
    if(name.endsWith('/'))name+='index.html';
    const full=path.resolve(root,'.'+name),relative=path.relative(root,full);
    if(relative.startsWith('..')||path.isAbsolute(relative)){res.writeHead(403).end();return;}
    const bytes=await fs.readFile(full);
    res.writeHead(200,{'Content-Type':mime[path.extname(full)]||'application/octet-stream','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'}).end(bytes);
  } catch {res.writeHead(404).end('Not found');}
});
server.listen(port,'127.0.0.1',()=>console.log(`奶蛙奶茶铺: http://127.0.0.1:${port}/`));

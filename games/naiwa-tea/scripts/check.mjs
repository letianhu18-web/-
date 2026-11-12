import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import {outfitCatalog} from '../js/wardrobe-data.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));
const files=await fs.readdir(root,{recursive:true});
const html=await fs.readFile(path.join(root,'index.html'),'utf8');
const imports=JSON.parse(html.match(/<script type="importmap">([\s\S]*?)<\/script>/)[1]).imports;
const errors=[];
for(const file of files){
  const full=path.join(root,file);if(!(await fs.stat(full)).isFile())continue;
  if(/\.(?:mjs|js)$/.test(file)) {
    try{execFileSync(process.execPath,['--check',full],{stdio:'pipe'});}catch{errors.push('Syntax: '+file);}
    const text=await fs.readFile(full,'utf8');
    for(const m of text.matchAll(/^import\s+(?:(?:.|\n)*?\sfrom\s+)?(['"])([^'"\r\n]+)\1/gm)) {
      if(!m[2].startsWith('.')){if(!(m[2] in imports)&&!m[2].startsWith('node:'))errors.push('Unmapped import: '+file+' '+m[2]);continue;}
      try{await fs.access(path.resolve(path.dirname(full),m[2]));}catch{errors.push('Missing import: '+file+' '+m[2]);}
    }
  }
  if(/\.(?:png|glb)$/.test(file)){
    const b=await fs.readFile(full);if(file.endsWith('.png')&&b.readUInt32BE(0)!==0x89504e47)errors.push('Invalid image: '+file);
    if(file.endsWith('.glb')&&b.toString('utf8',0,4)!=='glTF')errors.push('Invalid model: '+file);
  }
}
const urls=[...Object.values(imports),...Array.from(html.matchAll(/(?:src|href)="(\.\/[^"#]+)"/g),m=>m[1]),'./assets/character.glb',...outfitCatalog.flatMap(x=>['./assets/outfits/'+x.id+'.png',...(x.collectible?['./assets/outfits/'+x.id+'-back.png']:[])])];
for(const url of urls){try{await fs.access(path.resolve(root,url.split('?')[0]));}catch{errors.push('Missing resource: '+url);}}
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}else console.log('All JavaScript syntax, imports, static resources, outfit images and model signatures passed.');

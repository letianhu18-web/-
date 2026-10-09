import {iceUnits} from './craft-data.mjs';
// One compositional cup renderer, shared by the workbench and recipe book.
export function toppingMarkup(d,animated=false){
 const bits=[],tops=d?.toppings||[],cls=animated?' class="pearl-drop"':'';
 if(d?.strawberryJam)bits.push(`<path ${animated?'class="jam-smear"':''} d="M36 75Q42 64 47 83L50 128Q45 140 49 171H38Z M108 91Q115 80 118 101L110 169H104L108 132Z" fill="#d65c7c" opacity=".6"/>`);
 if(tops.includes('taro'))bits.push(`<path ${animated?'class="jam-smear"':''} d="M33 120Q48 106 56 133T82 127T117 116V177H33Z" fill="#b693c9"/>`);
 for(const k of tops){if(['taro','cream'].includes(k))continue;for(let i=0;i<(k==='pudding'?5:14);i++){const x=47+i%6*11,y=163-Math.floor(i/6)*11-(i%2)*3,delay=animated?` style="animation-delay:${i*.014}s"`:'';
  if(k==='coconut')bits.push(`<rect x="${x-4}" y="${y-5}" width="8" height="9" rx="2" fill="#f6f3d8" stroke="#d7dcb8"${cls}${delay}/>`);
  else if(k==='pudding')bits.push(`<rect x="${43+i*13}" y="${151-i%2*9}" width="12" height="18" rx="4" fill="#efc34b" stroke="#ce9233"${cls}${delay}/>`);
  else if(k==='strawberry')bits.push(`<path d="M${x-4} ${y-5}l9 2 -4 8Z" fill="#d85b69"${cls}${delay}/>`);
  else bits.push(`<ellipse cx="${x}" cy="${y}" rx="${k==='redBean'?3:4.5}" ry="4.5" fill="${k==='redBean'?'#925047':'#513322'}"${cls}${delay}/>`);
 }}
 if(false)bits.push('<path d="M30 66Q44 56 57 65Q75 57 89 63Q103 55 120 65V80Q75 89 30 79Z" fill="#fffced" stroke="#eadfc6"/>');return bits.join('');
}
export function iceMarkup(d,newIndex=-1,reference=false){const count=iceUnits(d),liquid=!!(d?.tea||d?.milk||d?.strawberryJam);return Array.from({length:count},(_,i)=>{const x=39+i%4*18,y=liquid?72+Math.floor(i/4)*19:151-Math.floor(i/4)*18;return `<g data-ice-unit="${i}" class="ice-unit ${i===newIndex?'falling':''}" style="--ice-x:${x}px;--ice-y:${y}px;transform:translate(${x}px,${y}px)"><rect width="14" height="14" rx="3" transform="rotate(${i%2?12:-8} 7 7)" fill="${reference?'none':'#bfe9ec'}" fill-opacity=".82" stroke="${reference?'#52978a':'#fff'}" stroke-width="1.6" ${reference?'stroke-dasharray="3 2"':''}/><path d="M3 4h5" stroke="#fff" stroke-width="2" opacity=".9"/></g>`;}).join('');}
export function updateIce(root,d,newIndex=-1){const temp=document.createElementNS('http://www.w3.org/2000/svg','g');temp.innerHTML=iceMarkup(d,newIndex);while(root.children.length>temp.children.length)root.lastElementChild.remove();for(let i=0;i<temp.children.length;i++){const source=temp.children[i];if(root.children[i]){root.children[i].setAttribute('style',source.getAttribute('style'));if(i===newIndex){root.children[i].classList.remove('falling');void root.children[i].getBoundingClientRect();root.children[i].classList.add('falling');}}else root.append(source.cloneNode(true));}}
export function creamMarkup(d){return d?.toppings?.includes('cream')?'<path class="cream-layer" d="M30 62Q44 54 57 62Q75 54 89 60Q103 54 120 62V73Q75 82 30 73Z" fill="#fffced" stroke="#eadfc6"/>':'';}
export const liquidColor=d=>d?.strawberryJam?(d.milk?'#efadba':'#d55d78'):d?.milk?(d.tea?'#d4ad7a':'#fff0d4'):'#a96c32';
export function miniCup(recipe){const d={...Object.fromEntries(recipe.ingredients.map(k=>[k,1])),toppings:recipe.ingredients.filter(k=>!['tea','milk','strawberryJam'].includes(k)),ice:0};return `<svg class="mini-cup" viewBox="0 0 150 190" aria-hidden="true"><path d="M32 42H118L106 168Q75 181 44 168Z" fill="${liquidColor(d)}" stroke="#548476" stroke-width="3"/>${toppingMarkup(d)}${creamMarkup(d)}<rect x="26" y="33" width="98" height="12" rx="6" fill="#74af90"/></svg>`;}

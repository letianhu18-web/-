import test from 'node:test';
import assert from 'node:assert/strict';
import {SaveSystem} from '../js/save.mjs';
import {freshSave,SAVE_KEY,newDrink} from '../js/data.mjs';
const storage=()=>{const m=new Map();return{getItem:k=>m.get(k)??null,setItem:(k,v)=>m.set(k,String(v)),removeItem:k=>m.delete(k)}};
test('original v4 progress and settings survive optimized save loading',()=>{
  const s=storage(),original=freshSave();original.day=9;original.cookies=2300;original.settings.lowEffects=true;
  s.setItem(SAVE_KEY,JSON.stringify(original));
  const loaded=new SaveSystem(s).load();
  assert.equal(loaded.day,9);assert.equal(loaded.cookies,2300);assert.equal(loaded.settings.lowEffects,true);
  assert.equal(loaded.version,original.version);
});
test('graphics preference does not modify the game save or activate conflict detection',()=>{
  const s=storage(),save=new SaveSystem(s),data=save.load();assert.equal(save.save(data),true);
  const before=s.getItem(SAVE_KEY);s.setItem('naiwa.teashop.graphics','saver');
  assert.equal(s.getItem(SAVE_KEY),before);assert.equal(save.inspectExternal(),true);
});
test('backups restore progress if the primary entry becomes corrupt',()=>{
  const s=storage(),save=new SaveSystem(s),data=save.load();data.cookies=777;save.save(data);
  s.setItem(SAVE_KEY,'broken json');const restored=new SaveSystem(s).load();
  assert.equal(restored.cookies,777);
});

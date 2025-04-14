import { GlobalSelectedItem } from "./selectedItem.js";
import { getId } from "./globalFunction.js";
import { property } from "./propertyWindow.js";
import { canvas, canvasState } from "./canvas.js";
import { idStorage } from "./UniqueStack.js";
import { removeBorder } from "./app.js";
import { linkProperty } from "./link.js";
import { undoRedo } from "./undoRedo.js";

export function spaceProperty(id){
    removeBorder();
    GlobalSelectedItem.item = document.getElementById(id);
    GlobalSelectedItem.selectedItemType = "space";
    GlobalSelectedItem.item.style.border = "1px dashed rgba(0, 0, 0, 0.3)";
    property();
}
export function spaceElementRevive(id){
    const ele = document.getElementById(id);
    if(ele){
        ele.addEventListener('click', ()=>{
            spaceProperty(id);
        });
        spaceProperty(id);
    }
}
document.getElementById("spaceBtn").addEventListener('click', ()=>{
    const spaceTag = document.createElement('div');
    spaceTag.style.height = "20px";
    spaceTag.style.color = "white";
    spaceTag.style.cursor = "pointer";
    spaceTag.id = getId();
    spaceTag.addEventListener('click', (e)=>{
        spaceProperty(spaceTag.id);
    });
    spaceTag.style.border = "1px dashed rgba(0, 0, 0 ,0.3)";
    canvas.appendChild(spaceTag);
    spaceProperty(spaceTag.id);
    undoRedo.do(canvasState());
    idStorage.push({type: "space", id: spaceTag.id});
});

document.getElementById("spaceHeight").addEventListener('change', (event)=>{
    if(GlobalSelectedItem.item){
        GlobalSelectedItem.item.style.height = event.target.value + "px";
        undoRedo.do(canvasState());
    }
})
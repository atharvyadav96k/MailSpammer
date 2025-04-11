import { GlobalSelectedItem } from "./selectedItem.js";
import { getId } from "./globalFunction.js";
import { property } from "./propertyWindow.js";
import { canvas, canvasState } from "./canvas.js";
import { undoRedo } from "./undoRedo.js";
import { idStorage } from "./UniqueStack.js";

export function linkProperty(id) {
    GlobalSelectedItem.item = document.getElementById(id);
    GlobalSelectedItem.selectedItemType = 'link';
    property(); 
}
export function linkElementRevive(id){
    const ele = document.getElementById(id);
    if(ele){
        ele.addEventListener('click', ()=>{
            linkProperty(id);
        });
        linkProperty(id);
    }
}
document.getElementById("linksBtn").addEventListener('click', () => {
    const linkTag = document.createElement('a');
    linkTag.innerText = "unsubscribe";
    linkTag.style.color = "blue";
    linkTag.style.textDecoration = "underline";
    linkTag.style.cursor = "pointer";
    linkTag.style.paddingLeft = "4px";
    linkTag.style.paddingRight = "4px";
    linkTag.href = "#";
    linkTag.setAttribute("data-url", "#");
    linkTag.id = getId(); 
    linkTag.addEventListener('click', (event) => {
        event.preventDefault();
        linkProperty(linkTag.id);
    });
    canvas.appendChild(linkTag);
    linkProperty(linkTag.id);
    undoRedo.do(canvasState());
    idStorage.push({type: "link", id: linkTag.id});
});

document.getElementById('linkText').addEventListener('input', (event) => {
    if (GlobalSelectedItem.item) {
        GlobalSelectedItem.item.innerText = event.target.value;
    }
});
document.getElementById('linkText').addEventListener('change', ()=>{
    if(GlobalSelectedItem.item){
        undoRedo.do(canvasState());
    }
})
document.getElementById('textLink').addEventListener('change', (event) => {
    if (GlobalSelectedItem.item) {
        const value = event.target.value;
        GlobalSelectedItem.item.href = value;
        GlobalSelectedItem.item.setAttribute("data-url", value);
        undoRedo.do(canvasState());
    }
});

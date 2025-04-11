import { GlobalSelectedItem } from "./selectedItem.js";
import { canvas, canvasState } from "./canvas.js";
import { getId } from "./globalFunction.js";
import { property } from "./propertyWindow.js";
import { undoRedo } from "./undoRedo.js";
import { idStorage } from "./UniqueStack.js";

const image = document.querySelectorAll('.addImage');

export function imageProperty(id) {
    GlobalSelectedItem.item = document.getElementById(id);
    GlobalSelectedItem.selectedItemType = "img";
    property();
}
export function imageElementRevive(id){
    const ele = document.getElementById(id);
    if(ele){
        ele.addEventListener('click', ()=>imageProperty(id));
        imageProperty(id);
    }
}
image.forEach((ele, idx) => {
    ele.addEventListener('click', () => {
        let imgElement = document.createElement('img');
        imgElement.src = 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png';
        imgElement.style.width = "100%";
        imgElement.style.padding = "5px";
        imgElement.style.cursor = "pointer";

        if (idx === 0) {
            imgElement.style.width = "60px";
            imgElement.style.objectFit = "cover";
        } else if (idx === 1) {
            imgElement.style.objectFit = "cover";
            imgElement.style.height = "60px";
        } else if (idx === 2) {
            imgElement.style.objectFit = "contain";
        }

        imgElement.id = getId();
        imgElement.addEventListener('click', () => imageProperty(imgElement.id));
        canvas.appendChild(imgElement);
        imageProperty(imgElement.id);
        undoRedo.do(canvasState());
        idStorage.push({type: 'img', id: imgElement.id});
    });
});
document.getElementById('imgWidth').addEventListener('change', (event) => {
    if (GlobalSelectedItem.item && GlobalSelectedItem.selectedItemType == 'img') {
        GlobalSelectedItem.item.style.width = event.target.value + document.getElementById("scaleW").value;
        undoRedo.do(canvasState());
    }
});
document.getElementById('imgHeight').addEventListener('change', (event) => {
    if (GlobalSelectedItem.item && GlobalSelectedItem.selectedItemType == 'img') {
        GlobalSelectedItem.item.style.height = event.target.value + document.getElementById("scaleH").value;
        undoRedo.do(canvasState());
    }
});
document.getElementById('imagebgLight').addEventListener('change', (event) => {
    if (GlobalSelectedItem.item) {
        GlobalSelectedItem.item.style.boxShadow = event.target.value;
        undoRedo.do(canvasState());
    }
});
document.getElementById('imgPadding').addEventListener('change', (event) => {
    if (GlobalSelectedItem.item) {
        GlobalSelectedItem.item.style.padding = event.target.value + "px";
        undoRedo.do(canvasState());
    }
});
document.getElementById('url').addEventListener('change', (event) => {
    if (GlobalSelectedItem.item) {
        GlobalSelectedItem.item.src = event.target.value;
        undoRedo.do(canvasState());
    }
});

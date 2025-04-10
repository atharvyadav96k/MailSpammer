import { GlobalSelectedItem } from "./selectedItem.js";
import { canvas } from "./canvas.js";
import { getId } from "./globalFunction.js";
import { property } from "./propertyWindow.js";

const image = document.querySelectorAll('.addImage');

export function imageProperty(id) {
    GlobalSelectedItem.item = document.getElementById(id);
    GlobalSelectedItem.selectedItemType = "img";
    property();
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
    });
});

document.getElementById('imgWidth').addEventListener('input', (event) => {
    if (GlobalSelectedItem.item && GlobalSelectedItem.selectedItemType == 'img') {
        GlobalSelectedItem.item.style.width = event.target.value + document.getElementById("scaleW").value;
    }
});
document.getElementById('imgHeight').addEventListener('input', (event) => {
    if (GlobalSelectedItem.item && GlobalSelectedItem.selectedItemType == 'img') {
        GlobalSelectedItem.item.style.height = event.target.value + document.getElementById("scaleH").value;
    }
});
document.getElementById('imagebgLight').addEventListener('input', (event) => {
    if (GlobalSelectedItem.item) {
        GlobalSelectedItem.item.style.boxShadow = event.target.value;
    }
});
document.getElementById('imgPadding').addEventListener('input', (event) => {
    if (GlobalSelectedItem.item) {
        GlobalSelectedItem.item.style.padding = event.target.value + "px";
    }
});
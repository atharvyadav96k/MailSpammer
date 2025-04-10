import { GlobalSelectedItem } from "./selectedItem.js";
import { getId } from "./globalFunction.js";
import { property } from "./propertyWindow.js";
import { canvas } from "./canvas.js";

export function linkProperty(id) {
    GlobalSelectedItem.item = document.getElementById(id);
    GlobalSelectedItem.selectedItemType = 'link';
    property(); 
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
});

document.getElementById('linkText').addEventListener('input', (event) => {
    if (GlobalSelectedItem.item) {
        GlobalSelectedItem.item.innerText = event.target.value;
    }
});

document.getElementById('textLink').addEventListener('input', (event) => {
    if (GlobalSelectedItem.item) {
        const value = event.target.value;
        GlobalSelectedItem.item.href = value;
        GlobalSelectedItem.item.setAttribute("data-url", value);
    }
});
document.getElementById('deleteLinkElement').addEventListener('click', () => {
    if (GlobalSelectedItem.item) {
        GlobalSelectedItem.item.remove();
        GlobalSelectedItem.item = null;
        document.getElementById('linkText').value = "";
        document.getElementById('textLink').value = "";
    }
});
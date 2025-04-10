import { GlobalSelectedItem } from "./selectedItem.js";
import { canvas } from "./canvas.js";
import { getId } from "./globalFunction.js";
import { property } from "./propertyWindow.js";

GlobalSelectedItem.item = null;
GlobalSelectedItem.selectedItemType = null;

property();

function removeElement() {
    if (GlobalSelectedItem.item) {
        GlobalSelectedItem.item.remove();
        GlobalSelectedItem.item = null;
    }
    GlobalSelectedItem.selectedItemType = null;
    property();
}
function moveElementUp() {
    const element = GlobalSelectedItem.item;
    if (element && element.previousElementSibling) {
        canvas.insertBefore(element, element.previousElementSibling);
    }
}
function moveElementDown() {
    const element = GlobalSelectedItem.item;
    if (element && element.nextElementSibling) {
        canvas.insertBefore(element.nextElementSibling, element);
    }
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case "Delete":
            removeElement();
            break;
        case "ArrowUp":
            moveElementUp();
            break;
        case "ArrowDown":
            moveElementDown();
            break;
    }
});
document.getElementById("moveUpBtn").addEventListener('click', moveElementUp);
document.getElementById("moveDownBtn").addEventListener('click', moveElementDown);

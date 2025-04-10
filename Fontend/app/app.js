import { GlobalSelectedItem } from "./selectedItem.js";
import { canvas } from "./canvas.js";
import { getId } from "./globalFunction.js";
import { property } from "./propertyWindow.js";

GlobalSelectedItem.item = null;
GlobalSelectedItem.selectedItemType = null;

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
            if (GlobalSelectedItem.selectedItemType == "img") {
                removeImgElementById();
            } else if (GlobalSelectedItem.selectedItemType == "btn") {
                removeBtnElement();
            } else {
                removeElementById();
            }
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
document.getElementById('url').addEventListener('input', (event) => {
    if (GlobalSelectedItem.item) {
        GlobalSelectedItem.item.src = event.target.value;
    }
});

// Links 

import { GlobalSelectedItem } from "./selectedItem.js";
import { canvas } from "./canvas.js";
import { property } from "./propertyWindow.js";
import { undoRedo } from "./undoRedo.js";
import { textElementRevive } from "./text.js";
import { buttonElementRevive } from "./button.js";
import { idStorage } from "./UniqueStack.js";
import { linkElementRevive } from "./link.js";
import { imageElementRevive } from "./image.js";
import { getStoredForm } from "./storeFormLocally.js";

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
    if ((event.ctrlKey || event.metaKey) && (event.key).toLocaleLowerCase() == "z") {
        undoFunction();
    } else if ((event.ctrlKey || event.metaKey) && (event.key).toLocaleLowerCase() == "y") {
        redoFunction();
    } else {
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
    }
});
document.getElementById("moveUpBtn").addEventListener('click', moveElementUp);
document.getElementById("moveDownBtn").addEventListener('click', moveElementDown);
function reviveListener() {
    idStorage.getAll().forEach((ele) => {
        if (ele.type == "text") {
            textElementRevive(ele.id);
        } else if (ele.type == "btn") {
            buttonElementRevive(ele.id);
        } else if (ele.type == "link") {
            linkElementRevive(ele.id);
        } else if (ele.type == "img") {
            imageElementRevive(ele.id);
        }
    });
}
function showCustomToast({ message = "This is a toast!", type = "danger", duration = 3000 }) {
    const container = document.getElementById('toastContainer');

    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.classList.add(type);
    // console.log(message)
    toast.innerHTML = `
      <button class="close-btn" onclick="this.parentElement.remove()">×</button>
      <strong>Notification</strong>
      <div>${message}</div>
    `;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = "fadeOut 0.5s ease forwards";
        setTimeout(() => {
            toast.remove();
        }, 500);
    }, duration);
}
const redoFunction = () => {
    try {
        undoRedo.redo();
        canvas.innerHTML = undoRedo.getState();
        reviveListener();
        GlobalSelectedItem.item = null;
        GlobalSelectedItem.selectedItemType = "none";
        property();
    } catch (e) {
        // console.log(e.message)
        showCustomToast({ message: e.message, type: "warning", duration: 3000 });
    }
}
const undoFunction = () => {
    try {
        undoRedo.undo();
        canvas.innerHTML = undoRedo.getState();
        reviveListener();
        GlobalSelectedItem.item = null;
        GlobalSelectedItem.selectedItemType = "none";
        property();
    } catch (e) {
        // console.log(e.message)
        showCustomToast({ message: e.message, type: "warning", duration: 3000 });
    }
}
document.getElementById("undo").addEventListener('click', undoFunction);
document.getElementById("redo").addEventListener('click', redoFunction);
document.getElementById("deleteElement").addEventListener('click', removeElement);

export const removeBorder = () => {
    const items = document.getElementById("mailScreen").querySelectorAll("*");
    items.forEach((ele) => {
        ele.style.border = "none";
    })
}

setTimeout(() => {
    canvas.innerHTML = getStoredForm().code;
    idStorage.setId(getStoredForm().ids);
    console.log(getStoredForm().ids);
    reviveListener();
}, 2000);
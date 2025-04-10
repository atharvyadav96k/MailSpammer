import { GlobalSelectedItem } from "./selectedItem.js";
import { canvas } from "./canvas.js";
import { getId } from "./globalFunction.js";
const btn = document.querySelectorAll('.btnClick');


function removeBtnElement() {
    if (GlobalSelectedItem.item) {
        GlobalSelectedItem.item.remove();
        GlobalSelectedItem.item = null;
    }
    GlobalSelectedItem.selectedItemType = null;
    property();
}
document.getElementById("deleteBtnElement").addEventListener('click', () => removeBtnElement)
function buttonProperty(id) {
    GlobalSelectedItem.item = document.getElementById(id);
    GlobalSelectedItem.selectedItemType = "btn";
    property();
}
btn.forEach((ele, idx) => {
    ele.addEventListener('click', () => {
        const wrapper = document.createElement('div');
        wrapper.id = getId();
        wrapper.style.cursor = "pointer";
        wrapper.style.display = "flex";
        wrapper.style.justifyContent = "center";
        const buttonElement = document.createElement('a');
        buttonElement.innerText = 'Click Me';
        buttonElement.style.padding = "8px 16px";
        buttonElement.style.borderRadius = "7px"
        buttonElement.style.border = "none";
        buttonElement.style.display = "inline-block";
        buttonElement.className = "primary";
        buttonElement.style.cursor = "pointer";
        buttonElement.style.color = "white"
        buttonElement.style.textDecoration = "none";
        buttonElement.addEventListener('click', (e) => {
            e.preventDefault();
            buttonProperty(wrapper.id);
        });
        wrapper.appendChild(buttonElement);  // wrap the button
        canvas.appendChild(wrapper);         // add wrapper to canvas
        buttonProperty(wrapper.id);
    });
});
document.getElementById('buttonContent').addEventListener('input', (event) => {
    if (GlobalSelectedItem.item) {
        GlobalSelectedItem.item.querySelector('a').innerHTML = event.target.value;
    }
});
document.getElementById('buttonUrl').addEventListener('input', (event) => {
    if (GlobalSelectedItem.item) {
        GlobalSelectedItem.item.querySelector('a').href = event.target.value;
        GlobalSelectedItem.item.querySelector('a').target = "_black";
    }
});
document.getElementById('buttonType').addEventListener('change', (event) => {
    if (GlobalSelectedItem.item) {
        let ele = GlobalSelectedItem.item.querySelector('a');
        let val = event.target.value;
        val = val.toLowerCase();
        ele.className = val;
        if (val == 'primary' || val == 'secondary' || val == "danger" || val == "dark") {
            ele.style.color = "white"
        } else {
            ele.style.color = "black"
        }
    }
})
document.getElementById('buttonDisplay').addEventListener('change', (event) => {
    if (GlobalSelectedItem.item) {
        GlobalSelectedItem.item.style.display = event.target.value;
    }
})
document.getElementById('buttonAlign').addEventListener('change', (event) => {
    if (GlobalSelectedItem.item) {
        GlobalSelectedItem.item.style.display = "flex";
        console.log(event.target.value);
        GlobalSelectedItem.item.style.justifyContent = event.target.value;
    }
});
document.getElementById('buttonFont').addEventListener('input', (event) => {
    if (GlobalSelectedItem.item) {
        console.log(event.target.value)
        GlobalSelectedItem.item.querySelector('a').style.fontSize = event.target.value + "px";
    }
});
document.getElementById('buttonRound').addEventListener('input', (event) => {
    if (GlobalSelectedItem.item) {
        GlobalSelectedItem.item.querySelector('a').style.borderRadius = event.target.value + "px";
    }
})
document.getElementById('buttonTextDecoration').addEventListener('change', (event) => {
    if (GlobalSelectedItem.item) {
        GlobalSelectedItem.item.querySelector('a').style.textDecoration = event.target.value;
    }
});
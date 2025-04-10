import { GlobalSelectedItem } from "./selectedItem.js";
import { canvas } from "./canvas.js";
import { property } from "./propertyWindow.js";
import { getId } from "./globalFunction.js";
const heading = document.querySelectorAll('.heading');
const text = document.querySelectorAll('.text');

const removeImgElementById = () => {
    if (GlobalSelectedItem.item) {
        GlobalSelectedItem.item.remove();
        GlobalSelectedItem.item = null;
    }
    GlobalSelectedItem.selectedItemType = null;
    property();
}
document.getElementById('deleteImageElement').addEventListener('click', removeImgElementById());

property();

function removeElementById() {
    if (GlobalSelectedItem.item) {
        GlobalSelectedItem.item.remove();
        GlobalSelectedItem.item = null;
    }
    GlobalSelectedItem.selectedItemType = null;
    property();
}

export function textPropertys(id) {
    GlobalSelectedItem.item = document.getElementById(id);
    document.getElementById('contentTextArea').value = GlobalSelectedItem.item.innerText;
    GlobalSelectedItem.selectedItemType = 'text';
    property();
}

function textColorProperty(color) {
    if (GlobalSelectedItem.item) {
        GlobalSelectedItem.item.style.color = color;
    }
}

function textSizeProperty(size) {
    if (GlobalSelectedItem.item) {
        GlobalSelectedItem.item.style.fontSize = size + "px";
    }
}

function textWeightProperty(weight) {
    if (GlobalSelectedItem.item) {
        GlobalSelectedItem.item.style.fontWeight = weight;
    }
}

function updateTextContent(event) {
    if (GlobalSelectedItem.item) {
        GlobalSelectedItem.item.innerHTML = event.target.value;
    }
}

document.getElementById("deleteElement").addEventListener('click', removeElementById);
document.getElementById('contentTextArea').addEventListener('input', updateTextContent);
document.getElementById('colorPicker').addEventListener('input', (event) => textColorProperty(event.target.value));
document.getElementById('fontSizePicker').addEventListener('input', (event) => textSizeProperty(event.target.value));
document.getElementById('fontWeightPicker').addEventListener('input', (event) => textWeightProperty(event.target.value));
document.getElementById('fontFamilyPicker').addEventListener('change', (event) => { GlobalSelectedItem.item.style.fontFamily = event.target.value; });
document.getElementById('lineHeightPicker').addEventListener('input', (event) => { GlobalSelectedItem.item.style.lineHeight = event.target.value; });
document.getElementById('letterSpacingPicker').addEventListener('input', (event) => { GlobalSelectedItem.item.style.letterSpacing = `${event.target.value}px`; })
document.getElementById('textTransformPicker').addEventListener('change', (event) => { GlobalSelectedItem.item.style.textTransform = event.target.value })
document.getElementById('textDecorationPicker').addEventListener('change', (event) => { GlobalSelectedItem.item.style.textDecoration = event.target.value })
document.querySelectorAll('.textAlign').forEach((ele, idx) => {
    ele.addEventListener('click', () => {
        if (GlobalSelectedItem.item) {
            GlobalSelectedItem.item.style.textAlign = ['left', 'center', 'right', 'justify'][idx];
        }
    });
});

heading.forEach((ele, idx) => {
    ele.addEventListener('click', () => {
        const headingLevel = (idx % 6) + 1;
        const headingElement = document.createElement(`h${headingLevel}`);
        headingElement.innerText = `Hello ${headingLevel}`;
        headingElement.style.color = "red";
        headingElement.id = getId();
        headingElement.style.cursor = "pointer";
        headingElement.style.textAlign = "left";
        headingElement.addEventListener('click', () => textPropertys(headingElement.id));
        canvas.appendChild(headingElement);
        textPropertys(headingElement.id);
    });
});

text.forEach((ele, idx) => {
    ele.addEventListener('click', () => {
        const textElement = document.createElement('p');
        textElement.style.cursor = "pointer";
        textElement.style.display = idx === 4 ? "block" : "inline";
        textElement.style.margin = '0px';
        textElement.innerHTML = 'Hello Mother Father';
        if (idx === 1) textElement.style.textDecoration = "underline";
        if (idx === 2) textElement.style.textDecoration = "line-through";
        if (idx === 3) textElement.style.fontWeight = "bold";

        textElement.id = getId();
        textElement.addEventListener('click', () => textPropertys(textElement.id));
        canvas.appendChild(textElement);
        textPropertys(textElement.id);
    });
});
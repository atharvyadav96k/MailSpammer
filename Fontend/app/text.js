import { GlobalSelectedItem } from "./selectedItem.js";
import { canvas, canvasState } from "./canvas.js";
import { property } from "./propertyWindow.js";
import { getId } from "./globalFunction.js";
import { undoRedo } from "./undoRedo.js";
import { idStorage } from "./UniqueStack.js";

const heading = document.querySelectorAll('.heading');
const text = document.querySelectorAll('.text');

export function textPropertys(id) {
    GlobalSelectedItem.item = document.getElementById(id);
    document.getElementById('contentTextArea').value = GlobalSelectedItem.item.innerText;
    GlobalSelectedItem.selectedItemType = 'text';
    property();
}

export function textElementRevive(id){
    const ele = document.getElementById(id)
    if(ele){
        ele.addEventListener('click', ()=>{
            textPropertys(id);
        });
        textPropertys(id);
    }
}


function textColorProperty(color) {
    if (GlobalSelectedItem.item) {
        GlobalSelectedItem.item.style.color = color;
    }
    undoRedo.do(canvasState());
}

function textSizeProperty(size) {
    if (GlobalSelectedItem.item) {
        GlobalSelectedItem.item.style.fontSize = size + "px";
    }
    undoRedo.do(canvasState());
}

function textWeightProperty(weight) {
    if (GlobalSelectedItem.item) {
        GlobalSelectedItem.item.style.fontWeight = weight;
    }
    undoRedo.do(canvasState());
}

function updateTextContent(event) {
    if (GlobalSelectedItem.item) {
        GlobalSelectedItem.item.innerHTML = event.target.value;
    }
}

document.getElementById('contentTextArea').addEventListener('input', updateTextContent);
document.getElementById('contentTextArea').addEventListener('change', ()=>undoRedo.do(canvasState()));
document.getElementById('colorPicker').addEventListener('input', (event) => textColorProperty(event.target.value));
document.getElementById('fontSizePicker').addEventListener('change', (event) => textSizeProperty(event.target.value));
document.getElementById('fontWeightPicker').addEventListener('change', (event) => textWeightProperty(event.target.value));
document.getElementById('fontFamilyPicker').addEventListener('change', (event) => { GlobalSelectedItem.item.style.fontFamily = event.target.value; });
document.getElementById('lineHeightPicker').addEventListener('change', (event) => { GlobalSelectedItem.item.style.lineHeight = event.target.value; });
document.getElementById('letterSpacingPicker').addEventListener('change', (event) => { GlobalSelectedItem.item.style.letterSpacing = `${event.target.value}px`; })
document.getElementById('textTransformPicker').addEventListener('change', (event) => { GlobalSelectedItem.item.style.textTransform = event.target.value })
document.getElementById('textDecorationPicker').addEventListener('change', (event) => { GlobalSelectedItem.item.style.textDecoration = event.target.value })
document.querySelectorAll('.textAlign').forEach((ele, idx) => {
    ele.addEventListener('click', () => {
        if (GlobalSelectedItem.item) {
            GlobalSelectedItem.item.style.textAlign = ['left', 'center', 'right', 'justify'][idx];
        }
        undoRedo.do(canvasState());
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
        idStorage.push({ type: "text", id: headingElement.id });
        undoRedo.do(canvasState());
    });
});

text.forEach((ele, idx) => {
    ele.addEventListener('click', () => {
        const textElement = document.createElement('p');
        textElement.style.cursor = "pointer";
        textElement.style.display = idx === 4 ? "block" : "inline";
        textElement.style.margin = '0px';
        textElement.style.paddingLeft = "3px";
        textElement.style.paddingRight = "3px";
        textElement.innerHTML = 'Hello Mother Father';
        if (idx === 1) textElement.style.textDecoration = "underline";
        if (idx === 2) textElement.style.textDecoration = "line-through";
        if (idx === 3) textElement.style.fontWeight = "bold";
        textElement.id = getId();
        textElement.addEventListener('click', () => textPropertys(textElement.id));
        canvas.appendChild(textElement);
        textPropertys(textElement.id);
        idStorage.push({ type: "text", id: textElement.id });
        undoRedo.do(canvasState());
    });
});
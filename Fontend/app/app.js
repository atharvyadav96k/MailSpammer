let currentTextElement = null;
let currentImageElement = null;
let currentButtonElement = null;
let selectedItemType = "none";

const textPropertyWindow = document.getElementById("textPropertyWindow");
const imagePropertyWindow = document.getElementById("imagePropertyWindow");
const buttonPropertyWindow = document.getElementById("buttonPropertyWindow");
const canvas = document.getElementById("mailScreen");
const heading = document.querySelectorAll('.heading');
const text = document.querySelectorAll('.text');
const image = document.querySelectorAll('.addImage');
const btn = document.querySelectorAll('.btnClick');

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case "Delete":
            if (selectedItemType == "img") {
                removeImgElementById();
            } else if (selectedItemType == "btn") {
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
})
property();

function getId() {
    let prefix = "ID";
    const timestamp = Date.now().toString(36);
    const randomNum = Math.random().toString(36).substring(2, 8);
    return `${prefix}_${timestamp}_${randomNum}`;
}
function rgbToHex(rgb) {
    const result = rgb.match(/\d+/g);
    if (!result) return "#000000";
    return "#" + result.map(x => {
        const hex = parseInt(x).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }).join('');
}
function loadTextProperty() {
    if (!currentTextElement) return;
    document.getElementById("contentTextArea").value = currentTextElement.innerText || currentTextElement.textContent;
    document.getElementById("colorPicker").value = rgbToHex(getComputedStyle(currentTextElement).color);
    document.getElementById("fontSizePicker").value = parseInt(getComputedStyle(currentTextElement).fontSize);
    document.getElementById("fontWeightPicker").value = getComputedStyle(currentTextElement).fontWeight;
    document.getElementById("fontFamilyPicker").value = getComputedStyle(currentTextElement).fontFamily;
    document.getElementById("lineHeightPicker").value = parseFloat(getComputedStyle(currentTextElement).lineHeight);
    document.getElementById("textTransformPicker").value = getComputedStyle(currentTextElement).textTransform;
    document.getElementById("textDecorationPicker").value = getComputedStyle(currentTextElement).textDecorationLine;
    document.getElementById("letterSpacingPicker").value = parseFloat(getComputedStyle(currentTextElement).letterSpacing) || 0;
}
function property() {
    let items = [textPropertyWindow, imagePropertyWindow, buttonPropertyWindow];
    if (currentImageElement) {
        currentImageElement.style.border = "none";
    }

    if (currentTextElement) {
        currentTextElement.style.border = "none";
    }

    if (currentButtonElement) {
        currentButtonElement.style.border = "none";
    }

    items.forEach((ele) => {
        ele.style.display = "none";
    });

    switch (selectedItemType) {
        case "text":
            document.getElementById("property-window").style.display = "block";
            textPropertyWindow.style.display = "block";
            currentTextElement.style.borderBottom = "1px dashed rgba(0,0,0,0.5)";
            loadTextProperty();
            break;
        case "img":
            document.getElementById("property-window").style.display = "block";
            imagePropertyWindow.style.display = "block";
            currentImageElement.style.border = "1px dashed rgba(0,0,0,0.5)";
            loadImageProperty();
            break;
        case "btn":
            document.getElementById("property-window").style.display = "block";
            buttonPropertyWindow.style.display = "block";
            currentButtonElement.style.border = "1px dashed rgba(0,0,0,0.5)";
            loadButtonProperty();
            break;
        default:
            document.getElementById("property-window").style.display = "none";
            break;
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Copied to clipboard!");
    }).catch(err => {
        console.error("Failed to copy: ", err);
    });
}

function removeElementById() {
    if (currentTextElement) {
        currentTextElement.remove();
        currentTextElement = null;
    }
    selectedItemType = null;
    property();
}

function textPropertys(id) {
    if (currentTextElement) {
        currentTextElement.style.borderBottom = "none";
    }
    currentTextElement = document.getElementById(id);
    document.getElementById('contentTextArea').value = currentTextElement.innerText;
    currentTextElement.style.borderBottom = "2px dashed blue";
    selectedItemType = 'text';
    property();
}

function textColorProperty(color) {
    if (currentTextElement) {
        currentTextElement.style.color = color;
    }
}

function textSizeProperty(size) {
    if (currentTextElement) {
        currentTextElement.style.fontSize = size + "px";
    }
}

function textWeightProperty(weight) {
    if (currentTextElement) {
        currentTextElement.style.fontWeight = weight;
    }
}

document.getElementById("saveButton").addEventListener('click', () => {
    const elements = canvas.querySelectorAll("*");
    elements.forEach((element) => {
        element.style.borderBottom = "";
        element.style.cursor = "";
        if (currentImageElement) currentImageElement.style.border = "none";
        if (currentButtonElement) currentButtonElement.style.border = "none";
        element.removeAttribute("id");
        const elementId = getId();
        element.id = elementId;
        element.addEventListener('click', () => {
            textPropertys(element.id);
        });
    });
    let txt = `
    <html>
    <head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Poppins', sans-serif;
        }
.primary{
    background-color: #0d6df9;
    color: white;
}
.secondary{
    background-color: #6c757d;
    color: #ffffff;
}
.success{
    background-color: #198754;
    color: white;
}
.danger{
    background-color: #dc3545;
    color: white;
}
.warning{
    background-color: #d4a20e;
    color: black;
}
.info{
    background-color: #0dcaf0;
    color: black;
}
.light{
    background-color: white;
    color: black;
}
.dark{
    background-color: #212529;
    color: black;
}
.dark:hover{
    background-color: #bcbcbc;
    color: white;
}
        </style>
        </head>
        <body>
            ${canvas.innerHTML}
    </body>
    </html>`;
    copyToClipboard(txt);
});

function updateTextContent(event) {
    if (currentTextElement) {
        currentTextElement.innerHTML = event.target.value;
    }
}

document.getElementById("deleteElement").addEventListener('click', removeElementById);
document.getElementById('contentTextArea').addEventListener('input', updateTextContent);
document.getElementById('colorPicker').addEventListener('input', (event) => textColorProperty(event.target.value));
document.getElementById('fontSizePicker').addEventListener('input', (event) => textSizeProperty(event.target.value));
document.getElementById('fontWeightPicker').addEventListener('input', (event) => textWeightProperty(event.target.value));
document.getElementById('fontFamilyPicker').addEventListener('change', (event) => { currentTextElement.style.fontFamily = event.target.value; });
document.getElementById('lineHeightPicker').addEventListener('input', (event) => { currentTextElement.style.lineHeight = event.target.value; });
document.getElementById('letterSpacingPicker').addEventListener('input', (event) => { currentTextElement.style.letterSpacing = `${event.target.value}px`; })
document.getElementById('textTransformPicker').addEventListener('change', (event) => { currentTextElement.style.textTransform = event.target.value })
document.getElementById('textDecorationPicker').addEventListener('change', (event) => { currentTextElement.style.textDecoration = event.target.value })
document.querySelectorAll('.textAlign').forEach((ele, idx) => {
    ele.addEventListener('click', () => {
        if (currentTextElement) {
            currentTextElement.style.textAlign = ['left', 'center', 'right', 'justify'][idx];
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

const removeImgElementById = () => {
    if (currentImageElement) {
        currentImageElement.remove();
        currentImageElement = null;
    }
    selectedItemType = null;
    property();
}
document.getElementById('deleteImageElement').addEventListener('click', removeImgElementById());
document.getElementById("moveUpBtn").addEventListener('click', moveElementUp);
document.getElementById("moveDownBtn").addEventListener('click', moveElementDown);
document.getElementById('url').addEventListener('input', (event) => {
    if (currentImageElement) {
        currentImageElement.src = event.target.value;
    }
});
function loadImageProperty() {
    if (!currentImageElement) return;
    const style = getComputedStyle(currentImageElement);
    document.getElementById("url").value = currentImageElement.src || "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";
    document.getElementById("alt").value = currentImageElement.alt || "";
    const width = currentImageElement.style.width || style.width;
    if (width.endsWith('%')) {
        document.getElementById("imgWidth").value = parseFloat(width);
        document.getElementById("scaleW").value = "%";
    } else {
        document.getElementById("imgWidth").value = parseFloat(width);
        document.getElementById("scaleW").value = "px";
    }
    const height = currentImageElement.style.height || style.height;
    if (height.endsWith('%')) {
        document.getElementById("imgHeight").value = parseFloat(height);
        document.getElementById("scaleH").value = "%";
    } else {
        document.getElementById("imgHeight").value = parseFloat(height);
        document.getElementById("scaleH").value = "px";
    }
    document.getElementById("imgBorderRadius").value = parseInt(style.borderRadius) || 0;
    document.getElementById("imgObjectFit").value = style.objectFit;
    document.getElementById("imagebgLight").value = style.boxShadow || "";
    document.getElementById("imgPadding").value = parseInt(style.padding) || 0;
}

function imageProperty(id) {
    if (currentImageElement) {
        currentImageElement.style.border = "none";
    }
    currentImageElement = document.getElementById(id);
    selectedItemType = "img";
    currentImageElement.style.border = "1px dashed rgba(0,0,0,0.5)";
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
function moveElementUp() {
    const element = selectedItemType === 'text' ? currentTextElement : selectedItemType === 'img' ? currentImageElement : currentButtonElement;
    if (element && element.previousElementSibling) {
        canvas.insertBefore(element, element.previousElementSibling);
    }
}
function moveElementDown() {
    const element = selectedItemType === 'text' ? currentTextElement : selectedItemType === 'img' ? currentImageElement : currentButtonElement;
    if (element && element.nextElementSibling) {
        canvas.insertBefore(element.nextElementSibling, element);
    }
}
document.getElementById('imgWidth').addEventListener('input', (event) => {
    if (currentImageElement && selectedItemType == 'img') {
        currentImageElement.style.width = event.target.value + document.getElementById("scaleW").value;
    }
});
document.getElementById('imgHeight').addEventListener('input', (event) => {
    if (currentImageElement && selectedItemType == 'img') {
        currentImageElement.style.height = event.target.value + document.getElementById("scaleH").value;
    }
});
document.getElementById('imagebgLight').addEventListener('input', (event) => {
    if (currentImageElement) {
        currentImageElement.style.boxShadow = event.target.value;
    }
});
document.getElementById('imgPadding').addEventListener('input', (event) => {
    if (currentImageElement) {
        currentImageElement.style.padding = event.target.value + "px";
    }
})
// Button
function loadButtonProperty() {
    if (!currentButtonElement) return;
    const aTag = currentButtonElement.querySelector('a');
    console.log(getComputedStyle(aTag).fontSize)
    document.getElementById("buttonContent").value = aTag.innerText || "";
    document.getElementById("buttonUrl").value = aTag.getAttribute("data-url") || "";   
    document.getElementById("buttonDisplay").value = currentButtonElement.style.display || "inline-block";
    document.getElementById("buttonFont").value = parseFloat(getComputedStyle(aTag).fontSize) || 0;
    document.getElementById("buttonRound").value = parseInt(aTag.style.borderRadius) || "";
    document.getElementById("buttonTextDecoration").value = aTag.style.textDecoration || "none";
    document.getElementById("buttonAlign").value = currentButtonElement.style.justifyContent || "flex-start";
}

function removeBtnElement() {
    if (currentButtonElement) {
        currentButtonElement.remove();
        currentButtonElement = null;
    }
    selectedItemType = null;
    property();
}
document.getElementById("deleteBtnElement").addEventListener('click', () => removeBtnElement)
function buttonProperty(id) {
    if (currentButtonElement) {
        currentButtonElement.style.border = "none";
    }
    currentButtonElement = document.getElementById(id);
    selectedItemType = "btn";
    currentButtonElement.style.border = "1px dashed rgba(0,0,0,0.5)";
    property();
}
btn.forEach((ele, idx) => {
    ele.addEventListener('click', () => {
        const wrapper = document.createElement('div');
        wrapper.id = getId();
        wrapper.style.cursor = "pointer";
        wrapper.style.border = "1px dashed #000";
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
    if (currentButtonElement) {
        currentButtonElement.querySelector('a').innerHTML = event.target.value;
    }
});
document.getElementById('buttonUrl').addEventListener('input', (event) => {
    if (currentButtonElement) {
        currentButtonElement.querySelector('a').href = event.target.value;
        currentButtonElement.querySelector('a').target = "_black";
    }
});
document.getElementById('buttonType').addEventListener('change', (event) => {
    if (currentButtonElement) {
        let ele = currentButtonElement.querySelector('a');
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
    if (currentButtonElement) {
        currentButtonElement.style.display = event.target.value;
    }
})
document.getElementById('buttonAlign').addEventListener('change', (event) => {
    if (currentButtonElement) {
        currentButtonElement.style.display = "flex";
        console.log(event.target.value);
        currentButtonElement.style.justifyContent = event.target.value;
    }
});
document.getElementById('buttonFont').addEventListener('input', (event) => {
    if (currentButtonElement) {
        console.log(event.target.value)
        currentButtonElement.querySelector('a').style.fontSize = event.target.value + "px";
    }
});
document.getElementById('buttonRound').addEventListener('input', (event) => {
    if (currentButtonElement) {
        currentButtonElement.querySelector('a').style.borderRadius = event.target.value + "px";
    }
})
document.getElementById('buttonTextDecoration').addEventListener('change', (event) => {
    if (currentButtonElement) {
        currentButtonElement.querySelector('a').style.textDecoration = event.target.value;
    }
});
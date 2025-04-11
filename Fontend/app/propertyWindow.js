import { GlobalSelectedItem } from "./selectedItem.js";
import { rgbToHex } from "./globalFunction.js";

const textPropertyWindow = document.getElementById("textPropertyWindow");
const imagePropertyWindow = document.getElementById("imagePropertyWindow");
const buttonPropertyWindow = document.getElementById("buttonPropertyWindow");
const linkPropertyWindow = document.getElementById("linkPropertyWindow");

function loadTextProperty() {
    if (!GlobalSelectedItem.item) return;
    document.getElementById("contentTextArea").value = GlobalSelectedItem.item.innerText || GlobalSelectedItem.item.textContent;
    document.getElementById("colorPicker").value = rgbToHex(getComputedStyle(GlobalSelectedItem.item).color);
    document.getElementById("fontSizePicker").value = parseInt(getComputedStyle(GlobalSelectedItem.item).fontSize);
    document.getElementById("fontWeightPicker").value = getComputedStyle(GlobalSelectedItem.item).fontWeight;
    document.getElementById("fontFamilyPicker").value = getComputedStyle(GlobalSelectedItem.item).fontFamily;
    document.getElementById("lineHeightPicker").value = parseFloat(getComputedStyle(GlobalSelectedItem.item).lineHeight);
    document.getElementById("textTransformPicker").value = getComputedStyle(GlobalSelectedItem.item).textTransform;
    document.getElementById("textDecorationPicker").value = getComputedStyle(GlobalSelectedItem.item).textDecorationLine;
    document.getElementById("letterSpacingPicker").value = parseFloat(getComputedStyle(GlobalSelectedItem.item).letterSpacing) || 0;
}
function loadImageProperty() {
    if (!GlobalSelectedItem.item) return;
    const style = getComputedStyle(GlobalSelectedItem.item);
    document.getElementById("url").value = GlobalSelectedItem.item.src || "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";
    document.getElementById("alt").value = GlobalSelectedItem.item.alt || "";
    const width = GlobalSelectedItem.item.style.width || style.width;
    if (width.endsWith('%')) {
        document.getElementById("imgWidth").value = parseFloat(width);
        document.getElementById("scaleW").value = "%";
    } else {
        document.getElementById("imgWidth").value = parseFloat(width);
        document.getElementById("scaleW").value = "px";
    }
    const height = GlobalSelectedItem.item.style.height || style.height;
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
function loadButtonProperty() {
    if (!GlobalSelectedItem.item) return;
    const aTag = GlobalSelectedItem.item.querySelector('a');
    document.getElementById("buttonContent").value = aTag.innerText || "";
    document.getElementById("buttonUrl").value = aTag.getAttribute("data-url") || "";   
    document.getElementById("buttonDisplay").value = GlobalSelectedItem.item.style.display || "inline-block";
    document.getElementById("buttonFont").value = parseFloat(getComputedStyle(aTag).fontSize) || 0;
    document.getElementById("buttonRound").value = parseInt(aTag.style.borderRadius) || "";
    document.getElementById("buttonTextDecoration").value = aTag.style.textDecoration || "none";
    document.getElementById("buttonAlign").value = GlobalSelectedItem.item.style.justifyContent || "center";
}
function loadLinkProperty() {
    if (GlobalSelectedItem.item) {
        document.getElementById('linkText').value = GlobalSelectedItem.item.innerText;
        document.getElementById('textLink').value = GlobalSelectedItem.item.getAttribute("data-url") || "";
    }
}

export function property() {
    let items = [textPropertyWindow, imagePropertyWindow, buttonPropertyWindow, linkPropertyWindow];
    items.forEach((ele) => {
        ele.style.display = "none";
    });

    switch (GlobalSelectedItem.selectedItemType) {
        case "text":
            document.getElementById("property-window").style.display = "block";
            textPropertyWindow.style.display = "block";
            loadTextProperty();
            break;
        case "img":
            document.getElementById("property-window").style.display = "block";
            imagePropertyWindow.style.display = "block";
            loadImageProperty();
            break;
        case "btn":
            document.getElementById("property-window").style.display = "block";
            buttonPropertyWindow.style.display = "block";
            loadButtonProperty();
            break;
        case "link":
            document.getElementById("property-window").style.display = "block";
            linkPropertyWindow.style.display = "block";
            loadLinkProperty();
            break;
        default:
            document.getElementById("property-window").style.display = "none";
            break;
    }
}
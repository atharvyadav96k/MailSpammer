export function getId() {
    let prefix = "ID";
    const timestamp = Date.now().toString(36);
    const randomNum = Math.random().toString(36).substring(2, 8);
    return `${prefix}_${timestamp}_${randomNum}`;
}
export function rgbToHex(rgb) {
    const result = rgb.match(/\d+/g);
    if (!result) return "#000000";
    return "#" + result.map(x => {
        const hex = parseInt(x).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }).join('');
}
export function toBinaryStyle(numberText) {
    return numberText
        .replace(/[^0-1]+/g, '')
        .replace(/[^\d]/g, '')
        .split("")
        .reverse()
        .join("")
        .replace(/(.{4})/g, '$1 ')
        .trim()
        .split("")
        .reverse()
        .join("")
        .replace(/[^0-1 ]+/g, '')
}



export function toIntegerStyle(numberText) {
    return numberText
        .replace(/[^\d]+/g, '')
        .split("")
        .reverse()
        .join("")
        .replace(/(.{3})/g, '$1 ')
        .trim()
        .split("")
        .reverse()
        .join("")
        .replace(/[^\d]+/g, '')
}


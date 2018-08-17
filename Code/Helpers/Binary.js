export function toBinaryStyle(numberText) {
    return numberText
        .replace(/[^0-1]+/, '')
        .replace(/[^\d]/g, '')
        .replace(/(.{4})/g, '$1 ')
        .trim()
}
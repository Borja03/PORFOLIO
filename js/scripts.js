// Array de colores que se van a utilizar en el degradado
const colors = [
    '#2980b9', // Azul eléctrico
    '#8e44ad', // Morado
    '#e74c3c', // Rojo
    '#f39c12', // Naranja
    '#2ecc71', // Verde
    '#3498db', // Azul claro
    '#9b59b6', // Lavanda
    '#e67e22', // Naranja oscuro
];

let currentColorIndex = 0; // Índice del color actual
let nextColorIndex = 1; // Índice del siguiente color
let duration = 5000; // Duración de cada transición en milisegundos
let steps = 100; // Pasos para la transición
let stepDuration = duration / steps; // Duración de cada paso
let currentStep = 0; // Paso actual

// Función para actualizar el color de fondo
function updateBackgroundColor() {
    // Calculamos la mezcla entre el color actual y el siguiente
    const ratio = currentStep / steps;
    const currentColor = hexToRgb(colors[currentColorIndex]);
    const nextColor = hexToRgb(colors[nextColorIndex]);
    
    const blendedColor = {
        r: Math.round(currentColor.r + (nextColor.r - currentColor.r) * ratio),
        g: Math.round(currentColor.g + (nextColor.g - currentColor.g) * ratio),
        b: Math.round(currentColor.b + (nextColor.b - currentColor.b) * ratio)
    };

    document.body.style.background = `rgb(${blendedColor.r}, ${blendedColor.g}, ${blendedColor.b})`;

    currentStep++;
    if (currentStep >= steps) {
        currentStep = 0; // Reiniciar los pasos
        currentColorIndex = nextColorIndex; // Cambiar al siguiente color
        nextColorIndex = (nextColorIndex + 1) % colors.length; // Avanzar al siguiente color en el array
    }
}

// Convierte un color hexadecimal a un objeto RGB
function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    };
}

// Inicia la actualización de fondo
setInterval(updateBackgroundColor, stepDuration);

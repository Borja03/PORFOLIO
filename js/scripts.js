// Array de colores que se van a utilizar en los degradados
const colors = [
    ['#2980b9', '#8e44ad'], // Degradado de azul eléctrico a morado
    ['#e74c3c', '#f39c12'], // Degradado de rojo a naranja
    ['#2ecc71', '#3498db'], // Degradado de verde a azul claro
    ['#9b59b6', '#e67e22'], // Degradado de lavanda a naranja oscuro
];

let currentGradientIndex = 0; // Índice del degradado actual
let nextGradientIndex = 1; // Índice del siguiente degradado
let duration = 5000; // Duración de cada transición en milisegundos
let steps = 100; // Pasos para la transición
let stepDuration = duration / steps; // Duración de cada paso
let currentStep = 0; // Paso actual

// Convierte un color hexadecimal a un objeto RGB
function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    };
}

// Función para actualizar el color de fondo como degradado
function updateBackgroundGradient() {
    // Calculamos la mezcla entre los colores actuales y los siguientes del degradado
    const ratio = currentStep / steps;

    // Colores actuales del degradado
    const currentColor1 = hexToRgb(colors[currentGradientIndex][0]);
    const currentColor2 = hexToRgb(colors[currentGradientIndex][1]);

    // Colores siguientes del degradado
    const nextColor1 = hexToRgb(colors[nextGradientIndex][0]);
    const nextColor2 = hexToRgb(colors[nextGradientIndex][1]);

    // Mezcla entre los dos colores del degradado
    const blendedColor1 = {
        r: Math.round(currentColor1.r + (nextColor1.r - currentColor1.r) * ratio),
        g: Math.round(currentColor1.g + (nextColor1.g - currentColor1.g) * ratio),
        b: Math.round(currentColor1.b + (nextColor1.b - currentColor1.b) * ratio)
    };

    const blendedColor2 = {
        r: Math.round(currentColor2.r + (nextColor2.r - currentColor2.r) * ratio),
        g: Math.round(currentColor2.g + (nextColor2.g - currentColor2.g) * ratio),
        b: Math.round(currentColor2.b + (nextColor2.b - currentColor2.b) * ratio)
    };

    // Aplicar el gradiente de colores mezclados al fondo
    document.body.style.background = `linear-gradient(135deg, rgb(${blendedColor1.r}, ${blendedColor1.g}, ${blendedColor1.b}), rgb(${blendedColor2.r}, ${blendedColor2.g}, ${blendedColor2.b}))`;

    // Aplicar el mismo gradiente a los títulos de los proyectos
    const h3Elements = document.querySelectorAll('.project h3');
    h3Elements.forEach((h3) => {
        h3.style.backgroundImage = `linear-gradient(135deg, rgb(${blendedColor1.r}, ${blendedColor1.g}, ${blendedColor1.b}), rgb(${blendedColor2.r}, ${blendedColor2.g}, ${blendedColor2.b}))`;
    });

    currentStep++;
    if (currentStep >= steps) {
        currentStep = 0; // Reiniciar los pasos
        currentGradientIndex = nextGradientIndex; // Cambiar al siguiente degradado
        nextGradientIndex = (nextGradientIndex + 1) % colors.length; // Avanzar al siguiente degradado en el array
    }
}

// Inicia la actualización del fondo con gradientes
setInterval(updateBackgroundGradient, stepDuration);

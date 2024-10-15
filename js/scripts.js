const colors = [
    ['#003366', '#00ffff'], // Degradado de azul a cian
    ['#2ecc71', '#3498db'], // Degradado de verde esmeralda a azul
    ['#00aaff', '#005577'], // Degradado de azul claro a azul oscuro
    ['#1f4037', '#99f2c8'], // Degradado de verde bosque a verde menta
    ['#74ebd5', '#acb6e5'], // Degradado de verde agua a azul lavanda
    ['#8e44ad', '#00bfff'], // Degradado de púrpura a azul celeste
    ['#003366', '#66b3ff'], // Degradado de azul marino a verde claro
    ['#00ffff', '#004080'], // Degradado de aqua a azul oscuro
    ['#2980b9', '#6dd5fa'], // Degradado de azul océano a azul celeste claro
    ['#001f3f', '#87cefa'], // Degradado de azul noche a azul claro
    ['#12c2e9', '#f64f59'], // Degradado de celeste a rosado intenso (esto se puede cambiar)
    ['#48c6ef', '#005f73'], // Degradado de verde menta a azul
    ['#00c9ff', '#92fe9d'], // Degradado de azul celeste a verde lima
    ['#9b59b6', '#2980b9'], // Degradado de lavanda a azul océano
    ['#00ffcc', '#0099cc'], // Degradado de verde aqua a azul
    ['#003366', '#66c2ff'], // Degradado de azul marino a azul celeste
    ['#0072bb', '#2ab0ff'], // Degradado de azul oscuro a azul brillante
    ['#5f27cd', '#2c3e50'], // Degradado de morado a azul oscuro
    ['#74ebd5', '#66a6ff'], // Degradado de verde agua a azul cielo
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

    // Aumentar la opacidad a 0.9
    const opacity = 1;

    // Aplicar el gradiente de colores mezclados al fondo con opacidad
    document.body.style.background = `linear-gradient(135deg, rgba(${blendedColor1.r}, ${blendedColor1.g}, ${blendedColor1.b}, ${opacity}), rgba(${blendedColor2.r}, ${blendedColor2.g}, ${blendedColor2.b}, ${opacity})), url('images/ronda.webp')`;
    document.body.style.backgroundSize = 'cover'; // Asegúrate de que la imagen cubra todo el fondo

    // Aplicar el mismo gradiente a los títulos de los proyectos
    const h3Elements = document.querySelectorAll('.project h3');
    h3Elements.forEach((h3) => {
        h3.style.backgroundImage = `linear-gradient(135deg, rgba(${blendedColor1.r}, ${blendedColor1.g}, ${blendedColor1.b}, ${opacity}), rgba(${blendedColor2.r}, ${blendedColor2.g}, ${blendedColor2.b}, ${opacity}))`;
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

const colors = [
    ['#ff5733', '#33ff57'], // Vibrant Red to Bright Green
    ['#ff6f61', '#1abc9c'], // Coral to Teal
    ['#ff4500', '#00bfff'], // Orange Red to Bright Blue
    ['#ff6347', '#3498db'], // Tomato to Light Blue
    ['#ff1493', '#1f4037'], // Deep Pink to Dark Green
    ['#e74c3c', '#f1c40f'], // Red to Bright Yellow
    ['#d35400', '#2980b9'], // Pumpkin Orange to Blue
    ['#ff7f50', '#9b59b6'], // Coral to Purple
    ['#ff8c00', '#4e8bff'], // Dark Orange to Light Blue
    ['#ffcc00', '#2c3e50'], // Bright Yellow to Dark Gray
    ['#ff6347', '#2ecc71'], // Tomato to Bright Green
    ['#ff9966', '#2c3e50'], // Light Orange to Dark Gray
    ['#ff2e63', '#00aaff'], // Bright Pink to Light Blue
    ['#d35400', '#8e44ad'], // Pumpkin to Purple
    ['#ff8c94', '#005f73'], // Light Red to Dark Teal
    ['#fc4a1a', '#f39c12'], // Bright Red to Orange
    ['#ff4f81', '#ffab40'], // Bright Pink to Bright Orange
    ['#ff9933', '#004080'], // Bright Orange to Dark Blue
    ['#e67e22', '#663399'], // Carrot to Dark Purple
];

let currentGradientIndex = 0;
let nextGradientIndex = 1;
let duration = 2000;
let steps = 100;
let stepDuration = duration / steps;
let currentStep = 0;

function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    };
}

function updateTextGradient() {
    const ratio = currentStep / steps;
    const currentColor1 = hexToRgb(colors[currentGradientIndex][0]);
    const currentColor2 = hexToRgb(colors[currentGradientIndex][1]);
    const nextColor1 = hexToRgb(colors[nextGradientIndex][0]);
    const nextColor2 = hexToRgb(colors[nextGradientIndex][1]);

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

    const opacity = 1;

    // Mantener el gradiente animado solo en los textos <h3>
    const h3Elements = document.querySelectorAll('h3');
    h3Elements.forEach((h3) => {
        h3.style.backgroundImage = `linear-gradient(135deg, rgba(${blendedColor1.r}, ${blendedColor1.g}, ${blendedColor1.b}, ${opacity}), rgba(${blendedColor2.r}, ${blendedColor2.g}, ${blendedColor2.b}, ${opacity}))`;
        h3.style.webkitBackgroundClip = 'text';
        h3.style.color = 'transparent';
    });

    // Avanzar en la animación del gradiente
    currentStep++;
    if (currentStep >= steps) {
        currentStep = 0;
        currentGradientIndex = nextGradientIndex;
        nextGradientIndex = (nextGradientIndex + 1) % colors.length;
    }
}

// Establecer la imagen de fondo una vez
document.body.style.background = `url('images/caballos4.jpg') no-repeat center center fixed`;
document.body.style.backgroundSize = 'cover';

// Ejecutar el cambio de gradiente en los textos a intervalos
setInterval(updateTextGradient, stepDuration);

const colors = [
    ['#1f4037', '#99f2c8'], 
    ['#8e44ad', '#00bfff'], 
    ['#003366', '#66b3ff'], 
    ['#00aaff', '#005577'], 
    ['#74ebd5', '#acb6e5'], 
    ['#12c2e9', '#f64f59'], 
    ['#48c6ef', '#005f73'], 
    ['#9b59b6', '#2980b9'], 
    ['#00ffcc', '#0099cc'], 
    ['#003366', '#66c2ff'], 
    ['#5f27cd', '#2c3e50'], 
    ['#2ecc71', '#3498db'], 
    ['#0072bb', '#2ab0ff'], 
    ['#003366', '#00ffff'], 
    ['#2980b9', '#6dd5fa'], 
    ['#00c9ff', '#92fe9d'], 
    ['#001f3f', '#87cefa'], 
    ['#00ffff', '#004080'], 
    ['#74ebd5', '#66a6ff'],
    ['#ff6a00', '#ee0979'], // Nuevo color
    ['#833ab4', '#fcb045'], // Nuevo color
    ['#bdc3c7', '#2c3e50'], // Nuevo color
    ['#ff0084', '#33001b'], // Nuevo color
    ['#00b4db', '#0083b0'], // Nuevo color
    ['#654ea3', '#eaafc8'], // Nuevo color
];

let currentGradientIndex = 0;
let nextGradientIndex = 1;
let duration = 5000;
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

function updateBackgroundGradient() {
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

    document.body.style.background = `linear-gradient(135deg, rgba(${blendedColor1.r}, ${blendedColor1.g}, ${blendedColor1.b}, ${opacity}), rgba(${blendedColor2.r}, ${blendedColor2.g}, ${blendedColor2.b}, ${opacity}))`;

    const h3Elements = document.querySelectorAll('h3');
    h3Elements.forEach((h3) => {
        h3.style.backgroundImage = `linear-gradient(135deg, rgba(${blendedColor1.r}, ${blendedColor1.g}, ${blendedColor1.b}, ${opacity}), rgba(${blendedColor2.r}, ${blendedColor2.g}, ${blendedColor2.b}, ${opacity}))`;
        h3.style.webkitBackgroundClip = 'text';
        h3.style.color = 'transparent';
    });

    currentStep++;
    if (currentStep >= steps) {
        currentStep = 0;
        currentGradientIndex = nextGradientIndex;
        nextGradientIndex = (nextGradientIndex + 1) % colors.length;
    }
}

setInterval(updateBackgroundGradient, stepDuration);

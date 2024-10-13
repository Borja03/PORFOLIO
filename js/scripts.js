// scripts.js

let isScrolling = false;
const projects = document.querySelectorAll('.project');
let currentIndex = 0;

function scrollToProject(index) {
    if (index < 0 || index >= projects.length) return;
    isScrolling = true;
    projects[index].scrollIntoView({ behavior: 'smooth' });
    currentIndex = index;

    setTimeout(() => {
        isScrolling = false;
    }, 1000); // Ajusta el tiempo según la duración de tu desplazamiento
}

window.addEventListener('wheel', (event) => {
    event.preventDefault();
    if (!isScrolling) {
        scrollToProject(event.deltaY > 0 ? currentIndex + 1 : currentIndex - 1);
    }
});

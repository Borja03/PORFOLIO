// Validación simple del formulario de contacto
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que se recargue la página al enviar el formulario

    // Obtener los valores del formulario
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Validación básica
    if (name === "" || email === "" || message === "") {
        alert("Por favor, completa todos los campos.");
    } else {
        alert("¡Gracias por contactarme, " + name + "! Me pondré en contacto contigo pronto.");
        // Puedes enviar los datos a un servidor aquí si lo deseas
    }
});

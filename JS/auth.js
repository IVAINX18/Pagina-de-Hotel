// Elementos del DOM relacionados con la autenticación
const loginBtn = document.getElementById('login-btn'); // Botón para abrir el popup de inicio de sesión
const loginPopup = document.getElementById('login-popup'); // Popup para el formulario de inicio de sesión
const registerPopup = document.getElementById('register-popup'); // Popup para el formulario de registro
const popupOverlay = document.getElementById('popup-overlay'); // Capa de fondo que oscurece el resto de la página cuando un popup está abierto
const registerLink = document.getElementById('register-link'); // Enlace para abrir el popup de registro desde el de inicio de sesión
const loginLink = document.getElementById('login-link'); // Enlace para abrir el popup de inicio de sesión desde el de registro

// Función para mostrar un popup específico
function showPopup(popup) {
    popup.style.display = 'block'; // Muestra el popup
    popupOverlay.style.display = 'block'; // Muestra la capa de fondo
}

// Función para ocultar todos los popups
function hidePopups() {
    loginPopup.style.display = 'none'; // Oculta el popup de inicio de sesión
    registerPopup.style.display = 'none'; // Oculta el popup de registro
    popupOverlay.style.display = 'none'; // Oculta la capa de fondo
}

// Escuchadores de eventos
// Al hacer clic en el botón de inicio de sesión, se muestra el popup correspondiente
loginBtn?.addEventListener('click', () => showPopup(loginPopup));

// Al hacer clic en la capa de fondo, se ocultan todos los popups
popupOverlay.addEventListener('click', hidePopups);

// Al hacer clic en el enlace de registro, se oculta el popup de inicio de sesión y se muestra el de registro
registerLink?.addEventListener('click', (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del enlace
    loginPopup.style.display = 'none'; // Oculta el popup de inicio de sesión
    showPopup(registerPopup); // Muestra el popup de registro
});

// Al hacer clic en el enlace de inicio de sesión, se oculta el popup de registro y se muestra el de inicio de sesión
loginLink?.addEventListener('click', (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del enlace
    registerPopup.style.display = 'none'; // Oculta el popup de registro
    showPopup(loginPopup); // Muestra el popup de inicio de sesión
});

// Manejo del envío del formulario de inicio de sesión
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault(); // Previene que la página se recargue al enviar el formulario
    const formData = new FormData(e.target); // Obtiene los datos del formulario

    try {
        // Envía los datos a 'PHP/login.php' usando el método POST
        const response = await fetch('PHP/login.php', {
            method: 'POST',
            body: formData
        });
        const data = await response.text(); // Obtiene la respuesta del servidor como texto
        alert(data); // Muestra la respuesta al usuario

        // Si la respuesta incluye 'exitosamente', se ocultan los popups
        if (data.includes('exitosamente')) {
            hidePopups();
        }
    } catch (error) {
        console.error('Error:', error); // Muestra el error en la consola
        alert('Error al iniciar sesión'); // Informa al usuario sobre el error
    }
});

// Manejo del envío del formulario de registro
document.getElementById('register-form')?.addEventListener('submit', async (e) => {
    e.preventDefault(); // Previene que la página se recargue al enviar el formulario
    const formData = new FormData(e.target); // Obtiene los datos del formulario
    
    // Validación para asegurarse de que las contraseñas coincidan
    const password = formData.get('password'); // Obtiene la contraseña
    const confirmPassword = formData.get('confirm_password'); // Obtiene la confirmación de la contraseña
    
    // Si las contraseñas no coinciden, se muestra un mensaje de error
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return; // Sale de la función si las contraseñas no coinciden
    }

    try {
        // Envía los datos a 'PHP/register.php' usando el método POST
        const response = await fetch('PHP/register.php', {
            method: 'POST',
            body: formData
        });
        const data = await response.text(); // Obtiene la respuesta del servidor como texto
        alert(data); // Muestra la respuesta al usuario

        // Si la respuesta incluye 'registrado exitosamente', se ocultan los popups
        if (data.includes('registrado exitosamente')) {
            hidePopups();
        }
    } catch (error) {
        console.error('Error:', error); // Muestra el error en la consola
        alert('Error al registrarse'); // Informa al usuario sobre el error
    }
});
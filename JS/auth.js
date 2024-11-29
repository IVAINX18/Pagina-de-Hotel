// Elementos del DOM relacionados con la autenticación
const loginBtn = document.getElementById('login-btn'); // Botón para abrir el popup de inicio de sesión
const loginPopup = document.getElementById('login-popup'); // Popup para el formulario de inicio de sesión
const registerPopup = document.getElementById('register-popup'); // Popup para el formulario de registro
const loginEmployeePopup = document.getElementById('login-employee-popup'); // Popup para el formulario de inicio de sesión de empleados
const popupOverlay = document.getElementById('popup-overlay'); // Capa de fondo que oscurece el resto de la página cuando un popup está abierto
const registerLink = document.getElementById('register-link'); // Enlace para abrir el popup de registro desde el de inicio de sesión
const loginLink = document.getElementById('login-link'); // Enlace para abrir el popup de inicio de sesión desde el de registro
const employeeLoginLink = document.getElementById('employee-login-link');
const clientLoginLink = document.getElementById('client-login-link'); // Enlace para abrir el popup de inicio de sesión de empleados

// Función para mostrar un popup específico
function showPopup(popup) {
    popup.style.display = 'block'; // Muestra el popup
    popupOverlay.style.display = 'block'; // Muestra la capa de fondo
}

// Función para ocultar todos los popups
function hidePopups() {
    loginPopup.style.display = 'none'; // Oculta el popup de inicio de sesión
    registerPopup.style.display = 'none'; // Oculta el popup de registro
    loginEmployeePopup.style.display = 'none'; // Oculta el popup de inicio de sesión de empleados
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

// Al hacer clic en el enlace de inicio de sesión de empleados, se oculta el popup de inicio de sesión y se muestra el de inicio de sesión de empleados
employeeLoginLink?.addEventListener('click', (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto
    loginPopup.style.display = 'none'; // Oculta el popup de inicio de sesión
    showPopup(loginEmployeePopup); // Muestra el popup de inicio de sesión de empleados
});

// Al hacer clic en el enlace de inicio de sesión de clientes, se oculta el popup de inicio de sesión de empleados y se muestra el de inicio de sesión
clientLoginLink?.addEventListener('click', (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto
    loginEmployeePopup.style.display = 'none'; // Oculta el popup de empleados
    showPopup(loginPopup); // Muestra el popup de usuarios
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

        const result = await response.json(); // Espera la respuesta en formato JSON

        if (result.success) {
            // Si el inicio de sesión es exitoso, redirige al usuario
            window.location.href = 'dashboard.php'; // Cambia a la página de destino
        } else {
            // Si hay un error, muestra un mensaje
            alert(result.message); // Muestra el mensaje de error
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error); // Manejo de errores
        alert('Ocurrió un error al intentar iniciar sesión.'); // Mensaje de error genérico
    }
});

// Manejo del envío del formulario de inicio de sesión de empleados
document.getElementById('login-employee-popup')?.querySelector('form')?.addEventListener('submit', async (e) => {
    e.preventDefault(); // Previene que la página se recargue al enviar el formulario
    const formData = new FormData(e.target); // Obtiene los datos del formulario

    try {
        // Envía los datos a 'PHP/login_employee.php' usando el método POST
        const response = await fetch('PHP/login_employee.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.json(); // Espera la respuesta en formato JSON

        if (result.success) {
            // Mostrar mensaje de bienvenida y redirigir
            alert(result.message); // Muestra el mensaje de bienvenida
            window.location.href = result.redirect; // Redirige al inventario
        } else {
            // Mostrar mensaje de error
            alert(result.message); // Muestra el mensaje de error
        }
    } catch (error) {
        console.error('Error al iniciar sesión de empleados:', error); // Manejo de errores
        alert('Ocurrió un error al intentar iniciar sesión como empleado.'); // Mensaje de error genérico
    }
});

// Se añade un listener para el evento 'DOMContentLoaded', que se ejecuta cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Se obtiene el enlace de reservas y el botón de redirección de inicio de sesión por su ID
    const reservasLink = document.getElementById('reservas-link');
    const loginRedirectBtn = document.getElementById('login-redirect-btn');

    // Función que maneja el clic en el enlace de reservas
    const handleReservasClick = async (e) => {
        // Previene la acción por defecto del enlace
        e.preventDefault();
        
        // Verifica si el usuario está autenticado
        const isAuthenticated = await utils.checkSession();
        
        // Si el usuario está autenticado, redirige a la página de reservas
        if (isAuthenticated) {
            window.location.href = 'reserva.html';
        } else {
            // Si no está autenticado, muestra un popup de alerta
            utils.showPopup('alert-popup');
        }
    };

    // Añade el listener de clic al enlace de reservas
    reservasLink?.addEventListener('click', handleReservasClick);

    // Añade el listener de clic al botón de redirección de inicio de sesión
    loginRedirectBtn?.addEventListener('click', () => {
        // Muestra el popup de inicio de sesión al hacer clic en el botón
        utils.showPopup('login-popup');
    });
});
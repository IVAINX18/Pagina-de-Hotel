// Esperamos a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    const reservasLink = document.getElementById('reservas-link');
    const alertPopup = document.getElementById('alert-popup');
    const popupOverlay = document.getElementById('popup-overlay');
    const loginPopup = document.getElementById('login-popup');
    const loginRedirectBtn = document.getElementById('login-redirect-btn');

    // Verificamos que todos los elementos existan
    console.log('Elementos:', {
        reservasLink,
        alertPopup,
        popupOverlay,
        loginPopup,
        loginRedirectBtn
    });

    if (reservasLink) {
        reservasLink.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Reservas link clicked');

            // Verificar sesión
            fetch('PHP/check_session.php')
                .then(response => response.json())
                .then(data => {
                    console.log('Session check result:', data);

                    if (data.authenticated) {
                        // Si está autenticado, redirigir a reservas.html
                        window.location.href = 'reservas.html';
                    } else {
                        // Mostrar alerta de inicio de sesión
                        console.log('Showing alert popup');
                        
                        // Verificamos que showPopup esté definida
                        if (typeof showPopup === 'function') {
                            showPopup(alertPopup);
                        } else {
                            console.error('showPopup function is not defined');
                            alert('Por favor, inicie sesión para hacer una reserva');
                        }
                    }
                })
                .catch(error => {
                    console.error('Error verificando sesión:', error);
                    alert('Hubo un problema al verificar la sesión');
                });
        });
    } else {
        console.error('Reservas link not found');
    }

    // Manejador para el botón de redirección de login en la alerta
    if (loginRedirectBtn) {
        loginRedirectBtn.addEventListener('click', () => {
            console.log('Login redirect button clicked');
            
            // Verificamos que hidePopups esté definida
            if (typeof hidePopups === 'function') {
                hidePopups();
            }
            
            // Verificamos que showPopup esté definida
            if (typeof showPopup === 'function') {
                showPopup(loginPopup);
            } else {
                console.error('showPopup function is not defined');
                alert('Por favor, inicie sesión');
            }
        });
    }
});
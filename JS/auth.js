document.addEventListener('DOMContentLoaded', () => {
    // Elementos de autenticación
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const employeeLoginForm = document.getElementById('employee-login-form');
    const authBtn = document.getElementById('auth-btn');

    // Links de navegacion
    const registerLink = document.getElementById('register-link');
    const loginLink = document.getElementById('login-link');
    const employeeLoginLink = document.getElementById('employee-login-link');
    const clientLoginLink = document.getElementById('client-login-link');

    // check session en el onLoad de la página
    checkSession().then(userType => {
        if (userType) {
            updateAuthButton(true);
            if (userType === 'cliente') {
                // Mostrar el popup de reserva si es cliente
                document.getElementById('reserva-popup').style.display = 'block';
            } else if (userType === 'empleado') {
                // Mostrar el popup de inventario si es empleado
                document.getElementById('inventario-popup').style.display = 'block';
            }
        }
    });

    // eventos y funciones para el botón de autenticación 
    authBtn?.addEventListener('click', () => {
        checkSession().then(isAuthenticated => {
            if (isAuthenticated) {
                // Llamar a logout.php para cerrar sesión
                fetch('PHP/LOGIN-LOG_OUT/logout.php')
                    .then(response => response.json())
                    .then(result => {
                        if (result.success) {
                            updateAuthButton(false);
                            hideAllPopups();
                            window.location.reload(); // Recargar la página para reflejar el cambio
                        } else {
                            alert('Error al cerrar sesión');
                        }
                    })
                    .catch(error => {
                        console.error('Error al cerrar sesión:', error);
                        alert('Error al cerrar sesión');
                    });
            } else {
                showPopup('login-popup');
            }
        });
    });

    // Cerrar sesión automáticamente al cerrar la página
window.addEventListener('beforeunload', () => {
    fetch('PHP/LOGIN-LOG_OUT/logout.php', {
        method: 'POST',
        credentials: 'include' // Asegúrate de enviar cookies de sesión si las estás usando
    })
    .then(response => response.json())
    .then(result => {
        console.log('Sesión cerrada automáticamente:', result);
    })
    .catch(error => {
        console.error('Error al cerrar sesión:', error);
    });
});


    // Función para actualizar el estado del botón de autenticación
    function updateAuthButton(isAuthenticated) {
        if (authBtn) {
            const icon = authBtn.querySelector('i');
            const text = authBtn.querySelector('span');
            
            if (isAuthenticated) {
                icon.className = 'fas fa-sign-out-alt';
                text.textContent = 'Cerrar sesión';
            } else {
                icon.className = 'fas fa-user';
                text.textContent = 'Iniciar sesión';
            }
        }
    }

    // Función para manejar el envío de formularios
    const handleFormSubmit = async (e, endpoint) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                hideAllPopups();
                updateAuthButton(true);
                // Mostrar el popup de reserva si es cliente
                if (result.userType === 'cliente') {
                    document.getElementById('reserva-popup').style.display = 'block';
                } else if (result.userType === 'empleado') {
                    document.getElementById('inventario-popup').style.display = 'block'; // Agregamos esto
                }
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Form submission error:', error);
            alert('Error al procesar la solicitud');
        }
    };

    // Add form submit event listeners
    loginForm?.addEventListener('submit', e => handleFormSubmit(e, 'PHP/LOGIN-LOG_OUT/login.php'));
    registerForm?.addEventListener('submit', e => handleFormSubmit(e, 'php/register.php'));
    employeeLoginForm?.addEventListener('submit', e => handleFormSubmit(e, 'PHP/LOGIN-LOG_OUT/login_employee.php'));

    // Add navigation event listeners
    registerLink?.addEventListener('click', e => {
        e.preventDefault();
        showPopup('register-popup');
    });

    loginLink?.addEventListener('click', e => {
        e.preventDefault();
        showPopup('login-popup');
    });

    employeeLoginLink?.addEventListener('click', e => {
        e.preventDefault();
        showPopup('employee-login-popup');
    });

    clientLoginLink?.addEventListener('click', e => {
        e.preventDefault();
        showPopup('login-popup');
    });
});

// Helper functions
function checkSession() {
    return fetch('php/check_session.php')
        .then(response => response.json())
        .then(data => {
            if (data.authenticated) {
                return data.userType; // Asegúrate de que el backend devuelva el tipo de usuario
            }
            return false;
        })
        .catch(error => {
            console.error('Session check error:', error);
            return false;
        });
}

function showPopup(popupId) {
    const popup = document.getElementById(popupId);
    const overlay = document.getElementById('popup-overlay');
    if (popup && overlay) {
        hideAllPopups();
        popup.style.display = 'block';
        overlay.style.display = 'block';
    }
}

function hideAllPopups() {
    const popups = document.querySelectorAll('.auth-popup');
    const overlay = document.getElementById('popup-overlay');
    popups.forEach(popup => popup.style.display = 'none');
    if (overlay) overlay.style.display = 'none';
}

function logoutAndRedirect() {
    console.log('Intentando cerrar sesión...'); // Agrega este log
    fetch('PHP/LOGIN-LOG_OUT/logout.php', {
        method: 'POST'
    })
    .then(response => response.json())
    .then(result => {
        console.log(result); // Verifica la respuesta
        if (result.success) {
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000); // Espera 1 segundo antes de redirigir
        }
        else {
            alert('Error al cerrar sesión');
        }
    })
    .catch(error => {
        console.error('Error al cerrar sesión:', error);
        alert('Error al cerrar sesión');
    });
}



document.addEventListener('DOMContentLoaded', () => {
    // Form elements
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const employeeLoginForm = document.getElementById('employee-login-form');
    const authBtn = document.getElementById('auth-btn');

    // Navigation links
    const registerLink = document.getElementById('register-link');
    const loginLink = document.getElementById('login-link');
    const employeeLoginLink = document.getElementById('employee-login-link');
    const clientLoginLink = document.getElementById('client-login-link');

    // Check session status on page load
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

    // Handle auth button click
    authBtn?.addEventListener('click', () => {
        checkSession().then(isAuthenticated => {
            if (isAuthenticated) {
                window.location.href = 'PHP/logout.php';
            } else {
                showPopup('login-popup');
            }
        });
    });

    // Update auth button based on session status
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

    // Handle form submissions
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
    loginForm?.addEventListener('submit', e => handleFormSubmit(e, 'php/login.php'));
    registerForm?.addEventListener('submit', e => handleFormSubmit(e, 'php/register.php'));
    employeeLoginForm?.addEventListener('submit', e => handleFormSubmit(e, 'php/login_employee.php'));

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

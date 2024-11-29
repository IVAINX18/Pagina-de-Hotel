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
    utils.checkSession().then(isAuthenticated => {
        if (isAuthenticated) {
            updateAuthButton(true);
        }
    });

    // Handle auth button click
    authBtn?.addEventListener('click', () => {
        utils.checkSession().then(isAuthenticated => {
            if (isAuthenticated) {
                window.location.href = 'PHP/logout.php';
            } else {
                utils.showPopup('login-popup');
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
                utils.hideAllPopups();
                updateAuthButton(true);
                window.location.reload();
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
        utils.showPopup('register-popup');
    });

    loginLink?.addEventListener('click', e => {
        e.preventDefault();
        utils.showPopup('login-popup');
    });

    employeeLoginLink?.addEventListener('click', e => {
        e.preventDefault();
        utils.showPopup('employee-login-popup');
    });

    clientLoginLink?.addEventListener('click', e => {
        e.preventDefault();
        utils.showPopup('login-popup');
    });
});
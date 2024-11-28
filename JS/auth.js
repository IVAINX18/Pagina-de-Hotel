// Auth-related DOM elements
const loginBtn = document.getElementById('login-btn');
const loginPopup = document.getElementById('login-popup');
const registerPopup = document.getElementById('register-popup');
const popupOverlay = document.getElementById('popup-overlay');
const registerLink = document.getElementById('register-link');
const loginLink = document.getElementById('login-link');

// Show/hide popup functions
function showPopup(popup) {
    popup.style.display = 'block';
    popupOverlay.style.display = 'block';
}

function hidePopups() {
    loginPopup.style.display = 'none';
    registerPopup.style.display = 'none';
    popupOverlay.style.display = 'none';
}

// Event Listeners
loginBtn?.addEventListener('click', () => showPopup(loginPopup));
popupOverlay.addEventListener('click', hidePopups);

registerLink?.addEventListener('click', (e) => {
    e.preventDefault();
    loginPopup.style.display = 'none';
    showPopup(registerPopup);
});

loginLink?.addEventListener('click', (e) => {
    e.preventDefault();
    registerPopup.style.display = 'none';
    showPopup(loginPopup);
});

// Form submissions
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
        const response = await fetch('PHP/login.php', {
            method: 'POST',
            body: formData
        });
        const data = await response.text();
        alert(data);
        if (data.includes('exitosamente')) {
            hidePopups();
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al iniciar sesión');
    }
});

document.getElementById('register-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Validate passwords match
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm_password');
    
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }

    try {
        const response = await fetch('PHP/register.php', {
            method: 'POST',
            body: formData
        });
        const data = await response.text();
        alert(data);
        if (data.includes('exitosamente')) {
            hidePopups();
            showPopup(loginPopup);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al registrar');
    }
});
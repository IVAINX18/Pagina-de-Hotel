const utils = {
    // Muestra un popup específico y oculta los demás
    showPopup: function(popupId) {
        const popup = document.getElementById(popupId);
        const overlay = document.getElementById('popup-overlay');
        if (popup && overlay) {
            this.hideAllPopups(); // Oculta otros popups
            popup.style.display = 'block'; // Muestra el popup seleccionado
            overlay.style.display = 'block'; // Muestra el overlay
        }
    },

    // Oculta todos los popups y el overlay
    hideAllPopups: function() {
        const popups = document.querySelectorAll('.auth-popup');
        const overlay = document.getElementById('popup-overlay');
        popups.forEach(popup => popup.style.display = 'none'); // Oculta cada popup
        if (overlay) overlay.style.display = 'none'; // Oculta el overlay
    },

    // Verifica si la sesión del usuario es válida
    checkSession: async function() {
        try {
            const response = await fetch('php/check_session.php'); // Llama al servidor
            const data = await response.json(); // Convierte la respuesta a JSON
            return data.authenticated; // Devuelve el estado de autenticación
        } catch (error) {
            console.error('Session check error:', error); // Manejo de errores
            return false; // Retorna false si hay un error
        }
    }
};

// Asegúrate de que el overlay cierre los popups al hacer clic
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('popup-overlay');
    
    if (overlay) {
        overlay.addEventListener('click', () => {
            utils.hideAllPopups(); // Llama a la función para cerrar los popups
        });
    } else {
        console.error('El elemento con id "popup-overlay" no existe.');
    }
});

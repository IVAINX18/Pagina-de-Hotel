const utils = {
    showPopup: function(popupId) {
        const popup = document.getElementById(popupId);
        const overlay = document.getElementById('popup-overlay');
        if (popup && overlay) {
            this.hideAllPopups();
            popup.style.display = 'block';
            overlay.style.display = 'block';
        }
    },

    hideAllPopups: function() {
        const popups = document.querySelectorAll('.auth-popup');
        const overlay = document.getElementById('popup-overlay');
        popups.forEach(popup => popup.style.display = 'none');
        if (overlay) overlay.style.display = 'none';
    },

    checkSession: async function() {
        try {
            const response = await fetch('php/check_session.php');
            const data = await response.json();
            return data.authenticated;
        } catch (error) {
            console.error('Session check error:', error);
            return false;
        }
    }
};

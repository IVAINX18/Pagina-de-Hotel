// Popup Management
function showPopup(popupId) {
    const popup = document.getElementById(popupId);
    const overlay = document.getElementById('popup-overlay');
    if (popup && overlay) {
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

// Event Listeners
document.getElementById('popup-overlay')?.addEventListener('click', hideAllPopups);
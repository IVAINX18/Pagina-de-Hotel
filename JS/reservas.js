document.addEventListener('DOMContentLoaded', () => {
    const reservasLink = document.getElementById('reservas-link');
    const loginRedirectBtn = document.getElementById('login-redirect-btn');

    const handleReservasClick = async (e) => {
        e.preventDefault();
        
        const isAuthenticated = await utils.checkSession();
        
        if (isAuthenticated) {
            window.location.href = 'reserva.html';
        } else {
            utils.showPopup('alert-popup');
        }
    };

    reservasLink?.addEventListener('click', handleReservasClick);

    loginRedirectBtn?.addEventListener('click', () => {
        utils.showPopup('login-popup');
    });
});
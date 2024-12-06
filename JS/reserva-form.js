document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('reserva-form');
    const fechaEntrada = document.getElementById('fecha_entrada');
    const fechaSalida = document.getElementById('fecha_salida');
    const notificationArea = document.createElement('div');
    notificationArea.id = 'notification-area';
    form.insertBefore(notificationArea, form.firstChild);

    function showNotification(message, type = 'error') {
        notificationArea.innerHTML = `
            <div class="alert alert-${type}">
                ${message}
                <button class="close-notification">&times;</button>
            </div>
        `;
        
        const closeBtn = notificationArea.querySelector('.close-notification');
        closeBtn.addEventListener('click', () => {
            notificationArea.innerHTML = '';
        });

        setTimeout(() => {
            notificationArea.innerHTML = '';
        }, 5000);
    }

    const today = new Date().toISOString().split('T')[0];
    fechaEntrada.min = today;

    fechaEntrada.addEventListener('change', function() {
        fechaSalida.min = this.value;
    });

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData(form);

        if (!utils.validateForm(formData)) {
            showNotification('Por favor, complete todos los campos.');
            return;
        }

        try {
            const response = await fetch('PHP/reserva_handler.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                showNotification('Reserva realizada con éxito', 'success');
                // Clear all form fields
                form.querySelectorAll('input, textarea, select').forEach(field => {
                    if (field.type === 'date') {
                        field.value = '';
                    } else if (field.type !== 'submit') {
                        field.value = '';
                    }
                });
                // Reset date constraints
                fechaEntrada.min = today;
                fechaSalida.min = '';
            } else {
                showNotification(result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification('Ocurrió un problema al procesar la reserva');
        }
    });

    const style = document.createElement('style');
    style.textContent = `
        #notification-area {
            margin-bottom: 15px;
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1000;
            width: 80%;
            max-width: 500px;
        }
        .alert {
            padding: 10px;
            border-radius: 5px;
            position: relative;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .alert-error {
            background-color: #f8d7da;
            color: #721c24;
        }
        .alert-success {
            background-color: #d4edda;
            color: #155724;
        }
        .close-notification {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);
});
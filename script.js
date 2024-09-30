document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const carName = urlParams.get('voiture');
    if (carName) {
        document.getElementById('car-name').textContent = carName;
    } else {
        alert('Aucun nom de voiture fourni.');
    }

    const form = document.getElementById('form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                startDate: formData.get('start-date'),
                endDate: formData.get('end-date'),
                carName: carName,
                sendMethod: formData.get('send-method')
            };

            const message = `
            Réservation de ${data.carName} :
            
            Nom          : ${data.name}
            Email        : ${data.email}
            Téléphone    : ${data.phone}
            Date de début: ${data.startDate}
            Date de fin  : ${data.endDate}
            `;

            if (data.sendMethod === 'whatsapp') {
                contactByWhatsApp(message);
            } else if (data.sendMethod === 'email') {
                contactByEmail(message);
            } else {
                alert('Méthode d\'envoi invalide.');
            }
        });
    }
});

function contactByWhatsApp(message) {
    const phone = "+22870193609"; // numéro WhatsApp
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
}

function contactByEmail(message) {
    const email = "clementjohnson476@gmail.com"; // addresse  email
    const subject = encodeURIComponent("Réservation de Voiture");
    const body = encodeURIComponent(message);
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank');
}

function contactByTelegram(message) {
    const username = "JC"; //  nom d'utilisateur Telegram
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://t.me/${username}?text=${encodedMessage}`, '_blank');
}

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const carName = urlParams.get('voiture');
    const carNumber = urlParams.get('numVoiture'); // Récupérer le numéro de la voiture

    if (carName) {
        document.getElementById('car-name').textContent = carName;
    } else {
        alert('Aucun nom de voiture fourni.');
    }

    const form = document.getElementById('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            startDate: formData.get('start-date'),
            endDate: formData.get('end-date'),
            carName: carName || 'Nom de voiture indisponible', // Message par défaut si manquant
            carNumber: carNumber || 'Numéro de voiture indisponible', // Message par défaut si manquant
            sendMethod: formData.get('send-method')
        };

        const message = `
        Réservation de ${data.carName} (Numéro: ${data.carNumber}) :
        
        Nom          : ${data.name}
        Email        : ${data.email}
        Téléphone    : ${data.phone}
        Date de début: ${data.startDate}
        Date de fin  : ${data.endDate}
        `;

        // Les differents méthode d'envoi de message de confirmation 
        if (data.sendMethod === 'whatsapp') {
            contactByWhatsApp(message);
        } else if (data.sendMethod === 'email') {
            contactByEmail(message);
        } else if (data.sendMethod === 'telegram') {
            contactByTelegram(message);
        } else {
            alert('Méthode d\'envoi invalide.');
            return;
        }

    });
});

function contactByWhatsApp(message) {
    const phone = "+22870193609"; //  numéro WhatsApp
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
}

function contactByEmail(message) {
    const email = "clementjohnson476@gmail.com"; //  addresse  email
    const subject = encodeURIComponent("Réservation de Voiture");
    const body = encodeURIComponent(message);
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank');
}

function contactByTelegram(message) {
    const telegramUsername = "votre_username_telegram"; //  nom d'utilisateur Telegram
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://t.me/${telegramUsername}?text=${encodedMessage}`, '_blank');
}

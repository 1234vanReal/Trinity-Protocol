const socket = io();
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

// Benutzernamen aus sessionStorage abrufen
const username = sessionStorage.getItem("username");

// Überprüfen, ob der Benutzer eingeloggt ist
if (!username) {
    alert("Bitte loggen Sie sich zuerst ein!");
    window.location.href = "secret.html"; // Weiterleitung zur Login-Seite
}

// Chatverlauf empfangen und anzeigen
socket.on('chat history', (history) => {
    history.forEach((msg) => {
        const item = document.createElement('li');
        item.textContent = `${msg.user}: ${msg.text}`;
        messages.appendChild(item);
    });

    // Automatisch nach unten scrollen
    messages.scrollTop = messages.scrollHeight;
});

// Nachricht senden
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        // Nachricht mit Benutzername senden
        socket.emit('chat message', { user: username, text: input.value });
        input.value = '';
    }
});

// Nachricht empfangen
socket.on('chat message', (msg) => {
    const item = document.createElement('li');
    item.textContent = `${msg.user}: ${msg.text}`;
    messages.appendChild(item);

    // Automatisch nach unten scrollen
    messages.scrollTop = messages.scrollHeight;
});
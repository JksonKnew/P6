document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector(".login-container form");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Empêche l'envoi du formulaire par défaut.

        // Récupérer les valeurs de l'email et du mot de passe depuis le formulaire
        const email = document.getElementById("email").value;
        const password = document.getElementById("motdepasse").value;

        // Créer un objet de données à envoyer à l'API
        const data = {
            email: email,
            password: password
        };

        // Effectuer une requête POST vers l'API pour obtenir le token de connexion
        fetch('http://localhost:5678/api/users/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(tokenData => {
            // Le token de connexion est dans tokenData, vous pouvez le stocker ou l'utiliser comme nécessaire.
            const token = tokenData.token;
            console.log("Token de connexion :", token);
            window.localStorage.setItem("token", token);
            document.location.href="index.html";
            // Vous pouvez rediriger l'utilisateur vers une page de connexion réussie ou effectuer d'autres actions ici.
        })
        .catch(error => {
            console.error("Erreur lors de la demande de token :", error);
            // Gérer les erreurs, par exemple, afficher un message d'erreur à l'utilisateur.
        });
    });
});

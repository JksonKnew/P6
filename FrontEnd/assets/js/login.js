document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector(".login-container form");

    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("motdepasse").value;

        const data = {
            email: email,
            password: password
        };
         try {
            const response = await fetch("http://localhost:5678/api/users/login/", {
              method: "POST", // or 'PUT'
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });
        
            const result = await response.json();
            console.log("Success:", result);
          } catch (error) {
            console.error("Error:", error);
          }
        });








        // .then((response) => response.json())
        // .then((tokenData) => {
        //      const token = tokenData.token;
        //      console.log(token);
        //      window.localStorage.setItem("token", token);
        //      // document.location.href="index.html";
        //  })
        // .catch((error) => {
        //     console.error("Erreur lors de la demande de token :", error);
        // });
    });

document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector(".login-container form");
    const btnConnect = document.getElementById("btn-connection");




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
            const token = result.token;
            window.localStorage.setItem("token", token);

            if (token == null){
              console.log("faux");
              const passwordInput = document.getElementById("motdepasse");
              const emailInput = document.getElementById("email");

              btnConnect.setAttribute("value", "Mot de passe erroné");
              btnConnect.style.width= "auto";
              btnConnect.style.padding= "0px 20px";
              btnConnect.style.backgroundColor="firebrick";
              passwordInput.style.border="2px solid red";
              emailInput.style.border="2px solid red";


              passwordInput.addEventListener("focus", function(){
                btnConnect.setAttribute("value", "Se connecter");
                btnConnect.style.backgroundColor="#1d6154";
                passwordInput.style.border="none";
                emailInput.style.border="none";
              });


            } else {
              console.log("vrai");
              document.location.href="index.html";
            }

          } catch (error) {
            console.log("Error:", error);
          }
        });

        

    });

const login = document.getElementById("loginPage");

login.addEventListener("submit", function(event) {
    event.preventDefault();
    const valueEmail = document.getElementById("email").value;
    const valuePassword = document.getElementById("password").value;
    const logs = { email : valueEmail , password : valuePassword };

    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify(logs)
    })
    .then((response) => response.json())
    .then((log) => {
        if (log.token) {
            window.localStorage.setItem("userLogs", JSON.stringify(log));
            document.location.href = "index.html";
        }
        else {
            alert("Erreur dans l'identifiant ou le mot de passe !")
        }
    })
});
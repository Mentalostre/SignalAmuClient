export const handleSignupPost = function (userEmail, userPassword) {
    var dataToSend = {
        email: userEmail,
        password: userPassword,
    };
    var formBody = [];
    for (var data in dataToSend) {
        var encodedKey = encodeURIComponent(data);
        var encodedValue = encodeURIComponent(dataToSend[data]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    fetch("http://192.168.1.54:3000/api/signup", {
            method: "POST",
            body: formBody,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
        .then((response) => response.json())
        .then((json) => {
            console.log(json.res);
            switch (json.res) {
                case 1:
                    console.log("connected");
                    break;
                case 100:
                    alert("Un compte avec cette adresse email existe déjà.");
                    break;
                case 69:
                    alert("regarde le serv le couz");
                    break;
                case 25:
                    alert("Email invalide.");
                    break;
                case 50:
                    alert("Il manque un truc wallah");
                    break;
                case 51:
                    alert("ya un truc en trop");
                    break;
            }
        })
        .catch((err) => console.log(err));
};
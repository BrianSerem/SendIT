document.getElementById("logout").addEventListener("click", logOut)
document.getElementById("username").innerHTML = localStorage.name




function logOut(e) {
    e.preventDefault();

    let logouturl = "https://sendit123.herokuapp.com/api/v2/auth/logout";
    fetch(logouturl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            }


        })
        .then(res => res.json())
        .then(response => {
            if (response.status = "success") {
                window.localStorage.setItem('loggedin', false)
                window.location.href = 'index.html';
                console.log(localStorage.loggedin)


            } else {
                alert("error logging you out!");
                console.log(localStorage.loggedin)
            }
        })
        .catch(error => console.log(error));
}
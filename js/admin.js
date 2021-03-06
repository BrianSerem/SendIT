document.addEventListener("DOMContentLoaded", function() {
    /*document.getElementById("yourdashboard").addEventListener("click", referUser)*/

    document.getElementById("username").innerHTML = localStorage.name
    document.getElementById("logout").addEventListener("click", logOut)
    document.getElementById("allusers").addEventListener("click", getAllUsers);
    document.getElementById("allparcels").addEventListener("click", getAllParcels);
    checkIfLoggedIn();
})
function checkIfLoggedIn(){
    console.log(localStorage.role)
    if (localStorage.loggedin === "true") {
        console.log("you are logged in, no problems")
    } else {
        window.location.href = 'login.html'
    }
}


function jsonToTable(data) {
    var col = [];
    for (var i = 0; i < data.length; i++) {
        for (var key in data[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    var tr = table.insertRow(-1); // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th"); // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < data.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = data[i][col[j]];
        }
    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("displayTable");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}


function getAllUsers() {

    let getalldataurl = "https://sendit123.herokuapp.com/api/v2/users";

    fetch(getalldataurl, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            }
        })

        .then(res => res.json())
        .then(response => {
            if (response.status === "success") {
                console.log(response.message)
                let users = response.message;
                jsonToTable(users);

            } else {
                console.log("error getting all users")
            }

        })

        .catch(error => console.log(error));
}

function getAllParcels() {
    let getallparcelsurl = "https://sendit123.herokuapp.com/api/v2/parcels"

    fetch(getallparcelsurl, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            }
        })
        .then(res => res.json())
        .then(response => {
            console.log(response)
            if (response.status === "success") {
                let allparcels = response.message;
                jsonToTable(allparcels);
            } else {
                console.log("error getting all parcels");
            }
        })
}


function getSpecificParcels(status) {

    let statusdata = {
        status: status
    }

    let getspecificparclesurl = "https://sendit123.herokuapp.com/api/v2/parcels/status";
    fetch(getspecificparclesurl, {
            method: "POST",
            body: JSON.stringify(statusdata),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            }
        })
        .then(res => res.json())
        .then(response => {
            console.log(response)
            if (response.status === 'success') {
                let specificparcels = response.message;
                jsonToTable(specificparcels);
            } else {

                document.getElementById("Table").innerHTML = "HAAHAHAHHAHAHAHAHAHA NO ORDERS FOUND!!!!!!!!!!!"
            }
        })

}

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
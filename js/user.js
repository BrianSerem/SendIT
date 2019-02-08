
document.addEventListener("DOMContentLoaded", function() {
    /*document.getElementById("yourdashboard").addEventListener("click", referUser)*/
    document.getElementById("logout").addEventListener("click",logOut) 
    document.getElementById("username").innerHTML = localStorage.name
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

let not_found_user_data = [{
  "id":"notfound",
  "name":"notfound",
  "origin":"notfound",
  "destination":"notfound",
  "weight":"notfound",
  "price":"notfound",
  "userid":localStorage.userid,

}]
document.getElementById("username").innerHTML = localStorage.name;

function jsonToTable(data){
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

 function getDeliveredParcels(e){
  e.preventDefault();
  getSpecificParcels("delivered")
 }

document.getElementById("alluserparcels").addEventListener("click", getAllUserParcels);



function getAllUserParcels() {
    let getuserparcelsurl = `https://sendit123.herokuapp.com/api/v2/users/${localStorage.user_id}/parcels`;
    fetch(getuserparcelsurl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.token
        }
    })

    .then(res => res.json())
    .then(response => {
            console.log(response)
            if (response.status === 'success') {
                console.log(response)
                allusersparcels = response.message
                jsonToTable(allusersparcels)
            } else {
                jsonToTable(not_found_user_data)
            }
        })
        .catch(error => console.log(error))


}

function logOut(e){
  e.preventDefault();

  let logouturl = "https://sendit123.herokuapp.com/api/v2/auth/logout";
  fetch(logouturl,{
    method : "POST",
    headers : {
      'Content-Type':'application/json',
      'Authorization': 'Bearer ' + localStorage.token
    }

    
  })
  .then(res => res.json())
  .then(response =>{if (response.status = "success") {
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














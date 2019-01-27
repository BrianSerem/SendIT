 document.getElementById("createparcel").addEventListener("click",createParcel);
 document.getElementById("allparcels").addEventListener("click",getalluseparcelsurl);

    function createParcel(e){
        e.preventDefault();

      let description = document.getElementById("description").value;
      let weight = document.getElementById("weight").value;
      let origin = document.getElementById("origin").value;
      let destination = document.getElementById("destination").value;
      let createparcel_url = "https://sendit123.herokuapp.com/api/v2/parcels";
      let parcel_data = {
            name : description,
            weight : weight,
            origin : origin,
            destination : destination
        }
    fetch(createparcel_url, {
            method: 'POST',
            body: JSON.stringify(parcel_data),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +localStorage.token
            }
        })
        .then(res => res.json())
        .then(response => 
        {
            if(response.status == "success")
            {
                window.location.href='userdashboard.html';
                document.getElementById("response").innerHTML = "Sending your parcel..."
                alert("Your parcel has been created!!")
                
            
            } 
            else
            {
                document.getElementById("response").innerHTML = (response.message)
            }
        })
        .catch(error => console.log(error));
}

function getAllUserParcels(){

    let getalluseparcelsurl = `https://sendit123.herokuapp.com/api/v2/users/${localStorage.user_id}/parcels`

    fetch(getalluseparcelsurl,{
        method:"GET",
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer '+localStorage.token
        }

    })
    .then(res => res.json())
    .then(response => {console.log(response)})
    .catch(error => console.log(error));
}
/*function getUserParcels() {
          console.log(localStorage.name);
          console.log(localStorage.loggedin);

               var myBooks = [
                   {
                       "Book ID": "1",
                       "Book Name": "Computer Architecture",
                       "Category": "Computers",
                       "Price": "125.60",
                       "Name" : "brian"
                   },
                   {
                       "Book ID": "2",
                       "Book Name": "Asp.Net 4 Blue Book",
                       "Category": "Programming",
                       "Price": "56.00",
                       "Name" : "Emmanuel"
                   },
                   {
                       "Book ID": "3",
                       "Book Name": "Popular Science",
                       "Category": "Science",
                       "Price": "210.40",
                       "Name": "Alvin"
                   }
               ]
         
               // EXTRACT VALUE FOR HTML HEADER. 
               // ('Book ID', 'Book Name', 'Category' and 'Price')
               var col = [];
               for (var i = 0; i < myBooks.length; i++) {
                   for (var key in myBooks[i]) {
                       if (col.indexOf(key) === -1) {
                           col.push(key);
                       }
                   }
               }
         
               // CREATE DYNAMIC TABLE.
               var table = document.createElement("table");
         
               // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
         
               var tr = table.insertRow(-1);                   // TABLE ROW.
         
               for (var i = 0; i < col.length; i++) {
                   var th = document.createElement("th");      // TABLE HEADER.
                   th.innerHTML = col[i];
                   tr.appendChild(th);
               }
         
               // ADD JSON DATA TO THE TABLE AS ROWS.
               for (var i = 0; i < myBooks.length; i++) {
         
                   tr = table.insertRow(-1);
         
                   for (var j = 0; j < col.length; j++) {
                       var tabCell = tr.insertCell(-1);
                       tabCell.innerHTML = myBooks[i][col[j]];
                   }
               }
         
               // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
               var divContainer = document.getElementById("displayTable");
               divContainer.innerHTML = "";
               divContainer.appendChild(table);
           }*/
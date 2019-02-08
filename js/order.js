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

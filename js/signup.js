document.getElementById("signup").addEventListener("click",signUp);
    function signUp(e) {
        e.preventDefault();
        // getting the form values
        let email = document.getElementById("email").value;
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let password1 = document.getElementById("password1").value;
        let signup_url = "https://sendit123.herokuapp.com/api/v2/auth/signup";
        // Checking if the password and confirmation password is same
        if(password != password1){
            alert("password does not match")
        }
        let signup_data = {
            email : email,
            username : username,
            password : password
    
        }
        // sending data to our end point
        fetch(signup_url, {
            method: 'POST',
            body: JSON.stringify(signup_data),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response=> {
            if(response.status === "success"){
                console.log(response);
                document.getElementById("response").innerHTML="Welcome to SendiT";
                window.localStorage.setItem('name' , username);
                window.localStorage.setItem('token' , response.access_token);
                window.localStorage.setItem('user_id', response.user_id);
                window.localStorage.setItem('loggedin',true);
                window.location.href='userdashboard.html';
            } else {
                document.getElementById("response").innerHTML=response.message;
            }
        })
        .catch(error => console.log(error));
}
document.getElementById("login").addEventListener("click", logIn)

    
    function logIn(e) {
        e.preventDefault();
        // getting the form values
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let login_url = "https://sendit123.herokuapp.com/api/v2/auth/login";
        let login_data = {
            username : username,
            password : password
        }
        // sending data to our end point
        fetch(login_url, {
            method: 'POST',
            body: JSON.stringify(login_data),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => 
        {
            if(response.status == "success")
            {
                console.log(response)
                window.localStorage.setItem('token' , response.access_token)
                window.localStorage.setItem('name' , username)
                window.localStorage.setItem('loggedin', true)
                window.localStorage.setItem('user_id', response.user_id)
                window.localStorage.setItem('role',response.role)
                window.localStorage.setItem('email',response.email)
                document.getElementById("response").innerHTML = "Logging you in..."
                console.log(response)
                if(response.role==="customer"){
                window.location.href='userdashboard.html'}
                else{
                    window.location.href ='admindashboard.html'
                }
                
            
            } 
            else
            {
                document.getElementById("response").innerHTML = (response.message)
            }
        })
        .catch(error => console.log(error));
}
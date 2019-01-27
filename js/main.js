
window.onload=function(){
    /*document.getElementById("yourdashboard").addEventListener("click", referUser)*/
    document.getElementById("logout").addEventListener("click",logOut) 
     document.getElementById("username").innerHTML = localStorage.name


}


function logOut(e){
	e.preventDefault();

	let logouturl = "http://127.0.0.1:5000/api/v2/auth/logout";
	fetch(logouturl,{
		method : "POST",
		headers : {
			'Content-Type':'application/json',
			'Authorization': 'Bearer ' + localStorage.token
		}

	})
	.then(res => res.json())
	.then(response =>{
		if (response.status = "success") {
			window.localStorage.setItem('loggedin', false)
			window.location.href = 'index.html';
			console.log(localStorage.loggedin)
			alert(response.message)

		} else {
			alert(response.message);
			console.log(localStorage.loggedin)
		}
	})
	.catch(error => console.log(error));
}

function displayNavLinks(){
	if(localStorage.loggedin = true){
		document.getElementById("nav_login","nav_signup","nav_admindashboard").innerHTML="";
	}
}


 
document.addEventListener("DOMContentLoaded", function() {

	changeNavLinks(); 
	changeUsername();
  
});
function changeUsername(){
	document.getElementById("username1").innerHTML=localStorage.name;
}


function removeElement(elementId) {
    // Removes an element from the document
    let element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}
function addElement(parentId, elementTag, elementId, elementClass, html) {
    // Adds an element to the document
    var p = document.getElementById(parentId);
    var newElement = document.createElement(elementTag);
    newElement.setAttribute('id', elementId);
    newElement.setAttribute('class',elementClass);
    newElement.innerHTML = html;
    p.appendChild(newElement);
}

function changeNavLinks(){
	if(localStorage.loggedin=='true')
	{
		let png_html = '<a id="nav_profile" href="userdashboard.html"><img src="images/user.png"></a>'
		let username_html = '<a id="username" href="userdashboard.html" accesskey="4" title=""></a>'
		let logout_html = '<a id="logout" href="#" accesskey="4" title="">LOG OUT</a>'

		removeElement("nav_login");
		removeElement("nav_signup");
		addElement("unorderedlist","li","","",logout_html);
		addElement("unorderedlist","li","","current_page_item",username_html);
		addElement("unorderedlist","li","username","", png_html);

	}
}
    document.getElementById("yourdashboard").addEventListener("click",referUser);
    document.getElementById("yourdashboard1").addEventListener("click",referUser1);

    function referUser(){
    if (localStorage.loggedin=='true'){
        window.location.href = 'createparcel.html';
        console.log(localStorage.loggedin);
    }
    else{
        window.location.href = 'login.html';
        console.log(localStorage.loggedin);

    }
}
function referUser1(){
    if (localStorage.loggedin=='true'){
        window.location.href = "userdashboard.html";
    }
    else{
        window.location.href = "login.html";

    }
}

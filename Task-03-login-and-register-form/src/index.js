import "./styles/sass/main.scss"

const loginRegForm = document.getElementById('loginRegForm');
var isLoginForm = true; /* by default the login form is shown */

document.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.id === 'loginbtn') {
        loginUser();
    } else if (e.target.id === 'registerbtn') {
        registerUser();
    } else if (e.target.id === 'registerLink') {
        isLoginForm = false;
        toggleHideShow();
    } else if (e.target.id === 'loginLink') {
        isLoginForm = true;
        toggleHideShow();
    }
});

function toggleHideShow() {
    if (isLoginForm) {
        loginRegForm.email.style.display = 'none';
        loginRegForm.registerbtn.style.display = 'none';
        document.getElementById('loginContainer').style.display = 'none';

        loginRegForm.loginbtn.style.display = 'inline-block';
        document.getElementById('registerContainer').style.display = 'inline-block';
    } else {
        loginRegForm.email.style.display = 'inline-block';
        loginRegForm.registerbtn.style.display = 'inline-block';
        document.getElementById('loginContainer').style.display = 'inline-block';

        loginRegForm.loginbtn.style.display = 'none';
        document.getElementById('registerContainer').style.display = 'none';
    }
}
toggleHideShow();

function searchForUser(name, pass) {
    var storedUsers = localStorage.users;
    var isFound;

    if (storedUsers != undefined) {
        isFound = JSON.parse(storedUsers).find(
        k => (k.username === name && k.password === pass) );
    }

    return isFound;
}

function searchByEmailOrUsername(email, username) {
    var storedUsers = localStorage.users;
    var isFound;
    
    if (storedUsers != undefined) {
        isFound = JSON.parse(storedUsers).find(
        k => (k.email === email) ||
             (k.username === username) );
    }

    return isFound;
}

function signOut() {
    localStorage.removeItem('currentLoggedIn');
    displayLoggedInUser();
}

function autoLogOut() {
    const loggedInUserStr = localStorage.getItem('currentLoggedIn');

    if (loggedInUserStr != null) {
        const loggedInUser = JSON.parse(loggedInUserStr);
        const now = new Date();

        // Compare the expiry time of the item with the current time
        if (now.getTime() > loggedInUser.expiry) {
            // If the item is expired, delete the item from storage
            signOut();
        }
    }
}
autoLogOut();

function displayLoggedInUser() {
    if ( localStorage.getItem('currentLoggedIn') != null ) {
        document.getElementById('currentlyLoggedInUser').innerHTML = 
            'Logged in as:<br>' + JSON.parse(localStorage.getItem('currentLoggedIn')).email
            + '<br><a href="#" id="signOut">Sign out</a>';
        document.getElementById('signOut').addEventListener("click", signOut);
    } else {
        document.getElementById('currentlyLoggedInUser').innerHTML = '';
    }
}
displayLoggedInUser();

/**
 * Validate email using regular expression
 * https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
 */
const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};

function loginUser() {
    //document.getElementById('email').removeAttribute("required");
    var isUserFound = searchForUser(loginRegForm.username.value, loginRegForm.userpsw.value);
    const ttl = 10 * 1000; //Time To Live = 10 seconds
    //const ttl = 1 * 60 * 1000; //Time To Live = 1 minute

    if (isUserFound != undefined) {
        isUserFound.expiry = (new Date()).getTime()+ttl;
        localStorage.setItem('currentLoggedIn', JSON.stringify(isUserFound));
        alert('You are logged in.');
        displayLoggedInUser();
        loginRegForm.reset();
    } else {
        alert('Please enter valid email/username and password.');
    }    
}

function registerUser() {
    const lowerCaseLetters = /[a-z]/g;
    const upperCaseLetters = /[A-Z]/g;
    const numbers = /[0-9]/g;
    const specialChars = /[!@#\$%\^\&*\)\(+=._-]/g;

    var newUserObj = {
        'email': loginRegForm.email.value,
        'username': loginRegForm.username.value,
        'password': loginRegForm.userpsw.value
    }

    var arrUsers = !!localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    arrUsers.push(newUserObj);

    if ( searchByEmailOrUsername(loginRegForm.email.value, loginRegForm.username.value) != undefined ) {
        alert('User with this email or username already exists.');
    } else if (!validateEmail(loginRegForm.email.value)) {
        alert('Please enter a valid email address.');
    } else if(loginRegForm.userpsw.value.length < 8) {
        alert('The password must be at least 8 characters long.');
    } else if(!loginRegForm.userpsw.value.match(lowerCaseLetters)) {
        alert('The password must contain a lowercase.');
    } else if(!loginRegForm.userpsw.value.match(upperCaseLetters)) {
        alert('The password must contain an uppercase.');
    } else if(!loginRegForm.userpsw.value.match(numbers) && !loginRegForm.userpsw.value.match(specialChars)) {
        alert('The password must contain a number or special character.');
    } else {
        localStorage.setItem('users', JSON.stringify(arrUsers));
        alert('Your account has been created');
        loginRegForm.reset();
    }
}
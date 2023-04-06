import "./styles/sass/main.scss"

let loginRegForm = document.getElementById('loginRegForm');
let userPage = document.getElementById('userPage');
let isLoginForm = true; //By default the login form is shown
let isRegisterForm = false; //By default the registration form is hidden

document.addEventListener('click', function(e) {
    const deleteBtnIdRegex = /deleteBtn[0-9]+/g;

    e.preventDefault();
    if (e.target.id === 'loginBtn') {
        loginUser();
    } else if (e.target.id === 'registerBtn') {
        registerUser();
    } else if (e.target.id === 'registerLink') {
        isLoginForm = false;
        isRegisterForm = true;
        toggleLoginRegister();
    } else if (e.target.id === 'loginLink') {
        isLoginForm = true;
        isRegisterForm = false;
        toggleLoginRegister();
    } else if (e.target.id === 'signOutLink' ) {
        signOut();
    } else if (e.target.id.match(deleteBtnIdRegex) ) {
        let arrUsers = localStorage.users != undefined ? JSON.parse(localStorage.users) : [];
        let index = e.target.parentNode.id;

        let deletedUser = arrUsers[index];
        arrUsers.splice(index, 1);

        if ( ( deletedUser.email === JSON.parse(localStorage.getItem('currentLoggedIn')).email ) &&
             ( deletedUser.username === JSON.parse(localStorage.getItem('currentLoggedIn')).username ) ) {
            alert('You deleted the currently logged in user.');
            signOut();
        }

        e.target.parentNode.remove();
        if (arrUsers.length == 0) {
            localStorage.removeItem('users');
        } else {
            localStorage.setItem('users', JSON.stringify(arrUsers));
        }
        showUserList();
    }
});

function showUserList() {
    const storedUsers = localStorage.users != undefined ? JSON.parse(localStorage.users) : [];
    userPage.innerHTML = ''; //Delete user list
    for (let i = 0; i < storedUsers.length; i++) {
        userPage.innerHTML += `<div class="container user" id="${i}">` +
            `<b>Email:</b> ${JSON.parse(JSON.stringify(storedUsers[i].email))}<br>` +
            `<b>Username:</b> ${JSON.parse(JSON.stringify(storedUsers[i].username))}<br>` +
            `<b>Password:</b> ${JSON.parse(JSON.stringify(storedUsers[i].password))}<br>` +
            `<button type="submit" name="editbtn" class="editBtn">Edit</button>` +
            `<button type="submit" name="deletebtn" id="deleteBtn${i}">Delete</button>` +
            `</div>`;
    }
}

function toggleLoginRegister() {
    if (isLoginForm && localStorage.getItem('currentLoggedIn') == null) {
        loginRegForm.email.style.display = 'none';
        loginRegForm.registerBtn.style.display = 'none';
        document.getElementById('loginContainer').style.display = 'none';

        loginRegForm.loginBtn.style.display = 'inline-block';
        document.getElementById('registerContainer').style.display = 'inline-block';

        userPage.style.display = 'none';
    } else if (isRegisterForm) {
        loginRegForm.email.style.display = 'inline-block';
        loginRegForm.registerBtn.style.display = 'inline-block';
        document.getElementById('loginContainer').style.display = 'inline-block';

        loginRegForm.loginBtn.style.display = 'none';
        document.getElementById('registerContainer').style.display = 'none';

        userPage.style.display = 'none';
    } else { //The user page to be shown
        loginRegForm.style.display = 'none';

        userPage.style.display = 'inherit';

        showUserList();
    }
}
toggleLoginRegister();

function searchForUser(name, pass) {
    const storedUsers = localStorage.users;
    let isFound;

    if (storedUsers != undefined) {
        isFound = JSON.parse(storedUsers).find(
        k => ( k.username === name && k.password === pass ) );
    }

    return isFound;
}

function searchByEmailOrUsername(email, username) {
    const storedUsers = localStorage.users;
    let isFound;
    
    if (storedUsers != undefined) {
        isFound = JSON.parse(storedUsers).find(
        k => ( k.email === email|| k.username === username ) );
    }

    return isFound;
}

function signOut() {
    localStorage.removeItem('currentLoggedIn');
    displayLoggedInUser();

    isLoginForm = true;
    isRegisterForm = false;
    loginRegForm.style.display = 'inline-block';
    toggleLoginRegister();
}

function autoLogOut() {
    const loggedInUserStr = localStorage.getItem('currentLoggedIn');

    if (loggedInUserStr != null) {
        const loggedInUser = JSON.parse(loggedInUserStr);
        const now = new Date();

        //Compare the expiry time of the item with the current time
        if (now.getTime() > loggedInUser.expiry) {
            //If the item is expired, delete the item from storage
            alert('Your session expired. Please login again.');
            signOut();
        }
    }
}
autoLogOut();

function displayLoggedInUser() {
    if ( localStorage.getItem('currentLoggedIn') != null ) {
        document.getElementById('currentlyLoggedInUser').innerHTML = 
            `Logged in as:<br>${JSON.parse(localStorage.getItem('currentLoggedIn')).username}<br><a href="#" id="signOutLink">Sign out</a>`;
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
    let isUserFound = searchForUser(loginRegForm.username.value, loginRegForm.userpsw.value);
    const ttl = 10 * 1000; //Time To Live = 10 seconds
    //const ttl = 1 * 60 * 1000; //Time To Live = 1 minute

    if (isUserFound != undefined) {
        isUserFound.expiry = (new Date()).getTime()+ttl;
        localStorage.setItem('currentLoggedIn', JSON.stringify(isUserFound));
        alert('You are logged in.');
        displayLoggedInUser();
        
        isLoginForm = false;
        isRegisterForm = false;
        toggleLoginRegister();

        loginRegForm.reset();
    } else {
        alert('Please enter valid email/username and password.');
    }    
}

function registerUser() {
    const lowerCaseRegex = /[a-z]/g;
    const upperCaseRegex = /[A-Z]/g;
    const numbersRegex = /[0-9]/g;
    const specialCharsRegex = /[!@#\$%\^\&*\)\(+=._-]/g;

    let newUserObj = {
        'email': loginRegForm.email.value,
        'username': loginRegForm.username.value,
        'password': loginRegForm.userpsw.value
    }

    let arrUsers = !!localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    arrUsers.push(newUserObj);

    if ( searchByEmailOrUsername(loginRegForm.email.value, loginRegForm.username.value) != undefined ) {
        alert('User with this email or username already exists.');
    } else if (!validateEmail(loginRegForm.email.value)) {
        alert('Please enter a valid email address.');
    } else if(loginRegForm.username.value.length == 0) {
        alert('The username cannot be empty.');
    } else if(loginRegForm.userpsw.value.length < 8) {
        alert('The password must be at least 8 characters long.');
    } else if(!loginRegForm.userpsw.value.match(lowerCaseRegex)) {
        alert('The password must contain a lowercase.');
    } else if(!loginRegForm.userpsw.value.match(upperCaseRegex)) {
        alert('The password must contain an uppercase.');
    } else if(!loginRegForm.userpsw.value.match(numbersRegex) && !loginRegForm.userpsw.value.match(specialCharsRegex)) {
        alert('The password must contain a number or special character.');
    } else {
        localStorage.setItem('users', JSON.stringify(arrUsers));
        alert('Your account has been created');
        loginRegForm.reset();
    }
}
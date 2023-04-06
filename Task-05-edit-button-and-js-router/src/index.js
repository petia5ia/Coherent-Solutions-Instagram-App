import "./styles/sass/main.scss"
import {registerUser} from './registration.js';

let loginRegForm = document.getElementById('loginRegForm');
let userPage = document.getElementById('userPage');
let isLoginForm = true; //By default the login form is shown
let isRegisterForm = false; //By default the registration form is hidden

const routes = {
    '#displayLoginForm': displayLoginForm,
    '#displayRegisterForm': displayRegisterForm,
    '#': home,
    '#editUser': editUser,
    '#saveUserInfo': saveUserInfo,
    '#loginUser': loginUser,
    '#registerUser': registerUser,
    '#signOut': signOut,
}

function router() {
    let url = window.location.hash || '#';
    routes[url]();
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);

document.addEventListener('click', function(e) {
    const deleteBtnIdRegex = /deleteBtn[0-9]+/g;
    
    if (e.target.id.match(deleteBtnIdRegex) ) {
        e.preventDefault();
        let arrUsers = localStorage.users != undefined ? JSON.parse(localStorage.users) : [];
        let index = e.target.parentNode.parentNode.id;

        let deletedUser = arrUsers[index];
        arrUsers.splice(index, 1);

        if ( ( deletedUser.email === JSON.parse(localStorage.getItem('currLoggedInUser')).email ) &&
             ( deletedUser.username === JSON.parse(localStorage.getItem('currLoggedInUser')).username ) ) {
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

function toggleLoginRegister() {
    if (isLoginForm && localStorage.getItem('currLoggedInUser') == null) {
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

function displayLoginForm() {
    isLoginForm = true;
    isRegisterForm = false;
    toggleLoginRegister();
}

function displayRegisterForm() {
    isLoginForm = false;
    isRegisterForm = true;
    toggleLoginRegister();
}

function home() {
    let div = document.createElement('div');
    div.className = 'container';
    
    userPage.innerHTML = '';
    loginRegForm.innerHTML = '';

    div.innerHTML += 
        `<input type="email" placeholder="Enter Email" name="email" required>
        <input type="text" placeholder="Enter Username" name="username" required>
        <input type="password" placeholder="Enter Password" name="userpsw" required>

        <button type="submit" name="loginBtn">
            <a href="#loginUser" id="loginBtn">Login</a>
        </button>
        <div class="container" id="registerContainer">
            <p>You don't have an account? <a href="#displayRegisterForm" id="registerLink">Register</a></p>
        </div>

        <button type="submit" name="registerBtn">
            <a href="#registerUser" id="registerBtn">Register</a>
        </button>
        <div class="container" id="loginContainer">
            <p>Already have an account? <a href="#displayLoginForm" id="loginLink">Sign in</a></p>
        </div>`;

    loginRegForm.appendChild(div);
    toggleLoginRegister();
}

function showUserList() {
    let div = document.createElement('div');
    let link = document.createElement('a');
    link.href = '#editUser';
    link.innerText = 'Edit';
    link.id = 'editLink';

    userPage.innerHTML = '';

    if (localStorage.getItem('currLoggedInUser') !== null) {
        const storedUsers = localStorage.users != undefined ? JSON.parse(localStorage.users) : [];
        div.innerHTML = ''; //Delete user list
        for (let i = 0; i < storedUsers.length; i++) {
            div.innerHTML +=
                `<form action="" id="${i}">
                    <div class="container">
                        <div class="userInfo">
                            <b>Email:</b> ${JSON.parse(JSON.stringify(storedUsers[i].email))}<br>
                            <b>Username:</b> ${JSON.parse(JSON.stringify(storedUsers[i].username))}<br>
                            <b>Password:</b> ${JSON.parse(JSON.stringify(storedUsers[i].password))}<br>
                        </div>

                        <button type="submit" name="deletebtn" id="deleteBtn${i}">Delete</button>
                    </div>
                </form>`

            userPage.appendChild(div);

            if (storedUsers[i].birthday !== undefined) {
                document.getElementById(`${i}`).getElementsByClassName('userInfo')[0].innerHTML += `<b>Birthday:</b> ${JSON.parse(JSON.stringify(storedUsers[i].birthday))}<br>`;
            }

            if (storedUsers[i].gender !== undefined) {
                document.getElementById(`${i}`).getElementsByClassName('userInfo')[0].innerHTML += `<b>Gender:</b> ${JSON.parse(JSON.stringify(storedUsers[i].gender))}<br>`;
            }

            if (storedUsers[i].email === JSON.parse(localStorage.getItem('currLoggedInUser')).email ) {
                //The currently logged in user is able to edit ONLY his own profile information
                document.getElementById(`${i}`).getElementsByClassName('container')[0].innerHTML += 
                        `<button type="submit" name="editbtn" id="editBtn"></button>`;
                document.getElementById('editBtn').appendChild(link);
            }  
        }
    }
}

function editUser() {
    let div = document.createElement('div');

    let index = (document.getElementById('editBtn')).parentNode.parentNode.id;

    userPage.innerHTML = '';

    const storedUsers = localStorage.users != undefined ? JSON.parse(localStorage.users) : [];
        
    div.innerHTML =
        `<form action="" id="${index}">
            <div class="container">
                <label for="email">Email:</label>
                <input type="text" name="email" value="${JSON.parse(JSON.stringify(storedUsers[index].email))}">

                <label for="username">Username:</label>
                <input type="text" name="username" value="${JSON.parse(JSON.stringify(storedUsers[index].username))}">

                <label for="userpsw">Password:</label>
                <input type="text" name="userpsw" value="${JSON.parse(JSON.stringify(storedUsers[index].password))}">

                <form>
                    <div>Gender:</div>
                    <div>
                        <input type="radio" name="gender" id="female" value="F">
                        <label for="female">Female</label>
                    </div>
                    <div>
                        <input type="radio" name="gender" id="male" value="M">
                        <label for="male">Male</label>
                    </div>
                </form>

                <div>
                    <div>How Did You Hear About Us?</div>
                    <select name="survey" id="survey">
                        <option value="search engine">Search engine</option>
                        <option value="friend">By friend or colleague</option>
                        <option value="social media">Social media</option>
                        <option value="blog">Blog or publication</option>
                        <option value="other" selected>Other</option>
                    </select>
                </div>

                <label for="birthdate">Birthdate:</label>
                <input type="date" id="birthdate" name="birthdate" value="2022-01-01" min="1990-01-01" max="2022-01-01">
            
                <button type="submit" name="savebtn" id="saveBtn">
                    <a href="#saveUserInfo" id="saveLink">Save</a>
                </button>

                <button type="submit" name="cancelbtn" id="cancelBtn">
                    <a href="#" id="cancelLink">Cancel</a>
                </button>
            
            </div>
        </form>`;

    userPage.appendChild(div);
}

function getGenderRadioValue() {
    let ele = document.getElementsByName('gender');
              
    for(let i = 0; i < ele.length; i++) {
        if(ele[i].checked) {
            return ele[i].value;
        }
    }
}

function saveUserInfo() {
        let arrUsers = localStorage.users != undefined ? JSON.parse(localStorage.users) : [];
        let index = (document.getElementById('saveBtn')).parentNode.parentNode.id;

        let loginRegForm2 = document.getElementById(`${index}`);

        let serveySelectEl = document.getElementById('survey');
        let serveyValue = serveySelectEl.options[serveySelectEl.selectedIndex].value;

        let newUserObj = arrUsers[index];
        newUserObj = {
            'birthday': document.getElementById('birthdate').value,
            'email': loginRegForm2.email.value,
            'gender': getGenderRadioValue(),
            'howDiscovered': `${serveyValue}`,
            'password': loginRegForm2.userpsw.value,
            'username': loginRegForm2.username.value,
        }

        arrUsers[index] = newUserObj;
        localStorage.setItem('users', JSON.stringify(arrUsers));

        let currLoggedInUser = JSON.parse(localStorage.getItem('currLoggedInUser'));
        currLoggedInUser.email = loginRegForm2.email.value;
        currLoggedInUser.username = loginRegForm2.username.value;
        currLoggedInUser.password = loginRegForm2.userpsw.value;
        localStorage.setItem('currLoggedInUser', JSON.stringify(currLoggedInUser));

        showUserList();
        displayLoggedInUser();
        window.history.pushState(null, null, "#");
}

function searchForUser(name, pass) {
    const storedUsers = localStorage.users;
    let isFound;

    if (storedUsers != undefined) {
        isFound = JSON.parse(storedUsers).find(
        k => ( k.username === name && k.password === pass ) );
    }

    return isFound;
}

function loginUser() {
    let isUserFound = searchForUser(loginRegForm.username.value, loginRegForm.userpsw.value);
    //const ttl = 10 * 1000; //Time To Live = 10 seconds
    const ttl = 1 * 60 * 1000; //Time To Live = 1 minute

    if (isUserFound != undefined) {
        isUserFound.expiry = (new Date()).getTime()+ttl;
        localStorage.setItem('currLoggedInUser', JSON.stringify(isUserFound));
        alert('You are logged in.');
        displayLoggedInUser();
        
        isLoginForm = false;
        isRegisterForm = false;
        toggleLoginRegister();

        loginRegForm.reset();
    } else {
        alert('Please enter valid email/username and password.');
    }
    
    window.history.pushState(null, null, "#");
}

function signOut() {
    localStorage.removeItem('currLoggedInUser');
    displayLoggedInUser();

    isLoginForm = true;
    isRegisterForm = false;
    loginRegForm.style.display = 'inline-block';
    toggleLoginRegister();

    window.history.pushState(null, null, "#");
}

function autoLogOut() {
    const loggedInUserStr = localStorage.getItem('currLoggedInUser');

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
    if ( localStorage.getItem('currLoggedInUser') != null ) {
        document.getElementById('currentlyLoggedInUser').innerHTML = 
            `Logged in as:<br>${JSON.parse(localStorage.getItem('currLoggedInUser')).username}<br><a href="#signOut" id="signOutLink">Sign out</a>`;
    } else {
        document.getElementById('currentlyLoggedInUser').innerHTML = '';
    }
}
displayLoggedInUser();
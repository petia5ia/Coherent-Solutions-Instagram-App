import DataService from './services/DataService.js';
import { router } from './index.js';
import { searchByEmailOrUsername, validateEmailUsernamePass } from './validation.js';

function registerUser() {
    let loginRegForm = document.getElementById('loginRegForm');

    let newUserObj = {
        'email': loginRegForm.email.value,
        'username': loginRegForm.username.value,
        'password': loginRegForm.userpsw.value
    }

    let arrUsers = DataService.getAllUsers();
    arrUsers.push(newUserObj);

    if ( searchByEmailOrUsername(loginRegForm.email.value, loginRegForm.username.value) !== undefined ) {
        alert('User with this email or username already exists.');
    } else if ( validateEmailUsernamePass(loginRegForm.email.value, loginRegForm.username.value, loginRegForm.userpsw.value) ) {
        DataService.setUsers(JSON.stringify(arrUsers));
        alert('Your account has been created');
    }

    window.history.pushState(null, null, "#");
    router();
}

export { registerUser };
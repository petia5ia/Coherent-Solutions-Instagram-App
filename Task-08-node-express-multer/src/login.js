import DataService from './services/DataService.js';
import { router } from './index.js';

function loginUser() {
    let loginRegForm = document.getElementById('loginRegForm');
    let isUserFound = DataService.getUserByUserIdAndPass(loginRegForm.username.value, loginRegForm.userpsw.value);
    //const ttl = 10 * 1000; //Time To Live = 10 seconds
    const ttl = 60 * 60 * 1000; //Time To Live = 60 minutes

    if (isUserFound !== undefined) {
        isUserFound.expiry = (new Date()).getTime() + ttl;
        DataService.setCurrLoggedInUser(JSON.stringify(isUserFound));
        alert('You are logged in.');

        window.history.pushState(null, null, "#users");
        router();
    } else {
        alert('Please enter valid email/username and password.');

        window.history.pushState(null, null, "#login");
        router();
    }
}

export { loginUser };
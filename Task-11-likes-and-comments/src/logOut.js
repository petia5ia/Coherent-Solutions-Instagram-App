import DataService from './services/DataService.js';
import { router } from './index.js';

function logOut() {
    DataService.removeCurrLoggedInUserFromLocalStorage();
    window.history.pushState(null, null, "#login");
    router();
}

function autoLogOut() {
    const loggedInUser = DataService.getCurrLoggedInUserFromLocalStorage();

    if (loggedInUser !== null) {
        const now = new Date();

        //Compare the expiry time of the item with the current time
        if (now.getTime() > loggedInUser.expiry) {
            //If the item is expired, delete the item from storage
            alert('Your session expired. Please login again.');
            logOut();
        }
    }
}

export { autoLogOut, logOut };
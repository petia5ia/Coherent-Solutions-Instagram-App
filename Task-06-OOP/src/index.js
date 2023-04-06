import './styles/sass/main.scss'
import DataService from './services/DataService.js';
import { loginUser } from './login.js';
import { autoLogOut, logOut } from './logOut';
import { registerUser } from './registration.js';
import { saveUserInfo } from './saveUserInfo.js';
import { editUserView, loginView, registerView, usersListView } from './views.js'

let root = document.getElementById('feed');

const routes = {
    '#': usersListView,
    '#displayLoginForm': loginView,
    '#displayRegisterForm': registerView,
    '#editUser': editUserView,
    '#loginUser': loginUser,
    '#logOut': logOut,
    '#registerUser': registerUser,
    '#saveUserInfo': saveUserInfo,
};

function router() {
    let url = window.location.hash || '#';

    if(url === '#' || url === '#displayLoginForm' || url === '#displayRegisterForm' || url === '#editUser') {
        const layout = routes[url].render();
        root.innerHTML = layout;
    } else {
        routes[url]();
    }
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);

document.addEventListener('click', function(e) {
    const deleteBtnIdRegex = /deleteBtn[0-9]+/g;
    
    if (e.target.id.match(deleteBtnIdRegex) ) {
        e.preventDefault();
        let arrUsers = DataService.getAllUsers();
        let index = e.target.parentNode.parentNode.id;

        let deletedUser = arrUsers[index];
        arrUsers.splice(index, 1);

        if ( ( deletedUser.email === (DataService.getCurrLoggedInUser()).email ) &&
             ( deletedUser.username === (DataService.getCurrLoggedInUser()).username ) &&
             ( deletedUser.password === (DataService.getCurrLoggedInUser()).password ) ) {
            alert('You deleted the currently logged in user.');
            logOut();
        }

        e.target.parentNode.remove();
        if (arrUsers.length == 0) {
            DataService.removeAllUsers();
        } else {
            DataService.setUsers(JSON.stringify(arrUsers));
        }
        
        router();
    }
});

autoLogOut();

export { router };
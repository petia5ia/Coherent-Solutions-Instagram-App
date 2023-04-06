import './styles/sass/main.scss'
import DataService from './services/DataService.js';
import { loginUser } from './login.js';
import { autoLogOut, logOut } from './logOut';
import { registerUser } from './registration.js';
import { saveUserInfo } from './saveUserInfo.js';
import { editUserView, loginView, registerView, userProfileView, usersListView } from './views.js'

let root = document.getElementById('feed');

const routes = {
    '#displayLoginForm': loginView,
    '#displayRegisterForm': registerView,
    '#editUser': editUserView,
    '#users': usersListView,
    '#user': userProfileView,
};

function router() {
    let url = window.location.hash || '#';
    let routesArr = url.split('/');

    if( url === '#' ) {
        const routeName = DataService.getCurrLoggedInUser() === null ? "#displayLoginForm" : "#users";
        window.history.pushState(null, null, routeName);
        router();
    } else if ( routes[routesArr[0]] ) {
        const layout = routes[routesArr[0]].render(routesArr[1]);
        root.innerHTML = layout;
    }
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);

document.addEventListener('click', function(e) {
    const deleteBtnIdRegex = /deleteBtn[0-9]+/g;
    
    if ( e.target.id === 'loginBtn' ) {
        e.preventDefault();
        loginUser();
    } else if ( e.target.id === 'logOutLink' ) {
        e.preventDefault();
        logOut();
    } else if ( e.target.id === 'registerBtn' ) {
        e.preventDefault();
        registerUser();
    } else if ( e.target.id === 'saveBtn' ) {
        e.preventDefault();
        saveUserInfo();
    }  else if ( e.target.id.match(deleteBtnIdRegex) ) {
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
import './styles/sass/main.scss'
import DataService from './services/DataService.js';
import { loginUser } from './login.js';
import { autoLogOut, logOut } from './logOut.js';
import { registerUser } from './registration.js';
import { saveUserInfo } from './saveUserInfo.js';
import { uploadAvatar } from './uploadAvatar.js';
import { uploadPost } from './uploadPost.js'
import { editUserView, feedView, loginView, registerView, userProfileView, usersListView } from './views/views.js';

let root = document.getElementById('feed');

const routes = {
    '#editUser': editUserView,
    '#feed': feedView,
    '#login': loginView,
    '#register': registerView,
    '#users': usersListView,
    '#users/:id': userProfileView,
};

function router() {
    let url = window.location.hash || '#';
    let routesArr = url.split('/');

    if( url === '#' ) {
        const routeName = DataService.getCurrLoggedInUserFromLocalStorage() === null ? "#login" : "#users";
        window.history.pushState(null, null, routeName);
        router();
    } else if ( routes[url] ) {
        routes[url]
            .render()
            .then(result => root.innerHTML = result);
            //.catch(error => console.log(error));
    } else if ( routesArr[0] === '#users' && routesArr[1] !== undefined ) {
        routes['#users/:id']
            .render(routesArr[1])
            .then(result => root.innerHTML = result);
            //.catch(error => console.log(error));
    }
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);

document.addEventListener('click', async function(e) {
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
        let arrUsers = await DataService.getAllUsers();
        let index = e.target.parentNode.parentNode.id;
        let deletedUser = arrUsers.users[index];

        if ( ( deletedUser.email === (DataService.getCurrLoggedInUserFromLocalStorage()).email ) &&
             ( deletedUser.username === (DataService.getCurrLoggedInUserFromLocalStorage()).username ) &&
             ( deletedUser.password === (DataService.getCurrLoggedInUserFromLocalStorage()).password ) ) {
            alert('You deleted the currently logged in user.');
            logOut();
        }

        e.target.parentNode.remove();
        DataService.deleteUser(deletedUser);
        
        router();
    } else if ( e.target.id === 'uploadPostBtn' ) {
        e.preventDefault();
        uploadPost();
    }
});

document.addEventListener('submit', function(e) {
    if ( e.target.id === 'uploadPhotoForm' ) {
        e.preventDefault();
        uploadAvatar();
    }
});

autoLogOut();

export { router };
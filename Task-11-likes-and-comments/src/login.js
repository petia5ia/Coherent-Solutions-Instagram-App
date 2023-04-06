import DataService from './services/DataService.js';
import { router } from './index.js';

async function loginUser() {
    let loginForm = document.getElementById('loginForm');
    let isUserFound = await DataService.getUserByUsernameAndPass(loginForm.username.value, loginForm.userpsw.value);

    if (isUserFound.user[0] === undefined) {
        alert('Please enter valid email/username and password.');
    } else {
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    'password': loginForm.userpsw.value,
                    'username': loginForm.username.value
                }
            }),
        }).then( res => res.json() ).then( (res) => {
            let foundUser = res.user[0];

            //const ttl = 10 * 1000; //Time To Live = 10 seconds
            const ttl = 60 * 60 * 1000; //Time To Live = 60 minutes
            //For the currently logged in user save in the localStorage only some properties not all available
            let currLoggedInUser = {
                'avatar': foundUser.avatar,
                'email': foundUser.email,
                'username': foundUser.username,
                'password': foundUser.password,
                'expiry': (new Date()).getTime() + ttl
            }

            DataService.setCurrLoggedInUserInLocalStorage(JSON.stringify(currLoggedInUser));

            document.getElementById("userProfile").style.display = "inline-block";
            document.getElementById("usersLink").style.display = "inline-block";
            document.getElementById("feedLink").style.display = "inline-block";
            
            window.history.pushState(null, null, "#feed");
            router();
        }).catch( (err) => ("Error occured", err) );
    }
}

export { loginUser };
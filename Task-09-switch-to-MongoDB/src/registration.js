import DataService from './services/DataService.js';
import { validateEmailUsernamePass } from './validation.js';

async function registerUser() {
    let regForm = document.getElementById('regForm');
    let isExistingEmail = await DataService.getUserByEmail(regForm.email.value, regForm.username.value);
    let isExistingUsername = await DataService.getUserByUsername(regForm.email.value, regForm.username.value);

    if ( isExistingEmail.user[0] !== undefined || isExistingUsername.user[0] !== undefined ) {
        alert('User with this email or username already exists.');
    } else if ( validateEmailUsernamePass(regForm.email.value, regForm.username.value, regForm.userpsw.value) ) {
        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    'avatar': 'http://localhost:3000/uploads/default-avatar.jpg',
                    'email': regForm.email.value,
                    'password': regForm.userpsw.value,
                    'username': regForm.username.value
                }
            }),
        }).then( res => res.json() ).then( (res) => {
            regForm.reset();
        }).catch( (err) => ("Error occured", err) );
    }
}

export { registerUser };
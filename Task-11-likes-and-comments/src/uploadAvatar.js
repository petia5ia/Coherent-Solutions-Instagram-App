import DataService from './services/DataService.js';
import { router } from './index.js';

//Send the form to the server
async function uploadAvatar() {
    const arrUsers = await DataService.getAllUsers();
    const index = (document.getElementById('saveBtn')).parentNode.parentNode.parentNode.id;
    const userObj = arrUsers.users[index];
    const username = userObj.username;

    const profile_pic = document.getElementById("avatar");
    const formData = new FormData();
    formData.append('avatar', profile_pic.files[0]);
    formData.append('username', username);

    fetch('http://localhost:3000/upload-avatar', {
        method: 'POST',
        body: formData
    }).then( res => res.json() ).then( (res) => {
        //document.getElementById('uploadPhotoForm').reset(); 
        window.history.pushState(null, null, "#users");
        router();
    }).catch( (err) => ("Error occured", err) );
}

export { uploadAvatar };
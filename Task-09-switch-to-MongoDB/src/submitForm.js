import DataService from './services/DataService.js';
import { router } from './index.js';

//Send the form to the server
async function submitForm() {
    let arrUsers = await DataService.getAllUsers();
    const profile_pic = document.getElementById("avatar");
    const formData = new FormData();
    formData.append('avatar', profile_pic.files[0]);

    fetch('http://localhost:3000/upload-profile-pic', {
        method: 'POST',
        body: formData
    }).then( res => res.json() ).then( (res) => {
        //console.log(res);
        document.getElementById('uploadPhotoForm').reset(); 

        let index = (document.getElementById('saveBtn')).parentNode.parentNode.parentNode.id;
        let userObj = arrUsers.users[index];

        //Property "usernameOldValue" is added so it can be used as filter in findOneAndUpdate()
        userObj.usernameOldValue = userObj.username;

        userObj.avatar = `http://localhost:3000/uploads/${res.filename}`;

        DataService.updateUser(userObj);
        
        window.history.pushState(null, null, "#users");
        router();
    }).catch( (err) => ("Error occured", err) );
}

export { submitForm };
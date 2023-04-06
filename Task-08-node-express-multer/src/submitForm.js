import DataService from './services/DataService.js';
import { router } from './index.js';

//Send the form to the server
function submitForm(e) {
    e.preventDefault();
    const profile_pic = document.getElementById("profile_pic");
    const formData = new FormData();
    formData.append('profile_pic', profile_pic.files[0]);

    fetch('http://localhost:3000/upload-profile-pic', {
        method: 'POST',
        body: formData
    }).then( res => res.json() ).then( (res) => {
        //console.log(res);
        document.getElementById('uploadPhotoForm').reset(); 

        let arrUsers = DataService.getAllUsers();
        let index = (document.getElementById('saveBtn')).parentNode.parentNode.parentNode.id;
        let userObj = arrUsers[index];
        userObj.avatar = `http://localhost:3000/uploads/${res.filename}`;
        arrUsers[index] = userObj;
        DataService.setUsers(JSON.stringify(arrUsers));
        
        window.history.pushState(null, null, "#users");
        router();
    }).catch( (err) => ("Error occured", err) );
}

export { submitForm };
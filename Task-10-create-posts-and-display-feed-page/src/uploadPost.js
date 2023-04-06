import DataService from './services/DataService.js';
import { router } from './index.js';

//Send the form to the server
async function uploadPost() {
    const arrUsers = await DataService.getAllUsers();
    const index = (document.getElementById('saveBtn')).parentNode.parentNode.parentNode.id;
    const userObj = arrUsers.users[index];
    const username = userObj.username;

    const post = document.getElementById("post");
    const postDescription = document.getElementById("postDescription").value;
    const formData = new FormData();
    formData.append('author', username);
    formData.append('post', post.files[0]);
    formData.append('postDescription', postDescription);

    fetch('http://localhost:3000/upload-post', {
        method: 'POST',
        body: formData
    }).then( res => res.json() ).then( (res) => {
        //document.getElementById('uploadPostForm').reset();
        window.history.pushState(null, null, "#users");
        router();
    }).catch( (err) => ("Error occured", err) );
}

export { uploadPost };
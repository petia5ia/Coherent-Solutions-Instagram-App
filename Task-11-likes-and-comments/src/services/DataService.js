//The data for the currently logged in user is stored in localStorage.
//The rest of the data is in MongoDB

//Return the currently signed in user or null if there is none
function getCurrLoggedInUserFromLocalStorage() {
    return JSON.parse(localStorage.getItem('currLoggedInUser'));
}

function removeCurrLoggedInUserFromLocalStorage() {
    localStorage.removeItem('currLoggedInUser');
}

//Add the key 'currLoggedInUser' with the given key value to the localStorage or update that key's value if it already exists
function setCurrLoggedInUserInLocalStorage(keyValue) {
    localStorage.setItem('currLoggedInUser', keyValue);
}

/**
 * Collection comments
 */
async function addComment(commentObj) {
    await fetch("http://localhost:3000/add-comment", {
        method: 'POST',
        body: JSON.stringify({commentObj}),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => {
        if(response.ok) {
          return response.json();
        }
    })
    .then((data)=>{
        if(data){
            //console.log(data);
        }
    })
}

function getAllComments(postName) {
    return new Promise(resolve => {
        fetch('http://localhost:3000/get-all-comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    'postName': postName
                }
            }),
        })
        .then( res => res.json() )
        .then( data => resolve(data) )
    });
}

function getAllRepliesToAComment(parentCommentId) {
    return new Promise(resolve => {
        fetch('http://localhost:3000/get-all-replies-to-a-comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    'parentCommentId': parentCommentId
                }
            }),
        })
        .then( res => res.json() )
        .then( data => resolve(data) )
    });
}

/**
 * Collection files
 */
//Return array with all posts or empty array if there are no created publications
function getAllPosts() {
    return new Promise(resolve => {
        fetch('http://localhost:3000/get-all-posts', {
            method: 'GET',
        })
        .then( res => res.json() )
        .then( data => resolve(data) )
    });
}

function getPostByName(name) {
    return new Promise(resolve => {
        fetch('http://localhost:3000/get-post-by-name', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    'name': name
                }
            }),
        })
        .then( res => res.json() )
        .then( data => resolve(data) )
    });
}

function getUserPosts(username) {
    return new Promise(resolve => {
        fetch('http://localhost:3000/get-user-posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    'username': username
                }
            }),
        })
        .then( res => res.json() )
        .then( data => resolve(data) )
    });    
}

async function decreasePostLikes(data) {
    await fetch("http://localhost:3000/update-post-decrease-likes", {
        method: 'POST',
        body: JSON.stringify({
            post: {
                'postId': data.postId,
                'username': data.username
            }
        }),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => {
        if(response.ok) {
          return response.json();
        }
    })
    .then((data)=>{
        if(data){
            //console.log(data);
        }
    })
}

async function increasePostLikes(data) {
    await fetch("http://localhost:3000/update-post-increase-likes", {
        method: 'POST',
        body: JSON.stringify({
            post: {
                'postId': data.postId,
                'username': data.username
            }
        }),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => {
        if(response.ok) {
          return response.json();
        }
    })
    .then((data)=>{
        if(data){
            //console.log(data);
        }
    })
}

/**
 * Collection users
 */
async function deleteUser(user) {
    await fetch("http://localhost:3000/delete-user", {
        method: 'POST',
        body: JSON.stringify({user}),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => {
        if(response.ok) {
          return response.json();
        }
    })
    .then((data)=>{
        if(data){
            //console.log(data);
        }
    })
}

//Return array with all users or empty array if there are no registrations
function getAllUsers() {
    return new Promise(resolve => {
        fetch('http://localhost:3000/get-all-users', {
            method: 'GET',
        })
        .then( res => res.json() )
        .then( data => resolve(data) )
    });
}

/**
 * Search in the DB if user with the given email is already present
 * Return undefined if such user is not found
 */
 function getUserByEmail(email) {
    return new Promise(resolve => {
        fetch('http://localhost:3000/get-user-by-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    'email': email
                }
            }),
        })
        .then( res => res.json() )
        .then( data => resolve(data) )
    });
}

/**
 * Search for user in the DB by given username
 * Return undefined if such user is not found
 */
 function getUserByUsername(username) {
    return new Promise(resolve => {
        fetch('http://localhost:3000/get-user-by-username', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    'username': username
                }
            }),
        })
        .then( res => res.json() )
        .then( data => resolve(data) )
    });
}

/**
 * Search for user in the DB by given username and password
 * Return undefined if such user cannot be found
 */
function getUserByUsernameAndPass(username, password) {
    return new Promise(resolve => {
        fetch('http://localhost:3000/get-user-by-username-and-pass', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    'username': username,
                    'password': password
                }
            }),
        })
        .then( res => res.json() )
        .then( data => resolve(data) )
    });
}

async function updateUser(user) {
    //Ask the server to find the user obj in MongoDatabase and update it
    //The info should be a object,the key is either <avatar> or <info> and value is a obj with the new info
    await fetch("http://localhost:3000/update-user", {
        method: 'POST',
        body: JSON.stringify({user}),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => {
        if(response.ok) {
          return response.json();
        }
    })
    .then((data)=>{
        if(data){
            //console.log(data);
        }
    })
}

export default { 
    getCurrLoggedInUserFromLocalStorage, removeCurrLoggedInUserFromLocalStorage, setCurrLoggedInUserInLocalStorage,
    addComment, getAllComments, getAllRepliesToAComment,
    getAllPosts, getPostByName, getUserPosts, decreasePostLikes, increasePostLikes,
    deleteUser, getAllUsers, getUserByEmail, getUserByUsername, getUserByUsernameAndPass, updateUser
};
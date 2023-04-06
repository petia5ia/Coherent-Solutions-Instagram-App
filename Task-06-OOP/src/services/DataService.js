//Return array with all users or empty array if there are no registrations
function getAllUsers() {
    return (localStorage.users !== undefined) ? JSON.parse(localStorage.users) : [];
}

//Return the currently signed in user or null if there is none
function getCurrLoggedInUser() {
    return JSON.parse(localStorage.getItem('currLoggedInUser'));
}

/**
 * Search for user in the DB by given username and password
 * Return undefined if such user is not found
 */
function getUser(userId, pass) {
    let isFound = getAllUsers().find(
        k => ( (k.username === userId) && (k.password === pass) ) );

    return isFound;
}

function removeAllUsers() {
    localStorage.removeItem('users');
}

function removeCurrLoggedInUser() {
    localStorage.removeItem('currLoggedInUser');
}

//Add the key 'currLoggedInUser' with the given key value to the localStorage or update that key's value if it already exists
function setCurrLoggedInUser(keyValue) {
    localStorage.setItem('currLoggedInUser', keyValue);
}

//Add the key 'users' with the given key value to the localStorage or update that key's value if it already exists
function setUsers(keyValue) {
    localStorage.setItem('users', keyValue);
}

export default { getAllUsers, getCurrLoggedInUser, getUser, removeAllUsers, removeCurrLoggedInUser, setCurrLoggedInUser, setUsers };
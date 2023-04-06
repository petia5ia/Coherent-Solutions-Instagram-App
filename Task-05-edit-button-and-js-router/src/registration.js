function searchByEmailOrUsername(email, username) {
    const storedUsers = localStorage.users;
    let isFound;
    
    if (storedUsers != undefined) {
        isFound = JSON.parse(storedUsers).find(
        k => ( k.email === email|| k.username === username ) );
    }

    return isFound;
}

/**
 * Validate email using regular expression
 * https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
 */
 const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};

function registerUser() {
    const lowerCaseRegex = /[a-z]/g;
    const upperCaseRegex = /[A-Z]/g;
    const numbersRegex = /[0-9]/g;
    const specialCharsRegex = /[!@#\$%\^\&*\)\(+=._-]/g;

    let newUserObj = {
        'email': loginRegForm.email.value,
        'username': loginRegForm.username.value,
        'password': loginRegForm.userpsw.value
    }

    let arrUsers = !!localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    arrUsers.push(newUserObj);

    if ( searchByEmailOrUsername(loginRegForm.email.value, loginRegForm.username.value) != undefined ) {
        alert('User with this email or username already exists.');
    } else if (!validateEmail(loginRegForm.email.value)) {
        alert('Please enter a valid email address.');
    } else if(loginRegForm.username.value.length == 0) {
        alert('The username cannot be empty.');
    } else if(loginRegForm.userpsw.value.length < 8) {
        alert('The password must be at least 8 characters long.');
    } else if(!loginRegForm.userpsw.value.match(lowerCaseRegex)) {
        alert('The password must contain a lowercase.');
    } else if(!loginRegForm.userpsw.value.match(upperCaseRegex)) {
        alert('The password must contain an uppercase.');
    } else if(!loginRegForm.userpsw.value.match(numbersRegex) && !loginRegForm.userpsw.value.match(specialCharsRegex)) {
        alert('The password must contain a number or special character.');
    } else {
        localStorage.setItem('users', JSON.stringify(arrUsers));
        alert('Your account has been created');
        loginRegForm.reset();
    }

    window.history.pushState(null, null, "#");
}

export{registerUser};
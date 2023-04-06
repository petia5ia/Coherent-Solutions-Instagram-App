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

function validateEmailUsernamePass (email, username, pass) {
    const lowerCaseRegex = /[a-z]/g;
    const upperCaseRegex = /[A-Z]/g;
    const numbersRegex = /[0-9]/g;
    const specialCharsRegex = /[!@#\$%\^\&*\)\(+=._-]/g;
    let isValid = false;

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
    } else if(username.length === 0) {
        alert('The username cannot be empty.');
    } else if(pass.length < 8) {
        alert('The password must be at least 8 characters long.');
    } else if(!pass.match(lowerCaseRegex)) {
        alert('The password must contain a lowercase.');
    } else if(!pass.match(upperCaseRegex)) {
        alert('The password must contain an uppercase.');
    } else if(!pass.match(numbersRegex) && !pass.match(specialCharsRegex)) {
        alert('The password must contain a number or special character.');
    } else {
        isValid = true;
    }

    return isValid;
}

export { validateEmail, validateEmailUsernamePass };
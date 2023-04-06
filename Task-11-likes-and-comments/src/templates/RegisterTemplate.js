function registerTemplate() {
    return `
        <form id="regForm">
            <div class="container container-with-padding">
                <input type="email" placeholder="Enter Email" name="email" required>
                <input type="text" placeholder="Enter Username" name="username" required>
                <input type="password" placeholder="Enter Password" name="userpsw" required>

                <button type="submit" name="registerBtn" id="registerBtn">Register</button>

                <div id="loginContainer">
                    <p>Already have an account? <a href="#login" id="loginLink">Sign in</a></p>
                </div>
            </div>
        </form>`;
}

export { registerTemplate };
function registerTemplate() {
    return `
        <form id="loginRegForm">
            <div class="container">
                <input type="email" placeholder="Enter Email" name="email" required>
                <input type="text" placeholder="Enter Username" name="username" required>
                <input type="password" placeholder="Enter Password" name="userpsw" required>

                <button type="submit" name="registerBtn" id="registerBtn">Register</button>

                <div class="container" id="loginContainer">
                    <p>Already have an account? <a href="#displayLoginForm" id="loginLink">Sign in</a></p>
                </div>
            </div>
        </form>`;
}

export { registerTemplate };
function loginTemplate() {
    return `
        <form id="loginRegForm">
            <div class="container">
                <input type="text" placeholder="Enter Username" name="username" required>
                <input type="password" placeholder="Enter Password" name="userpsw" required>

                <button type="submit" name="loginBtn" id="loginBtn">Login</button>

                <div class="container" id="registerContainer">
                    <p>You don't have an account? <a href="#displayRegisterForm" id="registerLink">Register</a></p>
                </div>
            </div>
        </form>`;
}

export { loginTemplate };
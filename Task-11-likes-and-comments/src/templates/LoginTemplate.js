function loginTemplate() {
    return `
        <form id="loginForm">
            <div class="container container-with-padding">
                <input type="text" placeholder="Enter Username" name="username" required>
                <input type="password" placeholder="Enter Password" name="userpsw" required>

                <button type="submit" name="loginBtn" id="loginBtn">Login</button>

                <div id="registerContainer">
                    <p>You don't have an account? <a href="#register" id="registerLink">Register</a></p>
                </div>
            </div>
        </form>`;
}

export { loginTemplate };
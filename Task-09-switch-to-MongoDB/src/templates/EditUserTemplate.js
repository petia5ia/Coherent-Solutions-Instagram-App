function editUserTemplate(props) {
    let index = (document.getElementById('editBtn')).parentNode.parentNode.id;

    return `
        <div id="${index}">

        <form id="uploadPhotoForm">
            <div>
                <label for="avatar">Select profile picture:</label>
                <input type="file" name="avatar" id="avatar">
            </div>

            <div>
                <input type="submit" value="Upload">
            </div>
        </form>

        <form action="" id="editUserForm">
            <div class="container">
                <label for="email">Email:</label>
                <input type="text" name="email" value="${props.email}">

                <label for="username">Username:</label>
                <input type="text" name="username" value="${props.username}">

                <label for="userpsw">Password:</label>
                <input type="text" name="userpsw" value="${props.password}">

                <form>
                    <div>Gender:</div>
                    <div>
                        <input type="radio" name="gender" id="female" value="F">
                        <label for="female">Female</label>
                    </div>
                    <div>
                        <input type="radio" name="gender" id="male" value="M">
                        <label for="male">Male</label>
                    </div>
                </form>

                <div>
                    <div>How Did You Hear About Us?</div>
                    <select name="survey" id="survey">
                        <option value="search engine">Search engine</option>
                        <option value="friend">By friend or colleague</option>
                        <option value="social media">Social media</option>
                        <option value="blog">Blog or publication</option>
                        <option value="other" selected>Other</option>
                    </select>
                </div>

                <label for="birthdate">Birthdate:</label>
                <input type="date" id="birthdate" name="birthdate" value="2022-01-01" min="1990-01-01" max="2022-01-01">

                <button type="submit" name="savebtn" id="saveBtn">Save</button>

                <button type="submit" name="cancelbtn" id="cancelBtn">
                    <a href="#" id="cancelBtnLink">Cancel</a>
                </button>
            </div>
        </form>
        
        </div>`;
}

export { editUserTemplate };
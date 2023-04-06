function userTemplate(props, currLoggedInUser, i) {
    return `
        <form action="" id="${i}">
            <div class="container">
                <div class="userInfo">
                    <img src="${props.avatar}" alt="">
                    <b>Email:</b> ${props.email}<br>
                    <b>Username:</b> ${props.username}<br>
                    ${( props.birthday !== undefined ) ? `<b>Birthday:</b> ${props.birthday}<br>` : ``}
                    ${( props.gender !== undefined ) ? `<b>Gender:</b> ${props.gender}<br>` : ``}
                </div>

                ${( props.email === currLoggedInUser.email ) ?
                    `<button type="submit" name="editbtn" id="editBtn">
                        <a href="#editUser" id="editBtnLink">Edit</a>
                    </button>` 
                    :
                    ``
                }

                <button type="submit" name="showProfile" id="showProfileBtn">
                    <a href="#users/${props.username}" id="showProfileBtnLink">Profile</a>
                </button>

                <button type="submit" name="deletebtn" id="deleteBtn${i}">Delete</button>
            </div>
        </form>`;
}

export { userTemplate };
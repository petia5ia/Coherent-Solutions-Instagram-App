function userProfileTemplate(props) {
    return `
        <div class="container">
            <b>Email:</b> ${props.email}<br>
            <b>Username:</b> ${props.username}<br>
            <b>Password:</b> ${props.password}<br>
            ${( props.birthday !== undefined ) ? `<b>Birthday:</b> ${props.birthday}<br>` : ``}
            ${( props.gender !== undefined ) ? `<b>Gender:</b> ${props.gender}<br>` : ``}

            <button type="submit">
                <a href="#users" id="backBtnLink">Back</a>
            </button>
        </div>`;
}

export { userProfileTemplate };
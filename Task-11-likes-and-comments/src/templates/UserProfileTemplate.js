function userProfileTemplate(props) {
    return `
        <div class="container">
            <img src="${props.avatar}" alt="Avatar">

            <div class="container-with-padding">
                <b>Email:</b> ${props.email}<br>
                <b>Username:</b> ${props.username}<br>
                ${( props.birthday !== undefined ) ? `<b>Birthday:</b> ${props.birthday}<br>` : ``}
                ${( props.gender !== undefined ) ? `<b>Gender:</b> ${props.gender}<br>` : ``}

                <button type="submit">
                    <a href="#users" id="backBtnLink">Back</a>
                </button>
            </div>
        </div>`;
}

export { userProfileTemplate };
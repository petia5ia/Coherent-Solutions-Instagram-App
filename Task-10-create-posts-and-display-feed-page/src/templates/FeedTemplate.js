function feedTemplate(props) {
    return `
        <div class="container">
        <b>${props.author}</b>:<br>
            <img src="${props.path}" alt="">
            ${( props.description !== "" ) ? `${props.description}<br>` : ``}
        </div>`;
}

export { feedTemplate };
import "../styles/sass/main.scss"

function component() {
    const element = document.createElement('div');

    element.innerHTML = "Hello webpack";

    return element;
}

document.body.appendChild(component());
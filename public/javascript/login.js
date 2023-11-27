function showPopup(button) {
    const loginContainer = document.querySelector(button);

    if (loginContainer) {
        loginContainer.classList.add('popup');
    }
}

function closeLoginForm(close) {
    const popup = document.querySelector(close);

    if (popup && popup.classList.contains('popup')) {
        popup.classList.remove('popup');
    }
}

function goingToHomepage() {
    window.location.href = '/';
}
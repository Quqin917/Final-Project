function showMenu(menu) {
    const navBar = document.querySelector('.nav-links');

    menu.addEventListener('click', () => {
        menu.classList.toggle('change');
        navBar.classList.toggle('shows');
    })
}
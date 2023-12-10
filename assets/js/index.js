const navbarMenu = document.getElementById('navbar');
const burgerMenu = document.getElementById('burger');
const overlayMenu = document.getElementById('overlay');

burgerMenu.addEventListener('click', toggleMenu);
overlayMenu.addEventListener('click', toggleMenu);

function toggleMenu() {
    navbarMenu.classList.toggle('active');
    overlayMenu.classList.toggle('active');
}

navbarMenu.addEventListener('click', (e) => {
    if (e.target.hasAttribute('data-toggle') && window.innerWidth <= 768) {
        e.preventDefault();
		const menuItemHasChildren = e.target.parentElement;

		if (menuItemHasChildren.classList.contains('active')) {
            collapseSubMenu();
		}
	}
});

window.addEventListener('resize', () => {
	if (this.innerWidth > 768) {
		if (navbarMenu.classList.contains('active')) {
            toggleMenu();
		}
    }
});
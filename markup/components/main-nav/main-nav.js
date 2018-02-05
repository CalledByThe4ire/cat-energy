const mainNav = document.querySelector('.main-nav');
const mainNavTrigger = mainNav.querySelector('.main-nav__trigger');

mainNav.classList.remove('main-nav--nojs');

mainNavTrigger.addEventListener('click', (e) => {
    if (e.target.parentElement.classList.contains('main-nav--opened')) {
        e.target.parentElement.classList.remove('main-nav--opened');
        e.target.parentElement.classList.add('main-nav--closed');
    } else {
        e.target.parentElement.classList.remove('main-nav--closed');
        e.target.parentElement.classList.add('main-nav--opened');
    }
});

const menuLinks = document.querySelector('.main-menu');

export function showBurger() {
    menuLinks.classList.add('main-menu--active');
}

export function closeBurger() {
    menuLinks.classList.remove('main-menu--active');
}

export const btnBurger = document.querySelector('.header__catalog-btn');
export const closeBtnBurger = document.querySelector('.main-menu__close');

// Обработчик клика вне меню для закрытия
document.addEventListener('click', (event) => {
    if (menuLinks.classList.contains('main-menu--active')) {
        if (!menuLinks.contains(event.target) && !btnBurger.contains(event.target)) {
            closeBurger(); 
        }
    }
});
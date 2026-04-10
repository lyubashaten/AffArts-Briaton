import { showBurger, closeBurger, btnBurger, closeBtnBurger } from "./components/burger-menu.js";
import { btnShowCity, showCity } from "./components/choice-city.js";
import { btnAccordion, showAccordion } from "./components/accordion.js";
import { init } from "./components/render-card.js";
import { showAmountProduct } from "./components/product-categories.js";
import { checkboxCategories, filterProducts, radioButtons } from "./components/filter-products.js";
import { selectProduct, sortCards } from "./components/sort-cards.js";
import { btnOfBasket, showBasket } from "./components/basket.js";
import { showSlider } from "./components/slider.js";
import { form, initValidation } from "./components/validate.js";
import { renderItems } from "./components/paginations.js";
import { initTooltips } from "./components/tooltip.js"

window.addEventListener('DOMContentLoaded', () => {
    // открытие и закрытие меню
    btnBurger.addEventListener('click', showBurger);
    closeBtnBurger.addEventListener('click', closeBurger)

    // выбор города
    btnShowCity.addEventListener('click', showCity)

    // работа аккордиона
    btnAccordion.forEach(button => {
        button.addEventListener('click', showAccordion)
    })

    // отрисовка карточек
    window.addEventListener('DOMContentLoaded', () => {
        init();
    });

    // отсортировка продуктов по категориям
    window.addEventListener('DOMContentLoaded', () => {
        showAmountProduct();
    });

    // слайдер
    window.addEventListener('DOMContentLoaded', () => {
        showSlider();
    });

    // фильтрация продуктов
    window.addEventListener('DOMContentLoaded', () => {
        renderItems()
    })
    checkboxCategories.forEach((checkbox) => {
        checkbox.addEventListener('change', filterProducts)
    })
    radioButtons.forEach((radio) => {
        radio.addEventListener('change', filterProducts)
    })

    // очистка фильтров и сортировки
    document.querySelector('.catalog-form__reset').addEventListener('click', init);
    // сортировка товаров
    selectProduct.addEventListener('change', sortCards);

    // работа корзины
    btnOfBasket.addEventListener('click', showBasket)

    // валидация формы
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        initValidation();
    });

    // Тултипы
    document.querySelectorAll(".tooltip__btn").forEach((btn) => {
        btn.addEventListener('mouseenter', initTooltips)
    })
});

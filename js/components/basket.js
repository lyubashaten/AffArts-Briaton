import { loadProducts } from "./get-data.js";

export const btnOfBasket = document.querySelector('.header__user-btn'); // Кнопка корзины
const basketList = document.querySelector('.basket__list'); // Сюда добавляются элементы
const emptyBlock = document.querySelector('.basket__empty-block'); // Блок, который отображается, когда корзина пуста
let itemCount = 0; // Счётчик товаров в корзине
const btnDecoration = document.querySelector('.basket__link');

// Загружаем продукты 
async function init() {
    const products = await loadProducts(); // Загружаем продукты

    // Добавляем делегирование событий на родительский элемент
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('product-basket')) {
            const itemId = event.target.getAttribute('id'); // Получаем ID товара из атрибута id
            const itemData = products.find(product => product.id === parseInt(itemId)); // Ищем товар по ID

            if (itemData) {
                addItemToBasket(itemData); // Если товар найден, добавляем его в корзину
                btnDecoration.style.display = 'flex'
            } else {
                console.error('Товар не найден');
            }
        }
    });
}

// Функция для отображения корзины
export function showBasket() {
    const basket = document.querySelector('.basket');
    basket.classList.toggle('basket--active');
}

// Функция для добавления товара в корзину
function addItemToBasket(item) {
    // Создаём новый элемент списка для товара
    const basketItem = document.createElement('li');
    basketItem.classList.add('basket__item');
    basketItem.innerHTML = `
        <div class="basket__img">
            <img src="${item.image}" alt="${item.name}" height="60" width="60">
        </div>
        <span class="basket__name">${item.name}</span>
        <span class="basket__price">${item.price.new} руб</span>
         <button class="basket__item-close" type="button">
                  <svg class="main-menu__icon" width="24" height="24" aria-hidden="true">
                    <use xlink:href="images/sprite.svg#icon-close"></use>
                  </svg>
                </button>
    `;

    basketList.appendChild(basketItem);

    // Увеличиваем счётчик товаров
    itemCount++;
    updateItemCount();
    emptyBlock.style.display = 'none';

    // Добавляем обработчик для кнопки удаления
    basketItem.querySelector('.basket__item-close').addEventListener('click', function () {
        basketItem.remove();
        itemCount--;
        updateItemCount();
        if (itemCount === 0) {
            emptyBlock.style.display = 'block';
            btnDecoration.style.display = 'none' // Удаляем ссылку на оформление, если корзина пуста
        }
    });
}

// Функция для обновления отображения счётчика товаров в корзине
function updateItemCount() {
    const countDisplay = document.querySelector('.header__user-count');
    countDisplay.textContent = itemCount; // Обновляем текст счётчика
}

// Инициализация
init();

const basket = document.querySelector('.basket');

document.addEventListener('click', (event) => {
  if (basket.classList.contains('basket--active')) {
    if (!basket.contains(event.target) && !btnOfBasket.contains(event.target)) {
      basket.classList.remove('basket--active'); 
    }
  }
});
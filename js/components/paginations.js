import { loadProducts } from "./get-data.js";
import { renderProducts } from "./render-card.js";

let currentPage = 1;
const itemsPerPage = 6;

// Функция для получения списка карточек и их отрисовки
export async function renderItems(products) {
    if (!products) {
        products = await loadProducts(); 
        if (!Array.isArray(products) || products.length === 0) {
            console.error('Не удалось загрузить продукты или массив пуст.');
            return; 
        }
    }

    const totalItems = products.length; // Общее количество карточек
    const totalPages = Math.ceil(totalItems / itemsPerPage); // Общее количество страниц

    // Отображаем карточки для текущей страницы
    const start = (currentPage - 1) * itemsPerPage; // Начальный индекс
    const end = start + itemsPerPage; // Конечный индекс
    const itemsToDisplay = products.slice(start, end); // Извлекаем карточки для отображения

    renderProducts(itemsToDisplay); // Отрисовываем карточки

    // Отображение пагинации
    renderPagination(totalPages, products); // Передаем продукты в пагинацию
}

// Функция отрисовки пагинации
function renderPagination(totalPages, products) {
    const paginationContainer = document.querySelector('.catalog__pagination');
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('li');
        pageButton.classList.add('catalog__pagination-item');
        pageButton.innerHTML = `<button class="catalog__pagination-link">${i}</button>`;

        // Добавляем обработчик события для кнопки страницы
        pageButton.querySelector('button').addEventListener('click', () => {
            currentPage = i; 
            renderItems(products); 
        });

        paginationContainer.appendChild(pageButton);
    }
}

// Вызов функции для первоначальной отрисовки карточек
renderItems();
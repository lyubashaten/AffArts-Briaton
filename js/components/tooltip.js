import { loadProducts } from "./get-data.js";

let cards = [];

// Функция для инициализации тултипов
export async function initTooltips() {
    cards = await loadProducts();

    // Делегируем событие наведения на документ
    document.addEventListener('mouseenter', function (event) {
        if (event.target.classList.contains('tooltip__btn')) {
            const itemId = event.target.getAttribute('id');
            const itemData = cards.find(product => product.id === parseInt(itemId));

            if (itemData) {
                const tooltipContent = createTooltipContent(itemData.availability);
                if (!event.target._tippy) {
                    tippy(event.target, {
                        content: tooltipContent,
                        allowHTML: true,
                        placement: 'top',
                        trigger: 'mouseenter focus',
                    });
                } else {
                    event.target._tippy.setContent(tooltipContent);
                }
            } else {
                console.error('Товар не найден');
            }
        }
    }, true);
}

// Функция для создания HTML-содержимого тултипа
function createTooltipContent(availability) {
    return `
        <span class="tooltip__text">Наличие товара по городам:</span>
        <ul class="tooltip__list">
            <li class="tooltip__item">
                <span class="tooltip__text">Москва: <span class="tooltip__count">${availability.moscow}</span></span>
            </li>
            <li class="tooltip__item">
                <span class="tooltip__text">Оренбург: <span class="tooltip__count">${availability.orenburg}</span></span>
            </li>
            <li class="tooltip__item">
                <span class="tooltip__text">Санкт-Петербург: <span class="tooltip__count">${availability.saintPetersburg}</span></span>
            </li>
        </ul>
    `;
}

// Запускаем инициализацию тултипов один раз при загрузке страницы
initTooltips();

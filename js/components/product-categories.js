import { loadProducts } from "./get-data.js";

export async function showAmountProduct() {
    const spanOfCategories = document.querySelectorAll('.custom-checkbox__count');

    // Сначала обнуляем все счетчики
    spanOfCategories.forEach((span) => {
        span.innerHTML = '0';
    });

    // Загружаем продукты
    const products = await loadProducts();
    if (products) {
        // Проходим по каждому продукту
        products.forEach(product => {
            // Проходим по каждому типу товара
            product.type.forEach(type => {
                // Находим соответствующий чекбокс по типу
                const checkbox = document.querySelector(`input[type="checkbox"][value="${type}"]`);
                if (checkbox) {
                    const countSpan = checkbox.nextElementSibling.querySelector('.custom-checkbox__count');
                    const currentCount = parseInt(countSpan.innerHTML) || 0;
                    countSpan.innerHTML = currentCount + 1;
                }
            });
        });
    } else {
        console.error('Не удалось загрузить продукты');
    }
}

showAmountProduct()
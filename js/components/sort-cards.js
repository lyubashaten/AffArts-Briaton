import { loadProducts } from "./get-data.js";
import { renderItems } from "./paginations.js";

export const selectProduct = document.querySelector('.catalog__sort-select')
export async function sortCards() {
    const products = await loadProducts();

    // Проверяем, что данные загружены и это массив
    if (!Array.isArray(products) || products.length === 0) {
        console.error('Ошибка: загруженные данные не являются массивом или массив пуст.');
        return;
    }

    let sortedProducts = [];
    const optionValue = selectProduct.value; 
    console.log(optionValue);

    if (optionValue === 'price-max') {
        sortedProducts = products.sort((a, b) => b.price.new - a.price.new); // Сортировка от дорогих к дешевым
    } else if (optionValue === 'price-min') {
        sortedProducts = products.sort((a, b) => a.price.new - b.price.new); // Сортировка от дешевых к дорогим
    } else if (optionValue === 'rating-max') {
        sortedProducts = products.sort((a, b) => b.rating - a.rating); // Сортировка по популярности
    }

    
    if (sortedProducts.length > 0) {
        renderItems(sortedProducts);
    } else {
        console.error('Нет доступных товаров для отображения.');
    }
}


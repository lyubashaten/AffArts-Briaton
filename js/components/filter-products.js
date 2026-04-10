import { loadProducts } from "./get-data.js";
import { renderItems } from "./paginations.js";
export const checkboxCategories = document.querySelectorAll('.custom-checkbox__field');
export const radioButtons = document.querySelectorAll('.custom-radio__field');
export async function filterProducts() {
    const products = await loadProducts();

    // Массив для хранения отфильтрованных продуктов
    let filteredProducts = [];

    const selectedStatus = Array.from(radioButtons).find(radio => radio.checked)?.value;

    const selectedTypes = Array.from(checkboxCategories).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);

    if (selectedTypes.length > 0) {
        selectedTypes.forEach(selectedType => {
            const matchingProducts = products.filter(product => product.type.includes(selectedType));

            if (selectedStatus === 'instock') {
                const availableProducts = matchingProducts.filter(product =>
                (product.availability.moscow > 0 ||
                    product.availability.orenburg > 0 ||
                    product.availability.saintPetersburg > 0)
                );
                filteredProducts = filteredProducts.concat(availableProducts);
            } else {
                filteredProducts = filteredProducts.concat(matchingProducts);
            }
        });
    } else {
        if (selectedStatus === 'instock') {
            filteredProducts = products.filter(product =>
            (product.availability.moscow > 0 ||
                product.availability.orenburg > 0 ||
                product.availability.saintPetersburg > 0)
            );
        } else {
            filteredProducts = products;
        }
    }

    if (filteredProducts.length === 0) {
        console.log('Нет доступных товаров по выбранным фильтрам.');
    } else {
        console.log('Отфильтрованные товары:', filteredProducts);
    }

    // Отображаем отфильтрованные продукты
    renderItems(filteredProducts);
}



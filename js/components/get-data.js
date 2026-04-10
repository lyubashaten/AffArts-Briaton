
export async function loadProducts() {
    let products; 
    try {
        const response = await fetch('./data/data.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        products = await response.json(); 
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
    }
    return products; 
}

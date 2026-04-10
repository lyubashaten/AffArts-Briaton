const choiceCity = document.querySelector('.location__city-name');
const dropdownList = document.querySelector('.location__sublist');
export function showCity() {
    btnShowCity.classList.toggle('location__city--active')

    // Обработчик клика по элементам в выпадающем меню
    dropdownList.addEventListener('click', (event) => {
        if (event.target.classList.contains('location__sublink')) {
            choiceCity.textContent = event.target.textContent;
            btnShowCity.classList.remove('location__city--active');
        }
    });
}
export const btnShowCity = document.querySelector('.location__city');
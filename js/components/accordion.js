export const btnAccordion = document.querySelectorAll('.accordion__btn');

export function showAccordion(event) {
    const clickedButton = event.currentTarget;
    const content = clickedButton.nextElementSibling;

    const isActive = clickedButton.classList.contains('accordion__btn--active');

    btnAccordion.forEach(button => {
        button.classList.remove('accordion__btn--active');
        const content = button.nextElementSibling;
        content.style.display = 'none';
    });

    if (!isActive) {
        clickedButton.classList.add('accordion__btn--active');
        content.style.display = 'block';
    }
}



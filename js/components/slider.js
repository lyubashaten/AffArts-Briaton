import { loadProducts } from './get-data.js'; 
import { Swiper } from '../vendor/swiper.js'; 

export async function showSlider() {
  let arr = await loadProducts();
  const arrSliderEl = [];
  const filteredProducts = arr.filter(product => product.goodsOfDay === true);

  filteredProducts.forEach(product => {
    arrSliderEl.push(product);
  });

  createSlides(arrSliderEl);
  initializeSwiper();

  // Инициализируем тултипы после создания слайдов
  initTooltips();
}

function createSlides(arrSliderEl) {
    const slideContainer = document.querySelector('.swiper-wrapper');
    slideContainer.innerHTML = '';

    arrSliderEl.forEach(product => {
        const slideItem = document.createElement('li');
        slideItem.classList.add('day-products__item', 'swiper-slide');

        slideItem.innerHTML = `
            <div class="product-card product-card--small">
                <div class="product-card__visual">
                    <img class="product-card__img" src="images/${product.image}" height="344" width="290" alt="Изображение товара">
                    <div class="product-card__more">
                        <a href="#" class="product-card__link btn btn--icon product-basket" data-id="${product.id}">
                            <span class="btn__text">В корзину</span>
                            <svg width="24" height="24" aria-hidden="true">
                                <use xlink:href="images/sprite.svg#icon-basket"></use>
                            </svg>
                        </a>
                        <a href="#" class="product-card__link btn btn--secondary">
                            <span class="btn__text">Подробнее</span>
                        </a>
                    </div>
                </div>
              <div class="product-card__info">
                <h2 class="product-card__title">${product.name}</h2>
                <span class="product-card__old">
                  <span class="product-card__old-number">${product.price.old}</span>
                  <span class="product-card__old-add">₽</span>
                </span>
                <span class="product-card__price">
                  <span class="product-card__price-number">${product.price.new}</span>
                  <span class="product-card__price-add">₽</span>
                </span>
                <div class="product-card__tooltip tooltip">
                  <button class="tooltip__btn" aria-label="Показать подсказку" type="button">
                    <svg class="tooltip__icon" width="5" height="10" aria-hidden="true">
                      <use xlink:href="images/sprite.svg#icon-i"></use>
                    </svg>
                  </button>
                  <div class="tooltip__content" style="display:none;">
                    <span class="tooltip__text">Наличие товара по городам:</span>
                    <ul class="tooltip__list">
                      <li class="tooltip__item">
                        <span class="tooltip__text">Москва: <span class="tooltip__count">${product.availability.moscow}</span></span>
                      </li>
                      <li class="tooltip__item">
                        <span class="tooltip__text">Оренбург: <span class="tooltip__count">${product.availability.orenburg}</span></span>
                      </li>
                      <li class="tooltip__item">
                        <span class="tooltip__text">Санкт-Петербург: <span class="tooltip__count">${product.availability.saintPetersburg}</span></span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
        </div>
        `;

    slideContainer.appendChild(slideItem); 
  });
}

function initializeSwiper() {
  const swiper = new Swiper('.swiper-container', {
    navigation: {
      nextEl: '.day-products__navigation-btn--next',
      prevEl: '.day-products__navigation-btn--prev',
    },
    spaceBetween: 40,
    slidesPerView: 4,
  });
}

function initTooltips() {
  // Инициализируем тултипы на всех кнопках с классом .tooltip__btn
  tippy('.tooltip__btn', {
    content(reference) {
      // Находим соседний элемент с содержимым тултипа
      const tooltipContent = reference.nextElementSibling;
      return tooltipContent ? tooltipContent.innerHTML : '';
    },
    allowHTML: true,
    placement: 'top',
    interactive: true, // чтобы можно было взаимодействовать с тултипом
    delay: [100, 100], // задержка показа и скрытия
  });
}

showSlider();
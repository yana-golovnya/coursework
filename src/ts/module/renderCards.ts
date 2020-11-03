import {IAddedSights} from './interfaces';
import {HTMLEl} from './type';


function renderSlider(arrImg: Array<string>, imgName: string) {
  return arrImg.map(item => `
      <div class="swiper-slide full-card__slide">
        <img src="${item}" alt="фото: ${imgName}">
      </div>
    `).join('');
}

export function createPrevCard({data: props, id}): HTMLDivElement {
  props.id = id;
  const $card: HTMLDivElement = document.createElement('div');
  $card.classList.add('card', 'card__block');

  $card.innerHTML = `
    <h3 class="card-title">${props.title}</h3>
    <div class="card-img-block">
      <img class="card-img" src="${props.imgArr[0]}" alt="фото: ${props.title}">
    </div>
    <p class="card-info">${props.info}</p>
    <strong>${props.street}</strong>
    <div class="rating rating__block">
      <div class="rating__text">Оцінка:</div>
      <div class="rating-num"><span>${props.rating}</span>/5</div>
    </div>
    <div data-data hidden>${JSON.stringify(props)}</div>
  `;
  return $card;
}

export function createFullCard(props: IAddedSights): HTMLDivElement {
  const $card: HTMLDivElement = document.createElement('div');
  $card.classList.add('card-wrap');

  $card.innerHTML = `
    <div class="full-card">
      <button class="full-card__close">&#10006;</button>
      <div class="full-card__content">
        <div class="full-card-header">
          <h3 class="full-card__title">${props.title}</h3>
          <div class="rating">
            <span>Оцiнка: </span>
            <strong><span>${props.rating}</span>/5</strong>
          </div>
        </div>
        <div class="full-card__wrapper">
          <div class="full-card__slider">
            <div class="swiper-wrapper">
  ${renderSlider(props.imgArr, props.title)}
            </div>
            <div class="swiper-button swiper-button_prev btn button_prev-card"></div>
            <div class="swiper-button swiper-button_next btn button_next-card"></div>
          </div>
          <p class="full-card__text">${props.info}</p>
          <div class="added-comments added-comments__block">
            <form class="added-comments__form" id="added-comments-form">
              <label for="added-comments-input">Оставить комментарий</label>
              <textarea 
                type="text" 
                placeholder="Оставить комментарий" 
                class="added-comments-input" 
                id="added-comments-input"
               ></textarea>
              <button class="added-comments__button">Залишити</button>
              <span class="invalid d-n">Це поле обов'язкове!</span>
            </form>
          </div>
          <div class="comments-wrapper">
            <span class="comments-name">Коментарі</span>
        ${props.feedback.map(item => `
          <div class="card-comments full-card__comments">
            <strong class="card-comments__name">${item.name}</strong>
            <span class="card-comments__date">30.10.2020/10:30</span>
            <p class="card-comments__text">${item.text}</p>
          </div>
        `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  return $card;

}

export function createMapCard({data: props}): HTMLEl {
  const $card: HTMLEl = document.createElement('div');
  $card.classList.add('map-card-item');

  $card.innerHTML = `
    <h3 class="map-card-title">${props.title}</h3>
    <div class="full-card__slider">
      <div class="swiper-wrapper">
  ${renderSlider(props.imgArr, props.title)}
      </div>
      <div class="swiper-button swiper-button_prev btn button_prev-card"></div>
      <div class="swiper-button swiper-button_next btn button_next-card"></div>
    </div>
    <p class="map-card-text">${props.info}</p>
  `;

  return $card;

}

export function createWarningCard(text: string = 'Помилка!'): HTMLEl {
  const $card: HTMLEl = document.createElement('div');
  $card.innerHTML = `
   <br>
   <strong>Ой...</strong>
   <h3>${text}</h3>
   <br>
  `;

  return $card;
}


export function createUserCard(): HTMLEl {
  const $modal: HTMLEl = document.createElement('div');
  $modal.classList.add('modal-account');

  $modal.innerHTML = `
    <div class="modal-account-content">
      <button class="modal-account-close" id="close-modal-account">&#10006;</button>
      <button class="offset-animation-button button-sign-in" id="button-sign-in">Войти</button>
      <button class="offset-animation-button button-sign-in d-n" id="button-new-sign-in">Сменить аккаунт</button>
      <button class="offset-animation-button button-sign-out" id="button-sign-out">Выйти</button>
    </div>
  `;

  return $modal;

}

export function createFormSight(): HTMLEl {
  const $modal: HTMLEl = document.createElement('div');
  $modal.classList.add('modal-added-layout');

  $modal.innerHTML = `
    <div class="modal-added">
      <button class="close" id="close-added-sight">&#10006;</button>
      <h3 class="title modal-added__title">Додати нову пам'ятку</h3>
      <div class="modal-added__content">
        <form class="modal-added__form">
          <label>
            Ім'я
            <input type="text" placeholder="П’ятничанський замок" class="input-name">
          </label>
          <label>
            Інфромація
            <input type="text" placeholder="Якийсь опис пам'ятки" class="input-info">
          </label>
          <label>
            Рейтинг
            <input type="number" placeholder="5" class="input-rating">
          </label>
          <label>
            Вулиця
            <input type="text" placeholder="Вулиця Мічуріна, 32" class="input-street">
          </label>
          <label>
            Можливі назви через кому
            <input type="text" placeholder="П’ятничанський замок, замок" class="input-nameArr">
          </label>
          <label class="label-img">
            Посилання на фото
            <input type="text" placeholder="https://..." class="input-img">
          </label>
          <div class="added-button added-img-input"></div>
          <button class="added-sight">Додати</button>
        </form>
      </div>
    </div>
  `;
  return $modal;

}

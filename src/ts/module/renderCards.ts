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
      <svg class="svg-icon back-to-info" viewBox="0 0 20 20" onclick="ocMap()">
\t\t\t\t\t\t\t<path d="M3.24,7.51c-0.146,0.142-0.146,0.381,0,0.523l5.199,5.193c0.234,0.238,0.633,0.064,0.633-0.262v-2.634c0.105-0.007,0.212-0.011,0.321-0.011c2.373,0,4.302,1.91,4.302,4.258c0,0.957-0.33,1.809-1.008,2.602c-0.259,0.307,0.084,0.762,0.451,0.572c2.336-1.195,3.73-3.408,3.73-5.924c0-3.741-3.103-6.783-6.916-6.783c-0.307,0-0.615,0.028-0.881,0.063V2.575c0-0.327-0.398-0.5-0.633-0.261L3.24,7.51 M4.027,7.771l4.301-4.3v2.073c0,0.232,0.21,0.409,0.441,0.366c0.298-0.056,0.746-0.123,1.184-0.123c3.402,0,6.172,2.709,6.172,6.041c0,1.695-0.718,3.24-1.979,4.352c0.193-0.51,0.293-1.045,0.293-1.602c0-2.76-2.266-5-5.046-5c-0.256,0-0.528,0.018-0.747,0.05C8.465,9.653,8.328,9.81,8.328,9.995v2.074L4.027,7.771z"></path>
\t\t\t\t\t\t</svg>
      <div class="full-card__content">
        <div class="full-card-header">
          <h3 class="full-card__title">${props.title}</h3>
          <div class="rating">
            <span>Оцiнка: </span>
            <strong><span>${props.rating}</span>/5</strong>
          </div>
        </div>
        <div id="content-map" class="full-card__wrapper" style="display: none; flex-basis: 100%;">
          <iframe src="${props.mapSrc}" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
        </div>
        <div id="content-all" class="full-card__wrapper">
          <div class="full-card__slider">
            <div class="swiper-wrapper">
  ${renderSlider(props.imgArr, props.title)}
            </div>
            <div class="swiper-button swiper-button_prev btn button_prev-card"></div>
            <div class="swiper-button swiper-button_next btn button_next-card"></div>
          </div>
          <p class="full-card__text">${props.info}</p>
            <button class="show-map__button" onclick="ocMap()">Показати на карті</button>
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
          <label>
            Посилання на карту
            <input type="text" placeholder="https://..." class="input-mapSrc">
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

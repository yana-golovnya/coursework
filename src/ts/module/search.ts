import {getSights} from './db';
import {HTMLEl} from './type';

export const search = (): void => {
  const modalSearch: HTMLEl = document.getElementById('modal-search');
  const searchInput = document.getElementById('search-input') as HTMLInputElement;

  const handlerListener = (event): void => {
    const {target} = event;
    if (target.matches('#search-open-button, #close-search')) {
      modalSearch.classList.toggle('modal-active');
    } else if (target.matches('#modal-button-search')) {
      valid();
    }
    // поиск по улицам
    if (target.closest('.search-navigation__item > button')) {
      getSights(target.textContent, true).then(() => location.href = 'sights.html');
    }

    // поиск всех достопримечательностей
    if (target.matches('#all-sights')) {
      getSights('dost').then(() => location.href = 'sights.html');
    }
  };

  // базовая проверка на валидность
  const valid = (): void => {
    const searchInputValue: string = searchInput.value;
    if (searchInputValue.trim() === '') {
      alert('Поле должно быть заполнено!');
      searchInput.value = '';
      searchInput.focus();
    } else {
      getSights(searchInputValue).then(() => location.href = 'sights.html');
    }
  };

  document.body.addEventListener('click', handlerListener);
};

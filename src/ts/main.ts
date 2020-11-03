import '../less/style.less';
import './module/sliders';
import {search} from './module/search';
import './module/db';
import {createPrevCard, createWarningCard} from './module/renderCards';
import {governmentDOMCard, governmentDOMMap, sliceText} from './module/governmentDOM';
import {HTMLEl} from './module/type';
import {account, AuthStateChanged} from './module/accountLogin';
import {addedNewSight} from './module/addedNewSight';

search();

document.addEventListener('DOMContentLoaded', (): void => {
  const buttonAdded = document.getElementById('added-button') as HTMLButtonElement;
  const url: string = window.location.href;
  const lastWordInUrl: string = url.substring(url.lastIndexOf('/') + 1, url.length);
  const data: string = localStorage.getItem('data');
  const cardsOut: HTMLEl = document.getElementById('cards-out');

  if (lastWordInUrl === 'sights.html' && JSON.parse(data).length) {
    JSON.parse(data).forEach(item => cardsOut.append(createPrevCard(item)));

    const infoText: NodeListOf<HTMLEl> = document.querySelectorAll('.card-info');
    sliceText(infoText);

    governmentDOMCard();
  } else if (lastWordInUrl === 'sights.html' && !JSON.parse(data).length) {
    cardsOut.append(createWarningCard('Таких пам\'яток не знайдено. Або на цій вулиці їх немає!'));
  } else if (lastWordInUrl === 'index.html' || lastWordInUrl === '') {
    governmentDOMMap();
  }

  AuthStateChanged();
  buttonAdded.addEventListener('click', addedNewSight)
});

document.getElementById('account-button').addEventListener('click', account);

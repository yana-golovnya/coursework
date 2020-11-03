import {createFormSight} from './renderCards';
import {IAddedSights} from './interfaces';
import {addSights} from './db';

export function addedNewSight(): void {
  document.body.append(createFormSight());
  const addedForm = document.querySelector('.modal-added__form') as HTMLFormElement;
  const closeForm = document.querySelector('#close-added-sight');
  const modalAdded: HTMLElement = document.querySelector('.modal-added-layout');
  const imgAddedButton: HTMLElement = document.querySelector('.added-img-input');
  const labelImg: HTMLElement = document.querySelector('.label-img');
  let countImg: number = 0;

  function addedImg() {
    if (countImg < 5) {
      countImg++;
      labelImg.insertAdjacentHTML('afterend', `<label>${labelImg.innerHTML}</label>`)
    }
    if (countImg === 5) {
      imgAddedButton.remove()
    }
  }

  function submitForm(event): void {
    event.preventDefault();
    const inputName = document.querySelector('.input-name') as HTMLInputElement;
    const inputInfo = document.querySelector('.input-info') as HTMLInputElement;
    const inputStreet = document.querySelector('.input-street') as HTMLInputElement;
    const inputNameArr = document.querySelector('.input-nameArr') as HTMLInputElement;
    const inputRating = document.querySelector('.input-rating') as HTMLInputElement;
    const inputImg: NodeListOf<HTMLInputElement> = document.querySelectorAll('.input-img');
    const arrImg = [];

    inputImg.forEach(item => arrImg.push(item.value));

    if (inputName.value && inputNameArr.value &&
      inputInfo.value && inputStreet.value &&
      inputRating.value && arrImg[0]) {

      const arrName: Array<string> = [];
      inputNameArr.value.split(',').forEach(i => {
        i = i.trim();
        i !== '' && arrName.push(i)
      });

      const dataSight: IAddedSights = {
        title: inputName.value,
        name: ['dost', ...arrName],
        info: inputInfo.value,
        street: inputStreet.value,
        rating: +inputRating.value > 5 ? 5 : +inputRating.value,
        imgArr: [...arrImg.filter(i => i)],
        feedback: []
      };

       addSights(dataSight).then(() => {
         destroy();
         alert('Добавлено!')
       });
    } else {
      alert('Всі поля повинні бути заповнені!')
    }

  }

  function destroy() {
    closeForm.removeEventListener('submit', submitForm);
    modalAdded.remove()
  }

  imgAddedButton.addEventListener('click', addedImg);
  addedForm.addEventListener('submit', submitForm);
  closeForm.addEventListener('click', destroy)

}

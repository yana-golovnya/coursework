import {getSights, setSights} from './db';
import * as firebase from 'firebase';

export function addedComments (oldComments: Array<object>, docId: string) {
  const addedForm = document.getElementById('added-comments-form');
  const commentsInput = document.getElementById('added-comments-input') as HTMLTextAreaElement;

  addedForm.addEventListener('submit', event => {
    event.preventDefault();
    const userName: string = firebase.auth().currentUser.displayName;
    const inputValue: string = commentsInput.value;

    if (inputValue.trim() === '') {
      document.querySelector('.invalid').classList.remove('d-n');
      return false
    }

    setSights(userName, inputValue, oldComments, docId).then(() => {
      console.log('set');
      getSights('dost').then(() => location.reload());
    })

  });

}

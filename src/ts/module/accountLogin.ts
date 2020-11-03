import * as firebase from 'firebase';
import {createUserCard} from './renderCards';

export function account(): void {
  const user = firebase.auth().currentUser;
  document.body.append(createUserCard());
  const closeModalAccount = document.getElementById('close-modal-account') as HTMLButtonElement;
  const buttonSignIn = document.getElementById('button-sign-in') as HTMLButtonElement;
  const buttonSignOut = document.getElementById('button-sign-out') as HTMLButtonElement;
  const buttonNewAccount = document.getElementById('button-new-sign-in') as HTMLButtonElement;
  const buttonAdded = document.getElementById('added-button') as HTMLButtonElement;

  if (user) {
    buttonSignIn && buttonSignIn.classList.add('d-n');
    buttonNewAccount && buttonNewAccount.classList.remove('d-n');
    buttonAdded && buttonAdded.classList.remove('d-n')
  }

  function signIn(): void {
    const provider: firebase.auth.GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then(result => {
        const token = (<any>result).credential.accessToken;
        const user: firebase.User = result.user;

      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error([errorCode, errorMessage])

      });

  }

  function signOut(): void {
    firebase.auth().signOut()
      .catch(error => {
        console.error(error)
      });
  }

  function closeModal(): void {
    buttonSignIn.removeEventListener('click', signIn);
    buttonSignOut.removeEventListener('click', signOut);
    buttonNewAccount.removeEventListener('click', signIn);
    closeModalAccount.removeEventListener('click', closeModal);
    document.querySelector('.modal-account').remove();
  }

  closeModalAccount.addEventListener('click', closeModal);
  buttonSignIn.addEventListener('click', signIn);
  buttonNewAccount.addEventListener('click', signIn);
  buttonSignOut.addEventListener('click', signOut);

}

export function AuthStateChanged(): void {
  firebase.auth().onAuthStateChanged(user => {
    const buttonSignIn = document.getElementById('button-sign-in') as HTMLButtonElement;
    const buttonNewAccount = document.getElementById('button-new-sign-in') as HTMLButtonElement;
    const buttonAdded = document.getElementById('added-button') as HTMLButtonElement;
    if (user) {
      document.getElementById('out-user-name').textContent = user.displayName;
      buttonSignIn && buttonSignIn.classList.add('d-n');
      buttonNewAccount && buttonNewAccount.classList.remove('d-n');
      buttonAdded && buttonAdded.classList.remove('d-n')
    } else {
      document.getElementById('out-user-name').textContent = '';
      buttonSignIn && buttonSignIn.classList.remove('d-n');
      buttonNewAccount && buttonNewAccount.classList.add('d-n');
      buttonAdded && buttonAdded.classList.add('d-n')
    }
  });

}

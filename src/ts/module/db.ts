import * as firebase from 'firebase';
import {IAddedSights} from './interfaces';
import {sightsName} from './type';

const firebaseConfig = {
  apiKey: 'AIzaSyBzN_61nfYEPDGkua2csZZDBCKxvgqh16w',
  authDomain: 'yana--coursework.firebaseapp.com',
  databaseURL: 'https://yana--coursework.firebaseio.com',
  projectId: 'yana--coursework',
  storageBucket: 'yana--coursework.appspot.com',
  messagingSenderId: '335551385562',
  appId: '1:335551385562:web:730e45363215ea92f17ae3'
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export function addSights(objAdd: IAddedSights): Promise<void> {
  return db.collection('sights').add(objAdd)
    .then(() => {
      console.log('added')
    })
    .catch(console.error);
}


export function setSights(userName: string, comments: string, oldComments: Array<object>, id: string): Promise<void> {
  return db.collection('sights').doc(id).set({
    feedback: [
      ...oldComments,
      {
        name: userName,
        text: comments
      }
    ]
  }, {merge: true})
    .catch((error) => {
      console.error(error)
    })
}

const fixName = (name: string): string => {
  return name.toLowerCase().split(' ').filter(i => i).join(' ');
};

export function getSights(name: sightsName, streetBoolean?: boolean) {
  const dataSights = [];
  return db.collection('sights')
    .get()
    .then(res => {
      res.forEach((doc): void => {
        const data = doc.data();
        if (!streetBoolean) {
          for (let i = 0; i < data.name.length; i++) {
            if (data.name[i].toLowerCase() === fixName(name)) {
              dataSights.push({data: data, id: doc.id});
            }
          }
        } else {
          if (data.street.toLowerCase() === fixName(name)) {
            dataSights.push({data: data, id: doc.id});
          }
        }
      })
    })
    .then(() => {
      localStorage.setItem('data', JSON.stringify(dataSights));
      return dataSights
    })
    .catch(err => {
      console.error(err)
    })

}


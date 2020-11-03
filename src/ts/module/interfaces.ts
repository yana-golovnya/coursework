export interface IFirebaseConfig {
  apiKey: string
  authDomain: string
  databaseURL: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
}

interface IFeedback {
 name: string
 text: string
}

export interface IAddedSights {
  name: Array<string>
  info: string
  imgArr: Array<string>
  rating: number
  title: string
  feedback?: Array<IFeedback>
  street: string
}

export interface IAddedSightsId extends IAddedSights {
  id: string
}

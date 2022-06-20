import firebase from 'firebase/app'
import 'firebase/firestore'

let firebaseConfig = {
  apiKey: 'AIzaSyDHW7K1WngSrr2u2bC4qC1EJqD0vma2TQA',
  authDomain: 'boardapp-19345.firebaseapp.com',
  projectId: 'boardapp-19345',
  storageBucket: 'boardapp-19345.appspot.com',
  messagingSenderId: '82732480083',
  appId: '1:82732480083:web:86ea9f96044d075222f8a6',
  measurementId: 'G-CK4KPXTGZY'
}

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export default firebase

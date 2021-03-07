import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyAXvZKENbS3MzbXd1That65BA_QyuLk6bU',
  authDomain: 'facebook-messenger-clone-3f32b.firebaseapp.com',
  projectId: 'facebook-messenger-clone-3f32b',
  storageBucket: 'facebook-messenger-clone-3f32b.appspot.com',
  messagingSenderId: '69986038192',
  appId: '1:69986038192:web:4d38c1fdfbb06f039c6675'
})

const db = firebaseApp.firestore()

export default db

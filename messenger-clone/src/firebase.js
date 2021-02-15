import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBgl5wVZrAytDqsA6eo_2PxuGy8VGCpip4",
    authDomain: "massenger-clone-26e8d.firebaseapp.com",
    projectId: "massenger-clone-26e8d",
    storageBucket: "massenger-clone-26e8d.appspot.com",
    messagingSenderId: "919830513533",
    appId: "1:919830513533:web:1a401507238709a54fee14",
    measurementId: "G-R1BKF26K2E"
})
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
export { db, auth };
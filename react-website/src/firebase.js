import firebase from 'firebase';
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC-rcV0oZOeVUmpZ1E-rwKdhRkXtyk5cIM",
    authDomain: "clone-7ef1e.firebaseapp.com",
    projectId: "clone-7ef1e",
    storageBucket: "clone-7ef1e.appspot.com",
    messagingSenderId: "69149833395",
    appId: "1:69149833395:web:69b323b4284fa6b78998c6",
    measurementId: "G-6KMRTD0XC1"
})
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
export { db, auth };
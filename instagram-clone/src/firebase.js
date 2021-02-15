import firebase from 'firebase';
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCBk4_5hFPpvRmiJqS7ePAAwZgKq56hd4o",
    authDomain: "instagram-clone-d9d39.firebaseapp.com",
    projectId: "instagram-clone-d9d39",
    storageBucket: "instagram-clone-d9d39.appspot.com",
    messagingSenderId: "989623922889",
    appId: "1:989623922889:web:479047fc090cda6f1f1d18",
    measurementId: "G-6E5HJF1HQT"

})
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();
export {db, auth, storage};
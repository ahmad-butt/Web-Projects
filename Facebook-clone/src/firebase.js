import firebase from 'firebase';
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAvL12pBH0VoQA-hI-jBuDwg1yf9muhe9Q",
    authDomain: "facebook-clone-b4d45.firebaseapp.com",
    projectId: "facebook-clone-b4d45",
    storageBucket: "facebook-clone-b4d45.appspot.com",
    messagingSenderId: "414919851382",
    appId: "1:414919851382:web:3a022c1730bf6994f28e57",
    measurementId: "G-E1C0EMECJ9"
})
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();
export { db, auth, storage };
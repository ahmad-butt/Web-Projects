import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrcD7a-XNeMWllCs3MgbniHLln82qVe1U",
  authDomain: "whatsapp-mern-43c94.firebaseapp.com",
  projectId: "whatsapp-mern-43c94",
  storageBucket: "whatsapp-mern-43c94.appspot.com",
  messagingSenderId: "753657618529",
  appId: "1:753657618529:web:f18525c7352ee79e798a20",
  measurementId: "G-6D93FGGZVS",
};

const firebaseApp = firebase.initializeApp(firebaseConfig); 

const auth = firebaseApp.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
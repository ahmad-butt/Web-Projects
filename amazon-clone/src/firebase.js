import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-rcV0oZOeVUmpZ1E-rwKdhRkXtyk5cIM",
  authDomain: "clone-7ef1e.firebaseapp.com",
  projectId: "clone-7ef1e",
  storageBucket: "clone-7ef1e.appspot.com",
  messagingSenderId: "69149833395",
  appId: "1:69149833395:web:69b323b4284fa6b78998c6",
  measurementId: "G-6KMRTD0XC1",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebaseApp.auth();

export { auth };

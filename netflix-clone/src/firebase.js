import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBcgNBIofVV6h4OO_za0tq9s_XqaNLRk_w",
    authDomain: "netflix-clone-7dedf.firebaseapp.com",
    projectId: "netflix-clone-7dedf",
    storageBucket: "netflix-clone-7dedf.appspot.com",
    messagingSenderId: "442382825810",
    appId: "1:442382825810:web:1d63bf661c5e81296be28b",
    measurementId: "G-JLR50C7JB0"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

export { auth, db };
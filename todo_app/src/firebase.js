// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBe_R_sfKgB8xVaWl7X2ITXut9XA2BJWmQ",
    authDomain: "todo-app-cp-a36ae.firebaseapp.com",
    projectId: "todo-app-cp-a36ae",
    storageBucket: "todo-app-cp-a36ae.appspot.com",
    messagingSenderId: "939470659414",
    appId: "1:939470659414:web:c25df4661e845770fd40f7",
    measurementId: "G-1F3Q22FZBE"
})
const db = firebaseApp.firestore();
export{db};
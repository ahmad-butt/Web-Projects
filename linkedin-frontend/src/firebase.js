import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyCQIL4RvmpKG2vExO7kUEsoY0JlTctQjLI",
  authDomain: "linkedin-clone-fb813.firebaseapp.com",
  projectId: "linkedin-clone-fb813",
  storageBucket: "linkedin-clone-fb813.appspot.com",
  messagingSenderId: "1097658334131",
  appId: "1:1097658334131:web:237d77e18b49a3971ba9c6",
  measurementId: "G-W22EBDEW0B",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
export { db, storage, auth };

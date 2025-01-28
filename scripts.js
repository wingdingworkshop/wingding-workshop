// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'https://www.gstatic.com/firebasejs/9.x.x/firebase-auth.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALcH4597uMo91X8OHuojGiSd3SkFgKoy0",
  authDomain: "wingding-workshop.firebaseapp.com",
  databaseURL: "https://wingding-workshop-default-rtdb.firebaseio.com",
  projectId: "wingding-workshop",
  storageBucket: "wingding-workshop.firebasestorage.app",
  messagingSenderId: "433616389051",
  appId: "1:433616389051:web:c510b6d6b529f237a5ba9e",
  measurementId: "G-X3QYN587PL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

document.getElementById('google-sign-in-button').addEventListener('click', () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then((result) => {
      const user = result.user;
      console.log('User signed in:', user);
  }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error('Error signing in:', errorCode, errorMessage);
  });
});

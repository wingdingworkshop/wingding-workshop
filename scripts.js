import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js';

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();

const loginButton = document.getElementById('google-signin');
loginButton.addEventListener('click', function() {

  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      window.location.href = "index.html";


    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });

});


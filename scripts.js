import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.x.x/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/9.x.x/firebase-auth.js';

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
const auth = getAuth();

document.addEventListener('DOMContentLoaded', () => {
    const googleSignInButton = document.getElementById('google-signin');
    
    if (googleSignInButton) {
        googleSignInButton.addEventListener('click', () => {
            const provider = new GoogleAuthProvider();
            signInWithPopup(auth, provider)
                .then((result) => {
                    console.log('Successfully signed in:', result.user);
                    window.location.href = 'dashboard.html';
                })
                .catch((error) => {
                    console.error('Error signing in:', error);
                    document.getElementById('error-message').textContent = error.message;
                });
        });
    }
});

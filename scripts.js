// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.x.x/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.x.x/firebase-analytics.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'https://www.gstatic.com/firebasejs/9.x.x/firebase-auth.js';

// Move Firebase config to environment variables
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

function signInWithGoogle() {
  signInWithPopup(auth, provider)
      .then((result) => {
          const user = result.user;
          window.location.href = 'dashboard.html';
      })
      .catch((error) => {
          document.getElementById('error-message').textContent = error.message;
      });
}

function logoutUser() {
  signOut(auth)
      .then(() => {
          window.location.href = 'index.html';
      });
}

document.addEventListener('DOMContentLoaded', () => {
  const googleSignInBtn = document.getElementById('google-signin');
  const logoutBtn = document.getElementById('logout-btn');

  if (googleSignInBtn) {
      googleSignInBtn.addEventListener('click', signInWithGoogle);
  }

  if (logoutBtn) {
      logoutBtn.addEventListener('click', logoutUser);
  }
});

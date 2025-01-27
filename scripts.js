// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.x.x/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.x.x/firebase-analytics.js';

// Firebase configuration
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

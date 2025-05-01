// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIZ2eIbwEYAhKjjd0Di0jwf8YgI_9jug0",
  authDomain: "mitra-6cc2d.firebaseapp.com",
  projectId: "mitra-6cc2d",
  storageBucket: "mitra-6cc2d.firebasestorage.app",
  messagingSenderId: "3457002910",
  appId: "1:3457002910:web:e26cf894847d158f1eba8f",
  measurementId: "G-2JD513HMV9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAquVB8qXnUoaHH0FGEYURA_7JvWinewQ",
  authDomain: "media1-eac72.firebaseapp.com",
  databaseURL: "https://media1-eac72-default-rtdb.firebaseio.com",
  projectId: "media1-eac72",
  storageBucket: "media1-eac72.firebasestorage.app",
  messagingSenderId: "1087553912836",
  appId: "1:1087553912836:web:54070f13ec0998057b3551",
  measurementId: "G-F6NK7D5X6H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
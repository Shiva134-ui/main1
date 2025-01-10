// login.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCAquVB8qXnUoaHH0FGEYURA_7JvWinewQ",
    authDomain: "media1-eac72.firebaseapp.com",
    projectId: "media1-eac72",
    storageBucket: "media1-eac72.appspot.com",
    messagingSenderId: "1087553912836",
    appId: "1:1087553912836:web:54070f13ec0998057b3551",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const emailInput = document.getElementById("email") || document.getElementById("signup-email");
const passwordInput = document.getElementById("password") || document.getElementById("signup-password");
const loginButton = document.getElementById("login-button");
const signupButton = document.getElementById("signup-button");
const logoutButton = document.getElementById("logout-button");

// Handle login
if (loginButton) {
    loginButton.addEventListener("click", () => {
        const email = emailInput.value;
        const password = passwordInput.value;
        signInWithEmailAndPassword(auth, email, password)
            .then(() => window.location.href = "/main.html")  // Make sure main.html is at the root
            .catch((error) => alert(error.message));
    });
}

// Handle signup
if (signupButton) {
    signupButton.addEventListener("click", () => {
        const email = emailInput.value;
        const password = passwordInput.value;
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => window.location.href = "/main.html")  // Make sure main.html is at the root
            .catch((error) => alert(error.message));
    });
}

// Handle logout
if (logoutButton) {
    logoutButton.addEventListener("click", () => {
        signOut(auth)
            .then(() => window.location.href = "/")  // Make sure index.html is at the root
            .catch((error) => alert(error.message));
    });
}

// Monitor authentication state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        // If user is logged in, redirect to main.html
        if (window.location.pathname !== "/main.html") {
            window.location.href = "/main.html";
        }
    } else {
        // If user is not logged in, redirect to index.html or signup.html if needed
        if (window.location.pathname !== "/" && window.location.pathname !== "/html/signup.html") {
            window.location.href = "/";  // Default redirect to index.html
        }
    }
});

// profile.js

//-----------------chevron-btn----------------------//

const chevronleft = document.getElementById('fa-chevron-left');

chevronleft.addEventListener('click', () => {
    if (document.referrer) {
        history.back();
    } else {
        window.location.href = 'main.html';
    }
});

// --------------------------profile-image--------------------------------------

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const userEmail = document.getElementById("user-email");
const logoutButton = document.getElementById("logout-button");
const profilePic = document.getElementById("profile-pic");

const userImages = [
    { "id": 1, "name": "A", "image": "../img/A.jpg" },
    { "id": 2, "name": "B", "image": "../img/B.jpg" },
    { "id": 3, "name": "C", "image": "../img/C.jpg" },
    { "id": 4, "name": "D", "image": "../img/D.jpg" },
    { "id": 5, "name": "E", "image": "../img/E.jpg" },
    { "id": 6, "name": "F", "image": "../img/F.jpg" },
    { "id": 7, "name": "G", "image": "../img/G.jpg" },
    { "id": 8, "name": "H", "image": "../img/H.jpg" },
    { "id": 9, "name": "I", "image": "../img/I.jpg" },
    { "id": 10, "name": "J", "image": "../img/J.jpg" },
    { "id": 11, "name": "K", "image": "../img/K.jpg" },
    { "id": 12, "name": "L", "image": "../img/L.jpg" },
    { "id": 13, "name": "M", "image": "../img/M.jpg" },
    { "id": 14, "name": "N", "image": "../img/N.jpg" },
    { "id": 15, "name": "O", "image": "../img/O.jpg" },
    { "id": 16, "name": "P", "image": "../img/P.jpg" },
    { "id": 17, "name": "Q", "image": "../img/Q.jpg" },
    { "id": 18, "name": "R", "image": "../img/R.jpg" },
    { "id": 19, "name": "S", "image": "../img/S.jpg" },
    { "id": 20, "name": "T", "image": "../img/T.jpg" },
    { "id": 21, "name": "U", "image": "../img/U.jpg" },
    { "id": 22, "name": "V", "image": "../img/V.jpg" },
    { "id": 23, "name": "W", "image": "../img/W.jpg" },
    { "id": 24, "name": "X", "image": "../img/X.jpg" },
    { "id": 25, "name": "Y", "image": "../img/Y.jpg" },
    { "id": 26, "name": "Z", "image": "../img/Z.jpg" }
  ];
  

function updateProfilePicture(email) {
    const firstLetter = email.charAt(0).toUpperCase();

    const user = userImages.find(user => user.name === firstLetter);

    if (user) {
        profilePic.src = user.image;
    } else {
        profilePic.src = "img/user.jpg";
    }
}

onAuthStateChanged(auth, async (user) => {
    if (user) {
        userEmail.textContent = user.email;
        updateProfilePicture(user.email); 
    } else {
        window.location.href = "/"; 
    }
});

if (logoutButton) {
    logoutButton.addEventListener("click", () => {
        signOut(auth)
            .then(() => {
                window.location.href = "/"; 
            })
            .catch((error) => {
                alert(error.message); 
            });
    });
}



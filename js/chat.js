// chat.js

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCAquVB8qXnUoaHH0FGEYURA_7JvWinewQ",
    authDomain: "media1-eac72.firebaseapp.com",
    projectId: "media1-eac72",
    storageBucket: "media1-eac72.appspot.com",
    messagingSenderId: "1087553912836",
    appId: "1:1087553912836:web:54070f13ec0998057b3551",
};

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
const app = initializeApp(firebaseConfig);

import { 
    getFirestore, 
    collection, 
    addDoc, 
    query, 
    orderBy, 
    onSnapshot 
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

import { 
    getAuth, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

const db = getFirestore(app);
const auth = getAuth(app);

const messagesRef = collection(db, "messages");

const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const messagesContainer = document.getElementById("messages");

async function sendMessage() {
    const message = messageInput.value.trim();
    if (message === "") return;

    const user = auth.currentUser;
    if (!user) {
        alert("You must be logged in to send messages!");
        return;
    }

    try {
        await addDoc(messagesRef, {
            sender: user.email,
            message: message,
            timestamp: new Date(),
        });
        messageInput.value = "";
    } catch (error) {
        console.error("Error sending message: ", error);
    }
}

onSnapshot(query(messagesRef, orderBy("timestamp")), (snapshot) => {
    try {
        messagesContainer.innerHTML = "";
        snapshot.forEach((doc) => {
            const { sender, message } = doc.data();
            const messageElement = document.createElement("div");
            messageElement.classList.add("message");
            messageElement.classList.add(sender === auth.currentUser?.email ? "sent" : "received");
            messageElement.textContent = `${sender}: ${message}`;
            messagesContainer.appendChild(messageElement);
        });
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    } catch (error) {
        console.error("Error loading messages: ", error);
    }
});

function loadMessages() {
    onSnapshot(query(messagesRef, orderBy("timestamp")), (snapshot) => {
        messagesContainer.innerHTML = ""; 
        snapshot.forEach((doc) => {
            const { sender, message } = doc.data();
            const messageElement = document.createElement("div");
            messageElement.classList.add("message");
            messageElement.classList.add(sender === auth.currentUser?.email ? "sent" : "received");
            messageElement.textContent = `${sender}: ${message}`;
            messagesContainer.appendChild(messageElement);
        });

        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    });
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(`Logged in as ${user.email}`);
        loadMessages(); 
    } else {
        console.log("User is not logged in");
        messagesContainer.innerHTML = `<p class="info">Please log in to view and send messages.</p>`;
    }
});

sendButton.addEventListener("click", sendMessage);
messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});

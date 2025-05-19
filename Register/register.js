// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAymXEweQm6N51WTVZcvMerHrv71i5dkAA",
  authDomain: "sawonders-4475b.firebaseapp.com",
  projectId: "sawonders-4475b",
  storageBucket: "sawonders-4475b.appspot.com",
  messagingSenderId: "205478134078",
  appId: "1:205478134078:web:71c32e4105b58505696c6f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM loaded and ready
document.addEventListener("DOMContentLoaded", () => {
  const submit = document.getElementById("submit");

  submit.addEventListener("click", (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Please fill in both fields.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User registered:", userCredential.user);

        // Extract username from email
        const username = email.split("@")[0];

        // ✅ Store logged-in username in localStorage
        localStorage.setItem("loggedInUser", username);

        // Redirect to home page
        window.location.href = "/Home/home.html";
      })
      .catch((error) => {
        alert("Error: " + error.message);
        console.error("Firebase error:", error);
      });
  });
});

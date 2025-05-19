// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";

// Firebase configuration (same as in register.js)
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

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.querySelector(".login-button");

  loginButton.addEventListener("click", (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User logged in:", userCredential.user);
        // Redirect to home page
        window.location.href = "/Home/home.html"; // Adjust if needed
      })
      .catch((error) => {
        alert("Login failed: " + error.message);
        console.error("Login error:", error);
      });
  });
});

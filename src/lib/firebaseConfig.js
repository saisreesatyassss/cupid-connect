// lib/firebaseConfig.ts

// importScripts("https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js");
// importScripts("https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging-compat.js");

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { GoogleAuthProvider, User, getAuth, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyACPxShdNv0F5i3xFgH6iA2iw9uUbcmCvI",
  authDomain: "cupid-connect-d7fce.firebaseapp.com",
  projectId: "cupid-connect-d7fce",
  storageBucket: "cupid-connect-d7fce.appspot.com",
  messagingSenderId: "959322105870",
  appId: "1:959322105870:web:6ddc12f97727efb1bd345f",
  measurementId: "G-Q0GFTYFTHN"
};


const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);


// 🔹 Handle Background Notifications
// messaging.onBackgroundMessage((payload) => {
//   console.log("Background Message received: ", payload);
//   self.registration.showNotification(payload.notification.title, {
//     body: payload.notification.body,
//     icon: "/Logo.jpg", // Change this to your app logo
//   });
// });

export { messaging, getToken, onMessage,firebaseApp };

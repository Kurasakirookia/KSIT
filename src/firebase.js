// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoORlVf9uwXbzmxIj_ogIBqoAWCejIRUg",
  authDomain: "learnloop-81b6f.firebaseapp.com",
  projectId: "learnloop-81b6f",
  storageBucket: "learnloop-81b6f.firebasestorage.app",
  messagingSenderId: "971712928534",
  appId: "1:971712928534:web:4a44207bae4983aa850e37",
  measurementId: "G-3Y3RENXG0E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);



export const db = getFirestore(app);  // ✅ Correct way to get Firestore


export { auth };
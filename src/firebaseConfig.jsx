// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'; // Import the auth module
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbbhRZvMHBgSMUuC9o4ejGFpGAyqohFOM",
  authDomain: "stingrays-f3962.firebaseapp.com",
  projectId: "stingrays-f3962",
  storageBucket: "stingrays-f3962.firebasestorage.app",
  messagingSenderId: "395430447626",
  appId: "1:395430447626:web:6b4e59d94419645b4c2df3"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Export the auth instance
export const firestoreDB = getFirestore(app)
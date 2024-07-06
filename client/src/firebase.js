// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "kpvc-estate.firebaseapp.com",
  projectId: "kpvc-estate",
  storageBucket: "kpvc-estate.appspot.com",
  messagingSenderId: "519789371238",
  appId: "1:519789371238:web:0437d8f8f8e3ab5c44f2a7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-2f53b.firebaseapp.com",
  projectId: "mern-estate-2f53b",
  storageBucket: "mern-estate-2f53b.appspot.com",
  messagingSenderId: "800973447356",
  appId: "1:800973447356:web:03660b1c657d883c39b0b9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
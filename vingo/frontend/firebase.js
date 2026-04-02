// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "vingo-1ef70.firebaseapp.com",
  projectId: "vingo-1ef70",
  storageBucket: "vingo-1ef70.firebasestorage.app",
  messagingSenderId: "866310091768",
  appId: "1:866310091768:web:b3577df2695cf8e2c1dc0d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };

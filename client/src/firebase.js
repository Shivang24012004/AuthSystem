// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-62829.firebaseapp.com",
  projectId: "mern-auth-62829",
  storageBucket: "mern-auth-62829.appspot.com",
  messagingSenderId: "178613598502",
  appId: "1:178613598502:web:f284622d7b8150adfa29e7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
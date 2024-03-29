// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setu#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE,
  authDomain: "feedback-list.firebaseapp.com",
  projectId: "feedback-list",
  storageBucket: "feedback-list.appspot.com",
  messagingSenderId: "312734690251",
  appId: "1:312734690251:web:be7d8ea811bd00b58ae44e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
//FIRESTORE
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCznMlN-_Syr1LrSl4UepKtVbiRxXypQ-k",
  authDomain: "atividade-yuri.firebaseapp.com",
  projectId: "atividade-yuri",
  storageBucket: "atividade-yuri.firebasestorage.app",
  messagingSenderId: "383429968180",
  appId: "1:383429968180:web:a8984f547a870223b36561",
  measurementId: "G-DHZ1Y15JCM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Autenticação
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Firestore
const db = getFirestore(app);

export { auth, provider, db };
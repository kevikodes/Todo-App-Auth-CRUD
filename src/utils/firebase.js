// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Import { getAuth } from 'firebase/auth"

// Make sure to import YOUR firebaseConfig if you are git cloning this
const firebaseConfig = {
  apiKey: "AIzaSyBWFhK_o3kar2MQkgVFfPQdu5ZTDNn5v9o",
  authDomain: "todo-app-1a7bc.firebaseapp.com",
  projectId: "todo-app-1a7bc",
  storageBucket: "todo-app-1a7bc.appspot.com",
  messagingSenderId: "876650128831",
  appId: "1:876650128831:web:ba542e1bae5e206dfaad0a",
  measurementId: "G-94HTVJJ9LN",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth(app);

export { db, auth };

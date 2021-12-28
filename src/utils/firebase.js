// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// Import { getAuth } from 'firebase/auth"

// Make sure to import YOUR firebaseConfig if you are git cloning this
const firebaseConfig = {
  apiKey: "AIzaSyAs5YfkTfeI9aJ6bOMBgycRPOxQvoGw9bo",
  authDomain: "todo-app-b94a6.firebaseapp.com",
  projectId: "todo-app-b94a6",
  storageBucket: "todo-app-b94a6.appspot.com",
  messagingSenderId: "601606003999",
  appId: "1:601606003999:web:e48fff689bbf09a41aa42a",
  measurementId: "G-LY9YS9JGEJ"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()

export default db

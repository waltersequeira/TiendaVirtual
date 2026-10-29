// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB33wJqiJhK17JfxKWe0YmKnBHVW1Mkib0",
  authDomain: "tiendavirtual2-0-cff39.firebaseapp.com",
  projectId: "tiendavirtual2-0-cff39",
  storageBucket: "tiendavirtual2-0-cff39.firebasestorage.app",
  messagingSenderId: "1026215048663",
  appId: "1:1026215048663:web:c703b169cd0bec7f3a8792",
  measurementId: "G-LB9ECBWGHT"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const auth = getAuth(app);
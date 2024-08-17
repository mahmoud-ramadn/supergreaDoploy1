// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA3MshAhXoDDqRcQG-PrSJ7wQ6fzEalXmc",
  authDomain: "test-94cba.firebaseapp.com",
  projectId: "test-94cba",
  storageBucket: "test-94cba.appspot.com",
  messagingSenderId: "964299750036",
  appId: "1:964299750036:web:4d950c0fa6debd7660d281",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();

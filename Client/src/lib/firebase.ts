// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDsH_xhrfoR-ANbEJ0D48CplMYXbrTAT_0",
  authDomain: "supergear-cba7f.firebaseapp.com",
  projectId: "supergear-cba7f",
  storageBucket: "supergear-cba7f.appspot.com",
  messagingSenderId: "613518317976",
  appId: "1:613518317976:web:695106fcf518e49e93b3ed"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
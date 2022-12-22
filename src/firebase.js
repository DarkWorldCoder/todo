// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhZ4iABLtlmj_p184vruRk18HQ4nX4yTU",
  authDomain: "todonow-4ab3c.firebaseapp.com",
  projectId: "todonow-4ab3c",
  storageBucket: "todonow-4ab3c.appspot.com",
  messagingSenderId: "702630875723",
  appId: "1:702630875723:web:0643ed832b3eebcafef3ce",
  measurementId: "G-CPQSERX660"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore(app);
export default app;
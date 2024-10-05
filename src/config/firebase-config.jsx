// Import the functions you need from the SDKs you need
import {getFirestore} from "firebase/firestore"
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-jwkb_sa8JKRlv9vBpjD5fzI2Nrf0CG0",
  authDomain: "expense-tracker-5c3e2.firebaseapp.com",
  projectId: "expense-tracker-5c3e2",
  storageBucket: "expense-tracker-5c3e2.appspot.com",
  messagingSenderId: "1045694532028",
  appId: "1:1045694532028:web:2488ab47a9fbec6814c3b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider() 

export const db= getFirestore(app);

//firebase login
//firebase init
//fir
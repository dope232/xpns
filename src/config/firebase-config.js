// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider} from "firebase/auth";

import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGF2dV31983oaLFymID4hGmBpLNaLZYnM",
  authDomain: "xpns-e15b0.firebaseapp.com",
  projectId: "xpns-e15b0",
  storageBucket: "xpns-e15b0.appspot.com",
  messagingSenderId: "520009067660",
  appId: "1:520009067660:web:f22333d80660ab6fd0dfa9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);

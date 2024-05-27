import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { FirebaseConfig } from "./types";

// configuration object for firebase
const firebaseConfig: FirebaseConfig = {
  apiKey: "AIzaSyCqzRzqQWqYi5XfiMfkfdxnwNfUajqbhMM",
  authDomain: "food-recipe-df027.firebaseapp.com",
  projectId: "food-recipe-df027",
  storageBucket: "food-recipe-df027.appspot.com",
  messagingSenderId: "814947443592",
  appId: "1:814947443592:web:888387b3b2be8f8ed1d03d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
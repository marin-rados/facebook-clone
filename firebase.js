import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCW1p9Ns955dq8gRsCgLpi1E3kG3qHxBeE",
  authDomain: "facebook-clone-89d3e.firebaseapp.com",
  projectId: "facebook-clone-89d3e",
  storageBucket: "facebook-clone-89d3e.appspot.com",
  messagingSenderId: "430842914553",
  appId: "1:430842914553:web:7c3238e42bb96b08fee428",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyClgGCLm-oHTBtMIJJa3tXVF9BdU7rr16k",
  authDomain: "gharbudget-b9586.firebaseapp.com",
  projectId: "gharbudget-b9586",
  storageBucket: "gharbudget-b9586.appspot.com",
  messagingSenderId: "3467388865",
  appId: "1:3467388865:web:8b5c6883334ce072967140",
};

// Use existing app if already initialized
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export { app };
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

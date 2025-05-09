import { initializeApp, getApps, getApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyClgGCLm-oHTBtMIJJa3tXVF9BdU7rr16k",
  authDomain: "gharbudget-b9586.firebaseapp.com",
  projectId: "gharbudget-b9586",
  storageBucket: "gharbudget-b9586.appspot.com",
  messagingSenderId: "3467388865",
  appId: "1:3467388865:web:8b5c6883334ce072967140",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Conditionally export auth
export const auth =
  Platform.OS === "web"
    ? getAuth(app)
    : initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage),
      });

export const db = getFirestore(app);
export const storage = getStorage(app);

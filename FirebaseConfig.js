import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Optionally import the services that you want to use
// import {...} from 'firebase/auth';
// import {...} from 'firebase/database';
// import {...} from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyClgGCLm-oHTBtMIJJa3tXVF9BdU7rr16k",
  authDomain: "gharbudget-b9586.firebaseapp.com",
  projectId: "gharbudget-b9586",
  storageBucket: "gharbudget-b9586.firebasestorage.app",
  messagingSenderId: "3467388865",
  appId: "1:3467388865:web:8b5c6883334ce072967140",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

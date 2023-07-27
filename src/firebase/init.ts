// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APP_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_APP_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_APP_PID,
  storageBucket: import.meta.env.VITE_FIREBASE_APP_SB,
  messagingSenderId: import.meta.env.VITE_FIREBASE_APP_SID,
  appId: import.meta.env.VITE_FIREBASE_APP_APPID,
  measurementId: import.meta.env.VITE_FIREBASE_APP_MID
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

export default firebaseApp
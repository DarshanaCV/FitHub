// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYV3dBqYriI_14QlzQt9_BrWKl8t4N9so",
  authDomain: "fithub-d1363.firebaseapp.com",
  databaseURL: "https://fithub-d1363-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fithub-d1363",
  storageBucket: "fithub-d1363.appspot.com",
  messagingSenderId: "466663106161",
  appId: "1:466663106161:web:333617b189099f8a5e5dd0",
  measurementId: "G-PZD248YFS8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
export const auth = getAuth(app);
export {database}
export default app;
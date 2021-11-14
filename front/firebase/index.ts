// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDyrskObmMrFjG9I6LezFKQqbBVoWrJoo",
  authDomain: "find-studio-jp.firebaseapp.com",
  projectId: "find-studio-jp",
  storageBucket: "find-studio-jp.appspot.com",
  messagingSenderId: "482141752807",
  appId: "1:482141752807:web:70209dc2c71b8439f24142",
  measurementId: "G-SJ2QKF0YXP",
};

/**FireBase App */
export const app = initializeApp(firebaseConfig);
/**FireBase DB */
export const db = getFirestore(app);
const analytics = getAnalytics(app);

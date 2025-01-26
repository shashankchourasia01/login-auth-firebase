

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, push, set, onValue, remove, update } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQWgFWvFWc6M-BWU26czOWxM5T2lyqLUo",
  authDomain: "loginauth-e9a16.firebaseapp.com",
  projectId: "loginauth-e9a16",
  storageBucket: "loginauth-e9a16.appspot.com",
  messagingSenderId: "53622786710",
  appId: "1:53622786710:web:cc25c4597eac26323690b7",
  databaseURL: "https://loginauth-e9a16-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database, ref, push, set, onValue, remove, update };

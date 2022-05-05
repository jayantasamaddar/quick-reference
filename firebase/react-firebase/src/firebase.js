import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const { REACT_APP_FIREBASE_API_KEY, REACT_APP_FIREBASE_APP_PROJECT_ID, REACT_APP_FIREBASE_MESSAGE_SENDER_ID, REACT_APP_FIREBASE_APP_ID } = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: `${REACT_APP_FIREBASE_APP_PROJECT_ID}.firebaseapp.com`,
  projectId: REACT_APP_FIREBASE_APP_PROJECT_ID,
  storageBucket: `${REACT_APP_FIREBASE_APP_PROJECT_ID}.appspot.com`,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, getDocs, doc, setDoc, updateDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDemoApiKey123456789",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "dayflow-hrms-demo.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "dayflow-hrms-demo",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "dayflow-hrms-demo.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { 
  app, 
  auth, 
  db,
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc
};

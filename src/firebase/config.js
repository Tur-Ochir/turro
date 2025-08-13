import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyAZ8MKSglkTJv5cuUTHTrCPzfAXafJ6TnQ",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "turro-c7c6a.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "turro-c7c6a",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "turro-c7c6a.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "434465363409",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:434465363409:web:d7a108b4789c6533e0bcf0",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-9B2HR80RCR"
};

// Check if Firebase config is valid
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error('Firebase configuration is missing required fields');
}

let app;
let auth;
let db;
let storage;
let isFirebaseEnabled = false;

try {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);
  
  // Initialize Firebase services
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  
  isFirebaseEnabled = true;
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase:', error);
  // Create fallback objects to prevent crashes
  auth = null;
  db = null;
  storage = null;
  isFirebaseEnabled = false;
}

// Export a function to check if Firebase is enabled
export const isFirebaseAvailable = () => isFirebaseEnabled;

export { auth, db, storage };
export default app;

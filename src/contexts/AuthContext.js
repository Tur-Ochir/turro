import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, isFirebaseAvailable } from '../firebase/config';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// Development mode flag - set to true to enable development mode without Firebase
const DEVELOPMENT_MODE = true;

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function signup(email, password, displayName) {
    try {
      // Check if Firebase is available
      if (!isFirebaseAvailable() && !DEVELOPMENT_MODE) {
        throw new Error('Firebase authentication is not available. Please check your connection.');
      }

      // Development mode: simulate successful signup
      if (DEVELOPMENT_MODE && !isFirebaseAvailable()) {
        console.log('Development mode: Simulating user signup');
        const mockUser = {
          uid: 'dev-user-' + Date.now(),
          email,
          displayName,
          emailVerified: true
        };
        setCurrentUser(mockUser);
        return { user: mockUser };
      }

      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName });
      
      // Create user profile in Firestore only if Firebase is available
      if (isFirebaseAvailable()) {
        try {
          await setDoc(doc(db, 'users', result.user.uid), {
            displayName,
            email,
            createdAt: new Date(),
            role: 'student',
            enrolledCourses: [],
            completedCourses: []
          });
        } catch (firestoreError) {
          console.error('Error creating user profile in Firestore:', firestoreError);
          // Don't throw error here, user account was created successfully
        }
      }
      
      return result;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }

  function login(email, password) {
    try {
      // Check if Firebase is available
      if (!isFirebaseAvailable() && !DEVELOPMENT_MODE) {
        throw new Error('Firebase authentication is not available. Please check your connection.');
      }

      // Development mode: simulate successful login
      if (DEVELOPMENT_MODE && !isFirebaseAvailable()) {
        console.log('Development mode: Simulating user login');
        const mockUser = {
          uid: 'dev-user-' + Date.now(),
          email,
          displayName: email.split('@')[0],
          emailVerified: true
        };
        setCurrentUser(mockUser);
        return Promise.resolve({ user: mockUser });
      }

      return signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  function logout() {
    try {
      // Check if Firebase is available
      if (!isFirebaseAvailable() && !DEVELOPMENT_MODE) {
        throw new Error('Firebase authentication is not available. Please check your connection.');
      }

      // Development mode: simulate logout
      if (DEVELOPMENT_MODE && !isFirebaseAvailable()) {
        console.log('Development mode: Simulating user logout');
        setCurrentUser(null);
        return Promise.resolve();
      }

      return signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  async function getUserProfile(uid) {
    try {
      // Check if Firebase is available
      if (!isFirebaseAvailable()) {
        console.log('Firebase not available, returning null profile');
        return null;
      }

      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        return userDoc.data();
      }
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }

  useEffect(() => {
    // Check if Firebase is available
    if (!isFirebaseAvailable() && !DEVELOPMENT_MODE) {
      console.log('Firebase not available, skipping auth state listener');
      setLoading(false);
      return;
    }

    // Development mode: skip auth state listener
    if (DEVELOPMENT_MODE && !isFirebaseAvailable()) {
      console.log('Development mode: Skipping auth state listener');
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    getUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

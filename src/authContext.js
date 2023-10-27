import { auth } from './firebase';
import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth';

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("No existe AuthProvider");
  return context;
};

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };
  const logout = () => signOut(auth);
  const resetPassword = async (email) => sendPasswordResetEmail(auth, email);

  useEffect(() => {
    const unsubuscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubuscribe();
  }, []);

  return (
    <authContext.Provider value={{ signup, login, user, logout, loading, loginWithGoogle, resetPassword, }}>
      {!loading && children}
    </authContext.Provider>
  )
}
import React,{createContext, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { auth,database } from '../firebase-config';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged
 } from 'firebase/auth';
 import { 
  doc, 
  setDoc 
} from 'firebase/firestore';

const GlobalContextProvider = createContext({});

const GlobalContextContainer = ({children}:any) => {
  // Authentication Functionality
  const [currentUser, setCurrentUser] = useState<any[]>([]);
  const navigate = useNavigate();

  // Sign up Function
  const signUp = async (email:string, password:any, data:any[]) => {
   await createUserWithEmailAndPassword(auth, email, password).then(async (authenticateUser) => {
      const userRef = doc(database,"userProfiles", authenticateUser.user.uid);
      await setDoc(userRef,{...data}).then(() => {
        console.log("User Registration successfully");
        navigate("/login")
      })
    }).catch((error) => {
      console.log(error.message)
    })
  }
  return (
    <GlobalContextProvider.Provider value={{signUp}}>
        {children}
    </GlobalContextProvider.Provider>
  )
}

export  {
    GlobalContextContainer,
    GlobalContextProvider
}

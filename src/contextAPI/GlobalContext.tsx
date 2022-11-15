import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth, database } from '../firebase-config';
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

const GlobalContextContainer = ({ children }: any) => {

  const navigate = useNavigate();

  // Authentication Functionality
  const [currentUser, setCurrentUser] = useState<any[]>([]);

  // Sign up Function
  const signUp = async (email: string, password: any, data: any[]) => {
    await createUserWithEmailAndPassword(auth, email, password).then(async (authenticateUser) => {
      const userRef = doc(database, "userProfiles", authenticateUser.user.uid);
      await setDoc(userRef, { ...data }).then(() => {
        console.log("User Registration Successfully");
        navigate("/login")
      })
    }).catch((error) => {
      console.log(error.message)
    })
  }

  // Login Function

  const login = async (email: string, password: any) => {
    await signInWithEmailAndPassword(auth, email, password).then(() => {
      console.log("User Login Successfully");
      navigate("/")
    }).catch((error) => {
      console.log(error.message)
    })
  }

  // Logout Function
  const logout = async () => {
    await signOut(auth).then(() => {
      console.log("LogOut Successfully")
      navigate("/login")
    }).catch((error) => {
      console.log(error.message)
    })
  }

  // Reset Pasword

  const resetpass = async (email: string) => {
    await sendPasswordResetEmail(auth, email).then(() => {
      console.log("Your Reset Email Sent succeefully");
      navigate("/login")
    }).catch((error) => {
      console.log(error.message)
    })
  }

  // CurrentUser Details

  useEffect(() => {
    const UserAuth = onAuthStateChanged(auth,(currentUser:any) => {
      setCurrentUser(currentUser);
    })
    return () => {
      UserAuth();
    }
  })
  return (
    <GlobalContextProvider.Provider value={{ signUp, login, logout, resetpass, currentUser }}>
      {children}
    </GlobalContextProvider.Provider>
  )
}

export {
  GlobalContextContainer,
  GlobalContextProvider
}

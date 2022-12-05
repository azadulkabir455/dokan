import React, { createContext, useState, useEffect, useReducer } from 'react'
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
  const [currentUser, setCurrentUser] = useState<any>([]);
  // Sign up Function
  const signUp = async (email: string, password: any, data: any[]) => {
    await createUserWithEmailAndPassword(auth, email, password).then(async (authenticateUser: any) => {
      const userRef = doc(database, "userProfiles", authenticateUser.user.uid);
      // For Chat app
      await setDoc(doc(database, "userChats", authenticateUser.user.uid), {});
      // For User Data
      await setDoc(userRef, { ...data, id: authenticateUser.user.uid }).then(() => {
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
    const UserAuth = onAuthStateChanged(auth, (currentUser: any) => {
      setCurrentUser(currentUser);
    })
    return () => {
      UserAuth();
    }
  })

  // For Chat Aplication
  const initialState = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state:any, action:any) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId: currentUser.uid > action.payload.uid ? currentUser.uid + action.payload.uid : action.payload.uid + currentUser.uid,
        };

      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(chatReducer, initialState);
  return (
    <GlobalContextProvider.Provider value={{ signUp, login, logout, resetpass, currentUser, data: state, dispatch }}>
      {children}
    </GlobalContextProvider.Provider>
  )
}

export {
  GlobalContextContainer,
  GlobalContextProvider
}

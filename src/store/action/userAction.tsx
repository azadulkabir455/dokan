import { useContext,useState } from "react";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GlobalContextProvider } from "../../contextAPI/GlobalContext"
import { database } from "../../firebase-config";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";



const getUsers: any = createAsyncThunk("users", async () => {
    const collectionRef = collection(database, "userProfiles");
    const usersData = await getDocs(collectionRef);
    const users = usersData.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return users;
})

const getUser: any = createAsyncThunk("user", async () => {
    const { currentUser }: any = useContext(GlobalContextProvider);
    const userRef = doc(database, "userProfiles", 'OcOq3AE1hTcb4kc0Oc95pv1lB6s1')
    const userData = await getDoc(userRef);
    return userData;
})

export {
    getUsers,
    getUser
}
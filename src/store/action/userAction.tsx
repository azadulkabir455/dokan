import { createAsyncThunk } from "@reduxjs/toolkit";
import { database } from "../../firebase-config";
import { collection, getDocs} from "firebase/firestore";

// import { useContext,useState } from "react";
// import { GlobalContextProvider } from "../../contextAPI/GlobalContext"
// import { useSelector } from "react-redux";



const getUsers: any = createAsyncThunk("users", async () => {
    const collectionRef = collection(database, "userProfiles");
    const usersData = await getDocs(collectionRef);
    const users = usersData.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return users;
})

// const getUser: any = createAsyncThunk("user", async () => {
//     const { currentUser }: any = useContext(GlobalContextProvider);
//     const {users} = useSelector((state:any) => state.user);
//     const userData = users.filter((user:any) => user.id === currentUser.uid)
//     return userData;
// })

export {
    getUsers
}
import { createAsyncThunk } from "@reduxjs/toolkit";
import { database } from "../../firebase-config";
import { collection, getDocs} from "firebase/firestore";


const getPosts:any = createAsyncThunk("posts", async () => {
    const postRef = collection(database,"posts");
    const getPostsRes = await getDocs(postRef);
    const getPosts = getPostsRes.docs.map((doc) => ({...doc.data(), id: doc.id}));
    return getPosts;
})

export {
    getPosts
}
import { createSlice } from "@reduxjs/toolkit";
import { database } from "../../firebase-config";
import { collection, addDoc, doc, deleteDoc } from "firebase/firestore"
import { getPosts } from "../action/postAction";

const postReducers = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        postsContaner: [],
        post: {},
        error: {},
        loading: false,

    },
    reducers: {
        addPost: (state, action) => {
            const postRef = collection(database, "posts");
            addDoc(postRef, action.payload).then(() => {
                console.log("Post Data Save successfully");
            }, (error) => {
                console.log(error.message);
            })
        },
        deletePost: (state, action) => {
            if (window.confirm("Are you sure to delete post !")) {
                const singlePostRef = doc(database, "posts", action.payload);
                deleteDoc(singlePostRef).then(() => {
                    console.log("Post delete successfully")
                }).catch((error) => {
                    console.log(error.message)
                })
            }
        },
        searchPosts: (state, action) => {
            state.posts = state.postsContaner.filter((post: any) => post.postName.toLowerCase().includes(action.payload));
        },
        filterPosts: (state, action) => {
            // state.posts = state.postsContaner.filter((post:any))
            console.log(action.payload)
        }
    },
    extraReducers: {
        [getPosts.pending]: (state, action) => {
            state.loading = true;
        },
        [getPosts.fulfilled]: (state, action) => {
            state.posts = action.payload;
            state.postsContaner = action.payload;
            state.loading = false;
        },
        [getPosts.error]: (state, action) => {
            state.error = action.payload;
            state.loading = false
        }
    }
})

export const { addPost, deletePost, searchPosts, filterPosts } = postReducers.actions;
export default postReducers.reducer;
import React,{useContext} from 'react'
import { GlobalContextProvider } from '../../contextAPI/GlobalContext';
import { database } from '../../firebase-config';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { BsFillHeartFill, BsHeart } from "react-icons/bs";
import { toast } from "react-toastify";

export default function LikeCount({ likes, id }: any) {
    const {currentUser}:any  = useContext(GlobalContextProvider)

    const likeRef = doc (database, "posts", id)
    const likeHandler = () => {
        if(likes?.includes(currentUser.uid)) {
            updateDoc(likeRef,{likes: arrayRemove(currentUser.uid)}).then(() => {
                console.log("You dislike this post")
                toast("You dislike this post..",{type:"error"});
            }).catch((error) => {
                console.log(error.message);
            })
        }else {
            updateDoc(likeRef, {likes: arrayUnion(currentUser.uid)}).then(() => {
                toast("You like this post..",{type:"success"});
            }).catch((error) => {
                console.log(error.message)
            })
        }
    }
    return (
        <>
            <button className='btn btn-sm btn-primary rounded-pill' onClick={likeHandler}>
                {
                    likes?.includes(currentUser.uid)? 
                    <>
                        <BsFillHeartFill />
                        
                    </>:
                    <>
                        <BsHeart />
                    </>
                } {likes.length}
            </button>
        </>
    )
}

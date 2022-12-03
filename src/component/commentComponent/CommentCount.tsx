import React, { useState, useContext, useEffect } from 'react'
import { GlobalContextProvider } from '../../contextAPI/GlobalContext';
import { useSelector } from 'react-redux';
import { database } from '../../firebase-config';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { BsVectorPen, BsFillTrashFill } from "react-icons/bs";
import { v4 } from 'uuid';
import { toast } from 'react-toastify';

export default function CommentCount({ id, getComments }: any) {
    const [comment, setComment] = useState<string>("");
    const [comments, setComments] = useState<any>(getComments);

    useEffect(() => {
        setComments(getComments);
    },[comments,getComments,comment])

    const { currentUser }: any = useContext(GlobalContextProvider);
    const { users } = useSelector((state: any) => state.users);
    const user = users.find((user: any) => user.id === currentUser.uid);
    const commentRef = doc(database, "posts", id);

    // Fucntion for create comment
    const commentHandler = (e: any) => {
        if (e.key === "Enter") {
            updateDoc(commentRef, {
                comments: arrayUnion({
                    user: currentUser.uid,
                    userName: user.name,
                    userImage: user.userImgUrl,
                    userRole: user.role,
                    comment: comment,
                    createdAt: new Date(),
                    commentId: v4(),
                })
            }).then(() => {
                setComment("");
                toast("Commented successfully..", {type:"success"})
            }).catch((error) => {
                console.log(error.message)
            })
        }
    }
    // Function for delete comment
    const deleteCommentHandler = (comment:any) => {
       updateDoc(commentRef, {
        comments:arrayRemove(comment),
    }).then(() => {
            toast("Comment Delete successfully..", {type:"success"})
        })
    }
    // Extract Time from Timestamp
    const getDate = (date: any) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const houre = date.getHours();
        const min = date.getMinutes();
        const combineDate = year + "-" + month + "-" + day + " " + houre + ":" + min;
        return combineDate + (houre <= 12 ? "am" : "pm");
    }
    return (
        <>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group mb-4 p-3 shadow rounded">
                    <label htmlFor="comment" className="form-label text-primary"><b>Comment Here</b></label>
                    <div className="input-group">
                        <span className="input-group-text"><BsVectorPen /></span>
                        <input type="text"
                            className="form-control"
                            id="comment"
                            name="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            onKeyUp={(e) => commentHandler(e)}
                            placeholder="Write your comment here" />
                    </div>
                </div>
            </form>
            <div className="commentContainer p-3 shadow rounded">
                {
                    comments.map((comment: any) =>
                        <div className='m-2 p-3 shadow rounded'>
                            <div className="info d-flex justify-content-between">
                                <div className="userInfo d-flex align-items-center">
                                    <img src={comment.userImage} alt="" style={{ width: "30px", height: "30px" }} className="rounded-circle" />
                                    <div className="userDetails ms-2">
                                        <p className='m-0'><b>{comment.userName}</b> <small className='text-primary'>({comment.userRole})</small></p>
                                        <small className='text-secondary'>{getDate(new Date(comment.createdAt.seconds * 1000))}</small>
                                    </div>
                                </div>
                                {
                                    comment.user === currentUser.uid ?
                                        <div className="action">
                                            <button className="btn btn-sm btn-primary rounded-circle" onClick={() => deleteCommentHandler(comment)}><BsFillTrashFill /></button>
                                        </div>:
                                        ""
                                }
                            </div>
                            <div className="comment">
                                <p className='m-0 pt-3'>{comment.comment}</p>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}

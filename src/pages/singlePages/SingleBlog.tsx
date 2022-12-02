import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BsVectorPen } from "react-icons/bs";

export default function SingleBlog() {
    const { id } = useParams();
    const { posts } = useSelector((state: any) => state.posts)
    const singlePost = posts.find((post: any) => post.id === id);
    console.log(singlePost)
    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-8  mx-auto">
                        <img src={singlePost.imgUrl} alt="blog img" className='rounded' style={{ width: "100%", height: "450px", objectFit: "cover" }} />
                        <h3 className='mt-4'>{singlePost.postName}</h3>
                        <p className='mt-2'>{singlePost.post}</p>
                        <p className='mt-2'>{singlePost.post}</p>
                        <div className="commentContainer">
                            <form>
                                <div className="form-group mb-3">
                                    <label htmlFor="email" className="form-label text-primary"><b>Comment Here</b></label>
                                    <div className="input-group">
                                        <span className="input-group-text"><BsVectorPen /></span>
                                        <input type="email" className="form-control" id="email" value={""} name="email" placeholder="Write your comment here" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

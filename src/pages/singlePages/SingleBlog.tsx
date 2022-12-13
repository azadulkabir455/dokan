import React,{useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CommentCount from '../../component/commentComponent/CommentCount';
import { getPosts } from '../../store/action/postAction';


export default function SingleBlog() {
    const { id } = useParams();
    const { posts, loading } = useSelector((state: any) => state.posts)
    const singlePost = posts && posts.find((post: any) => post.id === id);
    const getComments = singlePost && singlePost.comments;
    console.log(id, posts, singlePost)
    const dispatch = useDispatch();
    
    useEffect(() => {
       const getData = () => {
        dispatch(getPosts());
       }
       getData();
      },[])

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    {
                        loading?
                        <><h1>Loading post...</h1></>:
                        singlePost && 
                        <div className="col-8  mx-auto">
                            <img src={singlePost.imgUrl} alt="blog img" className='rounded' style={{ width: "100%", height: "450px", objectFit: "cover" }} />
                            <h3 className='mt-4'>{singlePost.postName}</h3>
                            <p className='mt-2'>{singlePost.post}</p>
                            <div className="comment mt-5">
                                <CommentCount id={id} getComments={getComments}/>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

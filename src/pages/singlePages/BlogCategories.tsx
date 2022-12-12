import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../../store/action/postAction'
import { Link } from 'react-router-dom'
import LikeCount from '../../component/likeComponent/LikeCount'
import "../../assets/css/home.scss"

export default function BlogCategories() {
  const { type } = useParams()
  const { posts, loading } = useSelector((state: any) => state.posts)
  const postCategories = posts && posts.filter((item: any) => item.postCategories == type)
  console.log(postCategories)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPosts());
  }, [])

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
  // Shorten post Content
  const getPostContentShort: any = (content: string) => {
    return content.slice(0, 130) + "..."
  } 
  return (

    <>
      <div className="banner">
        <h3 className='p-5 bg-danger text-white text-uppercase text-center mb-5'>{type}</h3>
      </div>
      <div className="container homeCointainer">
        <div className="row">
          {
            postCategories && postCategories.map((item: any) =>
              loading ?
                <>
                  <h1>Loading</h1>
                </> :
                <>
                  <div className="col-12 col-lg-4">
                    <div className="singleBlog p-4 mb-4 shadow rounded" key={item.id}>
                      <div className="user d-flex mb-3">
                        <div className="userImg ">
                          <img src={item.userDetails.userImgUrl} alt="" className='rounded-circle'  />
                        </div>
                        <div className="userInfo ms-3">
                          <h6 className='m-0'>{item.userDetails.name} <small className='text-primary ps-1'>({item.userDetails.role})</small></h6>
                          <small className="text-danger ">Date: {getDate(new Date(item.postDate.seconds * 1000))}</small>
                        </div>
                      </div>
                      <Link to={`/blogs/${item.id}`}><img src={item.imgUrl} alt="" className='rounded mb-4' style={{height: "200px"}}/></Link>
                      <div className="titleContet d-flex align-items-start">
                        <h3 className='text-capitalize'>{item.postName} </h3>
                        <small className='badge bg-secondary text-capitalize ms-2 px-2 pb-2 pt-1 rounded-pill'>
                          <Link to={`/categories/${item.postCategories}`} className="text-white text-decoration-none">
                            {item.postCategories}
                          </Link>
                        </small>
                      </div>
                      <p className='mb-4'>{getPostContentShort(item.post)} <strong className='link-primary text-bold'>Read more</strong></p>
                      <hr />
                      <div className="blogActivity d-flex justify-content-between">
                        <div className="likeComment d-flex">
                          <div className="like">
                            <LikeCount id={item.id} likes={item.likes} />
                          </div>
                          <div className="comment ps-1">
                            <button className='btn btn-sm btn-primary rounded-pill'>comment {item.comments.length}</button>
                          </div>
                        </div>
                        {/* <div className="blogAction">
                          {
                            post.userDetails.id === currentUser.uid ?
                              <div className="dropdown">
                                <span data-bs-toggle="dropdown"><BsThreeDotsVertical /></span>
                                <ul className="dropdown-menu">
                                  <li>
                                    <span
                                      className="dropdown-item"
                                      data-bs-toggle="modal"
                                      data-bs-target="#editModal"
                                      onClick={() => prefillPost(post.postName, post.postCategories, post.post, post.id)}
                                    >
                                      Edit
                                    </span>
                                  </li>
                                  <li><span className="dropdown-item" onClick={() => deleteSinglePost(post.id)}>Delete</span></li>
                                </ul>
                              </div> :
                              ""
                          }
                        </div> */}
                      </div>
                    </div>
                  </div>
                </>

            )
          }
        </div>
      </div>
    </>
  )
}

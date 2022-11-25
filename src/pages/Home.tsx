import React, { useContext, useEffect, ChangeEvent, useState } from 'react'
import { GlobalContextProvider } from '../contextAPI/GlobalContext'
import { BsSearch, BsThreeDotsVertical, BsLayersHalf, BsCardList, BsFillHandThumbsUpFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../store/action/postAction';
import { deletePost, editPost, searchPosts, filterPosts } from '../store/reducers/postReducers';
import "../assets/css/home.scss"

export default function Home() {
  // Current User form Context Api
  const { currentUser }: any = useContext(GlobalContextProvider)
  // For Post Edit useState
  const [postName, setPostName] = useState<string>('')
  const [postCategories, setPostCategories] = useState<string>('defaultValue')
  const [post, setPost] = useState<string>("Write your post")
  const [id, setId] = useState<number | null>(null)
  const editPostCombineData = { postName, postCategories, post, id }

  // For filtering
  const [checkValue, setCheckValue] = useState<any[]>([]);

  const dispatch = useDispatch()
  const { posts, loading } = useSelector((state: any) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [getPosts])

  // Function for delete Post
  const deleteSinglePost: any = (id: any) => {
    dispatch(deletePost(id))
  }
  // Function for Prefill and edit post
  const prefillPost = (name: string, categories: string, post: string, id: number) => {
    setPostName(name);
    setPostCategories(categories);
    setPost(post);
    setId(id);
  }
  const editPostData = () => {
    dispatch(editPost(editPostCombineData));
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

  // Shorten post Content
  const getPostContentShort: any = (content: string) => {
    return content.slice(0, 130) + "..."
  }
  // Fucntion for comment hide and show
  const toggleComment = () => {
    let commentForm: any = document.querySelector("#commentForm");
    // if (commentForm.style.display === "none") {
    //   commentForm.style.display = "block";
    // } else {
    //   commentForm.style.display = "none";
    // }
  }
  // Function for Searching post
  const findPost = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(searchPosts(e.target.value));
  }

  // Function for Filtering post
  const checkHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const checked = e.target.checked;
    if(checked) {
      setCheckValue([...checkValue, value]);
      dispatch(filterPosts({ checkValue }))
    }else {
      setCheckValue(checkValue.filter((e) => (e !== value)))
      dispatch(filterPosts({ checkValue }))
    }
    
  }
  return (
    <>
      <div className="container homeCointainer ">
        <div className="row  g-4 mt-4">
          <div className="col-12 col-lg-3">
            <div className="searchAction">
              <div className="searchBlog p-4 shadow rounded">
                <h6 className='text-uppercase mb-2'>Search your <span className='text-primary'>post</span></h6>
                <form>
                  <div className="form-group">
                    <div className="input-group" >
                      <input type="email" className="form-control rounded-start" id="email" name="email" placeholder="Type here for search" onChange={findPost} />
                      {/* <span className="input-group-text"><BsSearch /></span> */}
                    </div>
                  </div>
                </form>
              </div>
              <div className="filterByCategories p-4 shadow rounded mt-4">
                <h6 className='text-uppercase mb-2'>Filter by <span className='text-primary'>Categories</span></h6>
                <form>
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" id="travel" name="categories" value="travel" onChange={checkHandler} />
                    <label className="form-check-label" htmlFor="travel"> Travel</label>
                  </div>
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" id="science" name="categories" value="science" onChange={checkHandler} />
                    <label className="form-check-label" htmlFor="science"> Science</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="education" name="categories" value="education" onChange={checkHandler} />
                    <label className="form-check-label" htmlFor="education"> Education</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="technology" name="categories" value="technology" onChange={checkHandler} />
                    <label className="form-check-label" htmlFor="technology"> Technology</label>
                  </div>
                </form>
              </div>
              <div className="filterByAuthor p-4 shadow rounded mt-4">
                <h6 className='text-uppercase mb-2'>Filter by <span className='text-primary'>Author</span></h6>
                <form>
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" id="education" />
                    <label className="form-check-label" htmlFor="education"> Education</label>
                  </div>
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" id="education" />
                    <label className="form-check-label" htmlFor="education"> Education</label>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            {
              loading? 
              <> <h1>Loading Post ...</h1></>:
              posts.map((post: any) =>
              <div className="singleBlog p-4 mb-4 shadow rounded" key={post.id}>
                <div className="user d-flex mb-3">
                  <div className="userImg ">
                    <img src={post.userDetails.userImgUrl} alt="" className='rounded-circle' />
                  </div>
                  <div className="userInfo ms-3">
                    <h6 className='m-0'>{post.userDetails.name} <small className='text-primary ps-1'>({post.userDetails.role})</small></h6>
                    <small className="text-danger ">Date: {getDate(new Date(post.postDate.seconds * 1000))}</small>
                  </div>
                </div>
                <img src={post.imgUrl} alt="" className='rounded mb-4' />
                <div className="titleContet d-flex align-items-start">
                  <h3 className='text-capitalize'>{post.postName} </h3>
                  <small className='badge bg-secondary text-capitalize ms-2 px-2 pb-2 pt-1 rounded-pill'>{post.postCategories}</small>
                </div>
                <p className='mb-4'>{getPostContentShort(post.post)} <strong className='link-primary text-bold'>Read more</strong></p>
                <hr />
                <div className="blogActivity d-flex justify-content-between">
                  <div className="likeComment d-flex">
                    <div className="like">
                      <button className='btn btn-sm btn-primary rounded-pill'><BsFillHandThumbsUpFill /> Like</button>
                    </div>
                    <div className="comment ps-1">
                      <button className='btn btn-sm btn-primary rounded-pill' onClick={toggleComment}>comment</button>
                    </div>
                  </div>
                  <div className="blogAction">
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
                  </div>
                </div>
                {/* <div className="commentForm mt-4" id="commentForm">
                  <form>
                    <div className="form-group mb-2">
                      <input type="text" className="form-control" name="name" placeholder="Add Your Comment" />
                    </div>
                    <button type="submit" className='btn btn-sm btn-primary'>Add comment..</button>
                  </form>
                </div> */}
              </div>
            )
            }
          </div>
          <div className="col-12 col-lg-3">
            <div className="chatContainer p-3 rounded shadow">
              <h6>Chat app</h6>
            </div>
          </div>
        </div>
      </div>

      {/*Edit Post Modal */}
      <div className="modal fade" id="editModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Post</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row  gx-3">
                  <div className="col-12">
                    <div className="form-group mb-3">
                      <label htmlFor="name" className="form-label">Post Title :</label>
                      <div className="input-group">
                        <span className="input-group-text"><BsLayersHalf /></span>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          placeholder="Write your blog name"
                          value={postName}
                          onChange={(e) => setPostName(e.target.value)} />
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group mb-3">
                      <label htmlFor="role" className="form-label">Post Categories :</label>
                      <div className="input-group">
                        <span className="input-group-text"><BsCardList /></span>
                        <select className="form-select" id="role" name="categories" value={postCategories} onChange={(e) => setPostCategories(e.target.value)}>
                          <option value="defaultValue">Select Categories</option>
                          <option value="travel">Travel</option>
                          <option value="science">Science</option>
                          <option value="education">Education</option>
                          <option value="technology">Technology</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-12">
                    <div className="form-group mb-3">
                      <label htmlFor="postexerpt" className="form-label">Post :</label>
                      <textarea
                        className="form-control"
                        id="postexerpt" rows={5}
                        placeholder="Write your post"
                        value={post}
                        onChange={(e) => setPost(e.target.value)} />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={editPostData} data-bs-dismiss="modal">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

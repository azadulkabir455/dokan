import React, { useContext, useEffect, ChangeEvent, useState } from 'react'
import { GlobalContextProvider } from '../contextAPI/GlobalContext'
import { BsSearch, BsThreeDotsVertical, BsLayersHalf, BsCardList } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../store/action/postAction';
import { deletePost, searchPosts, filterPosts } from '../store/reducers/postReducers';
import "../assets/css/home.scss"

export default function Home() {
  const [checkValue, setCheckValue] = useState<any[]>([]);

  const dispatch = useDispatch()
  const { posts } = useSelector((state: any) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [getPosts])

  // Function for delete Post
  const deleteSinglePost: any = (id: any) => {
    dispatch(deletePost(id))
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

  // Function for Searching post
  const findPost = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(searchPosts(e.target.value));
  }

  // Function for Filtering post
  const checkHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const checked = e.target.checked;
    // if(checked) {
    //   setCheckValue([...checkValue, value]);
    // }else {
    //   setCheckValue(checkValue.filter((e) => (e !== value)))
    // }
    dispatch(filterPosts({checkValue}))
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
              {/* <div className="filterByAuthor p-4 shadow rounded mt-4">
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
              </div> */}
            </div>
          </div>
          <div className="col-12 col-lg-6">
            {
              posts.map((post: any) =>
                <div className="singleBlog p-4 mb-4 shadow rounded">
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
                  <h3 className='text-capitalize'>{post.postName}</h3>
                  <p className='mb-4'>{getPostContentShort(post.post)} <button className='btn btn-primary btn-sm'>Read more</button></p>
                  <hr />
                  <div className="blogActivity d-flex justify-content-between">
                    <div className="likeComment">
                      Like / Comment
                    </div>
                    <div className="blogAction">
                      <div className="dropdown">
                        <span data-bs-toggle="dropdown"><BsThreeDotsVertical /></span>
                        <ul className="dropdown-menu">
                          <li><a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#editModal">Edit</a></li>
                          <li><span className="dropdown-item" onClick={() => deleteSinglePost(post.id)}>Delete</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>
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

      {/* Modal */}
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
                        <input type="text" className="form-control" id="name" name="name" placeholder="Write your blog name" />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="form-group mb-3">
                      <label htmlFor="role" className="form-label">Post Categories :</label>
                      <div className="input-group">
                        <span className="input-group-text"><BsCardList /></span>
                        <select className="form-select" id="role" name="role" >
                          <option value="default">Select Categories</option>
                          <option value="admin">Travel</option>
                          <option value="admin">Science</option>
                          <option value="user">Education</option>
                          <option value="moderator">Technology</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="form-group mb-3">
                      <label htmlFor="formFile" className="form-label">Post Image :</label>
                      <input className="form-control" type="file" id="formFile" />
                    </div>
                  </div>
                  <div className="col-12 col-lg-12">
                    <div className="form-group mb-3">
                      <label htmlFor="postexerpt" className="form-label">Post :</label>
                      <textarea className="form-control" id="postexerpt" rows={5} placeholder="Write your post"></textarea>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

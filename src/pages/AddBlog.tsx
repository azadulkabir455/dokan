import React, { FC, ChangeEvent, useState, useEffect,useContext } from 'react'
import { BsLayersHalf, BsCardList } from "react-icons/bs";
// For Data Trasfer to store
import { GlobalContextProvider } from '../contextAPI/GlobalContext';
import { useDispatch,useSelector } from 'react-redux';
import { serverTimestamp } from 'firebase/firestore';
import { addPost } from '../store/reducers/postReducers';
// For Images
import { v4 } from "uuid"
import { storage } from '../firebase-config';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

const AddBlog: FC = () => {
  const [postName, setPostName] = useState<string>('')
  const [postCategories, setPostCategories] = useState<string>('defaultValue')
  const [post, setPost] = useState("Write your post")

  // For Image Upload
  const [postImg, setPostImg] = useState<(any)>(null);
  const [imgUrl, setImgUrl] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState<number | null>(null)


  // Data Collection from Form
  const nameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPostName(e.target.value);
  }

  const categoiresHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setPostCategories(e.target.value);
  }

  const imgHandler = (e: any) => {
    setPostImg(e.target.files[0])
  }
  const postHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPost(e.target.value);
  }

  // For Image upload
  useEffect(() => {
    if (postImg === null) return;
    const imgRef = ref(storage, `postImages/${postImg.name + v4()}`);
    const uploadTask = uploadBytesResumable(imgRef, postImg);

    uploadTask.on("state_changed", (snapshot) => {
      const progress: number = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setUploadProgress(progress);

      switch (snapshot.state) {
        case "paused":
          console.log("Img uploading paused !");
          break;
        case "running":
          console.log("Img uploading running");
          break;
        default:
          console.log("Img uploading done");
      }
    }, (error) => {
      console.log(error.message);
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        setImgUrl(url)
      })
    }
    )

  }, [postImg])

  // Data Transfer to store
  const {currentUser}:any = useContext(GlobalContextProvider)
  const dispatch = useDispatch();
  const {users} = useSelector((state:any) => state.users);

  // Extract Login user details
  const userDetails= currentUser && (users.filter((user:any) => user.id === currentUser.uid))[0];


  const combinePostData = {postName, postCategories, imgUrl, post, postDate: serverTimestamp(), userDetails}
  const submitHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addPost({...combinePostData}))
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-10 col-md-8 col-lg-6 mx-auto">
            <div className="authForm p-4 rounded shadow-lg">
              <h4 className='text-capitalize mb-4'>Creat Your <span className='text-primary'>Post</span></h4>
              <form onSubmit={submitHandler}>
                <div className="row  gx-3">
                  <div className="col-12">
                    <div className="form-group mb-3">
                      <label htmlFor="name" className="form-label">Post Title :</label>
                      <div className="input-group">
                        <span className="input-group-text"><BsLayersHalf /></span>
                        <input type="text" className="form-control" id="name" name="name" placeholder="Write your blog name" value={postName} onChange={nameHandler} />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="form-group mb-3">
                      <label htmlFor="role" className="form-label">Post Categories :</label>
                      <div className="input-group">
                        <span className="input-group-text"><BsCardList /></span>
                        <select className="form-select" id="role" name="categories" value={postCategories} onChange={categoiresHandler}>
                          <option value="defaultValue">Select Categories</option>
                          <option value="travel">Travel</option>
                          <option value="science">Science</option>
                          <option value="education">Education</option>
                          <option value="technology">Technology</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="form-group mb-3">
                      <label htmlFor="formFile" className="form-label">Post Image :</label>
                      <input className="form-control" type="file" id="formFile" onChange={imgHandler} />
                    </div>
                  </div>
                  <div className="col-12 col-lg-12">
                    <div className="form-group mb-3">
                      <label htmlFor="postexerpt" className="form-label">Post :</label>
                      <textarea className="form-control" id="postexerpt" rows={5} placeholder="Write your post" value={post} onChange={postHandler} />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group mb-3 mt-2">
                      <input type="submit"
                        className="btn btn-primary form-control"
                        value="Create Post"
                      />
                    </div>
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

export default AddBlog;
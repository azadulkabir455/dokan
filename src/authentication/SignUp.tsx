import React, { useState, useEffect, useContext } from 'react'
import { Link } from "react-router-dom"
import { BsFillEnvelopeFill, BsFillKeyFill, BsFillEyeFill, BsFillEyeSlashFill, BsFillPersonFill, BsPersonLinesFill } from "react-icons/bs";
import { v4 } from "uuid"
import { storage } from '../firebase-config';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { GlobalContextProvider } from '../contextAPI/GlobalContext';
import "../assets/css/authForm.scss"

export default function SignUp() {
  const [showPassword, setShowPassword] = useState("password")
  const [eyeIcon, setEyeIcon] = useState(<BsFillEyeSlashFill />)
  const [inputs, setInputs] = useState<(any)>([]);
  const [role, setRole] = useState<string>("default");

  // UseState for Image Upload
  const [file, setFile] = useState<any>(null);
  const [userImgUrl, setUserImgUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState<any>(null);


  //  Destructure Combine All Data
  const { name, email, password } = inputs;
  let combineData = { name, email, role, userImgUrl };

  // Import signup fuction form ContextApi
  const { signUp }: any = useContext(GlobalContextProvider)

  // Functionality for Show and Hide Password
  const passwordShowToggle = () => {
    if (showPassword === "password") {
      setShowPassword("text");
      setEyeIcon(<BsFillEyeFill />);
    } else {
      setShowPassword("password");
      setEyeIcon(<BsFillEyeSlashFill />);
    }
  }

  // Form Handler and Data Collection from Form
  const formHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    signUp(email, password, { ...combineData });
  }

  const inputHandle = (e: any) => {
    let name: string = e.target.name;
    let value: (string | number) = e.target.value;
    setInputs((prev: any) => ({ ...prev, [name]: value }))

  }

  const roleHandle = (e: any) => {
    setRole(e.target.value)
  }

  //  For Image Upload

  const fileHandle = (e: any) => {
    setFile(e.target.files[0])
  }

  useEffect(() => {
    if (file === null) return;
    const imgRef = ref(storage, `userImages/${file.name + v4()}`);
    const uploadImg = uploadBytesResumable(imgRef, file);

    uploadImg.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setUploadProgress(progress);

      switch (snapshot.state) {
        case "paused":
          console.log("Image uploading Paused");
          break;
        case "running":
          console.log("Image uploading running");
          break;
        default:
          console.log("Image uploading done");
      }
    }, (error) => {
      console.log(error.message)
    }, () => {
      getDownloadURL(uploadImg.snapshot.ref).then((url) => {
        setUserImgUrl(url);
      })
    }
    )
  }, [file])

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-10 col-md-8 col-lg-5 mx-auto">
            <div className="authForm p-4 rounded shadow-lg">
              <h4 className='text-capitalize mb-4'>Sign <span className='text-primary'>Up</span></h4>
              <form onSubmit={formHandler}>
                <div className="row  gx-3">
                  <div className="col-12 col-lg-6">
                    <div className="form-group mb-3">
                      <label htmlFor="name" className="form-label">Full Name : </label>
                      <div className="input-group">
                        <span className="input-group-text"><BsFillPersonFill /></span>
                        <input type="text" className="form-control" id="name" name="name" placeholder="Write your full name" onChange={inputHandle} />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="form-group mb-3">
                      <label htmlFor="role" className="form-label">Select Your role</label>
                      <div className="input-group">
                        <span className="input-group-text"><BsPersonLinesFill /></span>
                        <select className="form-select" id="role" name="role" value={role} onChange={roleHandle}>
                          <option value="default">Select your role</option>
                          <option value="user">User</option>
                          <option value="moderator">Moderator</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group mb-3">
                      <label htmlFor="formFile" className="form-label">Select your avatar:</label>
                      <input className="form-control" type="file" id="formFile" onChange={fileHandle} />
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="form-group mb-3">
                      <label htmlFor="email" className="form-label">Email Address: </label>
                      <div className="input-group">
                        <span className="input-group-text"><BsFillEnvelopeFill /></span>
                        <input type="email" className="form-control" id="email" name="email" placeholder="Write your email" onChange={inputHandle} />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="form-group mb-3">
                      <label htmlFor="password" className="form-label">Password :</label>
                      <div className="input-group">
                        <span className="input-group-text"><BsFillKeyFill /></span>
                        <input type={showPassword} className="form-control" id="password" name="password" placeholder="Enter your password" onChange={inputHandle} />
                        <span className="input-group-text pe-auto" onClick={passwordShowToggle}>{eyeIcon}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group mb-3 mt-2">
                      <input type="submit"
                        className="btn btn-primary form-control"
                        value="Sign up"
                        disabled={uploadProgress !== null && uploadProgress < 100}
                      />
                    </div>
                  </div>
                </div>
                <hr />
                <div className="d-flex justify-content-center">
                  <Link to="/login" className='text-decoration-none text-primary'>Back to login</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

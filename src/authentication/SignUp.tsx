import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { BsFillEnvelopeFill, BsFillKeyFill, BsFillEyeFill, BsFillEyeSlashFill, BsFillPersonFill, BsPersonLinesFill } from "react-icons/bs";
import "../assets/css/authForm.scss"

export default function SignUp() {
  const [showPassword, setShowPassword] = useState("password")
  const [eyeIcon, setEyeIcon] = useState(<BsFillEyeSlashFill />)


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

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-5 mx-auto">
            <div className="authForm p-4 rounded shadow-lg">
              <h4 className='text-capitalize mb-4'>Sign <span className='text-primary'>Up</span></h4>
              <form>
                <div className="row  gx-3">
                  <div className="col-12 col-lg-6">
                    <div className="form-group mb-3">
                      <label htmlFor="name" className="form-label">Full Name : </label>
                      <div className="input-group">
                        <span className="input-group-text"><BsFillPersonFill /></span>
                        <input type="text" className="form-control" id="name" name="name" placeholder="Write your full name" />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="form-group mb-3">
                      <label htmlFor="role" className="form-label">Select Your role</label>
                      <div className="input-group">
                        <span className="input-group-text"><BsPersonLinesFill /></span>
                        <select className="form-select" id="role" name="role">
                          <option>Select your role</option>
                          <option>Reader</option>
                          <option>Bloger</option>
                          <option>Shop Keeper</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group mb-3">
                      <label htmlFor="formFile" className="form-label">Select your avatar:</label>
                      <input className="form-control" type="file" id="formFile" />
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="form-group mb-3">
                      <label htmlFor="email" className="form-label">Email Address: </label>
                      <div className="input-group">
                        <span className="input-group-text"><BsFillEnvelopeFill /></span>
                        <input type="email" className="form-control" id="email" name="email" placeholder="Write your email" />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="form-group mb-3">
                      <label htmlFor="password" className="form-label">Password :</label>
                      <div className="input-group">
                        <span className="input-group-text"><BsFillKeyFill /></span>
                        <input type={showPassword} className="form-control" id="password" name="password" placeholder="Enter your password" />
                        <span className="input-group-text" onClick={passwordShowToggle}>{eyeIcon}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group mb-3 mt-2">
                      <input type="submit" className="btn btn-primary form-control" value="Login" />
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

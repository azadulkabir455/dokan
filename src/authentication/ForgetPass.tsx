import React from 'react'
import { Link } from "react-router-dom"
import { BsFillEnvelopeFill } from "react-icons/bs";
import "../assets/css/authForm.scss"

export default function ForgetPass() {

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-4 offset-4">
            <div className="authForm p-4 rounded shadow-lg">
              <h4 className='text-capitalize mb-4'>Reset <span className='text-primary'>Password</span></h4>
              <form>
                <div className="form-group mb-4">
                  <label htmlFor="email" className="form-label">Email : </label>
                  <div className="input-group">
                    <span className="input-group-text"><BsFillEnvelopeFill /></span>
                    <input type="email" className="form-control" id="email" name="email" placeholder="Write your email" />
                  </div>
                </div>
                <div className="form-group mb-3">
                  <input type="submit" className="btn btn-primary form-control text-capitalize" value="Sent for reset" />
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <Link to="/signup" className='text-decoration-none text-primary'>Create new account</Link>
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

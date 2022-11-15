import React,{useState, useContext} from 'react'
import { Link } from "react-router-dom"
import { BsFillEnvelopeFill } from "react-icons/bs";
import { GlobalContextProvider } from '../contextAPI/GlobalContext';
import "../assets/css/authForm.scss"

export default function ForgetPass() {
  const [email, setEmail] = useState('');

  // Import resetpass from Context api

  const {resetpass}: any = useContext(GlobalContextProvider);

  // Form Handler and Collect Data from form
  
  const submitHandle = (e:React.SyntheticEvent) => {
    e.preventDefault();
    resetpass(email);
  }
  const inputHandle = (e: any) => {
    setEmail(e.target.value)
  }
  
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-10 col-md-8 col-lg-4 mx-auto">
            <div className="authForm p-4 rounded shadow-lg">
              <h4 className='text-capitalize mb-4'>Reset <span className='text-primary'>Password</span></h4>
              <form onSubmit={submitHandle}>
                <div className="form-group mb-4">
                  <label htmlFor="email" className="form-label">Email : </label>
                  <div className="input-group">
                    <span className="input-group-text"><BsFillEnvelopeFill /></span>
                    <input type="email" className="form-control" id="email" name="email" placeholder="Write your email" onChange={inputHandle} value={email}/>
                  </div>
                </div>
                <div className="form-group mb-3">
                  <input type="submit" className="btn btn-primary form-control text-capitalize" value="Send For Reset Password" />
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

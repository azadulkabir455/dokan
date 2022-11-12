import React,{useState} from 'react'
import { Link } from "react-router-dom"
import { BsFillEnvelopeFill,BsFillKeyFill,BsFillEyeFill,BsFillEyeSlashFill } from "react-icons/bs";
import "../assets/css/authForm.scss"

export default function Login() {
    const [showPassword, setShowPassword] = useState("password")
    const [eyeIcon, setEyeIcon] = useState(<BsFillEyeSlashFill />)


    // Functionality for Show and Hide Password

    const passwordShowToggle = () => {
        if(showPassword === "password") {
            setShowPassword("text");
            setEyeIcon(<BsFillEyeFill />);
        }else {
            setShowPassword("password");
            setEyeIcon(<BsFillEyeSlashFill />);
        }
    }
    
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-4 offset-4">
                        <div className="authForm p-4 rounded shadow-lg">
                            <h4 className='text-capitalize mb-4'>Login <span className='text-primary'>here</span></h4>
                            <form>
                                <div className="form-group mb-3">
                                    <label htmlFor="email" className="form-label">Email : </label>
                                    <div className="input-group">
                                        <span className="input-group-text"><BsFillEnvelopeFill /></span>
                                        <input type="email" className="form-control" id="email" name="email" placeholder="Write your email" />
                                    </div>
                                </div>
                                <div className="form-group mb-4">
                                    <label htmlFor="password" className="form-label">Password :</label>
                                    <div className="input-group">
                                        <span className="input-group-text"><BsFillKeyFill /></span>
                                        <input type={showPassword} className="form-control" id="password" name="password" placeholder="Enter your password" />
                                        <span className="input-group-text" onClick={passwordShowToggle}>{eyeIcon}</span>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <input type="submit" className="btn btn-primary form-control" value="Login" />
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <Link to="/signup" className='text-decoration-none text-primary'>Create new account</Link>
                                    <Link to="/forgetpass" className='text-decoration-none text-primary'>Forget Password</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

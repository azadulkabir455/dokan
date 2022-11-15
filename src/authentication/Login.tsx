import React,{useState, useContext} from 'react'
import { Link } from "react-router-dom"
import { GlobalContextProvider } from '../contextAPI/GlobalContext';
import { BsFillEnvelopeFill,BsFillKeyFill,BsFillEyeFill,BsFillEyeSlashFill } from "react-icons/bs";
import "../assets/css/authForm.scss"

export default function Login() {
    const [showPassword, setShowPassword] = useState("password")
    const [eyeIcon, setEyeIcon] = useState(<BsFillEyeSlashFill />)
    const [inputs, setInputs] = useState<any>([]);

    const {email, password} = inputs; //Destructure data form inputs
    const {login}:any = useContext(GlobalContextProvider) //Import Login fuction form Context Api

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

    // Collect value from from
    const submitHandle = (e: React.SyntheticEvent) => {
        e.preventDefault();
        login(email, password);
    }

    const inputHandle = (e:any) => {
        let name: string = e.target.name;
        let value: (string | number) = e.target.value;
        setInputs( (prev:any) => ({...prev, [name]: value}))
    }
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-10 col-md-8 col-lg-4 mx-auto">
                        <div className="authForm p-4 rounded shadow-lg">
                            <h4 className='text-capitalize mb-4'>Login <span className='text-primary'>here</span></h4>
                            <form onSubmit={submitHandle}>
                                <div className="form-group mb-3">
                                    <label htmlFor="email" className="form-label">Email : </label>
                                    <div className="input-group">
                                        <span className="input-group-text"><BsFillEnvelopeFill /></span>
                                        <input type="email" className="form-control" id="email" name="email" placeholder="Write your email" onChange={inputHandle} />
                                    </div>
                                </div>
                                <div className="form-group mb-4">
                                    <label htmlFor="password" className="form-label">Password :</label>
                                    <div className="input-group">
                                        <span className="input-group-text"><BsFillKeyFill /></span>
                                        <input type={showPassword} className="form-control" id="password" name="password" placeholder="Enter your password" onChange={inputHandle} />
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

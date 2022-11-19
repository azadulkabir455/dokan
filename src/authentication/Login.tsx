import React, { useState, useContext, useEffect } from 'react'
import { Link } from "react-router-dom"
import { GlobalContextProvider } from '../contextAPI/GlobalContext';
import { BsFillEnvelopeFill, BsFillKeyFill, BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import "../assets/css/authForm.scss"

export default function Login() {
    const [showPassword, setShowPassword] = useState("password")
    const [eyeIcon, setEyeIcon] = useState(<BsFillEyeSlashFill />)
    const [inputs, setInputs] = useState<any>([]);
    console.log(inputs)

    const { email, password } = inputs; //Destructure data form inputs
    const { login }: any = useContext(GlobalContextProvider) //Import Login fuction form Context Api

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
    // Functionality for Remember me Password.
    const setCookie = () => {
        document.cookie = `myemail = ${email}; path = http://localhost:3000/`
        document.cookie = `mypass = $ {password}; path = http://localhost:3000/`
    }
    const getCookie = (cookieName:any) => {
        let name = cookieName + "=";
        let decodeCookie = decodeURIComponent(document.cookie);
        let cookieArray = decodeCookie.split(';');
        for(let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i];
            while(cookie.charAt(0) == " ") {
                cookie = cookie.substring(1);
            }
            if(cookie.indexOf(name) == 0){
                return cookie.substring(name.length, cookie.length);
            }
        }
        return "";
    }
    useEffect(() => {
        const getCookieData = () => {
            let emailData = getCookie("myemail");
            let passData = getCookie("mypass");
            setInputs({email:emailData, password:passData})
        }
        getCookieData();
    }, [])


    // Collect value from from
    const submitHandle = (e: React.SyntheticEvent) => {
        e.preventDefault();
        login(email, password);
    }

    const inputHandle = (e: any) => {
        let name: string = e.target.name;
        let value: (string | number) = e.target.value;
        setInputs((prev: any) => ({ ...prev, [name]: value }))
    }
    return (
        <>
            <div className="container" >
                <div className="row">
                    <div className="col-10 col-md-8 col-lg-4 mx-auto">
                        <div className="authForm p-4 rounded shadow-lg">
                            <h4 className='text-capitalize mb-4'>Login <span className='text-primary'>here</span></h4>
                            <form onSubmit={submitHandle}>
                                <div className="form-group mb-3">
                                    <label htmlFor="email" className="form-label">Email : </label>
                                    <div className="input-group">
                                        <span className="input-group-text"><BsFillEnvelopeFill /></span>
                                        <input type="email" className="form-control" id="email" value={inputs.email} name="email" placeholder="Write your email" onChange={inputHandle} />
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="password" className="form-label">Password :</label>
                                    <div className="input-group">
                                        <span className="input-group-text"><BsFillKeyFill /></span>
                                        <input type={showPassword} className="form-control" id="password" value={inputs.password} name="password" placeholder="Enter your password" onChange={inputHandle} />
                                        <span className="input-group-text" onClick={passwordShowToggle}>{eyeIcon}</span>
                                    </div>
                                </div>
                                <div className="form-check mb-4">
                                    <input className="form-check-input" type="checkbox" id="rememberMe" onClick={setCookie} />
                                    <label className="form-check-label" htmlFor="rememberMe"> Remember me.</label>
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

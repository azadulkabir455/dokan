import React, { useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { GlobalContextProvider } from '../../contextAPI/GlobalContext'
import { BsFillHouseDoorFill, BsFillCartFill, BsFillBagFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../store/action/userAction';
import "../../assets/css/globalheader.scss"

export default function GlobalHeader() {

    // Get logout function and Currtent user from global context
    const { logout, currentUser }: any = useContext(GlobalContextProvider)

    // Get Data From Redux Store
    const dispatch = useDispatch();
    const {users} = useSelector((state: any) => state.users);

    useEffect(() => {
        dispatch(getUsers())
    }, [getUsers])

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary mynavbar">
            <div className="container-lg">
                <NavLink className="navbar-brand" to="/">
                    Akash
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navMenu">
                    <ul className="navbar-nav mx-auto middleMenu">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">
                                <BsFillHouseDoorFill />
                                <span className='d-lg-none menuText'>Home</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/product">
                                <BsFillCartFill />
                                <span className='d-lg-none menuText'>Product</span>
                            </NavLink>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <ul className="navbar-nav me-auto cart">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/addtocart">
                                    <BsFillBagFill />
                                    <span className='totalProduct'>0</span>
                                </NavLink>
                            </li>
                            {
                                currentUser ?
                                    <li className="nav-item dropdown">
                                        <NavLink className="nav-link dropdown-toggle" data-bs-toggle="dropdown" to="">
                                            {
                                                users.filter((findUser: any) => findUser.id === currentUser.uid).map((user: any, index: any) =>
                                                    <span key={index}>
                                                        <img src={user.userImgUrl} alt="" className='profileImg' />
                                                    </span>
                                                )
                                            }
                                        </NavLink>
                                        <div className="dropdown-menu">
                                            <NavLink className="dropdown-item" to="/userprofile/userBlog">My profile</NavLink>
                                            <NavLink className="dropdown-item" to="/addblog">Add blog</NavLink>
                                            <NavLink className="dropdown-item" to="/addproduct">Add product</NavLink>
                                            <div className="dropdown-divider"></div>
                                            <NavLink className="dropdown-item" to="/mood">Dark Mood</NavLink>
                                            <NavLink className="dropdown-item" to="" onClick={logout}>Logout</NavLink>
                                        </div>
                                    </li>
                                    :
                                    <NavLink className="nav-link btn btn-danger btn-sm" to="/login" >Login</NavLink>
                            }
                        </ul>
                    </form>
                </div>
            </div>
        </nav>
    )
}

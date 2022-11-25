import React, { useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { BsMicrosoft, BsBagFill } from "react-icons/bs";
import { GlobalContextProvider } from '../../contextAPI/GlobalContext';
import { useSelector } from 'react-redux';
export default function UserProfiles() {
  const { currentUser }: any = useContext(GlobalContextProvider);
  const { users } = useSelector((state: any) => state.users)
  const user = users.find((user: any) => user.id === currentUser.uid)

  const userProfileStyle:any = {
    width: "140px",
    height: "140px",
    objectFit: "cover",
    objectPosition: "top",
    borderRadius: "100px",
    display: "block",
    margin: "auto",
    marginTop: "-70px",
}
return (
  <>
    <div className="container ">
      <div className="row mt-3">
        <div className="col-12 col-lg-3  offset-2">
          <div className="profileLinks p-4 shadow rounded">
            <NavLink to="/userprofile/userblog" className='text-decoration-none d-block pb-2'><BsMicrosoft /> My Blog</NavLink>
            <NavLink to="/userprofile/userProduct" className='text-decoration-none d-block'><BsBagFill /> My Product</NavLink>
          </div>
        </div>
        <div className="col-12 col-lg-5 mt-5">
          <div className="profielcontent p-4 shadow rounded">
            <img src={user.userImgUrl} alt="" className='mb-3' style={userProfileStyle} />
            <div className="userName d-flex justify-content-center align-items-center">
              <h4 className='m-0 text-center'>{user.name}</h4>
              <small className='text-primary text-center ps-1'>({user.role})</small>
            </div>
            <p className='text-secondary text-center mb-4'>{user.email}</p>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  </>
)
}

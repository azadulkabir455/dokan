import React from 'react'
import { Routes, Route } from "react-router-dom"
import Login from '../authentication/Login'
import SignUp from '../authentication/SignUp'
import ForgetPass from '../authentication/ForgetPass'
import Home from '../pages/Home'
import Product from '../pages/Product'
import Cart from '../pages/Cart'
import AddBlog from '../pages/AddBlog'
import AddProduct from '../pages/AddProduct'
import UserProfiles from '../pages/userprofile/UserProfiles'
import UserBlog from '../pages/userprofile/UserBlog'
import UserProduct from '../pages/userprofile/UserProduct'
import ProtectedRoute from './ProtectedRoute'

export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product" element={<ProtectedRoute><Product /></ProtectedRoute>} />
      <Route path="/addtocart" element={<Cart />} />
      <Route path="/addblog" element={<AddBlog />} />
      <Route path="/addproduct" element={<AddProduct />} />
      <Route path="/userprofile" element={<UserProfiles />}>
        <Route path="userblog" element={<UserBlog />} />
        <Route path="userProduct" element={<UserProduct />} />
      </Route>

      {/* AuthenticateRoute */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgetpass" element={<ForgetPass />} />

    </Routes>
  )
}

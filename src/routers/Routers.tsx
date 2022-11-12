import React from 'react'
import {Routes, Route} from "react-router-dom"
import ForgetPass from '../authentication/ForgetPass'
import Login from '../authentication/Login'
import SignUp from '../authentication/SignUp'
import Home from '../pages/Home'

export default function Routers() {
  return (
   <>
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/forgetpass" element={<ForgetPass />} />
   </Routes>
   </>
  )
}

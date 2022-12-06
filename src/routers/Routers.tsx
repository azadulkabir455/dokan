import React,{Suspense, lazy, useContext} from 'react'
import { GlobalContextProvider } from '../contextAPI/GlobalContext'
import { Routes, Route } from "react-router-dom"

import ProtectedRoute,{ProtectedRouteProps} from './ProtectedRoute'

const Login = lazy(() => import('../authentication/Login'))
const SignUp = lazy(() =>  import('../authentication/SignUp'))
const ForgetPass = lazy(() => import('../authentication/ForgetPass'))

const Home = lazy(() => import('../pages/Home'))
const Product = lazy(() => import('../pages/Product'))
const Cart = lazy(() => import('../pages/Cart'));
const AddBlog = lazy(() => import('../pages/AddBlog'));
const AddProduct = lazy(() => import('../pages/AddProduct'));
const UserProfiles = lazy(() => import('../pages/userprofile/UserProfiles'));
const UserBlog = lazy(() => import('../pages/userprofile/UserBlog'));
const UserProduct = lazy(() => import('../pages/userprofile/UserProduct'));
const SingleProduct =lazy(() => import("../pages/singlePages/SingleProduct"));
const SingleBlog  = lazy( () => import('../pages/singlePages/SingleBlog'))


export default function Routers() {
  const {currentUser}:any = useContext(GlobalContextProvider)
  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
    isAuthenticated: currentUser,
    authenticationPath: '/login',
  };
  return (
    <Suspense fallback={<div>Loading ...</div>}>
    <Routes>
      <Route path="/" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<Home />} />} />
      <Route path="/products" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<Product />} />} />
      <Route path="/addtocart" element={<Cart />} />
      <Route path="/addblog" element={<AddBlog />} />
      <Route path="/addproduct" element={<AddProduct />} />
      <Route path="/userprofile" element={<UserProfiles />}>
        <Route path="userblog" element={<UserBlog />} />
        <Route path="userProduct" element={<UserProduct />} />
      </Route>
      {/* SinglePages */}
      <Route path="/products/:id"  element={<SingleProduct />}/>
      <Route path="/blogs/:id"  element={<SingleBlog />}/>
      {/* AuthenticateRoute */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgetpass" element={<ForgetPass />} />
    </Routes>
    </Suspense>
  )
}

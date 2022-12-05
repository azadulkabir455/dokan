import React, { useContext } from 'react'
import { GlobalContextProvider } from '../contextAPI/GlobalContext'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ children }:any) => {
    const { currentUser }: any = useContext(GlobalContextProvider)
    const navigate = useNavigate()
    if (!currentUser) {
        return (
            navigate("/login")
        )
    } else {
        return (
            { children }
        )
    }
}

export default ProtectedRoute;

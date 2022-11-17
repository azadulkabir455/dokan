import React, { useContext } from 'react'
import { GlobalContextProvider } from '../contextAPI/GlobalContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }:any) => {
    const { currentUser }: any = useContext(GlobalContextProvider)

    if (!currentUser) {
        return (
            <Navigate to="/login" />
        )
    } else {
        return (
            { children }
        )
    }
}

export default ProtectedRoute;

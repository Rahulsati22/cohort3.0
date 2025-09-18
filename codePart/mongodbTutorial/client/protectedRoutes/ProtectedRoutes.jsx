import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoutes = () => {
    const user = localStorage.getItem('token')
    return user ? <Outlet/> : <Navigate to = '/register'/>
}

export default ProtectedRoutes

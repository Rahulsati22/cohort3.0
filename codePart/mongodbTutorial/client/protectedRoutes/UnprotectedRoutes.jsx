import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const UnprotectedRoutes = () => {
    const user = localStorage.getItem('token')
    return !user ? <Outlet/> : <Navigate to = '/'/>
}

export default UnprotectedRoutes

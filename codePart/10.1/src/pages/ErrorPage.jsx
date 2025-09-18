import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const ErrorPage = () => {
    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            navigate('/')
        }, 5000)
    }, [])
    return (
        <div style={{ width: '100vw', height: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h1 style={{ color: 'red', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                Page not found
            </h1>
        </div>
    )
}

export default ErrorPage

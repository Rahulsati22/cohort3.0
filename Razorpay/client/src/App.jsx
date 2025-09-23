import React from 'react'
import Product from './Pages/Product'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Product />} />
        <Route path='/paymentsuccess' element={<h1 style={{color:'green'}}>Payment Success</h1>} key='paymentsuccess' />
      </Routes>
    </BrowserRouter>

  )
}

export default App

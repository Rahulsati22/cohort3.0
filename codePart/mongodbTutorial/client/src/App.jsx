import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Todo from './pages/Todo.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import ProtectedRoutes from '../protectedRoutes/ProtectedRoutes.jsx'
import UnprotectedRoutes from '../protectedRoutes/UnprotectedRoutes.jsx'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* these are unprotected routes */}
        <Route element={<UnprotectedRoutes />}>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Route>




        {/* these are protected routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path='/' element={<Todo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

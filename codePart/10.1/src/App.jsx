import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import ErrorPage from './pages/ErrorPage'
import Layout from './pages/Layout'
import Example from './pages/Example'


function App() {
  return (
    <>
      {/* <Navbar/> */}
      <BrowserRouter>
        {/* <Navbar/> */}
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/userefhook' element={<Example />} />
            <Route path='*' element={<ErrorPage />} />

          </Route>
        </Routes>
        {/* <Footer/> */}
      </BrowserRouter>
    </>
  )
}

export default App

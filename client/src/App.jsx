import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Nav from './components/common/Nav'
import FooterC from './components/common/FooterC'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Pricing from './pages/Pricing'
import Contact from './pages/Contact'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import BlogDetails from './components/BlogDetails'

function App() {


  return (
    <div className='bg-slate-50'>
      <div className='sticky z-50 top-0'>
        <Nav />
      </div>
      <div className='min-h-[100vh]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/services' element={<Services />} />
          <Route path='/pricing' element={<Pricing />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/:blogId/details' element={<BlogDetails />} />
        </Routes>
      </div>
      <div className='z-50'>
        <FooterC />
      </div>
    </div>
  )
}

export default App

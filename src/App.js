import React from 'react'
import {BrowserRouter, Routes , Route} from "react-router-dom"
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import HomePage from './components/HomePage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/reg' element={<RegisterPage/>}/>
      <Route path='/home' element={<HomePage/>}/>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App

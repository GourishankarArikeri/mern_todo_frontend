import React, { useEffect, useState } from 'react'
import "./login.css"
import {Link} from 'react-router-dom'
// import RegisterPage from './RegisterPage'

import axios from "axios"
import { useNavigate } from 'react-router-dom'
const LoginPage = () => {

    const[email , setemail] = useState("")
    const[password , setpassword] = useState("")
    const navi = useNavigate()

    const handleLogin = async(e) =>{
    e.preventDefault()

    try {
        const response =  await axios.post("https://todo-backend-mern-1.onrender.com/api/user/login",{email,password})
       if(response.status === 201){
           alert("login success")
           localStorage.setItem('userId', response.data.id);
           navi("/home")
           }else{
           alert("server error")
           window.location.reload()
           }
         
     } catch(error) {
        // alert(error.response.data.message)
        // window.location.reload()
        if(error.response.status === 404){
            alert("user doest exist please register")
            navi("/reg")
            
        }else{
            alert("Wrong password please try again")
            setpassword("")
        }
      }
    }

    useEffect(()=>{
  const user = localStorage.getItem('userId')
  if(user){
    alert("already logged in")
    navi("/home")
  }
    },[])

  return (
    <div className='main-div'>
      <form onSubmit={handleLogin}  className="login-form">
        <p className="wel">
            Login in your account
        </p>
        <input value={email} onChange={(e) => setemail(e.target.value)} placeholder='Enter Email' type="text" className="login-input" />
        <input value={password} onChange={(e) => setpassword(e.target.value)} placeholder='Enter Password' type="password" className="login-input" />
        <button type='submit' className='login-button'>Login</button>
        <Link to='/reg'>New user? kindly register</Link>
      </form>
    </div>
  )
}

export default LoginPage

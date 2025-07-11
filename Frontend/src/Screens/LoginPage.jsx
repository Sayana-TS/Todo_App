import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OwlWelcomeImage from '../assets/owl-welcome-img.png'
import './RegisterPage.css'
import {useLoginUserMutation} from '../slices/userApiSlice'
import { setCredentials } from '../slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'


function LoginPage() {

  const {userInfo} = useSelector((state)=> state.auth)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loginUser] = useLoginUserMutation()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const loginHandler = async (e) => {
    e.preventDefault()
    try {
        let res = await loginUser({email, password}).unwrap()
        await dispatch(setCredentials({...res}))
        navigate('/')
    } catch (error) {
      console.log(error?.message || error?.data?.message);
    }
  }

  useEffect(()=>{
    if(userInfo){
      navigate('/')
    }
  },[])

  return (
    <>
      <div className="container-fluid screen" style={{ minHeight: '100vh' }}>
        <div className="main-box m-auto p-5" style={{ height: 'fit-content' }}>
          <div className="form-box text-light text-center position-relative">
            <img src={OwlWelcomeImage} alt="Owl Welcoming" className='owl-img' />
            <form onSubmit={loginHandler}>
              <h2>Let’s Dive Back In!</h2>
              <div className="fields d-flex flex-column gap-3 pt-4">
                <input type='email' placeholder='Enter Email' className='p-2 text-light' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type='password' placeholder='Enter Password' className='p-2 text-light' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type='submit' className='p-2'>LOGIN</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
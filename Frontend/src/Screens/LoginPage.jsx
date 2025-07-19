import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import OwlWelcomeImage from '../assets/owl-welcome-img.png'
import './RegisterPage.css'
import { useLoginUserMutation } from '../slices/userApiSlice'
import { setCredentials } from '../slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'


function LoginPage() {

  const { userInfo } = useSelector((state) => state.auth)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loginUser] = useLoginUserMutation()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const loginHandler = async (e) => {
    e.preventDefault()
    try {
      let res = await loginUser({ email, password }).unwrap()
      await dispatch(setCredentials({ ...res }))
      toast.success("You’re officially in, buddy", {
        className: 'toast-success'
      });
      navigate('/')
    } catch (error) {
      toast.error(error?.message || "Oops! Couldn’t log you in" || error?.data?.message, {
        className: 'toast-error'
      });
    }
  }

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [])

  return (
    <>
      <div className="container-fluid screen" style={{ minHeight: '100vh' }}>
        <div className="design d-flex flex-column gap-2 pt-3">
          <div className="design-row d-flex gap-2">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="design-row d-flex gap-2">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="design-row d-flex gap-2">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="design-row d-flex gap-2">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="design-row d-flex gap-2">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="design-row d-flex gap-2">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className="main-box m-auto p-5" style={{ height: 'fit-content' }}>
          <div className="form-box text-light text-center position-relative">
            <img src={OwlWelcomeImage} alt="Owl Welcoming" className='owl-img' />
            <form onSubmit={loginHandler}>
              <h2>Let’s Dive Back In!</h2>
              <div className="fields d-flex flex-column gap-3 pt-4">
                <label htmlFor="email">Email:</label>
                <input type='email' id='email' placeholder='Enter Email' className='p-2 text-light' value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Password:</label>
                <input type='password' id='passsword' placeholder='Enter Password' className='p-2 text-light' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type='submit' className='p-2'>LOGIN</button>
                <div className="link-div">
                  <p>No account yet? <Link to='/register' className='link'>Join the crew!</Link></p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
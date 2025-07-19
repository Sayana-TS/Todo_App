import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import OwlWelcomeImage from '../assets/owl-welcome-img.png'
import './RegisterPage.css'
import { useCreateUserMutation } from '../slices/userApiSlice'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

function RegisterPage() {

  const { userInfo } = useSelector((state) => state.auth)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const [createUser] = useCreateUserMutation()

  const registerHandler = async (e) => {
    e.preventDefault()
    try {
      let data = await createUser({ name, email, password }).unwrap()
      toast.success("Tadaa! You’re officially one of us", {
        className: 'toast-success'
      });
      navigate('/login')
    } catch (error) {
      toast.error(error?.message || "Oops! Couldn’t sign you up" || error?.data?.message, {
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
            <form onSubmit={registerHandler}>
              <h2>First time? Jump in!</h2>
              <div className="fields d-flex flex-column gap-3 pt-4">
                <label htmlFor="username">UserName:</label>
                <input type="text" id='username' placeholder='Enter Username' className='p-2 text-light' value={name} onChange={(e) => setName(e.target.value)} />
                <label htmlFor="email">Email:</label>
                <input type='email' id='email' placeholder='Enter Email' className='p-2 text-light' value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Password:</label>
                <input type='password' id='password' placeholder='Enter Password' className='p-2 text-light' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type='submit' className='p-2'>REGISTER</button>
                <div className="link-div">
                  <p>Already part of the crew? <Link to='/login' className='link'>Log in here!</Link></p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterPage
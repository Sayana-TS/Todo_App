import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OwlWelcomeImage from '../assets/owl-welcome-img.png'
import './RegisterPage.css'
import { useCreateUserMutation } from '../slices/userApiSlice'
import { useSelector } from 'react-redux'

function RegisterPage() {

  const {userInfo} = useSelector((state)=>state.auth)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const [createUser] = useCreateUserMutation()

  const registerHandler = async (e) =>{
    e.preventDefault()
    try {
      let data = await createUser({name, email, password}).unwrap()
      navigate('/login')
    } catch (error) {
      console.log(error?.message || error?.data?.message);
    }
  }

  useEffect(()=>{
    if(userInfo){
      navigate('/')
    }
  }, [])

  return (
    <>
      <div className="container-fluid screen" style={{ minHeight: '100vh' }}>
        <div className="main-box m-auto p-5" style={{ height: 'fit-content' }}>
          <div className="form-box text-light text-center position-relative">
            <img src={OwlWelcomeImage} alt="Owl Welcoming" className='owl-img' />
            <form onSubmit={registerHandler}>
              <h2>New Here? Let’s Set You Up!</h2>
              <div className="fields d-flex flex-column gap-3 pt-4">
                <input type="text" placeholder='Enter Username' className='p-2 text-light' value={name} onChange={(e)=> setName(e.target.value)}/>
                <input type='email' placeholder='Enter Email' className='p-2 text-light' value={email} onChange={(e)=> setEmail(e.target.value)}/>
                <input type='password' placeholder='Enter Password' className='p-2 text-light'value={password} onChange={(e)=> setPassword(e.target.value)} />
                <button type='submit' className='p-2'>REGISTER</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterPage
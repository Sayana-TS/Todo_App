import { Routes, Route } from 'react-router-dom'
import HomePage from './Screens/HomePage'
import EditPage from './Screens/EditPage'
import LoginPage from './Screens/LoginPage'
import RegisterPage from './Screens/RegisterPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/edit/:id' element={<EditPage />} />

        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>

      <ToastContainer
        toastClassName="my-toast"
        bodyClassName="my-toast-body"
        progressClassName="my-toast-progress"
        position="top-right"
        autoClose={3000}
        theme="light" // 'colored' overrides background styles, so keep it 'light' or 'dark'
        closeOnClick
      />


    </>
  )
}

export default App

import {Routes, Route} from 'react-router-dom'
import HomePage from './Screens/HomePage'
import EditPage from './Screens/EditPage'
import LoginPage from './Screens/LoginPage'
import RegisterPage from './Screens/RegisterPage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/edit/:id' element={<EditPage/>}/>

        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
      </Routes>
    </>
  )
}

export default App

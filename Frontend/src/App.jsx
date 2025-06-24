import {Routes, Route} from 'react-router-dom'
import HomePage from './Screens/HomePage'
import EditPage from './Screens/EditPage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/edit' element={<EditPage/>}/>
      </Routes>
    </>
  )
}

export default App

import './App.css'
import Klassekart from './Klassekart'
import {BrowserRouter, Routes, Route} from'react-router-dom'
import Rederect from './Rederect'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
           <Route path='/' element={<Klassekart/>}/>
           <Route path='/elev/:id/:navn/:grade' element={<Rederect/>}/>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

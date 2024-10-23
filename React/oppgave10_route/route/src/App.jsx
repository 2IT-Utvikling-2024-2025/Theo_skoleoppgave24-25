import About from './about'
import Home from './Home'
import Layout from './layout'
import Nopage from './Nopage'
import Kontakt from './kontakt'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <Layout/> 
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='*' element={<Nopage/>}/>
        <Route path='/kontakt' element={<Kontakt/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

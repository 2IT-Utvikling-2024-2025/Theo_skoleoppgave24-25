import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import A from './oppgave1.jsx'
import B from './oppgave2.jsx'
import Textfield from './textfield.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Textfield></Textfield>
    </>
  )
}

export default App

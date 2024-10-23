import { useState } from 'react'
import '../CSS/app.css'
import MyHobbies from './MyHobbies'
import MineFerdigheter from './Profil'
import Button from './Button'
import '../CSS/Button.css'

//en react komponent er en JS funksjon som returnerer en HTML tag
function App() {

  let isLoggedIn =true;


  return (
    
      <>
        <div>
          {isLoggedIn ? (
            <MineFerdigheter />
          ) : (
            <Button />
          )}
        </div>
      </>
    
  )
}

export default App

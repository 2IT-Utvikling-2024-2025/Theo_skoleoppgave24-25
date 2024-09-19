import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  

  return (
    <>
      <div className="container">
  <div className="sporsmal1">
    <h1>Hva er favorittfaget ditt?</h1>
    <input type="radio" name="fag" value="Driftstøtte" /> <p>Driftstøtte</p>  
    <input type="radio" name="fag" value="Norsk" /> <p>Norsk</p>
    <input type="radio" name="fag" value="Brukerstøtte" /> <p>Brukerstøtte</p>
  </div>
    <div className="sporsmal2">
       <h1>Hvorfor kommer du på skolen hver dag?</h1>
      <textarea name="grunn" id="grunn"></textarea>
    </div>
    <div className="sporsmal3">
      <h1>Hvor gammel er du?</h1>
      <input type="number" name="alder" id="alder" />
   </div>
    <div className="sporsmal4">
      <h1>Hvor fort løper du Dromtorp-runden?</h1>
     <input type="time" name="løpetid" id="løpetid" />
   </div>
    <div className="sporsmal5">
      <h1>Hvilke aktiviteter liker du?</h1>
      <input type="checkbox" name="aktiviteter" value="Fotball" /> <p>Fotball</p>
      <input type="checkbox" name="aktiviteter" value="Svømming" /> <p>Gaming</p>
      <input type="checkbox" name="aktiviteter" value="Sykling" /> <p>React</p>
    </div>
    <div className="sporsmal6">
      <h1>Velg din favorittmåned</h1>
      <select name="favorittMåned" id="favorittMåned">
        <option value="Januar">Januar</option>
        <option value="Februar">Februar</option>
        <option value="Mars">Mars</option>
        <option value="April">April</option>
        <option value="Mai">Mai</option>
        <option value="Juni">Juni</option>
        <option value="Juli">Juli</option>
        <option value="August">August</option>
        <option value="September">September</option>
        <option value="Oktober">Oktober</option>
        <option value="November">November</option>
        <option value="Desember">Desember</option>
     </select>
   </div>
   <div className="sporsmal7">
      <h1>Når har du bursdag?</h1>
      <input type="date" name="bursdag" id="bursdag" />
      <div className="sporsmal8">
    <h1>Klarer du å skrive tallet 13 i binært?</h1>
    <input type="range" name="biner" id="biner" min="0" max="1" />
    <input type="range" name="biner" id="biner" min="0" max="1" />
    <input type="range" name="biner" id="biner" min="0" max="1" />
    <input type="range" name="biner" id="biner" min="0" max="1" />
    <input type="range" name="biner" id="biner" min="0" max="1" />
    <input type="range" name="biner" id="biner" min="0" max="1" />
  </div>
   </div>
   <div className="sporsmal10">
     <h1>Hvilken farge liker du best?</h1>
     <input type="color" name="favorittFarge" id="favorittFarge" />
   </div><br />
   <div className="submit">
    <button onClick={Submit}>Submit</button>
   </div>
    
</div>

    </>
  )
}

function Submit(){
  alert('Svarene dine er lagret!!')
}

export default App

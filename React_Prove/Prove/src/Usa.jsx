import './usa.css'
import { useState } from "react"

export default function Usa(){

    const [valuta, setvaluta] = useState(0)
    const [temp, setTemp] = useState('10')
    const [weather, setWeather] = useState('overskyet')

    return(
        <div className='altOmUsa'>
            <h2>USA</h2>  
            <img src="src/Flagg/Flag_of_the_United_States_(DoS_ECA_Color_Standard).svg.png" alt="flaget til Usa" />
            <h4>{weather}</h4>
            <h4>{temp} grader celsius</h4>

            <h6>skjekk valutakurs</h6>
            <input type="number" value={valuta} onChange={(e) => setvaluta(e.target.value)} />
            <h6>{valuta * 0.093} Amerikanske dollar</h6>
        </div>
    )
}

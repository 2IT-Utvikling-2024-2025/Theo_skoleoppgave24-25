import './kina.css'
import { useState } from "react"

export default function Kina(){

    const [valuta, setvaluta] = useState(0)
    const [temp, setTemp] = useState('22')
    const [weather, setWeather] = useState('sol')

    return(
        <div className='altOmKina'>
            <h2>Kina</h2>  
            <img src="src/Flagg/Flag_of_the_People's_Republic_of_China.svg.png" alt="flaget til Kina" />
            <h4>{weather}</h4>
            <h4>{temp} grader celsius</h4>

            <h6>skjekk valutakurs</h6>
            <input type="number" value={valuta} onChange={(e) => setvaluta(e.target.value)} />

            <h6>{valuta * 0.66} Kinesiske Yuan</h6>
        </div>
    )
}
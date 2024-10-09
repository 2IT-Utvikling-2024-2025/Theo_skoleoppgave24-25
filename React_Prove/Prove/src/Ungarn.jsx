import './ungarn.css'
import { useEffect, useState } from "react"

export default function Ungarn(){

    const [valuta, setvaluta] = useState(0)
    const [temp, setTemp] = useState('19')
    const [weather, setWeather] = useState('regn')

    return(
        <div className='altOmUngarn'>
            <h2>Ungarn</h2>  
            <img src="/src/Flagg/Flag_of_Hungary.svg.png" alt="flagget til Ungarn" />
            <h4>{weather}</h4>
            <h4>{temp} grader celsius</h4>

            <h6>skjekk valutakurs</h6>
            <input type="number" value={valuta} onChange={(e) => setvaluta(e.target.value)} />
            <h6>{valuta * 33.94} Ungarske Forint</h6>
        </div>
    )
}
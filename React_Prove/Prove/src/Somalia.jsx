import { useState } from "react"
import './somalia.css'

export default function Somalia(){

    const [valuta, setvaluta] = useState(0)
    const [temp, setTemp] = useState('40')
    const [weather, setWeather] = useState('sol')

    return(
        <div className="altOmSomalia">
            <h2>Somalia</h2>  
            <img src="src/Flagg/Flag_of_Somalia.svg.png" alt="flaget til Usa" />
            <h4>{weather}</h4>
            <h4>{temp} grader celsuis</h4>

            <h6>skjekk valutakurs</h6>
            <input type="number" value={valuta} onChange={(e) => setvaluta(e.target.value)} />
            <h6>{valuta * 53.23} Somali Shilling</h6>
        </div>
    )
}

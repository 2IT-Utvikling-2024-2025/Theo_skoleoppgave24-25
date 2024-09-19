import { useState } from "react"

export default function A(){
const [ x, setX ] = useState(0)

    return(
        <>
            <input type="number" value={x} onChange={(e) => setX(e.target.value)} />
        <p>{x / 2.54}</p>
        </>
        
        
    )
}

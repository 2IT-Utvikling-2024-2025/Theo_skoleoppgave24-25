import { useState } from "react"

export default function A(){
const [ x, setX ] = useState(2.54)

    return(
        <>
            <input type="number" value={x} onChange={(e) => setX(e.target.value)} />
        <p>{x} tommer er {x / 2.54} centimeter</p>
        </>
        
        
    )
}

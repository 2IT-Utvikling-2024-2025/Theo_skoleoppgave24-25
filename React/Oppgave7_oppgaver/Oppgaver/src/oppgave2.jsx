import { useState } from "react";

export default function B(){

    const [num,setNum] = useState(0)

    return(
        <>
            <input type="number" value={num} onChange={(e) => setNum(e.target.value)} />
            {num % 2 === 0 ? <p>{num} er partall</p> : <p>{num} er oddetall</p>}

            {/* bug: på det 17-ende siffere vil alt bli sett som partall */}


        </>
    )
}
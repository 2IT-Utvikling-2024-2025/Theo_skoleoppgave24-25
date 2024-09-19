import { useState } from "react"

export default function Textfield(){

    const [inputContent, setInputContent] = useState('');

    function handleChange(e){
        setInputContent(e.target.value)
        console.log(e.target.value);
    }
    return(
        <>  
            <div className="container">
                <div className="section">
                    <h1>Drømtorp vgs adresse?</h1>
                <label>
                <   input type="text" name="myInput" onChange={handleChange} />
                </label>
                </div>
            </div>
        </>
    )
}
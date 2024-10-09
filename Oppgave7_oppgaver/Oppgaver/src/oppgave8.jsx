import { useState } from "react";

export default function H() {
    const [text, setText] = useState('');
    const [tilbakemelding, setTilbakemelding] = useState('');


    const handleChange = (e) => {
        setText(e.target.value);
    }

    const vokaler = ['a','e','i','o','u','y','A','E','I','O','U','Y']

    function visSvar() {
        if (vokaler.includes(text.charAt(0))) {
            setTilbakemelding('Det starter med en vokal');
        } else {
            setTilbakemelding('Det starter med en konstant');
        }
    }
    
    return (
        <>
            <input type="text" onChange={handleChange} />
            <button onClick={visSvar}>Klikk</button>
            <h1>{tilbakemelding}</h1>
            <h1>{text}</h1>
        </>
    );
}

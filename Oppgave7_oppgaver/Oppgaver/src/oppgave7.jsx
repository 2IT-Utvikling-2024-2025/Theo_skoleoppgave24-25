import { useState } from "react";

export default function G() {
    const [text, setText] = useState('');
    const [tilbakemelding, setTilbakemelding] = useState('');

    const handleChange = (event) => {
        setText(event.target.value);
    }

    function visSvar() {
        if (text.length === 6) {
            setTilbakemelding('Bra jobba!');
        } else {
            setTilbakemelding('du har ikke 6 bokstaver du har ' + text.length);
        }
    }

    return (
        <>
            <input type="text" onChange={handleChange} />
            <button onClick={visSvar}>Klikk</button>
            <h1>{tilbakemelding}</h1>
        </>
    );
}

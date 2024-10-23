import React, { useState, useEffect } from 'react';

export default function D() {
    const [resultText, setResultText] = useState('');
    
    const [X, setX] = useState(Math.floor(Math.random() * 10));
    const [Y, setY] = useState(Math.floor(Math.random() * 10));
    const Z = X + Y;

    useEffect(() => {
        function Display() {
            if (X % 2 === 0 && Y % 2 === 0) {
                setResultText('Begge tallene er partall');
            } else if (X % 2 !== 0 && Y % 2 !== 0) {
                setResultText('Begge tallene er oddetall');
            } else {
                setResultText('Det ene tallet er partall og det andre er oddetall');
            }
        }
        Display();
    }, [X, Y]); 

    return (
        <>
            <h1>{Z}</h1>
            <h2>{resultText}</h2>
        </>
    );
}


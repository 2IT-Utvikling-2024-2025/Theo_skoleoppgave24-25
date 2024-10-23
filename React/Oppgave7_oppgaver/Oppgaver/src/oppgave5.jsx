import React, { useState, useEffect } from 'react';

export default function E() {
    const [resultText, setResultText] = useState('');
    const [tallResult, setTallResult] = useState('');
    
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

        function tiEllerMer(){
            if(Z > 10){
                setTallResult('tallet er mer enn 10')
            } else if (Z === 10){
                setTallResult('tallet er 10')
            } else{
                setTallResult('tallet er mindre en 10')
            }
        }
        Display();
        tiEllerMer();
    }, [X, Y]); 


    return (
        <>
            <h1>{Z}</h1>
            <h2>{resultText}</h2>
            <h2>{tallResult}</h2>
        </>
    );
}

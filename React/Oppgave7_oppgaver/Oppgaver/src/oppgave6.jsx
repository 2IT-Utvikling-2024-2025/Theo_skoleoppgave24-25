import { useState } from 'react'

export default function F(){
    let thisDate = new Date();
    let date = thisDate.getDate()


    let today = new Date();
    let day = today.getDay()

    const [time, setTime] = useState("");

    let days = ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"];

    let dayname = days[day];

    let thisMonth = new Date();
    let month = thisMonth.getMonth()

    let months = ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"];

    let monthName = months[month];

    function displayTime(){
        let hour = today.getHours();
        let min = today.getMinutes();
        let tid = hour + " : " + min
        setTime(tid)
    };

    return(
        <>
            
            <p>I dag er det {dayname}</p>
            <p>{monthName}</p>
            <button onClick={displayTime}>klokka er ....</button>
            <h1>{time}</h1>  
            
        </>
    )

    }

    


    

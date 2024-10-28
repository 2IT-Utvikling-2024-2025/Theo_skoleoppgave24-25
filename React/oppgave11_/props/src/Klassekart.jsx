import { useState } from "react"
import Props from "./Props"
export default function Klassekart() {
        const [klass,setKlass] = useState([
            { id: 1, name: "Oliver"},
            { id: 2, name: "Justine"},
            { id: 3, name: "karoline"},
            { id: 4, name: "Alex"},
            { id: 5, name: "Bastian"},
            { id: 6, name: "Kasper"},
            { id: 7, name: "Johannes"},
            { id: 8, name: "Mathias"},
            { id: 9, name: "Mads"},
            { id: 10, name: "Sander"},
            { id: 11, name: "Sven"},
            { id: 12, name: "Romio"},
            { id: 13, name: "Thomas"},
    
        ])
    return (
        <div>
            <ul>
                {klass.map((klass) => (
                    <li key={klass.id} >
                        <Props name={klass.name} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
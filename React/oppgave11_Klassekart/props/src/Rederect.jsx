import {useParams} from 'react-router-dom'

export default function Rederect() {
    const {id, navn, grade, merknader} = useParams()
    return (
        <div>
            <h1>{id}</h1>
            <h2>{navn}</h2>
            <h3>karakter: {grade}</h3>
            <h2>merknader: {merknader}</h2>

        </div>
    )
}
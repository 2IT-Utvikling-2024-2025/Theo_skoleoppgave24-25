import { useState } from 'react'
import './MyHobbies.css'

const hobbies = [
    {title: 'Fotball', isFavoritt: false, upVote: 0, id: 1},
    {title: 'Discgolf', isFavoritt: true, upVote: 0, id: 2}
]


export default function MyHobbies() {

    const listItems = hobbies.map(hobby =>
        <li key={hobby.id} style={ { color: hobby.isFavoritt ? 'blue' : 'red' }}>
            {hobby.title}
            <VoteButton></VoteButton>
        </li>
    )

    return (
        <>
            <h1 className='header'>Theo Kristiansen</h1>

            <ul>{listItems}</ul>
            
        </>
    )
}


function VoteButton() {
    const [vote,setVote] = useState(0)

    function Handleclick() {
        setVote(vote + 1)

    }


    return (
        <button className='button' onClick={Handleclick}>
            Voted {vote} times
        </button>

    )
}
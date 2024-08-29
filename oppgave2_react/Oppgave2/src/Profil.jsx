import { useState } from 'react'
import Bilde from './IMAGES/Bilde.webp'
import './Profil.css'


const hobbies = [
    {title: 'Programming Rizz     ', upVote: 0, id: 1},
    {title: 'Fotball              ', upVote: 0, id: 2},
    {title: 'Synge                ', upVote: 0, id: 3}
]

export default function MineFerdigheter(){

    const listItems = hobbies.map(hobby =>
        <li key={hobby.id}>
            {hobby.title}
            <VoteButton></VoteButton>
            <maxOneVote></maxOneVote>
        </li>
    )

    return (
        <>
            <h1>Meg</h1>
            <img src={Bilde} alt="bilde" />
            <h5>Jeg er en person med mange ferdig heter og her er alle:</h5>
            <h6>Programming Rizz</h6>
            <p>Programming Rizz er en av mine største ferdigheter. Min go to rizz line er: Er du css for du gjør livet mitt mye mer fargerikt</p>
            <h6>Fotball</h6>
            <p>på fotbllbanen skinner jeg som en sol, løper rundt som en løve og skyter som steth curry. </p>
            <h6>synge</h6>
            <p>Jeg synger og synger hver dag og stemmen min er som masasje for ørene</p>

            <ul>{listItems}</ul>



        </>
        
        
         
    )
}

function VoteButton() {
    const [hasVoted, setHasVoted] = useState(false)

    function handleClick() {
        setHasVoted(true)
    }

    return (
        <button className='button' onClick={handleClick} disabled={hasVoted}>
            {hasVoted ? 'Voted' : 'Vote'}
        </button>
    )
}




export default function C(){

    const X = Math.floor(Math.random()*10)
    const Y = Math.floor(Math.random()*10)
    const Z = X + Y
    return(
        <h1>{Z}</h1>
    )
}


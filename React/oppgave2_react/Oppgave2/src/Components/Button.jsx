import { useState } from "react";

export default function MyButton() {
    const [X,setclick]=useState(0)
    return (
      <button className="buttonstyle" onClick={click}>{X}</button>
    );
  

  function click(){
    setclick(X+Math.floor(Math.random()*1000))
  }
}
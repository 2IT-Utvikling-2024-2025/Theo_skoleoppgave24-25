import { useState } from "react";
import Props from "./Props";
import { Outlet, Link } from "react-router-dom"

export default function Klassekart() {

  const [nyElev,setNyElev] = useState("");
  const [klass, setKlass] = useState([
    { id: 1, name: "Oliver", grade: "4", merknader: "3", age : "22" },
    { id: 2, name: "Justine", grade: "2", merknader: "4", age : "23" },
    { id: 3, name: "Karoline", grade: "5", merknader: "3", age : "22" },
    { id: 4, name: "Jens", grade: "3", merknader: "23", age : "22" },
    { id: 5, name: "Bastian", grade: "5", merknader: "2", age },
    { id: 6, name: "Kasper", grade: "5", merknader: "12", age : "22" },
    { id: 7, name: "Johannes", grade: "6", merknader: "1", age : "22" },
    { id: 8, name: "Mathias", grade: "5", merknader: "5", age : "22" },
    { id: 9, name: "Mads", grade: "2", merknader: "9",age : "22" },
    { id: 10, name: "Sander", grade: "1", merknader:'0', age : "23" },
    { id: 11, name: "Sven", grade: "6", merknader: "0", age : "22" },
    { id: 12, name: "Romio", grade: "4", merknader: "0", age : "22" },
    { id: 13, name: "Thomas", grade: "5", merknader: "5", age : "22" },
  ]);
  


  const leggTilElev = (e) => {
    e.preventDefault();
    setKlass([...klass, { id: klass.length + 1, name: nyElev }]);
    setNyElev("");
  };

  const info = () => {
    console.log(klass); 
  };

  return (
    <div>
      <ul style={{ display: "flex", flexWrap: "wrap", listStyleType: "none", padding: 0 }}>
        {klass.map((student) => (
          <li key={student.id} style={{ margin: "10px" }}>
            <Props name={student.name} />
            <Link to ={`/elev/${student.id}/${student.name}/${student.grade}${student.merknader}`}>{student.name}</Link>
          </li>
        ))} 
      </ul>
        <form onSubmit={leggTilElev}>
            <input value={nyElev} onChange={(e) => setNyElev(e.target.value)} placeholder="Ny elev" />
            <button>Legg til</button>
        </form>
    </div>
  );
}

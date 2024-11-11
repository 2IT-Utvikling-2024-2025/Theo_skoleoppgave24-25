import { useState } from "react";
import Props from "./Props";



export default function Klassekart() {

    const [nyElev,setNyElev] = useState("");
  const [klass, setKlass] = useState([
    { id: 1, name: "Oliver" },
    { id: 2, name: "Justine" },
    { id: 3, name: "Karoline" },
    { id: 4, name: "Jens" },
    { id: 5, name: "Bastian" },
    { id: 6, name: "Kasper" },
    { id: 7, name: "Johannes" },
    { id: 8, name: "Mathias" },
    { id: 9, name: "Mads" },
    { id: 10, name: "Sander" },
    { id: 11, name: "Sven" },
    { id: 12, name: "Romio" },
    { id: 13, name: "Thomas" },
  ]);

  const leggTilElev = (e) => {
    e.preventDefault();
    setKlass([...klass, { id: klass.length + 1, name: nyElev }]);
    setNyElev("");
  };

  return (
    <div>
      <ul style={{ display: "flex", flexWrap: "wrap", listStyleType: "none", padding: 0 }}>
        {klass.map((student) => (
          <li key={student.id} style={{ margin: "10px" }}>
            <Props name={student.name} />
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

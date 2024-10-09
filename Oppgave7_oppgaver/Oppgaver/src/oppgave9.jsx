import { useState } from 'react';

export default function TilfeldigTall() {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [tilfeldigTall, setTilfeldigTall] = useState(null);

  const handleChangeMin = (event) => {
    setMin(parseInt(event.target.value));
  };

  const handleChangeMax = (event) => {
    setMax(parseInt(event.target.value));
  }; 

  const handleClick = () => {
    if (min < max) {
      const tilfeldigTall = Math.floor(Math.random() * (max - min + 1) + min);
      setTilfeldigTall(tilfeldigTall);
    } else {
      alert("Min-verdien må være mindre enn max-verdien");
    }
  };

  return (
    <div>
      <input type="number" value={min} onChange={handleChangeMin} placeholder="Min-verdi" />
      <input type="number" value={max} onChange={handleChangeMax} placeholder="Max-verdi" />
      <button onClick={handleClick}>Generer tilfeldig tall</button>
      {tilfeldigTall && <p>Tilfeldig tall: {tilfeldigTall}</p>}
    </div>
  );
}
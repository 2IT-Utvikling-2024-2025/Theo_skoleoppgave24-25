import React, { useState } from 'react';

const SpinTheWheel = () => {
  const [students, setStudents] = useState([]);
  const [newStudents, setNewStudents] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  // Funksjon for å legge til elever
  const addStudents = () => {
    const names = newStudents
      .split('\n')
      .map((name) => name.trim())
      .filter((name) => name !== '');
    if (names.length > 0) {
      setStudents([...students, ...names]);
      setNewStudents('');
    }
  };

  // Funksjon for å spinne hjulet
  const spinWheel = () => {
    if (students.length === 0) return;
    setSpinning(true);

    // Tilfeldig velge en elev
    const randomIndex = Math.floor(Math.random() * students.length);
    const degreesPerSegment = 360 / students.length;
    const targetRotation =
      360 * 5 + degreesPerSegment * randomIndex + degreesPerSegment / 2;

    setRotation(targetRotation);

    setTimeout(() => {
      setSelectedStudent(students[randomIndex]);
      setSpinning(false);
    }, 5000); // Spinner i 5 sekunder
  };

  // Usynlige knapper for å velge vinner
  const selectWinner = (index) => {
    if (spinning) return;
    const degreesPerSegment = 360 / students.length;
    const targetRotation =
      360 * 5 + degreesPerSegment * index + degreesPerSegment / 2;

    setRotation(targetRotation);
    setSelectedStudent(students[index]);
  };

  return (
    <div>
      <h1>Spin the Wheel</h1>
      <textarea
        value={newStudents}
        onChange={(e) => setNewStudents(e.target.value)}
        placeholder="Legg til elever (ett navn per linje)"
        rows={4}
        cols={30}
      ></textarea>
      <br />
      <button onClick={addStudents}>Legg til elever</button>
      <button onClick={spinWheel} disabled={students.length === 0 || spinning}>
        Spinn
      </button>
      <div
        style={{
          position: 'relative',
          width: '300px',
          height: '300px',
          margin: '20px auto',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            overflow: 'hidden',
            transform: `rotate(${rotation}deg)`,
            transition: spinning
              ? 'transform 5s cubic-bezier(0.33, 1, 0.68, 1)'
              : 'none',
          }}
        >
          {students.map((student, index) => {
            const degreesPerSegment = 360 / students.length;
            const rotation = degreesPerSegment * index;
            return (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  width: '50%',
                  height: '50%',
                  top: '50%',
                  left: '50%',
                  backgroundColor: index % 2 === 0 ? '#ffcc00' : '#ff6699',
                  transformOrigin: '0% 0%',
                  transform: `rotate(${rotation}deg) skewY(${
                    90 - degreesPerSegment
                  }deg)`,
                }}
              ></div>
            );
          })}
        </div>
        {/* Usynlige knapper */}
        {students.map((student, index) => {
          const degreesPerSegment = 360 / students.length;
          const rotation = degreesPerSegment * index;
          return (
            <div
              key={index}
              onClick={() => selectWinner(index)}
              style={{
                position: 'absolute',
                width: '50%',
                height: '50%',
                top: '50%',
                left: '50%',
                transformOrigin: '0% 0%',
                transform: `rotate(${rotation}deg) skewY(${
                  90 - degreesPerSegment
                }deg)`,
                cursor: 'pointer',
                opacity: 0, // Gjør knappen usynlig
              }}
            ></div>
          );
        })}
      </div>
      {selectedStudent && !spinning && <h2>Vinneren er: {selectedStudent}</h2>}
    </div>
  );
};

export default SpinTheWheel;

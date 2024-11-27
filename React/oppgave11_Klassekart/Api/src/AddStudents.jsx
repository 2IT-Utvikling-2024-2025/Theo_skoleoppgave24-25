import React, { useState } from "react";
import './StudentList.css'

export default function StudentCreate() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const studentData = {
            name: name,
            age: age,
        };

        try {
            const response = await fetch('http://localhost:3000/api/v1/Students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(studentData),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Elev oprettet:', result);
            } else {
                const error = await response.json();
                console.error('Feil ved opprettelse av elev:', error);
            }
        } catch (error) {
            console.error('Feil ved opprettelse av elev:', error);
        }
    }

    return (
        <div>
            <h1>Student Create</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Age:</label>
                    <input
                        type="number"
                        value={age}
                        onChange={(event) => setAge(event.target.value)}
                        required
                    />
                </div>
                <button type="submit">Opprett elev</button>
            </form>
        </div>
    );
}
import React, { useState, useEffect } from 'react';

export default function StudentList() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/v1/students');
                const data = await response.json();
                setStudents(data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);

    return (
        <div>
            <h1>Student List</h1>
            <div className="student-container">
                {students.map((student) => (
                    <div key={student.id} className="student-desk">
                        <p>{student.name}</p>
                        <p>{student.age}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

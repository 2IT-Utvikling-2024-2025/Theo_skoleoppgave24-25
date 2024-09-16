import React, { useState } from 'react';
import './Todoboks.css'

export default function Todoboks() {
  // Initial chores state
  const [chores, setChores] = useState([]);

  // State to hold the new chore input
  const [newChore, setNewChore] = useState('');

  // Handle input change
  const handleInputChange = (e) => {
    setNewChore(e.target.value);
  };

  // Handle adding a new chore
  const handleAddChore = () => {
    if (newChore.trim()) {
      // Add the new chore to the list
      setChores([...chores, { id: chores.length + 1, title: newChore }]);
      // Clear the input box
      setNewChore('');
    }
  };

  // Handle removing a chore
  const handleRemoveChore = (id) => {
    // Filter out the chore with the matching id
    setChores(chores.filter(chore => chore.id !== id));
  };

  // Map chores to list items
  const listItems = chores.map(chore => (
    <li key={chore.id}>
      {chore.title}
      <input 
        type="checkbox" 
        onChange={() => handleRemoveChore(chore.id)} 
      />
    </li>
  ));

  return (
    <div className="container">
      <h1>To do list</h1>
      <input 
        type="text" 
        value={newChore} 
        onChange={handleInputChange} 
        placeholder="Enter ny oppgave" 
      />
      <button onClick={handleAddChore}>Legg til</button>
      <ul>{listItems}</ul>
    </div>
  );
}

// src/pages/Admin.jsx
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Admin() {
  const [members, setMembers] = useState([])
  const nav = useNavigate()

  useEffect(() => {
    fetch('/api/members')
      .then(r => r.json())
      .then(setMembers)
      .catch(console.error)
  }, [])

  const deleteMember = async (id) => {
    if (!confirm('Slette medlem?')) return
    await fetch(`/api/members/${id}`, { method: 'DELETE' })
    setMembers(members.filter(m => m.id !== id))
  }

  return (
    <>
      <h1>Admin Dashboard</h1>
      <Link to="/admin/register" className="button-link">+ Legg til medlem</Link>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Navn</th><th>Medlemskap</th><th>Handling</th>
          </tr>
        </thead>
        <tbody>
          {members.map(m => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.name}</td>
              <td>{m.membership_type}</td>
              <td>
                <button onClick={() => nav(`/admin/edit/${m.id}`)}>
                  Rediger
                </button>{' '}
                <button onClick={() => deleteMember(m.id)}>
                  Slett
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

// src/pages/Register.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const nav = useNavigate()

  // Skjema‐state
  const [name, setName]             = useState('')
  const [password, setPassword]     = useState('')
  const [membership, setMembership] = useState('')
  const [types, setTypes]           = useState([])
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState('')

  // Hent medlemskapstyper fra server
  useEffect(() => {
    fetch('/api/members/types')
      .then(res => res.json())
      .then(setTypes)
      .catch(console.error)
  }, [])

  // Send POST for å opprette nytt medlem
  const onSubmit = async e => {
    e.preventDefault()
    if (!membership) {
      setError('Velg et medlemskap')
      return
    }
    setError('')
    setLoading(true)

    const res = await fetch('/api/members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        password,
        membership_type: membership
      })
    })
    setLoading(false)

    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      setError(body.error || 'Noe gikk galt ved registrering')
      return
    }

    nav('/admin')
  }

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: '1rem' }}>
      <h1>Legg til nytt medlem</h1>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      <form onSubmit={onSubmit}>
        <label>
          Navn:<br />
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </label>
        <br /><br />
        <label>
          Passord:<br />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>
        <br /><br />
        <label>
          Medlemskap:<br />
          <select
            value={membership}
            onChange={e => setMembership(e.target.value)}
            required
          >
            <option value="">Velg medlemskap…</option>
            {types.map(t => (
              <option key={t.id} value={t.membership_type}>
                {t.membership_type} ({t.price} kr)
              </option>
            ))}
          </select>
        </label>
        <br /><br />
        <button type="submit" disabled={loading} style={{ width: '100%' }}>
          {loading ? 'Lagrer…' : 'Legg til medlem'}
        </button>
      </form>
    </div>
)
}

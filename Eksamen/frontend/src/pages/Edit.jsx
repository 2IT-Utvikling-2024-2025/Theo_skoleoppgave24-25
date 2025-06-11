// src/pages/Edit.jsx
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function Edit() {
  const { id } = useParams()
  const nav = useNavigate()

  // Skjema‐state
  const [name, setName]             = useState('')
  const [membership, setMembership] = useState('')
  const [types, setTypes]           = useState([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState('')

  // Hent medlem + typer parallelt
  useEffect(() => {
    Promise.all([
      fetch(`/api/members/${id}`).then(r => r.json()),
      fetch('/api/members/types').then(r => r.json())
    ])
      .then(([member, types]) => {
        setName(member.name)
        setMembership(member.membership_type)
        setTypes(types)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setError('Kunne ikke laste data')
        setLoading(false)
      })
  }, [id])

  const onSubmit = async e => {
    e.preventDefault()
    const res = await fetch(`/api/members/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        membership_type: membership
      })
    })
    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      setError(body.error || 'Noe gikk galt ved oppdatering')
      return
    }
    nav('/admin')
  }

  if (loading) return <p>Laster inn data…</p>

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: '1rem' }}>
      <h1>Rediger medlem #{id}</h1>
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
        <button type="submit" style={{ width: '100%' }}>
          Oppdater medlem
        </button>
      </form>
    </div>
  )
}

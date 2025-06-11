import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function UserRegister() {
  const [name, setName]             = useState('')
  const [password, setPassword]     = useState('')
  const [membership, setMembership] = useState('Basis')
  const [error, setError]           = useState('')
  const [loading, setLoading]       = useState(false)
  const nav = useNavigate()

  const onSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const res = await fetch('/api/members', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({
        name,
        membership_type: membership,
        password
      })
    })
    setLoading(false)
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      return setError(err.error || 'Kunne ikke registrere.')
    }
    const user = await res.json()
    localStorage.setItem('memberId', user.id)
    nav('/user/dashboard')
  }

  return (
    <div style={{ padding:20, maxWidth:400, margin:'auto' }}>
      <h1>Registrer nytt medlem</h1>
      {error && <div style={{ color:'crimson', marginBottom:10 }}>{error}</div>}
      <form onSubmit={onSubmit}>
        <div>
          <label>Navn:<br/>
            <input
              type="text" value={name}
              onChange={e => setName(e.target.value)}
              required style={{ width:'100%' }}
            />
          </label>
        </div>
        <div style={{ marginTop:10 }}>
          <label>Passord:<br/>
            <input
              type="password" value={password}
              onChange={e => setPassword(e.target.value)}
              required style={{ width:'100%' }}
            />
          </label>
        </div>
        <div style={{ marginTop:10 }}>
          <label>Medlemskap:<br/>
            <select
              value={membership}
              onChange={e => setMembership(e.target.value)}
              style={{ width:'100%' }}
            >
              <option>Basis (299kr)</option>
              <option>Premium (599kr)</option>
            </select>
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{ marginTop:20, width:'100%' }}
        >
          {loading ? 'Registrerer…' : 'Registrer'}
        </button>
      </form>
      <p style={{ textAlign:'center', marginTop:15 }}>
        Har allerede konto?{' '}
        <button onClick={() => nav('/user/login')}>Logg inn</button>
      </p>
    </div>
  )
}

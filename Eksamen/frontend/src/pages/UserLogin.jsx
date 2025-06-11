import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function UserLogin() {
  const [name, setName]         = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const nav = useNavigate()

  const onLogin = async (e) => {
    e.preventDefault()
    // Klient-side validering
    if (!name.trim() || !password) {
      setError('Fyll inn både navn og passord')
      return
    }

    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ name, password })
      })
      const data = await res.json()

      if (res.status === 401) {
        // Ugyldig brukernavn/passord
        setError(data.error || 'Ugyldig navn eller passord')
      } else if (!res.ok) {
        // Andre server-feil
        setError(data.error || 'Noe gikk galt, prøv igjen senere')
      } else {
        // Succes! Gå til dashbord
        localStorage.setItem('memberId', data.id)
        nav('/user/dashboard')
      }
    } catch (err) {
      // Nettverks- eller kodefeil
      console.error(err)
      setError('Kunne ikke kontakte serveren')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding:20, maxWidth:350, margin:'2rem auto' }}>
      <h1>Logg inn</h1>

      {error && (
        <div style={{ 
          color: 'crimson',
          marginBottom: '1rem',
          padding: '0.5rem',
          border: '1px solid crimson',
          borderRadius: 4
        }}>
          {error}
        </div>
      )}

      <form onSubmit={onLogin}>
        <label style={{ display: 'block', marginBottom: 10 }}>
          Navn:<br/>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            placeholder="Brukernavn"
            style={{ width:'100%', padding:8, boxSizing:'border-box' }}
          />
        </label>

        <label style={{ display: 'block', marginBottom: 20 }}>
          Passord:<br/>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            placeholder="Passord"
            style={{ width:'100%', padding:8, boxSizing:'border-box' }}
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '10px',
            background: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Logger inn…' : 'Logg inn'}
        </button>
      </form>

      <p style={{ textAlign:'center', marginTop: 15 }}>
        Ny bruker?{' '}
        <button
          onClick={() => nav('/user/register')}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#007bff',
            textDecoration: 'underline',
            cursor: 'pointer'
          }}
        >
          Registrer deg
        </button>
      </p>
    </div>
  )
}

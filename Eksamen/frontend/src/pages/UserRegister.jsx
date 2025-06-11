// src/pages/UserRegister.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserRegister() {
  const nav = useNavigate();

  // Skjema‐state
  const [name, setName]             = useState('');
  const [password, setPassword]     = useState('');
  const [membershipType, setMembershipType] = useState('');
  const [types, setTypes]           = useState([]);
  const [error, setError]           = useState('');
  const [loading, setLoading]       = useState(false);

  // Hent alle medlemskapstyper fra backend
  useEffect(() => {
    fetch('/api/members/types')
      .then(res => res.json())
      .then(setTypes)
      .catch(console.error);
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    if (!membershipType) {
      setError('Velg et medlemskap');
      return;
    }
    setError('');
    setLoading(true);

    const res = await fetch('/api/members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        password,
        membership_type: membershipType   // sender tekst, ikke ID
      })
    });

    setLoading(false);

    if (res.status === 400) {
      const body = await res.json().catch(() => ({}));
      setError(body.error || 'Ugyldig medlemskapstype');
      return;
    }
    if (!res.ok) {
      setError('En intern feil oppstod.');
      return;
    }

    const user = await res.json();
    localStorage.setItem('memberId', user.id);
    nav('/user/dashboard');
  };

  return (
    <div className="container">
      <h1>Registrer deg som medlem</h1>
      {error && <p style={{ color: 'crimson', marginBottom: '1rem' }}>{error}</p>}
      <form onSubmit={onSubmit}>
        <label>
          Navn:
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Passord:
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>

        <label>
          Medlemskap:
          <select
            value={membershipType}
            onChange={e => setMembershipType(e.target.value)}
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

        <button
          type="submit"
          disabled={loading}
          style={{ marginTop: '1rem', width: '100%' }}
        >
          {loading ? 'Registrerer…' : 'Registrer'}
        </button>
      </form>

      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        Allerede medlem?{' '}
        <button
          onClick={() => nav('/user/login')}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#007bff',
            textDecoration: 'underline',
            cursor: 'pointer'
          }}
        >
          Logg inn
        </button>
      </p>
    </div>
  );
}

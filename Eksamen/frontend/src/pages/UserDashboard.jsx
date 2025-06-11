// src/pages/UserDashboard.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserDashboard() {
  const nav = useNavigate();
  const memberId = localStorage.getItem('memberId');
  const [member, setMember]     = useState(null);
  const [bookings, setBookings] = useState([]);
  const [status, setStatus]     = useState('loading');
  const [error, setError]       = useState('');

  useEffect(() => {
    if (!memberId) return nav('/user/login');
    // hente medlemsdata + bookinger
    Promise.all([
      fetch(`/api/members/${memberId}`),
      fetch(`/api/bookings/${memberId}`)
    ])
      .then(async ([mr, br]) => {
        if (!mr.ok) throw new Error('Kunne ikke hente bruker');
        if (!br.ok) throw new Error('Kunne ikke hente bookinger');
        const m = await mr.json();
        const b = await br.json();
        setMember(m);
        setBookings(b);
        setStatus('ready');
      })
      .catch(err => {
        setError(err.message);
        setStatus('error');
      });
  }, []);

  const cancelMembership = async () => {
    if (!confirm('Avslutte medlemskap?')) return;
    await fetch(`/api/members/${memberId}`, { method: 'DELETE' });
    localStorage.removeItem('memberId');
    nav('/user/register');
  };

  const toggleMembership = async () => {
    const newType = member.membership_type === 'Basis' ? 'Premium' : 'Basis';
    await fetch(`/api/members/${memberId}`, {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        name: member.name,
        membership_type: newType
      })
    });
    // oppdater view
    const updated = await fetch(`/api/members/${memberId}`).then(r=>r.json());
    setMember(updated);
  };

  const bookSpinning = async () => {
    await fetch('/api/bookings', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ member_id: memberId, class_type: 'Spinning' })
    });
    const b = await fetch(`/api/bookings/${memberId}`).then(r=>r.json());
    setBookings(b);
  };

  if (status === 'loading') return <p>Laster…</p>;
  if (status === 'error')   return <p style={{ color:'crimson' }}>{error}</p>;

  return (
    <>
      <h1>Velkommen, {member.name}!</h1>
      <p>
        <strong>Medlemskap:</strong>{' '}
        {member.membership_type} ({member.price} kr)
      </p>
      <button onClick={cancelMembership} style={{ background:'#b0003a', marginRight:10 }}>
        Avslutt medlemskap
      </button>
      <button onClick={toggleMembership} style={{ background:'#007bff' }}>
        {member.membership_type === 'Basis' ? 'Oppgrader til Premium' : 'Nedgrader til Basis'}
      </button>

      {member.membership_type === 'Premium' && (
        <section style={{ marginTop: '2rem' }}>
          <h2>Spinning-booking</h2>
          <button onClick={bookSpinning}>Book spinningtime</button>
          {bookings.length
            ? (
              <ul style={{ marginTop: '1rem' }}>
                {bookings.map(b => (
                  <li key={b.id}>
                    {new Date(b.booked_at).toLocaleString()}
                  </li>
                ))}
              </ul>
            )
            : <p>Ingen bookinger enda.</p>
          }
        </section>
      )}
    </>
  );
}

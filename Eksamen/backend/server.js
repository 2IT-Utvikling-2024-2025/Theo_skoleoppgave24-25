// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { ensureTable } = require('./db');
const membersRouter  = require('./routes/members');
const bookingsRouter = require('./routes/bookings');
const authRouter     = require('./routes/auth');
const membershipTypesRouter = require('./routes/memberShipTypes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// (valgfritt) sørg for at tabellene dine er på plass
ensureTable().catch(err => {
  console.error('Kunne ikke opprette tabeller:', err);
  process.exit(1);
});

// Mount dine API-ruter
app.use('/api/members', membersRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/auth', authRouter);
app.use('/api/membership_types', membershipTypesRouter);

// Enkel feilhåndtering
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'En intern feil oppstod.' });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Backend kjører på http://localhost:${port}`);
});

// backend/server.js

// … helt nederst …
app.use((err, req, res, next) => {
  const msg = err.sqlMessage || err.message || 'Ukjent feil';
  console.error('SQL-ERROR:', msg);
  res.status(500).json({ error: msg });
});


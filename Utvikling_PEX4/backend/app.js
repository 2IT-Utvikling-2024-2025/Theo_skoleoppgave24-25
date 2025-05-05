// app.js
const express = require('express');
const cors = require('cors');
const app = express();

// Hent router
const router = require('./routes/route');

// Midware
app.use(cors());
app.use(express.json());

// Bruk router med prefix "/api"
app.use('/api', router);

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log('Server kjører på port ' + PORT);
});

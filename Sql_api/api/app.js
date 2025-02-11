const express = require('express');

const routes = require('./v1/routes/routes');

const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Define Main Route
app.use('/v1/routes', routes);

// Routes

app.listen(3000, () => 
    console.log('Server running on port 3000')
);
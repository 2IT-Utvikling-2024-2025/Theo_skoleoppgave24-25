const express = require('express');
const cors = require('cors');

const authRoutes = require('./v1/routes/AuthRoutes');
const dashRoutes = require('./v1/routes/dashRoutes');

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use('/api/v1/auth', authRoutes);

app.use('/api/v1/dashboard', dashRoutes);

//Start server
app.listen(3000, () => {
    console.log('Server on port', 3000);
});

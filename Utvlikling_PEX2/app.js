const express = require('express');

const productRoutes = require('./v1/routes/productRoutes');

const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Define Main Route
app.use('/v1/products', productRoutes);

// Routes

app.listen(3000, () => 
    console.log('Server running on port 3000')
);
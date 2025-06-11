const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'skole123', // Endre til ditt MySQL passord
    database: 'product_management'
};

// GET /products - Hent alle produkter
app.get('/products', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM product ORDER BY product_id DESC');
        await connection.end();
        
        res.json(rows);
    } catch (error) {
        console.error('Feil ved henting av produkter:', error);
        res.status(500).json({ error: 'Kunne ikke hente produkter' });
    }
});

// POST /product - Opprett nytt produkt
app.post('/product', async (req, res) => {
    const { name, price } = req.body;
    
    // Validering
    if (!name || !price) {
        return res.status(400).json({ error: 'Navn og pris er påkrevd' });
    }
    
    if (isNaN(price) || price <= 0) {
        return res.status(400).json({ error: 'Pris må være et gyldig tall større enn 0' });
    }
    
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(
            'INSERT INTO product (name, price) VALUES (?, ?)',
            [name, parseFloat(price)]
        );
        await connection.end();
        
        res.status(201).json({ 
            message: 'Produkt opprettet', 
            product_id: result.insertId,
            name,
            price: parseFloat(price)
        });
    } catch (error) {
        console.error('Feil ved opprettelse av produkt:', error);
        res.status(500).json({ error: 'Kunne ikke opprette produkt' });
    }
});

// DELETE /product - Slett produkt
app.delete('/product', async (req, res) => {
    const { product_id } = req.body;
    
    // Validering
    if (!product_id) {
        return res.status(400).json({ error: 'product_id er påkrevd' });
    }
    
    if (isNaN(product_id)) {
        return res.status(400).json({ error: 'product_id må være et gyldig tall' });
    }
    
    try {
        const connection = await mysql.createConnection(dbConfig);
        
        // Sjekk om produktet eksisterer
        const [existing] = await connection.execute(
            'SELECT * FROM product WHERE product_id = ?',
            [product_id]
        );
        
        if (existing.length === 0) {
            await connection.end();
            return res.status(404).json({ error: 'Produkt ikke funnet' });
        }
        
        // Slett produktet
        await connection.execute(
            'DELETE FROM product WHERE product_id = ?',
            [product_id]
        );
        await connection.end();
        
        res.json({ message: 'Produkt slettet', product_id: parseInt(product_id) });
    } catch (error) {
        console.error('Feil ved sletting av produkt:', error);
        res.status(500).json({ error: 'Kunne ikke slette produkt' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server kjører på http://localhost:${PORT}`);
});

module.exports = app;
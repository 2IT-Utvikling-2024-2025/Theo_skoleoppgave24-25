const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Koble til MySQL databasen
// KOMMENTAR: Erstatt med dine egne database-detaljer
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'skole123',
    database: 'vhd_produkter'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL koblet til');
});

// Hent alle produkter
app.get('/api/products', (req, res) => {
    let sql = 'SELECT * FROM products';
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Databasefeil' });
        }
        return res.json(results);
    });
});

// Hent spesifikt produkt med ID
app.get('/api/products/:id', (req, res) => {
    let sql = `SELECT * FROM products WHERE id = ${req.params.id}`;
    db.query(sql, (err, product) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Databasefeil' });
        }
        
        if (product.length === 0) {
            return res.status(404).json({ error: 'Produkt ikke funnet' });
        }
        
        // Hent spesifikasjoner for produktet
        sql = `SELECT specification FROM product_specifications WHERE product_id = ${req.params.id}`;
        db.query(sql, (err, specs) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Databasefeil' });
            }
            
            // Konverter spesifikasjoner til et array
            const specifications = specs.map(spec => spec.specification);
            
            // Returner produkt med spesifikasjoner
            return res.json({
                ...product[0],
                specifications
            });
        });
    });
});

// Opprett ny ordre
app.post('/api/orders', (req, res) => {
    const { product_id, customer_name, customer_email, customer_phone } = req.body;
    
    if (!product_id || !customer_name || !customer_email) {
        return res.status(400).json({ error: 'Mangler påkrevde felt' });
    }
    
    const order = {
        product_id,
        customer_name,
        customer_email,
        customer_phone,
        order_date: new Date()
    };
    
    let sql = 'INSERT INTO orders SET ?';
    db.query(sql, order, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Kunne ikke opprette ordre' });
        }
        return res.status(201).json({
            order_id: result.insertId,
            message: 'Ordre opprettet'
        });
    });
});

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server startet på port ${PORT}`));
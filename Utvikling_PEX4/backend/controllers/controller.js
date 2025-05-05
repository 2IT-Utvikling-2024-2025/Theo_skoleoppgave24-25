// controllers/Controller.js
const db = require('../Data/db');

/**
 * Hent alle produkter (med spesifikasjoner)
 */
exports.getAllProducts = (req, res) => {
  const productSql = 'SELECT * FROM products';
  db.query(productSql, (err, products) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Feil ved henting av produkter' });
    }

    const specSql = 'SELECT * FROM product_specifications';
    db.query(specSql, (err, specs) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Feil ved henting av spesifikasjoner' });
      }

      // Legger spesifikasjoner inn i en "specs"-array for hvert produkt
      const productsWithSpecs = products.map((prod) => {
        const productSpecs = specs
          .filter(s => s.product_id === prod.id)
          .map(s => s.specification);

        return {
          ...prod,
          specs: productSpecs
        };
      });

      res.json(productsWithSpecs);
    });
  });
};

/**
 * Hent ETT produkt (/:id)
 */
exports.getOneProduct = (req, res) => {
  const { id } = req.params;

  const productSql = 'SELECT * FROM products WHERE id = ?';
  db.query(productSql, [id], (err, productResults) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Feil ved henting av produkt' });
    }
    if (productResults.length === 0) {
      return res.status(404).json({ error: 'Produkt ikke funnet' });
    }

    const specSql = 'SELECT specification FROM product_specifications WHERE product_id = ?';
    db.query(specSql, [id], (err, specResults) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Feil ved henting av spesifikasjoner' });
      }

      const product = productResults[0];
      const specs = specResults.map(s => s.specification);

      res.json({ ...product, specs });
    });
  });
};

/**
 * Opprett ny ordre (POST /orders)
 */
exports.createOrder = (req, res) => {
  const { product_id, customer_name, customer_email, customer_phone } = req.body;

  // Enkel validering
  if (!product_id || !customer_name || !customer_email) {
    return res.status(400).json({ error: 'Mangler nødvendig data i body' });
  }

  const sql = `
    INSERT INTO orders (product_id, customer_name, customer_email, customer_phone, order_date)
    VALUES (?, ?, ?, ?, NOW())
  `;

  db.query(sql, [product_id, customer_name, customer_email, customer_phone], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Feil ved oppretting av ordre' });
    }
    res.status(201).json({ message: 'Ordre opprettet', orderId: result.insertId });
  });
};

/**
 * Hent alle ordre (GET /orders)
 */
exports.getAllOrders = (req, res) => {
  const sql = `
    SELECT o.id, o.product_id, p.name AS product_name,
           o.customer_name, o.customer_email, o.customer_phone, o.order_date
    FROM orders o
    JOIN products p ON o.product_id = p.id
    ORDER BY o.id DESC
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Feil ved henting av ordre' });
    }
    res.json(results);
  });
};

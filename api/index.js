require('dotenv').config();
const express = require('express');
const connectDB = require('./connectDB');
const handleProduct = require('./product/handleProduct');
const path = require('path');
const getProducts = require('./product/getProducts');

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use((req, res, next) => {
  if (req.originalUrl.startsWith('/img')) {
    next();
    return;
  }

  const headers = req.headers;
  if (headers.token !== process.env.TOKEN) {
    console.log(
      `Somebody try to connect without token at ${new Date().toLocaleString()}`,
    );
    return;
  } else {
    next();
  }
});

app.use('/img', express.static(path.resolve(__dirname, 'uploads/')));

app.post('/api/product', handleProduct);

app.get('/api/product', async (req, res) => {
  const products = await getProducts();
  if (products.error) {
    res.json({status: 404, success: false, error: products.error});
  }

  res.json({status: 200, success: true, products: products.products});
});

app.listen(port, () => {
  console.log(`Server has been started on port ${port}`);
});

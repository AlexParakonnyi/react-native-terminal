require('dotenv').config();
const express = require('express');
const connectDB = require('./connectDB');
const handleProduct = require('./product/handleProduct');
const path = require('path');
const getProducts = require('./product/getProducts');
const moment = require('moment');
const getProductById = require('./product/getProductById');
const updateProduct = require('./product/updateProduct');
const deleteProduct = require('./product/deleteProduct');

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use((req, res, next) => {
  if (req.originalUrl.startsWith('/img')) {
    next();
    return;
  }

  const headers = req.headers;
  const hasToken = headers.token === process.env.TOKEN;

  const LOG = `${req.protocol}://${req.get('host')}${
    req.originalUrl
  }: ${moment().format()} ${!hasToken ? '- NO TOKEN' : ''}`;

  console.log(LOG);

  if (hasToken) next();
  else return;
});

app.use('/img', express.static(path.resolve(__dirname, 'uploads/')));

app.post('/api/products', handleProduct);

//gets all products
app.get('/api/products', async (req, res) => {
  const products = await getProducts();
  if (products.error) {
    res.json({status: 404, success: false, error: products.error});
  }

  res.json({status: 200, success: true, products: products.products});
});

//gets single product
app.get('/api/products/:id', async (req, res) => {
  const id = req.params.id;
  const product = id ? await getProductById(id) : null;
  if (product.error) {
    res.json({status: 404, success: false, error: product.error});
  }

  res.json({status: 200, success: true, product: product.product});
});

//update product
app.put('/api/products/:id', updateProduct);

//delete product
app.delete('/api/products/:id', deleteProduct);

app.listen(port, () => {
  console.log(`Server has been started on port ${port}`);
});

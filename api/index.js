require('dotenv').config();
const express = require('express');
const connectDB = require('./connectDB');
const handleProduct = require('./product/handleProduct');

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use((req, res, next) => {
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

app.post('/api/product', handleProduct);

app.get('/api', (req, res) => {
  console.log('OK');
  res.send('OK');
});

app.listen(port, () => {
  console.log(`Server has been started on port ${port}`);
});

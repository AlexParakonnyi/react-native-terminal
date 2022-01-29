require('dotenv').config();
const express = require('express');
const {connect} = require('http2');
const multer = require('multer');
const path = require('path');
const connectDB = require('./connectDB');

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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});

const upload = multer({storage: storage});

app.post('/api', upload.single('image'), (req, res) => {
  const formData = req.body;
  console.log('form data', formData);
  res.json({status: 200});
});

app.get('/api', (req, res) => {
  console.log('OK');
  res.send('OK');
});

app.listen(port, () => {
  console.log(`Server has been started on port ${port}`);
});

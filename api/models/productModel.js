const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  number: {
    type: Number,
  },
  img: {
    type: String,
  },
});

module.exports =
  mongoose.models.product || mongoose.model('product', productSchema);

const product = require('../models/productModel');
const path = require('path');
const fs = require('fs');
const uploadFile = require('../uploadByMulter');

const findProduct = async el => {
  try {
    const result = await product.findOne({name: el.name});
    return result;
  } catch (e) {
    console.log(e);
  }
};

const createProduct = async req => {
  const el = {...req.body, img: req.file.filename};
  try {
    const foundEl = await findProduct(el);
    if (foundEl) {
      console.log(`This name ${foundEl.name} already exists`);
      return {status: 200, error: `This name ${el.name} already exists`};
    }

    const newProduct = new product({...el});
    await newProduct.save(err => {
      if (err) throw err;
    });

    return {status: 200, error: false, success: true};
  } catch (e) {
    return {status: 404, error: e.message};
  }
};

const handleProduct = (req, res) => {
  uploadFile(req, res, async err => {
    if (err) res.json({status: 200, error: err});
    const result = await createProduct(req);
    res.json({...result});

    if (result.error) {
      fs.unlink(
        path.resolve(__dirname, '../', 'uploads/', req.file.filename),
        err => {
          if (err) console.log('Error inside unlink', err);
        },
      );
    }
  });
};

module.exports = handleProduct;

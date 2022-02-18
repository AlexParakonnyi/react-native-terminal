const Product = require('../models/productModel');
const uploadFile = require('../utils/uploadByMulter');
const validateFields = require('../utils/vaalidateFields');

const updateProduct = (req, res) => {
  uploadFile(req, res, async err => {
    if (err) res.json({status: 200, error: err.message});
    const _id = req.params.id;
    const filter = {_id};
    const product = validateFields({...req.body});
    try {
      const updated = await Product.findOneAndUpdate(filter, product, {
        returnOriginal: false,
      });

      // console.log('UPDATED', updated);

      res.json({status: 200, error: false, product: updated});
    } catch (err) {
      console.log(err);
      res.json({status: 404, error: err.message});
    }
  });
};

module.exports = updateProduct;

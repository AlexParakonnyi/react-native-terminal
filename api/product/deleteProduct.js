const Product = require('../models/productModel');
const getProductById = require('./getProductById');
const {deleteFiles} = require('./handleFile');

const deleteProduct = async (req, res) => {
  const _id = req.params.id;

  const respObj = await getProductById(_id);
  const allSpecificImages = await Product.find({
    img: respObj.product[0].img,
  });

  //delete only single image. If db has a link on another product with the same image, it could be wrong move
  if (allSpecificImages.length === 1) deleteFiles(respObj.product[0].img);

  try {
    const deleted = await Product.deleteOne({_id});
    res.json({status: 200, error: false, product: deleted});
  } catch (err) {
    console.log(err);
    res.json({status: 404, error: err.message});
  }
};

module.exports = deleteProduct;

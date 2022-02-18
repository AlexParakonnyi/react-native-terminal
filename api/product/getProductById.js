const Products = require('../models/productModel');
const ObjectId = require('mongoose').Types.ObjectId;

const getProduct = async id => {
  try {
    const product = await Products.aggregate([
      {
        $project: {
          id: '$id',
          name: '$name',
          description: '$description',
          number: '$number',
          price: '$price',
          img: '$img',
        },
      },
      {
        $match: {
          _id: ObjectId(id),
        },
      },
    ]);

    return {product};
  } catch (error) {
    return {error};
  }
};

module.exports = getProduct;

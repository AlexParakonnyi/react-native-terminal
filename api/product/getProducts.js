const Products = require('../models/productModel');

const getProducts = async () => {
  try {
    const products = await Products.aggregate([
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
    ]);

    return {products};
  } catch (error) {
    return {error};
  }
};

module.exports = getProducts;

const product = require('../models/productModel');
const uploadFile = require('../utils/uploadByMulter');
const validateFields = require('../utils/vaalidateFields');

const {handleFile, deleteFiles} = require('./handleFile');

const findProduct = async el => {
  try {
    const result = await product.findOne({name: el.name});
    return result;
  } catch (e) {
    console.log(e);
  }
};

const createProduct = async el => {
  try {
    const foundEl = await findProduct(el);
    if (foundEl) {
      console.log(`This name ${foundEl.name} already exists`);
      return {status: 200, error: `Такое имя ${el.name} уже существует`};
    }

    const validatedEl = validateFields(el);
    const newProduct = new product(validatedEl);
    await newProduct.save(err => {
      if (err) throw err;
    });

    return {status: 200, error: false, product: newProduct};
  } catch (e) {
    return {status: 404, error: e.message};
  }
};

const handleProduct = async (req, res) => {
  uploadFile(req, res, async err => {
    if (err) res.json({status: 200, error: err});

    const fileName = req.file ? await handleFile(req) : process.env.NONE_IMAGE;

    const el = {...req.body, img: fileName};

    const result = await createProduct(el);
    res.json({...result});

    if (result.error && req.file) {
      console.log(result.error);
      deleteFiles(fileName);
    }
  });
};

module.exports = handleProduct;

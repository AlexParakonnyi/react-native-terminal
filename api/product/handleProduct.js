const product = require('../models/productModel');
const uploadFile = require('../uploadByMulter');

const {
  getFileInfo,
  deleteFile,
  renameFile,
  resizeImage,
} = require('./handleFile');

const findProduct = async el => {
  try {
    const result = await product.findOne({name: el.name});
    return result;
  } catch (e) {
    console.log(e);
  }
};

const findImage = async img => {
  try {
    const result = await product.findOne({img});
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

    const newProduct = new product({...el});
    await newProduct.save(err => {
      if (err) throw err;
    });

    return {status: 200, error: false};
  } catch (e) {
    return {status: 404, error: e.message};
  }
};

const handleProduct = async (req, res) => {
  uploadFile(req, res, async err => {
    if (err) res.json({status: 200, error: err});

    const fileInfo = getFileInfo(req);

    const foundImage = await findImage(fileInfo.hashFullFilename);
    if (foundImage) {
      deleteFile(fileInfo.oldImgUrl);
    } else {
      await resizeImage(fileInfo.oldImgUrl, fileInfo.smallImgUrl);
      renameFile(fileInfo.oldImgUrl, fileInfo.newImgUrl);
    }

    const el = {...req.body, img: fileInfo.hashFullFilename};

    const result = await createProduct(el);
    res.json({...result});

    if (result.error) {
      console.log(result.error);
      deleteFile(fileInfo.hashFullFilename);
    }
  });
};

module.exports = handleProduct;

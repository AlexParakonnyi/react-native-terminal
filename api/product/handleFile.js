const path = require('path');
const fs = require('fs');
const getHash = require('../utils/getHash');
const sharp = require('sharp');
const product = require('../models/productModel');

const getSmallImage = name => {
  return path.resolve(__dirname, '../', process.env.SMALL_IMAGES_PATH, name);
};

const getOriginalImage = name => {
  return path.resolve(__dirname, '../', process.env.ORIGINAL_IMAGES_PATH, name);
};

const getFileInfo = req => {
  const oldImgUrl = path.resolve(
    __dirname,
    '../',
    process.env.ORIGINAL_IMAGES_PATH,
    req.file.filename,
  );

  const hashFilename = getHash({fileName: oldImgUrl});

  const fileExt = path.extname(req.file.filename);

  const hashFullFilename = `${hashFilename}${fileExt}`;

  const newImgUrl = getOriginalImage(hashFullFilename);

  const smallImgUrl = getSmallImage(hashFullFilename);

  return {
    oldImgUrl,
    hashFilename,
    fileExt,
    hashFullFilename,
    newImgUrl,
    smallImgUrl,
  };
};

const deleteFiles = name => {
  const arrPath = [getSmallImage(name), getOriginalImage(name)];
  arrPath.forEach(file => {
    fs.unlink(file, err => {
      if (err) console.log('Error inside unlink', err.message);
    });
  });
};

const renameFile = (oldName, newName) => {
  fs.rename(oldName, newName, err => {
    if (err) {
      console.log('ERROR: ' + err);
      deleteFile(oldName);
    }
  });
};

const resizeImage = async (file, newFileName) => {
  // console.log('@@@', file);
  await sharp(file).resize(200).toFile(newFileName);
};

const findImage = async img => {
  try {
    const result = await product.findOne({img});
    return result;
  } catch (e) {
    console.log(e);
  }
};

const handleFile = async req => {
  const fileInfo = getFileInfo(req);
  const foundImage = await findImage(fileInfo.hashFullFilename);
  // console.log('@@@', foundImage);
  if (foundImage) {
    deleteFiles(fileInfo.oldImgUrl);
  } else {
    await resizeImage(fileInfo.oldImgUrl, fileInfo.smallImgUrl);
    renameFile(fileInfo.oldImgUrl, fileInfo.newImgUrl); //rename original file
  }

  return fileInfo.hashFullFilename;
};

module.exports = {
  handleFile,
  getFileInfo,
  deleteFiles,
  renameFile,
  resizeImage,
};

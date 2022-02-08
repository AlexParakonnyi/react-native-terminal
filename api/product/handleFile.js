const path = require('path');
const fs = require('fs');
const getHash = require('../utils/getHash');
const sharp = require('sharp');

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

  const newImgUrl = path.resolve(
    __dirname,
    '../',
    process.env.ORIGINAL_IMAGES_PATH,
    hashFullFilename,
  );

  const smallImgUrl = path.resolve(
    __dirname,
    '../',
    process.env.SMALL_IMAGES_PATH,
    hashFullFilename,
  );

  return {
    oldImgUrl,
    hashFilename,
    fileExt,
    hashFullFilename,
    newImgUrl,
    smallImgUrl,
  };
};

const deleteFile = file => {
  fs.unlink(file, err => {
    if (err) console.log('Error inside unlink', err);
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

module.exports = {getFileInfo, deleteFile, renameFile, resizeImage};

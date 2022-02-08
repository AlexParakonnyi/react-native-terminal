const crypto = require('crypto');
const fs = require('fs');

const getHash = ({fileName, buffer}) => {
  const fileBuffer = buffer || fs.readFileSync(fileName);
  const hashSum = crypto.createHash('sha256');
  hashSum.update(fileBuffer);

  return hashSum.digest('hex');
};

module.exports = getHash;

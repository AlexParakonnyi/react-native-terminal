const validateFields = el => {
  const {number, price} = el;
  const parseNum = parseInt(number) || 0;
  const parsePrice = parseFloat(price) || 0;
  return {...el, number: parseNum, price: parsePrice};
};

module.exports = validateFields;

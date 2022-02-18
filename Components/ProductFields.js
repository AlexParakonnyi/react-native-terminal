import React, {useEffect, useState} from 'react';
import InputBlock from './InputBlock';

const ProductFields = ({
  product,
  handlerName,
  handlerNumber,
  handlerPrice,
  handlerDescription,
}) => {
  return (
    <>
      <InputBlock
        name="Название"
        number={false}
        value={product.name}
        handler={handlerName}
      />
      <InputBlock
        name="Описание"
        number={false}
        value={product.description}
        handler={handlerDescription}
      />
      <InputBlock
        name="Кол-во"
        number={true}
        value={product.number}
        handler={handlerNumber}
      />
      <InputBlock
        name="Цена"
        number={true}
        value={product.price}
        handler={handlerPrice}
      />
    </>
  );
};

export default ProductFields;

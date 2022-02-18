import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import ProductFields from './ProductFields';
import ButtonPanelRow from './ButtonPanelRow';
import Gap from './Gap';
import ButtonSaveProduct from './ButtonSaveProduct';
import ButtonDeleteProduct from './ButtonDeleteProduct';
import ProductImageCard from './ProductImageCard';

const ProductCard = ({navigation, route}) => {
  const product = route?.params?.product;

  const initialState = {
    fields: {
      name: '',
      description: '',
      number: null,
      price: null,
    },
    imageFile: null,
  };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    setState(() => ({
      fields: {
        name: product?.name || '',
        description: product?.description || '',
        number: product?.number || null,
        price: product?.price || null,
      },
      imageFile: product?.imageFile || null,
    }));
  }, [product]);

  const handlerName = value => {
    setState(prev => ({...prev, fields: {...prev.fields, name: value}}));
  };

  const handlerNumber = value => {
    setState(prev => ({...prev, fields: {...prev.fields, number: value}}));
  };

  const handlerPrice = value => {
    setState(prev => ({...prev, fields: {...prev.fields, price: value}}));
  };

  const handlerDescription = value => {
    setState(prev => ({...prev, fields: {...prev.fields, description: value}}));
  };

  const clearFields = () => {
    setState(initialState);
  };

  // console.log('ROUTE', route.params.product);
  return (
    <ScrollView style={{width: '100%'}} keyboardShouldPersistTaps={'handled'}>
      <ProductImageCard img={state.imageFile} />
      <ProductFields
        product={state.fields}
        handlerName={handlerName}
        handlerNumber={handlerNumber}
        handlerPrice={handlerPrice}
        handlerDescription={handlerDescription}
      />
      <ButtonPanelRow>
        <ButtonSaveProduct
          navigation={navigation}
          idForUpdate={product?._id}
          fields={state.fields}
          clearFields={clearFields}
        />
        <Gap />
        <ButtonDeleteProduct navigation={navigation} id={product?._id} />
      </ButtonPanelRow>
    </ScrollView>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    width: '100%',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 10,
  },
});

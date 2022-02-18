import React, {useState, createContext, useContext} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import ProductFields from './ProductFields';
import ButtonPanelRow from './ButtonPanelRow';
import ButtonAddPhoto from './ButtonAddPhoto';
import ButtonDeletePhoto from './ButtonDeletePhoto';
import Gap from './Gap';
import ButtonSaveProduct from './ButtonSaveProduct';
import ButtonClearFields from './ButtonClearFields';
import ImageProductCard from './ProductImageCard';

export const ThemeContext = createContext();

export const useThemeContext = () => {
  return useContext(ThemeContext);
};

const CreateProduct = ({navigation}) => {
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

  const handlerImageFile = value => {
    setState(prev => ({...prev, imageFile: value}));
  };

  return (
    <ScrollView style={{width: '100%'}} keyboardShouldPersistTaps={'handled'}>
      <ImageProductCard img={state.imageFile} />
      <ButtonPanelRow>
        <ThemeContext.Provider value={{handlerImageFile}}>
          <ButtonAddPhoto />
        </ThemeContext.Provider>
        <Gap />
        <ButtonDeletePhoto handlerImageFile={handlerImageFile} />
      </ButtonPanelRow>
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
          fields={state.fields}
          imageFile={state.imageFile}
          clearFields={clearFields}
          handlerImageFile={handlerImageFile}
        />
        <Gap />
        <ButtonClearFields clearFields={clearFields} />
      </ButtonPanelRow>
    </ScrollView>
  );
};

export default CreateProduct;

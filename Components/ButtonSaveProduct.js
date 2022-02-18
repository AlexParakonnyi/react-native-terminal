import React, {useContext} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {DataContext} from '../Store/DataProvider';
import Actions from '../Store/Actions';
import GlobalStyles from '../Styles/GlobalStyles';
import {postData, putData} from '../utils/fetchData';

const ButtonSaveProduct = ({
  navigation,
  idForUpdate,
  fields,
  imageFile,
  clearFields,
}) => {
  const {dispatch} = useContext(DataContext);
  const {name, description, number, price} = fields;

  const setToast = message => {
    dispatch({type: Actions.TOAST, payload: {toastMessage: message}});
  };

  const setCreateProduct = product => {
    dispatch({
      type: Actions.CREATE_PRODUCT,
      payload: {productId: product?._id},
    });
  };

  const validateName = value => {
    if (!value || !value.length) return false;
    return true;
  };

  const sendProduct = async () => {
    if (!validateName(name)) {
      setToast('Наименование не может быть пустым');
      return;
    }

    const data = new FormData();

    const image = {
      uri: imageFile?.uri,
      type: imageFile?.type,
      name: imageFile?.name,
    };

    data.append('name', name);
    data.append('description', description);
    data.append('number', number);
    data.append('price', price);

    if (!idForUpdate) imageFile && data.append('image', image);

    try {
      const respObj = idForUpdate
        ? await putData({path: `/api/products/${idForUpdate}`, data})
        : await postData({path: `/api/products`, data});

      const toastMessage = respObj.error
        ? respObj.error
        : 'Товар успешно сохранен';

      setToast(toastMessage);

      if (respObj?.status === 200) {
        clearFields();
        setCreateProduct(respObj?.product);
        navigation.navigate('ProductList');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TouchableOpacity
      style={[{flex: 2}, GlobalStyles.button]}
      onPress={sendProduct}
      activeOpacity={0.5}>
      <Text style={GlobalStyles.buttonText}>Сохранить</Text>
    </TouchableOpacity>
  );
};

export default ButtonSaveProduct;

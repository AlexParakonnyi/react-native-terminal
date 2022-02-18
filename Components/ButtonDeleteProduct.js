import React, {useContext, useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import GlobalStyles from '../Styles/GlobalStyles';
import {deleteData} from '../utils/fetchData';
import {DataContext} from '../Store/DataProvider';
import Actions from '../Store/Actions';
import Dialog from 'react-native-dialog';

const ButtonDeleteProduct = ({navigation, id}) => {
  const {dispatch} = useContext(DataContext);
  const [showDialog, setShowDialog] = useState(false);

  const openDialog = () => {
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  const setToast = message => {
    dispatch({type: Actions.TOAST, payload: {toastMessage: message}});
  };

  const updateProductList = () => {
    dispatch({
      type: Actions.CREATE_PRODUCT,
      payload: {productId: true},
    });
  };

  const removeProduct = async () => {
    try {
      const respObj = await deleteData({path: `/api/products/${id}`});
      const toastMessage = respObj.error ? respObj.error : 'Элемент удален';

      setToast(toastMessage);
      updateProductList();

      if (respObj?.status === 200) {
        navigation.navigate('ProductList');
      }
    } catch (err) {
      console.log(err);
    } finally {
      closeDialog();
    }
  };

  return (
    <>
      <TouchableOpacity
        style={[{flex: 2}, GlobalStyles.button, GlobalStyles.buttonDeleteColr]}
        onPress={openDialog}
        activeOpacity={0.5}>
        <Text style={GlobalStyles.buttonText}>Удалить</Text>
      </TouchableOpacity>
      <Dialog.Container visible={showDialog}>
        <Dialog.Title>Вы действительно хотите удалить элемент?</Dialog.Title>
        <Dialog.Button
          label="Подтверждаю"
          onPress={removeProduct}
          bold={true}
        />
        <Dialog.Button label="Отмена" onPress={closeDialog} color={'red'} />
      </Dialog.Container>
    </>
  );
};

export default ButtonDeleteProduct;

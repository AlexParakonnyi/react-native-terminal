import React, {useState, useEffect, useContext} from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import Toast from '../Toast';
import InputBlock from '../InputBlock';
import TakeImage from '../TakeImage';
import {TOKEN, URL} from '../../.env.js';
import {DataContext} from '../../Store/DataProvider';
import Actions from '../../Store/Actions';
import styles from './styles';

const ProductCard = ({pagerViewRef}) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState(null);
  const [price, setPrice] = useState(null);
  const [singleFile, setSingleFile] = useState(null);
  const [dialog, setDialog] = useState(false);
  const [visibleToast, setVisibleToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const {state, dispatch} = useContext(DataContext);

  const handleToast = () => setTimeout(() => setVisibleToast(false), 300);

  useEffect(() => handleToast, [visibleToast]);

  const showToast = message => {
    setToastMessage(message);
    setVisibleToast(true);
  };

  const openDialog = () => {
    setDialog(true);
  };

  const closeDialog = () => {
    setDialog(false);
  };

  const handlerName = value => {
    setName(value);
  };

  const handlerNumber = value => {
    setNumber(value);
  };

  const handlerPrice = value => {
    setPrice(value);
  };

  const handlerFile = value => {
    setSingleFile(value);
  };

  const clearfields = () => {
    handlerName('');
    handlerNumber(null);
    handlerPrice(null);
    handlerFile(null);
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

  const sendData = async () => {
    if (!validateName(name)) {
      showToast('Наименование не может быть пустым');
      return;
    }

    const data = new FormData();

    const image = {
      uri: singleFile?.uri,
      type: singleFile?.type,
      name: singleFile?.name,
    };

    data.append('name', name);
    data.append('number', number);
    data.append('price', price);

    singleFile && data.append('image', image);

    const res = await fetch(`${URL}/api/product`, {
      method: 'post',
      body: data,
      headers: {
        token: TOKEN,
      },
    });

    const respObj = await res.json();
    const toastMessage = respObj.error
      ? respObj.error
      : 'Товар успешно сохранен';

    showToast(toastMessage);

    if (respObj?.status === 200) {
      clearfields();
      setCreateProduct(respObj?.product);
      pagerViewRef.current?.setPage(0);
    }
  };

  const schema = [
    {
      name: 'Название',
      number: false,
      value: name,
      handler: handlerName,
      id: 0,
    },
    {
      name: 'Кол-во',
      number: true,
      value: number,
      handler: handlerNumber,
      id: 1,
    },
    {
      name: 'Цена',
      number: true,
      value: price,
      handler: handlerPrice,
      id: 2,
    },
  ];

  return (
    <>
      <Toast visible={visibleToast} message={toastMessage} />
      <Text style={styles.header}>Создание нового товара</Text>
      {schema.map(val => {
        return (
          <InputBlock
            key={val.id}
            name={val.name}
            number={val.number}
            value={val.value}
            handler={val.handler}
          />
        );
      })}
      <View style={styles.panelControl}>
        <TouchableOpacity
          style={styles.addImage}
          onPress={openDialog}
          activeOpacity={0.5}>
          <Text style={styles.buttonText}>Добавить фото</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handlerFile(null)}
          activeOpacity={0.5}>
          <Text style={styles.buttonText}>Отменить фото</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageView}>
        <Image source={singleFile} style={styles.image} />
      </View>

      <TakeImage
        value={singleFile}
        handler={handlerFile}
        dialog={dialog}
        closeDialog={closeDialog}
        styles={styles}
      />
      <View style={styles.panelControl}>
        <TouchableOpacity
          style={styles.button}
          onPress={sendData}
          activeOpacity={0.5}>
          <Text style={styles.buttonText}>Сохранить</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={clearfields}
          activeOpacity={0.5}>
          <Text style={styles.buttonText}>Отмена</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ProductCard;

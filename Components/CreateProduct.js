import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, Pressable, View, Image} from 'react-native';
import Toast from './Toast';
import InputBlock from './InputBlock';
import TakeImage from './TakeImage';
import {TOKEN} from '../.env.js';

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState(null);
  const [price, setPrice] = useState(null);
  const [singleFile, setSingleFile] = useState(null);
  const [dialog, setDialog] = useState(false);
  const [visibleToast, setVisibleToast] = useState(false);

  const handleToast = () => setTimeout(() => setVisibleToast(false), 300);

  useEffect(() => handleToast, [visibleToast]);

  const handleVisibleToast = () => {
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

  const sendData = async () => {
    console.log('SENDING', singleFile != null);
    // // Check if any file is selected or not
    if (singleFile != null) {
      //   // If file selected then create FormData
      const data = new FormData();

      const image = {
        uri: singleFile.uri,
        type: singleFile.type,
        name: singleFile.name,
      };

      data.append('name', name);
      data.append('number', number);
      data.append('price', price);
      data.append('image', image);

      let res = await fetch('http://192.168.88.103:5000/api/product', {
        method: 'post',
        body: data,
        headers: {
          token: TOKEN,
        },
      });

      let responseJson = await res.json();
      if (responseJson.error) console.log(responseJson.error);
      if (responseJson.status == 200) {
        console.log('Upload Successful');
        handleVisibleToast();
      }
    } else {
      //   // If no file selected the show alert
      console.log('Please Select File first');
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
      <Toast visible={visibleToast} message="Товар успешно сохранен" />
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
        <Pressable style={styles.addImage} onPress={openDialog}>
          <Text style={styles.buttonText}>Добавить фото</Text>
        </Pressable>
        <Pressable
          style={styles.deleteButton}
          onPress={() => handlerFile(null)}>
          <Text style={styles.buttonText}>Отменить фото</Text>
        </Pressable>
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
        <Pressable style={styles.button} onPress={sendData}>
          <Text style={styles.buttonText}>Сохранить</Text>
        </Pressable>
        <Pressable
          style={styles.deleteButton}
          onPress={() => {
            handlerFile(null);
            handlerName('');
            handlerNumber(null);
            handlerPrice(null);
          }}>
          <Text style={styles.buttonText}>Отмена</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    width: '100%',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: 'darkcyan',
    minWidth: 200,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  panelControl: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    // borderWidth: 1,
    // borderColor: 'black',
  },
  addImage: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: 'darkcyan',
  },
  deleteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: 'indianred',
  },
  imageView: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 25,
  },
});

export default CreateProduct;

import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {URL, SMALL_IMAGE_URL} from '../.env.js';
import {DataContext} from '../Store/DataProvider.js';

const ProductItem = ({item, handleClick}) => {
  const [data, setData] = useState(item.item);
  const {state, dispatch} = useContext(DataContext);
  const {createdProduct} = state;
  const [hightlight, setHightlight] = useState(false);

  useEffect(() => {
    if (!!createdProduct && data._id === createdProduct) {
      setHightlight(true);
      setTimeout(() => {
        setHightlight(false);
      }, 3000);
    }
  }, [createdProduct]);

  return (
    <TouchableOpacity
      activeOpacity={0.3}
      onLongPress={() => handleClick(item.item)}
      // onLongPress={() => console.log('LONG_PRESSSSS')}
      style={[
        styles.container,
        // {backgroundColor: data.selected ? '#ddd' : 'lightyellow'},
        {backgroundColor: hightlight ? 'khaki' : 'lightyellow'},
      ]}>
      <View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{uri: `${URL}${SMALL_IMAGE_URL}${data.img}`}}></Image>
        </View>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.secondInfo}>{`Цена: ${data.price}`}</Text>
        <Text style={styles.secondInfo}>{`Остаток: ${data.number}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 120,
    flexShrink: 1,
    margin: 2,
    padding: 2,
    borderRadius: 5,
    borderColor: '#eee',
    borderWidth: 2,
  },
  name: {
    fontWeight: '600',
    fontSize: 12,
    textAlign: 'center',
  },
  secondInfo: {
    textAlign: 'center',
    fontSize: 12,
  },
  imageContainer: {},
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
});

export default ProductItem;

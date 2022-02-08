import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {URL} from '../.env.js';

const ProductItem = ({item, handleClick}) => {
  const {img, name, price, number, selected} = item.item;

  return (
    <TouchableOpacity
      activeOpacity={0.3}
      onPress={() => handleClick(item.item)}
      style={[
        styles.container,
        {backgroundColor: selected ? '#ddd' : 'lightyellow'},
      ]}>
      <View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{uri: `${URL}/img/${img}`}}></Image>
        </View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.secondInfo}>{`Цена: ${price}`}</Text>
        <Text style={styles.secondInfo}>{`Остаток: ${number}`}</Text>
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

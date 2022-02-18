import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

const ImageProductCard = ({img}) => {
  return (
    <View style={styles.imageView}>
      <Image source={img} style={styles.image} />
    </View>
  );
};

export default ImageProductCard;

const styles = StyleSheet.create({
  imageView: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 220,
    height: 220,
    borderRadius: 25,
  },
});

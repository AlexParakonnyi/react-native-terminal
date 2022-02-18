import React, {useEffect, useState, useContext, useRef} from 'react';
import {View, FlatList, Button} from 'react-native';
import ProductItem from './ProductItem.js';
import {getData} from '../utils/fetchData';
import {DataContext} from '../Store/DataProvider.js';
import Actions from '../Store/Actions.js';
import Config from '../.env.js';

const ProductList = ({navigation}) => {
  const [data, setData] = useState([]);
  const {state, dispatch} = useContext(DataContext);
  const {createdProduct, currentProduct} = state;
  const flatListRef = useRef(null);
  const [isRender, setIsRender] = useState(false);

  const scrollToCreatedItem = dataList => {
    if (!createdProduct) return;

    dataList.forEach((item, index) => {
      if (item._id !== createdProduct) return;

      const toRow = Math.floor(index / 3);
      flatListRef.current.scrollToIndex({animated: true, index: toRow});
    });

    dispatch({type: Actions.REMOVE_CREATE_PRODUCT, payload: {}});
  };

  const getProductList = async () => {
    try {
      const res = await getData({path: `/api/products`});
      if (res.products) {
        setData(res.products);
        scrollToCreatedItem(res.products);

        return res.products;
      }
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  useEffect(() => {
    setIsRender(!isRender);
  }, [data]);

  useEffect(() => {
    if (!createdProduct) return;
    getProductList();
  }, [createdProduct]);

  useEffect(() => {
    getProductList();
  }, []);

  const failedScrollHandler = error => {
    flatListRef.current.scrollToOffset({
      offset: error.averageItemLength * error.index,
      animated: true,
    });
    setTimeout(() => {
      if (data.length !== 0 && flatListRef.current !== null) {
        flatListRef.current.scrollToIndex({
          index: error.index,
          animated: true,
        });
      }
    }, 100);
  };

  const handleClick = item => {
    const {_id, name, description, number, price, img} = item;

    const productItem = {
      _id,
      name,
      description,
      number,
      price,
      imageFile: {
        uri: `${Config.BASE_URL}${Config.SMALL_IMAGE_PATH}${img}`,
      },
    };

    navigation.navigate('ProductCard', {product: productItem});
  };

  const renderItem = item => (
    <ProductItem item={item} handleClick={handleClick} key={item._id} />
  );

  return (
    <View>
      <FlatList
        ref={flatListRef}
        numColumns={3}
        keyExtractor={item => item._id.toString()}
        data={data}
        initialNumToRender={16}
        renderItem={renderItem}
        onScrollToIndexFailed={failedScrollHandler}
        extraData={isRender}
      />
    </View>
  );
};

export default ProductList;

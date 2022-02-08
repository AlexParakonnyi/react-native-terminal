import React, {useEffect, useState, useContext, useRef} from 'react';
import {View, FlatList} from 'react-native';
import {TOKEN, URL} from '../.env.js';
import ProductItem from './ProductItem.js';
import {getData} from '../utils/fetchData';
import {DataContext} from '../Store/DataProvider.js';
import Actions from '../Store/Actions.js';

const ProductList = () => {
  const [data, setData] = useState([]);
  const {state, dispatch} = useContext(DataContext);
  const {createdProduct} = state;
  const flatListRef = useRef(null);
  // console.log('@@', createdProduct);

  const fetchData = async () => {
    try {
      const res = await getData(`${URL}/api/product`, TOKEN);
      // console.log(res.products);
      if (res.products) setData(res.products);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (createdProduct) {
      fetchData();
      if (data.length > 7) {
        const index = Math.floor((data.length - 1) / 3) - 1;
        flatListRef.current.scrollToIndex({index});
      }
      dispatch({type: Actions.REMOVE_CREATE_PRODUCT, payload: {}});
    }
  }, [createdProduct]);

  const handleClick = item => {
    // console.log(item);
    const newArrayData = data.map(e => {
      if (e._id === item._id) {
        const currentSelected = item.selected;
        return {...e, selected: !currentSelected};
      }
      return {...e, selected: false};
    });

    setData(newArrayData);
  };

  return (
    <View>
      <FlatList
        ref={flatListRef}
        numColumns={3}
        keyExtractor={item => item._id}
        data={data}
        renderItem={item => (
          <ProductItem item={item} handleClick={handleClick} />
        )}></FlatList>
    </View>
  );
};

export default ProductList;

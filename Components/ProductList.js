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

  const fetchData = async () => {
    try {
      const res = await getData(`${URL}/api/product`, TOKEN);
      if (res.products) {
        setData(res.products);
        return res.products;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = item => {
    const newArrayData = data.map(e => {
      if (e._id === item._id) {
        const currentSelected = item.selected;
        return {...e, selected: !currentSelected};
      }
      return {...e, selected: false};
    });

    setData(newArrayData);
  };

  useEffect(() => {
    if (!createdProduct) return;

    (async function () {
      const newData = await fetchData();

      newData.forEach((item, index) => {
        if (item._id !== createdProduct) return;

        const toRow = Math.floor(index / 3);
        flatListRef.current.scrollToIndex({animated: true, index: toRow});
      });

      dispatch({type: Actions.REMOVE_CREATE_PRODUCT, payload: {}});
    })();
  }, [createdProduct]);

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

  return (
    <View>
      <FlatList
        ref={flatListRef}
        numColumns={3}
        keyExtractor={item => item._id}
        data={data}
        renderItem={item => (
          <ProductItem item={item} handleClick={handleClick} />
        )}
        onScrollToIndexFailed={failedScrollHandler}></FlatList>
    </View>
  );
};

export default ProductList;

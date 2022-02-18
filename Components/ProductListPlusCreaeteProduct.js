import React, {useRef, useEffect, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import ProductList from './ProductList';
import CreateProduct from './CreateProduct';
import PagerView from 'react-native-pager-view';
import {DataContext} from '../Store/DataProvider';
import Actions from '../Store/Actions';

export default Train = () => {
  const pagerViewRef = useRef(null);
  const {dispatch} = useContext(DataContext);

  useEffect(() => {
    dispatch({type: Actions.SET_PAGER_VIEW_REF, payload: {pagerViewRef}});
  }, [pagerViewRef]);

  return (
    <PagerView initialPage={0} style={{flex: 1}} ref={pagerViewRef}>
      <View key="0" collapsable="false" style={styles.first}>
        <ProductList />
      </View>
      <View key="1" style={styles.container} collapsable="false">
        <CreateProduct />
      </View>
      {/* <View key="2" style={styles.container} collapsable="false">
      <TestLayout />
    </View> */}
    </PagerView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  first: {
    backgroundColor: 'lightyellow',
  },
});

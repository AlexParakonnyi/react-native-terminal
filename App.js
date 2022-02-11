import React, {useRef} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import Header from './Components/Header';
import PagerView from 'react-native-pager-view';
import ProductCard from './Components/ProductCard';
import ProductList from './Components/ProductList';
import DataProvider from './Store/DataProvider';
import TestLayout from './Components/TestLayout';

export default function App() {
  const pagerViewRef = useRef(null);
  return (
    <>
      <DataProvider>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <Header />
        <PagerView initialPage={0} style={{flex: 1}} ref={pagerViewRef}>
          <View key="0" collapsable="false" style={styles.first}>
            <ProductList />
          </View>
          <View key="1" style={styles.container} collapsable="false">
            <ProductCard pagerViewRef={pagerViewRef} />
          </View>
          <View key="2" style={styles.container} collapsable="false">
            <TestLayout />
          </View>
        </PagerView>
      </DataProvider>
    </>
  );
}

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

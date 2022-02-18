import React, {useRef} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import Header from './Components/Header';
import PagerView from 'react-native-pager-view';
import DataProvider from './Store/DataProvider';
import Navigator from './Components/Navigator';
import Toast from './Components/Toast';

export default function App() {
  const pagerViewRef = useRef(null);
  return (
    <>
      <DataProvider>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <Toast />
        <Navigator />
        {/* <StatusBar backgroundColor="black" barStyle="light-content" />
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
        </PagerView> */}
      </DataProvider>
    </>
  );
}

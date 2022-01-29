import React from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import Header from './Components/Header';
import TestInput from './TestInput';
import PagerView from 'react-native-pager-view';
import CreateProduct from './Components/CreateProduct';

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <Header />
      <PagerView initialPage={0} style={{flex: 1}}>
        <View
          key="0"
          collapsable="false"
          style={{lex: 1, backgroundColor: 'lightyellow'}}>
          <TestInput />
        </View>
        <View key="1" style={styles.container}>
          <CreateProduct />
        </View>
      </PagerView>
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
});

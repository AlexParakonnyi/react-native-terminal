import React from 'react';
import {View} from 'react-native';

export default ({children}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        paddingTop: 15,
        paddingBottom: 10,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        // width: '100%',
      }}>
      {children}
    </View>
  );
};

import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

import ModalPoup from './Modal';
import DialogChangeDelete from './DialogChangeDelete';

const TestLayout = () => {
  const [visible, setVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const toggleVisible = item => {
    setVisible(prev => !prev);
    console.log(item);
    if (prev) setCurrentItem(item);
  };

  useEffect(() => {
    console.log(currentItem);
  });

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ModalPoup visible={visible}>
        <DialogChangeDelete handleClick={toggleVisible} />
      </ModalPoup>
      <TouchableOpacity
        style={{padding: 20, backgroundColor: 'lightyellow', borderRadius: 10}}
        // onPress={() => setVisible(true)}
        // {...backspaceLongPress}
        onLongPress={toggleVisible}>
        <View>
          <Text>LONG BUTTON</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
});

export default TestLayout;

import React from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';

const InputBlock = ({name, number, value = '', handler}) => {
  return (
    <View style={styles.inputBlock}>
      <Text style={styles.text}>{`${name}: `} </Text>
      <TextInput
        placeholder={name}
        keyboardType={number ? 'numeric' : 'default'}
        style={styles.inputText}
        onChangeText={val => handler(val)}
        defaultValue={value ? String(value) : null}></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 20,
  },
  inputText: {
    fontSize: 16,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: 250,
    paddingVertical: 5,
  },
  inputBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 50,
    paddingHorizontal: 5,
  },
});

export default InputBlock;

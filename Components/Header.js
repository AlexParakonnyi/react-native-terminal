import React, {useState} from 'react';
import {Text, Image, InputText, StyleSheet, View} from 'react-native';

const Header = () => {
  const [text, setText] = useState('');
  return (
    <View style={styles.marg}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={{flexGrow: 1, fontSize: 20}}>Терминал сбора данных</Text>
        <Image
          source={{
            uri: 'https://www.incimages.com/uploaded_files/image/1920x1080/*Barcode_32896.jpg',
          }}
          style={{width: 50, height: 25}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  marg: {
    marginTop: 1,
    marginLeft: 2,
    marginRight: 2,
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#000',
    backgroundColor: '#eee',
    maxHeight: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Header;

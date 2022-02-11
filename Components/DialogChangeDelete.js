import React, {useContext} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {DataContext} from '../Store/DataProvider';

const DialogChangeDelete = ({handleClick}) => {
  const {state, dispatch} = useContext(DataContext);
  const {currentProductId} = state;

  return (
    <View>
      <View style={{alignItems: 'center'}}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClick}>
            <Image
              source={require('../assets/x.png')}
              style={{height: 30, width: 30}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.dialogItem}>
        <Image
          source={require('../assets/edit.png')}
          style={styles.dialogItemImage}
        />
        <Text style={{fontSize: 22, fontWeight: 'bold'}}>Изменить</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.dialogItem}>
        <Image
          source={require('../assets/remove.png')}
          style={styles.dialogItemImage}
        />
        <Text style={{fontSize: 22, fontWeight: 'bold'}}>Удалить</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  dialogItem: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 10,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 12,
  },
  dialogItemImage: {height: 50, width: 50, marginVertical: 10},
});

export default DialogChangeDelete;

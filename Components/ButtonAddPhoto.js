import React, {useState} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import GlobalStyles from '../Styles/GlobalStyles';
import TakeImage from './TakeImage';

export default () => {
  const [showDialog, setShowDialog] = useState(false);

  const openDialog = () => {
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  return (
    <TouchableOpacity
      style={[{flex: 2}, GlobalStyles.button]}
      onPress={openDialog}
      activeOpacity={0.5}>
      <Text style={GlobalStyles.buttonText}>Добавить фото</Text>
      <TakeImage showDialog={showDialog} closeDialog={closeDialog} />
    </TouchableOpacity>
  );
};

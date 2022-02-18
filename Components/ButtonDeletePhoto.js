import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import GlobalStyles from '../Styles/GlobalStyles';

const ButtonDeletePhoto = ({handlerImageFile}) => {
  const removeImage = () => {
    handlerImageFile(null);
  };

  return (
    <TouchableOpacity
      style={[{flex: 2}, GlobalStyles.button, GlobalStyles.buttonDeleteColr]}
      onPress={removeImage}
      activeOpacity={0.5}>
      <Text style={GlobalStyles.buttonText}>Удалить фото</Text>
    </TouchableOpacity>
  );
};

export default ButtonDeletePhoto;

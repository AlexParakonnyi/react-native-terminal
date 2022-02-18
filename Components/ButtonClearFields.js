import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import GlobalStyles from '../Styles/GlobalStyles';

const ButtonClearFields = ({clearFields}) => {
  return (
    <TouchableOpacity
      style={[{flex: 2}, GlobalStyles.button, GlobalStyles.buttonDeleteColr]}
      onPress={clearFields}
      activeOpacity={0.5}>
      <Text style={GlobalStyles.buttonText}>Очистить</Text>
    </TouchableOpacity>
  );
};

export default ButtonClearFields;

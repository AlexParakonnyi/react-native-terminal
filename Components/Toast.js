import React from 'react';
import {ToastAndroid} from 'react-native';

const Toast = ({visible, message}) => {
  if (visible) {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
    );
    return null;
  }
  return null;
};

export default Toast;

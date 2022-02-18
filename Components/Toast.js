import React, {useContext, useEffect} from 'react';
import {ToastAndroid} from 'react-native';
import {DataContext} from '../Store/DataProvider';
import Actions from '../Store/Actions';

const Toast = () => {
  const {state, dispatch} = useContext(DataContext);
  const {showToast, toastMessage} = state;

  useEffect(() => {
    if (!showToast) return;
    dispatch({type: Actions.CLEAR_TOAST});
  }, [showToast]);

  if (showToast) {
    ToastAndroid.showWithGravity(
      toastMessage,
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
    );
    return null;
  }
  return null;
};

export default Toast;

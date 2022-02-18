import React from 'react';
import {View} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {launchCamera} from 'react-native-image-picker';
import Dialog from 'react-native-dialog';
import {useThemeContext} from './CreateProduct';

export default TakeImage = ({showDialog, closeDialog}) => {
  const {handlerImageFile} = useThemeContext();

  const removeImageFile = () => {
    handlerImageFile(null);
  };

  const makePhoto = async () => {
    try {
      const res = await launchCamera({
        cameraType: 'back',
        saveToPhotos: false,
        videoQuality: 'medium',
        mediaType: 'photo',
      });

      if (res.didCancel === true) {
        console.log('Canceled');
        return;
      }
      console.log('res : ' + JSON.stringify(res));
      handlerImageFile({
        name: res.assets[0].fileName,
        uri: res.assets[0].uri,
        type: res.assets[0].type,
      });
    } catch (err) {
      console.log('ERROR ' + err);
      removeImageFile();
    } finally {
      closeDialog();
    }
  };

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      handlerImageFile(res[0]);
    } catch (err) {
      console.log('ERROR ' + err);
      removeImageFile();
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        console.log('Canceled');
      } else {
        // For Unknown Error
        console.log('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    } finally {
      closeDialog();
    }
  };

  return (
    <>
      {showDialog ? (
        <View>
          <Dialog.Container visible={showDialog}>
            <Dialog.Title>
              Из какого источника добавить изображение ?
            </Dialog.Title>
            <Dialog.Button
              label="Сделать фото"
              onPress={makePhoto}
              bold={true}
            />
            <Dialog.Button
              label="Выбрать фото"
              onPress={selectFile}
              bold={true}
            />
            <Dialog.Button label="Отмена" onPress={closeDialog} color={'red'} />
          </Dialog.Container>
        </View>
      ) : null}
    </>
  );
};

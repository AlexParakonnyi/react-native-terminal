import React, {useState} from 'react';
import {Text, Pressable, View, StyleSheet} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Dialog from 'react-native-dialog';

const TakeImage = ({handler, closeDialog, dialog}) => {
  const makePhoto = async () => {
    try {
      const res = await launchCamera({
        cameraType: 'back',
        saveToPhotos: false,
        videoQuality: 'medium',
        mediaType: 'photo',
      });
      // console.log('@@@', res);
      if (res.didCancel === true) {
        console.log('Canceled'), handler(null);
      } else {
        console.log('res : ' + JSON.stringify(res));
        handler({
          name: res.assets[0].fileName,
          uri: res.assets[0].uri,
          type: res.assets[0].type,
        });
      }
    } catch (err) {
      console.log('ERROR ' + err);
      handler(null);
    } finally {
      closeDialog();
    }
  };

  // const selectFile = async () => {
  //   try {
  //     const res = await launchImageLibrary();
  //     console.log('@@@', res);
  //     if (res.didCancel === true) {
  //       console.log('Canceled'), handler(null);
  //     } else {
  //       console.log('res : ' + JSON.stringify(res));
  //       handler({
  //         name: res.assets[0].fileName,
  //         uri: res.assets[0].uri,
  //         type: res.assets[0].type,
  //       });
  //     }
  //   } catch (err) {
  //     console.log('ERROR ' + err);
  //     handler(null);
  //   } finally {
  //     closeDialog();
  //   }
  // };
  const selectFile = async () => {
    // Opening Document Picker to select one file
    console.log('SELECT FILE !!!!');
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      // Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res[0]));
      // Setting the state to show single file attributes
      handler(res[0]);
    } catch (err) {
      console.log('ERROR ' + err);
      handler(null);
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
      {dialog ? (
        <View>
          <Dialog.Container visible={dialog}>
            <Dialog.Title>
              Из какого источника добавить изображение ?
            </Dialog.Title>
            {/* <Dialog.Description>
              Вы желает сделать новое фото или выбрать из существующих
              изображений?
            </Dialog.Description> */}
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

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: 'black',
    marginTop: 20,
    minWidth: 160,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default TakeImage;

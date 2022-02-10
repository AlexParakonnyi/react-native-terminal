import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    width: '100%',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: 'darkcyan',
    minWidth: 200,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  panelControl: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    // borderWidth: 1,
    // borderColor: 'black',
  },
  addImage: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: 'darkcyan',
  },
  deleteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: 'indianred',
  },
  imageView: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 25,
  },
});

export default styles;

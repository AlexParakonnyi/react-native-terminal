import React, {createContext, useReducer} from 'react';
import reducers from './Reducers';

export const DataContext = createContext();

const DataProvider = ({children}) => {
  const initialState = {
    createdProduct: null,
    currentProduct: null,
    showToast: false,
    toastMessage: '',
    showDialog: false,
    product: {
      name: '',
      description: '',
      number: null,
      price: null,
      imageFile: null,
    },
  };
  const [state, dispatch] = useReducer(reducers, initialState);

  return (
    <DataContext.Provider value={{state, dispatch}}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;

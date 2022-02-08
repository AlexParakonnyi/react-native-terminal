import React, {createContext, useReducer} from 'react';
import Actions from './Actions';
import reducers from './Reducers';

export const DataContext = createContext();

const DataProvider = ({children}) => {
  const initialState = {createdProduct: false};
  const [state, dispatch] = useReducer(reducers, initialState);

  return (
    <DataContext.Provider value={{state, dispatch}}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
import Actions from './Actions';

const Reducers = (state, action) => {
  // console.log('III', state.createdProduct);
  switch (action.type) {
    case Actions.CREATE_PRODUCT:
      // console.log('$$$', Actions.CREATE_PRODUCT);
      return {...state, createdProduct: action?.payload?.productId};
    case Actions.REMOVE_CREATE_PRODUCT:
      return {...state, createdProduct: null};
    case Actions.CURRENT_PRODUCT:
      return {...state, currentProductId: action?.payload?.currentProductId};
    default:
      return state;
  }
};

export default Reducers;

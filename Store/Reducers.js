import Actions from './Actions';

const Reducers = (state, action) => {
  const {payload = {}} = action;

  switch (action.type) {
    //PRODUCT_LIST
    case Actions.CREATE_PRODUCT:
      return {...state, createdProduct: payload?.productId};
    case Actions.REMOVE_CREATE_PRODUCT:
      return {...state, createdProduct: null};
    case Actions.CURRENT_PRODUCT:
      return {...state, currentProduct: payload?.currentProduct};

    //TOAST
    case Actions.TOAST:
      return {...state, showToast: true, toastMessage: payload?.toastMessage};
    case Actions.CLEAR_TOAST:
      return {...state, showToast: false, toastMessage: ''};

    //DIALOG
    case Actions.DIALOG_OPEN:
      return {...state, showDialog: true};
    case Actions.DIALOG_CLOSE:
      return {...state, showDialog: false};

    //PRODUCT
    case Actions.PRODUCT_NAME:
      return {...state, product: {...state.product, name: payload?.name}};
    case Actions.PRODUCT_DESCRIPTION:
      return {
        ...state,
        product: {...state.product, description: payload?.description},
      };
    case Actions.PRODUCT_NUMBER:
      return {...state, product: {...state.product, number: payload?.number}};
    case Actions.PRODUCT_PRICE:
      return {...state, product: {...state.product, price: payload?.price}};
    case Actions.PRODUCT_IMAGE:
      return {
        ...state,
        product: {...state.product, imageFile: payload?.imageFile},
      };
    case Actions.PRODUCT_IMAGE_REMOVE:
      return {...state, product: {...state.product, imageFile: null}};
    case Actions.PRODUCT_CLEAR_FIELDS:
      return {
        ...state,
        product: {
          ...state.product,
          imageFile: null,
          name: null,
          description: '',
          number: '',
          price: null,
        },
      };
    case Actions.PRODUCT_SET:
      return {...state, product: payload?.product};

    default:
      return state;
  }
};

export default Reducers;

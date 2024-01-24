import {
  INCREASE,
  DECREASE,
  CLEAR_LIST,
  DISPLAY_ITEMS,
  LOADING,
  REMOVE,
} from './action';
const reducer = (state, action) => {
  if (action.type === CLEAR_LIST) {
    return { ...state, cart: new Map() };
  }
  if (action.type === REMOVE) {
    const newCart = new Map(state.cart);
    newCart.delete(action.id);
    return { ...state, cart: newCart };
  }
  if (action.type === INCREASE) {
    const newCart = new Map(state.cart);
    const itemId = action.id;
    const item = newCart.get(itemId);
    const newItem = { ...item, amount: item.amount + 1 };
    newCart.set(itemId, newItem);
    return { ...state, cart: newCart };
  }
  if (action.type === DECREASE) {
    const newCart = new Map(state.cart);
    const itemId = action.id;
    const item = newCart.get(itemId);
    if (item.amount === 1) {
      newCart.delete(action.id);
      return { ...state, cart: newCart };
    }
    const newItem = { ...item, amount: item.amount - 1 };
    newCart.set(itemId, newItem);

    return { ...state, cart: newCart };
  }

  if (action.type === LOADING) {
    return { ...state, loading: true };
  }

  if (action.type === DISPLAY_ITEMS) {
    const newCart = action.val.map((item) => [item.id, item]);
    const myCart = new Map(newCart);
    return { ...state, loading: false, cart: myCart };
  }
  throw new Error(`no matching action type '${action.type}'`);
};
export default reducer;

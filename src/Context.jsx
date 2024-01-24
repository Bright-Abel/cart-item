import { useReducer } from 'react';
import { createContext, useContext } from 'react';
import reducer from './reducer';
import {
  INCREASE,
  DECREASE,
  CLEAR_LIST,
  DISPLAY_ITEMS,
  LOADING,
  REMOVE,
} from './action';
import cartItems from './data';
import { getTotals } from './untils';
import { useEffect } from 'react';

const url = 'https://www.course-api.com/react-useReducer-cart-project';

const AppContext = createContext();
// const newCart = cartItems.map((item) => [item.id, item]);
// const myCart = new Map(newCart);
const defaultState = {
  loading: false,
  cart: new Map(),
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const { totalAmount, totalCost } = getTotals(state.cart);

  const clearCart = () => {
    dispatch({ type: CLEAR_LIST });
  };

  const removeCart = (id) => {
    dispatch({ type: REMOVE, id });
  };

  const increaseGoods = (id) => {
    dispatch({ type: INCREASE, id });
  };
  const decreaseGoods = (id) => {
    dispatch({ type: DECREASE, id });
  };

  const fetchData = async () => {
    try {
      dispatch({ type: LOADING });
      const resp = await fetch(url);
      if (!resp.ok) {
        throw new Error('Error fetching data');
      }
      const val = await resp.json();
      dispatch({ type: DISPLAY_ITEMS, val });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeCart,
        increaseGoods,
        decreaseGoods,
        totalAmount,
        totalCost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

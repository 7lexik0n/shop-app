import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import CartItem from "../../models/cartItem";
import { ADD_ORDER } from "../actions/orders";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
  items: {},
  total: 0,
};

export default (state = initialState, action) => {
  const { type, product, id } = action;

  switch (type) {
    case ADD_TO_CART: {
      const { id, price, title } = product;
      const { items } = state;

      let cartItem;

      if (items[id]) {
        cartItem = new CartItem(
          items[id].count + 1,
          price,
          title,
          items[id].sum + price
        );
      } else {
        cartItem = new CartItem(1, price, title, price);
      }

      return {
        ...state,
        items: { ...items, [id]: cartItem },
        total: state.total + price,
      };
    }
    case REMOVE_FROM_CART: {
      const cartItem = state.items[id];
      const itemQuantity = cartItem.count;
      const items = { ...state.items };

      if (itemQuantity > 1) {
        const newCartItem = new CartItem(
          cartItem.count - 1,
          cartItem.price,
          cartItem.title,
          cartItem.sum - cartItem.price
        );

        items[id] = newCartItem;
      } else {
        delete items[id];
      }

      return { ...state, items, total: state.total - cartItem.price };
    }
    case ADD_ORDER: {
      return initialState;
    }
    case DELETE_PRODUCT: {
      if (!state.items[id]) {
        return state;
      }

      const updatedItems = { ...state.items };
      const sum = updatedItems[id].sum;
      delete updatedItems[id];

      return {
        items: updatedItems,
        total: state.total - sum,
      };
    }
    default:
      return state;
  }
};

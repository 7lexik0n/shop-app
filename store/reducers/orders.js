import { ADD_ORDER, SET_ORDERS } from "../actions/orders";
import Order from "../../models/order";

const initialState = {
  orders: [],
};

const ordersReducer = (state = initialState, action) => {
  const { type, orderData } = action;

  switch (type) {
    case SET_ORDERS: {
      const { orders } = action;

      return {
        orders,
      };
    }
    case ADD_ORDER: {
      const { id, cartItems, amount, date } = orderData;
      const order = new Order(id, cartItems, amount, date);

      return {
        ...state,
        orders: [...state.orders, order],
      };
    }
    default:
      return state;
  }
};

export default ordersReducer;

import Order from "../../models/order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const setOrders = () => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;

    try {
      const response = await fetch(
        `https://lexik0n-default-rtdb.europe-west1.firebasedatabase.app/orders/${userId}.json`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const orders = [];

      for (const key in resData) {
        const { amount, cartItems, date } = resData[key];
        orders.push(new Order(key, cartItems, amount, new Date(date)));
      }

      dispatch({
        type: SET_ORDERS,
        orders,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const addOrder = (cartItems, amount) => {
  return async (dispatch, getState) => {
    const date = new Date();
    const { token, userId } = getState().auth;

    const response = await fetch(
      `https://lexik0n-default-rtdb.europe-west1.firebasedatabase.app/orders/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          amount,
          date: date.toISOString(),
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        cartItems,
        amount,
        date,
      },
    });
  };
};

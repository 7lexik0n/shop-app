import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth;

    const response = await fetch(
      `https://lexik0n-default-rtdb.europe-west1.firebasedatabase.app/products/${productId}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    dispatch({
      type: DELETE_PRODUCT,
      id: productId,
    });
  };
};

export const setProducts = () => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;

    try {
      const response = await fetch(
        `https://lexik0n-default-rtdb.europe-west1.firebasedatabase.app/products.json`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const products = [];

      for (const key in resData) {
        const { description, imageUrl, price, title, ownerId } = resData[key];
        products.push(
          new Product(key, ownerId, title, imageUrl, description, +price)
        );
      }

      dispatch({
        type: SET_PRODUCTS,
        products,
        userProducts: products.filter((product) => product.ownerId === userId)
      });
    } catch (error) {
      throw error;
    }
  };
};

export const createProduct = (productData) => {
  return async (dispatch, getState) => {
    const { title, imageUrl, description, price } = productData;
    const { token, userId } = getState().auth;

    const response = await fetch(
      `https://lexik0n-default-rtdb.europe-west1.firebasedatabase.app/products.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ownerId: userId,
          title,
          imageUrl,
          description,
          price,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: { ...productData, id: resData.name, ownerId: userId },
    });
  };
};

export const updateProduct = (id, productData) => {
  return async (dispatch, getState) => {
    const { title, imageUrl, description } = productData;
    const { token } = getState().auth;

    const response = await fetch(
      `https://lexik0n-default-rtdb.europe-west1.firebasedatabase.app/products/${id}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          imageUrl,
          description,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    dispatch({
      type: UPDATE_PRODUCT,
      id,
      productData,
    });
  };
};

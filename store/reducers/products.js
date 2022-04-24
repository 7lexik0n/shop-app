import Product from "../../models/product";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  SET_PRODUCTS,
  UPDATE_PRODUCT,
} from "../actions/products";

const initialState = {
  availableProducts: [],
  userProducts: [],
};

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case SET_PRODUCTS: {
      const { products, userProducts } = action;

      return {
        availableProducts: products,
        userProducts,
      };
    }
    case DELETE_PRODUCT: {
      const { id } = action;

      return {
        ...state,
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== id
        ),
        userProducts: state.userProducts.filter((product) => product.id !== id),
      };
    }
    case UPDATE_PRODUCT: {
      const { id, productData } = action;
      const { title, imageUrl, description } = productData;

      const productIndex = state.userProducts.findIndex(
        (product) => product.id === id
      );
      const productAvailableIndex = state.availableProducts.findIndex(
        (product) => product.id === id
      );

      const product = state.userProducts[productIndex];
      const updatedProduct = new Product(
        product.id,
        product.ownerId,
        title,
        imageUrl,
        description,
        product.price
      );

      const availableProducts = [...state.availableProducts];
      const userProducts = [...state.userProducts];

      userProducts[productIndex] = updatedProduct;
      availableProducts[productAvailableIndex] = updatedProduct;

      return {
        ...state,
        availableProducts,
        userProducts,
      };
    }
    case CREATE_PRODUCT: {
      const { productData } = action;
      const { id, title, imageUrl, description, price, ownerId } = productData;

      const newProduct = new Product(
        id,
        ownerId,
        title,
        imageUrl,
        description,
        +price
      );

      return {
        ...state,
        availableProducts: [...state.availableProducts, newProduct],
        userProducts: [...state.userProducts, newProduct],
      };
    }
    default:
      return state;
  }
};

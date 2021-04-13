import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAILURE,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILURE,
  CLEAR_ERRORS,
} from "../../constants/productConstants";
import initialState from "../initialState";

export const productReducer = (state = initialState.products, action) => {
  if (action.type === ALL_PRODUCTS_REQUEST) return { loading: true, products: [] };
  if (action.type === ALL_PRODUCTS_SUCCESS) {
    const { data: products, count: productsCount, resPerPage } = action.payload;
    return { loading: false, products, productsCount, resPerPage };
  }
  if (action.type === ALL_PRODUCTS_FAILURE) return { loading: false, error: action.payload };
  if (action.type === CLEAR_ERRORS) return { ...state, error: null };
  return state;
};

export const productDetailsReducer = (state = initialState.productDetails, action) => {
  if (action.type === PRODUCT_DETAILS_REQUEST) return { ...state, loading: true };
  if (action.type === PRODUCT_DETAILS_SUCCESS) return { loading: false, product: action.payload.data };
  if (action.type === PRODUCT_DETAILS_FAILURE) return { ...state, error: action.payload };
  if (action.type === CLEAR_ERRORS) return { ...state, error: null };
  return state;
};

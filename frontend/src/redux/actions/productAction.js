import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAILURE,
  PRODUCT_DETAILS_REQUEST,
  CLEAR_ERRORS,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILURE,
} from "../../constants/productConstants";
import { all, get } from "../../api/productsApi";

export const allProducts = (keyword = "", pages = 1, prices = [0, 1000]) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCTS_REQUEST });
    const price = { lte: prices[0], gte: prices[1] };
    const { data } = await all({ keyword, pages, price });
    dispatch({ type: ALL_PRODUCTS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: ALL_PRODUCTS_FAILURE, payload: err.response.data.message });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await get(id);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: PRODUCT_DETAILS_FAILURE, payload: err.response.data.message });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

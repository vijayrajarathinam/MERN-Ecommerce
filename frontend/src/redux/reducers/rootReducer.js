import { combineReducers } from "redux";

import { productReducer, productDetailsReducer } from "./productReducer";
import { authReducer } from "./userReducer";

export default combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  auth: authReducer,
});

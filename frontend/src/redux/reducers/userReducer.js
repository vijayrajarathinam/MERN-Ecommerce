import initialState from "../initialState";
import {
  CLEAR_ERRORS,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_FAILURE,
} from "../../constants/userConstants";

export const authReducer = (state = initialState.user, { type, payload }) => {
  if (type === LOGIN_REQUEST) return { loading: true, isAuthenticated: false };
  if (type === LOGIN_SUCCESS) return { ...state, loading: false, isAuthenticated: true, user: payload };
  if (type === LOGIN_FAILURE) return { ...state, loading: false, isAuthenticated: false, user: null, error: payload };
  if (type === REGISTER_REQUEST) return { loading: true, isAuthenticated: false };
  if (type === REGISTER_SUCCESS) return { ...state, loading: false, isAuthenticated: true, user: payload };
  if (type === REGISTER_FAILURE)
    return { ...state, loading: false, isAuthenticated: false, user: null, error: payload };
  if (type === CLEAR_ERRORS) return { ...state, error: null };
  return state;
};

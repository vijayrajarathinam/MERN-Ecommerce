import API from "./apiUtils";

// const PATH = "/products";
export const login = (data) => API.post("/login", data);

export const register = (data) => API.post("/register", data);

import API from "./apiUtils";

const PATH = "/products";

export const all = async (params) => await API.get(PATH, params && { params });
export const get = async (id) => await API.get(`${PATH}/${id}`);

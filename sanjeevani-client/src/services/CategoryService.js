import axios from "axios";
import Constant from "./Constant";

const VITE_API = import.meta.env.VITE_API;
class CategoryService {
  register(payload) {
    return axios.post(
      VITE_API + "/category",
      payload,
      Constant.getHeader()
    );
  }

  getAll() {
    return axios.get(
      VITE_API + "/category",
      Constant.getHeader()
    );
  }

  getOne(id) {
    return axios.get(
      VITE_API + `/category/${id}`,
      Constant.getHeader()
    );
  }

  update(payload){
    return axios.put(VITE_API+"/category/",
    payload,
    Constant.getHeader()
    )
  }

  deleteUser(id){
    return axios.delete(VITE_API+`/category/${id}`,
    Constant.getHeader())
  }

  searchUser(payload){
    return axios.post(VITE_API+`/category/search`,
    payload,
    Constant.getHeader())
  }
}

export default new CategoryService();

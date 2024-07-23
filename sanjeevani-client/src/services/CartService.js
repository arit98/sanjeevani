import axios from "axios";
import Constant from "./Constant";

const VITE_API = import.meta.env.VITE_API;
class CartService {
  create(payload) {
    return axios.post(
      VITE_API + "/cart",
      payload,
      Constant.getHeader()
    );
  }

  getOne(id) {
    return axios.get(
      VITE_API + `/cart/${id}`,
      Constant.getHeader()
    );
  }

  update(payload,id){
    return axios.put(VITE_API + `/cart/${id}`,
    payload,
    Constant.getHeader()
    )
  }

  deleteOne(id){
    return axios.delete(VITE_API+`/cart/${id}`,
    Constant.getHeader())
  }

  clear(payload){
    return axios.post(VITE_API + `/cart/`,
    payload,
    Constant.getHeader())
  }
}

export default new CartService();

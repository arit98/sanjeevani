import axios from "axios";
import Constant from "./Constant";

const VITE_API = import.meta.env.VITE_API;

class AddressService {
  create(payload) {
    return axios.post(
      VITE_API + "/states",
      payload,
      Constant.getHeader()
    );
  }

  getOne(id) {
    return axios.get(
      VITE_API + `/states/${id}`,
      Constant.getHeader()
    );
  }

  getAll() {
    return axios.get(
      VITE_API + "/states",
      Constant.getHeader()
    );
  }

  update(payload){
    return axios.put(VITE_API+"/states",
    payload,
    Constant.getHeader()
    )
  }

  delete(id){
    return axios.delete(VITE_API+`/states/${id}`,
    Constant.getHeader()
    )
  }

}

export default new AddressService();

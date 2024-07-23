import axios from "axios";
import Constant from "./Constant";

const VITE_API = import.meta.env.VITE_API;

class AddressService {
  create(payload) {
    return axios.post(
      VITE_API + "/role",
      payload,
      Constant.getHeader()
    );
  }

  getOne(id) {
    return axios.get(
      VITE_API + `/role/${id}`,
      Constant.getHeader()
    );
  }

  getAll() {
    return axios.get(
      VITE_API + "/role",
      Constant.getHeader()
    );
  }

  update(payload){
    return axios.put(VITE_API+"/role",
    payload,
    Constant.getHeader()
    )
  }

  delete(id){
    return axios.delete(VITE_API+`/role/${id}`,
    Constant.getHeader()
    )
  }

}

export default new AddressService();

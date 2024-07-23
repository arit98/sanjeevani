import axios from "axios";
import Constant from "./Constant";

const VITE_API = import.meta.env.VITE_API;
class AddressService {
  create(payload) {
    return axios.post(
      VITE_API + "/address",
      payload,
      Constant.getHeader()
    );
  }

  getOne(id) {
    return axios.get(
      VITE_API + `/address/${id}`,
      Constant.getHeader()
    );
  }

  getAll() {
    return axios.get(
      VITE_API + "/address",
      Constant.getHeader()
    );
  }

  update(payload){
    return axios.put(VITE_API+"/address",
    payload,
    Constant.getHeader()
    )
  }

  delete(id){
    return axios.delete(VITE_API+`/address/${id}`,
    Constant.getHeader()
    )
  }

}

export default new AddressService();

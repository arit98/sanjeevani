import axios from "axios";
import Constant from "./Constant";

const VITE_API = import.meta.env.VITE_API;
class UserService {
  register(payload) {
    return axios.post(
      VITE_API + "/user/register",
      payload,
      Constant.getHeader()
    );
  }

  login(payload) {
    return axios.post(
      VITE_API + "/user/login",
      payload,
      Constant.getHeader()
    );
  }

  getOne(id) {
    return axios.get(
      VITE_API + `/user/${id}`,
      Constant.getHeader()
    );
  }

  getAllUser() {
    return axios.get(
      VITE_API + "/user",
      Constant.getHeader()
    );
  }

  updateUserDetails(payload){
    return axios.put(VITE_API+"/user",
    payload,
    Constant.getHeader()
    )
  }


}

export default new UserService();

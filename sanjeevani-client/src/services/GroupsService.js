import axios from "axios";
import Constant from "./Constant";

const VITE_API = import.meta.env.VITE_API;
class GroupsService {
  register(payload) {
    return axios.post(
      VITE_API + "/groups",
      payload,
      Constant.getHeader()
    );
  }

  getAll() {
    return axios.get(
      VITE_API + "/groups",
      Constant.getHeader()
    );
  }

  getOne(id) {
    return axios.get(
      VITE_API + `/groups/${id}`,
      Constant.getHeader()
    );
  }

  update(payload){
    return axios.put(VITE_API+"/groups/",
    payload,
    Constant.getHeader()
    )
  }

  deleteUser(id){
    return axios.delete(VITE_API+`/groups/${id}`,
    Constant.getHeader())
  }
}

export default new GroupsService();

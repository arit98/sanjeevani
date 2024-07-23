import axios from "axios";
import Constant from "./Constant";

const VITE_API = import.meta.env.VITE_API;

class MedicineServices {

  createMed(payload) {
    return axios.post(
      VITE_API + "/medicine",
      payload,
      Constant.getHeader()
    );
  }
  
  getAll() {
    return axios.get(
      VITE_API + "/medicine",
      Constant.getHeader()
    );
  }

  getOne(id) {
    return axios.get(
      VITE_API + `/medicine/${id}`,
      Constant.getHeader()
    );
  }

  update(payload){
    return axios.put(VITE_API+`/medicine/${id}`,
    payload,
    Constant.getHeader()
    )
  }

  deleteMed(id){
    return axios.delete(VITE_API+`/medicine/${id}`,
    Constant.getHeader())
  }

  searchMed(obj){
    return axios.get(VITE_API+`/medicine-search?medicine_id=${obj.medicine_id}&category_id=${obj.category_id}&company_id=${obj.company_id}&box_price=${obj.box_price}&page_price=${obj.page_price}&name=${obj.name}&limit=${obj.limit}&offset=${obj.offset}`,  
    Constant.getHeader())
  }
}

export default new MedicineServices();

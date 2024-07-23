// ContentLayer
import React, { useEffect, useState } from "react";
import MedicineContainer from "./MedicineContainer";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import RowContainer from "./RowContainer";
import MenuContainer from "./MenuContainer";
import { useStateValue } from "../context/StateProvider";
import CartContainer from "./CartContainer";
import SwipeRegister from "./Register/SwipeRegister";
import SwipeLogin from "./Login/SwipeLogin";
import SwipeFooter from "./SwipeFooter";
import SearchField from "./SearchField";
import MedicineServices from '../services/MedicineServices'

const MainContainer = () => {
  const [{ cartShow, loginShow, registerShow, footerShow, searchfieldShow }, dispatch] = useStateValue();

  const [data, setData] = useState([]);

  const loadData = async () => {
    
    var obj = {
      medicine_id: "",
      category_id: "",
      company_id: "",
      box_price: "",
      page_price: "",
      name: "",
      limit: 10,
      offset: 0,
    };

    const response = await MedicineServices.searchMed(obj);
    setData(response.data.data);
  };

  var val = 200;

  const [scrollValue, setscrollValue] = useState(val);

  useEffect(() => { loadData() }, [scrollValue, cartShow]);

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <MedicineContainer />

      <section className="w-full my-6 sm:my-12">
        <div className="w-full flex items-center justify-between">
          <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-[#55AAAA] to-[#008080] transition-all ease-in-out duration-100">
            We are here for your safety
          </p>

          <div className="hidden md:flex gap-3 items-center">
            <motion.button
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-[#8DC6C6] hover:bg-[#008080] cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
              onClick={() => setscrollValue((val -= 800))}
            >
              <FaChevronLeft className="text-lg text-white" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-[#8DC6C6] hover:bg-[#008080] cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
              onClick={() => setscrollValue((val += 200))}
            >
              <FaChevronRight className="text-lg text-white" />
            </motion.button>
          </div>
        </div>
        <RowContainer
          scrollValue={scrollValue}
          flag={true}
          data={data?.filter((item)=>item===item)}
        />
      </section>

      <MenuContainer data={data} />

      {cartShow && <CartContainer />}
      {loginShow && <SwipeLogin />}
      {registerShow && <SwipeRegister />}
      {footerShow && <SwipeFooter />}
      {searchfieldShow && <SearchField/>}
    </div>
  );
};

export default MainContainer;

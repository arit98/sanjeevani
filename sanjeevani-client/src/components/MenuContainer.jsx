// CategoryMenu
import React, { useEffect, useState } from "react";
import { categories } from "../utils/category";
import { motion } from "framer-motion";
import RowContainer from "./RowContainer";
import MedicineServices from "../services/MedicineServices";

const MenuContainer = () => {
  const [filter, setfilter] = useState(1);

  const [data, setData] = useState([]);

  const loadData = async () => {
    var obj = {
      medicine_id: "",
      category_id: filter,
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

  useEffect(() => {
    loadData();
  }, [filter]);

  return (
    <>
      <section className="w-full my-6" id="menu">
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-[#55AAAA] to-[#008080] transition-all ease-in-out duration-100 mr-auto">
            Door Step Delivery
          </p>
        </div>

        {/* category */}
        <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
          {categories &&
            categories.map((cat) => (
              <motion.div
                whileTap={{ scale: 0.6 }}
                key={cat.id}
                className={`group ${
                  filter === cat.id ? "bg-[#55aaaa]" : "bg-card"
                } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-lg flex flex-col gap-3 items-center justify-center duration-150 transition-all ease-in-out hover:bg-[#55aaaa]`}
                onClick={() => setfilter(cat.id)}
              >
                <div
                  className={`h-10 w-10 ${
                    filter === cat.id ? "bg-card" : "bg-[#55aaaa]"
                  } rounded-full group-hover:bg-card flex items-center justify-center`}
                >
                  <img
                    src={cat.imgURL}
                    className={`${
                      filter === cat.category_name
                        ? "text-textColor"
                        : "text-card"
                    } group-hover:text-textColor text-lg`}
                  />
                </div>
                <p
                  className={`${
                    filter === cat.id
                      ? "text-card"
                      : "text-textColor"
                  } text-sm group-hover:text-card`}
                >
                  {cat.name}
                </p>
              </motion.div>
            ))}
        </div>

        <div className="w-full">
          <RowContainer flag={false} data={data} />
        </div>
      </section>
    </>
  );
};

export default MenuContainer;

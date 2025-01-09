// Conent
import React, { useEffect, useRef, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import NotFound from "../img/NotFound.svg";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { Link } from "react-router-dom";
import CartService from "../services/CartService";

const RowContainer = ({ flag, scrollValue, data }) => {
  const rowContainer = useRef();
  const [{ cartItems, user }, dispatch] = useStateValue();
  const [items, setItems] = useState(cartItems);

  useEffect(() => {
    console.log(user)
  }, []);

  const addtocart = async (medicine_id) => {

    const payload = {
      user_id: user.user_id,
      medicine_id: medicine_id,
      box_quantity: 0,
      page_quantity: 1,
      quantity_type: "page"
    };

    const response = await CartService.create(payload);
    const response2 = await CartService.getOne(user.user_id);
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: response2.data.data[0].cart_details,
    });

    // dispatch({
    //   type: actionType.SET_CARTITEMS,
    //   cartItems: [...cartItems],
    // });

  };

  const addtocart_session = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
    sessionStorage.setItem("cartItems", JSON.stringify(items));
  };

  useEffect(() => {
    if (user.token) {
      addtocart();
    } else {
      addtocart_session();
    }
  });

  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  return (
    <div
      ref={rowContainer}
      className={`w-full my-4 flex gap-3 bg-gradient-to-b from-teal-50 via-teal-100 to-teal-50 rounded-b-3xl opacity-4 scroll-smooth ${flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
        }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item.id}
            className="w-275 h-[175px] min-w-[275px] md:w-300 md:min-w-[300px] bg-cardOverlay rounded-lg py-16 px-4  my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative"
          >
            <div className="w-full flex-col items-center justify-between box-content">
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="w-40 h-40 -mt-8 drop-shadow-2xl"
              >
                <Link
                  state={{ company_id: item.company_id, medicine_id: item.id }}
                  to={"/product-details"}
                >
                  <img
                    src={
                      item.image_details.length > 0 &&
                      item.image_details[0].image_link
                    }
                    alt=""
                    className="w-full h-full object-contain mt-2"
                  />
                </Link>
              </motion.div>
              <motion.div
                // onClick={() => addtocart(item.id,item.store_details[0].total_box_quantity,item.store_details[0].total_page_quantity)}
                onClick={user.user_id ? () => addtocart(item.id) : () => setItems([...cartItems, item])}
                whileTap={{ scale: 0.75 }}
                className="w-24 h-6 gap-2 rounded-full mt-7 bg-[#55aaaa] flex items-center justify-center cursor-pointer hover:shadow-md"
              >
                <p className="text-xs text-primary">add to cart</p>
                <FaCartPlus className="text-sm text-primary" />
              </motion.div>
            </div>

            <div className="w-full flex flex-col -mt-16 items-end justify-end -z-10">
              <p className="text-textColor font-semibold textbase md:text-lg">
                {item.name}
              </p>
              {/* <p className="pt-2 text-sm text-gray-500">{n.category_details[0].category_name}</p> */}
              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-[#18978F]">₹</span>
                  {item.page_price}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-80 flex flex-col items-center justify-center">
          <img src={NotFound} alt="Not Found" />
          <p className="text-red-500 text-2xl">Items Not Found</p>
        </div>
      )}
    </div>
  );
};

export default RowContainer;
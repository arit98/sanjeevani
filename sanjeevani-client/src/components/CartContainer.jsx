import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { BiMinus, BiPlus } from "react-icons/bi";
import { RiRefreshFill } from "react-icons/ri";
import CartService from "../services/CartService";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import EmptyCart from "../img/emptyCart.svg";

const CartContainer = () => {
  const [data, setData] = useState([]); 
  const [{ cartShow, cartItems }, dispatch] = useStateValue();
  const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0);

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: [],
    });

    localStorage.setItem("cartItems", JSON.stringify([]));
  };

  const loadData = async () => {
    const response = await CartService.getOne(1);
    setData(response.data.data);
    // console.log(
    //   response.data.data[0].cart_details[0].medicine_details[0].page_price
    // );
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    let totalPrice = cartItems.reduce(function (accumulator, item) {
      return accumulator + item.qty * item.price
    }, 0);
    setTot(totalPrice);
    console.log(tot);
  }, [tot, flag]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]"
    >
      <div className="w-full flex items-center justify-between p-4 cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
        </motion.div>
        <p className="text-textColor text-lg font-semibold">Cart</p>

        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md  cursor-pointer text-textColor text-base"
          onClick={clearCart}
        >
          Clear <RiRefreshFill />
        </motion.p>
      </div>
      {/* bottom section */}
      {cartItems && cartItems.length > 0 ? (
        <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
          {/* cart Item section */}
          <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {/* cart Item */}
            {cartItems &&
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="w-full p-1 px-2 bg-cartItem rounded-lg flex items-center gap-2"
                >
                  <img
                    src={item?.image_details[0].image_link}
                    alt=""
                    className="w-20 h-20 max-w-[60px] rounded-full object-contain"
                  />

                  {/* name section */}
                  {/* <p>{alert(item.cart_details[0].medicine_details[0].page_price)}</p> */}
                  <div className="flex flex-col gap-2">
                    <p className="text-base text-gray-50">{item?.name}</p>
                    <p className="text-sm block text-red-600 font-semibold">
                      ₹{item?.page_price}
                    </p>
                  </div>

                  <div className="group flex items-center gap-2 ml-auto cursor-pointer">
                    <motion.div whileTap={{ scale: 0.75 }}>
                      <BiMinus className="text-gray-50 " />
                    </motion.div>

                    <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
                      5
                    </p>

                    <motion.div whileTap={{ scale: 0.75 }}>
                      <BiPlus className="text-gray-50 " />
                    </motion.div>
                  </div>
                  {/* kkk */}
                </div>
              ))}
          </div>
          {/* cart total section */}
              <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
                <div className="w-full flex items-center justify-between">
                  <p className="text-gray-400 text-lg">Sub Total</p>
                  <p className="text-gray-400 text-lg">
                  ₹{cartItems[0].page_price}
                  </p>
                </div>
                <div className="w-full flex items-center justify-between">
                  <p className="text-gray-400 text-lg">Delivery</p>
                  <p className="text-gray-400 text-lg">
                    ₹0
                    {/* {cart.cart_details[0].medicine_details[0].page_price -
                      (item.cart_details[0].medicine_details[0].page_price *
                        100) /
                        100} */}
                  </p>
                </div>

                <div className="w-full border-b border-gray-600 my-2"></div>

                <div className="w-full flex items-center justify-between">
                  <p className="text-gray-200 text-xl font-semibold">Total</p>
                  <p className="text-gray-200 text-xl font-semibold">
                  ₹{cartItems[0].page_price}
                  </p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  type="button"
                  className="w-full p-2 rounded-full bg-gradient-to-tr from-teal-400 to-teal-600 text-gray-50 text-lg my-2 hover:shadow-lg"
                >
                  Check Out
                </motion.button>
              </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={EmptyCart} className="w-300" alt="" />
          <p className="text-xl text-textColor font-semibold">
            Add some items to your cart
          </p>
        </div>
      )}
    </motion.div>
  );
};
  
export default CartContainer;

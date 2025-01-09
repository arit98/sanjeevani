import React, { useEffect, useState } from "react";
// import Tablet from "../img/tab.png";
// import Box from "../img/box.png";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import CartService from "../services/CartService";

const CartItem = ({ setFlag, flag, item }) => {
  const [qty, setQty] = useState(1);
  const [{ user, cartItems }, dispatch] = useStateValue();
  const [items, setItems] = useState([]);

  const cartDispatch = async (id, payload) => {
    if (user?.token) {
      console.log("update cart data", payload);
      response = await CartService.update(payload, id);
    sessionStorage.setItem("cartItems", JSON.stringify([]));
    } else {
      sessionStorage.setItem("cartItems", JSON.stringify(items));
      dispatch({
        type: actionType.SET_CARTITEMS,
        cartItems: items,
      });
    }
  };

  const updateQty = async (action, id, data) => {
    if (action == "add") {
      setQty(qty + 1);
      cartItems.map((item) => {
        if (item.id === id) {
          item.qty += 1;
          if (data.quantity_type === "box") data.box_quantity = item.qty;
          else data.page_quantity = item.qty;
          setFlag(flag + 1);
        }
      });
      cartDispatch(id, data);
    } else {
      if (qty == 0) {
        await CartService.deleteOne(id);
        cartItems.filter((item) => item.id !== id);
        setFlag(flag + 1);
        cartDispatch(id, data);
      } else {
        setQty(qty - 1);
        cartItems.map((item) => {
          if (item.id === id) {
            item.qty -= 1;
            if (data.quantity_type === "box") data.box_quantity = item.qty;
            else data.page_quantity = item.qty;
          }
        });
        cartDispatch(id, data);
      }
    }
  };

  useEffect(() => {
    setItems(cartItems);
  }, [qty]);

  if (user?.token) {
    return (
      <>
        <div
          {...console.log("first", item)}
          key={item?.medicine_details[0].id}
          className="w-full p-1 px-2 bg-cartItem rounded-lg flex items-center gap-2"
        >
          <img
            src={item?.medicine_details[0].image_details[0].image_link}
            alt="picture"
            className="w-20 h-20 max-w-[60px] rounded-full object-contain"
          />

          {/* name section */}
          {/* <p>{alert(item.cart_details[0].medicine_details[0].page_price)}</p> */}
          <div className="flex flex-col gap-2">
            <p className="text-base text-gray-50">
              {item?.medicine_details[0].name}
            </p>
            <p className="text-sm block text-red-600 font-semibold">
              ₹
              {(parseFloat(item?.medicine_details[0].page_price) * qty).toFixed(2)}
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 ml-auto">
            <div className="flex items-center gap-2 ml-auto cursor-pointer">
              <div className="h-12 w-12"></div>
              <motion.div whileTap={{ scale: 0.75 }}>
                <BiMinus
                  className="text-gray-50 "
                  onClick={() => updateQty("remove", item?.id, item)}
                />
              </motion.div>

              <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
                {qty}
              </p>

              <motion.div whileTap={{ scale: 0.75 }}>
                <BiPlus
                  className="text-gray-50 "
                  onClick={() => updateQty("add", item?.id, item)}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          key={item?.id}
          className="w-full p-1 px-2 bg-cartItem rounded-lg flex items-center gap-2"
        >
          <img
            src={item?.image_details[0].image_link}
            alt="picture"
            className="w-20 h-20 max-w-[60px] rounded-full object-contain"
          />

          {/* name section */}
          {/* <p>{alert(item.cart_details[0].medicine_details[0].page_price)}</p> */}
          <div className="flex flex-col gap-2">
            <p className="text-base text-gray-50">{item?.name}</p>
            <p className="text-sm block text-red-600 font-semibold">
              ₹{(parseFloat(item?.page_price) * qty).toFixed(2)}
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 ml-auto">
            <div className="flex items-center gap-2 ml-auto cursor-pointer">
              <div className="h-12 w-12"></div>
              <motion.div whileTap={{ scale: 0.75 }}>
                <BiMinus
                  className="text-gray-50 "
                  onClick={() => updateQty("remove", item?.id, item)}
                />
              </motion.div>

              <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
                {qty}
              </p>

              <motion.div whileTap={{ scale: 0.75 }}>
                <BiPlus
                  className="text-gray-50 "
                  onClick={() => updateQty("add", item?.id, item)}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default CartItem;

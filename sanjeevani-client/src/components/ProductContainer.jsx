import React, { useState, useEffect } from "react";
import ReactImageMagnify from "react-image-magnify";
import { AiOutlineStar } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import MedicineServices from "../services/MedicineServices";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import CartContainer from "./CartContainer";
import SwipeLogin from "./Login/SwipeLogin";
import SwipeRegister from "./Register/SwipeRegister";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import CartService from "../services/CartService";

const ProductContainer = () => {
  const [
    { cartShow, loginShow, registerShow, footerShow, cartItems, user },
    dispatch,
  ] = useStateValue();

  const qtys = ["Select Per Page Quantity", "Select Per Box Quantity"];

  const [selected, setSelected] = useState("");

  const [img, SetImg] = useState();

  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);
  const [data, setData] = useState([]);

  var location = useLocation();

  // @ts-ignore
  const { company_id, medicine_id } = location.state;

  const addtocart = async (medicine_id) => {
    const payload = {
      user_id: user.user_id,
      medicine_id: medicine_id,
      box_quantity: 0,
      page_quantity: 1,
      quantity_type: "page",
    };

    const response = await CartService.create(payload);
    console.log("login cart items", cartItems);

    // console.log(" usususu" ,user.user_id)
    const response2 = await CartService.getOne(user.user_id);

    console.log(response2.data.data[0]);
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: response2.data.data[0].cart_details,
    });
  };

  const loadData = async () => {
    var obj = {
      medicine_id: medicine_id,
      category_id: "",
      company_id: company_id,
      box_price: "",
      page_price: "",
      name: "",
      limit: 10,
      offset: 0,
    };
    const response = await MedicineServices.searchMed(obj);
    setData(response.data.data);
    // console.log(response.data.data);
  };

  const addCount = () => {
    setCount((prev) => prev + 1);
  };

  const minusCount = () => {
    if (count > 0) {
      setCount((prev) => prev - 1);
    }
  };

  const addtocart_session = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
    sessionStorage.setItem("cartItems", JSON.stringify(items));
  };

  const imageChange = (parm) => {
    SetImg(parm);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    addtocart();
  }, [items]);

  return (
    <>
      {data.length > 0 &&
        data.map((item) => (
          <section className="overflow-hidden bg-teal-50 py-11 font-poppins dark:bg-gray-800">
            <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
              <div className="flex -mx-48 -mt-16">
                <div className="flex flex-col">
                  <div className="h-8 w-28 flex justify-center items-center">
                    <BiUpArrow className="text-3xl" />
                  </div>
                  <div className="w-28 gap-2 h-[34rem] overflow-y-scroll scrollbar-none">
                    {item.image_details.length > 0 &&
                      item.image_details.map((img) => (
                        <div
                          className="bg-[#f0fdfa] flex justify-center items-center py-4 cursor-pointer"
                          onClick={() => imageChange(img.image_link)}
                        >
                          <img
                            src={img.image_link}
                            alt="Wooden chair - preview 2"
                          />
                        </div>
                      ))}
                  </div>
                  <div className="h-8 w-28 flex justify-center items-center">
                    <BiDownArrow className="text-3xl" />
                  </div>
                </div>
                <div className="w-full px-4 md:w-1/5 ">
                  <div className="sticky top-0 z-50 overflow-hidden">
                    <div className="relative mb-6 lg:mb-10 lg:h-2/4">
                      <ReactImageMagnify
                        {...{
                          smallImage: {
                            alt: "Wristwatch by Ted Baker London",
                            isFluidWidth: true,
                            src: img ? img : item.image_details[0].image_link,
                          },
                          largeImage: {
                            src: img ? img : item.image_details[0].image_link,
                            width: 1268,
                            height: 800,
                          },
                          imageStyle: {
                            background: "#f0fdfa",
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full px-4 md:w-1/2">
                  <div className="lg:pl-20">
                    <div className="mb-8 ">
                      <span className="text-lg font-medium text-rose-500 dark:text-rose-200">
                        New
                      </span>
                      <h2 className="max-w-xl mt-2 mb-6 text-2xl font-bold dark:text-gray-400 md:text-4xl">
                        {item.name}
                      </h2>
                      <div className="flex items-center mb-6">
                        <ul className="flex mr-2">
                          <AiOutlineStar className="text-red-500 text-xl" />
                          <AiOutlineStar className="text-red-500 text-xl" />
                          <AiOutlineStar className="text-red-500 text-xl" />
                          <AiOutlineStar className="text-red-500 text-xl" />
                          <AiOutlineStar className="text-red-500 text-xl" />
                        </ul>
                        <p className="text-xs dark:text-gray-400 ">
                          (2 customer reviews)
                        </p>
                      </div>
                      <p className="max-w-md mb-8 text-gray-700 dark:text-gray-400">
                        {item.short_desc}
                      </p>
                      <p className="inline-block mb-8 text-4xl font-bold text-gray-700 dark:text-gray-400 ">
                        <span>₹{item.page_price}</span>
                        <br />
                        <span className="text-base font-normal text-gray-500 line-through dark:text-gray-400">
                          ₹{item.box_price}
                        </span>
                      </p>
                      <p className="text-green-600 dark:text-green-300 ">
                        7 in stock
                      </p>
                    </div>

                    <div className="flex items-center mb-8">
                      <div className="mt-20 mb-12">
                        <span className="text-base font-bold">
                          <span className="text-red-500">*</span>
                          Select Quantity
                        </span>
                        <span className="ml-4">
                          <select
                            className="h-12 w-72 bg-[#1f2937] text-card rounded-lg
                  "
                            onChange={(e) => {
                              setSelected(e.target.value);
                            }}
                          >
                            <option>Select Quantity</option>
                            {qtys.map((qty) => {
                              return <option>{qty}</option>;
                            })}
                          </select>
                        </span>
                        {selected && (
                          <div className="flex mr-8 rounded-lg">
                            <div className="flex bg-slate-800 text-cardOverlay rounded-lg mt-8">
                              <span
                                onClick={minusCount}
                                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer border border-gray-300 border-r-0 w-12 h-12 flex items-center justify-center pb-1 rounded-l-lg"
                              >
                                -
                              </span>
                              <input
                                id="counter"
                                aria-label="input"
                                className="border border-gray-300 h-full text-center w-14 pb-1 text-slate-800"
                                type="text"
                                value={count}
                                onChange={(e) => e.target.value}
                              />
                              <span
                                onClick={addCount}
                                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer border border-gray-300 border-l-0 w-12 h-12 flex items-center justify-center pb-1 rounded-r-lg"
                              >
                                +
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center -mx-4 ">
                      <div className="w-full px-4 mb-4 lg:w-1/2 lg:mb-0">
                        <button
                          onClick={addtocart}
                          className="flex items-center justify-center w-full p-4 text-red-500 border border-red-500 rounded-md dark:text-gray-200 dark:border-red-600 hover:bg-red-600 hover:border-red-600 hover:text-gray-100 dark:bg-red-600 dark:hover:bg-red-700 dark:hover:border-red-700 dark:hover:text-gray-300"
                        >
                          Add to Cart
                        </button>
                      </div>
                      <div className="w-full px-4 mb-4 lg:mb-0 lg:w-1/2">
                        <button className="flex items-center justify-center w-full p-4 text-red-500 border border-red-500 rounded-md dark:text-gray-200 dark:border-red-600 hover:bg-red-600 hover:border-red-600 hover:text-gray-100 dark:bg-red-600 dark:hover:bg-red-700 dark:hover:border-red-700 dark:hover:text-gray-300">
                          Add to wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      {cartShow && <CartContainer />}
    </>
  );
};

export default ProductContainer;

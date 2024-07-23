import React from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import SwipeFooter from "./SwipeFooter";
import CartContainer from "./CartContainer"
import SwipeLogin from './Login/SwipeLogin'
import SwipeRegister from "./Register/SwipeRegister";
import Error from "../img/404err.png"

const SkipDoctor = () => {
  const [{ cartShow, loginShow, registerShow, footerShow }, dispatch] =
    useStateValue();
  return (
    <div className="h-screen">
      <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
        <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
          <div className="relative">
            <div className="absolute">
              <div className>
                <h1 className="my-2 text-gray-800 font-bold text-2xl">
                  Looks like you've found the doorway to the great nothing
                </h1>
                <p className="my-2 text-gray-800">
                  We are almost ready to start that facility kindly visit our home page and buy your favourite products. thank you 
                </p>
                <Link exact to={"/"}>
                  <button className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-teal-600 text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">
                  Take me there!
                </button>
                </Link>
              </div>
            </div>
            <div>
            </div>
          </div>
        </div>
        <div>
          <img src={Error} className="h-72"/>
        </div>
      {footerShow && <SwipeFooter />}
      </div>
      {cartShow && <CartContainer />}
      {loginShow && <SwipeLogin />}
      {registerShow && <SwipeRegister />}
    </div>
  );
};

export default SkipDoctor;

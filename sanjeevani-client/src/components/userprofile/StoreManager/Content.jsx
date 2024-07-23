import React from "react";
import { BiLocationPlus } from "react-icons/bi";
import { FaJediOrder } from "react-icons/fa";
import { MdOutlineNotListedLocation } from "react-icons/md";
import { RiOrderPlayFill, RiUserLocationLine } from "react-icons/ri";
import { TbLocation } from "react-icons/tb";
import { Link } from "react-router-dom";

const Content = () => {
  return (
    <>
      <div className="mt-8 flex items-center justify-center">
        <div className="grid lg:grid-cols-3 lg:gap-40 gap-8">
          <div className="h-48 w-80 bg-red-400 rounded-lg">
            <p className="text-center leading-10 text-red-300 text-xl">Total Pending Order</p>
            <TbLocation className="text-9xl mx-auto text-red-300"/>
            <div className="bg-cardOverlay">
              <Link to={"/deliveryboy/pending"}>
                <p className="text-center hover:text-blue-600 cursor-pointer text-slate-600 underline">view more</p>
              </Link>
              </div>
          </div>
          <div className="h-48 w-80 bg-blue-400 rounded-lg">
            <p className="text-center leading-10 text-blue-300 text-xl">Total Order</p>
            <RiUserLocationLine className="text-9xl mx-auto text-blue-300"/>
            <div className="bg-cardOverlay">
            <Link to={"/deliveryboy/total"}>
                <p className="text-center hover:text-blue-600 cursor-pointer text-slate-600 underline">view more</p>
              </Link>
              </div>
          </div>
          <div className="h-48 w-80 bg-green-400 rounded-lg">
            <p className="text-center leading-10 text-green-300 text-xl">Total Delivered Order</p>
            <BiLocationPlus className="text-9xl mx-auto text-green-300"/>
            <div className="bg-cardOverlay">
            <Link to={"/deliveryboy/delivered"}>
                <p className="text-center hover:text-blue-600 cursor-pointer text-slate-600 underline">view more</p>
              </Link>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;

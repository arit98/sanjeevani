import React from "react";
import { BiUserCheck } from "react-icons/bi";
import { FaUserMd } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { Link } from "react-router-dom";

const Content = () => {
  return (
    <>
      <div className="mt-8 flex items-center justify-center">
        <div className="grid lg:grid-cols-3 lg:gap-40 gap-8">
          <div className="h-48 w-80 bg-red-400 rounded-lg">
            <p className="text-center leading-10 text-red-300 text-xl">Total Pending Patient</p>
            <FaUserMd className="text-9xl mx-auto text-red-300"/>
            <div className="bg-cardOverlay">
              <Link to={"/doctor/pending"}>
                <p className="text-center hover:text-blue-600 cursor-pointer text-slate-600 underline">view more</p>
              </Link>
              </div>
          </div>
          <div className="h-48 w-80 bg-blue-400 rounded-lg">
            <p className="text-center leading-10 text-blue-300 text-xl">Total Patient</p>
            <MdPendingActions className="text-9xl mx-auto text-blue-300"/>
            <div className="bg-cardOverlay">
            <Link to={"/doctor/total"}>
                <p className="text-center hover:text-blue-600 cursor-pointer text-slate-600 underline">view more</p>
              </Link>
              </div>
          </div>
          <div className="h-48 w-80 bg-green-400 rounded-lg">
            <p className="text-center leading-10 text-green-300 text-xl">Already Have Seen</p>
            <BiUserCheck className="text-9xl mx-auto text-green-300"/>
            <div className="bg-cardOverlay">
            <Link to={"/doctor/haveseen"}>
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

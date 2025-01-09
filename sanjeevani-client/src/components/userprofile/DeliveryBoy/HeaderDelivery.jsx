import React, { useEffect, useState } from "react";
import Logo from "../../../img/logo.png";
import UserService from "../../../services/UserService";
import {
  FaShoppingCart,
  FaSignOutAlt,
  FaClinicMedical,
  FaBriefcaseMedical,
  FaHandHoldingMedical,
  FaHandsHelping,
} from "react-icons/fa";
import { IoNotificationsSharp, IoSettings } from "react-icons/io5";
import Avatar from "../../../img/avatar.png";
import { motion } from "framer-motion";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useStateValue } from "../../../context/StateProvider";
import { actionType } from "../../../context/reducer";
import { TbLogin } from "react-icons/tb";
import "react-modern-drawer/dist/index.css";
import { FcSettings } from "react-icons/fc";
import { RiProfileFill } from "react-icons/ri";

const HeaderDelivery = () => {
  const [
    { user, cartShow, cartItems, loginShow, isActive, AvatarImage },
    dispatch,
  ] = useStateValue();

  // const [state, setState] = useState([]);

  const [isMenu, setIsMenu] = useState(false);

  const [Login, setLogin] = useState(false);

  useEffect(() => {
    console.log("user header ");
    dispatch({
      type: actionType.SET_USER,
      user: {
        user_id: localStorage.getItem("id"),
        token: localStorage.getItem("token"),
      },
    });
    setLogin(!Login);
  }, [isActive]);

  useEffect(() => {
    // console.log("user ",user);
    if (user?.token) login();
  }, [Login]);

  const login = async () => {
    const response = await UserService.getOne(user.user_id);
    console.log(response.data);
    dispatch({
      type: actionType.SET_AvatarImage,
      AvatarImage: response.data.data[0].imageUrl,
    });
  };

  const navigate = useNavigate()

  const Logout = () => {
    setIsMenu(false);
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
    dispatch({
      type: actionType.SET_ISACTIVE,
      isActive: false,
    });
    navigate("/")
  };

  const OpenMenu = () => {
    setIsMenu(!isMenu);
  };

  return (
    <>
      <header className="fixed z-50 w-screen p-3 px-4 md:p-2 md:px-16 bg-card shadow-md backdrop-blur-xl">
      {/* destop */}
      <div className="w-full h-full hidden md:flex items-center justify-between">
        <a href={"/admin"} className="flex items-center gap-2 cursor-pointer">
          <motion.img
            whileTap={{ scale: 0.2 }}
            src={Logo}
            className="w-4y h-20 object-cover cursor-pointer"
            alt="logo"
          />
        </a>

        <div className="items-center flex gap-8">
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              // user

              src={AvatarImage ? AvatarImage : Avatar}
              className="w-10 min-w-10 min-h-10 h-10 drop-shadow-lg cursor-pointer rounded-[50%]"
              alt="User Profile"
              onClick={OpenMenu}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-[220px] bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
              >
                <p
                  className="m-2 p-2
                 flex gap-3 cursor-pointer rounded-md shadow-md items-center justify-center bg-slate-200 hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={()=>navigate("/deliveryboy/profile")}
                >
                  Profile <RiProfileFill />
                </p>
                <p
                  className="m-2 p-2
                 flex gap-3 cursor-pointer rounded-md shadow-md items-center justify-center bg-slate-200 hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={Logout}
                >
                  Settings <IoSettings />
                </p>
                <p
                  className="m-2 p-2
                 flex gap-3 cursor-pointer rounded-md shadow-md items-center justify-center bg-slate-200 hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={Logout}
                >
                  Logout <FaSignOutAlt />
                </p>
              </motion.div>
            )}
          </div>
          {/* button */}
        </div>
      </div>

      {/* mobile */}
      <div className="flex items-center justify-between md:hidden w-full h-full">
        <Link to={"/"} className="flex items-center gap-2 cursor-pointer">
          <motion.img
            whileTap={{ scale: 0.2 }}
            src={Logo}
            className="w-4y h-[54px] object-cover cursor-pointer"
            alt="logo"
          />
        </Link>

        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={AvatarImage ? AvatarImage : Avatar}
            className="w-10 min-w-10 min-h-10 h-10 drop-shadow-lg cursor-pointer rounded-[50%]"
            alt="User Profile"
            onClick={OpenMenu}
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-[220px] bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
            >
              <p
                className="m-2 p-2
                 flex gap-3 cursor-pointer rounded-md shadow-md items-center justify-center bg-slate-200 hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor text-base"
                onClick={Logout}
              >
                Profile <RiProfileFill />
              </p>
              <p
                className="m-2 p-2
                 flex gap-3 cursor-pointer rounded-md shadow-md items-center justify-center bg-slate-200 hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor text-base"
                onClick={Logout}
              >
                Settings <IoSettings />
              </p>
              <p
                className="m-2 p-2
                 flex gap-3 cursor-pointer rounded-md shadow-md items-center justify-center bg-slate-200 hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor text-base"
                onClick={Logout}
              >
                Logout <FaSignOutAlt />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
    <Outlet />
    </>
  );
};

export default HeaderDelivery;

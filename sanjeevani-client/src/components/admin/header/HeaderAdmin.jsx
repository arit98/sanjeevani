import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../img/logo.png";
import { motion } from "framer-motion";
import UserService from "../../../services/UserService";
import NavMenu from "../navbar/NavMenu";
import NavBar from "../navbar/NavBar";
import Avatar from "../../../img/avatar.jpg";
import { useStateValue } from "../../../context/StateProvider";
import { actionType } from "../../../context/reducer";
import { IoSettings } from "react-icons/io5";
import {
  FaHamburger,
  FaSignOutAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { Menu, ProSidebarProvider, Sidebar, SubMenu, MenuItem } from "react-pro-sidebar";
import { FcCollaboration, FcPieChart, FcTodoList, FcBusinessman } from "react-icons/fc";

const HeaderAdmin = () => {
  const [{ user, isActive, AvatarImage }, dispatch] = useStateValue();

  const [Login, setLogin] = useState(false);

  const [isMenu, setIsMenu] = useState(true);

  const [setting, SetSetting] = useState(true)

  useEffect(() => {
    dispatch({
      type: actionType.SET_USER,
      user: {
        user_id: localStorage.getItem("id"),
        token: localStorage.getItem("token"),
        role: localStorage.getItem("role"),
      },
    });
    setLogin(!Login);
  }, [isActive]);

  useEffect(() => {
    if (user?.token) login();
  }, [Login]);

  const login = async () => {
    const response = await UserService.getOne(user.user_id);
    console.log("xyz", response.data.data);
    dispatch({
      type: actionType.SET_AvatarImage,
      AvatarImage: response.data.data[0].imageUrl,
    });
  };

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
  };

  const SetMenu = () => {
    setIsMenu(!isMenu);
  };

  const SetMenuSetting = () => {
    SetSetting(!setting);
  };

  return (
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

              src={user?.token ? AvatarImage : Avatar}
              className="w-10 min-w-10 min-h-10 h-10 drop-shadow-lg cursor-pointer rounded-[50%]"
              alt="User Profile"
              onClick={SetMenuSetting}
            />
            <NavBar />
            {setting && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-60 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
              >
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
        <div
          className="relative flex items-center justify-center"
          onClick={SetMenu}
        >
          <FaHamburger className="text-textColor text-2xl cursor-pointer" />
        </div>
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
            src={user?.token ? AvatarImage : Avatar}
            className="w-10 min-w-10 min-h-10 h-10 drop-shadow-lg cursor-pointer rounded-[50%]"
            alt="User Profile"
            // onClick={OpenMenu}
          />
          {isMenu && (
            <NavMenu />
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;

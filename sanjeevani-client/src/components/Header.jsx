import React, { useEffect, useState } from "react";
import Logo from "../img/logo.png";
import UserService from "../services/UserService";
import {
  FaShoppingCart,
  FaSignOutAlt,
  FaClinicMedical,
  FaBriefcaseMedical,
  FaHandHoldingMedical,
  FaHandsHelping,
  FaUser,
} from "react-icons/fa";
import Avatar from "../img/avatar.png";
import { motion } from "framer-motion";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { TbLogin } from "react-icons/tb";
import "react-modern-drawer/dist/index.css";

const Header = () => {
  const [
    { user, cartShow, cartItems, loginShow, isActive, AvatarImage },
    dispatch,
  ] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);

  const [Login, setLogin] = useState(false);

  useEffect(() => {
    // console.log("user header ");
    setLogin(!Login);
  }, [isActive]);

  useEffect(() => {
    // console.log("user123 ", user);
    if (user?.token) login();
  }, [Login]);

  const login = async () => {
    const response = await UserService.getOne(user?.user_id);
    // console.log(response.data);
    dispatch({
      type: actionType.SET_AvatarImage,
      AvatarImage: response.data.data[0].imageUrl,
    });
  };

  const navigate = useNavigate();

  const Logout = () => {
    setIsMenu(false);
    localStorage.clear();
    navigate("/");
    dispatch({
      type: actionType.SET_USER,
      user: { user_id: null, token: null },
    });
    dispatch({
      type: actionType.SET_ISACTIVE,
      isActive: false,
    });
    dispatch({
      type: actionType.SET_AvatarImage,
      AvatarImage: null,
    });
  };

  const OpenMenu = () => {
    setIsMenu(!isMenu);
  };

  const Cart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  const Settings = () => {
    setIsMenu(false);
    navigate("/user/:id");
  };

  const ShowLogin = () => {
    dispatch({
      type: actionType.SET_LOGIN_SHOW,
      loginShow: !loginShow,
    });
  };

  return (
    <div>
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
            <motion.ul
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 200 }}
              className="flex items-center gap-8 justify-end"
            >
              <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                <Link to={"/"}>Medicines</Link>
              </li>
              <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                <Link to={"/doctor-container"}>Doctors</Link>
              </li>
              <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                <Link to={"/concern"}>Concerning Us</Link>
              </li>
              <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                <Link to={"/ourmotto"}>Our Motto</Link>
              </li>
            </motion.ul>
            <div
              className="relative flex items-center justify-center"
              onClick={Cart}
            >
              <FaShoppingCart className="text-textColor text-2xl cursor-pointer" />
              {cartItems && cartItems.length > 0 && (
                <div className="w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center absolute -top-2 -right-2">
                  <p className="text-xs text-white font-semibold">
                    {cartItems.length}
                  </p>
                </div>
              )}
            </div>

            <div className="relative">
              <motion.img
                whileTap={{ scale: 0.6 }}
                // user

                src={AvatarImage ? AvatarImage : Avatar}
                className="w-10 min-w-10 min-h-10 h-10 drop-shadow-lg cursor-pointer rounded-[50%]"
                alt="User Profile"
                onClick={user?.token ? OpenMenu : ShowLogin}
              />
              {isMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  className="w-60 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
                >
                  <p
                    className="m-2 p-2
                 flex gap-3 cursor-pointer rounded-md shadow-md items-center justify-center bg-slate-200 hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor text-base"
                    onClick={Settings}
                  >
                    Profile <FaUser />
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
            onClick={Cart}
          >
            <FaShoppingCart className="text-textColor text-2xl cursor-pointer" />
            {cartItems && cartItems.length > 0 && (
              <div className="w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center absolute -top-2 -right-2">
                <p className="text-xs text-white font-semibold">
                  {cartItems.length}
                </p>
              </div>
            )}
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
              onClick={OpenMenu}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-[220px] bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
              >
                <ul className="flex flex-col gap-3 py-2 justify-start items-start">
                  <li
                    className="py-2 flex cursor-pointer transition-all duration-100 ease-in-out text-textColor text-base hover:bg-slate-200 gap-10 px-4"
                    onClick={() => setIsMenu(false)}
                  >
                    <Link to={"/"}>
                      Medicines
                      <FaBriefcaseMedical fa-5x="" />
                    </Link>
                  </li>
                  <li
                    className="py-2 flex gap-14 cursor-pointer transition-all duration-100 ease-in-out text-textColor text-base hover:bg-slate-200 px-4"
                    onClick={() => setIsMenu(false)}
                  >
                    <Link to={"/doctor-container"}>
                      Doctors
                      <FaClinicMedical fa-5x="" />
                    </Link>
                  </li>
                  <li
                    className="py-2 flex gap-10 cursor-pointer transition-all duration-100 ease-in-out text-textColor text-base hover:bg-slate-200 px-4"
                    onClick={() => setIsMenu(false)}
                  >
                    <Link to={"/concern"}>
                      Concerning Us
                      <FaHandHoldingMedical fa-5x="" />
                    </Link>
                  </li>
                  <li
                    className="py-2 flex gap-8 cursor-pointer transition-all duration-100 ease-in-out text-textColor text-base hover:bg-slate-200 px-4"
                    onClick={() => setIsMenu(false)}
                  >
                    <Link to={"/ourmotto"}>
                      Our Motto
                      <FaHandsHelping fa-5x="" />
                    </Link>
                  </li>
                </ul>
                {user?.token ? (
                  <p
                    className="m-2 p-2
                 flex gap-3 cursor-pointer rounded-md shadow-md items-center justify-center bg-slate-200 hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor text-base"
                    onClick={Logout}
                  >
                    Logout <FaSignOutAlt />
                  </p>
                ) : (
                  <p
                    className="m-2 p-2 flex gap-3 cursor-pointer rounded-md shadow-md items-center justify-center bg-slate-200 hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor text-base"
                    whileTap={{ scale: 0.6 }}
                    src={AvatarImage ? AvatarImage : Avatar}
                    alt="User Profile"
                    onClick={ShowLogin}
                  >
                    {/* @ts-ignore */}
                    Login <TbLogin className="text-2xl" />
                  </p>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </header>
      <div className="h-32"></div>
      <Outlet />
    </div>
  );
};

export default Header;

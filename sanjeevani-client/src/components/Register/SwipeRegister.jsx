import { motion } from "framer-motion";
import React, { useState } from "react";
import { FcGoogle, FcTabletAndroid } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { toast } from "react-toastify";
import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";
import UserService from "../../services/UserService";

const initialState = {
  email: "",
  password1: "",
  password2: "",
  name: "",
  phone_number: "",
};

const SwipeRegister = () => {
  const [{ loginShow, registerShow }, dispatch] = useStateValue();

  const [state, setState] = useState(initialState);

  const [showpass, setShowPass] = useState(false);

  const { email, password1, password2, name, phone_number } = state;

  const [type, setType] = useState("password");

  const [type2, setType2] = useState("password");

  const [icon, setIcon] = useState(AiFillEyeInvisible);

  const [icon2, setIcon2] = useState(AiFillEyeInvisible)

  const handleToggle = () => {
      if (type === "password") {
        setIcon(AiFillEyeInvisible);
        setType("text");
      } else {
        setIcon(AiFillEye);
        setType("password");
      }
  };

  const handleToggle2 = () => {
      if (type2 === "password") {
        setIcon2(AiFillEyeInvisible);
        setType2("text");
      } else {
        setIcon2(AiFillEye);
        setType2("password");
      }
  };

  const RegisterLogin = () => {
    dispatch({
      type: actionType.SET_REGISTER_SHOW,
      registerShow: !registerShow,
    });
  };

  const ShowLogin = () => {
    dispatch({
      type: actionType.SET_LOGIN_SHOW,
      loginShow: !loginShow,
    });
  };

  const BackButton = () => {
    ShowLogin()
    RegisterLogin()
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password1 || !password2 || !name || !phone_number) {
      toast.error("Please Provide Value");
    } else {
      const payload = {
        name: name,
        phone_number: phone_number,
        email: email,
        role: 6,
        password1: password1,
        password2: password2,
      };
      const response = await UserService.register(payload);
      // console.log(response.data);
      if (response.data.status) {
        state.email = "";
        state.password1 = "";
        state.password2 = "";
        state.name = "";
        state.phone_number = "";
        toast.success(response.data.msg);
        RegisterLogin()
        ShowLogin()
      } else toast.error(response.data.msg);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }}
        className="fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]"
      >
        <div className="w-full flex items-center justify-between p-4 cursor-pointer">
          <motion.div whileTap={{ scale: 0.75 }}>
            <MdOutlineKeyboardBackspace
            // @ts-ignore
              className="text-textColor text-3xl"
              onClick={BackButton}
            />
          </motion.div>
          <p className="text-textColor text-lg font-semibold">Register</p>

          <motion.button
            whileTap={{ scale: 0.75 }}
            className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md  cursor-pointer text-textColor text-base"
            onClick={RegisterLogin}
          >
            Login
          </motion.button>
        </div>
        <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
          {/* register */}
          <div className="w-full h-screen md:h-42 px-6 py-4 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            <button
              aria-label="Continue with google"
              role="button"
              className="focus:outline-none bg-white focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 p-3 border rounded-lg border-gray-700 flex items-center w-full mt-10 hover:bg-gray-100"
            >
              {/* @ts-ignore */}
              <FcGoogle className="text-2xl" />
              <p className="text-base font-medium ml-4 text-gray-700">
                Continue with Google
              </p>
            </button>
            <button
              aria-label="Continue with twitter"
              role="button"
              className="focus:outline-none bg-white focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 p-3 border rounded-lg border-gray-700 flex items-center w-full mt-4 hover:bg-gray-100"
            >
              {/* @ts-ignore */}
              <FcTabletAndroid className="text-2xl" />
              <p className="text-base font-medium ml-4 text-gray-700">
                Continue with Phone Number
              </p>
            </button>
            <div className="w-full flex items-center justify-between py-8">
              <hr className="w-full bg-gray-400" />
              <p className="text-base font-medium leading-4 px-2.5 text-gray-500">
                OR
              </p>
              <hr className="w-full bg-gray-400" />
            </div>
            <div className="w-full h-340 md:h-42 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
              <form onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="name"
                    className="text-sm font-medium leading-none text-white"
                  >
                    {" "}
                    Name{" "}
                  </label>
                  <input
                    id="name"
                    aria-labelledby="email"
                    type="text"
                    onChange={handleInputChange}
                    name="name"
                    value={name}
                    className="bg-gray-200 border rounded text-md font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2 outline-none"
                    placeholder="Put your email address here."
                  />
                </div>
                <div className="mt-6 w-full">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium leading-none text-white"
                  >
                    {" "}
                    Email{" "}
                  </label>
                  <input
                    id="email"
                    aria-labelledby="email"
                    type="email"
                    onChange={handleInputChange}
                    name="email"
                    value={email}
                    className="bg-gray-200 border rounded text-md font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2 outline-none"
                    placeholder="Put your email address here."
                  />
                </div>
                <div className="mt-6 w-full">
                  <label
                    htmlFor="phone_number"
                    className="text-sm font-medium leading-none text-white"
                  >
                    {" "}
                    Phone Number{" "}
                  </label>
                  <input
                    id="phone_number"
                    aria-labelledby="email"
                    type="number"
                    onChange={handleInputChange}
                    name="phone_number"
                    value={phone_number}
                    className="bg-gray-200 border rounded text-md font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2 outline-none"
                    placeholder="Put your email address here."
                  />
                </div>
                <div className="mt-6 w-full">
                  <label
                    htmlFor="myInput"
                    className="text-sm font-medium leading-none text-white"
                  >
                    {" "}
                    Password{" "}
                  </label>
                  <div className="relative flex items-center justify-center">
                    <input
                      id="password1"
                      type={type}
                      onChange={handleInputChange}
                      name="password1"
                      value={password1}
                      className="bg-gray-200 border rounded text-md font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2 outline-none"
                      placeholder="Put your password here."
                    />
                    <div
                      onClick={handleToggle}
                      className="absolute right-0 mt-2 mr-3 cursor-pointer"
                    >
                      <label className="text-gray-500 text-2xl">{icon}</label>
                    </div>
                  </div>
                </div>
                <div className="mt-6 w-full">
                  <label
                    htmlFor="myInput"
                    className="text-sm font-medium leading-none text-white"
                  >
                    {" "}
                    Confirm Password{" "}
                  </label>
                  <div className="relative flex items-center justify-center">
                    <input
                      id="password2"
                      type={type2}
                      onChange={handleInputChange}
                      name="password2"
                      value={password2}
                      className="bg-gray-200 border rounded text-md font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2 outline-none"
                      placeholder="Put your password again."
                    />
                    <div
                      onClick={handleToggle2}
                      className="absolute right-0 mt-2 mr-3 cursor-pointer"
                    >
                      <label className="text-gray-500 text-2xl">{icon2}</label>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <button
                    type="submit"
                    className="focus:ring-2 focus:ring-offset-2 focus:ring-teal-700 text-sm font-semibold leading-none text-white focus:outline-none bg-teal-700 border-none rounded hover:bg-teal-600 py-4 w-full"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default SwipeRegister;

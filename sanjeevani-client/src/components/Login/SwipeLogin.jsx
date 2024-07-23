// import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { FcGoogle, FcTabletAndroid } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { toast } from "react-toastify";
import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";
// import { app } from "../../firebase.config";
import Constant from "../../services/Constant";
import UserService from "../../services/UserService";
import { useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

const SwipeLogin = () => {
  // const firebaseAuth = getAuth(app);

  const navigate = useNavigate();

  // const provider = new GoogleAuthProvider();

  const user_role_info = {
    admin: 1,
    supervisor: 2,
    deliveryboy: 3,
    store: 4,
    doctor: 5,
    users: 6,
  };

  const [{ loginShow, registerShow, user, isActive }, dispatch] =
    useStateValue();

  const [state, setState] = useState(initialState);

  const [data, setData] = useState([]);

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(AiFillEyeInvisible);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(AiFillEye);
      setType("text");
    } else {
      setIcon(AiFillEyeInvisible);
      setType("password");
    }
  };

  const { email, password } = state;

  const [isMenu, setIsMenu] = useState(false);

  const ShowLogin = () => {
    dispatch({
      type: actionType.SET_LOGIN_SHOW,
      loginShow: !loginShow,
    });
  };

  const RegisterLogin = () => {
    dispatch({
      type: actionType.SET_REGISTER_SHOW,
      registerShow: !registerShow,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //alert(4)
    if (!email || !password) {
      toast.error("Please Provide Value");
    } else {
      const payload = {
        email: email,
        password: password,
      };
      const response = await UserService.login(payload);
      dispatch({
        type: actionType.SET_USER,
        user: response.data.data,
      });
      console.log("after login ", response.data);
      if (response.data.status) {
        dispatch({
          type: actionType.SET_ISACTIVE,
          isActive: true,
        })
        if (response.data.data.role === 3) {
          toast.success(response.data.msg);
          Constant.setToken(response.data.token);
          Constant.setUserId(response.data.data.id);
          Constant.setUserRole(response.data.data.role);
          // Constant.setUserImg(response.data.data.user_details[0].image_profile)
          ShowLogin();
          navigate("/auth/doctor");
        } else if (response.data.data.role === 4) {
          toast.success(response.data.msg);
          Constant.setToken(response.data.token);
          Constant.setUserId(response.data.data.id);
          Constant.setUserRole(response.data.data.role);
          // Constant.setUserImg(response.data.data.user_details[0].image_profile)
          ShowLogin();
          navigate("/auth/deliveryboy");
        } else if (response.data.data.role === 5) {
          toast.success(response.data.msg);
          Constant.setToken(response.data.token);
          Constant.setUserId(response.data.data.id);
          Constant.setUserRole(response.data.data.role);
          // Constant.setUserImg(response.data.data.user_details[0].image_profile)
          ShowLogin();
          navigate("/auth/storemanager");
        } else if (response.data.data.role === 6) {
          toast.success(response.data.msg);
          Constant.setToken(response.data.token);
          Constant.setUserId(response.data.data.id);
          Constant.setUserRole(response.data.data.role);
          // Constant.setUserImg(response.data.data.user_details[0].image_profile)
          ShowLogin();
          navigate("/");
        } else {
          toast.error("You are not suppose to loggedin");
        }
        state.email = "";
        state.password = "";
      } else toast.error(response.data.msg);
    }
  };

  // const loadData = async () => {
  //   const response = await UserService.getAllUser();
  //   console.log(response.data);
  //   setData(response.data.data);
  // };

  // useEffect(() => {
  //   loadData();
  // }, []);

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
          <motion.div whileTap={{ scale: 0.75 }} onClick={ShowLogin}>
            {/* @ts-ignore */}
            <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
          </motion.div>
          <p className="text-textColor text-lg font-semibold">Login</p>

          <motion.button
            whileTap={{ scale: 0.75 }}
            className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md  cursor-pointer text-textColor text-base"
            onClick={RegisterLogin}
          >
            Register
          </motion.button>
        </div>
        <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
          {/* login */}
          <div className="w-full h-screen md:h-42 px-6 py-4 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            <button
              aria-label="Continue with google"
              role="button"
              className="focus:outline-none bg-white focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 p-3 border rounded-lg border-gray-700 flex items-center w-full mt-10 hover:bg-gray-100"
              // onClick={login}
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
                    htmlFor="myInput"
                    className="text-sm font-medium leading-none text-white"
                  >
                    {" "}
                    Password{" "}
                  </label>
                  <div className="relative flex items-center justify-center">
                    <input
                      id="myInput"
                      type={type}
                      onChange={handleInputChange}
                      name="password"
                      value={password}
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
                <div className="mt-8">
                  <button
                    type="submit"
                    className="focus:ring-2 border-none focus:ring-offset-2 focus:ring-teal-700 text-sm font-semibold leading-none text-white focus:outline-none bg-teal-700 border rounded hover:bg-teal-600 py-4 w-full"
                  >
                    Login
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

export default SwipeLogin;

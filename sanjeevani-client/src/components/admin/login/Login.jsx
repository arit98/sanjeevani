//Admin Login --
import React, { useState } from "react";
import { toast } from "react-toastify";
import Constant from "../../../services/Constant";
import UserService from "../../../services/UserService";
import { useNavigate } from "react-router-dom";
import Avatar from "../../../img/avatar.png";
import { actionType } from "../../../context/reducer";
import { useStateValue } from "../../../context/StateProvider";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const initialState = {
  email: "",
  password: "",
};

export default function Login() {
  const [state, setState] = useState(initialState);
  const [{ user }, dispatch] = useStateValue();
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(AiFillEyeInvisible);

  const { email, password } = state;

  const navigate = useNavigate();

  const handleToggle = () => {
    if (type === "password") {
      setIcon(AiFillEye);
      setType("text");
    } else {
      setIcon(AiFillEyeInvisible);
      setType("password");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please Provide Value");
    } else {
      const payload = {
        email: email,
        password: password,
      };
      const response = await UserService.login(payload);
      if (response.data.status) {
        dispatch({
          type: actionType.SET_USER,
          user: { user_id: response.data.data.id, token: response.data.token, role:response.data.data.role },
        });
        console.log("abc", JSON.stringify(user));
        if (response.data.data.role === 1 || response.data.data.role === 2) {
          toast.success(response.data.msg);
          Constant.setToken(response.data.token);
          var temp={
            id:response.data.data.id,
            role:response.data.data.role
          }
          Constant.setUserInfo(JSON.stringify(temp))
          navigate("/admin/stufftable");
        } else {
          navigate("/admin/login");
          toast.error("You're not suppose to login");
        }
        state.email = "";
        state.password = "";
      } else toast.error(response.data.msg);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <>
      <div className="mx-auto px-4 h-screen">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="bg-card backdrop-blur-lg relative flex flex-col min-w-0 break-words w-full mb-6 shadow-xl rounded-lg bg-blueGray-200 border-0">
              <span className="text-center font-bold text-teal-600 mb-10 text-2xl mt-4">
                ADMIN PORTAL
              </span>
              <div className="h-24 w-24 mx-auto rounded-lg">
                <img className="rounded-full" src={Avatar} />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={handleSubmit}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      name="email"
                      value={email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type={type}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={handleInputChange}
                    />
                    <div
                      onClick={handleToggle}
                      className="absolute right-0 -mt-8 mr-3 cursor-pointer"
                    >
                      <label className="text-gray-500 text-2xl">{icon}</label>
                    </div>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-teal-600 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

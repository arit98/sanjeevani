import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import UserService from "../../../services/UserService";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import RoleServices from "../../../services/RoleServices";

const initialState = {
  email: "",
  password1: "",
  password2: "",
  role: "",
  name: "",
  phone_number: "",
};

export default function Register() {
  const [state, setState] = useState(initialState);

  // const header = {}

  const { email, password1, password2, role, name, phone_number } = state;

  const [data, setData] = useState([]);

  const getData = async () => {
    const response = await RoleServices.getAll();
    console.log(response.data.data);
    var item = response.data.data[0];
    // console.log(item.user_details[0]);
    setState({
      id: item.id,
      image_profile: item.user_details[0].image_profile,
      user_id: item.user_details[0].user_id,
      // aadhar_card_image: item.user_details[0].aadhar_card_image,
      aadhar_card_no: item.user_details[0].aadhar_card_no,
      name: item.user_details[0].name,
      phone_number: item.user_details[0].phone_number,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password1 || !password2 || !role || !name || !phone_number) {
      toast.error("Please Provide Value");
    } else {
      const payload = {
        name: name,
        phone_number: phone_number,
        email: email,
        role: role,
        password1: password1,
        password2: password2,
      };
      const response = await UserService.register(payload);
      console.log(response.data);
      if (response.data.status) {
        state.email = "";
        state.password1 = "";
        state.password2 = "";
        state.name = "";
        state.role = "";
        state.phone_number = "";
        toast.success(response.data.msg);
        // setTimeout(() => navigate("/"), 500);
      } else toast.error(response.data.msg);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign up with
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  <button
                    className="bg-[#4082ed] active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center z text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <FaGithub className="text-3xl pr-2" />
                    <span className="text-white">Github</span>
                  </button>
                  <button
                    className="bg-[#4082ed] active:bg-blueGray-50 text-blueGray-700 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <FcGoogle className="text-3xl pr-2" />
                    <span className="text-white">Google</span>
                  </button>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Or sign up with credentials</small>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Name"
                      name="name"
                      value={name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Phone Nuber
                    </label>
                    <input
                      type="number"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Name"
                      name="phone_number"
                      value={phone_number}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      name="email"
                      value={email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <select
                      onChange={handleInputChange}
                      className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                      name="role"
                      value={role}
                    >
                      <option value="other" className="bg-primary">
                        Role
                      </option>
                      <option>hgfkuyfuuf</option>
                    </select>
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      name="password1"
                      value={password1}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      name="password2"
                      value={password2}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        I agree with the{" "}
                        <a
                          href="#pablo"
                          className="text-lightBlue-500"
                          onClick={(e) => e.preventDefault()}
                        >
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-teal-600 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Create Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2 text-right">
                <Link to="/auth/login" className="text-blueGray-200">
                  <small>Login to admin</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useEffect, useState } from "react";
import { useStateValue } from "../../../context/StateProvider";
import UserService from "../../../services/UserService";
import { actionType } from "../../../context/reducer";
import Avatar from "../../../img/avatar.png";
import { BsFillCameraFill } from "react-icons/bs";
import Constant from "../../../services/Constant";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { TiTick } from "react-icons/ti";

const initialState = {
  user_id: "",
  AvatarImage: "",
};

export default function Profile() {
  const [data, setData] = useState({});
  const [selectedImage, setSelectedImage] = useState();
  const [state, setState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const [{ user, AvatarImage }, dispatch] = useStateValue();

  const [mydata, SetMyData] = useState(user);

  const [avater, setAvater] = useState({});

  const [showModal, setShowModal] = useState(true);

  const ImageHAndler = (e) => {
    const value = e.target.files[0];
    const name = e.target.name;

    //setimageUpload(select);
    const Allow = ["image/png", "image/jpg", "image/jpeg"];
    if (value && Allow.includes(value.type)) {
      if (name == "AvatarImage") {
        setAvater(value);
        // console.log(value)
      }
    } else {
      toast.error(
        "file type not support, file will be jpg,jpeg or png format "
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var from = new FormData();
    from.append("AvatarImage", avater);
    from.append("user_id", mydata.user_id);
    console.log("submit", mydata.user_id);
    const response = await UserService.updateUserDetails(from);
    console.log(response.data);
    if (response.data.status) {
      toast.success(response.data.msg);
    } else toast.error(response.data.msg);
  };

  const loadData = async () => {
    const response = await UserService.getOne(user.user_id);
    console.log("load", user);
    dispatch({
      type: actionType.SET_AvatarImage,
      AvatarImage: response.data.data[0].imageUrl,
    });

    const item = response.data.data[0];
    console.log(item);
    setData({
      id: item.id,
      user_id: item.user_details[0].user_id,
      aadhar_card_no: item.user_details[0].aadhar_card_no,
      name: item.user_details[0].name,
      phone_number: item.user_details[0].phone_number,
      email: item.email,
    });
  };

  const uploadImage = (e) => {
    // console.log(e.target.files)
    setSelectedImage(e.target.files[0]);
    console.log(avater);
  };

  const deleteImage = () => {
    setAdharImg();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  useEffect(() => {
    loadData();
    console.log("Efeect", mydata);
  }, []);

  return (
    <>
      <main className="profile-page">
        <section className="relative block" style={{ height: "500px" }}>
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://thumbs.dreamstime.com/b/doctor-man-stethoscope-hospital-84232406.jpg')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
            style={{ height: "70px" }}
          ></div>
        </section>
        <section className="relative py-16 bg-gray-300">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full px-4 lg:order-2 flex justify-center -top-20 absolute">
                    <>
                      <div className="flex flex-col items-center border-4 border-[#0097a5] rounded-full">
                        <img
                          src={AvatarImage ? AvatarImage : Avatar}
                          className="rounded-full lg:w-32 lg:h-32 w-16 h-16"
                          alt="..."
                        />
                        <label
                          htmlFor="imgLbl"
                          className="absolute top-8 ml-20"
                        >
                          <div onClick={()=>setShowModal(!showModal)} className="h-8 w-8 rounded-full bg-card flex justify-center items-center absolute -bottom-20 cursor-pointer">
                            <BsFillCameraFill className="text-xl text-cartItem" />
                          </div>
                        </label>
                        {showModal ? (
                          <>
                            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                  {/*header*/}
                                  <div className="flex items-start justify-between">
                                    <button
                                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                      onClick={() => setShowModal(false)}
                                    >
                                    </button>
                                  </div>
                                  {/*body*/}
                                  <div className="relative p-6 flex-auto">
                                    <div className="relative p-4 md:p-8">
                                      <div className="flex items-center justify-start w-450 h-375 mb-8 border border-dashed border-indigo-700 rounded-lg p-3">
                                        <div className="flex text-sm text-gray-600">
                                          <label
                                            for="file-upload"
                                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                          >
                                            <span>Upload a Profile Picture</span>
                                            <input
                                              id="file-upload"
                                              name="file-upload"
                                              type="file"
                                              className="sr-only"
                                            />
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {/*footer*/}
                                  <div className="flex items-center justify-center border-t border-solid border-slate-200 rounded-b">
                                    <div className="flex items-center justify-end p-6 rounded-b">
                                      <button
                                        className="text-green-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                      >
                                        Submit
                                      </button>
                                    </div>
                                    <div className="flex items-center justify-end p-6">
                                      <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                      >
                                        Close
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                          </>
                        ) : console.log("no call")}
                      </div>
                      <div className="h-4 w-4 bg-[#0097a5] flex items-center justify-center rounded-full absolute top-32">
                        <button onClick={handleSubmit}>
                          <TiTick />
                        </button>
                      </div>
                    </>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 md:mt-32">{/*  */}</div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          22
                        </span>
                        <span className="text-sm text-gray-500">
                          Total Chamber
                        </span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          10
                        </span>
                        <span className="text-sm text-gray-500">Booking</span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          89
                        </span>
                        <span className="text-sm text-gray-500">
                          Last Status
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal text-gray-800 mb-2">
                    {data.name}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
                    {data.phone_number}
                  </div>
                  <div className="mb-2 text-gray-700 mt-10">
                    <i className="fas fa-briefcase mr-2 text-lg text-gray-500"></i>
                    {data.email}
                  </div>
                  <div className="mb-2 text-gray-700">
                    <i className="fas fa-university mr-2 text-lg text-gray-500"></i>
                    University of Computer Science
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-gray-300 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-gray-800">
                        An artist of considerable range, Jenna the name taken by
                        Melbourne-raised, Brooklyn-based Nick Murphy writes,
                        performs and records all of his own music, giving it a
                        warm, intimate feel with a solid groove structure. An
                        artist of considerable range.
                      </p>
                      <a
                        href="#pablo"
                        className="font-normal text-pink-500"
                        onClick={(e) => e.preventDefault()}
                      >
                        Show more
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

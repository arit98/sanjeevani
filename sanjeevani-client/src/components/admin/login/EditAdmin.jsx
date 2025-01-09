import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserService from "../../../services/UserService";
import UserDetails from "./UserDetails";
// @ts-ignore
import Avatar from "../../../img/avatar.png";
import { useParams } from "react-router-dom";
import FormData from "form-data";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import Spinner from "../../Spinner";

const initialState = {
  user_id: "",
  image_profile: "",
  name: "",
  phone_number: "",
  aadhar_card_image: "",
  aadhar_card_no: "",
};

const EditAdmin = () => {
  const [state, setState] = useState(initialState);
  const [selectedImage, setSelectedImage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const {
    image_profile,
    name,
    phone_number,
    aadhar_card_image,
    aadhar_card_no,
  } = state;

  let { id } = useParams();
  
  const getData = async () => {
    const response = await UserService.getOne(id);
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

  const [avater, setAvater] = useState({});
  const [adharImg, setAdharImg] = useState({});

  const ImageHAndler = (e) => {
    const value = e.target.files[0];
    const name = e.target.name;

    //setimageUpload(select);
    const Allow = ["image/png", "image/jpg", "image/jpeg"];
    if (value && Allow.includes(value.type)) {
      if (name == "image_profile") {
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

    // console.log(avater)
    var from = new FormData();
    from.append("image_profile", avater);
    from.append("name", name);
    from.append("phone_number", phone_number);
    from.append("aadhar_card_image", adharImg);
    from.append("aadhar_card_no", aadhar_card_no);
    from.append("user_id", id);

    // const navigate = new Navigate();
    const response = await UserService.updateUserDetails(from);
    // console.log(response.data);
    if (response.data.status) {
      toast.success(response.data.msg);
      getData();
      // setTimeout(() => navigate("/"), 500);
    } else toast.error(response.data.msg);
  };

  const uploadImage = (e) => {
    // console.log(e.target.files)
    setAdharImg(e.target.files[0]);
    console.log(adharImg);
  };

  const deleteImage = () => {
    setAdharImg();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-[90%] mx-auto mt-8 bg-slate-300">
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1 p-8">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Profile
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2 justify-center">
            <form onSubmit={handleSubmit}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        {" "}
                        Photo{" "}
                      </label>
                    </div>

                    <div className="mt-1 flex flex-col gap-6 items-center">
                      <img
                        src={image_profile ? image_profile : Avatar}
                        className="rounded-full lg:w-32 lg:h-32 w-16 h-16"
                        alt="..."
                      />
                      <label className="ml-5 inline-block p-[6px, 12px] bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
                        <span>Capture or Choose Image</span>
                        <input
                          type="file"
                          className="sr-only"
                          accept=".jpg,.jpeg,.png"
                          name="image_profile"
                          onChange={ImageHAndler}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      for="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      id="first-name"
                      autocomplete="given-name"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <label
                      for="email-address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>
                    <input
                      type="number"
                      name="phone_number"
                      value={phone_number}
                      id="email-address"
                      autocomplete="email"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      for="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Aadhaar Card No
                    </label>
                    <input
                      type="number"
                      // min="12" 
                      // max="12"
                      name="aadhar_card_no"
                      value={aadhar_card_no}
                      id="first-name"
                      autocomplete="given-name"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-4">
                    <label className="text-sm font-medium text-gray-700">
                      {" "}
                      Adhaar Card Picture{" "}
                    </label>
                    {/* test */}
                    <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-340 cursor-pointer rounded-lg">
                      {isLoading ? (
                        <Spinner />
                      ) : (
                        <>
                          <label className="flex justify-center items-center gap-3">
                            {/* @ts-ignore */}
                            <MdCloudUpload className="text-4xl text-blue-400" />
                            <span className="text-blue-400 cursor-pointer">
                              Upload Image 
                            </span>
                            <input
                              accept="image/*"
                              type="file"
                              name="aadhar_card_image"
                              value={aadhar_card_image}
                              onChange={uploadImage}
                              className="sr-only"
                            />
                          </label>
                          <div className="flex flex-col justify-center items-center -mt-12">
                            {selectedImage && (
                              <div style={styles.preview}>
                                <img
                                  src={URL.createObjectURL(adharImg)}
                                  style={styles.image}
                                  className="cursor-text"
                                  alt="Aadhar Image"
                                  name="aadhar_card_image"
                                  value={aadhar_card_image}
                                />
                                <button
                                  onClick={deleteImage}
                                  style={styles.delete}
                                >
                                  {/* @ts-ignore */}
                                  <MdDelete className="text-3xl" />
                                </button>
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200"></div>
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1 p-8">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Personal Information
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Use a permanent address where you can receive mail.
              </p>
            </div>
          </div>
          <UserDetails />
        </div>
      </div>
    </div>
  );
};

export default EditAdmin;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  preview: {
    display: "flex",
    flexDirection: "column",
  },
  image: { maxWidth: "100%", maxHeight: 320 },
  delete: {
    cursor: "pointer",
    padding: 15,
    background: "red",
    borderRadius: "50%",
    color: "white",
    border: "none",
    width: 50,
    height: 50,
    justifyContent: "center",
    display: "flex",
    marginLeft: "auto",
    marginTop: -60,
  },
};
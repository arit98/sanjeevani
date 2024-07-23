import React, { useEffect, useState } from "react";
import Spinner from "../../../Spinner";
import { motion } from "framer-motion";
import {
  MdOutlineMedication,
  MdCloudUpload,
  MdDelete,
  MdMedicalServices,
  MdAttachMoney,
  MdUpload,
  MdOutlineMedicalServices,
} from "react-icons/md";
import { useStateValue } from "../../../../context/StateProvider";
import { useParams } from "react-router-dom";
import MedicalServices from "../../../../services/MedicineServices";
import CategoryService from "../../../../services/CategoryService";
import CompanyService from "../../../../services/CompanyService";
import { toast } from "react-toastify";
import FormData from "form-data";

const initialState = {
  name: "",
  company_id: "",
  category_id: "",
  descrition: "",
  short_desc: "",
  long_desc: "",
  status: "",
  medicine_images: "",
  page_price: "",
  box_price: "",
  igst: "",
};

const CreateContainer = () => {
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [{ foodItems }, dispatch] = useStateValue();

  const [state, setState] = useState(initialState);

  const {
    name,
    company_id,
    category_id,
    short_desc,
    long_desc,
    status,
    medicine_images,
    page_price,
    box_price,
    igst,
  } = state;

  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  let { id } = useParams();

  const [selectedImage, setSelectedImage] = useState();

  
  const uploadImage = (e) => {
    // console.log(e.target.files)
      setSelectedImage(e.target.files[0]);
      console.log(selectedImage)
  };

  const deleteImage = () => {
    setSelectedImage();
  };

  const loadData = async () => {
    const response = await CategoryService.getAll();
    const response1 = await CompanyService.getAll();
    const response2 = await MedicalServices.createMed();
    console.log(response2);
    setData(response.data.data);
    setData1(response1.data.data);
    setState(response2.data.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !company_id || !category_id || !page_price || !company_id || !box_price || !status) {
      toast.error("Please Provide Value");
    } else {
      var form = new FormData()

      form.append("name",name)
      form.append("company_id",company_id)
      form.append("category_id",category_id)
      form.append("short_desc",short_desc)
      form.append("long_desc",long_desc)
      form.append("status",status)
      form.append("medicine_images",selectedImage)
      form.append("page_price",page_price)
      form.append("box_price",box_price)

      const response = await MedicalServices.createMed(form);

      if (response.data.status) {
        state.name = "";
        state.company_id = "";
        state.category_id = "";
        state.short_desc = "";
        state.long_desc = "";
        state.status = "";
        state.medicine_images = "";
        state.page_price = "";
        state.box_price = "";
        toast.success(response.data.msg);
      } else {
        toast.error(response.data.msg);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
    console.log(state)
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-[90%] md:w-[50%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`w-full p-2 rounded-lg text-center text-lg font-semibold`}
        ></motion.p>

        <form onSubmit={handleSubmit}>
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdOutlineMedication className="text-6xl text-gray-700" />
            <input
              type="text"
              required
              name="name"
              value={name}
              placeholder="Give me a title..."
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full py-2">
            <select
              onChange={handleInputChange}
              name="company_id"
              value={state.company_id}
              className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
            >
              <option value="other" className="bg-primary">
                Select Brand
              </option>
              {data1 &&
                data1.map((item) => (
                  <option
                    key={item.id}
                    className="text-base border-0 outline-none capitalize bg-primary text-headingColor"
                    value={item.id}
                  >
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-full py-2">
            <select
              onChange={handleInputChange}
              className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
              name="category_id"
              value={state.category_id}
            >
              <option value="other" className="bg-primary">
                Select Category
              </option>
              {data &&
                data.map((item) => (
                  <option
                    key={item.id}
                    className="text-base border-0 outline-none capitalize bg-primary text-headingColor"
                    value={item.id}
                  >
                    {item.category_name}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-full flex flex-col md:flex-row items-center gap-2">
            <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
              <MdMedicalServices className="text-gray-700 text-2xl" />
              <input
                type="text"
                name="short_desc"
                value={short_desc}
                placeholder="Give me a short description..."
                className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
              <MdMedicalServices className="text-gray-700 text-2xl" />
              <input
                type="text"
                name="long_desc"
                value={long_desc}
                placeholder="Give me a long description..."
                onChange={handleInputChange}
                className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
              />
            </div>
          </div>
          <div className="w-full py-2">
            <select
              onChange={handleInputChange}
              className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
              name="status"
              value={state.status}
            >
              <option value="other" className="bg-primary">
                Select Status
              </option>
                  <option
                    key={id}
                    className="text-base border-0 outline-none capitalize bg-primary text-headingColor"
                    value="active"
                  >
                    Active
                  </option>
                  <option
                    key={id}
                    className="text-base border-0 outline-none capitalize bg-primary text-headingColor"
                    value="inactive"
                  >
                    Inactive
                  </option>
            </select>
          </div>
          <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-340 cursor-pointer rounded-lg">
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                <label className="flex justify-center items-center gap-3">
                  <MdCloudUpload className="text-4xl text-blue-400" />
                  <span className="text-blue-400 cursor-pointer">
                    Upload Image
                  </span>
                  <input
                    accept="image/*"
                    type="file"
                    name="medicine_images"
                    value={medicine_images}
                    onChange={uploadImage}
                    className="sr-only"
                  />
                </label>
                <div className="flex flex-col justify-center items-center -mt-12" >
                  {selectedImage && (
                    <div style={styles.preview}>
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        style={styles.image}
                        className="cursor-text"
                        alt="Thumb"
                        name="medicine_images"
                        value={medicine_images}
                      />
                      <button onClick={deleteImage} style={styles.delete}>
                        <MdDelete className="text-3xl" />
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="w-full flex flex-col md:flex-row items-center gap-3">
            <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
              <p className="text-gray-700 text-2xl">₹</p>
              <input
                type="number"
                name="box_price"
                value={box_price}
                placeholder="Box price"
                onChange={handleInputChange}
                className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
              />
            </div>
            <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
              <p className="text-gray-700 text-2xl">₹</p>
              <input
                type="number"
                required
                name="page_price"
                value={page_price}
                onChange={handleInputChange}
                placeholder="Page Price"
                className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
              />
            </div>
          </div>
          <div className="flex items-center w-full py-2">
            <input
              type="submit"
              value="save"
              className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-[#18978F] px-12 py-2 rounded-lg text-lg text-primary font-semibold"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateContainer;

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

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AddressService from "../../../services/AddressService";
import StatesService from "../../../services/StatesService";

const initialState = {
  state_id: "",
  pincode: "",
  landmark: "",
  address: "",
  city_name: "",
  user_id: "",
};

const UserAdress = () => {
  const [state, setState] = useState(initialState);

  const { state_id, pincode, landmark, address, city_name } = state;
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  let { id } = useParams();

  const getData = async () => {
    const response = await AddressService.getOne(id);
    const response2 = await StatesService.getAll();
    setData2(response2.data.data);
    var item = response.data.data[0];
    setState({
      id: item.id,
      state_id: item.state_id,
      pincode: item.pincode,
      landmark: item.landmark,
      address: item.address,
      city_name: item.city_name,
      user_id: item.user_id,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      state_id: state_id,
      pincode: pincode,
      landmark: landmark,
      address: address,
      city_name: city_name,
      user_id: id,
    };
    const response = await AddressService.update(payload);
    console.log(response);
    if (response.data.status) {
      toast.success(response.data.msg);
      // setTimeout(() => navigate("/"), 500);
    } else toast.error(response.data.msg);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="mt-5 md:mt-0 md:col-span-2">
      <form onSubmit={handleSubmit}>
        <div className="shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              {/* test */}
              <div className="col-span-6 sm:col-span-4">
                <select
                  onChange={handleInputChange}
                  className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                  name="state_id"
                  value={state_id}
                >
                  <option value="other" className="bg-primary">
                    State / Province
                  </option>
                  {data2 &&
                    data2.map((item) => (
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

              <div className="col-span-6 sm:col-span-4">
                <label
                  for="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <input
                  type="text"
                  name="city_name"
                  value={city_name}
                  id="city"
                  autocomplete="address-level2"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-span-6 sm:col-span-4">
                <label
                  for="postal-code"
                  className="block text-sm font-medium text-gray-700"
                >
                  ZIP / Postal code
                </label>
                <input
                  type="number"
                  name="pincode"
                  value={pincode}
                  id="postal-code"
                  autocomplete="postal-code"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-span-6">
                <label
                  for="postal-code"
                  className="block text-sm font-medium text-gray-700"
                >
                  Landmark
                </label>
                <input
                  type="text"
                  name="landmark"
                  value={landmark}
                  id="postal-code"
                  autocomplete="postal-code"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-span-6 sm:col-span-4">
                <label
                  for="about"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  User Address{" "}
                </label>
                <div className="mt-1">
                  <textarea
                    id="about"
                    name="address"
                    value={address}
                    rows="3"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                    placeholder="Enter Address"
                    onChange={handleInputChange}
                  ></textarea>
                </div>
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
  );
};

export default UserAdress;

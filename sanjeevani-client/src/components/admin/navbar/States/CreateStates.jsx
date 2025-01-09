import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import SatesService from "../../../../services/StatesService";

const initialState = {
    name: "",
};

const CreateStates = () => {
  const [state, setState] = useState(initialState);

  const { name } = state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Please Provide Value");
    } else {
      const payload = {
        name: name,
      };
      const response = await SatesService.create(payload);
      if (response.data.status) {
        state.name = "";
        toast.success(response.data.msg);
      } else {
        toast.error(response.data.msg);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div style={{ marginTop: "150px" }}>
      <form
      className="mx-auto p-[50px] max-w-[400px] justify-center w-[30%] bg-[#212529] flex flex-col"
        onSubmit={handleSubmit}
      >
        <label htmlFor="contact" className="text-white pb-2">State Name</label>
        <input
          type="text"
          name="name"
          id="contact"
          placeholder="State Name"
          value={name}
          className="outline-none mb-6 pl-2 h-10 rounded-lg bg-[#1d1f21] text-white"
          onChange={handleInputChange}
        />
        <div className="flex flex-col gap-5">
        <input
          type="submit"
          value="Save"
          className="h-8 w-full bg-green-500 cursor-pointer"
        />
        <Link to="/admin/states">
          <input
            type="button"
            value="Go Back"
            className="h-8 w-full bg-orange-500 cursor-pointer"
          />
        </Link>
        </div>
      </form>
    </div>
  );
};

export default CreateStates;

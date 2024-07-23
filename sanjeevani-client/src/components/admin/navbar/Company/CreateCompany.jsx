import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CompanyService from "../../../../services/CompanyService";

const initialState = {
    company_regno: "",
    name: "",
};

const CreateCompany = () => {
  const [state, setState] = useState(initialState);

  const { company_regno, name } = state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!company_regno || !name) {
      toast.error("Please Provide Value");
    } else {
      const payload = {
        company_regno: company_regno,
        name: name,
      };
      const response = await CompanyService.register(payload);
      if (response.data.status) {
        state.company_regno = "";
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
        <label htmlFor="name" className="text-white pb-2">Company Regno</label>
        <input
          type="number"
          id="name"
          name="company_regno"
          placeholder="Company Regno"
          value={company_regno}
          className="outline-none mb-6 pl-2 h-10 rounded-lg bg-[#1d1f21] text-white"
          onChange={handleInputChange}
        />
        <label htmlFor="contact" className="text-white pb-2">Company Name</label>
        <input
          type="text"
          name="name"
          id="contact"
          placeholder="Company Name"
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
        <Link to="/auth/company">
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

export default CreateCompany;

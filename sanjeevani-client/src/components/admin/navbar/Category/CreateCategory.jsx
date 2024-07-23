import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CategoryService from "../../../../services/CategoryService";

const initialState = {
  category_name: "",
  top_category: "",
};

const CreateCategory = () => {
  const [state, setState] = useState(initialState);

  const { category_name, top_category } = state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category_name || !top_category) {
      toast.error("Please Provide Value");
    } else {
      const payload = {
        category_name: category_name,
        top_category: top_category,
        parent_id: 0,
      };
      const response = await CategoryService.register(payload);
      if (response.data.status) {
        state.category_name = "";
        state.top_category = "";
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
        <label htmlFor="name" className="text-white pb-2">
          Category Name
        </label>
        <input
          type="text"
          id="name"
          name="category_name"
          placeholder="Category Name"
          value={category_name}
          className="outline-none mb-6 pl-2 h-10 rounded-lg bg-[#1d1f21] text-white"
          onChange={handleInputChange}
        />
        <label htmlFor="contact" className="text-white pb-2">
          Top Category
        </label>
        <select
          name="top_category"
          value={top_category}
          className="outline-none mb-6 pl-2 h-10 rounded-lg bg-[#1d1f21] text-white"
          onChange={handleInputChange}
        >
          <option>Select Top Category</option>
          <option>True</option>
          <option>False</option>
        </select>
        <input
          type="text"
          name="top_category"
          id="contact"
          placeholder="Top Category"
          value={top_category}
          className="outline-none mb-6 pl-2 h-10 rounded-lg bg-[#1d1f21] text-white"
          onChange={handleInputChange}
        />
        <div className="flex flex-col gap-5">
          <input
            type="submit"
            value="Save"
            className="h-8 w-full bg-green-500 cursor-pointer"
          />
          <Link to="/auth/category">
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

export default CreateCategory;

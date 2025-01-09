import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CategoryService from "../../../../services/CategoryService";

const EditCategory = () => {
  const [state, setState] = useState({});

  const { category_name, parent_id, top_category } = state;
  
  let {id} = useParams()

  const getData = async () => {
    const response = await CategoryService.getOne(id);
    var item = response.data.data[0]
    setState({id:item.id,category_name:item.category_name,parent_id:item.parent_id,top_category:item.top_category});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // alert(0)
    if (!category_name) {
      toast.error("Please Provide Value");
    } else {
      const payload = {
        id: id,
        category_name: category_name,
        top_category: top_category,
        parent_id: parent_id,
      };
      const response = await CategoryService.update(payload);
      // console.log(response.data)
      if (response.data.status) {
      //   state.id = id;
      //   state.category_name = category_name;
      //   state.parent_id = parent_id;
      //   state.top_category = top_category;
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

  useEffect(() => {
    getData();
  }, []);
  

  return (
    <div style={{ marginTop: "70px" }}>
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
        <label htmlFor="name" className="text-white pb-2">
          Parent ID
        </label>
        <input
          type="text"
          id="name"
          name="parent_id"
          placeholder="Parent ID"
          value={parent_id}
          className="outline-none mb-6 pl-2 h-10 rounded-lg bg-[#1d1f21] text-white"
          onChange={handleInputChange}
        />
        <label htmlFor="contact" className="text-white pb-2">
          Top Category
        </label>
        {/* <select
          name="top_category"
          value={top_category}
          className="outline-none mb-6 pl-2 h-10 rounded-lg bg-[#1d1f21] text-white"
          onChange={handleInputChange}
        >
          <option>True</option>
          <option>False</option>
        </select> */}
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
        <Link to="/admin/category">
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

export default EditCategory;

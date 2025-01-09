import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CompanyService from "../../../../services/CompanyService";

const EditCompany = () => {
  const [state, setState] = useState({});

  const { company_regno, name, status } = state;
  
  let {id} = useParams()

  const getData = async () => {
    const response = await CompanyService.getOne(id);
    var item = response.data.data[0]
    setState({id:item.id,company_regno:item.company_regno,name:item.name,status:item.status});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // alert(0)
    if (!company_regno) {
      toast.error("Please Provide Value");
    } else {
      const payload = {
        id: id,
        company_regno: company_regno,
        name: name,
        status: status,
      };
      const response = await CompanyService.update(payload);
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
        Company Regno
        </label>
        <input
          type="text"
          id="name"
          name="company_regno"
          placeholder="Company Regno"
          value={company_regno}
          className="outline-none mb-6 pl-2 h-10 rounded-lg bg-[#1d1f21] text-white"
          onChange={handleInputChange}
        />
        <label htmlFor="name" className="text-white pb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={name}
          className="outline-none mb-6 pl-2 h-10 rounded-lg bg-[#1d1f21] text-white"
          onChange={handleInputChange}
        />
        <label htmlFor="contact" className="text-white pb-2">
          Status
        </label>
        <input
          type="text"
          name="status"
          id="contact"
          placeholder="Status"
          value={status}
          className="outline-none mb-6 pl-2 h-10 rounded-lg bg-[#1d1f21] text-white"
          onChange={handleInputChange}
        />
        <div className="flex flex-col gap-5">
        <input
          type="submit"
          value="Save"
          className="h-8 w-full bg-green-500 cursor-pointer"
        />
        <Link to="/admin/company">
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

export default EditCompany;

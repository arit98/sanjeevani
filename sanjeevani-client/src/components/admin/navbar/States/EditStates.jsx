import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SatesService from "../../../../services/StatesService";

const EditSates = () => {
  const [state, setState] = useState({});

  const {name, status } = state;
  
  let {id} = useParams()

  const getData = async () => {
    const response = await SatesService.getOne(id);
    var item = response.data.data[0]
    setState({id:item.id,name:item.name,status:item.status});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // alert(0)
    if (!name) {
      toast.error("Please Provide Value");
    } else {
      const payload = {
        id: id,
        name: name,
        status: status,
      };
      const response = await SatesService.update(payload);
      // console.log(response.data)
      if (response.data.status) {
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
        <Link to="/admin/state">
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

export default EditSates;

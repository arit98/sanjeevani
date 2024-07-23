import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import GroupsService from "../../../../services/GroupsService";

const EditGroups = () => {
  const [state, setState] = useState({});

  const { groups_name, status } = state;
  
  let {id} = useParams()

  const getData = async () => {
    const response = await GroupsService.getOne(id);
    var item = response.data.data[0]
    setState({id:item.id,groups_name:item.groups_name,status:item.status});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // alert(0)
    if (!groups_name) {
      toast.error("Please Provide Value");
    } else {
      const payload = {
        id: id,
        groups_name: groups_name,
        status: status,
      };
      const response = await GroupsService.update(payload);
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
          Group Name
        </label>
        <input
          type="text"
          id="name"
          name="groups_name"
          placeholder="Group Name"
          value={groups_name}
          className="outline-none mb-6 pl-2 h-10 rounded-lg bg-[#1d1f21] text-white"
          onChange={handleInputChange}
        />
        <label htmlFor="name" className="text-white pb-2">
          Satus
        </label>
        <input
          type="text"
          id="name"
          name="status"
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
        <Link to="/auth/groups">
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

export default EditGroups;

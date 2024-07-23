import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import GroupsService from "../../../../services/GroupsService";

const initialState = {
  groups_name: "",
};

const CreateGroups = () => {
  const [state, setState] = useState(initialState);

  const { groups_name } = state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!groups_name) {
      toast.error("Please Provide Value");
    } else {
      const payload = {
        groups_name: groups_name,
      };
      const response = await GroupsService.register(payload);
      console.log(response.data);
      if (response.data.status) {
        state.groups_name = "";
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
        <label htmlFor="groups_name" className="text-white pb-2">
          Group Name
        </label>
        <input
          type="text"
          id="groups_name"
          name="groups_name"
          placeholder="Group Name"
          value={groups_name}
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

export default CreateGroups;

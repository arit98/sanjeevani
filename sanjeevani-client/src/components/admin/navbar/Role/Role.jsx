import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import RoleServices from "../../../../services/RoleServices";
import { Link, useParams } from "react-router-dom";

const Role = () => {
  const [data, setData] = useState([]);
  let { id } = useParams();
  
  const loadData = async () => {
    const response = await RoleServices.getAll();
    setData(response.data.data);
  };

  const deleteData = async (id) => {
    if (window.confirm("Are you sure to delete the contact ?")) {
      const response = await RoleServices.delete(id);
      console.log(response)
      toast.error("Deleted Sucessfully");
      loadData();
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className="py-10 mr-2 overflow-x-auto">
      <div className="flex items-start -mt-16 mr-20">
        <div className="mx-auto mr-6 container bg-white shadow rounded w-[1450px]">
            <div className="flex flex-col lg:flex-row p-4 lg:p-8 justify-between items-start lg:items-stretch w-full">
              <div className="w-full lg:w-1/3 flex flex-col lg:flex-row items-start lg:items-center">
                <Link to="/admin/role/createData">
                  <div>
                    <button className="h-10 w-32 bg-blue-600 text-white rounded-sm">
                      Add Role
                    </button>
                  </div>
                </Link>
              </div>
              <div className="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end">
                <div className="flex items-center lg:border-l lg:border-r border-gray-300 py-3 lg:py-0 lg:px-6">
                  <p
                    className="text-base text-gray-600"
                    id="page-view"
                  >
                    Viewing 1 - 20 of 60
                  </p>
                  {/* left */}
                  <a
                    className="text-gray-600 ml-2 border-transparent border cursor-pointer rounded"
                    onclick="pageView(false)"
                  ></a>
                  {/* right */}
                  <a
                    className="text-gray-600 border-transparent border rounded focus:outline-none cursor-pointer"
                    onclick="pageView(true)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-chevron-right"
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <polyline points="9 6 15 12 9 18" />
                    </svg>
                  </a>
                </div>
                <div className="flex items-center lg:border-r border-gray-300 pb-3 lg:pb-0 lg:px-6">
                  <div className="relative w-32 z-10">
                    <div className="pointer-events-none text-gray-600 absolute inset-0 m-auto mr-2 xl:-mr-2 z-0 w-5 h-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon cursor-pointer icon-tabler icon-tabler-chevron-down"
                        width={20}
                        height={20}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                    <select
                      aria-label="Selected tab"
                      className="focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray text-base form-select block w-full py-2 px-2 xl:px-3 rounded text-gray-600 appearance-none bg-transparent"
                    >
                      <option>Sort Ascending</option>
                      <option>Sort Descending</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full overflow-x-scroll xl:overflow-x-hidden">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      ID
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Name
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Created At
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Updated At
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Category Settings
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0
                    ? data.map((item) => (
                        <tr className="h-0 border-gray-300 border-b">
                          <td className="text-sm p-6 whitespace-no-wrap text-gray-800">
                            {item.id}
                          </td>
                          <td className="text-sm p-12 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                            {item.name}
                          </td>
                          <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                            {item.created_at}
                          </td>
                          <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                            {item.updated_at}
                          </td>
                          <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                            <div className="flex items-center justify-center gap-6 pr-6">
                              <Link to={`/admin/role/editData/${item.id}`}>
                                <button className="h-10 w-24 bg-blue-600 text-white rounded-sm">
                                  Edit
                                </button>
                              </Link>
                              <button
                                className="h-10 w-24 bg-red-600 text-white rounded-sm"
                                onClick={() => deleteData(item.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    : console.log("error")}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Role;

import React, { useEffect, useState } from "react";
import UserService from "../../../services/UserService";
import { Link } from "react-router-dom";
import {
  AiFillDownSquare,
  AiOutlineRight,
  AiOutlineUserAdd,
} from "react-icons/ai";
// @ts-ignore
import Avatar from "../../../img/avatar.png";
import { FaDownload } from "react-icons/fa";

const UserTable = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await UserService.getAllUser();
    // role checking
    setData(response.data.data);
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="py-10 mr-2 overflow-x-auto">
      <div className="flex items-start -mt-16 mr-20">
        <div className="mx-auto -mr-4 mt-4 container bg-white shadow rounded w-[1600px]">
          <div className="flex flex-col lg:flex-row p-4 lg:p-8 justify-between items-start lg:items-stretch w-full">
            <div className="w-full lg:w-1/3 flex flex-col lg:flex-row items-start lg:items-center">
              <div className="flex items-center">
                <Link to={"/admin/register"}>
                  <div
                    className="text-gray-600 mx-2 p-2 border-transparent border bg-gray-100 hover:bg-gray-200 cursor-pointer rounded focus:outline-none focus:border-gray-800 focus:shadow-outline-gray"
                    href="javascript: void(0)"
                  >
                    <AiOutlineUserAdd />
                  </div>
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-2/3 flex lg:flex-row items-start lg:items-center justify-end">
              <div className="flex items-center lg:border-l lg:border-r border-gray-300 py-3 lg:py-0 lg:px-6">
                <p
                  className="md:visible lg:visible invisible text-base text-gray-600"
                  id="page-view"
                >
                  Viewing 1 - 20 of 60
                </p>
                {/* left */}
                <div className="md:visible lg:visible invisible">
                  <a
                    className="text-gray-600 ml-2 border-transparent border cursor-pointer rounded"
                    onclick="pageView(false)"
                  ></a>
                  {/* right */}
                  <a
                    className="text-gray-600 border-transparent border rounded focus:outline-none cursor-pointer"
                    onclick="pageView(true)"
                  >
                    {/* @ts-ignore */}
                    <AiOutlineRight className="md:visible lg:visible invisible" />
                  </a>
                </div>
              </div>
              <div className="-mt-8 lg:mt-0 md:mt-0 flex items-center lg:border-r border-gray-300 pb-3 lg:pb-0 lg:px-6">
                <div className="relative w-32 z-10">
                  <select
                    aria-label="Selected tab"
                    className="bg-blue-50 focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray text-base form-select block w-full py-2 px-2 xl:px-3 rounded text-gray-600 appearance-none bg-transparent"
                  >
                    <option>Sort Ascending</option>
                    <option>Sort Descending</option>
                  </select>
                </div>
              </div>
              <div className="lg:ml-2 lg:mt-0 md:mt-0 -mt-8 flex items-center">
                <div
                  for="file-upload"
                  className="text-white ml-4 cursor-pointer focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 w-[40px] h-[40px] rounded flex items-center justify-center"
                >
                  <FaDownload>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                    />
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <line x1={12} y1={5} x2={12} y2={19} />
                    <line x1={5} y1={12} x2={19} y2={12} />
                  </FaDownload>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full overflow-x-scroll xl:overflow-x-hidden -mt-16 lg:mt-0 md:mt-0">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="w-full h-16 border-gray-300 border-b py-8">
                  <th className="text-gray-600 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                    <div className="text-gray-600 opacity-0 cursor-default relative w-10">
                      <div className="absolute top-0 right-0 w-5 h-5 mr-2 -mt-1 rounded-full bg-indigo-700 text-white flex justify-center items-center text-xs">
                        3
                      </div>
                    </div>
                  </th>
                  <th className="text-sky-400 font-bold pr-6 text-left text-sm tracking-normal leading-4 ">
                    ID
                  </th>
                  <th className="text-sky-400 font-bold pr-6 text-left text-sm tracking-normal leading-4">
                    Profile Image
                  </th>
                  <th className="text-sky-400 font-bold pr-6 text-left text-sm tracking-normal leading-4">
                    Name
                  </th>
                  <th className="text-sky-400 font-bold pr-6 text-left text-sm tracking-normal leading-4">
                    Role
                  </th>
                  <th className="text-sky-400 font-bold pr-6 text-left text-sm tracking-normal leading-4">
                    Email
                  </th>
                  <th className="text-sky-400 font-bold pr-6 text-left text-sm tracking-normal leading-4">
                    Password
                  </th>
                  <th className="text-sky-400 font-bold pr-6 text-left text-sm tracking-normal leading-4">
                    Starting Date
                  </th>
                  <th className="text-sky-400 font-bold pr-6 text-left text-sm tracking-normal leading-4">
                    Modifying Date
                  </th>
                  <th className="text-sky-400 font-bold pr-6 text-left text-sm tracking-normal leading-4">
                    More
                  </th>
                  <th className="text-gray-600 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                    <div className="opacity-0 w-2 h-2 rounded-full bg-indigo-400" />
                  </th>
                  {/* <td className="text-gray-600 dark:text-gray-400 font-normal pr-8 text-left text-sm tracking-normal leading-4">More</td> */}
                </tr>
              </thead>
              <tbody>
                {data.length > 0
                  ? data.map((item) => (
                      item.role===6?(<tr className="h-24 border-gray-300 dark:border-gray-200 border-b">
                      <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                        <div className="relative w-10 text-gray-600 dark:text-gray-400"></div>
                      </td>
                      <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                        {item.id}
                      </td>
                      <td className="pr-6 whitespace-no-wrap">
                        <div className="flex items-center justify-center">
                          <div className="h-8 w-8">
                            {item.user_details[0].image_profile ? (
                              <img
                                src={item.user_details[0].image_profile}
                                alt
                                className="h-full w-full rounded-full overflow-hidden shadow"
                              />
                            ) : (
                              <img
                                src={Avatar}
                                alt="avatar"
                                className="h-full w-full rounded-full overflow-hidden shadow"
                              />
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                        {item.user_details[0].name}
                      </td>
                      <td className="text-sm pr-8 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                        User
                      </td>
                      <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                        {item.email}
                      </td>
                      <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                        key
                      </td>
                      <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                        {item.created_at}
                      </td>
                      <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                        {item.user_details[0].updated_at}
                      </td>
                      <td className="pr-8 relative">
                        <Link to={`/admin/editadmin/${item.id}`}>
                          <button className="h-10 w-32 bg-blue-600 text-white rounded-sm">
                            Edit
                          </button>
                        </Link>
                      </td>
                    </tr>):null
                    ))
                  : console.log("error")}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTable;

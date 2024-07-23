import {
  SubMenu,
  MenuItem,
  ProSidebarProvider,
  Menu,
  Sidebar,
} from "react-pro-sidebar";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { actionType } from "../../../context/reducer";
import { useStateValue } from "../../../context/StateProvider";
import Logo from "../../../img/logo.png";
import { RiGhostFill } from "react-icons/ri";
import { FcAddDatabase, FcBusinessman, FcCollaboration, FcPieChart, FcTodoList } from "react-icons/fc";

const NavBar = () => {
  const [{ user, adminmenuShow }, dispatch] = useStateValue();

  const SetMenu = () => {
    dispatch({
      type: actionType.SET_ADMINMENU_SHOW,
      adminmenuShow: !adminmenuShow,
    });
  };

  const logout = () => {
    console.log(user);
    SetMenu();
    localStorage.clear();
    toast.success("Successfully logout");
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }}
        className="fixed lg:top-0 top-24 left-0 w-full md:w-[250px] lg:h-screen bg-gray-50 drop-shadow-md flex flex-col z-[101] scroll"
      >
        <ProSidebarProvider>
          <aside className="w-full h-screen" aria-label="Sidebar">
            <div className="rounded dark:bg-gray-800">
              <Sidebar>
                <Menu>
                  <ul className="space-y-2 w-225" >
                    <div className="w-225 h-full flex items-center justify-start px-8">
                      <a href={"/"} >
                        <motion.img
                          whileTap={{ scale: 0.2 }}
                          src={Logo}
                          className="md:w-4y md:h-20 w-3y h-16 object-cover cursor-pointer"
                          alt="logo"
                        />
                        {/* {console.log(user.id)} */}
                      </a>
                    </div>
                    <li>
                      <Link
                        to={"admin/dashboard"}
                        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <FcPieChart/>
                        <span className="ml-3">Dashboard</span>
                      </Link>
                    </li>
                    <div>
                      <Menu className="relative" id="sidenavSecEx2">                    
                        <SubMenu
                          label="Item"
                          className="text-gray-900 hover:bg-gray-100 rounded-lg"
                          id="collapseSidenavSecEx2"
                          aria-labelledby="sidenavSecEx2"
                          data-bs-parent="#sidenavSecExample"
                        >
                          <Link to={"/admin/createItem"}>
                            <MenuItem className="relative">
                              <a
                                href="#!"
                                className="flex items-center text-md py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 transition duration-300 ease-in-out"
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="primary"
                              >
                                Add Item
                              </a>
                            </MenuItem>
                          </Link>
                          <Link to={"#"}>
                            <MenuItem className="relative">
                              <a
                                href="#!"
                                className="flex items-center text-md py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 transition duration-300 ease-in-out"
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="primary"
                              >
                                View Item
                              </a>
                            </MenuItem>
                          </Link>
                        </SubMenu>
                      </Menu>
                    </div>
                    <div>
                      <Menu className="relative" id="sidenavSecEx2">                    
                        <SubMenu
                          label="User Table"
                          className="text-gray-900 hover:bg-gray-100 rounded-lg"
                          id="collapseSidenavSecEx2"
                          aria-labelledby="sidenavSecEx2"
                          data-bs-parent="#sidenavSecExample"
                        >
                          <Link to={"/admin/usertable"}>
                            <MenuItem className="relative">
                              <a
                                href="#!"
                                className="flex items-center text-md py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 transition duration-300 ease-in-out"
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="primary"
                              >
                                Normal User
                              </a>
                            </MenuItem>
                          </Link>
                          <Link to={"/admin/stufftable"}>
                            <MenuItem className="relative">
                              <a
                                href="#!"
                                className="flex items-center text-md py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 transition duration-300 ease-in-out"
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="primary"
                              >
                                Stuff User
                              </a>
                            </MenuItem>
                          </Link>
                        </SubMenu>
                      </Menu>
                    </div>
                    <li>
                      <Link
                        to={"admin/category"}
                        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <FcTodoList/>
                        <span className="ml-3">Category</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"admin/role"}
                        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <FcBusinessman/>
                        <span className="ml-3">User Role</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"admin/group"}
                        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <FcCollaboration/>
                        <span className="ml-3">Group</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"admin/company"}
                        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <FcCollaboration/>
                        <span className="ml-3">Company</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"admin/state"}
                        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <FcCollaboration/>
                        <span className="ml-3">State</span>
                      </Link>
                    </li>
                  </ul>
                </Menu>
              </Sidebar>
            </div>
          </aside>
        </ProSidebarProvider>
      </motion.div>
    </>
  );
};

export default NavBar;

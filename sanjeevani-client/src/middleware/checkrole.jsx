import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import Constant from "../services/Constant";
import TokenHelper from "../services/TokenHelper";

export const AdminRole = ({ children }) => {
  let role = Constant.getUserRoll();

  const location = useLocation();
  if (role != 1 && role != 2) {
    // console.log("admin role : ", role);
    // localStorage.clear();
    return <Navigate to="/" state={{ path: location.pathname }} />;
  }
  console.log("middleware outside call");
  return children;
};


export const UserRole = ({ children }) => {
  let role = Constant.getUserRoll();


  const location = useLocation();

  if (role != 6) {
    // console.log("admin role : ", role);
    // localStorage.clear();
    return <Navigate to="/" state={{ path: location.pathname }} />;
  }

  // console.log("middleware outside call");
  return children;
};

export const DelivaryBoyRole = ({ children }) => {
  let role = Constant.getUserRoll();


  const location = useLocation();

  if (role != 5) {
    // console.log("admin role : ", role);
    // localStorage.clear();
    return <Navigate to="/deliveryboy/content" state={{ path: location.pathname }} />;
  }

  // console.log("middleware outside call");
  return children;
};


// const userRole = () => {

// }
// const userRole = () => {

// }
// const userRole = () => {

// }
// const userRole = () => {

// }
// const userRole = () => {

// }

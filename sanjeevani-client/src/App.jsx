// Hara Mahadev
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import {
  ConcernContainer,
  Header,
  MottoContainer,
  ProductContainer,
} from "./components";
import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "./middleware/RequireAuth";
import { AdminAuth } from "./middleware/RequireAuth";
import { AdminRole, DelivaryBoyRole, UserRole } from "./middleware/checkrole";
import MainContainer from "./components/MainContainer";
import { AnimatePresence } from "framer-motion";
import { useStateValue } from "./context/StateProvider";
// import { getAllmediList } from "./utils/fireFunc";
import { actionType } from "./context/reducer";
import PrescriptionContainer from "./components/PrescriptionContainer";
import { ToastContainer } from "react-toastify";
import SkipDoctor from "./components/SkipDoctor";
// admin
// import Admin from "./components/admin/Admin";
import UserProfile from "./components/userprofile/UserProfile";
// import DoctorProfile from "./components/userprofile/Doctor/Profile";
import SuperVisorProfile from "./components/userprofile/Supervisor/Profile";
import StoreManagerProfile from "./components/userprofile/StoreManager/Profile";
// admin login
import Login from "./components/admin/login/Login";
import Register from "./components/admin/login/Register";
import EditAdmin from "./components/admin/login/EditAdmin";
import AdminTable from "./components/admin/navbar/AdminTable";
import UserTable from "./components/admin/navbar/UserTable";
import Dashboard from "./components/admin/dashboard/Dashboard";
// category
import Category from "./components/admin/navbar/Category/Category";
import EditCategory from "./components/admin/navbar/Category/EditCategory";
import CreateCategory from "./components/admin/navbar/Category/CreateCategory";
// groups
import Groups from "./components/admin/navbar/Groups/Groups";
import EditGroups from "./components/admin/navbar/Groups/EditGroups";
import CreateGroups from "./components/admin/navbar/Groups/CreateGroups";
// states
import States from "./components/admin/navbar/States/States";
import EditStates from "./components/admin/navbar/States/EditStates";
import CreateStates from "./components/admin/navbar/States/CreateStates";
// role
import Role from "./components/admin/navbar/Role/Role";
import EditRole from "./components/admin/navbar/Role/EditRole";
import CreateRole from "./components/admin/navbar/Role/CreateRole";
// company
import Company from "./components/admin/navbar/Company/Company";
import EditCompany from "./components/admin/navbar/Company/EditCompany";
import CreateCompany from "./components/admin/navbar/Company/CreateCompany";
import SearchContainer from "./components/SearchContainer";
import HeaderAdmin from "./components/admin/header/HeaderAdmin";
// Item
import CreateContainer from "./components/admin/navbar/Items/CreateContainer";
import ViewItem from "./components/admin/navbar/Items/ViewItem";
//DeliveryBoy
import DeliveryBoyProfile from "./components/userprofile/DeliveryBoy/Profile";
import DeliveryContent from "./components/userprofile/DeliveryBoy/Content";
import HeaderDelivery from "./components/userprofile/DeliveryBoy/HeaderDelivery";
import PendingOrder from "./components/userprofile/DeliveryBoy/Table/PendingOrder";
import TotalDelivered from "./components/userprofile/DeliveryBoy/Table/TotalDelivered";
import TotalOrder from "./components/userprofile/DeliveryBoy/Table/TotalOrder";
//Doctor
import DoctorProfile from "./components/userprofile/Doctor/Profile";
import DoctorContent from "./components/userprofile/Doctor/Content";
import PendingPatient from "./components/userprofile/Doctor/Table/PendingPatient";
import AlreadyHaveSeen from "./components/userprofile/Doctor/Table/AlreadyHaveSeen";
import TotalPatient from "./components/userprofile/Doctor/Table/TotalPatient";

let pathName = window.location.pathname;
let mainhideheaderpath =
  pathName === "/" ||
  pathName === "/concernContainer" ||
  pathName === "/doctorContainer" ||
  pathName === "/searchcontainer" ||
  pathName === "/ourmotto" ||
  pathName === "/productDetails";

let adminpath =
  pathName === "/admin" ||
  pathName === "/admin/createItem" ||
  pathName === "/admin/" ||
  pathName === "/admin/stufftable" ||
  pathName === "/admin/local";

function App() {
  return (
    <>
      <AnimatePresence exitBeforeEnter>
        <div className="w-screen h-auto flex flex-col bg-teal-50">
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          {mainhideheaderpath ? (
            <Header />
          ) : adminpath ? (
            <HeaderAdmin />
          ) : (
            <HeaderDelivery />
          )}
          <main className="mt-14 md:mt-20 md:px-16 px-4  py-4 w-full">
            <Routes>
              {/* User */}

              <Route
                path="/*"
                element={
                  // <RequireAuth><UserRole>
                  <MainContainer />
                  // </UserRole></RequireAuth>
                }
              />
              <Route path="/doctor-container" element={<SkipDoctor />} />
              {/* <Route
                path="/prescriptionContainer"
                element={<PrescriptionContainer />}
              /> */}
              <Route path="/product-details" element={<ProductContainer />} />
              <Route path="/concern" element={<ConcernContainer />} />
              <Route path="/search" element={<SearchContainer />} />
              <Route path="/ourmotto" element={<MottoContainer />} />

              {/* deliveryboy */}
              <Route
                path="/deliveryboy"
                element={
                  <RequireAuth>
                    <DelivaryBoyRole>
                      <DeliveryBoyProfile />
                    </DelivaryBoyRole>
                  </RequireAuth>
                }
              />
              <Route
                path="/deliveryboy/content"
                element={
                  <RequireAuth>
                    <DelivaryBoyRole>
                      <DeliveryContent />
                    </DelivaryBoyRole>
                  </RequireAuth>
                }
              />
              <Route
                path="/deliveryboy/total"
                element={
                  <RequireAuth>
                    <DelivaryBoyRole>
                      <TotalOrder />
                    </DelivaryBoyRole>
                  </RequireAuth>
                }
              />
              <Route
                path="/deliveryboy/pending"
                element={
                  <RequireAuth>
                    <DelivaryBoyRole>
                      <PendingOrder />
                    </DelivaryBoyRole>
                  </RequireAuth>
                }
              />
              <Route
                path="/deliveryboy/delivered"
                element={
                  <RequireAuth>
                    <DelivaryBoyRole>
                      <TotalDelivered />
                    </DelivaryBoyRole>
                  </RequireAuth>
                }
              />
              {/* doctor */}
              <Route path="/doctor" element={<DoctorProfile />} />
              <Route path="/doctor/content" element={<DoctorContent />} />
              <Route path="/doctor/total" element={<TotalPatient />} />
              <Route path="/doctor/pending" element={<PendingPatient />} />
              <Route path="/doctor/haveseen" element={<AlreadyHaveSeen />} />
              {/* storemanager */}
              <Route path="/storemanager" element={<StoreManagerProfile />} />

              {/* admin */}
              <Route path="/admin/createItem" element={<CreateContainer />} />
              <Route
                path="/admin/stufftable"
                element={
                  <AdminAuth>
                    <AdminRole>
                      <AdminTable />
                    </AdminRole>
                  </AdminAuth>
                }
              />
              <Route
                path="/admin/userTable"
                element={
                  <AdminAuth>
                    <AdminRole>
                      <UserTable />
                    </AdminRole>
                  </AdminAuth>
                }
              />

              {/* Supervisor */}
              <Route
                path="/supervisor"
                element={
                  <AdminAuth>
                    <AdminRole>
                      <SuperVisorProfile />
                    </AdminRole>
                  </AdminAuth>
                }
              />
              <Route path="/admin/local" element={<UserTable />} />
              <Route
                path="/admin/editadmin/:id"
                element={
                  <AdminAuth>
                    <AdminRole>
                      <EditAdmin />
                    </AdminRole>
                  </AdminAuth>
                }
              />
              <Route path="/admin/login" element={<Login />} />
              <Route
                path="/admin/user/create"
                element={
                  <AdminAuth>
                    <AdminRole>
                      <Register />
                    </AdminRole>
                  </AdminAuth>
                }
              />
              {/* category */}
              <Route
                path="/admin/category/editData/:id"
                element={
                  <AdminAuth>
                    <AdminRole>
                      <EditCategory />
                    </AdminRole>
                  </AdminAuth>
                }
              />
              <Route
                path="/admin/category/createData"
                element={<CreateCategory />}
              />
              <Route path="/admin/category" element={<AdminAuth><AdminRole><Category /></AdminRole></AdminAuth>} />
              {/* role */}
              <Route path="/admin/role/editData/:id" element={<AdminAuth><AdminRole><EditRole /></AdminRole></AdminAuth>} />
              <Route path="/admin/role/createData" element={<AdminAuth><AdminRole><CreateRole /></AdminRole></AdminAuth>} />
              <Route path="/admin/role" element={<AdminAuth><AdminRole><Role /></AdminRole></AdminAuth>} />
              {/* states */}
              <Route
                path="/admin/state/editData/:id"
                element={<AdminAuth><AdminRole><EditStates /></AdminRole></AdminAuth>}
              />
              <Route
                path="/admin/state/createData"
                element={<CreateStates />}
              />
              <Route path="/admin/state" element={<States />} />
              {/* groups */}
              <Route
                path="/admin/group/editData/:id"
                element={<EditGroups />}
              />
              <Route
                path="/admin/group/createData"
                element={<CreateGroups />}
              />
              <Route path="/admin/group" element={<Groups />} />
              {/* company */}
              <Route
                path="/admin/company/editData/:id"
                element={<EditCompany />}
              />
              <Route
                path="/admin/company/createData"
                element={<CreateCompany />}
              />
              <Route path="/admin/company" element={<Company />} />
              <Route path="/admin" element={<AdminAuth><AdminRole><Dashboard /></AdminRole></AdminAuth>} />
            </Routes>
          </main>
        </div>
      </AnimatePresence>
    </>
  );
}

export default App;

import React, { useState } from "react";
import Doctor from "../img/doctor.png";
import DoctorMenu from "./DoctorMenu";
import ReactModal from "react-modal";
import SearchComponent from "./SearchComponent";
import { GrClose } from "react-icons/gr";
import DoctorRow from "./DoctorRow";

const DoctorContainer = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  

  return (
    <>
      <section
        className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full mt-16 "
        id="Home"
      >
        <div className="py-2 flex-1 flex flex-col items-start justify-center gap-6 mt-20">
          {/* <SearchComponent /> */}
          <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">
            Your Doctor,
            <span className="text-[#18978F] text-[3rem] lg:text-[5rem]">
              Your Value
            </span>
          </p>

          <p className="text-xl text-textColor text-center md:text-left md:w-[80%]">
            Our empanelled team of doctors will help you save up to 72% on every
            order
          </p>
          <ReactModal
            className="outline-none mx-auto bottom-16"
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
          >
            <LoginContainer />

            <div className="flex items-center justify-center -mt-[610px] pl-[935px]">
              <button onClick={closeModal}>
                <GrClose className="text-5xl" />
              </button>
            </div>
          </ReactModal>
          <button
            type="button"
            className="bg-gradient-to-br from-[#55AAAA] to-[#008080] w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 text-slate-200"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            onClick={openModal}
          >
            Doctor Appointment
          </button>
        </div>

        <div className="py-2 flex-1 flex items-center relative mt-20">
          <img
            src={Doctor}
            className=" ml-auto h-570 w-full lg:w-auto lg:h-510 rounded-t-3xl opacity-70 bg-green-50"
            alt="hero-bg"
          />
        </div>
      </section>

      {/* row */}
      <DoctorRow />

      <DoctorMenu />
    </>
  );
};

export default DoctorContainer;

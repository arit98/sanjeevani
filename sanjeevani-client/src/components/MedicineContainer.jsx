import React from "react";
import { GrUp } from "react-icons/gr";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import HeroBG from "../img/heroBg.png";
import heroData from "../utils/heroData";
import PrescriptionContainer from "./PrescriptionContainer";
import SearchComponent from "./SearchComponent";
import {IoArrowUndoOutline} from "react-icons/io5"


const MedicineContainer = () => {

  let percent = 95;

  const [{ footerShow }, dispatch] = useStateValue();

  const ShowFooter = () => {
    dispatch({
      type: actionType.SET_FOOTER_SHOW,
      footerShow: !footerShow,
    });
  };

  return (
    <>
      <SearchComponent />
      <section
        className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full md:mt-8"
        id="Home"
      >
        
        <div className="py-2 flex-1 flex flex-col items-start justify-center gap-6 mt-28">
          <div className="animate-bounce bg-headingColor text-center w-full md:w-auto px-4 py-2 cursor-pointer rounded-full transition-all ease-in-out duration-100 text-slate-200">
            <IoArrowUndoOutline className="float-left mr-2 text-xl" /> UP TO {percent}% OFF TODAY ONLY!</div>
          <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">
            The Fastest Delivery in
            <span className="text-[#18978F] text-[3rem] lg:text-[5rem]">
              Your City
            </span>
          </p>

          <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
            
          </p>

          <button
            type="button"
            className="bg-gradient-to-br from-[#55AAAA] to-[#008080] w-full md:w-auto px-4 py-2 cursor-pointer rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 text-slate-200"
          >
            Order Now
          </button>
        </div>

        <div className="py-2 flex-1 flex items-center relative mt-20">
          <img
            src={HeroBG}
            className=" ml-auto h-420 w-full lg:w-auto lg:h-650"
            alt="hero-bg"
          />

          <PrescriptionContainer />
          {/* hero */}
          <div className="w-full h-full flex absolute top-0 lg:-right-36 right-0 items-center justify-center lg:px-32 ml-16 py-16 -mt-4 gap-8 lg:gap-6 flex-wrap">
            {heroData &&
              heroData.map((n) => (
                <div
                  flag={true}
                  key={n.id}
                  className="lg:w-40 lg:h-40 p-2 w-28 h-28 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg box-content cursor-pointer"
                >
                  <img
                    src={n.imgSrc}
                    className="w-28 lg:w-36 -mt-10 lg:-mt-20 rounded-t-3xl"
                    alt="I1"
                  />
                  <p className="text-base lg:text-xl text-center font-semibold text-textColor mt-2 lg:mt-4">
                    {n.name}
                  </p>
                </div>
              ))}
          </div>
        </div>
        <button
          className="animate-bounce h-16 w-16 right-4 bottom-8 fixed z-[101] bg-gradient-to-br from-[#55AAAA] to-[#008080] flex justify-center items-center rounded-full"
          onClick={ShowFooter}
        >

          <GrUp className="text-2xl" />
        </button>
      </section>
    </>
  );
};

export default MedicineContainer;

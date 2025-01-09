import React from "react";
import { GrUp } from "react-icons/gr";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import heroData from "../utils/heroData";
import PrescriptionContainer from "./PrescriptionContainer";
import SearchComponent from "./SearchComponent";
import HeroBG from "../img/heroBg.png";
import PictureSlider from "./PictureSlider";

const MedicineContainer = () => {
  const [{ footerShow }, dispatch] = useStateValue();

  const ShowFooter = () => {
    dispatch({
      type: actionType.SET_FOOTER_SHOW,
      footerShow: !footerShow,
    });
  };

  return (
    <>
      <div className="md:flex items-center justify-center md:mx-auto md:my-0"><SearchComponent /></div>
      {/* testing */}
      <div className="w-full md:h-72 md:mt-32">
        <PictureSlider />
      </div>
      <section
        className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full md:-mt-36"
        id="Home"
      >
        <div className="py-2 flex-1 flex flex-col items-start justify-center gap-6 md:mt-28">
          <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">
            The Fastest Delivery in
            <span className="text-[#18978F] text-[3rem] lg:text-[5rem]">
              Your City
            </span>
          </p>

          <p className="text-base text-textColor text-center md:text-left md:w-[80%]"></p>

          <button
            type="button"
            className="bg-gradient-to-br from-[#55AAAA] to-[#008080] w-full md:w-auto px-4 py-2 cursor-pointer rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 text-slate-200"
          >
            Order Now
          </button>
        </div>
        <div className="py-2 flex-1 flex items-center relative mt-20 md:invisible sm:visible">
          <img
            src={HeroBG}
            className=" ml-auto h-420 w-full lg:w-auto lg:h-650"
            alt="hero-bg"
          />
          <PrescriptionContainer />
          {/* hero */}
          <div className="w-full h-full flex absolute top-0 lg:-right-36 right-0 items-center justify-center lg:px-32 ml-16 py-16 -mt-4 gap-8 lg:gap-12 flex-wrap">
            {heroData &&
              heroData.map((item) => (
                <div
                  flag={true}
                  key={item.id}
                  className="lg:w-36 lg:h-36 p-2 w-28 h-28 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg box-content cursor-pointer"
                >
                  <img
                    src={item.imgSrc}
                    className="w-28 lg:w-36 -mt-10 lg:-mt-20 rounded-t-3xl"
                    alt="I1"
                  />
                  <p className="text-base lg:text-xl text-center font-semibold text-textColor mt-2 lg:mt-4">
                    {item.name}
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

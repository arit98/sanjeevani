import React from "react";
import Slider from "react-slick";
import heroData from "../utils/doctorRow";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DoctorRow = (flag) => {

    const SampleNextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{
              ...style,
              display: "block",
              background: "teal",
              borderRadius: "50%",
            }}
            onClick={onClick}
          />
        );
      };
      
      const SamplePrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{
              ...style,
              display: "block",
              background: "teal",
              borderRadius: "50%",
              marginLeft: "-20px",
            }}
            onClick={onClick}
          />
        );
      };

      const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 4,
        variableWidth: true,
        rows: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      };
      

  return (
    <div>
      <section className="w-full my-6 h-full">
        <div
          className={`w-full my-12 flex gap-3 -mt-16 bg-gradient-to-b from-teal-50 via-teal-100 to-teal-50 rounded-b-3xl opacity-4 scroll-smooth ${
            flag
              ? "overflow-x-scroll scrollbar-none"
              : "overflow-x-hidden flex-wrap justify-center"
          }`}
        >
          <div className="w-full flex-col items-center justify-between">
            <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-[#55AAAA] to-[#008080] transition-all ease-in-out duration-100">
              Meet Our Doctors
            </p>

            <div className="flex-wrap justify-start items-center w-60 m-8">
              <p className="text-lg mt-4">
                spanOur empanelled team of doctors will help you save up to 72%
                on every order
              </p>
            </div>

            <Slider
              {...settings}
              className=" my-8 mx-64 relative flex items-center justify-center"
            >
              {heroData &&
                heroData.map((n) => (
                  <div
                    key={n.id}
                    className="lg:w-350 h-196 flex flex-col items-center justify-center drop-shadow-lg mr-auto"
                  >
                    <div className="flex justify-center items-center m-7">
                      <img
                        src={n.imgSrc}
                        className="w-20 lg:w-24 lg:h-24 rounded-full"
                        alt="I1"
                      />
                    </div>
                    <p className="text-base lg:text-sm text-textColor mt-2 lg:mt-4 text-center">
                      {n.name}
                    </p>

                    <p className="text-[12px] lg:text-sm text-lighttextGray font-semibold my-1 lg:my-3">
                      {n.desc}
                    </p>

                    <p className="text-sm font-semibold text-red-500 text-center">
                      MBBS
                    </p>
                  </div>
                ))}
            </Slider>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DoctorRow;

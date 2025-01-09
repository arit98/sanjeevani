import React from "react";
import Slider from "react-slick";
import sliderData from "../utils/sliderImg";
import {BsChevronLeft, BsChevronRight} from "react-icons/bs"

const PictureSlider = () => {
  const Next = (props) => {
    const {onClick} = props
    return <div className="flex justify-end" onClick={onClick}><BsChevronRight className="mt-32 text-[#515151] text-4xl cursor-pointer flex absolute top-0 right-0"/></div>;
  };

  const Previous = (props) => {
    const {onClick} = props
    return <div className="flex justify-start" onClick={onClick}><BsChevronLeft className="mt-32 text-[#515151] text-4xl cursor-pointer flex absolute top-0 left-0 z-10"/></div>;
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <Next />,
    prevArrow: <Previous />,
  };
  return (
    <div>
      <Slider {...settings}>
        {sliderData &&
          sliderData.map((item) => (
            <div>
              <img className="h-72 w-full" src={item.url} alt="img" />
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default PictureSlider;

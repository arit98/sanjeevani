import React, { useState } from "react";
import { FaCamera, FaSearch } from "react-icons/fa";
import data from "../utils/demo.json";

const SearchComponent = () => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    console.log("search ", searchTerm);
  };

  const pressEnter = (e) => {
    e.key === "Enter" ? onSearch(e.target.value) : null;
  };

  const show_search_4 = (_el) => {
    document
      .getElementById("div1_search_4")
      .classList.toggle("translate-x-full");
    const setting_search_4 = document.getElementById("setting_search_4");
    if (setting_search_4.classList.contains("block")) {
      setting_search_4.classList.remove("block");
      setting_search_4.classList.add("hidden");
    } else {
      setting_search_4.classList.remove("hidden");
      setting_search_4.classList.add("block");
    }
    const close_search_4 = document.getElementById("close_search_4");
    console.log(close_search_4.classList.contains("hidden"));
    if (!close_search_4.classList.contains("hidden")) {
      close_search_4.classList.remove("block");
      close_search_4.classList.add("hidden");
    } else {
      close_search_4.classList.remove("hidden");
      close_search_4.classList.add("block");
    }
  };

  return (
    <>
        <div className="w-[32rem] md:max-w-[43.5rem] max-w-[20rem] h-16 mx-auto bg-white py-5 overflow-hidden rounded-xl">
          {/* tab */}
          <div className="flex justify-between px-2 pb-3">
            <div className="flex items-center w-1 xs:h-4">
              <FaSearch className="text-xl text-[#323335] -mt-2 ml-1" />
              <input
                type="text"
                placeholder="Search"
                className="focus:outline-none text-2xl md:w-[545px] bg-white h-14 -mt-4 ml-2"
                onChange={handleChange}
                onKeyPress={pressEnter}
                value={value}
              />
            </div>
            <div className="absolute lg:top-[7.3rem] top-60 lg:left-8 right-7 w-[86%] mx-auto md:w-[31.25rem] bg-white flex mt-2 flex-col-reverse text-xl cursor-pointer z-50 rounded-b-2xl">
              {data
                .filter((item) => {
                  const searchTerm = value.toLowerCase();
                  const fullName = item.full_name.toLowerCase();

                  return (
                    searchTerm &&
                    fullName.startsWith(searchTerm) &&
                    fullName !== searchTerm
                  );
                })
                .slice(0, 10)
                .map((item) => (
                  <div
                    onClick={() => onSearch(item.full_name)}
                    className="ml-4"
                    key={item.full_name}
                  >
                    {item.full_name}
                  </div>
                ))}
            </div>
            <div id="target_search_4">
              <div className="relative w-full">
                <button onClick={show_search_4}>
                  <div id="setting_search_4">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:rin0"g-2 focus-within:ring-offset-2 focus-within:ring-indigo-50
                    >
                      <FaCamera className="text-xl text-[#323335] lg:hidden"/>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                  </div>
                  <div id="close_search_4" className="hidden"></div>
                </button>
              </div>
            </div>
          </div>
        </div>

      <style>
        {`
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 20px;
  }
  ::-webkit-scrollbar-thumb {
    background: #e0e7ff;
    border-radius: 20px;
  }
  input:checked ~ .dot_search_4{
    transform: translateX(100%);
    background-color: #ffffff;
  }
  input:checked ~ .bg_search_4 {
    background-color: #4338ca;
  }

  input:checked ~ .dot1_search_4 {
    transform: translateX(100%);
    background-color: #ffffff;
  }
  input:checked ~ .bg1 {
    background-color: #4338ca;
  }

  input:checked ~ .dot2_search_4 {
    transform: translateX(100%);
    background-color: #ffffff;
  }
  input:checked ~ .bg2_search_4 {
    background-color: #4338ca;
  }

  input:checked ~ .dot3_search_4 {
    transform: translateX(100%);
    background-color: #ffffff;
  }
  input:checked ~ .bg3_search_4 {
    background-color: #4338ca;
  }

  input:checked ~ .dot4_search_4 {
    transform: translateX(100%);
    background-color: #ffffff;
  }
  input:checked ~ .bg4_search_4 {
    background-color: #4338ca;
  }
  input:checked ~ .dot5_search_4 {
    transform: translateX(100%);
    background-color: #ffffff;
  }
  input:checked ~ .bg5_search_4 {
    background-color: #4338ca;
  }
`}
      </style>
    </>
  );
};

export default SearchComponent;

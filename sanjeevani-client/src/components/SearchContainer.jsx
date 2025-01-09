import React, { useState, useEffect } from "react";
import { useStateValue } from "../context/StateProvider";
import RowContainer from "./RowContainer";
import SearchComponent from "./SearchComponent";
import CompanyService from "../services/CompanyService";
import CategoryService from "../services/CategoryService";
import MedicineServices from "../services/MedicineServices";

const SearchContainer = () => {
  const [{ cartShow }, dispatch] = useStateValue();

  const [data, setData] = useState([]);

  const [data1, setData1] = useState([]);

  const [meddata, setMeddata] = useState([]);

  const [name, setName] = useState([]);

  const loadData = async () => {
    let obj = {
      medicine_id: "",
      category_id: "",
      company_id: "",
      box_price: "",
      page_price: "",
      name: name,
      limit: 10,
      offset: 0,
    };

    const response = await CompanyService.getAll();
    const response1 = await CategoryService.getAll();
    const response2 = await MedicineServices.searchMed(obj);
    console.log(response2.data.data);
    setMeddata(response2.data.data);
    setData(response.data.data);
    setData1(response1.data.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className="bg-teal-50">
        <main className="mx-auto px-4 sm:px-6 lg:px-8 w-[100%]">
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
              <div className="flex items-center justify-center mx-auto -mt-24"><SearchComponent /></div>
            <div className="flex items-center">
              <div className="relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    className="group inline-flex justify-center text-sm font-medium hover:text-gray-900 text-red-500"
                    id="menu-button"
                    aria-expanded="false"
                    aria-haspopup=""
                  >
                    Sort
                    {/* Heroicon name: mini/chevron-down */}
                    <svg
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden=""
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <div
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabIndex={-1}
                >
                  <div className="py-1" role="none">
                    <a
                      href="#"
                      className="font-medium text-gray-900 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex={-1}
                      id="menu-item-0"
                    >
                      Most Popular
                    </a>
                    <a
                      href="#"
                      className="text-gray-500 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex={-1}
                      id="menu-item-1"
                    >
                      Best Rating
                    </a>
                    <a
                      href="#"
                      className="text-gray-500 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex={-1}
                      id="menu-item-2"
                    >
                      Newest
                    </a>
                    <a
                      href="#"
                      className="text-gray-500 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex={-1}
                      id="menu-item-3"
                    >
                      Price: Low to High
                    </a>
                    <a
                      href="#"
                      className="text-gray-500 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex={-1}
                      id="menu-item-4"
                    >
                      Price: High to Low
                    </a>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <svg
                  className="h-5 w-5"
                  aria-hidden=""
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                {/* Heroicon name: mini/funnel */}
                <svg
                  className="h-5 w-5"
                  aria-hidden=""
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <div className="border-b border-gray-200 py-6">
                  <h3 className="-my-3 flow-root">
                    {/* Expand/collapse section button */}
                    <button
                      type="button"
                      className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                      aria-controls="filter-section-0"
                      aria-expanded="false"
                    >
                      <span className="font-medium text-gray-900">
                        Brand Popularity
                      </span>
                      <span className="ml-6 flex items-center">
                        {/*
                Expand icon, show/hide based on section open state.

                Heroicon name: mini/plus
              */}
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden=""
                        >
                          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                        </svg>
                        {/*
                Collapse icon, show/hide based on section open state.

                Heroicon name: mini/minus
              */}
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden=""
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H3.75A.75.75 0 013 10z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </button>
                  </h3>
                  {/* Filter section, show/hide based on section state. */}
                  <div className="pt-6" id="filter-section-0">
                    <div className="space-y-4">
                      {data &&
                        data.map((item) => (
                          <div className="flex items-center">
                            <input
                              id="filter-color-0"
                              name="color[]"
                              defaultValue="white"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-color-0"
                              className="ml-3 text-sm text-gray-600"
                            >
                              {item.name}
                            </label>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="border-b border-gray-200 py-6">
                  <h3 className="-my-3 flow-root">
                    {/* Expand/collapse section button */}
                    <button
                      type="button"
                      className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                      aria-controls="filter-section-1"
                      aria-expanded="false"
                    >
                      <span className="font-medium text-gray-900">
                        Category
                      </span>
                      <span className="ml-6 flex items-center">
                        {/*
                Expand icon, show/hide based on section open state.

                Heroicon name: mini/plus
              */}
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden=""
                        >
                          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                        </svg>
                        {/*
                Collapse icon, show/hide based on section open state.

                Heroicon name: mini/minus
              */}
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden=""
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H3.75A.75.75 0 013 10z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </button>
                  </h3>
                  {/* Filter section, show/hide based on section state. */}
                  <div className="pt-6" id="filter-section-1">
                    <div className="space-y-4">
                      {data1 &&
                        data1.map((item) => (
                          <div className="flex items-center">
                            <input
                              id="filter-category-4"
                              name="category[]"
                              defaultValue="accessories"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-category-4"
                              className="ml-3 text-sm text-gray-600"
                            >
                              {item.category_name}
                            </label>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </form>
              {/* Product grid */}

              <div className="lg:col-span-3">
                {/* Replace with your content */}
                <div className="h-96 rounded-lg border-4 p-4 border-double border-gray-200 lg:h-full">
                  <RowContainer data={meddata} flag={false} />
                </div>
                {/* /End replace */}
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default SearchContainer;

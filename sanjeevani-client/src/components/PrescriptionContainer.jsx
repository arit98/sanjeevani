import React, { useState } from "react";
import { FcInspection } from "react-icons/fc";

const PrescriptionContainer = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div>
        <div>
          <div
            className="py-12 transition duration-150 ease-in-out absolute lg:top-0 right-0 bottom-0 top-[-490px] lg:left-0 left-64 w-96 lg:w-[700px]"
            id="modal"
          >
            {showModal ? (
              <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                          Upload Your Prescription Here
                        </h3>
                        <button
                          className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setShowModal(false)}
                        >
                          <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className="relative p-6 flex-auto">
                        
                      <div className="relative p-4 md:p-8">
                        <div className="w-full flex items-center justify-start text-gray-600 dark:text-gray-400 mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-upload" width={40} height={40} viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
                                <polyline points="7 9 12 4 17 9" />
                                <line x1={12} y1={4} x2={12} y2={16} />
                            </svg>
                            <h1 className="text-left text-gray-800 dark:text-gray-100 font-lg font-bold tracking-normal leading-tight ml-2">Upload Files</h1>
                        </div>
                        <p className="mb-5 text-sm text-gray-600 dark:text-gray-400 text-left font-normal">Attach files for portfolio</p>
                        <div className="flex items-center justify-start w-full mb-8 border border-dashed border-indigo-700 rounded-lg p-3">
                            <div className="cursor-pointer text-indigo-700 dark:text-indigo-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-cloud-upload" width={48} height={48} viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <path d="M7 18a4.6 4.4 0 0 1 0 -9h0a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
                                    <polyline points="9 15 12 12 15 15" />
                                    <line x1={12} y1={12} x2={12} y2={21} />
                                </svg>
                            </div>
                            <div className="flex text-sm text-gray-600">
                          <label
                            for="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                            />
                          </label>
                        </div>
                        </div>
                    </div>

                      </div>
                      {/*footer*/}
                     <div className="flex items-center justify-center border-t border-solid border-slate-200 rounded-b">
                     <div className="flex items-center justify-end p-6 rounded-b">
                        <button
                          className="text-green-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          Submit
                        </button>
                      </div>
                      <div className="flex items-center justify-end p-6">
                        <button
                          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </button>
                      </div>
                     </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : null}

            <div className="w-full flex justify-center py-12" id="button"></div>
          </div>
        </div>
        <div className="bg-[#d3f7f4] rounded-full flex gap-2 px-4 absolute -top-16 lg:right-0 justify-center items-center xs:-mt-72 xs:ml-28">
          <button className="" onClick={() => setShowModal(!showModal)}>
            <p className="text-base text-[#377D71] font-semibold">
              Prescription Upload
            </p>
          </button>
          <div className="bg-[#F0EBE3] w-8 h-8 rounded-full overflow-hidden drop-shadow-xl">
            <FcInspection className="w-full h-full object-contain drop-shadow-xl" />
          </div>
        </div>
        <middleware {...showModal} {...setShowModal} />
      </div>
    </>
  );
};

export default PrescriptionContainer;

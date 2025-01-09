import React, { useState } from "react";
import { FcInspection } from "react-icons/fc";

const PrescriptionContainer = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div>
        <div>
          <div>
            {showModal ? (
              <>
                albal
              </>
            ) : null}

            <div className="w-full flex justify-center py-12" id="button"></div>
          </div>
        </div>
        <div className="prescrption bg-[#d3f7f4] rounded-full flex gap-2 px-4 md:ml-[36.5rem] md:mt-4 absolute justify-center items-center invisible md:visible z-20">
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

import React from "react";

const AlreadyHaveSeen = () => {
  return (
    <>
      <div className="py-10">
        <div className="flex items-start">
          <div className="mx-auto mr-6 container bg-white shadow rounded w-full">
            <div className="w-full overflow-x-scroll xl:overflow-x-hidden">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Serial No
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Order No
                    </th>
                    <th scope="col" className="py-3 px-6">
                      User Name
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Company Name
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Medicine Name
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="h-0 border-gray-300 dark:border-gray-200 border-b">
                    <td className="text-sm p-6 whitespace-no-wrap text-gray-800 dark:text-gray-100">
                      id
                    </td>
                    <td className="text-sm p-12 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                      name
                    </td>
                    <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                      create at
                    </td>
                    <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                      update at
                    </td>
                    <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                      gfhjyujcf
                    </td>
                    <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                      gfhjyujcf
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AlreadyHaveSeen;

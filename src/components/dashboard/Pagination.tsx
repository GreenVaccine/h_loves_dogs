"use client";
import React from "react";
import { Pagination, Select, TextInput } from "flowbite-react";
import { TablePaginationType } from "@/types/components";

const TablePagination = (props: TablePaginationType) => {
  const {
    page,
    total,
    perPage,
    breedsLeng,
    handleGoPageNumber,
    handlePerPageChange,
    handlePageNumChange,
  } = props;
  return breedsLeng > 0 ? (
    <div className="flex lg:flex-row flex-col justify-between px-6 items-end">
      <div className="flex items-center justify-center lg:w-3/5 w-full lg:mb-0 mb-2 overflow-x-auto">
        <Pagination
          layout="pagination"
          currentPage={page}
          totalPages={Math.ceil(total / Number(perPage))}
          showIcons
          onPageChange={handlePageNumChange}
        />
      </div>
      <div className="flex justify-between justify-center lg:w-2/5 w-full">
        <div className="flex items-center">
          <label className="hidden sm:flex text-sm font-medium text-gray-700">
            Per Page:
          </label>
          <Select
            value={perPage}
            onChange={handlePerPageChange}
            className="lg:w-24 md:w-48 w-32"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </Select>
        </div>
        <div className="flex items-center">
          <label className="hidden sm:flex text-sm font-medium text-gray-700">
            Go To:
          </label>
          <TextInput
            type="number"
            className="lg:w-24 md:w-48 w-32"
            placeholder={`${Math.ceil(total / Number(perPage))}`}
            onChange={handleGoPageNumber}
          />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-row animate-pulse justify-between px-6 items-end">
      <div className="flex h-12 w-96 bg-gray-200 rounded-md" />
      <div className="flex justify-between">
        <div className="flex h-12 w-32 bg-gray-200 rounded-md mr-10" />
        <div className="flex h-12 w-32 bg-gray-200 rounded-md ml-10" />
      </div>
    </div>
  );
};

export default TablePagination;

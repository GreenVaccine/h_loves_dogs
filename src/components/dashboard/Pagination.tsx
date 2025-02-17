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
    <div className="flex flex-row justify-between px-6 items-end">
      <div className="flex items-center w-3/5">
        <Pagination
          layout="pagination"
          currentPage={page}
          totalPages={Math.ceil(total / Number(perPage))}
          showIcons
          onPageChange={handlePageNumChange}
        />
      </div>
      <div className="flex justify-between w-2/5">
        <div className="flex items-center">
          <label className="text-sm font-medium text-gray-700">Per Page:</label>
          <Select
            value={perPage}
            onChange={handlePerPageChange}
            className="w-24"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </Select>
        </div>
        <div className="flex items-center">
          <label className="text-sm font-medium text-gray-700">Go To:</label>
          <TextInput
            type="number"
            className="w-24"
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

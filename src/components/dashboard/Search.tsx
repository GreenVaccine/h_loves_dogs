"use client";
import React from "react";
import { TextInput } from "flowbite-react";
import MultiSelect from "react-select";
import { handleIntegerValidation } from "../validation/dashboard";
import { TableSearchType } from "@/types/components";

const TableSearch = (props: TableSearchType) => {
  const {
    max,
    min,
    setSearch,
    breedsLeng,
    selectBreeds,
    setSearchTerm,
    handleBreedsChange,
    handleMultiSelectOptions,
  } = props;
  return breedsLeng > 0 ? (
    <div className="flex flex-row justify-between px-6 items-end mt-4">
      <div className="flex items-center w-3/5">
        <MultiSelect
          options={handleMultiSelectOptions()}
          isMulti
          value={selectBreeds.map((breed) => ({
            value: breed,
            label: breed,
          }))}
          onInputChange={(value) => setSearchTerm(value)}
          noOptionsMessage={() => "No breeds found"}
          onChange={handleBreedsChange}
          placeholder="Select breeds..."
          className="basic-multi-select w-64"
          classNamePrefix="select"
        />
      </div>
      <div className="flex justify-between w-2/5">
        <div className="flex items-center">
          <label className="text-sm font-medium text-gray-700">MinAge:</label>
          <TextInput
            type="number"
            className="w-24"
            value={min}
            onChange={(e) =>
              setSearch((pre) => ({
                ...pre,
                age: {
                  ...pre.age,
                  min: handleIntegerValidation(e.target.value),
                },
              }))
            }
          />
        </div>
        <div className="flex items-center">
          <label className="text-sm font-medium text-gray-700">MaxAge:</label>
          <TextInput
            type="number"
            className="w-24"
            value={max}
            onChange={(e) =>
              setSearch((pre) => ({
                ...pre,
                age: {
                  ...pre.age,
                  max: handleIntegerValidation(e.target.value),
                },
              }))
            }
          />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-row animate-pulse justify-between px-6 items-end mt-4">
      <div className="flex h-12 w-64 bg-gray-200 rounded-md" />
      <div className="flex justify-between">
        <div className="flex h-12 w-32 bg-gray-200 rounded-md mr-10" />
        <div className="flex h-12 w-32 bg-gray-200 rounded-md ml-10" />
      </div>
    </div>
  );
};

export default TableSearch;

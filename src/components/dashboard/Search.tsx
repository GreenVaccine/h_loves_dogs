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
    <div className="flex lg:flex-row flex-col justify-between px-6 py-3 items-end">
      <div className="flex items-center lg:w-3/5 w-full lg:mr-6">
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
          className="basic-multi-select w-full"
          classNamePrefix="select"
        />
      </div>
      <div className="flex justify-between lg:w-2/5 w-full mt-3">
        <AgeInput
          {...{
            label: "MinAge",
            value: min,
            change: (e) =>
              setSearch((pre) => ({
                ...pre,
                age: {
                  ...pre.age,
                  min: handleIntegerValidation(e.target.value),
                },
              })),
          }}
        />
        <AgeInput
          {...{
            label: "MaxAge",
            value: max,
            change: (e) =>
              setSearch((pre) => ({
                ...pre,
                age: {
                  ...pre.age,
                  max: handleIntegerValidation(e.target.value),
                },
              })),
          }}
        />
      </div>
    </div>
  ) : (
    <div className="flex lg:flex-row flex-col justify-between px-6 py-6 items-end animate-pulse">
      <div className=" flex items-center lg:w-3/5 w-full lg:mr-6 h-12 bg-gray-200 rounded-md" />
      <div className="flex justify-between lg:w-2/5 w-full mt-3">
        <div className="flex h-12 w-32 bg-gray-200 rounded-md mr-10" />
        <div className="flex h-12 w-32 bg-gray-200 rounded-md ml-10" />
      </div>
    </div>
  );
};

const AgeInput = ({
  label,
  value,
  change,
}: {
  label: string;
  value: string;
  change: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex items-center">
      <label className="hidden sm:flex text-sm font-medium text-gray-700">
        {label}:
      </label>
      <TextInput
        type="number"
        placeholder={label}
        className="lg:w-24 md:w-48 w-32"
        value={value}
        onChange={change}
      />
    </div>
  );
};

export default TableSearch;

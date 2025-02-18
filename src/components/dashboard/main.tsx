"use client";
import React, { useEffect, useState } from "react";
import { MultiValue } from "react-select";

import { useSelector, useDispatch } from "react-redux";
import {
  selectDogIDs,
  selectDogs,
  getDogsAction,
  searchDogsIDAction,
} from "@/store/dogs";
import { AppDispatch } from "@/store";
import { dogsType } from "@/types/store";
import { handleIntegerValidation } from "../validation/dashboard";
import TablePagination from "./Pagination";
import TableSearch from "./Search";
import { mainInitialValueType } from "@/types/components";
import TableModal from "./Modal";
import DogTable from "./DogTable";

const Main = () => {
  const { dogs, total, breeds, loading } = useSelector(selectDogs);
  const dogIds = useSelector(selectDogIDs);
  const dispatch = useDispatch<AppDispatch>();
  const breedsLeng = breeds.length;
  const initialValue: mainInitialValueType = {
    page: { number: 1, perPage: 10 },
    selectBreeds: [],
    age: { max: "", min: "" },
    sort: "",
  };
  const [selectedDog, setSelectedDog] = useState<dogsType | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<mainInitialValueType>(initialValue);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSendDogID = (page?: number) => {
    let params = {
      sort: search.sort,
      breeds: search.selectBreeds,
      size: search.page.perPage,
      from: page || (search.page.number - 1) * search.page.perPage,
    };
    if (search.age.min !== "" && search.age.max !== "") {
      return {
        ...params,
        ageMax: Number(search.age.max),
        ageMin: Number(search.age.min),
      };
    } else if (search.age.min !== "") {
      return {
        ...params,
        ageMin: Number(search.age.min),
      };
    } else if (search.age.max !== "") {
      return {
        ...params,
        ageMax: Number(search.age.max),
      };
    } else {
      return {
        ...params,
      };
    }
  };

  useEffect(() => {
    dispatch(getDogsAction());
  }, [dogIds]);

  useEffect(() => {
    dispatch(searchDogsIDAction(handleSendDogID()));
  }, [search.page.perPage, search.page.number, search.sort]);

  useEffect(() => {
    dispatch(searchDogsIDAction(handleSendDogID(1)));
  }, [search.selectBreeds, search.age]);

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearch((pre) => ({
      ...pre,
      page: { perPage: Number(event.target.value), number: 1 },
    }));
  };

  const handlePageNumChange = (page: number) => {
    setSearch((pre) => ({
      ...pre,
      page: { ...pre.page, number: page },
    }));
  };

  const handleGoPageNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number = Number(
      handleIntegerValidation(
        e.target.value,
        Math.ceil(total / Number(search.page.perPage))
      )
    );
    setSearch((pre) => ({
      ...pre,
      page: { ...pre.page, number: number === 0 ? 1 : number },
    }));
  };

  const handleMultiSelectOptions = () => {
    const options = breeds
      .filter((breed) => breed.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, Math.max(5, search.selectBreeds.length + 5))
      .map((breed) => ({ value: breed, label: breed }));
    return options;
  };

  const handleBreedsChange = (
    newValue: MultiValue<{ value: string; label: string }>
  ) => {
    const selectBreeds = newValue.map((opt) => opt.value);
    setSearch((pre) => ({ ...pre, selectBreeds }));
  };

  const handleSort = (key: string) => {
    setSearch((prevState) => {
      if (prevState.sort.startsWith(key)) {
        if (prevState.sort.endsWith("asc")) {
          return { ...prevState, sort: `${key}:desc` };
        } else if (prevState.sort.endsWith("desc")) {
          return { ...prevState, sort: "" };
        } else {
          return { ...prevState, sort: `${key}:asc` };
        }
      }

      return { ...prevState, sort: `${key}:asc` };
    });
  };

  const openModal = (dog: dogsType) => {
    setSelectedDog(dog);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedDog(null);
  };

  return (
    <div className="rounded-sm shadow-dark-md bg-white dark:bg-darkgray py-6 px-0 relative w-full break-words">
      <div className="px-6 ">
        <h5 className="card-title">Let's search your favorite dogs!</h5>
        <div className="border-black border-b-[3px] border-solid"></div>
      </div>
      <TableSearch
        {...{
          setSearch,
          breedsLeng,
          setSearchTerm,
          handleBreedsChange,
          max: search.age.max,
          min: search.age.min,
          handleMultiSelectOptions,
          selectBreeds: search.selectBreeds,
        }}
      />
      <div className="mb-6" />
      <TablePagination
        {...{
          total,
          breedsLeng,
          handleGoPageNumber,
          handlePageNumChange,
          handlePerPageChange,
          page: search.page.number,
          perPage: search.page.perPage,
        }}
      />
      <DogTable
        {...{
          dogs,
          loading,
          openModal,
          handleSort,
          sort: search.sort,
          perPage: search.page.perPage,
        }}
      />
      <TablePagination
        {...{
          total,
          breedsLeng,
          handleGoPageNumber,
          handlePageNumChange,
          handlePerPageChange,
          page: search.page.number,
          perPage: search.page.perPage,
        }}
      />
      <TableModal {...{ modalOpen, closeModal, selectedDog }} />
    </div>
  );
};

export default Main;

"use client";
import React, { useEffect, useState } from "react";
import { Pagination, Button, Select, TextInput, Modal } from "flowbite-react";
import MultiSelect, { MultiValue } from "react-select";
import { Table } from "flowbite-react";

import Image from "next/image";
import SimpleBar from "simplebar-react";
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

const PopularProducts = () => {
  const { dogs, total, breeds, loading } = useSelector(selectDogs);
  const dogIds = useSelector(selectDogIDs);
  const dispatch = useDispatch<AppDispatch>();
  const initialValue = {
    page: { number: 1, perPage: 10 },
    selectBreeds: [] as string[],
    age: { max: "", min: "" },
    sort: "",
  };
  const [selectedDog, setSelectedDog] = useState<dogsType | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState(initialValue);
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
    <div className="rounded-sm dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray py-6 px-0 relative w-full break-words">
      <div className="px-6">
        <h5 className="card-title">We love dogs</h5>
      </div>
      <div className="flex flex-row animate-pulse justify-between px-6 items-end">
        <div className="flex h-12 w-96 bg-gray-200 rounded-md" />
        <div className="flex justify-between">
          <div className="flex h-12 w-32 bg-gray-200 rounded-md mr-10" />
          <div className="flex h-12 w-32 bg-gray-200 rounded-md ml-10" />
        </div>
      </div>
      <div className="flex flex-row justify-between px-6 items-end">
        <div className="flex items-center w-3/5">
          <Pagination
            layout="pagination"
            currentPage={search.page.number}
            totalPages={Math.ceil(total / Number(search.page.perPage))}
            showIcons
            onPageChange={handlePageNumChange}
          />
        </div>
        <div className="flex justify-between w-2/5">
          <div className="flex items-center">
            <label className="text-sm font-medium text-gray-700">
              Per Page:
            </label>
            <Select
              value={search.page.perPage}
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
              placeholder={`${Math.ceil(total / Number(search.page.perPage))}`}
              onChange={handleGoPageNumber}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row animate-pulse justify-between px-6 items-end mt-4">
        <div className="flex h-12 w-64 bg-gray-200 rounded-md" />
        <div className="flex justify-between">
          <div className="flex h-12 w-32 bg-gray-200 rounded-md mr-10" />
          <div className="flex h-12 w-32 bg-gray-200 rounded-md ml-10" />
        </div>
      </div>
      <div className="flex flex-row justify-between px-6 items-end mt-4">
        <div className="flex items-center w-3/5">
          <MultiSelect
            options={handleMultiSelectOptions()}
            isMulti
            value={search.selectBreeds.map((breed) => ({
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
              value={search.age.min}
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
              value={search.age.max}
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
      <div className="mb-6" />
      <SimpleBar className="max-h-full">
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className="p-6">Photo</Table.HeadCell>
              <Table.HeadCell
                onClick={() => handleSort("name")}
                style={{ cursor: "pointer" }}
              >
                Name
                {search.sort.startsWith("name") && (
                  <span>{search.sort.endsWith("asc") ? " ↑" : " ↓"}</span>
                )}
              </Table.HeadCell>
              <Table.HeadCell
                onClick={() => handleSort("breed")}
                style={{ cursor: "pointer" }}
              >
                Breed
                {search.sort.startsWith("breed") && (
                  <span>{search.sort.endsWith("asc") ? " ↑" : " ↓"}</span>
                )}
              </Table.HeadCell>
              <Table.HeadCell
                onClick={() => handleSort("age")}
                style={{ cursor: "pointer" }}
              >
                Age
                {search.sort.startsWith("age") && (
                  <span>{search.sort.endsWith("asc") ? " ↑" : " ↓"}</span>
                )}
              </Table.HeadCell>
              <Table.HeadCell>Location</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y divide-border dark:divide-darkborder ">
              {loading
                ? new Array(search.page.perPage)
                    .fill(0)
                    .map((_, index: number) => (
                      <Table.Row key={index}>
                        <Table.Cell className="whitespace-nowrap ps-6">
                          <div className="flex animate-pulse items-center">
                            <div className="h-[60px] w-[60px] bg-gray-200 rounded-md" />
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <div className="flex animate-pulse items-center ">
                            <div className="h-6 w-20 bg-gray-200 rounded-md" />
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <div className="flex animate-pulse items-center ">
                            <div className="h-6 w-32 bg-gray-200 rounded-md" />
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <div className="flex animate-pulse items-center ">
                            <div className="h-6 w-8 bg-gray-200 rounded-md" />
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <div className="flex animate-pulse items-center ">
                            <div className="h-6 w-64 bg-gray-200 rounded-md" />
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    ))
                : dogs.map((dog, index) => (
                    <Table.Row key={index} onClick={() => openModal(dog)}>
                      <Table.Cell className="whitespace-nowrap ps-6">
                        <div className="flex items-center">
                          <Image
                            src={dog.img}
                            alt="icon"
                            width={60}
                            height={60}
                            className="h-[60px] w-[60px] rounded-md"
                          />
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="truncat line-clamp-2 sm:text-wrap max-w-56">
                          <h6 className="text-sm">{dog.name}</h6>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="text-sm font-medium text-dark opacity-70 mb-2 text-wrap">
                          {dog.breed}
                        </div>
                      </Table.Cell>
                      <Table.Cell>{dog.age}</Table.Cell>
                      <Table.Cell>
                        {dog.zip_code
                          ? `${dog.zip_code.city}, ${dog.zip_code?.county}, ${dog.zip_code?.state}`
                          : "N/A"}
                      </Table.Cell>
                    </Table.Row>
                  ))}
            </Table.Body>
          </Table>
        </div>
      </SimpleBar>
      <div className="flex flex-row justify-between px-6 items-end">
        <div className="flex items-center w-3/5">
          <Pagination
            layout="pagination"
            currentPage={search.page.number}
            totalPages={Math.ceil(total / Number(search.page.perPage))}
            showIcons
            onPageChange={handlePageNumChange}
          />
        </div>
        <div className="flex justify-between w-2/5">
          <div className="flex items-center">
            <label className="text-sm font-medium text-gray-700">
              Per Page:
            </label>
            <Select
              value={search.page.perPage}
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
              placeholder={`${Math.ceil(total / Number(search.page.perPage))}`}
              onChange={handleGoPageNumber}
            />
          </div>
        </div>
      </div>
      <Modal show={modalOpen} onClose={closeModal}>
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <div className="flex flex-col items-center">
            {selectedDog === null ? (
              <div className="grid col-span-full animate-pulse items-center">
                <div className="flex flex-row justify-between">
                  <div className="h-6 w-20 bg-gray-200 rounded-md" />
                  <div className="h-6 w-32 bg-gray-200 rounded-md" />
                </div>
                <div className="flex flex-row justify-between">
                  <div className="h-6 w-8 bg-gray-200 rounded-md" />
                  <div className="h-6 w-64 bg-gray-200 rounded-md" />
                </div>
                <div className="h-[300px] w-[400px] bg-gray-200 rounded-md mb-4" />
              </div>
            ) : (
              <div className="grid col-span-full items-center">
                <div className="flex flex-row justify-between">
                  <div>
                    <strong>Name: {selectedDog.name}</strong>
                  </div>
                  <div>
                    <strong>Breed: {selectedDog.breed}</strong>
                  </div>
                </div>
                <div className="flex flex-row justify-between">
                  <div>
                    <strong>Age: {selectedDog.age} years</strong>
                  </div>
                  <div>
                    <strong>
                      {" "}
                      Location:{" "}
                      {selectedDog.zip_code
                        ? `${selectedDog.zip_code.city}, ${selectedDog.zip_code?.county}, ${selectedDog.zip_code?.state}`
                        : "N/A"}
                    </strong>
                  </div>
                </div>
                <div className="h-[300px] w-[400px] rounded-md mb-4">
                  {selectedDog.img && (
                    <Image
                      src={selectedDog.img}
                      alt={selectedDog.name}
                      width={400}
                      height={300}
                      className="rounded-md"
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PopularProducts;

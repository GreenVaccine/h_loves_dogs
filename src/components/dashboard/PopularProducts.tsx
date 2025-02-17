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
  const { dogs, total, breeds } = useSelector(selectDogs);
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

  if (dogs.length < 1) {
    return <></>;
  }

  return (
    <div className="rounded-lg dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray py-6 px-0 relative w-full break-words">
      <div className="px-6">
        <h5 className="card-title">We love dogs</h5>
        {/* <p className="card-subtitle">Total 9k Visitors</p> */}
      </div>
      <div className="flex flex-row justify-between px-10 items-end">
        <div className="flex items-center w-1/2">
          <Pagination
            layout="pagination"
            currentPage={search.page.number}
            totalPages={Math.ceil(total / Number(search.page.perPage))}
            showIcons
            onPageChange={handlePageNumChange}
          />
        </div>
        <div className="flex justify-between w-1/2">
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
              onChange={(e) =>
                setSearch((pre) => ({
                  ...pre,
                  page: {
                    ...pre.page,
                    number: Number(
                      handleIntegerValidation(
                        e.target.value,
                        Math.ceil(total / Number(search.page.perPage))
                      )
                    ),
                  },
                }))
              }
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between px-10 items-end mt-4">
        <div className="flex items-center w-1/2">
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
        <div className="flex justify-between w-1/2">
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
                Age{" "}
                {search.sort.startsWith("age") && (
                  <span>{search.sort.endsWith("asc") ? " ↑" : " ↓"}</span>
                )}
              </Table.HeadCell>
              <Table.HeadCell>ZipCode</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y divide-border dark:divide-darkborder ">
              {dogs.map((dog, index) => (
                <Table.Row key={index}>
                  <Table.Cell
                    className="whitespace-nowrap ps-6"
                    onClick={() => openModal(dog)}
                  >
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
      <Modal show={modalOpen} onClose={closeModal}>
        <Modal.Header>{selectedDog?.name}</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col items-center">
            {selectedDog?.img && (
              <Image
                src={selectedDog.img}
                alt={selectedDog.name}
                width={800}
                height={600}
                className="rounded-md mb-4"
              />
            )}
            <p>
              <strong>Breed:</strong> {selectedDog?.breed}
            </p>
            <p>
              <strong>Age:</strong> {selectedDog?.age} years
            </p>
            <p>
              <strong>Zip Code:</strong>{" "}
              {selectedDog?.zip_code
                ? `${selectedDog?.zip_code.city}, ${selectedDog?.zip_code?.county}, ${selectedDog?.zip_code?.state}`
                : "N/A"}
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PopularProducts;

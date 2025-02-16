"use client";
import React, { useEffect, useState } from "react";
import { Pagination, Button, Select, TextInput } from "flowbite-react";
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
  getLocationsAction,
} from "@/store/dogs";
import { AppDispatch } from "@/store";

const PopularProducts = () => {
  const { dogs, total, breeds, locations } = useSelector(selectDogs);
  const dogIds = useSelector(selectDogIDs);
  const dispatch = useDispatch<AppDispatch>();
  const initialValue = {
    page: { number: 1, perPage: 10 },
    selectBreeds: [] as string[],
    age: { max: "", min: "" },
    sort: "",
  };
  const initialLocation = {
    city: "",
    state: "",
    country: "",
  };
  const [search, setSearch] = useState(initialValue);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [location, setLocation] = useState(initialLocation);

  useEffect(() => {
    dispatch(getDogsAction());
  }, [dogIds]);

  useEffect(() => {
    dispatch(getLocationsAction({ ...location, size: 1 }));
  }, [location]);

  useEffect(() => {
    if (locations.total < 1000)
      dispatch(getLocationsAction({ ...location, size: locations.total }));
  }, [locations.total]);

  useEffect(() => {
    dispatch(
      searchDogsIDAction({
        size: search.page.perPage,
        from: search.page.number * search.page.perPage,
      })
    );
  }, [search.page.perPage, search.page.number]);

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearch((pre) => ({
      ...pre,
      page: { perPage: Number(event.target.value), number: 1 },
    }));
  };

  const handlePageNumChange = (page: number) => {
    setSearch((pre) => ({
      ...pre,
      page: { perPage: pre.page.perPage, number: page },
    }));
  };

  const handleMultiSelectOptions = () => {
    const options = breeds
      .filter((breed) => breed.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, Math.max(5, search.selectBreeds.length + 5))
      .map((breed) => ({ value: breed, label: breed }));
    return options;
  };

  const handleLocationChange = (
    field: keyof typeof location,
    value: string
  ) => {
    setLocation((prev) => ({ ...prev, [field]: value }));
  };

  const handleBreedsChange = (
    newValue: MultiValue<{ value: string; label: string }>
  ) => {
    const selectBreeds = newValue.map((opt) => opt.value);
    setSearch((pre) => ({ ...pre, selectBreeds }));
  };

  if (dogs.length < 1) {
    return <></>;
  }

  return (
    <div className="rounded-lg dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray py-6 px-0 relative w-full break-words">
      <div className="px-6">
        <h5 className="card-title">Popular Products</h5>
        <p className="card-subtitle">Total 9k Visitors</p>
      </div>
      <Pagination
        layout="pagination"
        currentPage={search.page.number}
        totalPages={total}
        showIcons
        onPageChange={handlePageNumChange}
      />
      <div className="mb-4 flex items-center gap-3">
        <label className="text-sm font-medium text-gray-700">Per Page:</label>
        <Select
          value={search.page.perPage}
          onChange={handlePerPageChange}
          className="w-24"
        >
          <option value="10">10</option>
          <option value="25">25</option>
        </Select>
      </div>
      <div className="w-64">
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
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>
      <TextInput
        type="number"
        value={search.age.min}
        onChange={(e) =>
          setSearch((pre) => ({
            ...pre,
            age: { ...pre.age, min: e.target.value },
          }))
        }
      ></TextInput>
      <TextInput
        type="number"
        value={search.age.max}
        onChange={(e) =>
          setSearch((pre) => ({
            ...pre,
            age: { ...pre.age, max: e.target.value },
          }))
        }
      ></TextInput>
      <TextInput
        type="text"
        value={location.city}
        onChange={(e) =>
          setLocation((pre) => ({ ...pre, city: e.target.value }))
        }
      ></TextInput>
      <TextInput
        type="text"
        value={location.country}
        onChange={(e) =>
          setSearch((pre) => ({ ...pre, country: e.target.value }))
        }
      ></TextInput>
      <TextInput
        type="text"
        value={location.state}
        onChange={(e) =>
          setSearch((pre) => ({ ...pre, state: e.target.value }))
        }
      ></TextInput>

      <Button className="text-black" onClick={() => console.log(search)}>
        Search
      </Button>
      <Button className="text-black" onClick={() => setSearch(initialValue)}>
        Reset
      </Button>

      <SimpleBar className="max-h-full">
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className="p-6">Photo</Table.HeadCell>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Breed</Table.HeadCell>
              <Table.HeadCell>Age</Table.HeadCell>
              <Table.HeadCell>ZipCode</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y divide-border dark:divide-darkborder ">
              {dogs.map((item, index) => (
                <Table.Row key={index}>
                  <Table.Cell className="whitespace-nowrap ps-6">
                    <div className="flex gap-3 items-center">
                      <Image
                        src={item.img}
                        alt="icon"
                        width={60}
                        height={60}
                        className="h-[60px] w-[60px] rounded-md"
                      />
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="truncat line-clamp-2 sm:text-wrap max-w-56">
                      <h6 className="text-sm">{item.name}</h6>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="text-sm font-medium text-dark opacity-70 mb-2 text-wrap">
                      {item.breed}
                    </div>
                    {/* <div className="me-5">
                      <Progress
                        progress={item.process}
                        color={`${item.processcolor}`}
                        className={`${item.processcolor}`}
                        size={"sm"}
                      />
                    </div> */}
                  </Table.Cell>
                  <Table.Cell>
                    {/* <Badge
                      color={`light${item.statuscolor}`}
                      className={`text-${item.statuscolor}`}
                    > */}
                    {item.age}
                    {/* </Badge> */}
                  </Table.Cell>
                  <Table.Cell>
                    {item.zip_code.city}, {item.zip_code.county},{" "}
                    {item.zip_code.state}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </SimpleBar>
    </div>
  );
};

export default PopularProducts;

"use client";
import React from "react";
import Image from "next/image";

import { Icon } from "@iconify/react";
import { Table } from "flowbite-react";
import SimpleBar from "simplebar-react";

import { DogTableType } from "@/types/components";

const DogTable = (props: DogTableType) => {
  const { sort, perPage, loading, handleSort, dogs, openModal } = props;
  return (
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
              {sort.startsWith("name") && (
                <span>{sort.endsWith("asc") ? " ↑" : " ↓"}</span>
              )}
            </Table.HeadCell>
            <Table.HeadCell
              onClick={() => handleSort("breed")}
              style={{ cursor: "pointer" }}
            >
              Breed
              {sort.startsWith("breed") && (
                <span>{sort.endsWith("asc") ? " ↑" : " ↓"}</span>
              )}
            </Table.HeadCell>
            <Table.HeadCell
              onClick={() => handleSort("age")}
              style={{ cursor: "pointer" }}
            >
              Age
              {sort.startsWith("age") && (
                <span>{sort.endsWith("asc") ? " ↑" : " ↓"}</span>
              )}
            </Table.HeadCell>
            <Table.HeadCell>Location</Table.HeadCell>
            <Table.HeadCell>Best Adoption</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y divide-border dark:divide-darkborder ">
            {loading
              ? new Array(perPage).fill(0).map((_, index: number) => (
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
                    <Table.Cell>
                      <div className="flex animate-pulse items-center ">
                        <div className="h-6 w-6 bg-gray-200 rounded-md" />
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
                        ? `${dog.zip_code.zip_code}, ${dog.zip_code.city}, ${dog.zip_code?.county}, ${dog.zip_code?.state}`
                        : `N/A`}
                    </Table.Cell>
                    <Table.Cell>
                      {dog.adoption ? (
                        <Icon
                          className="text-primary"
                          icon="solar:medal-ribbons-star-bold-duotone"
                          height={40}
                        />
                      ) : (
                        <Icon
                          className="text-error"
                          icon="solar:medal-ribbons-star-bold-duotone"
                          height={40}
                        />
                      )}
                    </Table.Cell>
                  </Table.Row>
                ))}
          </Table.Body>
        </Table>
      </div>
    </SimpleBar>
  );
};

export default DogTable;

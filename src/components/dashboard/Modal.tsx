"use client";
import React from "react";
import { Modal } from "flowbite-react";

import Image from "next/image";
import { TableModalType } from "@/types/components";

const TableModal = (props: TableModalType) => {
  const { selectedDog, modalOpen, closeModal } = props;
  return (
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
              <div className="flex sm:flex-row flex-col justify-between px-2 py-2">
                <div>
                  <strong>Name: {selectedDog.name}</strong>
                </div>
                <div>
                  <strong>Breed: {selectedDog.breed}</strong>
                </div>
              </div>
              <div className="flex sm:flex-row flex-col justify-between px-2 py-2">
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
  );
};

export default TableModal;

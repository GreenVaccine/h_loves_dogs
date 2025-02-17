"use client";
import React, { useEffect } from "react";
import Main from "@/components/dashboard/main";

import { getBreedsAction } from "@/store/dogs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";

const page = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getBreedsAction());
  }, []);

  return (
    <>
      <div className="grid grid-cols-12 gap-30 bg-muted dark:bg-dark">
        <div className="col-span-12 mb-2">
          <Main />
        </div>
      </div>
    </>
  );
};

export default page;

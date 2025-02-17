"use client";
import React, { useEffect } from "react";
import PopularProducts from "@/components/dashboard/PopularProducts";
import Link from "next/link";

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
          <PopularProducts />
        </div>
      </div>
    </>
  );
};

export default page;

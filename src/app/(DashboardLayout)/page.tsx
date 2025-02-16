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
      <div className="grid grid-cols-12 gap-30">
        <div className="col-span-12">
          <PopularProducts />
        </div>
        <div className="col-span-12 text-center">
          <p className="text-base">
            Design and Developed by{" "}
            <Link
              href="https://wrappixel.com"
              target="_blank"
              className="pl-1 text-primary underline decoration-primary"
            >
              wrappixel.com
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default page;

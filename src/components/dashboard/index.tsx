"use client";
import React, { useEffect } from "react";
import Sidebar from "@/app/(DashboardLayout)/layout/vertical/sidebar/Sidebar";
import Header from "@/app/(DashboardLayout)/layout/vertical/header/Header";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { signInAction } from "@/store/auth";

const DashBoardIndex = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(signInAction());
  }, []);

  return (
    <div className="flex w-full min-h-screen">
      <div className="page-wrapper flex w-full">
        <Sidebar />
        <div className="body-wrapper w-full bg-lightgray dark:bg-dark">
          <Header />
          <div className="container bg-muted mx-auto py-30">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardIndex;

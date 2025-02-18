"use client";
import React from "react";
import Header from "@/app/(DashboardLayout)/layout/Header";

import BoxedLogin from "@/app/(DashboardLayout)/auth/login/page";
import AuthIndex from "../auth";

const DashBoardIndex = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = AuthIndex();

  if (!isLoggedIn) {
    return <BoxedLogin />;
  }

  return (
    <div className="flex w-full min-h-screen">
      <div className="body-wrapper w-full bg-muted dark:bg-dark">
        <Header />
        <div className="container mx-auto py-30">{children}</div>
      </div>
    </div>
  );
};

export default DashBoardIndex;

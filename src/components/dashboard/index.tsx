"use client";
import React, { useEffect, useState } from "react";
import Header from "@/app/(DashboardLayout)/layout/Header";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { selectLoginState, signInAction } from "@/store/auth";
import { useSelector } from "react-redux";
import FashionLoading from "@/components/common/loading";
import BoxedLogin from "@/app/(DashboardLayout)/auth/login/page";

const DashBoardIndex = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loginState, loading } = useSelector(selectLoginState);
  const [isLoggedIn, setIsLoggedIn] = useState(loginState);

  useEffect(() => {
    const name = localStorage.getItem("name") || "";
    const email = localStorage.getItem("email") || "";

    if (
      name !== "" &&
      name !== "undefined" &&
      email !== "" &&
      email !== "undefined"
    ) {
      dispatch(signInAction({ name, email }));
    }
    setIsLoggedIn(loginState);
  }, [loginState]);

  if (loading) {
    return <FashionLoading />;
  }

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

"use client";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import React, { useState, useEffect } from "react";
import AuthLogin from "../authforms/AuthLogin";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { selectLoginState, signInAction } from "@/store/auth";
import { useSelector } from "react-redux";
import FashionLoading from "@/components/common/loading";
import Layout from "@/app/(DashboardLayout)/layout";
import Main from "@/components/dashboard/main";

const BoxedLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loginState, loading } = useSelector(selectLoginState);
  const [isLoggedIn, setIsLoggedIn] = useState(loginState);

  useEffect(() => {
    const name = localStorage.getItem("name") || "";
    const email = localStorage.getItem("email") || "";
    console.log(name, email);
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

  if (isLoggedIn) {
    return (
      <Layout>
        <Main />
      </Layout>
    );
  }

  return (
    <div className="relative overflow-hidden h-screen bg-muted dark:bg-dark">
      <div className="flex h-full justify-center items-center px-4">
        <div className="rounded-lg dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words md:w-[450px] w-full border-none ">
          <div className="flex h-full flex-col justify-center gap-2 p-0 w-full">
            <div className="flex px-24 justify-center">
              <Logo />
            </div>
            <p className="text-sm text-center text-dark my-3">👨‍👩‍👦 Love 🐶</p>
            <AuthLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxedLogin;

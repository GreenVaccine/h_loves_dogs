"use client";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import React from "react";
import AuthLogin from "../authforms/AuthLogin";

import Layout from "@/app/(DashboardLayout)/layout";
import Main from "@/components/dashboard/main";
import AuthIndex from "@/components/auth";

const BoxedLogin = () => {
  const isLoggedIn = AuthIndex();

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

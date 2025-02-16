"use client";
import React from "react";
import DashBoardIndex from "@/components/dashboard";
import { Provider } from "react-redux";
import store from "@/store";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <DashBoardIndex {...{ children }} />
    </Provider>
  );
}

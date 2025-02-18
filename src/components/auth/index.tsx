"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { selectLoginState, signInAction } from "@/store/auth";
import FashionLoading from "@/components/common/loading";

const AuthIndex = () => {
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
      email !== "undefined" &&
      !loginState
    ) {
      dispatch(signInAction({ name, email }));
    }
    setIsLoggedIn(loginState);
  }, [loginState]);

  if (loading) {
    return <FashionLoading />;
  }
  return isLoggedIn;
};

export default AuthIndex;

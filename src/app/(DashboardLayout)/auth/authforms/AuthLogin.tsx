"use client";
import React, { useState } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { AppDispatch } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { selectLoginState, setStoreAction, signInAction } from "@/store/auth";
import { toast } from "react-toastify";

const AuthLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector(selectLoginState);
  const [userData, setUserData] = useState({ name: "", email: "" });

  const handleSubmit = () => {
    if (!userData.name || !userData.email) {
      toast.error("Please fill in both Name and Email.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    if (userData.name.length < 3) {
      toast.error("Name must be at least 3 characters long.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userData.email) {
      toast.error("Email is required.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    if (!emailRegex.test(userData.email)) {
      toast.error("Please enter a valid email address.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    dispatch(setStoreAction(userData));
    dispatch(signInAction(userData));
  };

  return (
    <>
      <div className="mb-4">
        <div className="mb-2 block">
          <Label htmlFor="Name" value="Name" />
        </div>
        <TextInput
          id="name"
          type="text"
          sizing="md"
          className="form-control"
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <div className="mb-2 block">
          <Label htmlFor="Email" value="Email" />
        </div>
        <TextInput
          id="email"
          type="email"
          sizing="md"
          className="form-control"
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
      </div>
      <div className="flex justify-between my-5">
        <div className="flex items-center gap-2"></div>
      </div>
      <Button
        color={"primary"}
        onClick={handleSubmit}
        className="w-full text-primary border border-primary border-solid rounded-3xl hover:bg-primary hover:text-white hover:border-white"
        disabled={loading}
      >
        Sign in
      </Button>
    </>
  );
};

export default AuthLogin;

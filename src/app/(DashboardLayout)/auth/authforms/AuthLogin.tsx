"use client";
import React from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { AppDispatch } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { selectLoginLoading, signInAction } from "@/store/auth";

const AuthLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectLoginLoading);
  return (
    <>
      <div className="mb-4">
        <div className="mb-2 block">
          <Label htmlFor="Name" value="Name" />
        </div>
        <TextInput id="name" type="text" sizing="md" className="form-control" />
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
        />
      </div>
      <div className="flex justify-between my-5">
        <div className="flex items-center gap-2">
          <Checkbox id="accept" className="checkbox" />
          <Label
            htmlFor="accept"
            className="opacity-90 font-normal cursor-pointer"
          >
            Remeber this Device
          </Label>
        </div>
      </div>
      <Button
        color={"primary"}
        onClick={() => dispatch(signInAction())}
        className="w-full"
        disabled={loading}
      >
        Sign in
      </Button>
    </>
  );
};

export default AuthLogin;

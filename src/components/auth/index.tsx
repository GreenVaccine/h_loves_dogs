"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectLoginState } from "@/store/auth";
import { useRouter } from "next/navigation";

const AuthIndex = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const loginState = useSelector(selectLoginState);

  useEffect(() => {
    if (!loginState) {
      router.push("/auth/login");
    }
  }, [loginState, router]);

  return <>{children}</>;
};

export default AuthIndex;

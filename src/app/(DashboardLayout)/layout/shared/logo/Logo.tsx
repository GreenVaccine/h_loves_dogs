"use client";
import React from "react";
import Image from "next/image";
import LogoIcon from "/public/logo.png";
const Logo = () => {
  return <Image src={LogoIcon} alt="logo" />;
};

export default Logo;

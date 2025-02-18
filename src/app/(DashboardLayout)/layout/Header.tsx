"use client";
import React, { useState, useEffect } from "react";
import { Navbar } from "flowbite-react";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { signOutAction } from "@/store/auth";
import { AppDispatch } from "@/store";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-[5] ${
        isSticky
          ? "bg-gradient-to-tr to-blue-400 from-green-500 shadow-md fixed w-full"
          : "bg-gradient-to-tr to-blue-400 from-green-500"
      }`}
    >
      <Navbar
        fluid
        className={` rounded-none bg-transparent dark:bg-transparent py-4 sm:px-30 px-4`}
      >
        {/* Mobile Toggle Icon */}

        <div className="flex gap-3 items-center justify-between w-full ">
          <div className="flex gap-2 items-center justify-center">
            <div className="w-full">
              <h1 className="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 text-4xl text-white font-bold">
                We Love Dogs.🐕‍🦺
              </h1>
            </div>
          </div>
          <span
            className="h-10 w-10 flex text-black dark:text-white text-opacity-65 hover:text-white hover:bg-lightprimary rounded-full justify-center items-center cursor-pointer"
            onClick={() => dispatch(signOutAction())}
          >
            <Icon icon="solar:logout-2-linear" height={21} />
          </span>
        </div>
      </Navbar>
    </header>
  );
};

export default Header;

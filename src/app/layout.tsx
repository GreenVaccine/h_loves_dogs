import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "simplebar-react/dist/simplebar.min.css";
import "./css/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Flowbite, ThemeModeScript } from "flowbite-react";
import customTheme from "@/utils/theme/custom-theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "We love Dogs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
        <ThemeModeScript />
      </head>
      <body className={`${inter.className}`}>
        <Flowbite theme={{ theme: customTheme }}>{children}</Flowbite>
        <ToastContainer />
      </body>
    </html>
  );
}

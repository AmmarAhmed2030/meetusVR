"use client";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function Providers({ children }) {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Provider store={store}>{children}</Provider>
    </>
  );
}

"use client";
import dynamic from "next/dynamic";

const Login = dynamic(() => import("./Login"));

const page = () => {
  return <Login />;
};

export default page;

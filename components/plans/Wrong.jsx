'use client';
import React from "react";
import cancelPng from "@/assets/cancel.webp";
import Image from "next/image";

const Wrong = () => {
  return (
    <Image
      placeholder="blur"
      src={cancelPng}
      height={20}
      width={20}
      alt="Cancel Png"
      loading="lazy"
    />
  );
};

export default Wrong;

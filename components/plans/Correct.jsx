'use client';
import Image from "next/image";
import React from "react";
import correctPng from "@/assets/correct.webp";

const Correct = () => {
  return (
    <Image
      placeholder="blur"
      src={correctPng}
      height={18}
      width={18}
      alt="corectPng"
      loading="lazy"
    />
  );
};

export default Correct;

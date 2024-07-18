"use client";
import React from "react";
import Image from "next/image";
import swiperBtn from "@/assets/swiper-slider-button.png";

const SwiperNavButton = ({ onClick, className }) => {
  return (
    <Image
      placeholder="blur"
      src={swiperBtn}
      height={25}
      width={25}
      loading="lazy"
      alt="Navigation Button"
      className={className}
      onClick={onClick}
    />
  );
};

export default SwiperNavButton;

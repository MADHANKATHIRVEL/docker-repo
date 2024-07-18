"use client";
import React from "react";
import { Swiper, useSwiper } from "swiper/react";
import "swiper/css/bundle";
import "swiper/css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

export default function CommonSwiper({
  children,
  spaceBetween,
  slidesPerView,
  onSwiper,
  breakpoints = null,
  modules = [],
  grid = null,
  slidesPerColumn = null,
  swipeHandler = "",
  className = "",
  key,
  trendingSwiperRef,
}) {
  const swiper = useSwiper();

  return (
    <>
      <Swiper
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        onSwiper={onSwiper}
        modules={modules}
        breakpoints={breakpoints}
        slidesPerColumn={slidesPerColumn}
        grid={grid}
        className={className}
        swipeHandler={swipeHandler}
        key={key}
        ref={trendingSwiperRef}
      >
        {children}
      </Swiper>
    </>
  );
}

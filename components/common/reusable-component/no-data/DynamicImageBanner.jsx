'use client'
import React from "react";
import "./dynamic-image-banner.css";
import Image from "next/image";

const DynamicImageBanner = React.memo(({ image, text = 'NO DATA' }) => {
  return (
    <div className="dynamic-image-banner">
      <div className="bannerimage-container">
        <Image src={image} alt="NO DATA IMAGE" loading="lazy"/>
        <span>{text}</span>
      </div>
    </div>
  );
});

export default DynamicImageBanner;

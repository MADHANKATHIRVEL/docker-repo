'use client';
import React from "react";
import "./static-banner.css";
import Image from "next/image";

const StaticBanner = React.memo(({
  staticBannerImg,
  mainText,
  subText,
  desc,
  rightSection,
  hasRightSection = true,
  formOnRight = false
}) => {
  return (
    <div className="static__banner">
      <div className="static-banner-container">
        <Image placeholder="blur" src={(staticBannerImg)} loading="lazy"  alt="Albion Service Banner"/>
      </div>
      <div className="banner-content">
        <div
          className="left-section"
          style={hasRightSection ? subText === "FREE" ? {width : "100%"} : {} : { width: "100%"}}
        >
          {
            formOnRight ? (
              rightSection
            ) : <>
            {
              subText === "FREE" ? (
                <>
                  <span className="subText">{subText} <span className="main-title">{mainText}</span></span>
                </>
              ) : (
                <>
                  <span className="main-title">{mainText}</span>
                  <span className="subText">{subText}</span>
                </>
              )
            }
              <span className="description">{desc}</span>
            </>
          }
        </div>
        {hasRightSection && !formOnRight && <>{rightSection}</>}
      </div>
    </div>
  );
});

export default StaticBanner;

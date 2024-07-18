"use client";
import { useState } from "react";
import arrowRightIcon from "@/assets/arrow-right-icon.png";
import Image from "next/image";
import "./builder-project.scss";
import { SwiperSlide } from "swiper/react";
import { capitalizeWords, getUrlString } from "@/utils/helpers";
import { builderImages } from "./builder-images";
import Link from "next/link";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";
import SwiperNavButton from "../common/nav/SwiperNavButton";

const CommonSwiper = dynamic(() => import("../common/swiper/CommonSwiper") , {
  ssr : false
});

const BuilderProjects = ({ builderProjects }) => {
  const [swiperRef, setSwiperRef] = useState(null);

  const handlePrevious = () => {
    swiperRef?.slidePrev();
  };

  const handleNext = () => {
    swiperRef?.slideNext();
  };

  return (
    <section
      className={`builder-properties-inner-section ${
        builderProjects.length > 0 ? `` : `set-height-auto`
      }`}
    >
      <div>
        <h3>
          Builder <span>Projects</span>
        </h3>
        <a
          href={`/property/properties-in-${Cookies.get(
            "userLocation"
          )?.toLowerCase()}`}
          target="_blank"
        >
          View All
          <Image
            placeholder="blur"
            src={arrowRightIcon}
            loading="lazy"
            alt="Arrow Right Icon"
          />
        </a>
      </div>
      {builderProjects.length > 0 && (
        <SwiperNavButton
        className="swiper-button-prev-unique-builder"
          onClick={handlePrevious}
        />
      )}
      {builderProjects.length > 0 && (
        <SwiperNavButton
        className="swiper-button-next-unique-builder"
          onClick={handleNext}
        />
      )}
      {!builderProjects || builderProjects.length === 0 ? (
        <center>No Builder Projects Available In Your Location</center>
      ) : (
        <>
          <CommonSwiper
            spaceBetween={10}
            slidesPerView={2}
            className="builder-projects-swiper"
            breakpoints={{
              2560: { slidesPerView: 4 },
              1440: { slidesPerView: 2 },
              1024: { slidesPerView: 2 },
              768: { slidesPerView: 1 },
              425: { slidesPerView: 1 },
              375: { slidesPerView: 1 },
              320: { slidesPerView: 1 },
            }}
            onSwiper={setSwiperRef}
          >
            {builderProjects.map((property, index) => (
              <SwiperSlide
                key={property.p_id}
                className="builder-property-card"
              >
                <Link
                  className="bp-card-link"
                  href={{
                    pathname: `/propertydetails/${getUrlString(property)}-${
                      property.p_id
                    }`,
                  }}
                  as={`/propertydetails/${getUrlString(property)}-${
                    property.p_id
                  }`}
                  target="_blank"
                >
                  <Image
                    src={builderImages[index].src}
                    className="builder-property-image"
                    alt="Builder Property Image"
                    loading="eager"
                    width={570}
                    height={340}
                  />
                  <div className="builder-property-card-content">
                    <div className="builder-property-details">
                      <h3>{capitalizeWords(property.property_name)}</h3>
                      <span className="location-locality">
                      {capitalizeWords(property.locality)},{" "}
                      {capitalizeWords(property.location)}
                      </span>
                      <span className="property-description">
                        {property.description}
                      </span>
                    </div>
                    <p className="builder-property-price">
                      &#x20B9;{" "}
                      {parseInt(property.expected_price, 10).toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </CommonSwiper>
        </>
      )}
    </section>
  );
};

export default BuilderProjects;

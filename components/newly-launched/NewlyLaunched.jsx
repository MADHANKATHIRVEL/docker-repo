"use client";
import "./newly-launched.scss";
import Image from "next/image";
import arrowRightIcon from "@/assets/arrow-right-icon.png";
import noImageFound from "@/assets/no-image-found.webp";
import { capitalizeWords, getUrlString } from "@/utils/helpers";
import bedWebp from "@/assets/beds.webp";
import areaWebp from "@/assets/area.webp";
import bathWebp from "@/assets/baths.webp";
import Link from "next/link";
import { SwiperSlide } from "swiper/react";
import { Grid } from "swiper/modules";
import { useCallback, useState } from "react";
import swiperBtn from "@/assets/swiper-slider-button.png";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";
import "swiper/css/grid";

const CommonSwiper = dynamic(() => import("../common/swiper/CommonSwiper") , {
  ssr : false
});

const NewlyLaunched = ({ property_data }) => {
  const [swiperRef, setSwiperRef] = useState();

  const handlePrevious = useCallback(() => {
    swiperRef?.slidePrev();
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    swiperRef?.slideNext();
  }, [swiperRef]);

  return (
    <section className="newly-launched">
      <div className="newly-launched-properties">
        <div>
          <h3>
            Newly Launched <span>Projects</span>
          </h3>
          <a href={`/property/properties-in-${Cookies.get('userLocation')?.toLowerCase()}`}>
            View All
            <Image placeholder="blur" src={arrowRightIcon} loading="lazy" alt="Arrow Right Icon"/>
          </a>
        </div>
        {property_data.length > 0 && (
          <Image
            placeholder="blur"
            className="swiper-button-prev-unique-newly-launched"
            onClick={handlePrevious}
            src={swiperBtn}
            height={25}
            width={25}
            loading="lazy"
            alt="Newly Launched Previous Image"
          />
        )}
        {property_data.length > 0 && (
          <Image
            placeholder="blur"
            className="swiper-button-next-unique-newly-launched"
            onClick={handleNext}
            src={swiperBtn}
            height={25}
            width={25}
            loading="lazy"
            alt="Newly Launched Next Image"
          />
        )}
        {property_data.length == 0 ||
        property_data.message == "No Properties found" ? (
          <center>No Newly Launched Properties In Your Location</center>
        ) : (
          <div className="properties-new">
            <CommonSwiper
              slidesPerView={2}
              slidesPerColumn={2}
              spaceBetween={15}
              grid={{
                rows: 2,
                fill: "row",
              }}
              onSwiper={setSwiperRef}
              modules={[Grid]}
              className="newly-launched-swiper"
              breakpoints={{
                1600: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 1,
                },
                425: {
                  slidesPerColumn: 1,
                  slidesPerView: 1,
                },
                320: {
                  slidesPerColumn: 1,
                  slidesPerView: 1,
                  style: {
                    textAlign: "left",
                  },
                },
              }}
            >
              {property_data.map((property) => (
                <SwiperSlide key={`${property?.property_name?.toLowerCase()}`}>
                  <Link
                    className="new-property-card"
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
                    <div className="new-property-image">
                      {property.images && property.images.length > 0 ? (
                        <img
                          src={property.images[0].image_url}
                          loading="lazy"
                        />
                      ) : (
                        <Image
                          placeholder="blur"
                          src={noImageFound}
                          loading="lazy"
                          alt="No Image Found"
                        />
                      )}
                      <div class="swiper-lazy-preloader"></div>
                    </div>
                    <div className="new-property-description">
                      <h2>{capitalizeWords(property.property_name)}</h2>
                      <p>
                        {capitalizeWords(property.locality)},{" "}
                        {capitalizeWords(property.location)}
                      </p>
                      <h3>
                        &#x20B9;{" "}
                        {parseInt(property.expected_price).toLocaleString(
                          "en-IN"
                        )}
                      </h3>
                      <span
                        className="newly-launched-property-description"
                      >
                        {property.description}
                      </span>
                      <div className="new-property-features">
                        {property.features.filter(
                          (feature) => feature.title == "bedroom"
                        ) && (
                          <div className="feature-row-np">
                            <Image
                              placeholder="blur"
                              src={bedWebp}
                              loading="lazy"
                              alt="Bed Webp"
                            />
                            <p>
                              {
                                property.features.filter(
                                  (feature) => feature.title == "bedroom"
                                )[0]?.value
                              }{" "}
                              <span>Beds</span>
                            </p>
                          </div>
                        )}
                        {property.features.filter(
                          (feature) => feature.title == "bath"
                        ) && (
                          <div className="feature-row-np">
                            <Image
                              placeholder="blur"
                              src={bathWebp}
                              loading="lazy"
                              alt="Bath Webp"
                            />
                            <p>
                              {
                                property.features.filter(
                                  (feature) => feature.title == "bath"
                                )[0]?.value
                              }{" "}
                              <span>Bath</span>
                            </p>
                          </div>
                        )}
                        {property.area.super_area && (
                          <div className="feature-row-np">
                            <Image
                              placeholder="blur"
                              src={areaWebp}
                              loading="lazy"
                              alt="Area Webp"
                            />
                            <p>{property.area.super_area}</p>
                            <p>{property.area.super_area_unit}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </CommonSwiper>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewlyLaunched;

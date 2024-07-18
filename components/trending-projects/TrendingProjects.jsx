"use client";
import "./trending-project.scss";
import Image from "next/image";
import arrowRightIcon from "@/assets/arrow-right-icon.png";
import { useCallback, useRef, useState } from "react";
import { SwiperSlide } from "swiper/react";
import Link from "next/link";
import { capitalizeWords, getUrlString } from "@/utils/helpers";
import noImageFound from "@/assets/no-image-found.webp";
import bathWebp from "@/assets/baths.webp";
import areaWebp from "@/assets/area.webp";
import bedroomWebp from "@/assets/beds.webp";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";
import SwiperNavButton from "../common/nav/SwiperNavButton";

const CommonSwiper = dynamic(() => import("../common/swiper/CommonSwiper"), {
  ssr: false,
});
const MobileSlider = dynamic(() => import("../common/swiper/MobileSlider"), {
  ssr: false,
});


const TrendingProjects = ({ property_data }) => {
  const [swiperRef, setSwiperRef] = useState();

  const handlePrevious = useCallback(() => {
    swiperRef?.slidePrev();
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    swiperRef?.slideNext();
  }, [swiperRef]);

  return (
    <section
      className={`trending-projects-area ${
        property_data.length > 0 ? `` : `set-height-auto`
      }`}
    >
      <div>
        <h2>
          Trending <span>Projects</span>
        </h2>
        <a
          href={`/property/properties-in-${Cookies.get(
            "userLocation"
          )?.toLowerCase()}`}
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
      {property_data.length > 0 && !property_data.message && (
        <SwiperNavButton
          className="swiper-button-prev-unique-trending-projects"
          onClick={handlePrevious}
        />
      )}
      {property_data.length > 0 && !property_data.message && (
        <SwiperNavButton
          className="swiper-button-next-unique-trending-projects"
          onClick={handleNext}
        />
      )}
      {property_data.length == 0 || property_data.message ? (
        <center>No Trending Project Available In Your Location</center>
      ) : (
        <>
          <CommonSwiper
            spaceBetween={10}
            slidesPerView={4}
            navigation={false}
            className="trending-project-swiper"
            breakpoints={{
              2560: {
                slidesPerView: 6,
              },
              2560: {
                slidesPerView: 5,
              },
              2380: {
                slidesPerView: 5,
              },
              1440: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 3,
              },
              1015: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 2,
              },
              425: {
                slidesPerView: 1,
              },
              375: {
                slidesPerView: 1,
              },
              320: {
                slidesPerView: 1,
              },
            }}
            onSwiper={setSwiperRef}
            key={"trending-project-key"}
          >
            {property_data.map((property) => (
              <SwiperSlide
                className="trending-property-card"
                key={`${property.p_id}${property.property_name}`}
              >
                <Link
                  className="tp-card-link"
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
                    placeholder="blur"
                    src={property?.images[0]?.image_url ?? noImageFound}
                    loading="lazy"
                    width={280}
                    height={150}
                    alt="Trending Projects Image"
                    blurDataURL={property?.images[0]?.image_url}
                  />
                  <div class="swiper-lazy-preloader"></div>
                  <div className="card-bottom">
                    <h4>{capitalizeWords(property.property_name)}</h4>
                    <p>
                      &#x20B9;{" "}
                      {parseInt(property.expected_price).toLocaleString(
                        "en-IN"
                      )}
                    </p>
                    <span>
                      {capitalizeWords(property.locality)},{" "}
                      {capitalizeWords(property.location)}
                    </span>
                    <div>
                      {property.features.filter(
                        (feature) => feature.title == "bedroom"
                      ).length > 0 && (
                        <div>
                          <Image
                            placeholder="blur"
                            src={bedroomWebp}
                            alt="Bedroom Webp"
                          />
                          <span>
                            {
                              property.features.filter(
                                (feature) => feature.title == "bedroom"
                              )[0]?.value
                            }{" "}
                            Beds
                          </span>
                        </div>
                      )}
                      {property.features.filter(
                        (feature) => feature.title == "bath"
                      ).length > 0 && (
                        <div>
                          <Image
                            placeholder="blur"
                            src={bathWebp}
                            alt="Bath Webp"
                          />
                          <span>
                            {
                              property.features.filter(
                                (feature) => feature.title == "bath"
                              )[0]?.value
                            }{" "}
                            Baths
                          </span>
                        </div>
                      )}
                      {property.area.super_area && (
                        <div>
                          <Image
                            placeholder="blur"
                            src={areaWebp}
                            alt="Area Webp"
                          />
                          <span>
                            {property.area.super_area}{" "}
                            {property.area.super_area_unit}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </CommonSwiper>
          <MobileSlider>
            {property_data.map((property) => (
              <div className="trending-property-card-mobile">
                <Link
                  className="tp-card-link-mobile"
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
                    placeholder="blur"
                    src={property?.images[0]?.image_url ?? noImageFound}
                    loading="lazy"
                    width={280}
                    height={150}
                    alt="Trending Projects Image"
                    blurDataURL={property?.images[0]?.image_url}
                  />
                  <div className="card-bottom-mobile">
                    <h4>{capitalizeWords(property.property_name)}</h4>
                    <p>
                      &#x20B9;{" "}
                      {parseInt(property.expected_price).toLocaleString(
                        "en-IN"
                      )}
                    </p>
                    <span>
                      {capitalizeWords(property.locality)},{" "}
                      {capitalizeWords(property.location)}
                    </span>
                    <div className="features-in-trending-project">
                      {property.features.filter(
                        (feature) => feature.title == "bedroom"
                      ).length > 0 && (
                        <div className="tp-feature">
                          <Image
                            placeholder="blur"
                            src={bedroomWebp}
                            alt="Bedroom Webp"
                          />
                          <span>
                            {
                              property.features.filter(
                                (feature) => feature.title == "bedroom"
                              )[0]?.value
                            }{" "}
                            Beds
                          </span>
                        </div>
                      )}
                      {property.features.filter(
                        (feature) => feature.title == "bath"
                      ).length > 0 && (
                        <div className="tp-feature">
                          <Image
                            placeholder="blur"
                            src={bathWebp}
                            alt="Bath Webp"
                          />
                          <span>
                            {
                              property.features.filter(
                                (feature) => feature.title == "bath"
                              )[0]?.value
                            }{" "}
                            Baths
                          </span>
                        </div>
                      )}
                      {property.area.super_area && (
                        <div className="tp-feature">
                          <Image
                            placeholder="blur"
                            src={areaWebp}
                            alt="Area Webp"
                          />
                          <span>
                            {property.area.super_area}{" "}
                            {property.area.super_area_unit}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </MobileSlider>
        </>
      )}
    </section>
  );
};

export default TrendingProjects;

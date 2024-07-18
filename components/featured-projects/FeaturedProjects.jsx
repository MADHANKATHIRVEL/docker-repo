"use client";
import "./featured-projects.scss";
import Image from "next/image";
import arrowRightIcon from "@/assets/arrow-right-icon.png";
import { useCallback, useState } from "react";
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

const CommonSwiper = dynamic(() => import("../common/swiper/CommonSwiper") , {
  ssr : false
});

const MobileSlider = dynamic(() => import("../common/swiper/MobileSlider"), {
  ssr: false,
});


const FeaturedProjects = ({ featuredProjectsData }) => {
  const [swiperRef, setSwiperRef] = useState(null);

  const handlePrevious = useCallback(() => {
    swiperRef?.slidePrev();
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    swiperRef?.slideNext();
  }, [swiperRef]);

  return (
    <section
      className={`featured-projects-area ${
        featuredProjectsData.length ? "" : "set-height-auto"
      }`}
    >
      <div>
        <h2>
          Featured <span>Projects</span>
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
            height={20}
            width={20}
            loading="lazy"
            alt="Right Arrow"
          />
        </a>
      </div>
      {featuredProjectsData.length > 0 && (
        <SwiperNavButton
          className="swiper-button-prev-unique-featured"
          onClick={handlePrevious}
        />
      )}
      {featuredProjectsData.length > 0 && (
        <SwiperNavButton
          className={"swiper-button-next-unique-featured"}
          onClick={handleNext}
        />
      )}
      {featuredProjectsData.length === 0 ? (
        <center>No Featured Projects Available In Your Location</center>
      ) : (
        <>
          <CommonSwiper
            spaceBetween={10}
            slidesPerView={4}
            className="featured-projects-swiper"
            breakpoints={{
              2560: { slidesPerView: 7, spaceBetween: 5 },
              1600: { slidesPerView: 4, spaceBetween: 5 },
              1400: { slidesPerView: 4 },
              1350: { slidesPerView: 4 },
              1100: { slidesPerView: 3 },
              1024: { slidesPerView: 3, spaceBetween: 5 },
              768: { slidesPerView: 2, spaceBetween: 5 },
              600: { slidesPerView: 2 },
              425: { slidesPerView: 1 },
              375: { slidesPerView: 1 },
              320: { slidesPerView: 1 },
            }}
            onSwiper={setSwiperRef}
          >
            {featuredProjectsData.map((property) => (
              <SwiperSlide
                key={property.p_id}
                className="featured-property-card"
              >
                <Link
                  className="fp-card-link"
                  href={`/propertydetails/${getUrlString(property)}-${
                    property.p_id
                  }`}
                  as={`/propertydetails/${getUrlString(property)}-${
                    property.p_id
                  }`}
                  target="_blank"
                >
                  <div className="feature-project-image">
                    <Image
                      src={
                        property?.images
                          ? property?.images[0]?.image_url
                          : undefined ?? noImageFound
                      }
                      width={280}
                      height={170}
                      alt="Featured Property Image"
                      blurDataURL={
                        property?.images
                          ? property?.images[0]?.image_url
                          : undefined
                      }
                      loading="eager"
                      className="feature-property-image-url"
                    />
                    <div className="swiper-lazy-preloader"></div>
                  </div>
                  <div className="card-bottom">
                    <h4>{capitalizeWords(property.property_name)}</h4>
                    &#x20B9;{" "}
                    {parseInt(property.expected_price).toLocaleString("en-IN")}
                    <p className="locationoverflow">
                      {capitalizeWords(property.locality)},{" "}
                      {capitalizeWords(property.location)}
                    </p>
                    <div className="feature-fp">
                      {property.features.map((feature) => (
                        <>
                          {feature.title === "bedroom" && (
                            <div className="d-flex-center">
                              <Image
                                placeholder="blur"
                                src={bedroomWebp}
                                alt="Bedroom"
                              />
                              <span>{feature.value} Beds</span>
                            </div>
                          )}
                          {feature.title === "bath" && (
                            <div className="d-flex-center">
                              <Image
                                placeholder="blur"
                                src={bathWebp}
                                alt="Bath"
                              />
                              <span>{feature.value} Baths</span>
                            </div>
                          )}
                        </>
                      ))}
                      {property.area.super_area && (
                        <div className="d-flex-center">
                          <Image placeholder="blur" src={areaWebp} alt="Area" />
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
            {featuredProjectsData.map((property) => (
              <Link
                className={"featured-project-mobile-card"}
                href={`/propertydetails/${getUrlString(property)}-${
                  property.p_id
                }`}
                as={`/propertydetails/${getUrlString(property)}-${
                  property.p_id
                }`}
                target="_blank"
              >
                <div className={"feature-project-image-section"}>
                  <Image
                    src={property?.images[0]?.image_url}
                    width={280}
                    height={170}
                  />
                </div>
                <div className={"feature-project-content-section"}>
                  <h4>{capitalizeWords(property.property_name)}</h4>
                  &#x20B9;{" "}
                  {parseInt(property.expected_price).toLocaleString("en-IN")}
                  <p className="mobile-fp-card-location">
                    {capitalizeWords(property.locality)},{" "}
                    {capitalizeWords(property.location)}
                  </p>
                  <div className="mobile-fp-card-feature">
                    {property.features.map((feature) => (
                      <div key={feature.title}>
                        {feature.title === "bedroom" && (
                          <div className="mobile-feature-row">
                            <Image
                              placeholder="blur"
                              src={bedroomWebp}
                              alt="Bedroom"
                            />
                            <span>{feature.value} Beds</span>
                          </div>
                        )}
                        {feature.title === "bath" && (
                          <div className="mobile-feature-row">
                            <Image
                              placeholder="blur"
                              src={bathWebp}
                              alt="Bath"
                            />
                            <span>{feature.value} Baths</span>
                          </div>
                        )}
                      </div>
                    ))}
                    {property.area.super_area && (
                      <div className="mobile-feature-row">
                        <Image placeholder="blur" src={areaWebp} alt="Area" />
                        <span>
                          {property.area.super_area}{" "}
                          {property.area.super_area_unit}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </MobileSlider>
        </>
      )}
    </section>
  );
};

export default FeaturedProjects;

"use client";
import { useCallback, useState } from "react";
import "./scss/property-service-slider.scss";
import albionAdvocatePng from "@/assets/albion-advocate.jpg";
import packageMoversPng from "@/assets/package-movers.jpg";
import homeInteriorsPng from "@/assets/home-interior.jpg";
import freeRentAgreementPng from "@/assets/free-rent-agreement.jpg";
import propertyValuationPng from "@/assets/property-valuation.jpg";
import tenantVerificationPng from "@/assets/tenant-verification.jpg";
import propertyAstrologyPng from "@/assets/property-astrolog.jpg";
import swiperBtn from "@/assets/swiper-slider-button.png";
import Image from "next/image";
import { SwiperSlide } from "swiper/react";
import Link from "next/link";
import { Button } from "@/utils/antd-component";
import dynamic from "next/dynamic";
import SwiperNavButton from "@/components/common/nav/SwiperNavButton";

const CommonSwiper = dynamic(() =>
  import("@/components/common/swiper/CommonSwiper") , {
    ssr : false
  }
);

const MobileSlider = dynamic(() => import("@/components/common/swiper/MobileSlider"), {
  ssr: false,
});


let propertyService = [
  {
    key: "albion-advocate",
    label: "Albion Advocate",
    link: "/albion-advocate",
    image: albionAdvocatePng,
  },
  {
    key: "package_movers",
    label: "Package Movers",
    link: "/package-movers",
    image: packageMoversPng,
  },
  {
    key: "home_interior",
    label: "Home Interior",
    link: "/home-interior",
    image: homeInteriorsPng,
  },
  {
    key: "free_rent_agreement",
    label: "Free Rent Agreement",
    link: "/free-rent-agreement",
    image: freeRentAgreementPng,
  },
  {
    key: "property_valuation",
    label: "Property Valuation",
    link: "/property-valuation",
    image: propertyValuationPng,
  },
  {
    key: "tenant_verification",
    label: "Tenant Verification",
    link: "/tenant-verification",
    image: tenantVerificationPng,
  },
  ,
  {
    key: "property_astrology",
    label: "Property Astrology",
    link: "/property-astrology",
    image: propertyAstrologyPng,
  },
];

export default function PropertyServiceSlider() {
  const [swiperRef, setSwiperRef] = useState();

  const handlePrevious = useCallback(() => {
    swiperRef?.slidePrev();
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    swiperRef?.slideNext();
  }, [swiperRef]);

  return (
    <section className="property-services-slider">
      <h3>
        <span>All Your Needs</span> In One Convenient Location
      </h3>
      {(
        <SwiperNavButton
        className="swiper-button-prev-unique"
          onClick={handlePrevious}
        />
      )}
      {(
        <SwiperNavButton
          className="swiper-button-next-unique"
          onClick={handleNext}
        />
      )}
      <>
        <CommonSwiper
          spaceBetween={10}
          slidesPerView={5}
          className="property-service-slider-swiper"
          onSwiper={setSwiperRef}
          breakpoints={{
            2560: {
              slidesPerView: 7,
            },
            1000: {
              slidesPerView: 5,
            },
            768: {
              slidesPerView: 3,
            },
            425: {
              slidesPerView: 2,
            },
            375: {
              slidesPerView: 2,
            },
            320: {
              slidesPerView: 1,
            },
            275: {
              slidesPerView: 1,
            },
          }}
        >
          {propertyService.map((service) => (
            <SwiperSlide>
              <Link
                className="property-service-card"
                href={{ pathname: service.link }}
                target="_blank"
              >
                <Image
                  placeholder="blur"
                  src={service.image}
                  height={40}
                  width={50}
                  loading="lazy"
                  className="sticky-asset"
                  alt="Sticky Asset"
                />
                <div className="service-and-link">
                  <span>{service.label}</span>
                  <Button className="viewmorebtn-ps">View More</Button>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </CommonSwiper>
        <MobileSlider>
          {propertyService.map((service) => (
            <Link
              href={{ pathname: service.link }}
              target="_blank"
              className="property-service-slide-mobile"
            >
              <Image
                placeholder="blur"
                src={service.image}
                height={40}
                width={50}
                loading="lazy"
                alt="Sticky Asset"
              />
              <div>
                <span>{service.label}</span>
                <Button className="viewmore-service-btn">View More</Button>
              </div>
            </Link>
          ))}
        </MobileSlider>
      </>
    </section>
  );
}

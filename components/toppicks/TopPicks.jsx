"use client";
import { useCallback, useState } from "react";
import "./top-picks.css";
import Image from "next/image";
import { capitalizeWords, getUrlString } from "@/utils/helpers";
import areas from "@/assets/area.webp";
import baths from "@/assets/baths.webp";
import beds from "@/assets/beds.webp";
import noImageFound from "@/assets/no-image-found.webp";
import { Button } from "@/utils/antd-component";
import { getIsUserVerified } from "@/utils/userUtils";
import { getPostedBy } from "../LandscapePropertyCard";
import Cookies from "js-cookie";
import { contactOwner } from "@/utils/apiHelpers";
import { useRouter } from "next/navigation";
import arrowRightIcon from "@/assets/arrow-right-icon.png";
import dynamic from "next/dynamic";
import { SwiperSlide } from "swiper/react";
import SwiperNavButton from "../common/nav/SwiperNavButton";

const ContactOwnerModal = dynamic(() => import("../modals/ContactOwnerModal"), {
  ssr: false,
});
const LoginModal = dynamic(() => import("../modals/LoginModal/LoginModal"), {
  ssr: false,
});
const CommonSwiper = dynamic(() => import("../common/swiper/CommonSwiper") , {
  ssr : false
});

const TopPicks = ({ property_data }) => {
  const [showModal, setShowModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const router = useRouter();
  const [swiperRef, setSwiperRef] = useState();

  const handlePrevious = useCallback(() => {
    swiperRef?.slidePrev();
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    swiperRef?.slideNext();
  }, [swiperRef]);

  function handleActionBtnClick(id, btnText) {
    if (btnText === "Contact Owner") {
      setBtnLoading((prevState) => true);
    }
    if (!Cookies.get("user-data")) {
      setLoginModal((prevState) => true);
    } else {
      const haveQuota = contactOwner(id, setShowModal);
      if (!haveQuota) {
        router.push(`/plans?show=1`, { scroll: true });
      }
    }
    setBtnLoading((prevState) => false);
  }

  return (
    <>
      <section
        className={`top-picks-inner-section ${
          property_data.length > 0 ? `` : `set-height-auto`
        }`}
      >
        <div>
          <h2>
            Top Picks <span>For You</span>
          </h2>
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
              height={20}
              width={20}
              loading="lazy"
              alt="Arrow Right Icon"
            />
          </a>
        </div>
        {property_data.length > 0 && (
          <SwiperNavButton
            className="swiper-button-prev-unique-toppicks"
            onClick={handlePrevious}
          />
        )}
        {property_data.length > 0 && (
          <SwiperNavButton
            className="swiper-button-next-unique-toppicks"
            onClick={handleNext}
          />
        )}
        {property_data.length == 0 ||
        property_data.message == "No Properties found" ? (
          <center>No Top Picks Available In Your Location</center>
        ) : (
          <>
            <CommonSwiper
              spaceBetween={10}
              slidesPerView={1}
              navigation={false}
              className="top-picks-swiper"
              onSwiper={setSwiperRef}
              breakpoints={{
                2560: { slidesPerView: 2, spaceBetween: 5 },
              }}
            >
              {property_data.map((property) => (
                <SwiperSlide className="top-picks-card">
                  <Image
                    placeholder="blur"
                    src={property?.images[0]?.image_url ?? noImageFound}
                    loading="lazy"
                    width={445}
                    height={310}
                    alt="Top Picks Image"
                    blurDataURL={property?.images[0]?.image_url}
                    className="top-picks-image"
                  />
                  <div class="swiper-lazy-preloader"></div>
                  <div className="top-picks-property-details">
                    <h3>{capitalizeWords(property.property_name)}</h3>
                    {capitalizeWords(property.locality)}{" "}
                    {capitalizeWords(property.location)}
                    <p>Price</p>₹{" "}
                    {parseInt(property.expected_price).toLocaleString("en-IN")}
                    <h5>Description : {property.description ?? ""}</h5>
                    <div className="top-pick-property-features">
                      {property.features.find(
                        (feature) => feature.title === "bedroom"
                      ) && (
                        <>
                          <Image
                            placeholder="blur"
                            src={beds}
                            alt="Bed Image"
                          />{" "}
                          {
                            property.features.find(
                              (feature) => feature.title === "bedroom"
                            ).value
                          }{" "}
                          Beds
                        </>
                      )}
                      {property.features.find(
                        (feature) => feature.title === "bath"
                      ) && (
                        <>
                          <Image
                            placeholder="blur"
                            src={baths}
                            alt="Bath Image"
                          />{" "}
                          {
                            property.features.find(
                              (feature) => feature.title === "bedroom"
                            ).value
                          }{" "}
                          Baths
                        </>
                      )}
                      <Image placeholder="blur" src={areas} alt="Area Image" />{" "}
                      {property.area.super_area} {property.area.super_area_unit}
                    </div>
                    <div className="top-pick-action-buttons">
                      <Button
                        className="contactProperty"
                        onClick={() => {
                          !Cookies.get("user-data")
                            ? setLoginModal((prevState) => true)
                            : getIsUserVerified()
                            ? handleActionBtnClick(
                                property.p_id,
                                "Contact Owner"
                              )
                            : setShowModal((prevState) => true);
                        }}
                        loading={btnLoading}
                      >
                        Contact{" "}
                        {getPostedBy(property?.seller_details?.user_type_id)}
                      </Button>
                      <Button
                        className="knowMoreBtn"
                        href={`/propertydetails/${getUrlString(property)}-${
                          property.p_id
                        }`}
                        target="_blank"
                      >
                        Know More
                      </Button>
                    </div>
                  </div>
                  {showModal && (
                    <ContactOwnerModal
                      showModal={showModal}
                      setShowModal={setShowModal}
                      btnText={"Contact Owner"}
                      propertyId={property?.p_id}
                    />
                  )}
                </SwiperSlide>
              ))}
            </CommonSwiper>
          </>
        )}
      </section>
      {loginModal && (
        <LoginModal showModal={loginModal} setShowModal={setLoginModal} />
      )}
    </>
  );
};

export default TopPicks;

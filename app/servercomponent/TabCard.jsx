import { memo, useCallback, useState } from "react";
import { SwiperSlide } from "swiper/react";
import Link from "next/link";
import { capitalizeWords } from "@/utils/helpers";
import Cookies from "js-cookie";
import { Grid } from "swiper/modules";
import dynamic from "next/dynamic";
import SwiperNavButton from "@/components/common/nav/SwiperNavButton";

const CommonSwiper = dynamic(() =>
  import("@/components/common/swiper/CommonSwiper") , {
    ssr : false
  }
);

const TabCard = memo(({ propertType, propertyAction, locations }) => {
  const [swiperRef, setSwiperRef] = useState();

  const handlePrevious = useCallback(() => {
    swiperRef?.slidePrev();
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    swiperRef?.slideNext();
  }, [swiperRef]);

  return (
    <>
      <SwiperNavButton
        className="swiper-button-prev-footer-links"
        onClick={handlePrevious}
      />
      <SwiperNavButton
        className="swiper-button-next-footer-links"
        onClick={handleNext}
      />
      <CommonSwiper
        slidesPerView={4}
        slidesPerColumn={5}
        spaceBetween={15}
        slidesPerGroup={1}
        grid={{
          rows: 15,
          fill: "row",
        }}
        onSwiper={setSwiperRef}
        modules={[Grid]}
        className="link-grid"
        swipeHandler={"none"}
        breakpoints={{
          1440: {
            slidesPerView: 4,
          },
          1024: {
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
      >
        {locations?.map((location) => (
          <SwiperSlide>
            <Link
              href={{
                pathname: `/property/${propertType.toLowerCase()}-for-${
                  propertyAction?.toLowerCase() == "buy" ? "sale" : "rent"
                }-in-${location}-${Cookies.get("userLocation")?.toLowerCase()}`,
              }}
              target="_blank"
              style={{
                display: "flex",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {capitalizeWords(propertType)} For{" "}
              {capitalizeWords(
                propertyAction?.toLowerCase() == "buy" ? "sale" : "rent"
              )}{" "}
              In {capitalizeWords(location)}
            </Link>
          </SwiperSlide>
        ))}
      </CommonSwiper>
    </>
  );
});

export default TabCard;

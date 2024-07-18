"use client";
import "./property-images-slider.css";
import { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Share from "yet-another-react-lightbox/plugins/share";
import Download from "yet-another-react-lightbox/plugins/download";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import { Button } from "@/utils/antd-component";
import { CloseOutlined, PhoneOutlined } from "@/utils/icons";
import { capitalizeWords, formatPrice } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { contactOwner } from "@/utils/apiHelpers";
import dynamic from "next/dynamic";

const LoginModal = dynamic(
  () => import("@/components/modals/LoginModal/LoginModal"),
  {
    ssr: false,
  }
);

function getUserType(id) {
  switch (id) {
    case "1":
      return "Owner";
    case "2":
      return "Agent";
    case "3":
      return "Builder";
  }
}

const PropertyImagesSlider = ({ indexValue, images, property_details }) => {
  const router = useRouter();
  const [orderedImages, setOrderedImages] = useState(images);
  const [photoIndex, setPhotoIndex] = useState(indexValue);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [propertyDetails, setPropertyDetails] = useState(property_details);

  useEffect(() => {
    if (propertyDetails == null) {
      router.push("/", { scroll: true });
    } else {
      let reOrderedImages = swapImages().map((item) => ({
        src: item.image_url,
      }));
      setOrderedImages((prevState) => reOrderedImages);
    }
  }, []);

  function swapImages() {
    if (photoIndex === 0) {
      return orderedImages;
    }
    return [
      ...orderedImages.slice(photoIndex),
      ...orderedImages.slice(0, photoIndex),
    ];
  }

  function handleActionBtnClick(id) {
    const haveQuota = contactOwner(id);
    if (!haveQuota) {
      router.push(`/plans?show=1`, { scroll: true });
    }
  }

  return (
    propertyDetails && (
      <div className="property-image-slider-page">
        <Lightbox
          open={true}
          slides={orderedImages.map((slide) => ({
            ...slide,
            download: `${slide.src}?download`,
          }))}
          close={() => router.back()}
          className="lightbox-pms"
          plugins={[Share, Download, Thumbnails, Zoom]}
          toolbar={{
            buttons: [
              <button
                key="my-button"
                type="button"
                className="yarl__button"
                onClick={() => router.back()}
              >
                <CloseOutlined
                  className="close-modal-icon"
                  title="Close Modal"
                />
              </button>,
              "close",
            ],
          }}
        />
        <div className="other-details">
          <div className="propertydetails">
            <span className="property-name-and-price">
              {propertyDetails?.property_name}{" "}
              <span className="expected_price_property">
                &#x20B9; {formatPrice(propertyDetails?.expected_price)}
              </span>
            </span>
            <span>{capitalizeWords(propertyDetails?.address)}</span>
            <span className="property-description">
              {capitalizeWords(propertyDetails?.description)}
            </span>
          </div>
          <div className="action-areas">
            <Button
              className="contact-posted-person"
              onClick={() => {
                handleActionBtnClick(propertyDetails.p_id);
              }}
            >
              <PhoneOutlined className="phone-contact-icon" /> Contact{" "}
              {getUserType(propertyDetails?.seller_details?.user_type_id)}
            </Button>
          </div>
          {showLoginModal && (
            <LoginModal
              showModal={showLoginModal}
              setShowModal={setShowLoginModal}
            />
          )}
        </div>
      </div>
    )
  );
};

export default PropertyImagesSlider;

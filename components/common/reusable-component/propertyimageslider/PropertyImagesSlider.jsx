'use client'
import "./property-images-slider.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Share from "yet-another-react-lightbox/plugins/share";
import Download from "yet-another-react-lightbox/plugins/download";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Inline from "yet-another-react-lightbox/plugins/inline";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { Button } from "@/utils/antd-component";
import {
  CloseOutlined, PhoneOutlined
} from "@/utils/icons";
import { formatPrice } from "../../../../utils/helpers";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const LoginModal = dynamic(() => import('@/components/modals/LoginModal/LoginModal') , {
  ssr : false
})

export function getUserTypeText(id) {
  switch (id) {
    case "1":
      return "Buyer";
    case "2":
      return "Agent";
    case "3":
      return "Builder";
  }
}

const PropertyImagesSlider = () => {
  const { state } = useLocation();
  const router = useRouter()
  const [orderedImages, setOrderedImages] = useState(state?.images);
  const [photoIndex, setPhotoIndex] = useState(state?.indexValue);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [propertyDetails, setPropertyDetails] = useState(
    state?.property_details
  );

  useEffect(() => {
    if(typeof window != undefined){
      window.scrollTo({
        top: "170",
        left: "0",
        behavior: "smooth",
      });
    }
  }, [showDetails]);

  useEffect(() => {
    if (propertyDetails == null) {
      router.push("/");
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

  return (
    propertyDetails && (
      <div className="property-image-slider-page">
        <Lightbox
          open={true}
          close={() => router.back()}
          slides={orderedImages.map((slide) => ({
            ...slide,
            download: `${slide.src}?download`,
          }))}
          className="lightbox-pms"
          plugins={[Share, Download, Thumbnails, Inline, Zoom]}
          toolbar={{
            buttons: [
              <button
                key="my-button"
                type="button"
                className="yarl__button"
                onClick={() => router.back()}
              >
                <CloseOutlined
                  classID="close-modal-icon"
                  title="Close Modal"
                />
              </button>,
              "close",
            ],
          }}
        />
        
        {true && (
          <div className="other-details">
           
            <div className="propertydetails">
              <span className="property-name-and-price">
                {propertyDetails?.property_name}{" "}
                <span className="property-expected-price">
                  &#x20B9; {formatPrice(propertyDetails?.expected_price)}
                </span>
              </span>
              <span>{propertyDetails?.address}</span>
              <span className="property-description">
                {propertyDetails?.description}
              </span>
            </div>
            <div className="action-areas">
              
              <Button
                className="contact-posted-person"
                onClick={() => {
                  if (!Cookies.get("user-data")) {
                    setShowLoginModal((prevState) => true);
                  } else {
                    setShowContactModal((prevState) => true);
                  }
                }}
              >
                <PhoneOutlined className="phone-outlined-icon"/> Contact{" "}
                {getUserTypeText(propertyDetails?.seller_details?.user_type_id)}
              </Button>
            </div>
            {showLoginModal && (
              <LoginModal
                showModal={showLoginModal}
                setShowModal={setShowLoginModal}
              />
            )}
          </div>
        )}
      </div>
    )
  );
};

export default PropertyImagesSlider;

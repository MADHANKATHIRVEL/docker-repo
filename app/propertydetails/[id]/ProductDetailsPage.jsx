"use client";
import { useEffect } from "react";
import "./product-details-page.css";
import {
  EyeOutlined,
  HeartFilled,
  HeartOutlined,
  MoreOutlined,
  ShareAltOutlined,
  UserOutlined,
} from "@/utils/icons";
import {
  getEmail,
  getUserId,
  encrypt,
  getIsUserVerified,
} from "@/utils/userUtils";
import bedImg from "@/assets/double-bed 1.webp";
import bathImg from "@/assets/bathroom.webp";
import sofaImg from "@/assets/sofaIcon.webp";
import balconyImg from "@/assets/balcony.webp";
import axisImg from "@/assets/banklogo/axis-bank.webp";
import sbiImg from "@/assets/sbiLogo.webp";
import bobImg from "@/assets/boblogo.webp";
import elevatorImg from "@/assets/elevator 1.webp";
import waterSupply from "@/assets/water_supply.webp";
import securityCam from "@/assets/security-camera.webp";
import weightlifting from "@/assets/weightlifting 1.webp";
import policeman from "@/assets/policeman 1.webp";
import wifi from "@/assets/wifi.webp";
import indusImg from "@/assets/indus.webp";
import singlePng from "@/assets/sharing/single.webp";
import doublePng from "@/assets/sharing/two.webp";
import triplePng from "@/assets/sharing/three.webp";
import fourPng from "@/assets/sharing/four.webp";
import kotak from "@/assets/kotak.webp";
import bandhan from "@/assets/bandhanbanklogo.webp";
import mapImage from "@/assets/property-location-map.webp";
import noImageFound from "@/assets/no-images.webp";
import floorIcon from "@/assets/tabler-icon-stairs-down.webp";
import parkingIcon from "@/assets/parking.webp";
import powerBackup from "@/assets/generator.webp";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, Button, Divider, Dropdown, Menu, Tag } from "@/utils/antd-component";
import {
  capitalizeFirstLetter,
  formatMobileNumber,
  formatText,
  formatPrice,
  capitalizeWords,
  pgIcons,
  getUrlString,
  addEllipsis,
} from "../../../utils/helpers";
import Cookies from "js-cookie";
import heartOutlined from "@/assets/circle-heart.webp";
import heartFilled from "@/assets/add2fav.svg";
import {
  contactOwner,
  myProperties,
  wishlistProduct,
} from "@/utils/apiHelpers";
import { getPostedBy } from "@/components/LandscapePropertyCard";
import { Loader } from "@/context/Context";
import SEO from "@/components/seo/SEO";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

const SimilarProperties = dynamic(() =>
  import("@/components/similar-properties/SimilarProperties")
);
const LoanCalculator = dynamic(
  () => import("@/components/loan-calculator/LoanCalculator"),
  {
    ssr: false,
  }
);
const ContactOwnerModal = dynamic(
  () => import("@/components/modals/ContactOwnerModal"),
  {
    ssr: false,
  }
);
const ShareProperty = dynamic(
  () =>
    import(
      "@/components/common/reusable-component/share-property/ShareProperty"
    ),
  {
    ssr: false,
  }
);
const LoginModal = dynamic(
  () => import("@/components/modals/LoginModal/LoginModal"),
  {
    ssr: false,
  }
);
const ReportModal = dynamic(
  () => import("@/components/common/reusable-component/report/ReportModal"),
  {
    ssr: false,
  }
);

export function openGoogleMaps(address) {
  const mapUrl = `http://maps.google.com/maps?q=loc:${address}`;
  if (typeof window != undefined) {
    window.open(mapUrl, "_blank");
  }
}

const ProductDetailsPage = ({ response, id }) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [propertyData, setPropertyData] = useState();
  const [extraDetails, setExtraDetails] = useState([{}]);
  const [abtProperty, setAbtProperty] = useState([{}]);
  const [otherImages, setOtherImages] = useState([]);
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnText, setBtnText] = useState("");
  const [fav, setFav] = useState(response.isWishListed);
  const [scrolledMax, setScrolledMax] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [isMyOwnProperty, setIsMyOwnProperty] = useState(false);
  const [showShareModal, setShowShareModal] = useState();
  const [otherDetails, setOtherDetails] = useState([
    {
      key: "area",
      value: 0,
      unit: "sqft",
    },
    {
      key: "status",

      value: "Ready to Move",
    },
    {
      key: "property_type",

      value: "Villa",
    },
    {
      key: "property_age",
      value: 0,
    },
    {
      key: "rera_id",
      value: "Approved",
    },
  ]);

  useEffect(() => {
    function getPropertyData() {
      setPropertyData((prevState) => response);
      let amenitiesArray = [];
      if (response?.amenities) {
        Object.entries(response.amenities).map(([key, value]) => {
          if (value !== undefined) {
            amenitiesArray.push({
              key: key,
              value: value,
            });
          }
        });
      }
      setExtraDetails((prevState) => amenitiesArray);
      setOtherDetails((prevState) => [
        {
          key: "area",
          label: "Super Build Up Area",
          value:
            response?.area?.super_area && response?.area?.super_area_unit
              ? `${response?.area?.super_area} ${capitalizeWords(
                  response?.area?.super_area_unit
                )}`
              : "Not Specified",
        },
        {
          key: "status",
          label: "Status",
          value: formatText(response?.availability ?? "-"),
        },
        {
          key: "property_type",
          label: "Property Type",
          value: response?.property_type?.pt_name,
        },
        {
          key: "property_age",
          label: "Property Age",
          value: response?.property_age,
        },
      ]);
      setOtherImages((prevState) =>
        response?.images?.filter((image) => image?.isMain === "0")
      );
      setAbtProperty((prevState) => [
        {
          key: "price",
          label: "Expected Price",
          value: response?.expected_price,
          unit: "lakh",
        },
        {
          key: "booking_amount",
          label: "Token Amount",
          value: response?.token_amount == null ? null : response?.token_amount,
          unit: "lakh",
        },
        {
          key: "address",
          label: "Address",
          value: capitalizeFirstLetter(response?.address),
        },
        {
          key: "total_sqft",
          label: "Total Sqft",
          value: `${response?.area?.super_area}`,
          unit: `${capitalizeWords(response?.area?.super_area_unit)}`,
        },
        {
          key: "facing",
          label: "Facing",
          value: `${capitalizeFirstLetter(response?.facing)}`,
        },
      ]);
      if (parseInt(response?.area?.carpet_area) > 0) {
        setAbtProperty((prevState) => [
          ...prevState,
          {
            key: "carpet_area",
            label: "Carpet Area",
            value: `${response?.area?.carpet_area} ${response?.area?.carpet_area_unit}`,
          },
        ]);
      }
      if (response?.availability === "under_construction") {
        setAbtProperty((prevState) => [
          ...prevState,
          {
            key: "under_construction",
            label: "Estimated Time To Complete",
            value1: response.features.filter(
              (item) => item.title === "estimated_year"
            )[0].value,
            value2: response.features.filter(
              (item) => item.title === "estimated_month"
            )[0].value,
          },
        ]);
      }
    }
    getPropertyData();
  }, [id]);

  useEffect(() => {
    myProperties(id).then((res) => {
      setIsMyOwnProperty((prevState) => !!res);
    });
  }, []);

  if (typeof window != undefined) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 600) {
        setScrolledMax((prevState) => true);
      } else {
        setScrolledMax((prevState) => false);
      }
    });
  }

  function getExtraDetailsColumn(item) {
    switch (item.key) {
      case "bedroom":
        return (
          <div className="single-config">
            <Image
              src={bedImg}
              className="icons"
              loading="lazy"
              alt="BHK"
              height={25}
              width={25}
            />
            <span>{`${item.value} Beds`}</span>
          </div>
        );
      case "balconies":
        return (
          <div className="single-config">
            <Image
              src={bathImg}
              className="icons"
              loading="lazy"
              alt="Balcony"
              height={25}
              width={25}
            />
            <span>{`${item.value} Baths`}</span>
          </div>
        );
      case "baths":
        return (
          <div className="single-config">
            <Image
              src={balconyImg}
              className="icons"
              loading="lazy"
              alt="Baths"
              height={25}
              width={25}
            />
            <span>{`${item.value} Balcony`}</span>
          </div>
        );
      case "floor":
        return (
          <div className="single-config">
            <Image
              src={floorIcon}
              className="icons"
              loading="lazy"
              alt="Floor"
              height={25}
              width={25}
            />
            <span>{`${item.value} Floor`}</span>
          </div>
        );
      case "furnish_status":
        return (
          <div className="single-config">
            <Image
              src={sofaImg}
              className="icons"
              loading="lazy"
              alt="Furnish"
              height={25}
              width={25}
            />
            <span>{`${formatText(item.value)}`}</span>
          </div>
        );
    }
  }

  function handleShareProperty() {
    if (!Cookies.get("user-data")) {
      setLoginModal((prevState) => true);
    } else {
      setShowShareModal((prevState) => true);
    }
  }

  function handleAddWishListProperty() {
    if (!Cookies.get("user-data")) {
      setLoginModal((prevState) => true);
    } else {
    }
  }

  function getDescription(text) {
    return text;
  }

  function getFormattedString(text) {
    return (
      <>
        <span className="desc">{text}</span>
      </>
    );
  }

  function getOtherDetailsCol(item) {
    switch (item.key) {
      default:
      case "area":
        return (
          <div className="other-detail">
            <span className="other-detail-title">{item.label}</span>
            <span className="other-detail-value">
              {item.value} {item.unit}
            </span>
          </div>
        );
      case "status":
        return (
          <div className="other-detail">
            <span className="other-detail-title">{item.label}</span>
            <span className="other-detail-value">{item.value}</span>
          </div>
        );
      case "property_type":
        return (
          <div className="other-detail">
            <span className="other-detail-title">{item.label}</span>
            <span className="other-detail-value">{item.value}</span>
          </div>
        );
      case "property_age":
        return (
          <div className="other-detail">
            <span className="other-detail-title">{item.label}</span>
            <span className="other-detail-value">
              {item.value == "0" ? "New" : <>Less Than {item.value}</>}
            </span>
          </div>
        );
      case "rera_id":
        return (
          <div className="other-detail">
            <span className="other-detail-title">{item.label}</span>
            <span className="other-detail-value">{item.value}</span>
          </div>
        );
    }
  }

  function getPropertyDetails(obj) {
    switch (obj.key) {
      default:
      case "price":
        return (
          <div className="abt-property-row">
            <span className="col1">{obj.label}</span>
            <span className="col2">
              {parseInt(obj.value).toLocaleString("en-IN")}
            </span>
          </div>
        );
      case "booking_amount":
        return (
          <div className="abt-property-row">
            <span className="col1">{obj.label}</span>
            <span className="col2">
              {obj.value == null
                ? "Not Specified"
                : parseInt(obj.value).toLocaleString("en-IN")}
            </span>
          </div>
        );
      case "address":
        return (
          <div className="abt-property-row">
            <span className="col1">{obj.label}</span>
            <span className="col2">{obj.value}</span>
          </div>
        );
      case "loan_offered":
        return (
          <div className="abt-property-row">
            <span className="col1">{obj.label}</span>
            <span className="col2">
              <span>{obj.value}</span>
            </span>
          </div>
        );
      case "total_sqft":
        return (
          <div className="abt-property-row">
            <span className="col1">{obj.label}</span>
            <span className="col2">
              {!obj.value
                ? "-"
                : `${parseInt(obj.value).toLocaleString("en-IN")} ${obj.unit}`}
            </span>
          </div>
        );
      case "carpet_area":
        return (
          <div className="abt-property-row">
            <span className="col1">{obj.label}</span>
            <span className="col2">{obj.value}</span>
          </div>
        );
      case "status_electricity":
        return (
          <div className="abt-property-row">
            <span className="col1">{obj.label}</span>
            <span className="col2">{obj.value}</span>
          </div>
        );
      case "floor_allowed":
        return (
          <div className="abt-property-row">
            <span className="col1">{obj.label}</span>
            <span className="col2">{obj.value}</span>
          </div>
        );
      case "facing":
        return (
          <div className="abt-property-row">
            <span className="col1">{obj.label}</span>
            <span className="col2">{formatText(obj.value)}</span>
          </div>
        );
      case "under_construction":
        return (
          <div className="abt-property-row">
            <span className="col1">{obj.label}</span>
            <span className="col2">
              {obj.value1} Year {obj.value2}{" "}
              {obj.value2 > 1 ? "Months" : "Month"}
            </span>
          </div>
        );
    }
  }

  function getCommercialFeatures(obj) {
    switch (obj.title) {
      default:
      case "cafeteria":
        return (
          <div className="abt-property-row">
            <span className="col1">{formatText(obj.title)}</span>
            <span className="col2">{formatText(obj.value)}</span>
          </div>
        );
      case "personal_washroom":
        return (
          <div className="abt-property-row">
            <span className="col1">{formatText(obj.title)}</span>
            <span className="col2">{formatText(obj.value)}</span>
          </div>
        );
      case "main_road_facing":
        return (
          <div className="abt-property-row">
            <span className="col1">{formatText(obj.title)}</span>
            <span className="col2">{formatText(obj.value)}</span>
          </div>
        );
      case "is_corner_shop":
        return (
          <div className="abt-property-row">
            <span className="col1">{formatText(obj.title)}</span>
            <span className="col2">
              <span>{formatText(obj.value)}</span>
            </span>
          </div>
        );
      case "total_floor_in_office":
        return (
          <div className="abt-property-row">
            <span className="col1">{formatText(obj.title)}</span>
            <span className="col2">{formatText(obj.value)}</span>
          </div>
        );
      case "office_floor_number":
        return (
          <div className="abt-property-row">
            <span className="col1">{formatText(obj.title)}</span>
            <span className="col2">{formatText(obj.value)}</span>
          </div>
        );
      case "floor_allowed":
        return (
          <div className="abt-property-row">
            <span className="col1">{obj.label}</span>
            <span className="col2">{obj.value}</span>
          </div>
        );
      case "facing":
        return (
          <div className="abt-property-row">
            <span className="col1">{obj.label}</span>
            <span className="col2">{formatText(obj.value)}</span>
          </div>
        );
      case "under_construction":
        return (
          <div className="abt-property-row">
            <span className="col1">{obj.label}</span>
            <span className="col2">
              {obj.value1} Year {obj.value2}{" "}
              {obj.value2 > 1 ? "Months" : "Month"}
            </span>
          </div>
        );
    }
  }

  function getFeatures(obj) {
    switch (obj.title) {
      default:
        break;
      case "bedroom":
        return (
          <div className="single-features">
            <div className="feature-img-container">
              <Image
                src={bedImg}
                alt="Bed Image"
                loading="lazy"
                height={20}
                width={20}
              />
            </div>
            <p>
              &nbsp;<b>{obj.value}</b>&nbsp;
              <span>Beds</span>
            </p>
          </div>
        );
      case "balconies":
        return (
          <div className="single-features">
            <div className="feature-img-container">
              <Image
                src={balconyImg}
                alt="Balcony Image"
                loading="lazy"
                height={20}
                width={20}
              />
            </div>
            <p>
              &nbsp;<b>{obj.value}</b>&nbsp;
              <span>Balcony</span>
            </p>
          </div>
        );
      case "furnish_status":
        return (
          <div className="single-features">
            <div className="feature-img-container">
              <Image
                src={sofaImg}
                alt="Furnish Image"
                loading="lazy"
                height={20}
                width={20}
              />
            </div>
            <p>
              &nbsp;
              <span>{formatText(obj.value)}</span>
            </p>
          </div>
        );
      case "bath":
        return (
          <div className="single-features">
            <div className="feature-img-container">
              <Image
                src={bathImg}
                alt="Bath Image"
                loading="lazy"
                height={20}
                width={20}
              />
            </div>
            <p>
              &nbsp;<b>{obj.value}</b>&nbsp;
              <span>Bath</span>
            </p>
          </div>
        );
    }
  }

  function getAmenityBox(item) {
    switch (item) {
      case "Building Wi-Fi":
        return (
          <div className="amenity-col">
            <Image
              src={wifi}
              loading="lazy"
              alt="Wifi Image"
              height={20}
              width={20}
            />
            <span>Wifi</span>
          </div>
        );
      case "Lift":
        return (
          <div className="amenity-col">
            <Image
              src={elevatorImg}
              loading="lazy"
              alt="Lift Image"
              height={20}
              width={20}
            />
            <span>Lift</span>
          </div>
        );
      case "Fitness centre":
        return (
          <div className="amenity-col">
            <Image
              src={weightlifting}
              loading="lazy"
              alt="Gym Image"
              height={20}
              width={20}
            />
            <span>Fitness centre</span>
          </div>
        );
      case "Parking":
        return (
          <div className="amenity-col">
            <Image
              src={parkingIcon}
              loading="lazy"
              alt="Parking Image"
              height={20}
              width={20}
            />
            <span>Parking</span>
          </div>
        );
      case "Security":
        return (
          <div className="amenity-col">
            <Image
              src={policeman}
              loading="lazy"
              alt="Policeman Image"
              height={20}
              width={20}
            />
            <span>Security</span>
          </div>
        );
      case "24 / 7 Water":
        return (
          <div className="amenity-col">
            <Image
              src={waterSupply}
              loading="lazy"
              alt="Water Supply Image"
              height={20}
              width={20}
            />
            <span>24 / 7 Water</span>
          </div>
        );
      case "CCTV":
        return (
          <div className="amenity-col">
            <Image
              src={securityCam}
              loading="lazy"
              alt="Security Cam Image"
              height={20}
              width={20}
            />
            <span>CCTV</span>
          </div>
        );
      case "Power Backup":
        return (
          <div className="amenity-col">
            <Image
              src={powerBackup}
              loading="lazy"
              alt="Power Backup Image"
              height={20}
              width={20}
            />
            <span>Power Backup</span>
          </div>
        );

      default:
        break;
    }
  }

  function handleAddToFavAction(action) {
    if (!Cookies.get("user-data")) {
      setLoginModal((prevState) => true);
    } else {
      setFav((prevState) => !prevState);
      wishlistProduct(propertyData.p_id, getUserId(), action);
    }
  }

  function handleMapClick(address) {
    if (!Cookies.get("user-data")) {
      setLoginModal((prevState) => true);
    } else {
      openGoogleMaps(address);
    }
  }

  function getPgPrice(roomCategory) {
    let priceRange = [];
    roomCategory.map((item) => priceRange.push(parseInt(item.price_per_bed)));
    if (priceRange.length == 1) {
      return <span>&#x20B9; {priceRange[0].toLocaleString("en-IN")}</span>;
    }
    if (Math.min(...priceRange) == Math.max(...priceRange)) {
      return (
        <span>&#x20B9; {Math.min(...priceRange).toLocaleString("en-IN")}</span>
      );
    }
    return (
      <span>
        &#x20B9;{Math.min(...priceRange).toLocaleString("en-IN")} - &#x20B9;
        {Math.max(...priceRange).toLocaleString("en-IN")}
      </span>
    );
  }

  function handleActionBtnClick(btnText) {
    if (btnText === "Contact Owner") {
      setBtnLoading((prevState) => true);
    }
    if (!Cookies.get("user-data")) {
      setLoginModal((prevState) => true);
    } else {
      if (!getEmail()) {
        setBtnText((prevState) => btnText);
      } else {
        const haveQuota = contactOwner(id);
        if (!haveQuota) {
          router.push(`/plans?show=1`, { scroll: true });
        }
      }
    }
    setBtnLoading((prevState) => false);
  }

  function getExtraInfo() {
    switch (propertyData?.property_type?.pt_name?.toLowerCase()) {
      case "flat":
        return (
          <>
            <div className="abt-property-row">
              <span className="col1">Total Floor In Flat</span>
              <span className="col2">
                {propertyData?.features[4]?.value ?? "Not Specified"}
              </span>
            </div>
          </>
        );
      case "plot":
        return (
          <>
            <div className="abt-property-row">
              <span className="col1">Boundary Wall Made</span>
              <span className="col2">
                {capitalizeFirstLetter(propertyData?.features[2]?.value) ??
                  "Not Specified"}
              </span>
            </div>
            <div className="abt-property-row">
              <span className="col1">
                Total Number of Floor Allowed For Construction
              </span>
              <span className="col2">
                {capitalizeFirstLetter(propertyData?.features[3]?.value) ??
                  "Not Specified"}
              </span>
            </div>
            <div className="abt-property-row">
              <span className="col1">Any Current Construction</span>
              <span className="col2">
                {capitalizeFirstLetter(propertyData?.features[4]?.value) ??
                  "Not Specified"}
              </span>
            </div>
          </>
        );
    }
  }

  const renderPropertyTitle = () => {
    if (
      propertyData?.features?.length > 0 &&
      propertyData?.features[0]?.key === "bedroom"
    ) {
      return `${propertyData?.features[0]?.value} BHK ${
        propertyData?.property_type?.pt_name
      } | ${propertyData?.area?.super_area} ${
        propertyData?.area?.super_area_unit
      } ${capitalizeFirstLetter(
        propertyData?.locality
      )} , ${capitalizeFirstLetter(propertyData?.location)}`;
    } else {
      return `${propertyData?.area?.super_area} ${capitalizeFirstLetter(
        propertyData?.area?.super_area_unit
      )} ${propertyData?.property_type?.pt_name} in ${capitalizeFirstLetter(
        propertyData?.locality
      )}, ${capitalizeFirstLetter(propertyData?.location)}`;
    }
  };

  function getSharingSource(roomCat) {
    switch (roomCat?.toLowerCase()) {
      case "single":
        return singlePng;
      case "double":
        return doublePng;
      case "triple":
        return triplePng;
      case "four":
        return fourPng;
      default:
        break;
    }
  }

  function getPgRoomDetails(roomCategory) {
    return roomCategory.map((roomCat) => (
      <div key={roomCat.key} className="pg-category-container">
        <span className="sharing-source-container">
          <Image
            src={getSharingSource(roomCat.key)}
            alt="Sharing Source Image"
            loading="lazy"
            height={25}
            width={25}
          />
          {capitalizeWords(roomCat.key)}
        </span>
        <div className="no-of-rooms-in-pg">
          <div className="no-of-rooms-in-pg-sec">
            <span>
              No Of Rooms In PG : {roomCat.no_of_beds.toLocaleString("en-IN")}
            </span>
            <span>
              One Time Security Deposit : &#x20B9;
              <span className="securitydeposit">
                {roomCat.deposit.toLocaleString("en-IN")} /-
              </span>
            </span>
          </div>
          <span>
            &#x20B9;
            <span className="priceperbed">
              {roomCat.price_per_bed.toLocaleString("en-IN")}
            </span>{" "}
            / bed
          </span>
        </div>
      </div>
    ));
  }

  return !propertyData ? (
    <Loader />
  ) : (
    <>
      <SEO titleTemplate={renderPropertyTitle()} />
      <div className="product-details-page">
        {showReportModal && (
          <ReportModal
            showModal={showReportModal}
            setShowModal={setShowReportModal}
            propertyId={propertyData?.p_id}
            propertyOwnerId={propertyData?.seller_details?.user_id}
          />
        )}
        <div className="project-review">
          <div className="project-information">
            <span className="single-item-head-text">
              <span>
                Home / {capitalizeFirstLetter(propertyData?.location)} /{" "}
                {capitalizeWords(propertyData?.locality)} /{" "}
                {capitalizeFirstLetter(propertyData?.property_type?.pt_name)} /{" "}
                {capitalizeWords(getUrlString(propertyData).replace(/-/g, " "))}
              </span>
            </span>
            <div className="project-images-section">
              {propertyData?.images?.length === 0 || !propertyData?.images ? (
                <div className="no-property-images-found">
                  <Image
                    src={noImageFound}
                    loading="lazy"
                    alt="No Image Found"
                  />
                </div>
              ) : (
                <>
                  <Link
                    className="coverImage"
                    href={{
                      pathname: "/viewer",
                      query: {
                        data: encrypt({
                          indexValue: 0,
                          property_details: JSON.stringify(propertyData),
                        }),
                      },
                    }}
                  >
                    {propertyData?.images.map(
                      (item) =>
                        item.isMain === "1" && (
                          <img
                            src={item.image_url}
                            loading="lazy"
                            className="cover"
                            height={45}
                            width={45}
                            onError={({ currentTarget }) => {
                              currentTarget.src = noImageFound;
                            }}
                            alt="Main Image"
                          />
                        )
                    )}
                  </Link>
                  <div className="otherImages">
                    {otherImages.length === 0 && (
                      <div className="static-card">
                        <span>No Other Images</span>
                      </div>
                    )}
                    {otherImages
                      .filter((item, index) => index < 4)
                      .map((item, index) => {
                        return (
                          <Link
                            href={{
                              pathname: "/viewer",
                              query: {
                                data: encrypt({
                                  indexValue: index + 1,
                                  property_details:
                                    JSON.stringify(propertyData),
                                }),
                              },
                            }}
                          >
                            <img
                              loading="lazy"
                              height={45}
                              width={45}
                              className="sub-image"
                              src={item.image_url ?? noImageFound}
                              alt="Sub Image"
                            />
                          </Link>
                        );
                      })}
                    {otherImages?.length > 4 && (
                      <Link
                        target="_blank"
                        className="static-card"
                        href={{
                          pathname: "/viewer",
                          query: {
                            data: encrypt({
                              indexValue: 0,
                              property_details: JSON.stringify(propertyData),
                            }),
                          },
                        }}
                      >
                        <EyeOutlined />
                        <span>+{otherImages?.length - 4} More</span>
                      </Link>
                    )}
                  </div>
                </>
              )}
            </div>
            <div className="owner-details-mobile">
              <div className="owner-flex-sb">
                <div className="w-35-p">
                  <div className="first-row">
                    <div className="option">
                      {fav ? (
                        <HeartFilled
                          onClick={() => handleAddToFavAction("remove")}
                        />
                      ) : (
                        <HeartOutlined
                          onClick={() => handleAddToFavAction("add")}
                        />
                      )}
                    </div>
                    {showShareModal && (
                      <ShareProperty
                        showShareModal={showShareModal}
                        setShowShareModal={setShowShareModal}
                        propertyId={propertyData?.p_id}
                        property={propertyData}
                      />
                    )}
                    <div
                      className="option"
                      onClick={() => handleShareProperty()}
                    >
                      <ShareAltOutlined className="optionIcon" />
                    </div>
                    <div className="option">
                      <Dropdown
                        overlay={
                          !Cookies.get("user-data") ? (
                            <></>
                          ) : (
                            <Menu>
                              <Menu.Item
                                onClick={() => setShowReportModal(true)}
                              >
                                Report
                              </Menu.Item>
                            </Menu>
                          )
                        }
                        trigger={["click"]}
                      >
                        <div
                          className="flex-center"
                          onClick={() => {
                            if (!Cookies.get("user-data")) {
                              setLoginModal((prevState) => true);
                            }
                          }}
                        >
                          <MoreOutlined className="optionIcon" />
                        </div>
                      </Dropdown>
                    </div>
                  </div>
                  <div className="second-row">
                    <div className="leftarea">
                      {!!propertyData?.price_negotiations &&
                        !!propertyData?.price_negotiations[1] && (
                          <Tag className="negotitation-title">
                            {propertyData?.price_negotiations[1].title}
                          </Tag>
                        )}
                      <span className="sr-sub">
                        <span className="price">
                          &#x20B9; {formatPrice(propertyData?.expected_price)}{" "}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="map-container">
                  <Image
                    src={mapImage}
                    alt="Map Image"
                    loading="lazy"
                    height={45}
                    width={45}
                    style={
                      !Cookies.get("user-data")
                        ? {
                            filter: "blur(2px)",
                            cursor: "pointer",
                            objectFit: "contain",
                            height: "100%",
                            width: "100%",
                          }
                        : {
                            cursor: "pointer",
                            objectFit: "contain",
                            height: "100%",
                            width: "100%",
                          }
                    }
                    onClick={() => handleMapClick(propertyData?.address)}
                  />
                </div>
              </div>
              <div className="third-row">
                <div className="user-sec">
                  <div className="user-outline-details">
                    <Avatar size={32} icon={<UserOutlined />} />
                    <div className="main-details">
                      <span>
                        {capitalizeWords(
                          propertyData?.seller_details?.username
                        )}
                      </span>
                      <span>
                        {formatMobileNumber(
                          propertyData?.seller_details?.mobile_number,
                          propertyData?.seller_details?.email
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="btn-for-actions">
                    {/* <Button
                      className="bookVisitBtn-mobile"
                      onClick={() => {
                        !Cookies.get("user-data")
                          ? setLoginModal((prevState) => true)
                          : getIsUserVerified()
                          ? handleActionBtnClick("Contact Owner")
                          : setShowModal((prevState) => true);
                      }}
                    >
                      Book {propertyData?.property_type?.pt_name} Visit
                    </Button> */}
                    <Button
                      className="contactOwnerBtn-mobile btn-anim"
                      onClick={() => {
                        !Cookies.get("user-data")
                          ? setLoginModal((prevState) => true)
                          : getIsUserVerified()
                          ? handleActionBtnClick("Contact Owner")
                          : setShowModal((prevState) => true);
                      }}
                      loading={btnLoading}
                    >
                      Contact{" "}
                      {getPostedBy(propertyData?.seller_details?.user_type_id)}
                    </Button>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
            <div className="property-detail">
              {propertyData?.property_action?.toLowerCase() === "rent" ? (
                <Tag className="forRentTag">For Rent</Tag>
              ) : (
                <Tag className="forSaleTag">For Sale</Tag>
              )}
              {propertyData?.exclusive == "1" && (
                <Tag className="exculsive-in-albion">Exclusive On Albion</Tag>
              )}
              {propertyData?.features?.length > 0 &&
              propertyData?.features[0]?.title === "bedroom" ? (
                <span className="item-title">
                  {propertyData?.features[0]?.value} BHK{" "}
                  {propertyData?.property_type?.pt_name} |{" "}
                  {propertyData?.area?.super_area}{" "}
                  {propertyData?.area?.super_area_unit}{" "}
                  {capitalizeFirstLetter(propertyData?.locality)}
                  &nbsp;,&nbsp;
                  {capitalizeFirstLetter(propertyData?.location)}&nbsp;
                </span>
              ) : (
                <span className="item-title">
                  {propertyData?.area?.super_area}{" "}
                  {capitalizeFirstLetter(propertyData?.area?.super_area_unit)}{" "}
                  {propertyData?.property_type?.pt_name} in&nbsp;
                  {capitalizeFirstLetter(propertyData?.locality)}&nbsp;,&nbsp;
                  {capitalizeFirstLetter(propertyData?.location)}&nbsp;
                </span>
              )}
              <div className="item-location">
                <span>
                  {capitalizeWords(propertyData?.locality)} ,{" "}
                  {capitalizeWords(propertyData?.location)}
                </span>
                <span>
                  By{" "}
                  <span className="item-by">
                    {capitalizeWords(propertyData?.seller_details?.username)}
                  </span>
                </span>
              </div>
              <div className="features">
                {propertyData?.features &&
                  propertyData?.features?.map((item) => getFeatures(item))}
              </div>
              <div className="item-config">
                {extraDetails?.map((item) => (
                  <div key={item.key}>{getExtraDetailsColumn(item)}</div>
                ))}
              </div>
              <div className="prop-important-details">
                {propertyData?.property_type?.pt_name?.toLowerCase() == "pg" ? (
                  <div className="flex-wrap-g10">
                    {propertyData?.features?.map(
                      (item) =>
                        item.title != "Services Available" && (
                          <div className="features-area">
                            <span>
                              {capitalizeWords(formatText(item.title))}
                            </span>
                            <div className="flex-col">
                              <span>
                                <Image
                                  src={
                                    pgIcons[
                                      item.title == "parking_availability" ||
                                      item.title == "present_in" ||
                                      item.title == "gender" ||
                                      item.title == "tenant_preference"
                                        ? item.value
                                        : item.title
                                    ]
                                  }
                                  height={25}
                                  width={25}
                                  alt="icon"
                                  loading="lazy"
                                />
                              </span>
                              {capitalizeWords(
                                formatText(
                                  item.value == "male_female"
                                    ? "Male & Female"
                                    : item.value
                                )
                              )}
                              {item.title == "notice_period" ? " days" : ""}
                            </div>
                          </div>
                        )
                    )}
                  </div>
                ) : (
                  otherDetails?.map((details) => getOtherDetailsCol(details))
                )}
                {propertyData?.rera_id && (
                  <div className="other-detail">
                    <span className="other-detail-title">Rera ID</span>
                    <span className="other-detail-value">
                      {propertyData?.rera_id}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="about_property">
              <span className="abt_prpty_title">
                {propertyData?.property_type?.pt_name?.toLowerCase() == "pg"
                  ? "Rooms Offered"
                  : "About Property"}
              </span>
              {propertyData?.property_type?.pt_name?.toLowerCase() == "pg" ? (
                getPgRoomDetails(propertyData?.room_category)
              ) : (
                <div className="abt-property-details">
                  {abtProperty?.map((item) => getPropertyDetails(item))}
                  {(propertyData?.real_estate === "commercial" &&
                    propertyData?.property_type?.pt_name?.toLowerCase() ===
                      "shop") ||
                  propertyData?.property_type?.pt_name?.toLowerCase() ===
                    "office"
                    ? propertyData?.features?.map((item) =>
                        getCommercialFeatures(item)
                      )
                    : ""}
                  {getExtraInfo()}
                  {!!propertyData?.price_negotiations &&
                    (!!propertyData?.price_negotiations[0] ||
                      !!propertyData?.price_negotiations[2]) && (
                      <div className="abt-property-row">
                        <span className="col1">Other Details</span>
                        <span className="col2">
                          {!!propertyData?.price_negotiations &&
                            propertyData.price_negotiations[0] &&
                            propertyData.price_negotiations[0].title}
                          {!!propertyData?.price_negotiations &&
                            propertyData.price_negotiations[2] &&
                            propertyData.price_negotiations[2].title}
                        </span>
                      </div>
                    )}
                </div>
              )}
              {propertyData?.description && (
                <h4 className="property-description">
                  Description &nbsp;:&nbsp;
                  {propertyData?.description
                    ? getDescription(propertyData?.description)
                    : "-"}
                </h4>
              )}
            </div>
            {propertyData?.property_type?.pt_name?.toLowerCase() == "pg" && (
              <div className="pg-rules-area">
                <span className="pg-rules-heading">PG Rules</span>
                <div className="rules-list">
                  {propertyData?.rules?.map((rule) => (
                    <div className="flex-fs-10">
                      <Image
                        src={
                          process.env.PUBLIC_URL + "/assets/pgicons/alert.webp"
                        }
                        height={25}
                        width={25}
                        alt="Alert Icon"
                        loading="lazy"
                      />
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {propertyData?.property_type?.pt_name?.toLowerCase() == "pg" && (
              <div className="food-provided">
                <span className="food-provided-heading">PG Food</span>
                <div className="pg-food-list">
                  <div className="pg-food-row">
                    <span>Food In PG</span>
                    {!!propertyData?.foods?.filter(
                      (item) => item.title == "food"
                    )[0] ? (
                      <span>
                        {propertyData?.foods
                          ?.filter((item) => item.title == "food")[0]
                          ?.value?.join(", ")}
                      </span>
                    ) : (
                      "NO"
                    )}
                  </div>
                  {!!propertyData?.foods?.filter(
                    (item) => item.title == "food"
                  )[0] && (
                    <>
                      <div className="pg-food-row">
                        <span>Food Provided</span>
                        <span>
                          {propertyData?.foods?.filter(
                            (item) => item.title == "provided"
                          )[0]?.value == "both"
                            ? "Veg & Non Veg"
                            : "Veg"}
                        </span>
                      </div>
                      <div className="pg-food-row">
                        <span>Food Charge</span>
                        <span>
                          {capitalizeWords(
                            propertyData?.foods?.filter(
                              (item) => item.title == "charge"
                            )[0]?.value
                          )}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
            {propertyData?.property_type?.pt_name?.toLowerCase() == "pg" && (
              <div className="food-provided">
                <span className="food-provided-heading">
                  Services Available
                </span>
                <div className="flex-wrap-g10">
                  {propertyData?.features
                    ?.filter((item) => item.title == "Services Available")[0]
                    ?.value?.map((service) => (
                      <div className="flex-col-2px">
                        <Image
                          src={pgIcons[service?.toLowerCase()]}
                          height={25}
                          width={25}
                          alt="Service Icon"
                          loading="lazy"
                        />
                        <span>{service}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}
            <div className="amenities-card">
              <span className="abt_prpty_title">Amenities</span>
              {propertyData?.property_type?.pt_name?.toLowerCase() == "pg" ? (
                <div>
                  {propertyData?.amenities?.length > 0 ? (
                    <div className="flex-wrap-30">
                      {propertyData?.amenities?.map((amenity) => {
                        if (amenity.value) {
                          return (
                            <div className="flex-col-5px">
                              <Image
                                src={pgIcons[amenity.title]}
                                height={25}
                                width={25}
                                alt="Aminity Title"
                                loading="lazy"
                              />
                              <span>
                                {capitalizeWords(formatText(amenity.title))}
                              </span>
                            </div>
                          );
                        }
                      })}
                    </div>
                  ) : (
                    <>No Amenities Found</>
                  )}
                </div>
              ) : (
                <>
                  {propertyData?.amenities?.length > 0 ? (
                    <div className="amenities-section">
                      {propertyData?.amenities &&
                        propertyData?.amenities?.map((item) =>
                          getAmenityBox(item?.title)
                        )}
                    </div>
                  ) : (
                    <>No Amenities Found</>
                  )}
                </>
              )}
            </div>
            <div className="home-loan-offers">
              <span className="heading">Home Loan Offers</span>
              <div className="home-loan-details">
                <div className="top-section">
                  <div className="leftSide">
                    <span className="more-off-on-albion">
                      Looking for the Perfect Home Loan?
                    </span>
                    <span className="more-off-on-albion-sub-text">
                      Your dream home is just a step away with Albion Home
                      Loans!
                    </span>
                  </div>
                </div>
                <p className="abt-albion">
                  {getFormattedString(
                    "Our dedicated team of professionals is committed to helping you secure the best home loan that suits your needs and budget. Whether you're a first-time buyer, upgrading to your dream home, or looking to refinance, we have the perfect solution for you."
                  )}
                </p>
                <Divider plain className="pd-page-divider">
                  <span>OR</span>
                </Divider>
                <div className="other-banks">
                  <span className="other-banks-title">
                    Other Banks Loan Offers
                  </span>
                  <div className="other-bank-images">
                    {[
                      {
                        key: "axis",
                        img: axisImg,
                        imgLink: "",
                      },
                      {
                        key: "indus",
                        img: indusImg,
                        imgLink: "",
                      },
                      {
                        key: "bob",
                        img: bobImg,
                        imgLink: "",
                      },
                      {
                        key: "sbi",
                        img: sbiImg,
                        imgLink: "",
                      },
                      {
                        key: "bandhan",
                        img: bandhan,
                        imgLink: "",
                      },
                      {
                        key: "kotak",
                        img: kotak,
                        imgLink: "",
                      },
                    ].map((item) => (
                      <Image
                        src={item.img}
                        key={item.key}
                        onClick={() =>
                          router.push("/home-loan", { scroll: true })
                        }
                        height={30}
                        width={80}
                        alt={item.key}
                        loading="lazy"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="locality-reviews">
              <div>
                <SimilarProperties />
              </div>
              <div className="home-loan-calculator-container">
                <span className="home-loan-head">Home Loan Calculator</span>
                <LoanCalculator />
              </div>
            </div>
          </div>
          <div
            className="owner-details"
            style={scrolledMax ? { position: "relative" } : {}}
          >
            <div className="head">
              <div className="option">
                {fav ? (
                  <Image
                    src={heartFilled}
                    onClick={() => handleAddToFavAction("remove")}
                    width={25}
                    alt="Non Fav"
                    loading="lazy"
                    height={25}
                  />
                ) : (
                  <Image
                    src={heartOutlined}
                    onClick={() => handleAddToFavAction("add")}
                    width={25}
                    alt="Fav"
                    loading="lazy"
                    height={25}
                  />
                )}
                <span className="optionText">Wishlist</span>
              </div>
              {showShareModal && (
                <ShareProperty
                  showShareModal={showShareModal}
                  setShowShareModal={setShowShareModal}
                  propertyId={propertyData?.p_id}
                  property={propertyData}
                />
              )}
              <div className="option" onClick={() => handleShareProperty()}>
                <ShareAltOutlined className="optionIcon" />
                <span className="optionText">Share</span>
              </div>
              <div className="option">
                <Dropdown
                  overlay={
                    !Cookies.get("user-data") ? (
                      <></>
                    ) : (
                      <Menu>
                        <Menu.Item onClick={() => setShowReportModal(true)}>
                          Report
                        </Menu.Item>
                      </Menu>
                    )
                  }
                  trigger={["click"]}
                >
                  <div
                    className="flex-center"
                    onClick={() => {
                      if (!Cookies.get("user-data")) {
                        setLoginModal((prevState) => true);
                      }
                    }}
                  >
                    <MoreOutlined className="optionIcon" />
                    <span className="optionText">Report Issue</span>
                  </div>
                </Dropdown>
              </div>
            </div>
            <div className="amt_detail">
              <span className="price">
                {propertyData?.property_type?.pt_name?.toLowerCase() == "pg" ? (
                  getPgPrice(propertyData?.room_category)
                ) : (
                  <span>
                    &#x20B9; {formatPrice(propertyData?.expected_price)}{" "}
                  </span>
                )}
                {!!propertyData?.price_negotiations &&
                  !!propertyData?.price_negotiations[1] && (
                    <Tag className="property-price-negotiations">
                      {propertyData?.price_negotiations[1].title}
                    </Tag>
                  )}
              </span>
              <a className="loan_link" href={"/home-loan"}>
                How much loan can I get ?{" "}
              </a>
              <div className="map-section">
                <Image
                  src={mapImage}
                  alt="Map Image"
                  loading="lazy"
                  style={
                    !Cookies.get("user-data")
                      ? { filter: "blur(2px)", cursor: "pointer" }
                      : { cursor: "pointer" }
                  }
                  onClick={() => handleMapClick(propertyData?.address)}
                />
              </div>
            </div>
            {isMyOwnProperty ? (
              <Tag className="myOwnProperty">
                This Property Is Posted By You
              </Tag>
            ) : (
              <>
                <div className="builder-contact">
                  <span className="contact-builder_head">
                    Contact{" "}
                    {getPostedBy(propertyData?.seller_details?.user_type_id)}
                  </span>
                  <div className="contact-details">
                    <Avatar size={32} icon={<UserOutlined />} />
                    <span className="contact-name">
                      {addEllipsis(
                        capitalizeWords(propertyData?.seller_details?.username),
                        15
                      )}
                    </span>
                    <span className="contact-number">
                      {formatMobileNumber(
                        propertyData?.seller_details?.mobile_number,
                        propertyData?.seller_details?.email
                      )}
                    </span>
                  </div>
                </div>
                {/* <Button
                  className="bookVisitBtn"
                  onClick={() => {
                    !Cookies.get("user-data")
                      ? setLoginModal((prevState) => true)
                      : getIsUserVerified()
                      ? handleActionBtnClick("Contact Owner")
                      : setShowModal((prevState) => true);
                  }}
                >
                  Book {propertyData?.property_type?.pt_name} Visit
                </Button> */}
                <Button
                  className="contactOwnerBtn btn-anim"
                  onClick={() => {
                    !Cookies.get("user-data")
                      ? setLoginModal((prevState) => true)
                      : getIsUserVerified()
                      ? handleActionBtnClick("Contact Owner")
                      : setShowModal((prevState) => true);
                  }}
                  loading={btnLoading}
                >
                  Contact{" "}
                  {getPostedBy(propertyData?.seller_details?.user_type_id)}
                </Button>
              </>
            )}
          </div>
        </div>
        {showModal && (
          <ContactOwnerModal
            showModal={showModal}
            setShowModal={setShowModal}
            btnText={btnText}
            propertyId={propertyData?.p_id}
          />
        )}
        {loginModal && (
          <LoginModal showModal={loginModal} setShowModal={setLoginModal} />
        )}
      </div>
    </>
  );
};

export default ProductDetailsPage;

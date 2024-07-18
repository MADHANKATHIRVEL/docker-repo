'use client'
import React, { useState, useEffect } from "react";
import "./landscape-property-card.css";
import noImageFound from "@/assets/no-image-found.webp";
import {
  EyeOutlined,
  HeartFilled,
  HeartOutlined,
  PhoneOutlined,
  ShareAltOutlined
} from "@/utils/icons";
import cardLoader from "@/assets/cardloading.gif";
import { Button, Dropdown, Menu, Tag, notification } from "@/utils/antd-component";
import buildIcon from "@/assets/buildIcon.webp";
import floorIcon from "@/assets/floorIcon.webp";
import arrowIcon from "@/assets/facingpng.webp";
import sofaIcon from "@/assets/furnishingstatus.webp";
import facebookShare from "@/assets/facebook-share.webp";
import twitterShare from "@/assets/twitter-share.webp";
import whatsappShare from "@/assets/whatsapp-share.webp";
import squareIcon from "@/assets/squareIcon.webp";
import Image from "next/image";
import {
  CheckOutlined, DownOutlined, UpOutlined
} from "@/utils/icons";
import {
  addEllipsis,
  capitalizeFirstLetter,
  capitalizeWords,
  formatPrice,
  formatText,
  getUrlString,
  pgIcons,
} from "@/utils/helpers";
import ReportModal from "./common/reusable-component/report/ReportModal";
import { contactOwner, wishlistProduct } from "@/utils/apiHelpers";
import Cookies from "js-cookie";
import {
  getIsUserVerified,
  getUserId
} from "@/utils/userUtils";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";

const LoginModal = dynamic(() => import("./modals/LoginModal/LoginModal") , {
  ssr : false
})
const ShareProperty = dynamic(() => import("./common/reusable-component/share-property/ShareProperty") , {
  ssr : false
})
const ContactOwnerModal = dynamic(() => import("./modals/ContactOwnerModal"), {
  ssr: false,
});


export function getPostedBy(userTypeId) {
  switch (userTypeId) {
    case "1":
      return "Owner";
    case "2":
      return "Agent";
    case "3":
      return "Builder";
    default:
      break;
  }
}

const LandscapePropertyCard = React.memo(({ property }) => {

  const [showModal, setShowModal] = useState();
  const [propertyFav, setPropertyFav] = useState(false);
  const router = useRouter();
  const [showReportModal, setShowReportModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isMyOwnProperty, setIsMyOwnProperty] = useState(false);
  const [cardLoading, setCardLoading] = useState(false);
  const [contactOwnerLoading, setContactOwnerLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    if (getUserId()) {
      setPropertyFav((prevState) => property.isWishListed);
    }
  }, [property]);

  function handleImageLoad() {
    setImageLoading(false);
  }

  useEffect(() => {
    setCardLoading((prevState) => true);
    setIsMyOwnProperty((prevState) => property?.seller_id == getUserId());
    setCardLoading((prevState) => false);
  }, []);

  function getTitle(title) {
    if (title && title.length > 40) {
      return title.substring(0, 40).concat("...");
    } else {
      return title;
    }
  }

  function getDescription(text) {
    if (text.length > 30) {
      return (
        <>
          {text.substring(0, 30).concat("...")}
          <a
            href={`/propertydetails/${getUrlString(property)}-${property.p_id}`}

            className="filled"
          >
            read more
          </a>
        </>
      );
    }
  }

  async function handleCardBtnClick() {
    setContactOwnerLoading((prevState) => true);
    if (!Cookies.get("user-data")) {
      setShowLoginModal((prevState) => true);
    } else {
      await contactOwner(property.p_id);
    }
    setContactOwnerLoading((prevState) => false);
  }

  function handlePropertyFavAction() {
    if (!Cookies.get("user-data")) {
      notification.warning({
        message: "Please Login To Perform This Action",
        description: (
          <span>
            Click <a href="/login">here</a> to Login
          </span>
        ),
      });
    } else {
      if (!propertyFav) {
        setPropertyFav((prevState) => true);
        wishlistProduct(property.p_id, getUserId(), "add");
        return;
      }
      wishlistProduct(property.p_id, getUserId(), "remove");
      setPropertyFav((prevState) => false);
    }
  }

  function getPgPrice(roomCategory) {
    let priceRange = [];
    if (JSON.stringify(roomCategory) != "null") {
      roomCategory.map((item) => priceRange.push(parseInt(item.price_per_bed)));
      if (priceRange.length == 1) {
        return (
          <span className="totalcost">
            &#x20B9; {priceRange[0].toLocaleString("en-IN")}
          </span>
        );
      }
      if (Math.min(...priceRange) == Math.max(...priceRange)) {
        return (
          <span className="totalcost">
            &#x20B9; {Math.min(...priceRange).toLocaleString("en-IN")}
          </span>
        );
      }
    } else {
      return <></>;
    }
    return (
      <span className="totalcost">
        &#x20B9;{Math.min(...priceRange).toLocaleString("en-IN")} - &#x20B9;
        {Math.max(...priceRange).toLocaleString("en-IN")}
      </span>
    );
  }

  function handleShare() {
    if (!Cookies.get("user-data")) {
      setShowLoginModal((prevState) => true);
    } else {
      setShowShareModal(true);
    }
  }

  function getSubText(d) {
    switch (d % 10) {
      case 1:
        return `${d}st`;
      case 2:
        return `${d}nd`;
      case 3:
        return `${d}rd`;
      default:
        return `${d}th`;
    }
  }

  const [isOpen, setIsOpen] = useState(false);

  const toggleContent = () => {
    setIsOpen(!isOpen);
  };

  const getShortContent = (content) => {
    return !!content ? content.length > 40 ? `${content.substring(0, 40)}...` : content : "";
  };

  const bedroomData = property.features.filter(
    (item) => item.title === "bedroom"
  );
  const bathData = property.features.filter((item) => item.title === "bath");
  const FurnishData = property.features.filter(
    (item) => item.title === "furnish_status"
  );

  return (
    <div>
      {showLoginModal && (
        <LoginModal
          showModal={showLoginModal}
          setShowModal={setShowLoginModal}
        />
      )}
      {showReportModal && (
        <ReportModal
          showModal={showReportModal}
          setShowModal={setShowReportModal}
        />
      )}

      <div className="mobile_screen_propertyCard">
        <div className="mobile-sc-pc-container">
          <div className="mobile-card-grid">
            <div>
              {cardLoading ? (
                <Image
                  src={cardLoader}
                  alt="Card Loader"
                  loading="lazy"
                  height={20}
                  width={20}
                  className="cardloader-component"
                />
              ) : (
                !!property && (
                  <div className="image-section">
                    {property.exclusive == "1" ? (
                      <Tag className="exclusive-tag">Exclusive</Tag>
                    ) : null}
                    <Image
                      src={property?.images[0]?.image_url ?? noImageFound}
                      className="card_image"
                      alt="No Image Found"
                      width={150}
                      height={150}
                      blurDataURL=""
                    />
                  </div>
                )
              )}
            </div>
            <div className="property__card_content">
              <div className="property-card-content-section">
                <div className="head">
                  {property?.property_type?.pt_name?.toLowerCase() == "pg" ? (
                    getPgPrice(property?.room_category)
                  ) : (
                    <span>
                      &#x20B9;&nbsp;
                      <span className="totalcost">
                        {formatPrice(property.expected_price)}
                      </span>
                      {/* &nbsp;Onwards */}
                    </span>
                  )}
                </div>
                <div className="shortCutIcons">
                  {propertyFav ? (
                    <HeartFilled
                      onClick={handlePropertyFavAction}
                      className="heartIconPropertyList filled"
                    />
                  ) : (
                    <HeartOutlined
                      onClick={handlePropertyFavAction}
                      className="heartIconPropertyList"
                    />
                  )}
                  {showShareModal && (
                    <ShareProperty
                      showShareModal={showShareModal}
                      setShowShareModal={setShowShareModal}
                      propertyId={property?.p_id}
                      property={property}
                    />
                  )}
                  <Dropdown
                    overlay={
                      <Menu>
                        <FacebookShareButton
                          url={`${
                            window.location.origin
                          }/propertydetails/${getUrlString(property)}-${
                            property?.p_id
                          }`}
                          quote={"Albion Property"}
                          title="Facebook"
                          image="https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"
                        >
                          <Image
                            placeholder="blur"
                            src={facebookShare}
                            loading="lazy"
                            alt="facebook share icon"
                            height={40}
                            width={40}
                            className="lp-social-media-icon _fbicon"
                            title="Facebook"
                          />
                        </FacebookShareButton>
                        <TwitterShareButton
                          url={`${
                            window.location.origin
                          }/propertydetails/${getUrlString(property)}-${
                            property?.p_id
                          }`}
                          quote={"Albion Property"}
                          title={"Twitter"}
                          image="https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"
                        >
                          <Image
                            placeholder="blur"
                            src={twitterShare}
                            height={40}
                            width={40}
                            loading="lazy"
                            alt="twitter share icon"
                            className="lp-social-media-icon"
                            title="Twitter"
                          />
                        </TwitterShareButton>
                        <WhatsappShareButton
                          url={`${
                            window.location.origin
                          }/propertydetails/${getUrlString(property)}-${
                            property?.p_id
                          }`}
                          quote={"Albion Property"}
                          title={"Whatsapp"}
                          image="https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"
                        >
                          <Image
                            placeholder="blur"
                            src={whatsappShare}
                            height={40}
                            width={40}
                            className="lp-social-media-icon"
                            loading="lazy"
                            alt="Whatsapp share icon"
                            title="Whatsapp"
                          />
                        </WhatsappShareButton>
                      </Menu>
                    }
                  >
                    <ShareAltOutlined title="Share" />
                  </Dropdown>
                </div>
              </div>

              <span
                className="property_title"
                onClick={() =>
                  router.push(
                    `/propertydetails/${getUrlString(property)}-${
                      property.p_id
                    }`
                  )
                }
              >
                {getTitle(capitalizeWords(property?.property_name))} ,{" "}
                {property?.location?.charAt(0)?.toUpperCase() +
                  property?.location?.slice(1)}
              </span>
              <div className="about-property">
                <div className="icon-sec">
                  <Image
                    placeholder="blur"
                    src={squareIcon}
                    width={15}
                    height={15}
                    loading="lazy"
                    alt="square icon"
                  />
                  <span className="icon-val">5000 sqrt</span>
                </div>
                <div className="icon-sec">
                  <Image
                    placeholder="blur"
                    src={squareIcon}
                    width={15}
                    height={15}
                    loading="lazy"
                    alt="square icon"
                  />

                  <span className="icon-val">
                    {formatText(property.availability)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="property-desc-container">
              <span className="property-desc">
                {isOpen
                  ? property.description
                  : getShortContent(property.description)}
              </span>
              {!isOpen && (
                <button
                  type="button"
                  onClick={toggleContent}
                  className="down-outlined-icon"
                >
                  <DownOutlined />
                </button>
              )}
            </div>

            {isOpen && (
              <div id="demo" className="mt-3">
                <div>
                  {property?.facing && (
                    <div className="feature-title-value">
                      <CheckOutlined className="lp-10-fs" />
                      <span className="lp-12-fs">
                        Facing: {capitalizeWords(formatText(property.facing))}
                      </span>
                    </div>
                  )}
                </div>

                {bedroomData?.map((item) => (
                  <div className="feature-title-value">
                    <CheckOutlined className="lp-10-fs" />
                    <span className="lp-12-fs">Bedroom: {item.value}</span>
                  </div>
                ))}

                {bathData?.map((item) => (
                  <div className="feature-title-value">
                      <CheckOutlined className="lp-10-fs" />
                    <span className="lp-12-fs">Bath: {item.value}</span>
                  </div>
                ))}

                {FurnishData?.map((item) => (
                  <div className="feature-title-value">
                      <CheckOutlined className="lp-10-fs" />
                    <span className="lp-12-fs">
                      Furnish Status: {capitalizeWords(formatText(item.value))}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {isOpen && (
            <div className="read-less-container">
              <button
                type="button"
                onClick={toggleContent}
                className="read-less-btn"
              >
                <span>read less</span>
                {" "}
                <UpOutlined />
              </button>
            </div>
          )}

          <div>
            <div className="foot">
              {!isMyOwnProperty && (
                <div className="contact-seller-container">
                  <Button
                    className="contactOwnerBtn1"
                    onClick={() => {
                      if (!Cookies.get("user-data")) {
                        setShowLoginModal((prevState) => true);
                      } else {
                        if (Cookies.get("is_contact_verified")) {
                          handleCardBtnClick();
                        } else {
                          setShowModal((prevState) => true);
                        }
                      }
                    }}
                    loading={contactOwnerLoading}
                  >
                    Contact{" "}
                    {getPostedBy(property?.seller_details?.user_type_id)}
                  </Button>
                  <Button
                    className="calculateEmiBtn"
                    href={`/propertydetails/${getUrlString(property)}-${
                      property.p_id
                    }`}
                  >
                    View Property
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="landscape-property-card">
        {cardLoading ? (
          <Image
            placeholder="blur"
            src={cardLoader}
            loading="lazy"
            alt="Card Loader"
            height={50}
            width={50}
            className="cardloader-component"
          />
        ) : (
          <>
            <div className="shortcut-icons">
              {propertyFav ? (
                <HeartFilled
                  onClick={handlePropertyFavAction}
                  className="heartIconPropertyList filled"
                />
              ) : (
                <HeartOutlined
                  title="Wishlist"
                  onClick={handlePropertyFavAction}
                  className="heartIconPropertyList"
                />
              )}
              {showShareModal && (
                <ShareProperty
                  showShareModal={showShareModal}
                  setShowShareModal={setShowShareModal}
                  propertyId={property?.p_id}
                  property={property}
                />
              )}
              <Dropdown
                overlay={
                  <Menu>
                    <FacebookShareButton
                      url={`${
                        window.location.origin
                      }/propertydetails/${getUrlString(property)}-${
                        property?.p_id
                      }`}
                      quote={"Albion Property"}
                      title="Facebook"
                      image="https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.webp"
                    >
                      <Image
                        placeholder="blur"
                        src={facebookShare}
                        height={40}
                        width={40}
                        className="lp-social-media-icon _fbicon"
                        title="Facebook"
                        loading="lazy"
                        alt="facebook share icon"
                      />
                    </FacebookShareButton>
                    <TwitterShareButton
                      url={`${
                        window.location.origin
                      }/propertydetails/${getUrlString(property)}-${
                        property?.p_id
                      }`}
                      quote={"Albion Property"}
                      title={"Twitter"}
                      image="https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.webp"
                    >
                      <Image
                        placeholder="blur"
                        src={twitterShare}
                        height={40}
                        width={40}
                        className="lp-social-media-icon"
                        title="Twitter"
                        loading="lazy"
                        alt="twitter share icon"
                      />
                    </TwitterShareButton>
                    <WhatsappShareButton
                      url={`${
                        window.location.origin
                      }/propertydetails/${getUrlString(property)}-${
                        property?.p_id
                      }`}
                      quote={"Albion Property"}
                      title={"Whatsapp"}
                      image="https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.webp"
                    >
                      <Image
                        placeholder="blur"
                        src={whatsappShare}
                        height={40}
                        width={40}
                        className="lp-social-media-icon"
                        title="Whatsapp"
                        loading="lazy"
                        alt="whatsapp share icon"
                      />
                    </WhatsappShareButton>
                  </Menu>
                }
              >
                <ShareAltOutlined title="Share" onClick={() => handleShare()} />
              </Dropdown>
            </div>
            <div className="image-section">
              {property.exclusive == "1" ? (
                <Tag className="exclusive-tag">Exclusive</Tag>
              ) : null}
              <Link
                href={`/propertydetails/${getUrlString(property)}-${
                  property.p_id
                }`}
                target="_blank"
                className="landscape-card-img-section"
              >
                <Image
                  src={property?.images[0]?.image_url ?? noImageFound}
                  className="card_image"
                  alt="Landscape Property Image"
                  width={100}
                  height={100}
                />
              </Link>
            </div>
            <div className="description-section">
              {property?.property_type?.pt_name?.toLowerCase() != "pg" && (
                <Tag
                  style={
                    property.property_action === "sell"
                      ? {
                          backgroundColor: "#E6E6FA",
                        }
                      : {}
                  }
                >
                  {property.property_action === "sell"
                    ? "FOR SALE"
                    : "FOR RENT"}
                </Tag>
              )}
              <span className="property_title">
                <Link
                  href={`/propertydetails/${getUrlString(property)}-${
                    property.p_id
                  }`}
                  target="_blank"
                >
                  {property?.features[0]?.title === "bedroom" ? (
                    <span className="item-title">
                      {property?.features[0]?.value} BHK{" "}
                      {capitalizeFirstLetter(property?.property_type?.pt_name)}{" "}
                      | {parseFloat(property?.area?.super_area)?.toFixed(2)}{" "}
                      {capitalizeFirstLetter(property?.area?.super_area_unit)}{" "}
                      {capitalizeFirstLetter(property?.locality)},&nbsp;
                      {capitalizeFirstLetter(property?.location)}&nbsp;
                    </span>
                  ) : (
                    <span className="item-title">
                      {parseFloat(property?.area?.super_area)?.toFixed(2)}{" "}
                      {capitalizeFirstLetter(property?.area?.super_area_unit)}{" "}
                      {property?.property_type?.pt_name} in&nbsp;
                      {capitalizeFirstLetter(property?.locality)},&nbsp;
                      {capitalizeFirstLetter(property?.location)}&nbsp;
                    </span>
                  )}
                </Link>
              </span>
              <span className="property_location">
                {property?.property_type?.pt_name?.toLowerCase() == "pg"
                  ? formatText(property.property_name)
                  : formatText(property?.availability)}
              </span>
              <div className="about-property">
                {property?.property_type?.pt_name?.toLowerCase() == "pg" ? (
                  <div className="room-category-container">
                    {property?.room_category?.map((item, index) => (
                      <div className="room-category-icon-detail">
                        <Image
                          placeholder="blur"
                          src={pgIcons[item.key]}
                          height={25}
                          width={25}
                          loading="lazy"
                          alt="property icon"
                        />
                        <span>
                          {capitalizeWords(
                            item.key == "single"
                              ? "Private"
                              : `${item.key} Sharing`
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="icon-sec">
                      <Image
                        placeholder="blur"
                        src={buildIcon}
                        height={50}
                        width={50}
                        loading="lazy"
                        alt="building icon"
                      />
                      <span>{property.property_type.pt_name}</span>
                    </div>
                    {property?.property_type?.pt_name?.toLowerCase() !==
                      "plot" &&
                    property?.property_type.pt_name?.toLowerCase() !==
                      "villa" ? (
                      property?.property_type.pt_name?.toLowerCase() ===
                      "flat" ? (
                        property?.features.find(
                          (item) => item.title == "floor_base"
                        )?.value.length > 0 && (
                          <div className="icon-sec">
                            <Image
                              placeholder="blur"
                              src={floorIcon}
                              height={50}
                              width={50}
                              loading="lazy"
                              alt="floor icon"
                            />
                            <span>
                              {getSubText(
                                property?.features.find(
                                  (item) => item.title == "floor_base"
                                )?.value
                              )}{" "}
                              Floor
                            </span>
                          </div>
                        )
                      ) : (
                        property?.features[4]?.value?.length > 0 && (
                          <div className="icon-sec">
                            <Image
                              placeholder="blur"
                              src={floorIcon}
                              height={50}
                              width={50}
                              loading="lazy"
                              alt="floor icon"
                            />
                            <span>
                              {getSubText(property?.features[4]?.value)} Floor
                            </span>
                          </div>
                        )
                      )
                    ) : (
                      <></>
                    )}
                    <div className="icon-sec">
                      <Image
                        placeholder="blur"
                        src={arrowIcon}
                        height={50}
                        width={50}
                        loading="lazy"
                        alt="arrow icon"
                      />
                      <span>
                        {capitalizeFirstLetter(formatText(property?.facing))}{" "}
                        Facing
                      </span>
                    </div>
                    {property?.property_type?.pt_name?.toLowerCase() !==
                      "plot" &&
                      (property?.features.length > 0 ? (
                        property?.features[5]?.title === "furnish_status" ? (
                          <div className="icon-sec">
                            <Image
                              placeholder="blur"
                              src={sofaIcon}
                              height={50}
                              width={50}
                              loading="lazy"
                              alt="sofa icon"
                            />
                            <span>
                              {addEllipsis(
                                formatText(property?.features[5]?.value),
                                10
                              )}
                            </span>
                          </div>
                        ) : (
                          <></>
                        )
                      ) : (
                        <></>
                      ))}
                    <div className="icon-sec">
                      <Image
                        placeholder="blur"
                        src={squareIcon}
                        height={50}
                        width={50}
                        loading="lazy"
                        alt="square icon"
                      />
                      <span>
                        {property?.property_type?.pt_name?.toLowerCase() !==
                        "plot" ? (
                          <>
                            {parseFloat(property?.area?.carpet_area)?.toFixed(
                              2
                            )}{" "}
                            {capitalizeWords(property?.area?.carpet_area_unit)}
                          </>
                        ) : (
                          <>
                            {parseFloat(property?.area?.super_area)?.toFixed(2)}{" "}
                            {capitalizeWords(property?.area?.super_area_unit)}
                          </>
                        )}
                      </span>
                    </div>
                  </>
                )}
              </div>
              <span className="nearby-amenities">
                {property.description !== null &&
                  getDescription(capitalizeWords(property.description))}
              </span>
            </div>
            <div className="feature-section">
              <div className="head">
                {property?.property_type?.pt_name?.toLowerCase() == "pg" ? (
                  getPgPrice(property?.room_category)
                ) : (
                  <span>
                    &#x20B9;
                    <span className="totalcost">
                      {formatPrice(property.expected_price)}
                    </span>
                  </span>
                )}
              </div>
              <div className="foot">
                <Button
                  className="calculateEmiBtn"
                  href={`/propertydetails/${getUrlString(property)}-${
                    property.p_id
                  }`}
                  target="_blank"
                >
                  <EyeOutlined />
                  View
                </Button>
                {!isMyOwnProperty && (
                  <>
                    <Button
                      className="contactOwnerBtn1"
                      onClick={() => {
                        !Cookies.get("user-data")
                          ? setShowLoginModal((prevState) => true)
                          : getIsUserVerified()
                          ? handleCardBtnClick()
                          : setShowModal((prevState) => true);
                      }}
                      loading={contactOwnerLoading}
                    >
                      <PhoneOutlined className="contactIcon" />
                      Contact{" "}
                      {getPostedBy(property?.seller_details?.user_type_id)}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      {showModal && (
        <ContactOwnerModal
          showModal={showModal}
          setShowModal={setShowModal}
          propertyId={property.p_id}
          btnText={"Contact Owner"}
        />
      )}
    </div>
  );
});

export default LandscapePropertyCard;

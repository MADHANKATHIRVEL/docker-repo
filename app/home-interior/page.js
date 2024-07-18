"use client";
import { useState, useEffect } from "react";
import "./home-interior.css";
import { Button, Input, Select } from "@/utils/antd-component";
import homeInteriorImg from "@/assets/home-interior-banner-final.webp";
import homeInteriorCircle from "@/assets/home-int-img.webp";
import enhancedImg from "@/assets/enhanced.svg";
import sweetHome from "@/assets/home-sweet-home.webp";
import leaf from "@/assets/leaf.webp";
import livingRoom from "@/assets/living-room.webp";
import profit from "@/assets/increased-value.svg";
import bookInterior from "@/assets/book-id.webp";
import homeInteriror from "@/assets/faqhi.webp";
import furnishHI from "@/assets/furnishing-hi.webp";
import kitchen from "@/assets/kitchen-hi.webp";
import homeInterior from "@/assets/shelf-hi.webp";
import { getDistricts, getEnquiryAboutService } from "@/utils/apiHelpers";
import Cookies from "js-cookie";
import { getEmail, getUserMobileNumber, getUsername } from "../../utils/userUtils";
import SEO from "@/components/seo/SEO";
import Link from "next/link";
import Image from "next/image";
import { AlbionAdvantage } from "../home-loan/HomeLoan";
import dynamic from "next/dynamic";

const FAQLazy = dynamic(() => import("@/components/common/reusable-component/frequentasked/FAQ"));
const LoginModal = dynamic(() => import("@/components/modals/LoginModal/LoginModal"), {
  ssr : false
})
const StaticBanner = dynamic(() => import("@/components/common/reusable-component/static-banner/StaticBanner"), {
  ssr : false
});

const HomeInterior = () => {
  const [mobileNumber, setMobileNumber] = useState(
    !!getUserMobileNumber() && getUserMobileNumber() != "0" ? getUserMobileNumber() : ""
  );
  const [city, setCity] = useState();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [getDistrict, setGetDistrict] = useState([]);

  useEffect(() => {
    async function getDistrictList() {
      getDistricts().then((res) => {
        setGetDistrict((prevState) => res.map((item) => item.name));
      });
    }
    getDistrictList();
  }, []);

  function handleCheckEligibilty() {
    if (!Cookies.get("user-data")) {
      setShowLoginModal((prevState) => true);
    } else {
      getEnquiryAboutService({
        service: "home_interior",
        details: {
          mobile_number: mobileNumber,
          city: city,
        },
      });
    }
  }

  const designImpPoints = [
    {
      id: 1,
      title: "Personalization",
      icon: sweetHome,
      desc: " Interior design allows you to personalise your space, making it a reflection of your tastes and personality.",
      color: "#E8FFE3",
    },
    {
      id: 2,
      title: "Functionality",
      icon: leaf,
      desc: "A well-designed interior optimises space and functionality, making daily living more convenient and enjoyable.",
      color: "#FFEFEA",
    },
    {
      id: 3,
      title: "Comfort",
      icon: livingRoom,
      desc: "Thoughtfully chosen furnishings and layouts contribute to a comfortable and cosy atmosphere",
      color: "#FFF4EB",
    },
    {
      id: 4,
      title: "Increased Value",
      icon: profit,
      desc: "A beautifully designed home often has a higher market value and can attract potential buyers or renters.",
      color: "#E8E2F7",
    },
    {
      id: 5,
      title: "Enhanced Well-Being",
      icon: enhancedImg,
      desc: " Your home environment can significantly impact your mental and emotional well-being.",
      color: "#D8F6FF",
    },
  ];
  const faqItems = [
    {
      key: "1",
      label: "Why should I invest in home interior design?",
      children: (
        <p className="alignLeft">
          Home interior design enhances the functionality, comfort, and aesthetics of your living space.
        </p>
      ),
    },
    {
      key: "2",
      label: "How do I choose the right interior designer for my project?",
      children: (
        <p className="alignLeft">
          Albion's platform allows you to choose from a curated selection of top interior designers. You can review
          their portfolios, discuss your project with them, and select the one that aligns with your vision.
        </p>
      ),
    },
    {
      key: "3",
      label: "What is the typical timeline for a home interior project?",
      children: (
        <p className="alignLeft">
          The timeline varies based on the scope of the project. A complete home interior may take several months,
          while individual rooms may require less time.
        </p>
      ),
    },
    {
      key: "4",
      label: "Can I customise my design to fit my budget?",
      children: (
        <p className="alignLeft">Yes, Albion lists flexible budget options for home interior designers.</p>
      ),
    },
    {
      key: "5",
      label: "Are my belongings insured during the move?",
      children: (
        <p className="alignLeft">
          Most reputable moving companies offer some form of insurance coverage for your belongings during the
          move, but the extent of coverage can vary. It's essential to discuss insurance options with your chosen
          movers and consider additional insurance if needed for valuable or fragile items.
        </p>
      ),
    },
  ];

  function getConsultation() {
    if (!Cookies.get("user-data")) {
      setShowLoginModal((prevState) => true);
    } else {
      getEnquiryAboutService({
        service: "home_interior",
        details: {
          user_email: getEmail(),
          user_mobile_number: getUserMobileNumber(),
          user_name: getUsername(),
        },
      });
    }
  }

  return (
    <>
      <SEO titleTemplate={"Home Interiors"} />
      <div
        className="home-interior-page"
      >
        <div className="home-interior-web">
          <StaticBanner
            staticBannerImg={homeInteriorImg}
            formOnRight={true}
            rightSection={
              <div className="getFreeEnquiry-form">
                <span className="getFreeEnquiryText">Get Free Enquiry</span>
                <Select
                  showSearch
                  placeholder="Enter District"
                  defaultValue={"Coimbatore"}
                  className="getFreeEnquirySelect"
                >
                  {getDistrict.length > 0 &&
                    getDistrict?.map((city) => (
                      <Select.Option value={city} key={city}>
                        {city}
                      </Select.Option>
                    ))}
                </Select>
                <Input
                  placeholder="Enter Your Mobile Number"
                  onChange={(e) => setMobileNumber(e.target.value)}
                  value={mobileNumber}
                  max={10}
                  className="mobileNumberInput"
                />
                <span
                  className="fontSize12"
                >
                  By continuing I agree to{" "}
                  <Link href={"/terms-and-conditions"} className="albiontc">
                    Albion T&C
                  </Link>
                </span>
                <Button
                  className="checkPriceBtn"
                  onClick={() => {
                    handleCheckEligibilty();
                  }}
                >
                  Get Enquiry
                </Button>
              </div>
            }
          />
        </div>
        <div className="mobile-home-interior">
          <Image placeholder="blur"
            src={homeInteriorImg}
            alt="Home Interior Image"
            loading="lazy"
            className="home-interior-img"
          />
          <div className="getFreeEnquiry-form">
            <span className="getFreeEnquiryText">Get Free Enquiry</span>
            <Select
              showSearch
              placeholder="Enter District"
              defaultValue={"Coimbatore"}
              className="homeInteriorDistrict"
            >
              {getDistrict.length > 0 &&
                getDistrict?.map((city) => (
                  <Select.Option value={city} key={city}>
                    {city}
                  </Select.Option>
                ))}
            </Select>
            <Input
              placeholder="Enter Your Mobile Number"
              className="mobileNumberInput"
              onChange={(e) => setMobileNumber(e.target.value)}
              value={mobileNumber}
              max={10}
            />
            <span
              className="fontSize12"
            >
              By continuing I agree to{" "}
              <Link className="albiontc" href={"/terms-and-conditions"}>
                Albion T&C
              </Link>
            </span>
            <Button
              className="checkPriceBtn"
              onClick={() => {
                handleCheckEligibilty();
              }}
            >
              Get Enquiry
            </Button>
          </div>
        </div>
        <div className="albion-adv-section">
          {showLoginModal && <LoginModal showModal={showLoginModal} setShowModal={setShowLoginModal} />}
          <div className="inner-content-section">
            <div className="left-section">
              <AlbionAdvantage
                title="Why Choose Albion?"
                items={[
                  "Access to Top Interior Designers: Albion's collaboration with renowned interior designers means that you have access to some of the best minds in the field. ",
                  "Personalised Approach : We understand that every home is as unique as its owner. That's why Albion takes a personalised approach to home interior design",
                  "Convenience and Project Management : Albion takes care of every aspect of your interior design project",
                ]}
              />
            </div>
            <div className="right-section">
              <Image placeholder="blur" src={homeInteriorCircle} loading="lazy" alt="Albion Home Interior" />
            </div>
          </div>
        </div>
        <div
          className="our-home-interior-service"
        >
          <div className="our-hi-service-section">
            <p className="homeInteriorService">Our Home Interior Services</p>
            <div
              className="homeInteriorFlex"
            >
              {[
                {
                  key: 1,
                  img: homeInterior,
                  title: "Full Home Interior",
                  description: "Transform your entire home with the top interior designers.",
                },
                {
                  key: 2,
                  img: kitchen,
                  title: "Kitchen and Wardrobe Design",
                  description:
                    " Create the kitchen of your dreams and also get your wardrobe done by the top wardrobe designers, maximising storage while maintaining elegance.",
                },
                {
                  key: 3,
                  img: furnishHI,
                  title: "Furnishing",
                  description: "Complete your interior transformation with furnishing.",
                },
              ].map((item) => (
                <div key={item.key} className="home-interior-service">
                  <Image placeholder="blur" src={item.img} height={50} width={50} loading="lazy" alt="Home Interior Service" />
                  <span className="homeservicetitle">{item.title}</span>
                  <span className="homeservicedesc">{item.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="design-important">
          <div className="design-important__inner-sec">
            <span className="iftitle">Why is a Home Interior Necessary for Everyone?</span>
            <span className="ifdesc">
              Home interior design is not just about aesthetics, it's about creating a functional and comfortable
              living environment.
            </span>
            <div className="interior-design-grid">
              {designImpPoints.map((item) => (
                <div
                  key={item.id}
                  className="design-card"
                  style={{
                    backgroundColor: item.color,
                  }}
                >
                  <Image src={item.icon} loading="lazy" alt="Albion Home Interior Card" />
                  <span className="cardtitle">{item.title}</span>
                  <span className="carddescription">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="booking-banner">
          <div className="bookBanImgContainer">
            <Image placeholder="blur" src={bookInterior} loading="lazy" alt="Albion Home Interior Booking" />
          </div>
          <div className="bookingBanContent">
            <span className="mainSent">
              Unlock the Art of Inspired Living with{" "}
              <span
                className="albiontc"
              >
                Albion !
              </span>
            </span>
            <span className="subSent">
              Step into a world where design meets emotion, and spaces come alive. Our expert interior designers
              craft dreams into reality, one room at a time
            </span>
            <div className="action-btns"></div>
          </div>
        </div>
        <FAQLazy items={faqItems} image={homeInteriror} />
      </div>
    </>
  );
};

export default HomeInterior;

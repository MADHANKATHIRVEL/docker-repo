"use client";

import { useEffect, useState } from "react";
import "./package-mover.css";
import { Button, Col, Modal, Radio, Row, Select } from "@/utils/antd-component";
import carShifting from "@/assets/car_shifting.webp";
import homeShifting from "@/assets/home_shifting.webp";
import { PhoneOutlined, SwapRightOutlined } from "@/utils/icons";
import specifyReq from "@/assets/req.webp";
import getFree from "@/assets/gfq.webp";
import giveUsDetails from "@/assets/gudetails.webp";
import menPackageMover from "@/assets/menpacker.webp";
import packagingMen from "@/assets/packagingman.webp";
import bestPrice from "@/assets/best-price.webp";
import trustedPartner from "@/assets/trusted-partner.webp";
import safeDelivery from "@/assets/safe-delivery.webp";
import fqImage from "@/assets/frqask.webp";
import packageMovers from "@/assets/package-mover-banner-final.webp";
import { getDistricts, getEnquiryAboutService } from "@/utils/apiHelpers";
import Cookies from "js-cookie";
import Image from "next/image";
import dynamic from "next/dynamic";

const SEO = dynamic(() => import("@/components/seo/SEO"), {
  ssr: false,
});
const LoginModal = dynamic(
  () => import("@/components/modals/LoginModal/LoginModal"),
  {
    ssr: false,
  }
);
const Advantages = dynamic(
  () => import("@/components/common/reusable-component/adv-cards/Advantages"),
  {
    ssr: false,
  }
);
const StaticBanner = dynamic(
  () =>
    import("@/components/common/reusable-component/static-banner/StaticBanner"),
  {
    ssr: false,
  }
);

const FAQLazy = dynamic(
  () => import("@/components/common/reusable-component/frequentasked/FAQ"),
  {
    ssr: false,
  }
);

const PackageMovers = () => {
  const extraServices = [
    {
      key: 1,
      logo: specifyReq,
      title: "Submit Your Requirements",
      desc: "You provide details about your move, including the current and destination addresses, the volume of belongings, and any specific requests.",
    },
    {
      key: 2,
      logo: getFree,
      title: "Schedule the Move",
      desc: "Coordinate with your chosen company to schedule the move on a date and time that works for you.",
    },
    {
      key: 3,
      logo: giveUsDetails,
      title: "Sit Back and Relax",
      desc: " On the scheduled day, the packers and movers team will arrive, handle the entire process, and transport your belongings to your new home.",
    },
  ];

  const whyChooseUsPoints = [
    {
      key: 1,
      image: bestPrice,
      title: "Efficiency and Expertise",
      desc: " Packers and movers are experts in their field, ensuring that your move is carried out efficiently and without hassle.",
    },
    {
      key: 2,
      image: trustedPartner,
      title: "Time-Saving",
      desc: "Hiring professionals saves you time and energy, allowing you to focus on other aspects of your move.",
    },
    {
      key: 3,
      image: safeDelivery,
      title: "Safety and Security",
      desc: "Packers and movers companies take utmost care in handling your belongings, minimising the risk of damage or loss during transit.",
    },
  ];

  const items = [
    {
      key: "1",
      label: "How much does hiring packers and movers typically cost?",
      children: (
        <p className="alignLeft">
          The cost varies based on factors such as the volume of items,
          distance, and services required.
        </p>
      ),
    },
    {
      key: "2",
      label:
        "How do I choose the right packers and movers company for my move?",
      children: (
        <p className="alignLeft">
          Consider factors like reputation, experience, services offered, and
          customer reviews. Albion provides a list of trusted partners for your
          convenience.
        </p>
      ),
    },
    {
      key: "3",
      label: " Do packers and movers handle long-distance moves as well?",
      children: (
        <p className="alignLeft">
          Yes, most packers and movers companies offer both local and
          long-distance relocation services.
        </p>
      ),
    },
    {
      key: "4",
      label:
        "What items should I personally transport rather than entrusting them to the movers?",
      children: (
        <p className="alignLeft">
          Valuables, important documents, and items of sentimental value are
          best kept with you during the move.
        </p>
      ),
    },
    {
      key: "5",
      label:
        " How much advance notice should I give when booking packers and movers services?",
      children: (
        <p className="alignLeft">
          It's recommended to book well in advance, especially during peak
          moving seasons. Providing at least a few week's notice is ideal.
        </p>
      ),
    },
  ];

  const [selectedPackage, setSelectedPackage] = useState("within");
  const [city1, setCity1] = useState();
  const [city2, setCity2] = useState();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPopUpModal, setShowPopUpModal] = useState(false);
  const [requestedService, setRequestedService] = useState(null);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    async function getDistrictList() {
      const districtData = await getDistricts();
      setDistricts(districtData);
    }
    getDistrictList();
  }, []);

  function handleCheckPrice() {
    if (!Cookies.get("user-data")) {
      setShowLoginModal((prevState) => true);
    } else {
      getEnquiryAboutService({
        service: "package_movers",
        requestedService: requestedService,
        details: {
          fromCity: city1,
          toCity: city2,
        },
      });
    }
    setShowPopUpModal((prevState) => false);
  }

  const packageMoverForm = (
    <div className="price-check" style={showPopUpModal ? { width: "80%" } : {}}>
      {showPopUpModal ? (
        requestedService === "Home Shifting" ? (
          <span>Home Shifting</span>
        ) : requestedService === "Car Shifting" ? (
          <span>Car Shifting</span>
        ) : (
          <span>Package Movers</span>
        )
      ) : (
        <span>Package Movers</span>
      )}
      <Radio.Group
        className="radio-groups"
        onChange={(e) => {
          setSelectedPackage(e.target.value);
        }}
        value={selectedPackage}
      >
        <Radio value={"within"} className="radio-options">
          Within the city
        </Radio>
        <Radio value={"between"} className="radio-options">
          Between the city
        </Radio>
      </Radio.Group>
      <Select
        placeholder={
          selectedPackage === "between" ? "Select From City" : "Select City"
        }
        value={city1}
        onChange={(value) => setCity1(value)}
      >
        {districts?.map((item) => (
          <Select.Option value={item.name}>
            {item.name?.toLowerCase()}
          </Select.Option>
        ))}
      </Select>
      {selectedPackage === "between" && (
        <Select
          placeholder="Select To City"
          onChange={(value) => setCity2(value)}
          value={city2}
        >
          {districts
            .filter((district) => district.name != city1)
            .map((item) => (
              <Select.Option value={item.name?.toLowerCase()}>
                {item.name}
              </Select.Option>
            ))}
        </Select>
      )}
      <Button
        className="checkPriceBtn"
        onClick={() => {
          handleCheckPrice();
        }}
        disabled={selectedPackage === "within" ? !city1 : !city1 || !city2}
      >
        Check Price
      </Button>
    </div>
  );

  return (
    <>
      <SEO titleTemplate={"Package Movers"} />
      <div className="package-mover-page">
        <div className="form">
          <StaticBanner
            staticBannerImg={packageMovers}
            rightSection={packageMoverForm}
          />
        </div>
        <div className="mobile-form">
          <Image
            placeholder="blur"
            src={packageMovers}
            width={380}
            loading="lazy"
            alt="Package Movers"
          />
          <div
            className="price-check mobile-form-pm"
            style={showPopUpModal ? { width: "80%" } : {}}
          >
            {showPopUpModal ? (
              requestedService === "Home Shifting" ? (
                <span>Home Shifting</span>
              ) : requestedService === "Car Shifting" ? (
                <span>Car Shifting</span>
              ) : (
                <span>Package Movers</span>
              )
            ) : (
              <span>Package Movers</span>
            )}
            <Radio.Group
              className="radio-groups"
              onChange={(e) => {
                setSelectedPackage(e.target.value);
              }}
              value={selectedPackage}
            >
              <Radio value={"within"} className="radio-options">
                Within the city
              </Radio>
              <Radio value={"between"} className="radio-options">
                Between the city
              </Radio>
            </Radio.Group>
            <Select
              placeholder={
                selectedPackage === "between"
                  ? "Select From City"
                  : "Select City"
              }
              value={city1}
              onChange={(value) => setCity1(value)}
            >
              <Select.Option value="coimbatore">Coimbatore</Select.Option>
              <Select.Option value="erode">Erode</Select.Option>
            </Select>
            {selectedPackage === "between" && (
              <Select
                placeholder="Select To City"
                onChange={(value) => setCity2(value)}
                value={city2}
              >
                <Select.Option value="coimbatore">Coimbatore</Select.Option>
                <Select.Option value="erode">Erode</Select.Option>
              </Select>
            )}
            <Button
              className="checkPriceBtn"
              onClick={() => {
                handleCheckPrice();
              }}
              disabled={
                selectedPackage === "within" ? !city1 : !city1 || !city2
              }
            >
              Check Price
            </Button>
          </div>
        </div>
        <div className="ourServices">
          {showLoginModal && (
            <LoginModal
              showModal={showLoginModal}
              setShowModal={setShowLoginModal}
            />
          )}
          {showPopUpModal && (
            <Modal
              footer={null}
              onCancel={() => {
                setShowPopUpModal(false);
              }}
              open={showPopUpModal}
            >
              {packageMoverForm}
            </Modal>
          )}
          <div className="ourservice-sub">
            <span className="headTitle">
              Simplify Your Move with Albion's Trusted Packers and Movers
              Partners.
            </span>
            <p>
              Moving to a new home can be both exciting and daunting, and Albion
              is here to make the process seamless for you. We've partnered with
              some of the best packers and movers companies, all listed
              conveniently on our web app.
            </p>
            <Row gutter={32} className="our__services-row">
              <Col className="ourServicesCol">
                <div className="service-content">
                  <div className="service-image-container">
                    <Image
                      placeholder="blur"
                      src={homeShifting}
                      className="serviceImage"
                      loading="lazy"
                      alt="Home Shifting"
                    />
                  </div>
                  <div className="servicedesc">
                    <span className="serviceHead">Home Shifting</span>
                    <p>
                      Reliable, efficient, and stress-free home shifting
                      solutions tailored to meet your specific needs
                    </p>
                    <Button
                      className="bookNowBtn"
                      onClick={() => {
                        setRequestedService((prevState) => "Home Shifting");
                        setShowPopUpModal((prevState) => true);
                      }}
                    >
                      Book Now
                      <span>
                        <SwapRightOutlined />
                      </span>
                    </Button>
                  </div>
                </div>
              </Col>
              <Col className="ourServicesCol">
                <div className="service-content">
                  <div className="service-image-container">
                    <Image
                      placeholder="blur"
                      src={carShifting}
                      className="serviceImage"
                      loading="lazy"
                      alt="Car Shifting"
                    />
                  </div>
                  <div className="servicedesc">
                    <span className="serviceHead">Car / Vehicle shifting</span>
                    <p>
                      Experience worry-free car relocation, where your vehicle's
                      safety is our top priority.
                    </p>
                    <Button
                      className="bookNowBtn"
                      onClick={() => {
                        setShowPopUpModal((prevState) => true);
                        setRequestedService((prevState) => "Car Shifting");
                      }}
                    >
                      Book Now
                      <span>
                        <SwapRightOutlined />
                      </span>
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
            <Advantages extraServices={extraServices} />
          </div>
          <div className="find_the_best_sec">
            <div className="findthebest-sub">
              <div className="content-area">
                <span className="findthebest">Find The Best</span>
                <span className="packagemovertitle">
                  What Packers and Movers Companies Offer
                </span>
                <span className="packagemoverdesc">
                  Experienced professionals carefully pack your belongings,
                  ensuring they are secure and well-protected during transit.
                  They handle the heavy lifting, efficiently loading your items
                  onto the moving truck and unloading them at your new location.
                  The team can assist with unpacking and setting up your
                  furniture and appliances in your new home.
                </span>
                <div className="packagemoverBtns">
                  <Button
                    className="booknowBtn"
                    onClick={() => {
                      setShowPopUpModal((prevState) => true);
                      setRequestedService((prevState) => "Package Movers");
                    }}
                  >
                    Book Now
                  </Button>
                  <Button className="contactagentBtn">
                    <a href="tel:+91 9442203866">
                      <PhoneOutlined className="phone-outlined" />
                      Enquiry Now
                    </a>
                  </Button>
                </div>
              </div>
              <div className="image-area">
                <div className="menpackageimagecontainer">
                  <Image
                    placeholder="blur"
                    src={menPackageMover}
                    className="menpackageimage"
                    loading="lazy"
                    alt="Package Mover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="whychooseus">
          <div className="whychooseus_sec">
            <div className="packagingman-imageContainer">
              <Image
                placeholder="blur"
                className="packaginman"
                src={packagingMen}
                loading="lazy"
                alt="Men Packing"
              />
            </div>
            <div className="whychooseus-content">
              <span className="title">
                Three Benefits of Hiring Packers and Movers
              </span>
              <div className="sm-cards">
                {whyChooseUsPoints.map((item) => (
                  <div key={item.key} className="whyuscard">
                    <div className="imgCont">
                      <Image
                        placeholder="blur"
                        src={item.image}
                        loading="lazy"
                        alt="Why Choose Us"
                        height={100}
                        width={100}
                      />
                    </div>
                    <div className="whyuscardtext">
                      <span className="card-title">{item.title}</span>
                      <br />
                      <span className="card-desc">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <FAQLazy items={items} image={fqImage} />
      </div>
    </>
  );
};

export default PackageMovers;

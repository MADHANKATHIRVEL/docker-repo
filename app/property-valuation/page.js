'use client'
import { useState, useEffect } from "react";
import "./property-valuation.css";
import faqImage from "@/assets/faqImg.webp";
import propertyValuationImg from "@/assets/property_valuation.webp";
import { Button, Input, Select } from "@/utils/antd-component";
import { getUserMobileNumber, getUsername } from "../../utils/userUtils";
import { getDistricts, getEnquiryAboutService } from "@/utils/apiHelpers";
import Link from "next/link";
import dynamic from "next/dynamic";

const FAQLazy = dynamic(() =>
  import("@/components/common/reusable-component/frequentasked/FAQ"), {
    ssr : false
  }
);
const SEO = dynamic(() => import("@/components/seo/SEO"), {
  ssr : false
});
const LoginModal = dynamic(() => import("@/components/modals/LoginModal/LoginModal") , {
  ssr : false
})
const StaticBanner = dynamic(() =>
  import("@/components/common/reusable-component/static-banner/StaticBanner"), {
    ssr : false
  }
);

const PropertyValuation = () => {
  const [getDistrict, setGetDistrict] = useState([]);
  const [mobileNumber, setMobileNumber] = useState(
    !!getUserMobileNumber() && getUserMobileNumber() != "0"
      ? getUserMobileNumber()
      : ""
  );
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [city, setCity] = useState();

  useEffect(() => {
    async function getDistrictList() {
      getDistricts().then((res) => {
        setGetDistrict((prevState) => res.map((item) => item.name));
      });
    }
    getDistrictList();
  }, []);

  let propertyValuationWorks = [
    {
      key: 1,
      title: "Choose a Service",
      description:
        " Select the type of property valuation service you need based on your goals. ",
    },
    {
      key: 2,
      title: "Share Details of Property",
      description:
        "Provide essential details about the property, including its location, size, condition, and any relevant features. ",
    },
    {
      key: 3,
      title: "Get Valuation Report",
      description:
        " Experienced property experts will conduct a thorough analysis of the property and the current real estate market. ",
    },
  ];

  let benefitPropertyValuation = [
    {
      key: 1,
      title: "Accurate Pricing",
      description:
        " Sellers can price their property competitively by understanding its true market value, attracting potential buyers.",
    },
    {
      key: 2,
      title: "Faster Sales",
      description:
        "A well-priced property is more likely to sell quickly, reducing the time the property sits on the market.",
    },
    {
      key: 3,
      title: "Negotiation Leverage",
      description:
        "Sellers can confidently negotiate with buyers when they have a professional valuation report to support their asking price.",
    },
    {
      key: 4,
      title: "Marketing Advantage",
      description:
        "Accurate pricing provides a strong selling point, making the property more attractive to potential buyers.",
    },
    {
      key: 5,
      title: "Realistic Expectations",
      description:
        "Valuation reports help sellers set realistic expectations about the sale price and proceeds they can expect.",
    },
  ];

  const items = [
    {
      key: "1",
      label:
        "Is property valuation mandatory when buying or selling a property",
      children: (
        <p className="alignLeft">
          Property valuation is not mandatory but highly recommended for
          informed decision-making.
        </p>
      ),
    },
    {
      key: "2",
      label: "How long does it take to receive a property valuation report",
      children: (
        <p className="alignLeft">
          The timeframe may vary based on the type of valuation requested, but
          you can typically expect to receive your report within a few days to a
          week.
        </p>
      ),
    },
    {
      key: "3",
      label:
        "Are property valuations always conducted by a physical inspection of the property?",
      children: (
        <p className="alignLeft">
          Not necessarily. Depending on the type of valuation, it can be
          conducted through on-site inspections or data analysis of similar
          properties in the area.
        </p>
      ),
    },
    {
      key: "4",
      label: "Can I use a property valuation report for negotiation purposes?",
      children: (
        <p className="alignLeft">
          Yes, property valuation reports are valuable negotiation tools for
          both buyers and sellers.
        </p>
      ),
    },
    {
      key: "5",
      label: "Is property valuation necessary for rental properties?",
      children: (
        <p className="alignLeft">
          Property valuation can be beneficial for rental properties, helping
          landlords set competitive rental rates.
        </p>
      ),
    },
  ];

  async function handlePropertyValuation() {
    if (!Cookies.get("user-data")) {
      setShowLoginModal((prevState) => true);
    } else {
      getEnquiryAboutService({
        service: "property_valuation",
        details: {
          mobile_number: mobileNumber,
          city: city,
          name: getUsername(),
        },
      });
    }
  }

  return (
    <>
      <SEO titleTemplate={"Property Valuation"} />
      <div className="property-valuation-page">
        <StaticBanner staticBannerImg={propertyValuationImg} />
        <div className="property-valuation-content-section">
          <div className="property-val-ls">
            <p className="main-heading">
              Unlocking the True Value of Your Property with Property Valuation
              Service
            </p>
            <span className="sub-para">
              Understanding the value of your property is a crucial step whether
              you're a buyer, seller, or investor. Albion's Property Valuation
              service is here to provide you with accurate and insightful
              property valuations.
            </span>
          </div>
          <div className="property-valuation-form">
            <span className="head-pv-form">
              Fill This Form For Property Valuation
            </span>
            <div className="form-pv">
              <Select
                showSearch
                className="w-100"
                placeholder="Enter District"
                defaultValue={"Coimbatore"}
                onChange={(e) => setCity(e)}
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
              <span className="by-agreeing">
                By continuing I agree to{" "}
                <Link
                  href="/terms-and-conditions"
                  className="albiontc"
                >
                  Albion T&C
                </Link>
              </span>
              <Button
                className="bookPropertyValuation"
                onClick={() => {
                  handlePropertyValuation();
                }}
              >
                Book Property Valuation
              </Button>
            </div>
          </div>
        </div>
        {showLoginModal && (
          <LoginModal
            showModal={showLoginModal}
            setShowModal={setShowLoginModal}
          />
        )}
        <div className="common-section">
          <p className="section__heading">How Property Valuation Works</p>
          <div className="valuation-grid">
            {propertyValuationWorks.map((item) => (
              <div className="grid-box">
                <p className="pv-title">{item.title}</p>
                <span className="pv-desc">{item.description}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="common-section">
          <p className="section__heading">
            Benefits of Property Valuation for Buyers
          </p>
          <div className="valuation-grid">
            {benefitPropertyValuation.map((item) => (
              <div key={item.key} className="grid-box">
                <p className="pv-title">{item.title}</p>
                <span className="pv-desc">{item.description}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="common-section">
          <p className="section__heading">
            The Valuation Report : Your Key to Informed Decisions
          </p>
          <div className="static-card1">
            Whether you're buying or selling, Albion's Property Valuation
            Partner equips you with the valuation report you need to make
            informed property decisions. These reports provide you with a clear
            and accurate picture of a property's worth, empowering you to
            navigate the real estate market with confidence
          </div>
        </div>
        <FAQLazy items={items} image={faqImage} />
      </div>
    </>
  );
};

export default PropertyValuation;

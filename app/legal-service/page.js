"use client";
import { useState } from "react";
import "./legal-service.css";
import legalBannerImg from "@/assets/legalbanner.webp";
import { Button, notification } from "@/utils/antd-component";
import propertyNeededItem from "@/assets/propdocneeded.webp";
import vastuIcon from "@/assets/vastu-ls.webp";
import hoamLoan from "@/assets/home-loan-ls.webp";
import legal from "@/assets/legal.webp";
import legalService from "@/assets/legal-service-banner-final.webp";
import { getEnquiryAboutService } from "@/utils/apiHelpers";
import Cookies from "js-cookie";
import { PhoneOutlined } from "@/utils/icons";
import SEO from "@/components/seo/SEO";
import Image from "next/image";
import dynamic from "next/dynamic";

const LoginModal = dynamic(
  () => import("@/components/modals/LoginModal/LoginModal"),
  {
    ssr: false,
  }
);
const FAQLazy = dynamic(() =>
  import("@/components/common/reusable-component/frequentasked/FAQ", {
    ssr: false,
  })
);
const StaticBanner = dynamic(() =>
  import("@/components/common/reusable-component/static-banner/StaticBanner", {
    ssr: false,
  })
);

const LegalService = () => {
  const neededDocuments = [
    {
      key: 1,
      title: "Legal Consultation",
      desc: "Expert legal advice and guidance tailored to your specific situation.",
    },
    {
      key: 2,
      title: "Document Preparation",
      desc: "Assistance in drafting, reviewing, and validating legal documents such as contracts, wills, and agreements",
    },
    {
      key: 3,
      title: "Litigation Support",
      desc: "Representation and support in legal disputes, including civil, criminal, and family law cases.",
    },
    {
      key: 4,
      title: "Real Estate Transactions",
      desc: " Guidance on property buying, selling, and documentation to ensure a smooth transaction.",
    },
    {
      key: 5,
      title: "Business and Corporate Law",
      desc: " Assistance in legal matters related to business formation, contracts, compliance, and more. ",
    },
  ];

  const items = [
    {
      key: "1",
      label: "How do I know if I need legal assistance?",
      children: (
        <p className="alignLeft">
          Legal assistance is beneficial for a wide range of situations,
          including contractual disputes, property matters, family issues, and
          more. If you have questions or concerns, it's advisable to seek legal
          advice.
        </p>
      ),
    },
    {
      key: "2",
      label: "Are the legal consultations on Albion confidential?",
      children: (
        <p className="alignLeft">
          Yes, all consultations and communications with legal experts are
          confidential and protected by attorney-client privilege.
        </p>
      ),
    },
    {
      key: "3",
      label: "Can I consult with multiple legal experts before choosing one?",
      children: (
        <p className="alignLeft">
          Yes, you have the option to consult with multiple legal experts to
          evaluate your options and make an informed choice.
        </p>
      ),
    },
    {
      key: "4",
      label:
        "Can I use Albion's legal services for both personal and business-related legal matters?",
      children: (
        <p className="alignLeft">
          Yes, Albion's legal services partners cater to both personal and
          business legal needs, offering a range of services to address various
          requirements.
        </p>
      ),
    },
  ];

  let otherServices = [
    {
      key: 1,
      img: hoamLoan,
      title: "Home Loans",
      description:
        "Access competitive home loan options to facilitate your property purchase. Albion partners with leading financial institutions to provide favorable loan terms and rates.",
    },
    {
      key: 1,
      img: vastuIcon,
      title: "Vastu Consultations",
      description:
        " Embrace the ancient Indian science of Vastu Shastra to ensure harmonious and positive energies in your home. Albion connects you with Vastu experts who can offer guidance and recommendations for your property.",
    },
  ];

  let telephonicPlan = [
    {
      key: 1,
      title: "Telephonic Plan 1",
      price: "500",
      duration: "15 Mins In Call With Legal Advocate",
    },
    {
      key: 2,
      title: "Telephonic Plan 2",
      price: "600",
      duration: "30 Mins In Call With Legal Advocate",
    },
    {
      key: 3,
      title: "Telephonic Plan 3",
      price: "1000",
      duration: "45 Mins In Call With Legal Advocate",
    },
    {
      key: 4,
      title: "Telephonic Plan 4",
      price: "1500",
      duration: "60 Mins In Call With Legal Advocate",
    },
  ];

  const [city, setCity] = useState();
  const [showLoginModal, setShowLoginModal] = useState(false);

  function handleFreeConsultation() {
    if (!Cookies.get("user-data")) {
      setShowLoginModal((prevState) => true);
    } else {
      getEnquiryAboutService({
        service: "legal_service",
        details: {
          city: city,
        },
      });
    }
  }

  return (
    <>
      <SEO titleTemplate={"Legal Service"} />
      <div className="legal-service-page">
        <StaticBanner staticBannerImg={legalService} hasRightSection={false} />
        <div className="expert-section">
          {showLoginModal && (
            <LoginModal
              showModal={showLoginModal}
              setShowModal={setShowLoginModal}
            />
          )}
        </div>
        <div className="legal-advice_plans">
          <div className="plans-section">
            {telephonicPlan.map((item) => (
              <div key={item} className="legal-plan-card">
                <span className="plan-card-title">
                  <PhoneOutlined className="phoneIcon" />
                  {item.title}
                </span>
                <span className="plan-card-duration">{item.duration}</span>
                <span className="plan-card-price">Price : {item.price} /-</span>
                <Button
                  className="buyPlanBtn"
                  onClick={() =>
                    notification.warning({
                      message: "This Plan is locked for now",
                      placement: "bottomRight",
                    })
                  }
                >
                  Buy Now
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div className="document_check">
          <div className="document_check-inner__section">
            <span className="docsHeading">
              What Legal Services Companies Offer
            </span>
            <span className="docsDescription">
              Legal Services companies listed on Albion offer a wide range of
              legal solutions to address your diverse needs. These services
              typically include:
            </span>
            <div className="documentsGrid">
              {neededDocuments.map((item) => (
                <div key={item.key} className="documentNeededCard">
                  <Image
                    placeholder="blur"
                    src={propertyNeededItem}
                    alt="Need Document Icon"
                    width={30}
                    height={30}
                    loading="lazy"
                  />
                  <div className="needCol">
                    <span className="cardheading">{item.title}</span>
                    <span className="cardcontent">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="legal-other-service-section">
          <p className="otherservHeading">Other Services</p>
          <div className="other-Services">
            {otherServices.map((item) => (
              <div className="other-service">
                <Image
                  placeholder="blur"
                  src={item.img}
                  alt="Other Services"
                  loading="lazy"
                  height={40}
                  width={40}
                />
                <p className="otherservtitle">{item.title}</p>
                <span className="otherservdesc">{item.description}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="legal-contact-banner">
          <div className="legabannercontainer">
            <Image
              placeholder="blur"
              src={legalBannerImg}
              loading="lazy"
              alt="Legal Banner"
            />
          </div>
          <Button
            className="contactLegalBtn"
            href="mailto:support@albionpropertyhub.com"
            title="Mail To Us"
            onClick={() => {
              getEnquiryAboutService({
                service: "legal_service",
                details: {},
              });
            }}
          >
            Contact Us
          </Button>
        </div>
        <FAQLazy items={items} image={legal} />
      </div>
    </>
  );
};

export default LegalService;

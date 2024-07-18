"use client";
import { useState } from "react";
import "./free-rent.css";
import { Button, notification } from "@/utils/antd-component";
import pointIcon from "@/assets/point-icon.webp";
import axisBankLogo from "@/assets/banklogo/axis-bank.webp";
import hdfcLogo from "@/assets/banklogo/hdfc.webp";
import indianBankLogo from "@/assets/banklogo/indian-bank.webp";
import miscellaneous from "@/assets/miscellaneous.webp";
import termination from "@/assets/termination.webp";
import socialSecurity from "@/assets/social-security.webp";
import office from "@/assets/office.webp";
import lease from "@/assets/lease.webp";
import propertypapers from "@/assets/property-papers.webp";
import meeting from "@/assets/meeting.webp";
import landtLogo from "@/assets/banklogo/l&t.webp";
import licLogo from "@/assets/banklogo/lic.webp";
import SBI from "@/assets/banklogo/state_bank_of_ind.webp";
import rentalBanner from "@/assets/free-rent-banner-final.webp";
import faceScan from "./src-images/face-scan.webp";
import packageMovers from "./src-images/moving.webp";
import homeCleaning from "./src-images/house-cleaning.webp";
import freeRentFaq from "@/assets/fr-faq.webp";
import whyAlbionBanner from "@/assets/whyalbionbaner.webp";
import { getEnquiryAboutService } from "@/utils/apiHelpers";
import Cookies from "js-cookie";
import Image from "next/image";
import dynamic from "next/dynamic";
import { CheckCircleFilled } from "@/utils/icons";

const StaticBanner = dynamic(() =>
  import("@/components/common/reusable-component/static-banner/StaticBanner"), {
    ssr : false
  }
);
const FAQLazy = dynamic(() =>
  import("@/components/common/reusable-component/frequentasked/FAQ"), {
    ssr : false
  }
);
const SEO = dynamic(() => import("@/components/seo/SEO"), {
  ssr : false
});
const LoginModal = dynamic(() =>
  import("@/components/modals/LoginModal/LoginModal") , {
    ssr : false
  }
);

export const AlbionAdvantage = ({ items }) => (
  <div className="albion-adv-list">
    <span className="albionadvtext">Albion’s Advantage</span>
    <div className="alb-advantages">
      {items.map((item) => (
        <div className="adv-point" key={item?.toLowerCase()}>
          <Image
            placeholder="blur"
            src={pointIcon}
            loading="lazy"
            alt="Point Icon"
          />
          <span>{item}</span>
        </div>
      ))}
    </div>
  </div>
);

export const items = [
  {
    key: "1",
    label: " Is the rent agreement created on Albion legally binding?",
    children: (
      <p className="alignLeft">
        Yes, our rent agreements are legally binding and designed to comply with
        relevant legal standards.
      </p>
    ),
  },
  {
    key: "2",
    label: "What customization options are available for rent agreements?",
    children: (
      <p className="alignLeft">
        You can customize clauses related to maintenance, security deposits, and
        other terms as needed.
      </p>
    ),
  },
  {
    key: "3",
    label: " Are there any charges for creating a rent agreement on Albion?",
    children: (
      <p className="alignLeft">
        No, Albion offers free rent agreement templates for your convenience
      </p>
    ),
  },
  {
    key: "4",
    label: "How can I ensure the authenticity of tenant verification reports?",
    children: (
      <p className="alignLeft">
        Our tenant verification services include background checks and identity
        verification to ensure authenticity.
      </p>
    ),
  },
];

const freeRentAgreePoints = [
  {
    key: "1",
    img: meeting,
    label: "Parties Involved",
    children: (
      <p className="alignLeft">
        The rental agreement should clearly state the names and contact details
        of both the landlord and tenant.
      </p>
    ),
  },
  {
    key: "2",
    img: propertypapers,
    label: "",
    children: (
      <p className="alignLeft">
        Specify the rent amount, due date, and the mode of payment.
        Additionally, mention details about security deposits, if applicable.
      </p>
    ),
  },
  {
    key: "3",
    img: office,
    label: " Rent and Deposits",
    children: (
      <p className="alignLeft">
        Specify the rent amount, due date, and the mode of payment.
        Additionally, mention details about security deposits, if applicable.
      </p>
    ),
  },
  {
    key: "4",
    img: lease,
    label: "Term of Lease",
    children: (
      <p className="alignLeft">
        Define the lease duration, including the start and end dates. Include
        provisions for renewal or termination.
      </p>
    ),
  },
  {
    key: "5",
    img: socialSecurity,
    label: " Responsibilities",
    children: (
      <p className="alignLeft">
        Clearly outline the responsibilities of both parties regarding
        maintenance, repairs, and utilities.
      </p>
    ),
  },
  {
    key: "6",
    img: termination,
    label: " Termination and Notice Period",
    children: (
      <p className="alignLeft">
        Specify the conditions under which the agreement can be terminated and
        the notice period required.
      </p>
    ),
  },
  {
    key: "7",
    img: miscellaneous,
    label: "Miscellaneous Clauses",
    children: (
      <p className="alignLeft">
        Include any additional clauses related to pets, subletting, or any
        specific terms agreed upon by both parties.
      </p>
    ),
  },
];

const FreeRentAgreement = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const otherServicesPoint = [
    {
      id: 1,
      title: " Tenant Verification",
      icon: faceScan,
      desc: "Ensure the security of your property with our tenant verification services.Background checks, identity verification, and rental history analysis are just a few of the features we offer.",
      color: "#FFF",
    },
    {
      id: 2,
      title: "Packers & Movers",
      icon: packageMovers,
      desc: "Moving can be stressful, but Albion's packers and movers service makes it a breeze.Trust our experienced professionals to handle your belongings safely and efficiently.",
      color: "#FFF",
    },
    {
      id: 3,
      title: "Home Cleaning",
      icon: homeCleaning,
      desc: "Prepare your property for new tenants or enjoy a fresh start with Albion's home cleaning service.Our skilled cleaners will leave your property spotless and inviting.",
      color: "#FFF",
    },
  ];

  const data = [
    {
      key: "1",
      bank: {
        name: "HDFC",
        logo: hdfcLogo,
      },
      rate: "8.5% - 8.9% p.a.",
      tenure: "10 - 30 years",
    },
    {
      key: "2",
      bank: {
        name: "SBI",
        logo: SBI,
      },
      rate: "8.5% - 8.9% p.a.",
      tenure: "10 - 30 years",
    },
    {
      key: "3",
      bank: {
        name: "INDIAN BANK",
        logo: indianBankLogo,
      },
      rate: "8.5% - 8.9% p.a.",
      tenure: "10 - 30 years",
    },
    {
      key: "4",
      bank: {
        name: "AXIS BANK",
        logo: axisBankLogo,
      },
      rate: "8.5% - 8.9% p.a.",
      tenure: "10 - 30 years",
    },
    {
      key: "5",
      bank: {
        name: "KOTAK MAHENDRA BANK",
        logo: hdfcLogo,
      },
      rate: "8.5% - 8.9% p.a.",
      tenure: "10 - 30 years",
    },
    {
      key: "6",
      bank: {
        name: "LIC Housing Finance Loan",
        logo: licLogo,
      },
      rate: "8.5% - 8.9% p.a.",
      tenure: "10 - 30 years",
    },
    {
      key: "7",
      bank: {
        name: "L&T Housing Finance",
        logo: landtLogo,
      },
      rate: "8.5% - 8.9% p.a.",
      tenure: "10 - 30 years",
    },
  ];
  const styles = {
    commonColor: {
      color: "#8C193F",
      transform: "scale(1.3)",
    },
  };

  return (
    <>
      <SEO titleTemplate={"Free Rent Agreement"} />
      <div className="package-mover-page">
        {showLoginModal && (
          <LoginModal
            showModal={showLoginModal}
            setShowModal={setShowLoginModal}
          />
        )}
        <div className="web-free-rent">
          <StaticBanner
            staticBannerImg={rentalBanner}
            rightSection={
              <div className="get-enquireform">
                <span className="maintitle">
                  Enquire Now for <span>FREE</span>
                </span>
                <span className="checkRow">
                  <CheckCircleFilled className="colorOnlyGreen" /> Easy & super
                  quick online drafting
                </span>
                <span className="checkRow">
                  <CheckCircleFilled className="colorOnlyGreen" /> Completely
                  customisable template
                </span>
                <span className="checkRow">
                  <CheckCircleFilled className="colorOnlyGreen" /> Instant
                  download available for FREE
                </span>
                <Button
                  className="getEnquiryBtn"
                  onClick={() => {
                    if (Cookies.get("user-data")) {
                      getEnquiryAboutService({
                        service: "free_rental_agreement",
                        details: {},
                      }).then((res) =>
                        notification.success({
                          message: "You Will Get A Call From Us Shortly",
                          description: "Thank You For Choosing Albion",
                          placement: "bottomRight",
                        })
                      );
                    } else {
                      setShowLoginModal((prevState) => true);
                    }
                  }}
                >
                  Get Enquiry
                </Button>
              </div>
            }
          />
        </div>
        <div className="mobile-free-rent">
          <Image
            placeholder="blur"
            src={rentalBanner}
            width={400}
            className="mobile-free-rent-img"
            alt="Rental Banner"
            loading="lazy"
          />
          <div className="get-enquireform">
            <span className="maintitle">
              Enquire Now for <span>FREE</span>
            </span>
            <span className="checkRow">
              <CheckCircleFilled className="colorOnlyGreen" /> Easy & super
              quick online drafting
            </span>
            <span className="checkRow">
              <CheckCircleFilled className="colorOnlyGreen" /> Completely
              customisable template
            </span>
            <span className="checkRow">
              <CheckCircleFilled className="colorOnlyGreen" /> Instant download
              available for FREE
            </span>
            <Button
              className="getEnquiryBtn"
              onClick={() => {
                if (Cookies.get("user-data")) {
                  getEnquiryAboutService({
                    service: "free_rental_agreement",
                    details: {},
                  }).then((res) =>
                    notification.success({
                      message: "You Will Get A Call From Us Shortly",
                      description: "Thank You For Choosing Albion",
                      placement: "bottomRight",
                    })
                  );
                } else {
                  setShowLoginModal((prevState) => true);
                }
              }}
            >
              Get Enquiry
            </Button>
          </div>
        </div>
        <div className="howItWorks">
          <section>
            <span className="headtext">
              All You Need to Know About Rental Agreement
            </span>
            <span className="subText">
              A rental agreement is a crucial document that outlines the terms
              and conditions of a rental arrangement. Here's what you should
              know about its content
            </span>
            <div className="freeRentGrid">
              {freeRentAgreePoints.map((item) => (
                <div key={item.label} className="freePoints">
                  <Image
                    placeholder="blur"
                    src={item.img}
                    height={40}
                    width={40}
                    alt="Free Points"
                    loading="lazy"
                  />
                  <p className="header">{item.label}</p>
                  {item.children}
                </div>
              ))}
            </div>
          </section>
        </div>
        <div className="design-important">
          <div className="design-important__inner-sec">
            <span className="iftitle">Explore Other Services</span>
            <span className="ifdesc">
              At Albion, we offer a range of services beyond rent agreements to
              enhance your renting experience:
            </span>
            <div className="interior-design-grid">
              {otherServicesPoint.map((item) => (
                <div
                  key={item.title}
                  className="other-service-card"
                  style={{
                    backgroundColor: item.color,
                  }}
                >
                  <Image
                    placeholder="blur"
                    src={item.icon}
                    width="50"
                    height="50"
                    alt="Other Service Card"
                    loading="lazy"
                  />
                  <div className="sc-content">
                    <span className="cardtitle">{item.title}</span>
                    <span className="carddescription">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="why-albion-banner">
          <div className="why-albion__banner-is">
            <Image
              placeholder="blur"
              src={whyAlbionBanner}
              alt="Why Albion"
              loading="lazy"
            />
          </div>
        </div>
        <FAQLazy image={freeRentFaq} items={items} />
      </div>
    </>
  );
};

export default FreeRentAgreement;

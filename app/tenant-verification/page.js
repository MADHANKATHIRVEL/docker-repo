'use client'
import { useState } from "react";
import "./tenant-verification.css";
import tenantVerificationBanner from "@/assets/tenant_verification.webp";
import { capitalizeFirstLetter } from "@/utils/helpers";
import { tenantVerificationPlan } from "@/components/plans/planutils";
import { Button, Tag, notification } from "@/utils/antd-component";
import {
  CheckOutlined,
  CloseOutlined
} from "@/utils/icons";
import dynamic from "next/dynamic";

const SEO = dynamic(() => import("@/components/seo/SEO"), {
  ssr : false
})
const UITabRight = dynamic(() => import("@/components/common/reusable-component/ui-tab-right/UITabRight"), {
  ssr : false
})
const StaticBanner = dynamic(() => import("@/components/common/reusable-component/static-banner/StaticBanner"), {
  ssr : false
})


const FAQLazy = dynamic(() =>
  import("@/components/common/reusable-component/frequentasked/FAQ"), {
    ssr : false
  }
);
const TenantVerification = () => {
  const [selectedStep, setSelectedStep] = useState(1);

  let tenantVerificationWorks = [
    {
      key: 1,
      title: "Submit Tenant Details",
      description:
        "Provide the necessary information about your prospective tenant, including their name, contact details, and other relevant particulars.",
    },
    {
      key: 2,
      title: "Request Verification",
      description:
        "Choose the verification services you require from our offerings. Albion offers a range of verification checks, allowing you to customize your tenant's screening process.",
    },
    {
      key: 3,
      title: "Verification Process",
      description:
        "Our team will initiate the verification process, which includes identity verification, criminal court checks, civil litigation checks, permanent address verification, and reference checks.",
    },
    {
      key: 4,
      title: "Comprehensive Reports",
      description:
        "Upon completion of the verification process, you'll receive detailed reports outlining the results of each check. These reports will help you assess the suitability of the tenant.",
    },
    {
      key: 5,
      title: "Informed Decision",
      description:
        "Armed with the insights provided by the reports, you can confidently decide whether to proceed with the tenant application.",
    },
  ];

  let knowYourReports = [
    {
      key: 1,
      title: "Identity Verification",
      description:
        "Confirm the identity of the tenant to prevent identity fraud and ensure you're dealing with the right person.",
    },
    {
      key: 2,
      title: "Criminal Court Check",
      description:
        "Gain insights into the tenant's criminal history to assess potential risks.",
    },
    {
      key: 3,
      title: "Civil Litigation Check",
      description:
        "Understand if the tenant has been involved in any civil litigation cases, which can be indicative of financial stability and responsibility.",
    },
    {
      key: 4,
      title: "Permanent Address Verification",
      description:
        "Verify the tenant's stated permanent address to ensure accuracy and authenticity.",
    },
    {
      key: 5,
      title: "Reference Check",
      description:
        "Reach out to the provided references to gather insights into the tenant's character, reliability, and past rental experiences.",
    },
  ];

  let whyYouNeedTenantVerification = [
    {
      key: 1,
      title: "Security and Peace of Mind",
      description:
        "Tenant verification helps you ensure that your property is entrusted to responsible and trustworthy individuals, minimizing the risk of property damage or unpaid rent.",
    },
    {
      key: 2,
      title: "Compliance",
      description:
        "In some regions, tenant verification is legally required to meet regulatory standards and protect both landlords and tenants.",
    },
    {
      key: 3,
      title: "Risk Mitigation",
      description:
        "Identifying potential red flags through verification checks can prevent future disputes and legal complications.",
    },
    {
      key: 4,
      title: "Financial Stability",
      description:
        "Knowing your tenant's financial and legal history can give you confidence in their ability to meet rent obligations.",
    },
    {
      key: 5,
      title: "Protecting Your Investment",
      description:
        "Your property is a significant investment; tenant verification safeguards that investment by helping you choose the right tenant.",
    },
  ];

  const tenantVerificationFAQ = [
    {
      key: "1",
      label: "Is tenant verification mandatory for all landlords?",
      children: (
        <p className="alignLeft">
          Tenant verification may be required by law in some regions, while
          others leave it to the discretion of landlords. It's advisable to
          check local regulations.
        </p>
      ),
    },
    {
      key: "2",
      label: "How long does the tenant verification process typically take?",
      children: (
        <p className="alignLeft">
          The duration may vary, but it usually takes a few days to a week to
          complete all verification checks and compile the reports.
        </p>
      ),
    },
    {
      key: "3",
      label:
        "What information is needed from the tenant for the verification process?",
      children: (
        <p className="alignLeft">
          Typically, you'll need the tenant's full name, contact details,
          identification documents, and authorization to perform the checks.
        </p>
      ),
    },
    {
      key: "4",
      label: "Are the results of tenant verification shared with the tenant?",
      children: (
        <p className="alignLeft">
          No, the results are typically confidential and shared only with the
          landlord or property owner who requested the verification.
        </p>
      ),
    },
    {
      key: "5",
      label:
        "Can tenant verification be conducted for commercial properties as well?",
      children: (
        <p className="alignLeft">
          Yes, tenant verification services can be applied to both residential
          and commercial properties.
        </p>
      ),
    },
  ];

  return (
    <>
      <SEO titleTemplate={"Tenant Verification"} />
      <div className="tenant-verification-page">
        <StaticBanner
          staticBannerImg={tenantVerificationBanner}
          hasRightSection={false}
        />
        <div className="first-row">
          <span className="section__heading">
            How Tenant Verification Works
          </span>
          <span className="tenant-verification-desc">
            Tenant Verification is designed to help property owners and
            landlords make informed choices when selecting tenants for their
            properties. Here's how it works
          </span>
          <div className="tenant-verification-steps">
            <div className="tab-selection">
              {tenantVerificationWorks.map((item) => (
                <Button
                  key={item.key}
                  onClick={() => setSelectedStep(item.key)}
                  className={
                    selectedStep == item.key ? "activeStep" : "inActiveStep"
                  }
                >
                  {item.title}
                </Button>
              ))}
            </div>
            <p className="tenant-verification-step">
              {tenantVerificationWorks[selectedStep - 1].description}
            </p>
          </div>
        </div>
        <div className="tenant-plans-row">
          <span className="section__heading">Tenant Verification Plans</span>
          <div className="tenant-verification-plan-grid">
            {tenantVerificationPlan.map((item) => (
              <div className="tenant-verification-plan-card">
                <Tag
                  className="tv-tag"
                >
                  {capitalizeFirstLetter(item.label)}
                </Tag>
                <p className="tenant-verification-price">{item.price}</p>
                {item.benefits.map((benefit) => (
                  <div className="benefit-price">
                    {benefit.hasBenefit ? (
                      <CheckOutlined className="check"/>
                    ) : (
                      <CloseOutlined className="close" />
                    )}
                    {benefit.title}
                  </div>
                ))}
                <Button className="buyTenantPlanBtn" onClick={() => notification.warning({
                  message : "This Feature is locked for now"
                })}>Buy Plan</Button>
              </div>
            ))}
          </div>
        </div>
        <div className="know-reports">
          <span className="section__heading">Know Your Reports</span>
          <div className="valuation-grid">
            {knowYourReports.map((item) => (
              <div className="grid-box">
                <p className="pv-title">{item.title}</p>
                <span className="pv-desc">{item.description}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="why-you-need-tv">
          <p className="section__heading whyneed">
            Why You Need Tenant Verification
          </p>
          <UITabRight items={whyYouNeedTenantVerification} />
          {/* <div className="valuation-grid">
          {whyYouNeedTenantVerification.map((item) => (
            <div className="grid-box">
              <p className="pv-title">{item.title}</p>
              <span className="pv-desc">{item.description}</span>
            </div>
          ))}
        </div> */}
        </div>
        <div className="tenant-verification_importance">
          <p className="section__heading">
            The Importance of Tenant Verification
          </p>
          <div>
            <span className="tenant-verification-desc">
              Tenant verification is more than just a background check, it's a
              critical step in establishing a secure and harmonious
              landlord-tenant relationship. It ensures that both parties can
              trust each other, setting the stage for a positive and stress-free
              rental experience.
            </span>
          </div>
        </div>
        <FAQLazy items={tenantVerificationFAQ} image={undefined} />
      </div>
    </>
  );
};

export default TenantVerification;

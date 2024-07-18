'use client'
import { useState, Fragment } from "react";
import "./help.css";
import { Form, Input, Button, Select } from "@/utils/antd-component";
import guideImg from "@/assets/guide-image.webp";
import supportLocation from "@/assets/support-location.webp";
import supportCall from "@/assets/support-call.webp";
import supportMail from "@/assets/support-mail.webp";
import fbOut from "@/assets/fb-out.webp";
import instaOut from "@/assets/insta-out.webp";
import linkOut from "@/assets/link-out.webp";
import enquiry from "@/assets/enquiry.webp";
import ticket from "@/assets/ticket.webp";
import { items } from "../home-loan/HomeLoan";
import faqImage from "@/assets/helpfaq.webp";
import { getEnquiryAboutService } from "@/utils/apiHelpers";
import TextArea from "antd/es/input/TextArea";
import Image from "next/image";
import dynamic from "next/dynamic";

export const FAQLazy = dynamic(() =>
  import("@/components/common/reusable-component/frequentasked/FAQ"), {
    ssr : false
  }
);
const SEO = dynamic(() => import("@/components/seo/SEO"))

const Help = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    whoYouAre: "",
    howCanWeHelp: "",
  });

  let sociaLinks = [
    {
      key: 1,
      logo: fbOut,
      link: "https://www.facebook.com/albionpropertyhub",
      title: "Facebook",
    },
    {
      key: 2,
      logo: linkOut,
      link: "https://linkedin.com/company/albionpropertyhub",
      title: "Linkedin",
    },
    {
      key: 3,
      logo: instaOut,
      link: "https://www.instagram.com/albionpropertyhub/",
      title: "Instagram",
    },
  ];

  let supportContent = [
    {
      key: "address",
      content: (
        <div className="support_details-card">
          <Image placeholder="blur" src={supportLocation} loading="lazy" alt="Support Location" />
          <span
            className="support-data"
            onClick={() =>
              openGoogleMaps(
                "LEVEL 5, TAMARAI TECH PARK, S.P.PLOT NO.16-19 & 20-A,THIRU VI KA   INDUSTRIAL ESTATE,INNER RING ROAD GUINDY Chennai TN 600032"
              )
            }
          >
            <strong>
              Albion Investments and Holdings Pvt Ltd
              <br />
            </strong>
            LEVEL 5, TAMARAI TECH PARK, S.P.PLOT NO.16-19 & 20-A, THIRU VI KA
            INDUSTRIAL ESTATE,INNER RING ROAD GUINDY Chennai TN 600032
          </span>
        </div>
      ),
    },
    {
      key: "call",
      content: (
        <div className="support_details-card">
          <Image placeholder="blur" src={supportCall} loading="lazy" alt="Support Call" />
          <a className="support-data" href="tel:+91 9442203866">
            +91 9442203866
          </a>
        </div>
      ),
    },
    {
      key: "mail",
      content: (
        <div className="support_details-card">
          <Image placeholder="blur" src={supportMail} loading="lazy" alt="Support Mail" />
          <a className="support-data" href="mailto:support@albionproperty.com">
            support@albionpropertyhub.com
          </a>
        </div>
      ),
    },
    {
      key: "social_links",
      content: (
        <div className="support_details-card">
          <div
            className="soc_i"
          >
            {sociaLinks.map((item) => (
              <Image placeholder="blur"
                src={item.logo}
                loading="lazy"
                onClick={() => {
                  if(typeof window != undefined){
                    window.open(item.link)
                  }
                }}
                title={item.title}
                alt="Social Media"
              />
            ))}
          </div>
        </div>
      ),
    },
  ];

  const handleFormSubmit = () => {
    getEnquiryAboutService({
      service: "help",
      details: formData,
    });
  };

  return (
    <Fragment>
      <SEO titleTemplate={"Help"} />
      <div className="help_page">
        <div className="help_page-inner-section">
          <div className="help_page-banner-content">
            <div className="help_page-lc">
              <span className="help-heading">
                Unlock the Door to Property Selling Success
              </span>
              <span className="help_desc">
                Your Guide to a Seamless Experience!
              </span>
            </div>
            <div className="help-page-rc">
              <Image placeholder="blur" src={guideImg} alt={"Support"} loading="lazy" />
            </div>
          </div>
        </div>
        <div className="help-page-second_row">
          <div className="row_inner-section">
            <div className="albionSupportDetails">
              {supportContent.map((item) => (
                <div key={item.key} className="support__card">
                  {item.content}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="help-page__third-row">
          <div className="row_inner-section">
            <div className="help-info">
              <div className="help-cards">
                <div className="help-content">
                  <span className="st1">All you need to know about</span>
                  <span className="st2">Enquiry / Complaint</span>
                  <p className="st3">
                    Explore a comprehensive guide covering everything you should
                    understand about the process, purpose, and resolution of
                    enquiries and complaints.
                  </p>
                </div>
                <div className="help_image_container">
                  <Image placeholder="blur" src={enquiry} loading="lazy" alt="Albion Enquiry" />
                </div>
              </div>
              <div className="help-cards">
                <div className="help-content">
                  <span className="st1">All you need to know about</span>
                  <span className="st2">Submit a Ticket</span>
                  <p className="st3">
                    Discover essential information on the ticket submission
                    process, including its purpose, steps, and best practices.
                  </p>
                </div>
                <div className="help_image_container">
                  <Image placeholder="blur" src={ticket} loading="lazy" alt="Albion Ticket" />
                </div>
              </div>
            </div>
            <div className="get-in-touch__form">
              <span className="form-title">We'll get in touch with you</span>
              <Form layout="vertical" className="help-form">
                <Form.Item label="Name">
                  <Input
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </Form.Item>
                <Form.Item label="Email">
                  <Input
                    placeholder="you@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </Form.Item>
                <Form.Item label="Phone Number">
                  <Input
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                  />
                </Form.Item>
                <Form.Item label="Who you are?">
                  <Select
                    value={formData.whoYouAre}
                    onChange={(value) =>
                      setFormData({ ...formData, whoYouAre: value })
                    }
                    placeholder="Select"
                  >
                    <Select.Option value="agent">Agent</Select.Option>
                    <Select.Option value="buyer">Buyer</Select.Option>
                    <Select.Option value="builder">Builder</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="How can we help?">
                  <Select
                    value={formData.howCanWeHelp}
                    onChange={(value) =>
                      setFormData({ ...formData, howCanWeHelp: value })
                    }
                    placeholder="Select"
                  >
                    <Select.Option value="home_loan">
                      Apply For Home Loan
                    </Select.Option>
                    <Select.Option value="abt_packages">
                      About Pricing
                    </Select.Option>
                    <Select.Option value="abt_packages">
                      Post a Property
                    </Select.Option>
                    <Select.Option value="abt_packages">
                      About Free Rental Agreement
                    </Select.Option>
                    <Select.Option value="abt_packages">
                      Generate Leads
                    </Select.Option>
                    <Select.Option value="abt_packages">
                      Tenant Verification
                    </Select.Option>
                    <Select.Option value="abt_packages">
                      Query About Package Movers / Home Interior
                    </Select.Option>
                    <Select.Option value="abt_packages">
                      About Legal Service Plan
                    </Select.Option>
                    <Select.Option value="abt_packages">
                      About Albion Pricing
                    </Select.Option>
                    <Select.Option value="abt_packages">
                      Query About Property Valuation Service
                    </Select.Option>
                    <Select.Option value="other_services">
                      Other Services
                    </Select.Option>
                  </Select>
                </Form.Item>
                {formData.howCanWeHelp === "other_services" && (
                  <>
                    <Form.Item label="">
                      <TextArea
                        placeholder="Enter Your Query Here"
                        value={formData.otherQuery}
                        onChange={(value) =>
                          setFormData({ ...formData, otherQuery: value })
                        }
                        autoSize={{ minRows: 3, maxRows: 10 }}
                      />
                    </Form.Item>
                  </>
                )}
                <Form.Item>
                  <Button
                    className="formSubmit"
                    onClick={handleFormSubmit}
                    disabled={
                      !formData.email ||
                      !formData.howCanWeHelp ||
                      !formData.name ||
                      !formData.phoneNumber ||
                      !formData.whoYouAre
                    }
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
        <div className="faq-help__users">
          <div className="row_inner-section">
            <div className="row-inner-section-divs">
              <span className="text_head">How can Albion FAQ help users?</span>
              <p className="text_desc">
                Welcome to the Albion FAQ (Frequently Asked Questions) page,
                where buyers and owners can find answers to their questions
                related to login or registration, property search, property
                advertisement posting, account management and other related
                topics. Start your search by simply entering keywords in the
                search-bar, located at the top of the page or you can browse
                through questions under the categories given below.
                Alternatively, you can also reach out to us at +91 9442203866
                (Monday to Saturday, 9 AM to 7 PM) to talk to our customer
                support executive. Additionally, you can also explore the
                Articles section below, for the latest real estate news and
                updates.
              </p>
            </div>
          </div>
        </div>
        <FAQLazy items={items} image={faqImage} />
      </div>
    </Fragment>
  );
};

export default Help;

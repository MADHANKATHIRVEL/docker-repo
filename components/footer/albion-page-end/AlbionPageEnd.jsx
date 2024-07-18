"use client";
import "./albion-page-end.css";
import Image from "next/image";
import albionLogo from "@/assets/light-version_albionapp.webp";
import appStoreWebp from "@/assets/app-store.png";
import playStoreWebp from "@/assets/play-store.png";
import twitterIcon from '@/assets/twitter.png'
import { FacebookFilled, InstagramFilled, LinkedinFilled, YoutubeFilled } from "@ant-design/icons";
import Link from "next/link";

let otherServices = [
  {
    key: "about_us",
    label: "About Us",
    link: "/about-us",
  },
  {
    key: "blogs_",
    label: "Blogs",
    link: "/blogs",
  },
  {
    key: "contact_us",
    label: "Contact Us",
    link: "/contact-us",
  },
  {
    key: "home_loan",
    label: "Home Loan",
    link: "/home-loan",
  },
  {
    key: "privacy_policy",
    label: "Privacy Policy",
    link: "/privacy-policy",
  },
  {
    key: "terms_and_conditions",
    label: "Terms And Conditions",
    link: "/terms-and-conditions",
  },
];

const AlbionPageEnd = () => {
  return (
    <div className="albion-page-end_section">
      <div className="end-section-first-row">
        <div className="end-section-inner-area">
          <div className="imagearea">
            <Image loading="lazy" src={albionLogo} height={70} width={180} className="Albion Logo" alt="Albion Logo"/>
            <div
              className="social-icons-links"
            >
              <Link
                href={{
                  pathname : "https://www.facebook.com/albionpropertyhub"
                }}
                target="_blank"
              >
                <FacebookFilled style={{color : "#fff" , transform : "scale(2)" , cursor : "pointer"}}/>
              </Link>
              <Link
                href={{
                  pathname : "https://www.instagram.com/albionpropertyhub/"
                }}
                target="_blank"
              >
                <InstagramFilled style={{color : "#fff" , transform : "scale(2)" , cursor : "pointer"}}/>
              </Link>
              <Link
                href={{
                  pathname : "https://www.youtube.com/@albionpropertyhub"
                }}
                target="_blank"
              >
                <YoutubeFilled style={{color : "#fff" , transform : "scale(2)" , cursor : "pointer"}}/>
              </Link>
              <Link
                href={{
                  pathname : "https://www.linkedin.com/company/albionpropertyhub/"
                }}
                target="_blank"
              >
                <LinkedinFilled style={{color : "#fff" , transform : "scale(2)" , cursor : "pointer"}}/>
              </Link>
              <Link
                href={{
                  pathname : "https://x.com/albion_hub"
                }}
                target="_blank"
              >
                <Image src={twitterIcon} height={25} width={25}/>
              </Link>
            </div>
          </div>
          <div className="appdownloadlinks">
            <h4>DOWNLOAD OUR APP</h4>
            <div>
              <a href="https://play.google.com/store/apps/details?id=com.albionNew&pcampaignid=web_share">
                <Image loading="lazy" src={playStoreWebp} height={50} width={160} alt="Play Store Webp"/>
              </a>
              <a href="https://apps.apple.com/us/app/albion-property-hub/id6476275094">
                <Image loading="lazy" src={appStoreWebp} height={50} width={160} alt="App Store Webp"/>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="other-services">
        <div className="services">
          {otherServices.map((service) => (
            <a href={service.link} key={service.key} className="service">
              {service.label}
            </a>
          ))}
        </div>
      </div>
      <div className="disclaimer">
        <p>
          Disclaimer: <span>Albion Property Hub only advertises properties on behalf
          of sellers and is not involved in any transactions between the buyers
          and sellers. Any offers or discounts on this website come from the
          builders or developers who advertised their products. Albion Property
          Hub is just sharing these offers and is not responsible for selling or
          providing any of these products or services. We do not guarantee or
          make any promises about the offers on the site. Albion Property Hub
          will not be responsible for resolving any disputes between buyers and
          sellers; they must resolve their issues without involving us.</span>
        </p>
      </div>
      <div className="copyrights">
        <div className="copyrightsText">
          <span className="leftside">
            Copyright {new Date().getFullYear()} Albion Investments and Holdings
            Pvt Ltd - All rights reserved.
          </span>
        </div>
      </div>
    </div>
  );
};

export default AlbionPageEnd;

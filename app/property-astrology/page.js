'use client'
import "./property-astrology.css";
import peaceAndHarmony from "@/assets/alliance.webp";
import personalizedGuidance from "@/assets/guide.webp";
import astrologicalCompatibility from "@/assets/astrology.webp";
import timingMatters from "@/assets/back-in-time.webp";
import minimiseRisks from "@/assets/compliance.webp";
import { Button } from "@/utils/antd-component";
import {
  MailOutlined
} from "@/utils/icons";
import Image from "next/image";
import dynamic from "next/dynamic";

const SEO = dynamic(() => import("@/components/seo/SEO"), {
  ssr : false
})

const PropertyAstrology = () => {
  const astrologyPoints = [
    {
      id: 1,
      title: "Personalized Guidance",
      icon: personalizedGuidance,
      desc: "Our network of experienced astrologers specializes in property-related astrology. They provide personalized insights based on your birth chart and property goals.",
      color: "#D6EAF8",
    },
    {
      id: 2,
      title: "Astrological Compatibility",
      icon: astrologicalCompatibility,
      desc: "Discover properties that resonate with your astrological profile, enhancing your connection to your new home or investment.",
      color: "#D1F2EB",
    },
    {
      id: 3,
      title: "Timing Matters",
      icon: timingMatters,
      desc: "Property Astrology helps you identify auspicious times for property-related decisions, such as buying, selling, or moving.",
      color: "#F6DDCC",
    },
    {
      id: 4,
      title: "Minimise Risks",
      icon: minimiseRisks,
      desc: "Astrological guidance can help you anticipate potential challenges or setbacks in your property journey, allowing you to prepare and mitigate risks.",
      color: "#E8DAEF",
    },
    {
      id: 5,
      title: "Peace and Harmony",
      icon: peaceAndHarmony,
      desc: "Align your property choices with the positive energies of the universe, fostering harmony and prosperity in your living space.",
      color: "#FCF3CF",
    },
  ];

  return (
    <>
      <SEO
        titleTemplate={"Property Astrology"}
      />
    <div className="property-astrology-page">
      <div className="main-intro">
        <h2>Guiding Your Property Journey with Cosmic Insights</h2>
        <span>
          Albion is thrilled to introduce our Property Astrology service, a
          unique collaboration with the top astrologers in your city. We
          understand that buying or selling property is not just a financial
          decision; it's an emotional journey. With Property Astrology, you can
          now gain profound insights into how the cosmic forces align with your
          property aspirations.
        </span>
      </div>
      <div className="btnSection">
        <Button className="mailusbtn" href="mailto:support@albionpropertyhub.com">
          <MailOutlined/>
          Mail Us To Know More
        </Button>
      </div>
      <div className="why-astrology-section">
        <h5>Why Choose Property Astrology</h5>
        <div className="why-propery-astrology">
          {astrologyPoints.map((item) => (
            <div
              key={item.id}
              className="design-card"
              style={{
                backgroundColor: item.color,
              }}
            >
              <Image placeholder="blur"
                src={item.icon}
                loading="lazy"
                alt="Albion Home Interior Card"
              />
              <span className="cardtitle">{item.title}</span>
              <span className="carddescription">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default PropertyAstrology;

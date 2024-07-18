"use client";
import "./discover-projects.scss";
import bhkAsset from "@/assets/bhk-asset.png";
import budgetAsset from "@/assets/budget-asset.png";
import Image from "next/image";
import arrowPng from "./assets/arrow-up.png";
import Link from "next/link";

let bhkQuickLinks = [
  {
    key: "1-bhk-properties",
    label: "1 BHK Properties",
    link: "/property/1-BHK-house-in-coimbatore",
  },
  {
    key: "2-bhk-properties",
    label: "2 BHK Properties",
    link: "/property/2-BHK-house-in-coimbatore",
  },
  {
    key: "3-bhk-properties",
    label: "3 BHK Properties",
    link: "/property/3-BHK-house-in-coimbatore",
  },
];

let budgetQuickLinks = [
  {
    key: "low-budget",
    label: "Low Budget",
    desc: "10L - 30L",
    link: "/property/properties-in-coimbatore?min_budget=1000000&max_budget=3000000",
  },
  {
    key: "medium-budget",
    label: "Medium Budget",
    desc: "30L - 50L",
    link: "/property/properties-in-coimbatore?min_budget=3000000&max_budget=5000000",
  },
  {
    key: "high-budget",
    label: "High Budget",
    desc: "Above 50L",
    link: "/property/properties-in-coimbatore?min_budget=5000000",
  },
];

const DiscoverProjects = ({ renderKey }) => {
  function getQuickLinks() {
    switch (renderKey) {
      case "bedroom":
        return bhkQuickLinks.map((obj) => (
          <Link
            className="bhk-quick-link-card"
            style={{
              background: renderKey == "bedroom" ? "#DCF5EC" : "#EDF8FF",
            }}
            href={{
              pathname: obj.link,
            }}
            as={obj.link}
            target="_blank"
          >
            <Image
              src={renderKey == "bedroom" ? bhkAsset : budgetAsset}
              loading="lazy"
              alt="Discover Card Component Image"
            />
            <div>
              <h2>{obj.label}</h2>
              {obj.desc ? <h5>{obj.desc}</h5> : ""}
            </div>
            <Image src={arrowPng} loading="lazy" className="Arrow Png Image" alt="Arrow Png Image"/>
          </Link>
        ));
      case "budget":
        return budgetQuickLinks.map((obj) => (
          <Link
            className="bhk-quick-link-card"
            style={{
              background: renderKey == "bedroom" ? "#DCF5EC" : "#EDF8FF",
            }}
            href={{
              pathname: obj.link,
            }}
            as={obj.link}
            target="_blank"
          >
            <Image
              src={renderKey == "bedroom" ? bhkAsset : budgetAsset}
              loading="lazy"
              alt="Discover Card Component Image"
            />
            <div>
              <h2>{obj.label}</h2>
              {obj.desc ? <h5>{obj.desc}</h5> : ""}
            </div>
            <Image src={arrowPng} loading="lazy" className="Arrow Png Image" alt="Arrow Png Image"/>
          </Link>
        ));
    }
  }

  return (
    <section className="dp-inner-area">
      {renderKey === "bedroom" ? (
        <h3>
          Discover <span>Projects By</span>
        </h3>
      ) : (
        <h3>
          Projects <span>By Budget</span>
        </h3>
      )}
      <div className="properties-quick-links">{getQuickLinks(renderKey)}</div>
    </section>
  );
};

export default DiscoverProjects;

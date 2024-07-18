import "./about.css";
import "../albion-page-end/albion-page-end.css";
import mainLogo from "@/assets/footlogo.webp";
import faceBook from "@/assets/facebook.webp";
import linkedin from "@/assets/linkedin.webp";
import instagram from "@/assets/instagram.webp";
import youtube from "@/assets/youtube.webp";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

let aboutData = [
  {
    title: "Discover Albion",
    description:
      "Welcome to Albion, your trusted partner in realizing your dreams of homeownership. At Albion, we understand that your home isn't just a place; it's a reflection of your aspirations, a sanctuary for your family, and a canvas for your dreams. We're here to make that journey to your dream home seamless and rewarding.",
  },
  {
    title: "Our Services: Beyond Home Loans",
    description:
      "While home loans are at the core of our offerings, Albion is more than just a loan facilitator. We've expanded our services to cater to all your homeownership needs. From interior designing to property valuation, legal services, and tenant verification, we're here to support you at every stage of your homeownership journey.",
  },
  {
    title: "Our Vision: Transforming Homeownership",
    description:
      "Our vision is simple yet profound—to transform the way people experience homeownership. We believe that everyone deserves the opportunity to find their perfect home, and we've made it our mission to simplify this process for you. With Albion, you're not just searching for a house; you're embarking on a journey towards your ideal lifestyle",
  },
  {
    title: "ALBION Investments & Holdings Pvt Ltd",
    description:
      "ALBION Investments & Holdings Pvt Ltd is your premier destination for financial success. With a solid track record of wealth creation, we provide expert guidance in investments, asset management, and financial planning.Our dedicated team of professionals is committed to helping you achieve your financial goals. Whether you're planning for retirement, growing your wealth, or diversifying your portfolio, we have the strategies and solutions you need.",
  },
];

let prop = [
  {
    key: "buy",
    value: "Buy",
    link: "results",
  },
  {
    key: "rent",
    value: "Rent",
    link: "results",
  },
  {
    key: "property_sell",
    value: "Property Sell",
    link: "post-property",
  },
  {
    key: "support",
    value: "Support",
    link: "contact-us",
  },
  {
    key: "about",
    value: "About Us",
    link: "about-us",
  },
];

let socialLogos = [
  {
    key: 1,
    logo: faceBook,
    link: "https://www.facebook.com/albionpropertyhub",
    title: "Facebook",
  },
  {
    key: 2,
    logo: linkedin,
    link: "https://linkedin.com/company/albionpropertyhub",
    title: "Linkedin",
  },
  {
    key: 3,
    logo: instagram,
    link: "https://www.instagram.com/albionpropertyhub/",
    title: "Instagram",
  },
  {
    key: 4,
    logo: youtube,
    link: "https://www.youtube.com/@albionpropertyhub",
    title: "Youtube",
  },
];

const About = () => {

  const router = useRouter()

  return (
    <div className="about-section">
      <div className="about-grid">
        {aboutData.map((item) => (
          <div className="itemDiv" key={`${item.title}_1`}>
            <span className="title">{item.title}</span>
            <span className="description">{item.description}</span>
          </div>
        ))}
        <div className="prop-links">
          <Image placeholder="blur" src={mainLogo} loading="lazy" alt="Foot Logo"/>
          <div className="prop-services">
            {prop.map((item, index) => (
              <span
                className="prop-link"
                key={`${item.value}__2`}
                onClick={() => {
                  item.link
                    ? item.key === "rent" || item.key === "buy"
                      ? router.push(`/property/show-properties?property_action=${item.link}`)
                      : router.push(`/${item.link}`)
                    : router.push("/");
                }}
              >
                {item?.value ? (
                  <Link href={`/${item.link}`} className="menu_links">
                    {item?.value}
                  </Link>
                ) : (
                  item
                )}
                {index !== prop.length - 1 && " | "}
              </span>
            ))}
          </div>
        </div>
        <div className="social-links">
          <h4>Social Links</h4>
          <div className="social-links-flex">
            {socialLogos.map((logo) => (
              <a href={logo.link}>
                <Image placeholder="blur"
                  src={logo.logo}
                  key={logo.key}
                  title={logo.title}
                  loading="lazy"
                  alt="Social Links"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

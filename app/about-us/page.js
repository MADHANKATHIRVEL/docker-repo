import "./about-us.css";
import excellence from "@/assets/expert.webp";
import partnership from "@/assets/partnership.webp";
import guidance from "@/assets/guidance.webp";
import quick from "@/assets/fast.webp";
import Image from "next/image";
import dynamic from "next/dynamic";

const SEO = dynamic(() => import("@/components/seo/SEO"));

const AboutUs = () => {
  let whyAlbionPoints = [
    {
      key: 1,
      title: "Expertise and Partnership",
      img: partnership,
      description:
        "Albion collaborates with top banks and financial institutions, offering you a wide range of home loan options tailored to your needs. Our partnerships ensure that you're presented with the best offers, making your dream home more accessible than ever.",
    },
    {
      key: 2,
      title: "Personalized Guidance",
      img: guidance,
      description:
        "Our team of dedicated executives is here to guide you every step of the way. Whether you're a first-time homebuyer or looking to upgrade, we'll help you choose the best loan offer, making the process as smooth as possible.",
    },
    {
      key: 3,
      title: "Convenience Redefined",
      img: guidance,
      description:
        "Albion is all about convenience. We understand the importance of your time and energy. That's why we offer doorstep document pickup and submission to our partner banks. You focus on your dream; we'll take care of the rest.",
    },
    {
      key: 4,
      title: "Swift Approvals",
      img: quick,
      description:
        "We understand that waiting for loan approvals can be stressful. With Albion, your application is swiftly reviewed by our partner banks, ensuring you receive confirmation promptly.",
    },
    {
      key: 5,
      title: "A Commitment to Excellence",
      img: excellence,
      description:
        "At Albion, we believe in excellence in everything we do. From offering the best loan options to providing top-notch customer service, we're dedicated to your satisfaction.",
    },
  ];

  return (
    <>
      <SEO titleTemplate={"About Us"} />
      <div className="about_us-page">
        <div className="about__us-contents">
          <div className="about__us-contents-div">
            <p className="about-us__title">Discover Albion</p>
            <span className="about-us__description">
              Welcome to Albion, your trusted partner in realizing your dreams
              of homeownership. At Albion, we understand that your home isn't
              just a place; it's a reflection of your aspirations, a sanctuary
              for your family, and a canvas for your dreams. We're here to make
              that journey to your dream home seamless and rewarding.
            </span>
          </div>
          <div className="about__us-contents-div">
            <p className="about-us__title">Our Services : Beyond Home Loans</p>
            <span className="about-us__description">
              While home loans are at the core of our offerings, Albion is more
              than just a loan facilitator. We've expanded our services to cater
              to all your homeownership needs. From interior designing to
              property valuation, legal services, and tenant verification, we're
              here to support you at every stage of your homeownership journey.
            </span>
          </div>
          <div className="about__us-contents-div">
            <p className="about-us__title">
              Our Vision : Transforming Home Ownership
            </p>
            <span className="about-us__description">
              Our vision is simple yet profound—to transform the way people
              experience homeownership. We believe that everyone deserves the
              opportunity to find their perfect home, and we've made it our
              mission to simplify this process for you. With Albion, you're not
              just searching for a house; you're embarking on a journey towards
              your ideal lifestyle.
            </span>
          </div>
          <div className="about-us__title about-us-title-two">
            <p>Why Albion?</p>
            <div className="why__albion-points">
              {whyAlbionPoints.map((item) => (
                <div key={item.title} className="why-albion-point">
                  <Image
                    placeholder="blur"
                    loading="lazy"
                    src={item.img}
                    width={50}
                    height={50}
                    alt="Why Us"
                  />
                  <p className="why-albion__title">{item.title}</p>
                  <span className="why-albion__desc">{item.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;

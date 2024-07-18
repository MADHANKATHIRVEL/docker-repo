"use client";
import "./albion-advocate.css";
import albionAdvocateImg from "@/assets/albion-advocate-banner-final.webp";
import dynamic from "next/dynamic";

const SEO = dynamic(() => import("@/components/seo/SEO"));
const StaticBanner = dynamic(() =>
  import("@/components/common/reusable-component/static-banner/StaticBanner") , {
    ssr : false
  }
);
const FAQLazy = dynamic(() =>
  import("@/components/common/reusable-component/frequentasked/FAQ"), {
    ssr : false
  }
);

const AlbionAdvocate = () => {
  let albionAdvocate = [
    {
      key: 1,
      title: "Expertise You Can Trust",
      description:
        "Our network of advocates comprises seasoned professionals with extensive experience across various legal domains. From property disputes to contract concerns, they have you covered.",
    },
    {
      key: 2,
      title: "Immediate Assistance",
      description:
        "Legal matters can't always wait for office hours. With Advocate on Call, you can reach out for legal advice whenever you need it, 24/7.",
    },
    {
      key: 3,
      title: "Confidential and Convenient",
      description:
        "Your conversations with our advocates are strictly confidential. You can discuss your legal issues openly, ensuring your privacy is protected.",
    },
    {
      key: 4,
      title: "Cost-Effective Solutions",
      description:
        "Advocate on Call offers cost-effective legal guidance, helping you understand your options and make informed decisions without breaking the bank.",
    },
    {
      key: 5,
      title: "Peace of Mind",
      description:
        "Whether you're a property owner, tenant, or business professional, knowing that legal support is just a call away provides invaluable peace of mind.",
    },
  ];

  const items = [
    {
      key: "1",
      label: " How much does Advocate on Call cost?",
      children: (
        <p className="alignLeft">
          The cost of Advocate on Call services varies based on the advocate's
          expertise and the complexity of your query. You'll receive pricing
          details before confirming the call.
        </p>
      ),
    },
    {
      key: "2",
      label: "Are the calls with advocates recorded?",
      children: (
        <p className="alignLeft">
          No, your calls with advocates are not recorded. They are strictly
          confidential and focused on addressing your specific legal concerns.
        </p>
      ),
    },
    {
      key: "3",
      label: "Can I consult with multiple advocates before making a decision?",
      children: (
        <p className="alignLeft">
          Yes, you can explore multiple advocates' profiles and request calls
          with different advocates to find the one who best suits your needs.
        </p>
      ),
    },
    {
      key: "4",
      label:
        "What types of legal issues can I seek advice for through Advocate on Call?",
      children: (
        <p className="alignLeft">
          You can seek advice on a wide range of legal matters, including
          property disputes, contract issues, family law, criminal matters, and
          more.
        </p>
      ),
    },
    {
      key: "5",
      label: " Is Advocate on Call available 24/7?",
      children: (
        <p className="alignLeft">
          Yes, Advocate on Call provides round-the-clock access to legal
          guidance, ensuring you're never alone when facing legal challenges.
        </p>
      ),
    },
    {
      key: "6",
      label:
        "How quickly can I expect a call back from the advocate after requesting one?",
      children: (
        <p className="alignLeft">
          Advocates typically respond promptly, aiming to call you back within a
          reasonable timeframe, often within minutes to a few hours.
        </p>
      ),
    },
  ];

  let advocateOnCallSteps = [
    {
      key: 1,
      title: "Easy Access",
      description:
        "Download the Albion app and navigate to the Advocate on Call section.",
    },
    {
      key: 2,
      title: "Choose Your Advocate",
      description:
        "Browse through our network of top advocates in your city. Each advocate's profile includes their expertise, experience, and availability.",
    },
    {
      key: 3,
      title: "Request a Call",
      description:
        "Select your preferred advocate, provide a brief description of your legal query, and request a call.",
    },
    {
      key: 4,
      title: "Connect Instantly",
      description:
        "Your chosen advocate will receive your request and call you back promptly. You can discuss your legal concerns in detail.",
    },
    {
      key: 5,
      title: "Get Guidance",
      description:
        "Receive expert legal advice, explore your options, and gain clarity on your situation.",
    },
    {
      key: 6,
      title: "Resolve with Confidence",
      description:
        "Armed with the guidance of our top advocates, you can confidently navigate your legal challenges and take the necessary steps to protect your interests.",
    },
  ];

  return (
    <>
      <SEO titleTemplate={"Albion Advocate"} />
      <div className="albion-advocate">
        <StaticBanner staticBannerImg={albionAdvocateImg} />
        <div className="intro-advocate">
          <p>
            Albion is proud to introduce our Advocate on Call service, a
            revolutionary collaboration with the top legal minds in your city.
            We understand that legal concerns can arise at any moment, and
            having instant access to expert legal advice is crucial. With
            Advocate on Call, you can now have a trusted advocate at your
            fingertips, ready to provide guidance, answer questions, and offer
            solutions to your legal challenges.
          </p>
        </div>
        <div className="section__heading-container">
          <p className="section__heading">Why Choose Advocate on Call</p>
          <div className="valuation-grid">
            {albionAdvocate.map((item) => (
              <div className="grid-box" key={item.title}>
                <p className="pv-title">{item.title}</p>
                <span className="pv-desc">{item.description}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="section__heading">
          <p>How It Works</p>
          <div className="valuation-grid">
            {advocateOnCallSteps.map((item) => (
              <div className="grid-box" key={item.title}>
                <p className="pv-title">{item.title}</p>
                <span className="pv-desc">{item.description}</span>
              </div>
            ))}
          </div>
        </div>
        <FAQLazy items={items} image={undefined} />
      </div>
    </>
  );
};

export default AlbionAdvocate;

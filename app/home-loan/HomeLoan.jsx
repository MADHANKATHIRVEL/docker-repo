'use client'
import { useState, useEffect } from "react";
import "./home-loan.css";
import homeLoanImg from "@/assets/hl-im.webp";
import { Button, Input, InputNumber, Steps, Table, notification } from "@/utils/antd-component";
import {
  BankOutlined,
  CheckCircleOutlined,
  FormOutlined,
  UserOutlined,
} from "@/utils/icons";
import getFree from "@/assets/gfq.webp";
import bestPrice from "@/assets/best-price.webp";
import trustedPartner from "@/assets/trusted-partner.webp";
import safeDelivery from "@/assets/safe-delivery.webp";
import loanBenefits from "@/assets/benefits.webp";
import LoanCalculator from "@/components/loan-calculator/LoanCalculator";
import albionAdv from "@/assets/albion-adv.webp";
import pointIcon from "@/assets/point-icon.webp";
import lowIncome from "@/assets/low-income.webp";
import free from "@/assets/free.webp";
import Advantages from "@/components/common/reusable-component/adv-cards/Advantages";
import axisBankLogo from "@/assets/banklogo/axis-bank.webp";
import hdfcLogo from "@/assets/banklogo/hdfc.webp";
import kotakLogo from '@/assets/banklogo/kotaklogo.webp';
import indianBankLogo from "@/assets/banklogo/indian-bank.webp";
import landtLogo from "@/assets/banklogo/l&t.webp";
import licLogo from "@/assets/banklogo/lic.webp";
import SBI from "@/assets/banklogo/state_bank_of_ind.webp";
import StaticBanner from "@/components/common/reusable-component/static-banner/StaticBanner";
import homeLoanBanner from "@/assets/home-loan-final-banner.webp";
import { getEnquiryAboutService } from "@/utils/apiHelpers";
import Cookies from "js-cookie";
import { getUserMobileNumber } from "../../utils/userUtils";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";

const LoginModal = dynamic(() => import("@/components/modals/LoginModal/LoginModal") , {
  ssr : false
})
const SEO = dynamic(() => import("@/components/seo/SEO"))

const FAQLazy = dynamic(() =>
  import("@/components/common/reusable-component/frequentasked/FAQ")
);

export const AlbionAdvantage = ({ title = null, items }) => (
  <div className="albion-adv-list">
    <span className="albionadvtext">
      {title != null ? title : "Albion’s Advantage"}
    </span>
    <div className="alb-advantages">
      {items.map((item) => (
        <div className="adv-point" key={item}>
          <Image placeholder="blur" src={pointIcon} className="adv-point-img" loading="lazy" alt="Albion Advantage Point" height={20} width={20}/>
          <span>{item}</span>
        </div>
      ))}
    </div>
  </div>
);

export const items = [
  {
    key: "1",
    label: "What types of home loans does Albion offer?",
    children: (
      <p className="alignLeft">
        Albion offers a range of home loan products, including fixed-rate
        mortgages, adjustable-rate mortgages (ARMs), FHA loans, and VA loans,
        catering to diverse borrower needs.
      </p>
    ),
  },
  {
    key: "2",
    label: "What are the eligibility criteria for a home loan with Albion?",
    children: (
      <p className="alignLeft">
        Eligibility criteria may vary depending on the loan type and lender.
        Generally, factors such as credit score, income, and debt-to-income
        ratio play a significant role in determining eligibility.
      </p>
    ),
  },
  {
    key: "3",
    label: "How is the interest rate on Albion's home loans determined?",
    children: (
      <p className="alignLeft">
        Interest rates are determined by a combination of factors, including
        your credit score, loan type, market conditions, and the lender's
        policies.
      </p>
    ),
  },
  {
    key: "4",
    label: "What is the loan processing time for a home loan with Albion?",
    children: (
      <p className="alignLeft">
        The loan processing time can vary based on factors like the complexity
        of your application and the lender's procedures. On average, it may take
        several weeks to complete the loan process.
      </p>
    ),
  },
  {
    key: "5",
    label: "Are there any fees associated with Albion's home loans?",
    children: (
      <p className="alignLeft">
        Yes, home loans typically involve fees such as origination fees,
        appraisal fees, and closing costs. These fees can vary, and it's
        important to review the Loan Estimate provided by the lender.
      </p>
    ),
  },
];

const HomeLoan = () => {
  const [mobileNumber, setMobileNumber] = useState(
    !!getUserMobileNumber() ? getUserMobileNumber() : ""
  );
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const router = useRouter()
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if(typeof window != undefined){
      window.scrollTo({
        top: "0",
        left: "0",
        behavior: "smooth",
      });
    }
  }, []);

  function handleKnowMore(item) {
    if (!Cookies.get("user-data")) {
      setShowLoginModal((prevState) => true);
    } else {
      try {
        getEnquiryAboutService({
          service: "home_loan",
          details: {
            mobile_number: getUserMobileNumber(),
            bank: item.bank.name,
            rate: item.rate,
            tenure: item.tenure,
          },
        });
      } catch (error) {
        notification.warning({
          message: "Something Went Wrong",
          description: "Please check after some time",
          placement : "bottomRight"
        });
      }
    }
  }

  const columns = [
    {
      title: "Top Other Banks",
      dataIndex: "bank",
      key: "bank",
      render: (item) => (
        <div
          className="topOtherBanks"
        >
          <Image placeholder="blur" src={item.logo} loading="lazy" alt="Bank Logo" height={45} width={70}/>
          <span>{item.name}</span>
        </div>
      ),
    },
    {
      title: "Interest Rate",
      dataIndex: "rate",
      key: "rate",
    },
    {
      title: "Tenure",
      dataIndex: "tenure",
      key: "tenure",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, item, { tags }) => (
        <>
          <Button onClick={() => handleKnowMore(item)} className="KnowMoreBtn">
            KNOW MORE
          </Button>
        </>
      ),
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
        logo: kotakLogo,
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

  const extraServices = [
    {
      key: 1,
      logo: free,
      title: "Free Eligibility Check",
      desc: "Discover Your Eligibility for Free with Our Convenient Online Check.",
    },
    {
      key: 2,
      logo: getFree,
      title: "Get Free Quotes",
      desc: "Get Your Free Quotes Today and Save Big on Services!",
    },
    {
      key: 3,
      logo: lowIncome,
      title: "Low Interest Rate",
      desc: "Unlock Your Financial Goals with Our Low-Interest Rate Offers - Secure Your Future Financially Today!",
    },
  ];

  const whyChooseUsPoints = [
    {
      key: 1,
      image: bestPrice,
      title: "Best Price Guaranteed",
      desc: "Unlock the best price guaranteed for your peace of mind.",
    },
    {
      key: 2,
      image: trustedPartner,
      title: "Trusted Partners",
      desc: "Count on our trusted partners for seamless solutions.",
    },
    {
      key: 3,
      image: safeDelivery,
      title: "Safe Delivery",
      desc: "Your items, our commitment: Safely delivered every time.",
    },
  ];

  const items1 = [
    {
      icon: <FormOutlined className="loan-process-icon" />,
      description:
        "Fill an online form to view the best offers from our partner banks.",
    },
    {
      description:
        "Our executive helps you choose the best offer for your requirement.",
      icon: <UserOutlined className="loan-process-icon" />,
    },
    {
      icon: <BankOutlined className="loan-process-icon" />,
      description:
        "We pick up documents at your doorstep and submit to the bank",
    },
    {
      icon: <CheckCircleOutlined className="loan-process-icon" />,
      description: "Bank reviews your application and confirms approval.",
    },
  ];

  function handleCheckEligibilty() {
    {
      if (!Cookies.get("user-data")) {
        setShowLoginModal((prevState) => true);
      } else {
        getEnquiryAboutService({
          service: "home_loan",
          details: {
            mobile_number: mobileNumber,
            monthly_income: monthlyIncome,
          },
        });
      }
    }
  }

  return (
    <>
      <SEO titleTemplate={"Home Loans"} />
      <div className="package-mover-page">
        <div className="banner-for-web">
          <StaticBanner
            staticBannerImg={homeLoanBanner}
            rightSection={
              <div className="check-eligibility">
                <span className="checkEligibilityText">
                  Check Your Eligibility
                </span>
                <Input
                  placeholder="Enter Your Mobile Number"
                  className="inputStyle"
                  onChange={(e) => setMobileNumber(e.target.value)}
                  maxLength={10}
                />
                <InputNumber
                  placeholder="Enter Monthly Income"
                  className="inputStyle"
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  onChange={(e) => setMonthlyIncome(e)}
                  maxLength={20}
                  controls={false}
                />
                <span
                  className="byContinuing"
                >
                  By continuing I agree to{" "}
                  <span
                    onClick={() => router.push("/terms-and-conditions" , {scroll : true})}
                    className="albiontc"
                  >
                    Albion T&C
                  </span>
                </span>
                <Button
                  className="checkPriceBtn"
                  onClick={() => handleCheckEligibilty()}
                  disabled={!monthlyIncome || !mobileNumber}
                >
                  Check Eligibility
                </Button>
              </div>
            }
            // hasRightSection={false}
          />
        </div>
        <div className="banner-for-mobile">
          <StaticBanner staticBannerImg={homeLoanBanner} />
          <div className="check-eligibility">
            <span className="checkEligibilityText">Check Your Eligibility</span>
            <Input
              placeholder="Enter Your Mobile Number"
              className="inputStyle"
              onChange={(e) => setMobileNumber(e.target.value)}
              maxLength={10}
            />
            <InputNumber
              placeholder="Enter Monthly Income"
              className="inputStyle"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              onChange={(e) => setMonthlyIncome(e)}
              maxLength={20}
              controls={false}
            />
            <span
              className="byContinuing"
            >
              By continuing I agree to{" "}
              <span
                className="albiontc"
                onClick={() => router.push("/terms-and-conditions" , {scroll : true})}
              >
                Albion T&C
              </span>
            </span>
            <Button
              className="checkPriceBtn"
              onClick={() => handleCheckEligibilty()}
              disabled={!monthlyIncome || !mobileNumber}
            >
              Check Eligibility
            </Button>
          </div>
        </div>
        <div className="home-loan-contentsection">
          {showLoginModal && (
            <LoginModal
              showModal={showLoginModal}
              setShowModal={setShowLoginModal}
            />
          )}
          <div className="home_loan__content">
            <div className="img-Container">
              <Image placeholder="blur" src={loanBenefits} loading="lazy" alt="Loan Benefits"/>
            </div>
            <div className="detail-content">
              <span className="headText">
                Apply <span className="albiontc">Albion Home Loan</span>{" "}
                Online!
              </span>
              <p className="descText">
                Albion Home Loan Online is your one-stop destination for all
                your home financing needs. Whether you're a first-time buyer or
                looking to refinance, our user-friendly online platform makes
                the process quick and convenient. With competitive interest
                rates and flexible repayment options, we're committed to helping
                you achieve your homeownership dreams. Our experienced team of
                experts is just a click away, ready to provide personalized
                guidance and support throughout your home loan journey. Trust
                Albion Home Loan Online for a seamless and hassle-free borrowing
                experience.
              </p>
            </div>
          </div>
        </div>
        <div className="howItWorks">
          <section>
            <span className="headtext">How It Works</span>
            <span className="subText">
              Albion Home Loan Online simplifies the process. Just apply online,
              and our experts will guide you through approval and funding,
              ensuring a smooth path to your dream home.
            </span>
            <Steps labelPlacement="vertical" items={items1} current={5} className="howItWorksSteps"/>
          </section>
        </div>
        <div className="bank-partners">
          <section>
            <h1>Other Bank Partners Home Loan</h1>
            <span className="head-span">
              Explore our extensive network of partner banks to secure the best
              home loan options for your dream home.
            </span>
            <div className="partner-table">
              <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                className="bank-table"
              />
            </div>
          </section>
        </div>
        <div className="loan-card">
          <section>
            <h1>Home Loan EMI Calculator</h1>
            <span className="head-span">
              Use this Calcultor To Find Out The EMI , Interest % and Much
              More...
            </span>
            <div className="loan-calc">
              <LoanCalculator />
            </div>
          </section>
        </div>
        <div className="albion-advantage">
          <div className="inner-section">
            <div className="albion-adv-first">
              <div className="albion-adv-container">
                <Image placeholder="blur" src={albionAdv} loading="lazy" alt="Albion Advantage"/>
              </div>
              <AlbionAdvantage
                items={[
                  "Albion's home loans provide you with the financial freedom to purchase a property without bearing the entire cost upfront.",
                  "With Albion's quick and hassle-free loan approval process, you can own your dream home sooner than you expected.",
                  "Home loans can offer substantial tax benefits. In many regions, interest paid on home loans is tax-deductible, reducing your overall tax liability. ",
                  "By investing in a property with an Albion home loan, you not only secure your living space but also position yourself to benefit from potential future property value increases.",
                  "Albion's range of home loan products can be customised to suit your specific requirements. ",
                ]}
              />
            </div>
            <Advantages extraServices={extraServices} bgColor={"white"} />
          </div>
        </div>
        <FAQLazy items={items} image={homeLoanImg} />
      </div>
    </>
  );
};

export default HomeLoan;

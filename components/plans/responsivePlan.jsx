'use client';
import React, { useEffect, useState } from "react";
import "./plan.css";
import crownGIF from "@/assets/crown.gif";
import {
  CheckCircleFilled,
  CheckOutlined,
  CloseCircleFilled,
} from "@/utils/icons";
import { capitalizeWords, formatText } from "../../utils/helpers";
import { Button } from "@/utils/antd-component";
import { ApplyCouponModal } from "./Plan";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ResponsivePlan = ({ plans = [], selectedPlan = () => {} , setPlanPrice , setSelectedPlan , setShowCostBreakupModal }) => {
  const [selectedCard, setSelectedCard] = useState();
  const [showModal, setShowModal] = useState(false);

  const textData = {
    pageTitle: ["ALBION", "Prime"],
    descHeading: "Choose Your Plan",
    descList: ["Pay zero commission & call owner directly", "Save money and get direct access to owner props"],
  };

  useEffect(() => {
    if (Array.isArray(plans)) setSelectedCard(plans[plans.length - 1]?.label);
  }, []);

  const singlePlanCard = (plan) => {

    const { label, org_price, price, benefits } = plan;

    return (
      <>
        <div
          className={
            label === selectedCard
              ? "responsive-plans-card-list plans-card-list-selected"
              : "responsive-plans-card-list"
          }
          onClick={() => {
            setSelectedCard(label);
            setSelectedPlan(label);
            setPlanPrice(price);
          }}
        >
          <div className="card-container">
              <div>
                <p>{formatText(label)}</p>
                {plan?.tag && <span>{plan.tag || ""}</span>}
              </div>
              {benefits?.no_of_listings && <div>+ No Of Lisitings - {benefits?.no_of_listings}</div>}
              {benefits?.get_phone_quota && <div>+ Get Phone Number Quota - {benefits?.get_phone_quota}</div>}
              {benefits?.response_rate && <div>+ Response Rate - {benefits?.response_rate}</div>}
          </div>
          <div className="card-container-amount">
            {org_price && <strike>₹ {org_price || 0}</strike>}
            <span>₹ {price || 0}</span>
            <div>{benefits?.period} days /-</div>
          </div>
          <span className="plan-features-card-list">
            <div>
              {Object.keys(benefits)
                .filter((keys) => !["no_of_listings", "get_phone_quota", "period", "response_rate"].includes(keys))
                .map((key) => (
                  <span key={Math.random()}>
                    {
                      <span>
                        {benefits[key] ? (
                          <CheckCircleFilled className="check-filled"/>
                        ) : (
                          <CloseCircleFilled className="close-filled"/>
                        )}{" "}
                        {formatText(key)}
                      </span>
                    }
                  </span>
                ))}
            </div>
          </span>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="responsive-plan-container">
        <div className="responsive-plan-title-container">
          <span className="responsive-plan-title">
            <Image src={crownGIF} alt="Crown Gif" width={25} height={25} />
            {textData.pageTitle[0]} <span> {textData.pageTitle[1]}</span>
          </span>
        </div>
        {showModal && (
              <ApplyCouponModal
                showModal={showModal}
                setShowModal={setShowModal}
              />
            )}
        <div className="responsive-plan-desc-heading"> Choose Your Plan </div>
        <div className="responsive-plan-list">
          {textData.descList.map((descList) => (
            <div key={Math.random()}>
              <CheckOutlined className="checkedIcon" />
              {descList}
            </div>
          ))}
        </div>
        {plans.map((i) => (
          <React.Fragment key={Math.random()}>
            {singlePlanCard(i)}
          </React.Fragment>
        ))}
        <Button
          className="responsive-plan-purchase-btn"
          onClick={() => {
            setSelectedPlan(selectedCard);
            setShowCostBreakupModal(true)
          }}
          disabled={selectedCard === "free"}
        >
          {selectedCard === "free"
            ? "Please Select A Plan"
            : selectedCard
            ? `Become a ${capitalizeWords(selectedCard)}  member`
            : "Purchase a Plan"}
        </Button>
      </div>
    </>
  );
};

export default ResponsivePlan;

'use client'
import { useState, useEffect, useCallback } from "react";
import "./account-summary.css";
import { Button, Dropdown, Space, notification } from "@/utils/antd-component";
import newMobileAppImg from "@/assets/newMobieAppImg.webp";
import { getUserId } from "../../../../utils/userUtils";
import axios from "axios";
import { APP_BASE_URL } from "@/constants/Constant";
import Cookies from "js-cookie";
import { getPostedCount, getUserQuota } from "@/utils/apiHelpers";
import Image from "next/image";

const AccountSummary = ({
  setSelectedTab
}) => {
  const [userDetails, setuserDetails] = useState();
  const [reponseCount, setReponseCount] = useState(0);
  const [postedCount, setPostedCount] = useState(0);
  const [remainingPostQuota, setRemainingPostQuota] = useState(0)
  const [remainingCallQuota, setRemainingCallQuota] = useState(0)
  let mounted = true;

  const getUserDetails = useCallback(async () => {
    try {
      const userResponse = await axios.get(`${APP_BASE_URL}/Users/show?user_id=${getUserId()}`);
      if (mounted) {
        setuserDetails(userResponse.data);
      }
    } catch (error) {
      notification.error({
        message : "Something Went Wrong",
        description : "Please Check After Sometime"
      })
      console.error('Error fetching user details:', error);
    }
  }, []);

  useEffect(() => {
    if(!!Cookies.get("user-data")){
      getUserDetails();
    }
    return () => {
      // Cleanup function to set mounted to false when the component is unmounted
      mounted = false;
    };
  }, [getUserDetails]);

  useEffect(() => {
    async function getQuotaDetails(){
      const response = await getUserQuota();
      setRemainingCallQuota(prevState => response.get_phone_quota)
      setRemainingPostQuota(prevState => response.post_quota)
    }
    getQuotaDetails()
  }, [])
  
  useEffect(() => {
    async function fetchMyResponses() {
      await axios
        .get(
          `${APP_BASE_URL}/Contacted/show?seller_id=${getUserId()}`
        )
        .then((res) => setReponseCount(prevState => res.data.length))
        .catch((err) => setReponseCount(prevState => 0));
    }
    getPostedCount().then(res => setPostedCount(prevState => res))
    fetchMyResponses();
  }, []);
  

  let donutLegends = [
    {
      label: "Total Active Properties",
      value: 0,
      color: "#8C193FD1",
    },
    {
      label: "Total Search Views",
      value: 0,
      color: "#8C193FA3",
    },
    {
      label: "Property Detail Views",
      value: 0,
      color: "#8C193F75",
    },
    {
      label: "Contacts Viewed",
      value: 0,
      color: "#8C193F47",
    },
    {
      label: "Responses Received",
      value: 0,
      color: "#8C193F",
    },
  ];

  const items = [
    {
      label: <a href={"https://play.google.com/store/apps/details?id=com.albionNew&pcampaignid=web_share"} target="_blank">Android</a>,
      key: 'android-mobile-app',
    },
    {
      label: <a href={`https://apps.apple.com/us/app/albion-property-hub/id6476275094`} target="_blank">IOS</a>,
      key: 'ios-mobile-app',
    }
  ];


  
  return (
    <div className="account-summary">
        <>
          <div className="subscription">
            <div className="subscribe-content">
              <span className="subscription-text">Subscription</span>
            </div>
            <div className="available-properties-div">
              <p className="available-properties-div-para">Total Available Property Post Quota : {remainingPostQuota}</p>
              <p className="available-properties-div-para">
                Total Available Property Contact Quota : {remainingCallQuota}
              </p>
            </div>
            <Button className="upgrade-plan-button" href="/plans">
              Upgrade Your Plan
            </Button>
          </div>
          <div className="other-details">
            <div className="profile-card">
              <div className="track-cards">
                <div
                  className="track-card"
                  onClick={() => setSelectedTab((prevState) => "my_properties")}
                >
                  <div className="track-content">
                    <h1>{postedCount ?? 0}</h1>
                    <p>Total Property Posted</p>
                  </div>
                  <div className="arrow-cont">
                    <p>&uarr;</p>
                  </div>
                </div>
                <div
                  className="track-card"
                  onClick={() => setSelectedTab((prevState) => "my_responses")}
                >
                  <div className="track-content">
                    <h1>{reponseCount}</h1>
                    <p>Total Response</p>
                  </div>
                  <div className="arrow-cont">
                    <p>&uarr;</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mobileAppAd">
              <div className="appImg-cont">
                <Image placeholder="blur"
                  src={newMobileAppImg}
                  alt="Mobile App"
                  loading="lazy"
                />
              </div>
              <div className="ad-content">
                <h2>
                  Download <span>Albion</span> Mobile App
                </h2>
                <p>
                  Simply sign into your albion mobile app account and look for
                  the more updates.
                </p>
              </div>
              <div className="getApp-btn-cont">
                <Dropdown menu={{items}} trigger={["click"]}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <Button>Get Mobile App</Button>
                    </Space>
                  </a>
                </Dropdown>
              </div>
            </div>
          </div>
        </>
    </div>
  );
};

export default AccountSummary;

"use client";
import { useContext, useState, useEffect } from "react";
import "./agent-dashboard.css";
import { Button } from "@/utils/antd-component";
import agentDashboardBanner from "@/assets/agent-db-banner.webp";
import postPropertyImage from "@/assets/post__property.webp";
import postPhotosImage from "@/assets/post__photos.webp";
import verifyProp from "@/assets/verifyprop.webp";
import oneIcon from "@/assets/1.webp";
import twoIcon from "@/assets/2.webp";
import threeIcon from "@/assets/3.webp";
import findYourDreamProperty from "@/assets/find-your-dream-property.webp";
import axios from "axios";
import { AppContext } from "@/context/Context";
import { APP_BASE_URL } from "@/constants/Constant";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const AgentDashboard = () => {
  const router = useRouter();
  const [userWithPreference, setUserWithPreference] = useState([]);
  const { userLocation , updateUserLocation } = useContext(AppContext);

  useEffect(() => {
    updateUserLocation('coimbatore' , {
      name : "coimbatore",
      "id" : "499"
    })
    Cookies.get('userLocation' , 'coimbatore')
    Cookies.get('city-id' , '499')
  }, [])

  useEffect(() => {
    if(!Cookies.get("user-data")){
      router.push("/login")
    }
  }, [])
  
  

  useEffect(() => {
    async function getUsers() {
      const response = await axios.get(`${APP_BASE_URL}/Users/users_with_preference?location=${userLocation}`);
      setUserWithPreference((prevState) => response.data);
    }
    getUsers();
  }, []);

  const sellProcessSteps = [
    {
      key: "1",
      processTitle: "Post Your Property",
      processdesc: "Listing: Your Dream Property Awaits! Explore, Inquire, Make Yours.",
      image: postPropertyImage,
      icon: oneIcon,
    },
    {
      key: "2",
      processTitle: "Add Photos & Info",
      processdesc: "Enhance Listing: Upload Photos, Share Details, Attract Potential Buyers",
      image: postPhotosImage,
      icon: twoIcon,
    },
    {
      key: "3",
      processTitle: "Verify & Sell Your Property",
      processdesc: "Validate & Secure the Deal: List, Verify, and Successfully Sell.",
      image: verifyProp,
      icon: threeIcon,
    },
  ];


  return (
    <div className="agent-dashboard-page">
      <div className="goToMain">
        <Image placeholder="blur" src={agentDashboardBanner} loading="lazy" alt="Agent Dashboard Banner" />
        <div className="gotosection">
          <span className="mainText">It's a pleasure </span>
          <span className="subText">to have you on board</span>
          <Button
            className="goToMainDashboardBtn"
            onClick={() => router.push("/" , {scroll : true})}
          >
            Go To Main Dashboard
          </Button>
        </div>
      </div>
      <div className="pack__promotion">
        <div className="inner__sec">
          <span className="secTitle">Maximize Your Leads With 4 Simple Steps</span>
          <span className="secDesc">
            Unlock the potential of your business with these four straightforward steps to maximize leads. From
            optimizing your website's appeal to harnessing the power of social media and strategic email marketing,
            these tactics will help you attract and retain valuable leads.{" "}
          </span>
          <Button href="/plans" className="agentpricingbtn">
            Explore Albion Pricing Plan
          </Button>
        </div>
      </div>
      <div className="sellingprocess">
        <div className="innerContent__section">
          <span className="secTitle">Simple Process For Selling Your Property</span>
          <span className="secDesc sellpropertyDesc">
            Selling your property is a straightforward process. First, prepare your home for sale by decluttering
            and making necessary repairs. Next, work with a real estate agent to list your property and market it
            effectively.
          </span>
          <div className="sellingProcess">
            {sellProcessSteps.map((item) => (
              <div className="sell__process__card" key={item.processdesc}>
                <div className="processcardcontent">
                  <Image placeholder="blur" src={item.icon} loading="lazy" width={50} height={50} alt="Sell Step" />
                  <span className="processTitle">{item.processTitle}</span>
                  <span className="processDesc">{item.processdesc}</span>
                </div>
                <Image placeholder="blur" className="processCardImage" src={item.image} loading="lazy" alt="Sell Step" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="dreamPropertyBanner">
        <div className="dreamPropertyImageContainer">
          <div className="dream_property__text">
            <span className="findText">find</span>
            <span className="urdreamhouse__text">
              YOUR <span className="dreamText">DREAM</span> HOUSE
            </span>
            <span className="your__dreamhouse-desc">
              My dream house is a tranquil retreat nestled in nature, where floor-to-ceiling windows frame
              breathtaking landscapes, and cozy, minimalist design fosters serenity and connection with the
              environment.
            </span>
          </div>
          <Image placeholder="blur" src={findYourDreamProperty} loading="lazy" alt="Dream Property Banner" />
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;

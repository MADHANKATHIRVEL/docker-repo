"use client";
import { useState, useEffect } from "react";
import "./top-agents.css";
import { Button, Tag } from "@/utils/antd-component";
import userOutLineImg from "@/assets/user_out_img.webp";
import noAgentFound from "@/assets/notopagents.gif";
import {
  PhoneOutlined
} from "@/utils/icons";
import Cookies from "js-cookie";
import axios from "axios";
import moment from "moment";
import { checkQuota, getContactAgent } from "@/utils/apiHelpers";
import { getUserId } from "../../utils/userUtils";
import { APP_BASE_URL } from "@/constants/Constant";
import { capitalizeFirstLetter } from "../../utils/helpers";
import SEO from "@/components/seo/SEO";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";

const DynamicImageBanner = dynamic(() =>
  import("@/components/common/reusable-component/no-data/DynamicImageBanner"), {
    ssr : false
  }
);

const TopAgentCard = ({ agent }) => {
  const [callQuota, setCallQuota] = useState();

  useEffect(() => {
    async function getUserCallQuota() {
      const res = await checkQuota(getUserId(), "contact").then((res) => res);
      setCallQuota((prevState) => res);
    }
    getUserCallQuota();
  }, []);

  function handleContactAgent() {
    if (callQuota <= 0) {
      router.push("/plans", { scroll: true });
    } else {
      getContactAgent({
        user_id: getUserId(),
        agent_id: agent.user_id,
      });
    }
  }

  return (
    <div className="agent-card">
      <div className="avatarContainer">
        <Image
          placeholder="blur"
          src={userOutLineImg}
          className="user-outline-icon"
          loading="lazy"
          alt="Agent Image"
        />
      </div>
      <div className="avatarDetailsContainer">
        <span className="agent-name">
          {capitalizeFirstLetter(agent.username)}
        </span>
        <div className="agent-detail-row">
          <span className="col-key">Active Since</span>
          <span className="col-value">
            {moment(agent.created_at, "YYYY-MM-DD HH:mm:ss").format("YYYY")}
          </span>
        </div>
        <div className="agent-detail-row">
          <span className="col-key">Total Property Posted</span>
          <span className="col-value">{agent.properties_posted}</span>
        </div>
        <div className="agent-btn-container">
          {agent.user_id == getUserId() ? (
            <Tag className="in-list">You Are In The List</Tag>
          ) : (
            <Button
              className="agentContactBtn"
              onClick={() => handleContactAgent()}
            >
              <PhoneOutlined className="phone-outlined" />
              Contact Agent
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const TopAgents = () => {
  const [topAgents, setTopAgents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function getTopAgents() {
      axios.get(`${APP_BASE_URL}/Users/show?user_type_id=2`).then((res) => {
        if (res.data.message) {
          setTopAgents([]);
        } else {
          setTopAgents((prevState) => res.data);
        }
      });
    }
    getTopAgents();
  }, []);

  useEffect(() => {
    if (!Cookies.get("user-data")) {
      router.push("/login", { scroll: true });
    }
  }, []);

  function goBack() {
    router.back();
  }

  return (
    <>
      <SEO titleTemplate={"Top Agents"} />
      <div className="top-agents-page">
        <div className="top-agent-cards-col">
          <div className="top-agent-list">
            <div className="head-container">
              <span className="title">Our Top Agents</span>
              <span className="go-back-link" onClick={() => goBack()}>
                Go to Previous Page
              </span>
            </div>
            <div className="cards-container">
              {topAgents.length > 0 ? (
                topAgents.map((item) => <TopAgentCard agent={item} />)
              ) : (
                <>
                  <DynamicImageBanner
                    image={noAgentFound}
                    text="No Agent Found"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopAgents;

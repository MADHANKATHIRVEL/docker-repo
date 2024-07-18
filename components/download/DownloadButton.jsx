"use client";
import React from "react";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import "./download-btn.scss";

const DownloadButton = () => {
  const router = useRouter();

  async function handleUseTheApp() {
    const userAgent = navigator.userAgent;
    if (/iP(hone|ad|od)/.test(userAgent)) {
      router.push(
        "https://apps.apple.com/us/app/albion-property-hub/id6476275094"
      );
    } else if (/Android/.test(userAgent)) {
      router.push(
        "https://play.google.com/store/apps/details?id=com.albionNew&pcampaignid=web_share"
      );
    }
  }

  return (
    <Button onClick={handleUseTheApp} className="use_mobile_application-btn">
      Use The App
    </Button>
  );
};

export default DownloadButton;

"use client";
import "./footer.css";
import "./footer.scss";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";
import { lazy, useCallback, useContext, useEffect, useState } from "react";
import { APP_BASE_URL } from "@/constants/Constant";
import { AppContext } from "@/context/Context";
import { Tabs } from "antd";

const DynamicAppAdvertisement = dynamic(
  () => import("../app-advertisement/AppAdvertisement"),
  {
    ssr: false,
  }
);
const DynamicAlbionPageEnd = dynamic(
  () => import("./albion-page-end/AlbionPageEnd"),
  {
    ssr: false,
  }
);

const DynamicPropertyQuickLinks = lazy(() =>
  import("@/app/servercomponent/PropertyQuickLinks")
);

const Footer = async ({ locationList }) => {
  const pathname = usePathname();
  const { cities } = useContext(AppContext);
  const [locations, setlocation] = useState(locationList);

  const getLocationList = useCallback(async () => {
    const response = await fetch(
      `${APP_BASE_URL}/Location/getLocation?location=locality&city=${Cookies.get(
        "city-id"
      )}`
    );
    let result = await response.json();
    return result.locality;
  }, [Cookies.get("city-id")]);

  useEffect(() => {
    if (Cookies.get("userLocation") || Cookies.get("city-id")) {
      getLocationList().then((response) => setlocation(response));
    }
  }, [Cookies.get("userLocation"), Cookies.get("city-id")]);


  return (
    !(
      pathname.includes("login") ||
      pathname.includes("signup") ||
      pathname.includes("viewer") ||
      pathname.includes("/property/") ||
      pathname.includes("/plans") ||
      pathname.includes("/filter-card")
    ) && (
      <>
        <DynamicAppAdvertisement />
        {/* <DynamicPropertyQuickLinks
          locations={locations}
        /> */}
        <DynamicAlbionPageEnd />
      </>
    )
  );
};

export default Footer;

"use server";
import { APP_BASE_URL } from "@/constants/Constant";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import "./globals.css";
import { ConfigProvider } from "antd";

const ContextDynamic = dynamic(() => import("@/context/Context"), {
  ssr: false,
});
const MobileBottomSheet = dynamic(() => import("@/components/mobile-bottom-sheet/MobileBottomSheet"), {
  ssr: false,
});

const FooterDynamic = dynamic(() =>
  import("../servercomponent/FooterComponent")
);
const HeaderDynamic = dynamic(() =>
  import("../servercomponent/HeaderComponent")
);

async function fetchDistrict() {
  const response = await fetch(
    `${APP_BASE_URL}/Location/getLocation?location=city&state=31`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );
  let result = await response.json();
  return result.city;
}

async function getLocationList(cityId) {
  const response = await fetch(
    `${APP_BASE_URL}/Location/getLocation?location=locality&city=${cityId}`,
    {
      next: {
        revalidate: 15,
      },
    }
  );
  let result = await response.json();
  return result.locality;
}

export default async function Parent({ children, fontFamily }) {
  let cookie = cookies();
  let locationList = await getLocationList(cookie?.get("city-id")?.value);
  let districtData = await fetchDistrict();
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: fontFamily,
          colorPrimary: "#8C193F",
        },
      }}
    >
      <ContextDynamic cities={districtData}>
        <HeaderDynamic />
        {children}
        <FooterDynamic locationList={locationList} />
        <MobileBottomSheet />
      </ContextDynamic>
    </ConfigProvider>
  );
}

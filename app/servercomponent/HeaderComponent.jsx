'use server'
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";

const HeaderDynamic = dynamic(() => import("@/components/header-v2/Header"));

export default async function HeaderComponent({ districtData }) {
  const cookie = cookies();
  let userData = cookie.get("user-data")
    ? cookie.get("user-data").value
    : false;
  return (
    <HeaderDynamic
      cities={districtData}
      loc={Cookies.get("userLocation")}
      userLoggedIn={userData}
    />
  );
}

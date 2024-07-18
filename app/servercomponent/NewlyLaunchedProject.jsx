"use server";
import { APP_BASE_URL } from "@/constants/Constant";
import { decrypt } from "@/utils/userUtils";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";

const DynamicNewlyLaunched = dynamic(() =>
  import("@/components/newly-launched/NewlyLaunched")
);

async function newlyLaunched(location) {
  const cookie = cookies();
  let userId =
    JSON.parse(decrypt(cookie.get("user-data")?.value))?.user_id ?? null;
  let url = `${APP_BASE_URL}/Properties/show?location=${location}&limit=20`;
  let result;
  if (userId) {
    url = `${APP_BASE_URL}/Properties/show?location=${location}&limit=20&user_id=${userId}&seller_not=${userId}`;
  }
  const response = await fetch(url, {
    next: {
      revalidate: 10,
    },
  });
  result = await response.json();
  return result;
}

export default async function NewlyLaunchedProject({ location }) {
  const newlyLaunchedData = await newlyLaunched(location);

  return <DynamicNewlyLaunched property_data={newlyLaunchedData} />;
}

"use server";
import { APP_BASE_URL } from "@/constants/Constant";
import dynamic from "next/dynamic";

const DynamicTopPicks = dynamic(() => import("@/components/toppicks/TopPicks"));

export async function topPicks(location, userId) {
  let url = `${APP_BASE_URL}/Properties/show?location=${location}`;
  let result;
  if (userId) {
    url += `&user_id=${userId}&seller_not=${userId}`;
  }
  let response = await fetch(url, {
    next: {
      revalidate: 10,
    },
  });
  result = await response.json();
  return result;
}

export default async function TopPicks({ location, userId }) {
  const topPicksData = await topPicks(location, userId);
  return (
      <DynamicTopPicks property_data={topPicksData} />
  );
}

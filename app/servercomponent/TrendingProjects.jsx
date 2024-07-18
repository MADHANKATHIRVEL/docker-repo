'use server'
import { APP_BASE_URL } from "@/constants/Constant";
import dynamic from "next/dynamic";

const DynamicTrendingProjects = dynamic(() =>
  import("@/components/trending-projects/TrendingProjects")
);

async function trendingProjects(location , userId) {
  let result;
  let url = `${APP_BASE_URL}/Properties/show?location=${location}`;
  if(userId){
    url += `&user_id=${userId}&seller_not=${userId}`
  }
  const response = await fetch(url , {
    next : {
      revalidate : 60
    }
  });
  result = await response.json();
  return result;
}

export default async function TrendingProjects({ location , userId }) {
  const trendingProjectsData = await trendingProjects(location , userId);

  return <DynamicTrendingProjects property_data={trendingProjectsData} />;
}

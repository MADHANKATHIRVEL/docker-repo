import { APP_BASE_URL } from "@/constants/Constant";
import dynamic from "next/dynamic";

const DynamicFeaturedProject = dynamic(() =>
  import("@/components/featured-projects/FeaturedProjects")
);

export async function featuredProject(location) {
  let result;
  const url = `${APP_BASE_URL}/Properties/show?location=${location}&projects=featured`;
  const response = await fetch(url);
  result = await response.json();
  return result;
}

export default async function FeaturedProject({ location }) {
  const featureProjectsData = await featuredProject(location);
  return <DynamicFeaturedProject featuredProjectsData={featureProjectsData} />;
}

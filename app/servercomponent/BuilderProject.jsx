import { APP_BASE_URL } from "@/constants/Constant";
import dynamic from "next/dynamic";

const DynamicBuilderProject = dynamic(() =>
  import("@/components/builder-projects/BuilderProjects")
);

async function builderProjects(location) {
  let result;
  const url = `${APP_BASE_URL}/Properties/show?location=${location}&projects=builder`;
  const response = await fetch(url , {
    next : {
      revalidate : 10
    }
  });
  result = await response.json();
  return result;
}

export default async function BuilderProject({ location }) {
  const builderProjectsData = await builderProjects(location);
  return <DynamicBuilderProject builderProjects={builderProjectsData} />;
}

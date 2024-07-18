"use server";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { decrypt } from "@/utils/userUtils";
import { useMemo } from "react";

const IntroCard = dynamic(() => import("@/components/introcard/IntroCard"));
const MoveInChoices = dynamic(() => import("./servercomponent/MoveInChoices"));
const DynamicAlbionAuctionBanner = dynamic(() =>
  import("./servercomponent/AlbionAuctionBanner")
);
const DynamicPropertyServiceSlider = dynamic(() =>
  import("./servercomponent/PropertyServiceSlider")
);
const DynamicLinkWithIcon = dynamic(() =>
  import("./servercomponent/LinkWithIcon")
);
const DynamicTopPicks = dynamic(() => import("./servercomponent/TopPicks"));
const DynamicBuilderProject = dynamic(() =>
  import("./servercomponent/BuilderProject")
);
const DynamicFeaturedProject = dynamic(() =>
  import("./servercomponent/FeaturedProject")
);
const DynamicTrendingProjects = dynamic(() =>
  import("./servercomponent/TrendingProjects")
);
const DiscoverProjects = dynamic(() =>
  import("./servercomponent/DiscoverProjects")
);

export async function generateMetadata() {
  return {
    title:
      "Property in Coimbatore | Real estate, Rental properties - Albion Property Hub",
    description:
      "The best residential properties in Coimbatore. Find new projects, resale flats, and ready-to-move-in apartments and find your ideal home to buy, rent, or invest in.",
  };
}

export default async function page() {
  const cookie = cookies();
  const userId = useMemo(() => {
    const userData = cookie.get("user-data")?.value;
    return userData ? JSON.parse(decrypt(userData))?.user_id : null;
  }, [cookie]);

  return (
    <>
      <IntroCard reqLocation={"coimbatore"} cookie={cookie} />
      <DynamicLinkWithIcon location={"coimbatore"} />
      <DynamicFeaturedProject location={"coimbatore"} />
      <DiscoverProjects renderKey={"bedroom"} />
      <DynamicBuilderProject location={"coimbatore"} />
      <DiscoverProjects renderKey={"budget"} />
      <DynamicAlbionAuctionBanner />
      <DynamicTopPicks location={"coimbatore"} userId={userId} />
      <DynamicPropertyServiceSlider />
      <MoveInChoices />
      <DynamicTrendingProjects location={"coimbatore"} userId={userId} />
    </>
  );
}

import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { decrypt } from "@/utils/userUtils";

const TopPicks = dynamic(() => import("../servercomponent/TopPicks"));
const FeaturedProject = dynamic(() => import("../servercomponent/FeaturedProject"));
const BuilderProject = dynamic(() => import("../servercomponent/BuilderProject"));
const NewlyLaunchedProject = dynamic(() => import("../servercomponent/NewlyLaunchedProject"));
const TrendingProjects = dynamic(() => import("../servercomponent/TrendingProjects"));
const DiscoverProjects = dynamic(() =>
  import("@/components/discover-projects/DiscoverProjects")
);
const IntroCard = dynamic(() => import("@/components/introcard/IntroCard"));
const MoveInChoices = dynamic(() =>
  import("@/components/move-in-choices/MoveInChoices")
);
const DynamicAlbionAuctionBanner = dynamic(() =>
  import("../servercomponent/AlbionAuctionBanner")
);
const DynamicPropertyServiceSlider = dynamic(
  () => import("../servercomponent/PropertyServiceSlider"),
  {
    ssr: false,
  }
);
const DynamicLinkWithIcon = dynamic(() =>
  import("../servercomponent/LinkWithIcon")
);

export async function generateMetadata({ params }) {
  let text = params.location;
  let loc =
    text[0] == " "
      ? ` ${text[1]?.toUpperCase() + text?.slice(2)}`
      : text[0]?.toUpperCase() + text?.slice(1);
  return {
    title: `Property in ${loc} | Real estate, Rental properties - Albion Property Hub`,
    description: `The best residential properties in ${loc}. Find new projects, resale flats, and ready-to-move-in apartments and find your ideal home to buy, rent, or invest in.`,
  };
}

export async function getDistrictsList() {
  try {
    const response = await fetch(
      `https://api.albionbankauctions.com/api/location/getCity?state=31`,
      {
        next: {
          revalidate: 360000,
        },
      }
    );
    const data = response?.json();
    return data;
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }
}

const Home = async ({ params }) => {
  let selectedLocation = null;
  const locationData = await getDistrictsList();
  const cookie = cookies();
  let userId =
    JSON.parse(decrypt(cookie.get("user-data")?.value))?.user_id ?? null;

  if (params?.location) {
    selectedLocation = locationData.filter(
      (location) =>
        location?.name?.toLowerCase() == params?.location?.toLowerCase()
    );
  }
  let filteredLocation = !!params.location
    ? selectedLocation[0]?.name
    : "coimbatore";

  return (
    <>
      <IntroCard reqLocation={filteredLocation} />
      <div className="main-page">
        <DynamicLinkWithIcon location={filteredLocation} />
        <FeaturedProject location={filteredLocation} />
        <BuilderProject location={filteredLocation} />
        <TopPicks location={filteredLocation} userId={userId} />
        <DiscoverProjects renderKey={"bedroom"} />
        <DynamicPropertyServiceSlider />
        <NewlyLaunchedProject location={filteredLocation} />
        <MoveInChoices />
        <DynamicAlbionAuctionBanner />
        <DiscoverProjects renderKey={"budget"} />
        <TrendingProjects location={filteredLocation} userId={userId} />
      </div>
    </>
  );
};
export default Home;

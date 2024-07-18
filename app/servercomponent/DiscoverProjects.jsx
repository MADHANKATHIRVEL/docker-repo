import dynamic from "next/dynamic";
import React from "react";

const DiscoverProjectsDynamic = dynamic(() =>
  import("@/components/discover-projects/DiscoverProjects")
);

export default function DiscoverProjects({ renderKey }) {
  return <DiscoverProjectsDynamic renderKey={renderKey} />;
}

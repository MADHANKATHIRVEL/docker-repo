import dynamic from "next/dynamic";

const TopAgents = dynamic(() => import("./TopAgents"));

export default function page() {
  return <TopAgents />;
}

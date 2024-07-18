import dynamic from "next/dynamic";
const AgentDashboard = dynamic(() => import("./AgentDashboard"));

const page = () => {
  return <AgentDashboard />;
};

export default page;

import dynamic from "next/dynamic";

const Help = dynamic(() => import("./Help"));

const page = () => {
  return <Help />;
};

export default page;

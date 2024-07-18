import dynamic from "next/dynamic";

const HomeLoan = dynamic(() => import("./HomeLoan"));

const page = () => {
  return <HomeLoan />;
};

export default page;

import dynamic from "next/dynamic";
const Blogs = dynamic(() => import("./Blogs"));

const page = () => {
  return <Blogs />;
};

export default page;

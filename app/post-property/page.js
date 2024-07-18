import dynamic from "next/dynamic";
const PostProperty = dynamic(() => import("./PostProperty"));

const page = () => {
  return <PostProperty />;
};

export default page;

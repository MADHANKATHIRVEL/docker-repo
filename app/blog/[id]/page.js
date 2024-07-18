import { APP_BASE_URL } from "@/constants/Constant";
import axios from "axios";
import BlogPage from "./BlogPage";

export async function getSingleBlog(id) {
  const response = await axios.get(
    APP_BASE_URL + `/Blogs2/show?blog_uid=${id}`
  );
  return response.data;
}

export async function generateMetadata({ params, searchParams }) {
  const id = params.id.split("-")[params.id.split("-").length - 1];
  const data = await getSingleBlog(id);

  return {
    title: data?.blog_meta_title ?? "",
    description: data?.blog_meta_description ?? "",
    openGraph: {
      images: data?.blog_image ?? "",
    }
  };
}

const page = async ({ params }) => {
  const id = params.id.split("-")[params.id.split("-").length - 1];
  const blogDetail = await getSingleBlog(id)
  return <BlogPage
    blogDetails = {blogDetail}
  />   
};

export default page;

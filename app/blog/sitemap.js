import { APP_BASE_URL } from "@/constants/Constant";
import axios from "axios";

async function fetchBlogs() {
  const response = await axios.get(
    `${APP_BASE_URL}/Blogs2/get`
  );
  const data = await response.data;
  return data;
}

export default async function sitemap() {
  const blogs = await fetchBlogs();
  // const properties = []
  return blogs.map((blog) => ({
    url: `https://albionpropertyhub.com/blog/${blog.url.replace(
      "&",
      "-"
    )}`,
    priority: 0.8,
  }));
}

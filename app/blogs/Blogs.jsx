'use client'
import { useEffect, useState } from "react";
import "./blogs.css";
import axios from "axios";
import { APP_BASE_URL } from "@/constants/Constant";
import noBlogFound from "@/assets/no-blog.gif";
import { capitalizeWords } from "../../utils/helpers";
import { Pagination, Tabs } from "@/utils/antd-component";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";
import Image from "next/image";

const SEO = dynamic(() => import('@/components/seo/SEO'), {
  ssr : false
});
const SingleBlog = dynamic(() => import('./SingleBlog'), {
  ssr : false
});


const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [blogCategories, setBlogCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(undefined);
  const [pageNo, setPageNo] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getCategories();
    if (Cookies.get("blog category")) {
      const lsc = JSON.parse(Cookies.get("blog category"));
      setSelectedCategory((prevState) => lsc?.category);
      setPageNo((prevState) => lsc?.page);
    }
  }, []);

  useEffect(() => {
    getBlogs();
  }, [pageNo, selectedCategory]);

  const getBlogs = async () => {
    const response = await axios.get(`${APP_BASE_URL}/Blogs2/show`, {
      params: {
        category: selectedCategory,
        page_number: pageNo,
      },
    });
    getBlogsCount();
    setBlogs((prevState) => response.data);
  };

  const getCategories = async () => {
    const response = await axios.get(`${APP_BASE_URL}/BlogCategories/show`);
    setBlogCategories((prevState) => [{ cat_title: "All Blogs" }, ...response.data]);
  };
  const getBlogsCount = async () => {
    await axios
      .get(`${APP_BASE_URL}/Blogs2/blog_count`, {
        params: {
          category: selectedCategory,
          page_number: pageNo,
        },
      })
      .then(({ data }) => {
        setTotal(data.count);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <SEO titleTemplate={"Blogs"} />
      <div className="blog-page">
        <div className="category-tab">
          <Tabs
            tabPosition="top"
            onChange={(value) => {
              setSelectedCategory(value);
              setPageNo(1);
              localStorage.removeItem("blog category");
            }}
            size="large"
            items={blogCategories.map((item, index) => ({
              key: index === 0 ? undefined : item.cat_title,
              label: capitalizeWords(item.cat_title),
            }))}
            activeKey={selectedCategory}
          />
        </div>

        {blogs.length > 0 && typeof selectedCategory !== "undefined" && (
          <SingleBlog blogContent={blogs[0]} index page={pageNo} category={selectedCategory} />
        )}
        {blogs.length > 1 && typeof selectedCategory !== "undefined" && <h2>ALL STORIES</h2>}

        <div className="blog-page-inner-section">
          {blogs.length > 0 ? (
            blogs.map(
              (blog, ind) =>
                (ind !== 0 || typeof selectedCategory === "undefined") && (
                  <SingleBlog blogContent={blog} page={pageNo} category={selectedCategory} />
                )
            )
          ) : (
            <div
              className="no-blog-found"
            >
              <Image src={noBlogFound} alt="no-blog-found" height={200} width={200} />
              <h3>OOPS! No Blog Found In {selectedCategory} Category</h3>
            </div>
          )}
        </div>
        {blogs.length > 0 && (
          <Pagination
            current={pageNo}
            className="blog-pagination"
            onChange={(value) => {
              setPageNo(value);
              localStorage.removeItem("blog category");
            }}
            pageSize={8}
            total={total}
          />
        )}
      </div>
    </>
  );
};

export default Blogs;

"use client";
import { colorCodes } from "@/constants/Constant";
import parse from "html-react-parser";
import {
  RightOutlined,
} from "@/utils/icons";
import { Tag } from "@/utils/antd-component";
import { capitalizeWords } from "../../../utils/helpers";
import "../../blogs/blogs.css";
import dynamic from "next/dynamic";

const ShareButton = dynamic(() =>
  import("@/components/common/reusable-component/share/Share"), {
    ssr : false
  }
);

let randomIndex = Math.floor(Math.random() * 6);

const style = {
  tagSection: {
    height: "40px",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  tagText: {
    fontSize: "14px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    backgroundColor: colorCodes[randomIndex].backgroundColor,
    color: colorCodes[randomIndex].color,
  },
};

const BlogPage = ({ blogDetails }) => {
  return (
    blogDetails && (
      <>
        <div className="blog-detail-page">
          <div className="blog-detail-page-inner-section">
            <div className="tag-section">
              <div style={style.tagSection}>
                <Tag style={style.tagText}>
                  {capitalizeWords(blogDetails?.category)}
                </Tag>
                <RightOutlined />
                <br />
                <Tag style={style.tagText}>
                  {capitalizeWords(blogDetails?.sub_category)}
                </Tag>
              </div>
              <div className="social-share">
                <ShareButton url={window.location.href} />
              </div>
            </div>
            <div className="blog-details-banner">
              <img src={blogDetails?.blog_image} alt="blog-banner-image" />
            </div>
            <div className="title-and-description">
              <h1>{blogDetails?.blog_title}</h1>
              <h3>{blogDetails?.blog_desc}</h3>
            </div>
            <div className="blog-info-area">
              <div className="blog-content">
                {parse(blogDetails?.blog_content)}
              </div>
              <div className="other-blogs"></div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default BlogPage;

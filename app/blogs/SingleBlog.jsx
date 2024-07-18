'use client'
import "./blogs.css";
import { addEllipsis, capitalizeWords, dateFormatter } from "../../utils/helpers";
import noBlogImage from "@/assets/no-blog.webp";
import { Button, Tag } from "@/utils/antd-component";
import Link from "next/link";
import Image from "next/image";

const SingleBlog = ({ blogContent, index }) => {

  return (
    <Link
      className={
        index ? "single-blog-card single-blog-card-index" : "single-blog-card"
      }
      href={{
        pathname: `/blog/${blogContent?.blog_structured_url ? `${blogContent?.blog_structured_url}-` : ""}${blogContent.blog_uid}`,
      }}
    >
      <div
        className="blog-image-container"
        style={{ margin: index ? "0px 10px" : "" }}
      >
        {blogContent.blog_image ? (
          <img src={blogContent.blog_image} alt="blog image" />
        ) : (
          <Image placeholder="blur" src={noBlogImage} alt="No Blog Found"/>
        )}
      </div>
      <div className="blog-cat">
        <div className="categoryTagContainer">
          <Tag className="categoryTag">
            {capitalizeWords(blogContent.sub_category)}
          </Tag>
          <p>{dateFormatter(blogContent.created_at, "mm-dd-yyyy", 3)}</p>
        </div>

        <div className="blog-content">
          <span className="blog-title">
            {addEllipsis(blogContent.blog_title, 250)}
          </span>
          <span className="blog-desc">
            {addEllipsis(blogContent.blog_desc, index ? 450 : 160)}
            {index && blogContent?.blog_desc.length > 50 && (
              <span className="blog-read-more">read more</span>
            )}
          </span>
        </div>
      </div>
      {!index && (
        <Link
          href={{
            pathname: `/blog/${blogContent?.blog_structured_url ? `${blogContent?.blog_structured_url}-` : ""}${blogContent.blog_uid}`,
          }}
        >
          <Button className="read-blog-btn">Read Blog</Button>
        </Link>
      )}
    </Link>
  );
};

export default SingleBlog;

'use client'
import React from "react";
import "./faq.css";
import { Collapse } from "@/utils/antd-component";
import {
  MinusOutlined, PlusOutlined
} from "@/utils/icons";
import faqImage from '../../../../assets/faqcommon.webp';
import Image from "next/image";

const FAQ = React.memo(({ items, image }) => {
  return (
    <div className="frequently-asked-sec">
      <div className="frequent-sections-sub">
        <span className="frqaskquestion">Frequently Asked Questions</span>
        <span className="ans-desc">Answers to your top queries – find clarity here!</span>
        <div className="main-sec">
          <div className="fq-accordion">
            <Collapse
              accordion
              items={items}
              defaultActiveKey={1}
              expandIcon={({ isActive }) =>
                isActive ? <MinusOutlined /> : <PlusOutlined />
              }
              expandIconPosition="end"
            />
          </div>
          <div className="fq-vector-container">
            <Image placeholder="blur" 
              src={image ?? faqImage} 
              alt="FAQ"
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default FAQ;

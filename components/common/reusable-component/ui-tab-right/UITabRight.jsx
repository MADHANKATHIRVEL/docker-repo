"use client";
import { useState } from "react";
import "./ui-tab-right.css";
import { Button } from "antd";

const UITabRight = ({ items }) => {
  const [selectedKey, setSelectedKey] = useState(1);
  return (
    <div className="ui-tab-right">
      <div className="inner-box">
        <div className="tabs">
          {items.map((item) => (
            <Button
              key={item.key}
              onClick={() => setSelectedKey(item.key)}
              className={
                item.key == selectedKey ? "activeTabBtn" : "inActiveTabBtn"
              }
            >
              {item.title}
            </Button>
          ))}
        </div>
        <div className="tab-contents">
          <span>{items[selectedKey - 1].description}</span>
        </div>
      </div>
    </div>
  );
};

export default UITabRight;

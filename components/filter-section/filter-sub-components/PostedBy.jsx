"use client";
import { useState } from "react";
import "./sub-components.css";
import {
  CheckOutlined,
  PlusOutlined
} from "@/utils/icons";

const PostedBy = ({ postedBy, selectedFilters, setselectedFilters }) => {

  function handleTagClick(index) {
    let newData = postedBy;
    newData[index].isSelected = !newData[index].isSelected;
    if (newData[index].isSelected) {
      setselectedFilters((prevState) => {
        return {
          ...prevState,
          postedByArr: selectedFilters.postedByArr.concat(newData[index].key),
        };
      });
    } else {
      setselectedFilters((prevState) => {
        return {
          ...prevState,
          postedByArr: selectedFilters.postedByArr.filter((item) => item != newData[index].key),
        };
      });
    }
  }

  return (
    <div className="property-type-accordion">
      <div className="gridCol">
        {postedBy.map((postBy, index) => (
          <span
            key={index}
            className={postBy.isSelected ? "pType-tag isActive" : "pType-tag isInActive"}
            style={
              postBy.label.length >= 9 && postBy.label.length <= 14
                ? {
                    width: "140px",
                  }
                : postBy.label.length >= 15
                ? { width: "170px" }
                : {}
            }
            onClick={() => handleTagClick(index)}
          >
            <>
              {postBy.isSelected ? (
                  <CheckOutlined 
                    className="selected-icon"
                  />
              ) : (
                  <PlusOutlined
                    className="not-selected-icon"
                  />
              )}
              <span>{postBy.label}</span>
            </>
          </span>
        ))}
      </div>
    </div>
  );
};

export default PostedBy;

"use client";
import "./sub-components.css";
import {
  CheckOutlined,
  PlusOutlined
} from "@/utils/icons";

const BHK = ({ propertyConfig, selectedFilters, setselectedFilters }) => {
  function handleTagClick(index) {
    let newData = propertyConfig;
    newData[index].isSelected = !newData[index].isSelected;
    if (newData[index].isSelected) {
      setselectedFilters((prevState) => {
        return {
          ...prevState,
          bedroom: selectedFilters.bedroom.concat(newData[index].key),
        };
      });
    } else {
      setselectedFilters((prevState) => {
        return {
          ...prevState,
          bedroom: selectedFilters.bedroom.filter((item) => item != newData[index].key),
        };
      });
    }
  }

  return (
    <div className="property-type-accordion">
      <div className="gridCol">
        {propertyConfig.map((pType, index) => (
          <span
            key={index}
            className={pType.isSelected ? "pType-tag isActive" : "pType-tag isInActive"}
            onClick={() => handleTagClick(index)}
          >
            <>
              {pType.isSelected ? (
                  <CheckOutlined
                    className="selected-icon"
                  />
              ) : (
                  <PlusOutlined
                    className="not-selected-icon"
                  />
              )}
              <span>{pType.label}</span>
            </>
          </span>
        ))}
      </div>
    </div>
  );
};

export default BHK;

"use client";
import "./sub-components.css";
import {
  CheckOutlined,
  PlusOutlined
} from "@/utils/icons";

const Amenities = ({ amenities, selectedFilters, setselectedFilters }) => {
  function handleTagClick(index) {
    let newData = amenities;
    newData[index].isSelected = !newData[index].isSelected;
    if (newData[index].isSelected) {
      setselectedFilters((prevState) => {
        return {
          ...prevState,
          amenitiesArr: selectedFilters.amenitiesArr.concat(newData[index].key),
        };
      });
    } else {
      setselectedFilters((prevState) => {
        return {
          ...prevState,
          amenitiesArr: selectedFilters.amenitiesArr.filter((item) => item != newData[index].key),
        };
      });
    }
  }

  function getWidth(text) {
    if(typeof window != undefined){
      switch (window.innerWidth) {
        case 1024:
          if (text.length >= 7 && text.length <= 10) {
            return {
              width: "80px",
            };
          } else if (text.length < 7) {
            return {};
          } else {
            return {
              width: "110px",
            };
          }
        default:
          if (text.length >= 7 && text.length <= 10) {
            return {
              width: "100px",
            };
          } else if (text.length < 7) {
            return {};
          } else {
            return {
              width: "150px",
            };
          }
      }
    }
  }

  return (
    <div className="property-type-accordion">
      <div className="amenitiesGridCol">
        {amenities.map((amenity, index) => (
          <span
            key={index}
            className={amenity.isSelected ? "pType-tag isActive" : "pType-tag isInActive"}
            style={getWidth(amenity.label)}
            onClick={() => handleTagClick(index)}
          >
            <>
              {amenity.isSelected ? (
                  <CheckOutlined
                    className="selected-icon"
                  />
              ) : (
                  <PlusOutlined
                    className="not-selected-icon"
                  />
              )}
              <span>{amenity.label}</span>
            </>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Amenities;

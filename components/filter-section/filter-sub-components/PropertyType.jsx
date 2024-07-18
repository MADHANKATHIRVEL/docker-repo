"use client";
import "./sub-components.css";
import {
  CheckOutlined,
  PlusOutlined
} from "@/utils/icons";

const PropertyType = ({ propertyTypeFilter, selectedFilters, setselectedFilters , setPropertyTypeFilter }) => {
  function handleTagClick(pType , index) {
    if (!(propertyTypeFilter[index].isSelected) && !(selectedFilters.property_type.includes(propertyTypeFilter[index].key))) {
      propertyTypeFilter[index].isSelected = true;
      setselectedFilters((prevState) => {
        return {
          ...prevState,
          property_type: selectedFilters.property_type.concat(propertyTypeFilter[index].key),
        };
      });
    } else {
      propertyTypeFilter[index].isSelected = false;
      setselectedFilters((prevState) => {
        return {
          ...prevState,
          property_type: selectedFilters.property_type.filter((item) => item != propertyTypeFilter[index].key),
        };
      });
    }
    setPropertyTypeFilter(propertyTypeFilter)
  }


  return (
    <div className="property_type-filter">
      {propertyTypeFilter.map((pType, index) => (
        <span
          key={index}
          className={
            pType.isSelected || pType.key === selectedFilters.property_type[0]
              ? "pType-tag isActive"
              : "pType-tag isInActive"
          }
          onClick={() => handleTagClick(pType, index)}
        >
          <>
            {pType.isSelected || pType.key === selectedFilters.property_type[0] ? (
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
  );
};

export default PropertyType;

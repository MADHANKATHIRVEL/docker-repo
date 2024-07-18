"use client";
import "./sub-components.css";
import {
  CheckOutlined,
  PlusOutlined
} from "@/utils/icons";
import { useState, useEffect } from "react";

const RealEstate = ({ realEstateFilter, selectedFilters, setselectedFilters }) => {
  const [selectedRealEstate, setSelectedRealEstate] = useState(selectedFilters.real_estate);

  useEffect(() => {
    setselectedFilters((prevState) => ({
      ...prevState,
      real_estate: selectedRealEstate,
    }));
  }, [selectedRealEstate]);

  return (
    <div className="property-type-accordion">
      <div className="gridCol">
        {realEstateFilter.map((pType, index) => (
          <span
            key={index}
            className={selectedFilters.real_estate === pType.key ? "pType-tag isActive" : "pType-tag isInActive"}
            onClick={() => {
              setSelectedRealEstate((prevState) => pType.key);
            }}
          >
            <>
              {selectedFilters.real_estate === pType.key ? (
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

export default RealEstate;

"use client";
import { useState, useEffect } from "react";
import {
  CheckOutlined,
  PlusOutlined
} from "@/utils/icons";
import './sub-components.css'


const PropertyStatus = ({ propStatus, selectedFilters, setselectedFilters }) => {
  const [selectedPropStatus, setselectedPropStatus] = useState(selectedFilters.availability);

  useEffect(() => {
    setselectedFilters((prevState) => ({
      ...prevState,
      availability: selectedPropStatus,
    }));
  }, [selectedPropStatus]);

  return (
    <div className="property-status-fc">
      {propStatus.map((pAction, index) => (
        <span
          key={index}
          className={
            selectedFilters.availability === pAction.key ? "pType-tag isActive" : "pType-tag isInActive"
          }
          onClick={() => setselectedPropStatus((prevState) => pAction.key)}
        >
          <>
            {selectedFilters.availability === pAction.key ? (
                <CheckOutlined
                  className="selected-icon"
                />
            ) : (
                <PlusOutlined
                  className="not-selected-icon"
                />
            )}
            <span>{pAction.label}</span>
          </>
        </span>
      ))}
    </div>
  );
};

export default PropertyStatus;

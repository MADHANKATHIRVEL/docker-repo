"use client";
import { useState, useEffect } from "react";
import {
  CheckOutlined,
  PlusOutlined
} from "@/utils/icons";
import './sub-components.css';

const PropertyAction = ({ propAction, selectedFilters, setselectedFilters }) => {
  const [selectedPropertyAction, setSelectedPropertyAction] = useState(selectedFilters.property_action);

  useEffect(() => {
    setselectedFilters((prevState) => ({
      ...prevState,
      property_action: selectedPropertyAction,
    }));
  }, [selectedPropertyAction]);

  return (
    <div className="property-type-accordion">
      <div className="gridCol">
        {propAction.map((pType, index) => (
          <span
            key={index}
            className={
              selectedFilters.property_action === pType.key ? "pType-tag isActive" : "pType-tag isInActive"
            }
            onClick={() => {
              setSelectedPropertyAction((prevState) => pType.key);
            }}
          >
            <>
              {selectedFilters.property_action === pType.key ? (
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

export default PropertyAction;

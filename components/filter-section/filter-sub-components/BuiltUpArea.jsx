"use client";
import { Input, Slider } from "@/utils/antd-component";
import { useState, useEffect } from "react";
import "./sub-components.css";
import { capitalizeFirstLetter } from "@/utils/helpers";

const BuiltUpArea = ({ setselectedFilters }) => {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(50000);
  const [selectedUnit, setSelectedUnit] = useState("sqft");

  useEffect(() => {
    setselectedFilters((prevState) => {
      return {
        ...prevState,
        builtuparea: [isNaN(min) ? 1 : min, isNaN(max) ? 500000 : max],
      };
    });
  }, [min, max]);

  return (
    <div className="Area-accordion">
      <div className="Area-head">
        {isNaN(parseInt(min)) || isNaN(parseInt(max)) ? (
          <></>
        ) : (
          <>
            <span>
              {parseInt(min).toLocaleString("en-IN")}{" "}
              {capitalizeFirstLetter(selectedUnit)}{" "}
            </span>
            <span>- </span>
            <span>
              {parseInt(max).toLocaleString("en-IN")}{" "}
              {capitalizeFirstLetter(selectedUnit)}
            </span>
          </>
        )}
      </div>
      <div className="Area-slider">
        <div>
          <Slider
            range
            defaultValue={[min, max]}
            min={1}
            max={50000}
            value={[min, max]}
            onChange={(value) => {
              setMin((prevState) => value[0]);
              setMax((prevState) => value[1]);
            }}
          />
        </div>
      </div>
      <div className="Area-foot">
        <Input
          className="Area-input"
          value={min}
          onChange={(e) => {
            if(e.target.value > max){
              setMin(min)
            }
            if (e.target.value.length === 0) {
              setMin(1);
            } else {
              setMin(e.target.value);
            }
          }}
          type="number"
        />
        <span>TO</span>
        <Input
          className="Area-input"
          value={max}
          onChange={(e) => {
            if(e.target.value < min){
              setMax(max)
            }
            if (e.target.value.length === 0) {
              setMax(50000000);
            } else {
              setMax(e.target.value);
            }
          }}
          type="number"
        />
      </div>
    </div>
  );
};

export default BuiltUpArea;

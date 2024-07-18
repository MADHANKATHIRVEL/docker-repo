"use client";
import { Input, Slider } from "@/utils/antd-component";
import { useState, useEffect } from "react";
import "./sub-components.css";
import { capitalizeFirstLetter } from "@/utils/helpers";

const Area = ({ setselectedFilters }) => {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(50000);
  const [selectedUnit, setSelectedUnit] = useState("sqft");

  useEffect(() => {
    if(max == "" && typeof min == "number"){
      setMax(2000)
    }
    setselectedFilters((prevState) => {
      return {
        ...prevState,
        superarea: [isNaN(min) ? 1 : min, isNaN(max) ? 500000 : max],
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
              {isNaN(min)
                ? ""
                : `${parseInt(min).toLocaleString(
                    "en-IN"
                  )} ${capitalizeFirstLetter(selectedUnit)}`}
            </span>
            <span>- </span>
            <span>
              {isNaN(max)
                ? ""
                : `${parseInt(max).toLocaleString(
                    "en-IN"
                  )} ${capitalizeFirstLetter(selectedUnit)}`}
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
              setTimeout(() => {
                setMin((prevState) => value[0]);
                setMax((prevState) => value[1]);
              }, 1000);
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
              setMin("");
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
              setMax("");
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

export default Area;

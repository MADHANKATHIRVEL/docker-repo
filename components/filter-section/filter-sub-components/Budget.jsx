"use client";
import { Input, Select, Slider } from "@/utils/antd-component";
import { useState, useEffect, useCallback, useMemo } from "react";
import "./sub-components.css";
import { buyBudgetArray } from "@/constants/Constant";
import { formatPrice } from "@/utils/helpers";

const Budget = ({ selectedFilters, setselectedFilters }) => {
  const [min, setMin] = useState(
    isNaN(selectedFilters.budget[0]) ? 1000 : selectedFilters.budget[0] ?? 1
  );
  const [max, setMax] = useState(
    isNaN(selectedFilters.budget[1])
      ? 10000000
      : selectedFilters.budget[1] ?? 50000000
  );

  const updateSelectedFilters = useCallback((prevFilters, minVal, maxVal) => {
    return {
      ...prevFilters,
      budget: [
        isNaN(minVal) ? 1000 : minVal,
        isNaN(maxVal) ? 10000000 : maxVal,
      ],
    };
  }, []);

  const memoizedUpdateSelectedFilters = useMemo(
    () => updateSelectedFilters,
    [updateSelectedFilters]
  );

  useEffect(() => {
    setselectedFilters((prevState) =>
      memoizedUpdateSelectedFilters(prevState, min, max)
    );
  }, [memoizedUpdateSelectedFilters, min, max]);

  return (
    <div className="budget-accordion">
      <div className="budget-head">
        {isNaN(parseInt(max)) || isNaN(parseInt(min)) ? (
          <></>
        ) : (
          <>
            <span>&#x20B9;&nbsp;{parseInt(min).toLocaleString("en-IN")}</span>
            <span>-</span>
            <span>&#x20B9;&nbsp;{parseInt(max).toLocaleString("en-IN")}</span>
          </>
        )}
      </div>
      <br />
      <div className="budget-head">
        <Select
          placeholder="Select Min"
          options={buyBudgetArray.map((value) => ({
            value: value,
            label: formatPrice(value),
          }))}
          value={formatPrice(min)}
          onChange={(value) => {
            setMin(value)
            if(value > max){
              setMax(10000000)
            }
          }}
        />
        <Select
          placeholder="Select Max"
          value={formatPrice(max)}
          options={buyBudgetArray
            .filter((item) => item > min)
            .map((value) => ({
              value: value,
              label: formatPrice(value),
            }))}
          onChange={(value) => setMax(value)}
        />
      </div>
      <div className="budget-slider">
        <div>
          <Slider
            range
            defaultValue={[1000, 10000000]}
            step={500000}
            min={1000}
            max={10000000}
            value={[min, max]}
            onChange={(value) => {
              setTimeout(() => {
                setMin(value[0]);
                setMax(value[1]);
              }, 150);
            }}
            tooltipFormatter={(value) =>
              parseInt(value.toLocaleString("en-IN"))
            }
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
          />
        </div>
      </div>
      <div className="budget-foot">
        <Input
          className="budget-input"
          value={min}
          onChange={(e) => {
            setMin(e.target.value)
            if(e.target.value > max){
              setMin(min)
              setMax(10000000)
            }
            else{
              if (e.target.value.length === 0) {
                setMin("");
              } else {
                if (e.target.value <= max) {
                  setMin(e.target.value);
                }
              }
            }
          }}
          type="number"
        />
        <span>TO</span>
        <Input
          className="budget-input"
          value={max}
          onChange={(e) => {
            setMax(e.target.value)
            if(e.target.value < min){
              setMax(max)
            }
            else{
              if (e.target.value.length === 0) {
                setMax("");
              } else {
                setMax(e.target.value);
              }
            }
          }}
          type="number"
        />
      </div>
    </div>
  );
};

export default Budget;

"use client";
import React, { useMemo, useState, useEffect } from "react";
import "./mobile-filter.scss";
import { LeftOutlined } from "@/utils/icons";
import { Button, Select, Tabs } from "@/utils/antd-component";
import { capitalizeWords, formatPrice, formatText } from "@/utils/helpers";
import Cookies from "js-cookie";
import axios from "axios";
import { APP_BASE_URL, buyBudgetArray } from "@/constants/Constant";
import Image from "next/image";
import {
  homeFilterIcon,
  houseFilterIcon,
  plotFilterIcon,
  officeFilterIcon,
  flatFilterIcon,
  shopFilterIcon,
} from "./assets";
import { useRouter } from "next/navigation";

const MobileScreenFilter = () => {
  const [locationOptions, setLocationOptions] = useState();
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const [selectedLocalities, setSelectedLocalities] = useState([]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
  const [selectedBHK, setSelectedBHK] = useState([]);
  const [selectedPropertyCount, setSelectedPropertyCount] = useState(null);
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [propertyAction, setPropertyAction] = useState("sell");
  const router = useRouter()

  function resetFilters(){
    setSelectedLocalities([])
    setSelectedPropertyTypes([])
    setSelectedBHK([])
    setSelectedPropertyCount(null)
    setSelectedAvailability([])
  }  

  useEffect(() => {
    async function getFilteredPropertyCount() {
      const response = await axios.get(
        `${APP_BASE_URL}/properties/get_property_count`,
        {
          params: {
            location: Cookies.get("userLocation"),
            locality:
              selectedLocalities.length == 0
                ? undefined
                : selectedLocalities.join(","),
            property_type:
              selectedPropertyTypes.length == 0
                ? undefined
                : selectedPropertyTypes.join(","),
            bedroom:
              selectedBHK.length != 0 ? selectedBHK.join(",") : undefined,
            min_budget: min ?? undefined,
            max_budget: max ?? undefined,
            property_action: propertyAction?.toLowerCase() === "commercial" ? undefined : propertyAction?.toLowerCase(),
            real_estate : propertyAction?.toLowerCase() == "commercial" ? "commercial" : undefined,
            availability:
              selectedAvailability.length == 0
                ? undefined
                : selectedAvailability.join(","),
          },
        }
      );
      setSelectedPropertyCount(response.data.count);
    }
    getFilteredPropertyCount();
  }, [
    selectedPropertyTypes,
    selectedBHK,
    min,
    max,
    selectedLocalities,
    selectedAvailability,
    propertyAction
  ]);

  useEffect(() => {
    async function getLocalities() {
      const response = await axios.get(
        `${APP_BASE_URL}/Location/getLocation?location=locality&city=${
          Cookies.get("city-id") ?? 499
        }`
      );
      setLocationOptions((prevState) =>
        response.data.locality.map((item) => ({
          label: capitalizeWords(item),
          value: item.toLowerCase(),
        }))
      );
    }
    getLocalities();
  }, [Cookies.get("city-id")]);

  const items = useMemo(() => {
    const propertyTypes = ["Buy", "Rent", "Commercial"];
    return propertyTypes.map((type, index) => ({
      key: `${index + 1}`,
      label: type,
      children: (
        <div className="filter-inputs">
          <div className="single-input">
            <label>Select Locations</label>
            <Select
              mode="multiple"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Please select"
              onChange={(value) => {
                setSelectedLocalities(value);
              }}
              options={locationOptions}
            />
          </div>
          <div className="single-input">
            <label>Budget</label>
            <div className="budget-input-select">
              <Select
                placeholder="Select Min"
                options={buyBudgetArray.map((value) => ({
                  value: value,
                  label: formatPrice(value),
                }))}
                value={formatPrice(min)}
                onChange={(value) => {
                  setMin(value);
                  if (value > max) {
                    setMax(10000000);
                  }
                }}
                listHeight={250}
                className="budget-selector-width"
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
              />
              <span>To</span>
              <Select
                placeholder="Select Max"
                className="budget-selector-width"
                value={formatPrice(max)}
                options={buyBudgetArray
                  .filter((item) => item > min)
                  .map((value) => {
                    return {
                      value: value,
                      label: formatPrice(value),
                    };
                  })}
                onChange={(value) => setMax(value)}
                listHeight={250}
              />
            </div>
          </div>
          <div className="single-input">
            <label>Property Type</label>
            <div className="property-type-select">
              {type?.toLowerCase() != "commercial" ? [
                { label: "House", icon: homeFilterIcon },
                { label: "Villa", icon: houseFilterIcon },
                { label: "Land / Plot", icon: plotFilterIcon },
                { label: "Flat", icon: flatFilterIcon },
                { label: "Shop", icon: shopFilterIcon },
                { label: "Office", icon: officeFilterIcon },
              ].map((pt) => (
                <div
                  className={`property-card ${
                    selectedPropertyTypes.includes(pt.label) ? `activeCard` : ""
                  }`}
                  onClick={() => handlePropertyTypeClick(pt.label)}
                >
                  <Image src={pt.icon} height={18} width={18} />
                  <span>{pt.label}</span>
                </div>
              )) : [
                { label: "Land / Plot", icon: plotFilterIcon },
                { label: "Shop", icon: shopFilterIcon },
                { label: "Office", icon: officeFilterIcon },
              ].map((pt) => (
                <div
                  className={`property-card ${
                    selectedPropertyTypes.includes(pt.label) ? `activeCard` : ""
                  }`}
                  onClick={() => handlePropertyTypeClick(pt.label)}
                >
                  <Image src={pt.icon} height={18} width={18} />
                  <span>{pt.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="single-input">
            <label>Availability</label>
            <div className="availability-select">
              {["under_construction", "ready_to_move"].map((item) => (
                <div
                  className={`availability-card ${
                    selectedAvailability.includes(item) ? `activeCard` : ""
                  }`}
                  onClick={() => handleAvalabilityClick(item)}
                >
                  <p>{capitalizeWords(formatText(item))}</p>
                </div>
              ))}
            </div>
          </div>
          {type.toLowerCase() != "commercial" && (
            <div className="single-input">
              <label>BHK</label>
              <div className="bhk-row">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    className={`bhk-item ${
                      selectedBHK.includes(item) ? `activeCard` : ""
                    }`}
                    onClick={() => handleBHKClick(item)}
                  >
                    {item} BHK
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* <div className="single-input">
            <label>Carpet Area</label>
            <Slider
              range
              defaultValue={[1, 50000]}
              min={1}
              max={50000}
              onChange={(value) => {
                setCarpetMin(value[0]);
                setCarpetMax(value[1]);
              }}
            />
          </div> */}
        </div>
      ),
    }));
  }, [
    locationOptions,
    selectedPropertyTypes,
    selectedBHK,
    min,
    max,
    selectedAvailability,
  ]);

  function handlePropertyTypeClick(pt) {
    if (selectedPropertyTypes.includes(pt)) {
      setSelectedPropertyTypes((prev) =>
        prev.filter((propertyType) => propertyType != pt)
      );
    } else {
      setSelectedPropertyTypes((prev) => [...prev, pt]);
    }
  }

  function handleAvalabilityClick(availability) {
    if (selectedAvailability.includes(availability)) {
      setSelectedAvailability((prev) =>
        prev.filter((prevAvailability) => prevAvailability != availability)
      );
    } else {
      setSelectedAvailability((prevAvailability) => [
        ...prevAvailability,
        availability,
      ]);
    }
  }

  console.log(selectedAvailability, "asdasds");

  function handleBHKClick(bhk) {
    if (selectedBHK.includes(bhk)) {
      setSelectedBHK((prev) => prev.filter((bedroom) => bedroom != bhk));
    } else {
      setSelectedBHK((prev) => [...prev, bhk]);
    }
  }

  function generateUrl() {
    let url = `/property/properties-in-coimbatore?`;
    if (selectedLocalities.length > 0) {
      url += `selectedLocality=${selectedLocalities.join(",")}&`;
    }
    if (selectedBHK.length > 0) {
      url += `bedroom=${selectedBHK.join(",")}&`;
    }
    if (selectedPropertyTypes.length > 0) {
      url += `type_of_property=${selectedPropertyTypes.join(",")}&`;
    }
    if (selectedAvailability.length > 0) {
      url += `availability=${selectedAvailability.join(",")}&`;
    }
    url += `property_action=${propertyAction}`;
    return url;
  }

  return (
    <section className="mobile-filter-section">
      <div className="mobile-filter-card-inner">
        <div className="hero-section">
          <LeftOutlined onClick={() => router.back()}/>
          <p>Filter Card</p>
          <a onClick={() => resetFilters()}>Reset</a>
        </div>
        <Tabs
          defaultActiveKey="1"
          centered
          items={items}
          onChange={(value, index) => {
            switch (value) {
              case "1":
                setPropertyAction("sell");
                break;
              case "2":
                setPropertyAction("rent");
                break;
              case "3":
                setPropertyAction("commercial");
                break;
              default:
                break;
            }
          }}
        />
        <div className="view-property-container">
          <Button
            className="view-properties-btn"
            disabled={!selectedPropertyCount}
            href={generateUrl()}
          >
            {!!selectedPropertyCount
              ? `View ${selectedPropertyCount} Properties`
              : "No Properties Found"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MobileScreenFilter;

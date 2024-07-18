"use client";
import "./filter-card.css";
import { Button, Collapse, Tag } from "@/utils/antd-component";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  CloseCircleOutlined
} from "@/utils/icons";
import { useState } from "react";
import { capitalizeFirstLetter, formatText } from "@/utils/helpers";
import dynamic from "next/dynamic";

const BHK = dynamic(() => import("./filter-sub-components/BHK") , {
  ssr : false
});
const PostedBy = dynamic(() => import("./filter-sub-components/PostedBy") , {
  ssr : false
});
const Amenities = dynamic(() => import("./filter-sub-components/Amenities") , {
  ssr : false
});
const PropertyType = dynamic(() =>
  import("./filter-sub-components/PropertyType") , {
    ssr : false
  }
);
const Localities = dynamic(() => import("./filter-sub-components/Localities") , {
  ssr : false
});
const Budget = dynamic(() => import("./filter-sub-components/Budget") , {
  ssr : false
});
const Area = dynamic(() => import("./filter-sub-components/Area") , {
  ssr : false
});
const BuiltUpArea = dynamic(() =>
  import("./filter-sub-components/BuiltUpArea") , {
    ssr : false
  }
);
const PropertyAction = dynamic(() =>
  import("./filter-sub-components/PropertyAction") , {
    ssr : false
  }
);
const PropertyStatus = dynamic(() =>
  import("./filter-sub-components/PropertyStatus") , {
    ssr : false
  }
);

export const propertyFeatures = [
  {
    key: "flat",
    label: "Flat",
    isSelected: false,
  },
  {
    key: "villa",
    label: "Villa",
    isSelected: false,
  },
  {
    key: "pg",
    label: "PG",
    isSelected: false,
  },
  {
    key: "house",
    label: "House",
    isSelected: false,
  },
  {
    key: "plot",
    label: "Plot",
    isSelected: false,
  },
  {
    key: "shop",
    label: "Shop",
    isSelected: false,
  },
  {
    key: "office",
    label: "Office Space",
    isSelected: false,
  },
];

export const bhkArr = [
  {
    key: 1,
    label: "1 BHK",
    isSelected: false,
  },
  {
    key: 2,
    label: "2 BHK",
    isSelected: false,
  },
  {
    key: 3,
    label: "3 BHK",
    isSelected: false,
  },
  {
    key: 4,
    label: "4 BHK",
    isSelected: false,
  },
  {
    key: 5,
    label: "5 BHK",
    isSelected: false,
  },
  {
    key: 6,
    label: "5+ BHK",
    isSelected: false,
  },
];

export const postedByOptions = [
  {
    key: "1",
    label: "Owner",
    isSelected: false,
  },
  {
    key: "2",
    label: "Agent",
    isSelected: false,
  },
  {
    key: "3",
    label: "Builder",
    isSelected: false,
  },
];

export const nearByAmentiesArr = [
  {
    key: "lift",
    label: "Lift",
    isSelected: false,
  },
  {
    key: "parking",
    label: "Parking",
    isSelected: false,
  },
  {
    key: "power_backup",
    label: "Power Backup",
    isSelected: false,
  },
  {
    key: "swimming_pool",
    label: "Swimming Pool",
    isSelected: false,
  },
];

export const realEstateArr = [
  {
    key: "residential",
    label: "Residential",
  },
  {
    key: "commercial",
    label: "Commercial",
  },
];

export const propertyActionArr = [
  {
    key: "sell",
    label: "Buy",
  },
  {
    key: "rent",
    label: "Rent",
  },
];

export const propertyStatusArr = [
  {
    key: "ready_to_move",
    label: "Ready To Move",
    isSelected: false,
  },
  {
    key: "under_construction",
    label: "Under Construction",
    isSelected: false,
  },
];

const FilterCard = ({
  selectedFilters,
  setselectedFilters,
  selectedLocality,
  category,
  setPage,
  setIsApiCallDone,
}) => {

  const [propertyTypeFilter, setPropertyTypeFilter] =
    useState(propertyFeatures);
  const [propertyConfig, setPropertyConfig] = useState(bhkArr);
  const [postedBy, setPostedBy] = useState(postedByOptions);
  const [amenities, setAmenities] = useState(nearByAmentiesArr);
  const [propAction, setPropAction] = useState(propertyActionArr);
  const [propStatus, setPropStatus] = useState(propertyStatusArr);
  const [realEstateFilter, setRealEstateFilter] = useState(realEstateArr);

  function handleCommercialPropertyAction(action) {
    setselectedFilters((prevState) => ({
      ...prevState,
      property_action: action,
    }));
  }

  const filterItems = [
    {
      key: 1,
      label: <div className="filter-card_collapse-accHeader">Localities</div>,
      children: (
        <Localities
          selectedFilters={selectedFilters}
          setselectedFilters={setselectedFilters}
          selectedLocality={selectedLocality}
        />
      ),
    },
    {
      key: 2,
      label: <div className="filter-card_collapse-accHeader">Budget</div>,
      children: (
        <>
          <Budget
            selectedFilters={selectedFilters}
            setselectedFilters={setselectedFilters}
          />
        </>
      ),
    },
    {
      key: 3,
      label: <div className="filter-card_collapse-accHeader">Total Area</div>,
      children: (
        <>
          <Area
            selectedFilters={selectedFilters}
            setselectedFilters={setselectedFilters}
          />
        </>
      ),
    },
    {
      key: 4,
      label: (
        <div className="filter-card_collapse-accHeader">Built Up Area</div>
      ),
      children: (
        <>
          <BuiltUpArea
            selectedFilters={selectedFilters}
            setselectedFilters={setselectedFilters}
          />
        </>
      ),
    },
    {
      key: 5,
      label: (
        <div className="filter-card_collapse-accHeader">Property Type</div>
      ),
      children: (
        <PropertyType
          propertyTypeFilter={propertyTypeFilter}
          setPropertyTypeFilter={setPropertyTypeFilter}
          selectedFilters={selectedFilters}
          setselectedFilters={setselectedFilters}
        />
      ),
    },
    {
      key: 6,
      label: <div className="filter-card_collapse-accHeader">BHK</div>,
      children: (
        <BHK
          propertyConfig={propertyConfig}
          setPropertyConfig={setPropertyConfig}
          selectedFilters={selectedFilters}
          setselectedFilters={setselectedFilters}
        />
      ),
    },
    {
      key: 7,
      label: <div className="filter-card_collapse-accHeader">Posted By</div>,
      children: (
        <PostedBy
          postedBy={postedBy}
          setPostedBy={setPostedBy}
          selectedFilters={selectedFilters}
          setselectedFilters={setselectedFilters}
        />
      ),
    },
    {
      key: 8,
      label: <div className="filter-card_collapse-accHeader">Amenities</div>,
      children: (
        <Amenities
          amenities={amenities}
          setAmenities={setAmenities}
          selectedFilters={selectedFilters}
          setselectedFilters={setselectedFilters}
        />
      ),
    },
    {
      key: 9,
      label: (
        <div className="filter-card_collapse-accHeader">Property Status</div>
      ),
      children: (
        <PropertyStatus
          propStatus={propStatus}
          setPropStatus={setPropStatus}
          selectedFilters={selectedFilters}
          setselectedFilters={setselectedFilters}
        />
      ),
    },
    {
      key: 10,
      label: (
        <div className="filter-card_collapse-accHeader">Property Action</div>
      ),
      children: (
        <PropertyAction
          propAction={propAction}
          setPropAction={setPropAction}
          selectedFilters={selectedFilters}
          setselectedFilters={setselectedFilters}
        />
      ),
    },
  ];

  function handleClearAll() {
    setIsApiCallDone((prevState) => true);
    setselectedFilters((prevState) => {
      return {
        locality: [],
        budget: [],
        property_type: [],
        bedroom: [],
        postedByArr: [],
        amenitiesArr: [],
        property_action: "",
        real_estate: "",
        superarea: [],
        builtuparea: [],
      };
    });
    setPage((prevState) => 1);
    setPropertyTypeFilter((prevState) => {
      return [...prevState.map((data) => ({ ...data, isSelected: false }))];
    });
    setPropertyConfig((prevState) =>
      bhkArr.map((data) => ({ ...data, isSelected: false }))
    );
    setPostedBy((prevState) =>
      postedByOptions.map((data) => ({ ...data, isSelected: false }))
    );
    setAmenities((prevState) =>
      nearByAmentiesArr.map((data) => ({ ...data, isSelected: false }))
    );
    setRealEstateFilter((prevState) =>
      realEstateArr.map((data) => ({ ...data, isSelected: false }))
    );
    setPropStatus((prevState) =>
      propertyStatusArr.map((data) => ({ ...data, isSelected: false }))
    );
  }

  function removeFilter(item, key) {
    if (key === "locality") {
      setselectedFilters((prevState) => {
        return {
          ...prevState,
          locality: [...locality.filter((val) => val != item)],
        };
      });
    }
    if (key === "property_type") {
      let newData = propertyTypeFilter.map(pt => (pt.key == item ? {...pt , isSelected : false} : pt));
      setPropertyTypeFilter(newData);
      setselectedFilters((prevState) => {
        return {
          ...prevState,
          property_type: [...property_type.filter((val) => val != item)],
        };
      });
    }
    if (key === "bedroom") {
      setselectedFilters((prevState) => {
        return {
          ...prevState,
          bedroom: [...bedroom.filter((val) => val != item)],
        };
      });
    }
    if (key === "postedByArr") {
      setselectedFilters((prevState) => {
        return {
          ...prevState,
          postedByArr: [...postedByArr.filter((val) => val != item)],
        };
      });
    }
    if (key === "amenitiesArr") {
      setselectedFilters((prevState) => {
        return {
          ...prevState,
          amenitiesArr: [...amenitiesArr.filter((val) => val != item)],
        };
      });
    }
    if (key === "budget") {
      setselectedFilters((prevState) => {
        return {
          ...prevState,
          budget: [],
        };
      });
    }
    if (key === "real_estate") {
      setselectedFilters((prevState) => {
        return {
          ...prevState,
          real_estate: "",
        };
      });
    }
    if (key === "property_action") {
      setselectedFilters((prevState) => {
        return {
          ...prevState,
          property_action: "",
        };
      });
    }
    if (key === "availability") {
      setselectedFilters((prevState) => {
        return {
          ...prevState,
          availability: "",
        };
      });
    }
  }

  function getUserTypeText(userId) {
    switch (userId) {
      case "1":
        return "Owner";
      case "2":
        return "Agent";
      case "3":
        return "Builder";
    }
  }

  const {
    locality,
    budget,
    property_type,
    bedroom,
    postedByArr,
    amenitiesArr,
    real_estate,
    property_action,
    availability,
  } = selectedFilters;

  function isBtnDisabled() {
    for (const key in selectedFilters) {
      if (selectedFilters[key]?.length > 0) {
        return false;
      }
    }
    return true;
  }

  return (
    <div className="filter-component">
      <div className="head-section">
        <div className="filter-header">
          <span className="appliedFiltersTxt">Applied Filters</span>
          <Button
            className="clearFiltersTxt"
            onClick={() => handleClearAll()}
            disabled={isBtnDisabled()}
          >
            Clear All
          </Button>
        </div>
        <div className="show-selected">
          {locality.map((item, index) => (
            <Tag key={`${item}_${index}`} className="selected_tag">
              {item}
              <CloseCircleOutlined
                onClick={() => removeFilter(item, "locality")}
                className="close-circle"
              />
            </Tag>
          ))}
          {property_type.map(
            (item) =>
              !!item && (
                <Tag key={item} className="selected_tag">
                  {formatText(item)}
                  <CloseCircleOutlined
                    onClick={() => removeFilter(item, "property_type")}
                    className="close-circle"
                  />
                </Tag>
              )
          )}
          {bedroom.map((item) => (
            <Tag key={item} className="selected_tag">
              {item !== 6 ? item : "> 5"}&nbsp;BHK
              <CloseCircleOutlined
                onClick={() => removeFilter(item, "bedroom")}
                className="close-circle"
              />
            </Tag>
          ))}
          {postedByArr.map((item) => (
            <Tag key={item} className="selected_tag">
              {getUserTypeText(formatText(item))}
              <CloseCircleOutlined
                onClick={() => removeFilter(item, "postedByArr")}
                className="close-circle"
              />
            </Tag>
          ))}
          {amenitiesArr?.map((item) => (
            <Tag key={item} className="selected_tag">
              {formatText(item)}
              <CloseCircleOutlined
                onClick={() => removeFilter(item, "amenitiesArr")}
                className="close-circle"
              />
            </Tag>
          ))}
          {budget?.length > 0 && budget[0] && budget[1] && (
            <Tag className="selected_tag">
              {`${parseInt(budget[0]).toLocaleString("en-IN")} - ${parseInt(
                budget[1]
              ).toLocaleString("en-IN")}`}
              <CloseCircleOutlined
                onClick={() => removeFilter("", "budget")}
                className="close-circle"
              />
            </Tag>
          )}
          {real_estate?.length > 0 && (
            <Tag key={real_estate} className="selected_tag">
              {formatText(real_estate)}<CloseCircleOutlined
            onClick={() => removeFilter("", "real_estate")}
            className="close-circle"
          />
            </Tag>
          )}
          {property_action?.length > 0 && (
            <Tag className="selected_tag">
              {capitalizeFirstLetter(
                formatText(
                  property_action === "sell" || property_action[0] === "sell"
                    ? "buy"
                    : "rent"
                )
              )}
              <CloseCircleOutlined
                onClick={() => removeFilter("", "property_action")}
                className="close-circle"
              />
            </Tag>
          )}
          {availability?.length > 0 && (
            <Tag key={availability} className="selected_tag">
              {formatText(availability)}
              <CloseCircleOutlined
                onClick={() => removeFilter("", "availability")}
                className="close-circle"
              />
            </Tag>
          )}
        </div>
      </div>
      <div className="selected-filters">
        {selectedFilters?.real_estate === "commercial" && (
          <div className="commercial-prop-actions">
            <Button
              className={
                selectedFilters?.property_action === "buy"
                  ? "commercial-prop-actionsBuyBtn"
                  : "commercial-prop-actionsSelectedbtn"
              }
              onClick={() => handleCommercialPropertyAction("buy")}
            >
              Buy
            </Button>
            <Button
              className={
                selectedFilters?.property_action === "rent"
                  ? "commercial-prop-actionsBuyBtn"
                  : "commercial-prop-actionsSelectedbtn"
              }
              onClick={() => handleCommercialPropertyAction("rent")}
            >
              Rent
            </Button>
          </div>
        )}
        <Collapse
          className="filter-card_collapse"
          accordion
          items={
            (!(
              selectedFilters?.property_type?.includes("plot") ||
              selectedFilters?.property_type?.includes("office") ||
              selectedFilters?.property_type?.includes("shop")
            ) ||
              (selectedFilters?.property_type?.includes("house")) ||
              selectedFilters?.property_type?.includes("villa") ||
              selectedFilters?.property_type?.includes("flat"))
              ? filterItems
              : filterItems.filter((acc) => acc.key != 6)
          }
          expandIcon={({ isActive }) =>
            isActive ? (
              <CaretUpOutlined color="red" />
            ) : (
              <CaretDownOutlined className="collapse-icon" />
            )
          }
          expandIconPosition="end"
          defaultActiveKey={["1"]}
        />
      </div>
    </div>
  );
};

export default FilterCard;

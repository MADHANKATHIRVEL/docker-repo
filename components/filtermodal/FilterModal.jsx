"use client";
import { Tag, Modal } from "@/utils/antd-component";
import { useState } from "react";
import { formatText } from "@/utils/helpers";
import "./filter-modal.css";
import {
  CloseCircleOutlined
} from "@/utils/icons";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const Budget = dynamic(() =>
  import("../filter-section/filter-sub-components/Budget")
);
const PropertyType = dynamic(() =>
  import("../filter-section/filter-sub-components/PropertyType")
);
const BHK = dynamic(() =>
  import("../filter-section/filter-sub-components/BHK")
);
const PostedBy = dynamic(() =>
  import("../filter-section/filter-sub-components/PostedBy")
);
const Amenities = dynamic(() =>
  import("../filter-section/filter-sub-components/Amenities")
);
const Localities = dynamic(() =>
  import("../filter-section/filter-sub-components/Localities")
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

const FilterModal = ({
  showModal,
  setShowModal,
  selectedFilters,
  setSelectedFilters,
}) => {
  const router = useRouter();
  const [propertyType, setPropertyType] = useState(propertyFeatures);
  const [bhk, setBHK] = useState(bhkArr);
  const [postedBy, setPostedBy] = useState(postedByOptions);
  const [amenities, setAmenities] = useState(nearByAmentiesArr);

  const {
    locality,
    budget,
    property_type,
    bedroom,
    postedByArr,
    amenitiesArr,
    real_estate,
    propertyAction,
    availability,
  } = selectedFilters;

  function handleClearAll() {
    setSelectedFilters((prevState) => {
      return {
        locality: [],
        budget: [],
        property_type: [],
        bedroom: [],
        postedByArr: [],
        amenitiesArr: [],
        propertyAction: "",
        real_estate: "",
        availability: "",
        superarea: [],
        builtuparea: [],
      };
    });
    setPropertyType((prevState) =>
      propertyFeatures.map((data) => ({ ...data, isSelected: false }))
    );
    setBHK((prevState) =>
      bhkArr.map((data) => ({ ...data, isSelected: false }))
    );
    setPostedBy((prevState) =>
      postedByOptions.map((data) => ({ ...data, isSelected: false }))
    );
    setAmenities((prevState) =>
      nearByAmentiesArr.map((data) => ({ ...data, isSelected: false }))
    );
  }

  function removeFilter(item, key) {
    if (key === "locality") {
      setSelectedFilters((prevState) => {
        return {
          ...prevState,
          locality: [...locality.filter((val) => val != item)],
        };
      });
    }
    if (key === "property_type") {
      setSelectedFilters((prevState) => {
        return {
          ...prevState,
          property_type: [...property_type.filter((val) => val != item)],
        };
      });
    }
    if (key === "bedroom") {
      setSelectedFilters((prevState) => {
        return {
          ...prevState,
          bedroom: [...bedroom.filter((val) => val != item)],
        };
      });
    }
    if (key === "postedByArr") {
      setSelectedFilters((prevState) => {
        return {
          ...prevState,
          postedByArr: [...postedByArr.filter((val) => val != item)],
        };
      });
    }
    if (key === "amenitiesArr") {
      setSelectedFilters((prevState) => {
        return {
          ...prevState,
          amenitiesArr: [...amenitiesArr.filter((val) => val != item)],
        };
      });
    }
    if (key === "budget") {
      setSelectedFilters((prevState) => {
        return {
          ...prevState,
          budget: [],
        };
      });
    }
    if (key === "property_action") {
      setSelectedFilters((prevState) => {
        return {
          ...prevState,
          property_action: "",
        };
      });
    }
    if (key === "availability") {
      setSelectedFilters((prevState) => {
        return {
          ...prevState,
          availability: "",
        };
      });
    }
  }

  return (
    <Modal open={showModal} onCancel={() => setShowModal(false)} footer={null}>
      <div

        className="filter-modal"
      >
        <span onClick={handleClearAll} className="clearAllText">
          Clear All
        </span>
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
          {property_type.map((item) => (
            <Tag key={item} className="selected_tag">
              {formatText(item)}
              <CloseCircleOutlined
                onClick={() => removeFilter(item, "property_type")}
                className="close-circle"
              />
            </Tag>
          ))}
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
              {formatText(item)}
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
              {`${budget[0]} - ${budget[1]}`}
              <CloseCircleOutlined
                onClick={() => removeFilter("", "budget")}
                className="close-circle"
              />
            </Tag>
          )}
          {real_estate?.length > 0 && (
            <Tag key={real_estate} className="selected_tag">
              {formatText(real_estate)}
            </Tag>
          )}
          {propertyAction?.length > 0 && (
            <Tag className="selected_tag">
              {formatText(propertyAction)}
              <CloseCircleOutlined
                onClick={() => removeFilter("", "property_action")}
                className="close-circle"
              />
            </Tag>
          )}
          {availability?.length > 0 &&
            availability?.map((item) => (
              <Tag key={item} className="selected_tag">
                {formatText(item)}
                <CloseCircleOutlined
                  onClick={() => removeFilter("", "availability")}
                  className="close-circle"
                />
              </Tag>
            ))}
        </div>
        <span className="modal-filter-title">Select Locality</span>
        <Localities
          selectedFilters={selectedFilters}
          setselectedFilters={setSelectedFilters}
        />
        <span className="modal-filter-title">Select Budget</span>
        <Budget
          selectedFilters={selectedFilters}
          setselectedFilters={setSelectedFilters}
        />
        <span className="modal-filter-title">Select Property Type</span>
        <PropertyType
          propertyTypeFilter={propertyType}
          setPropertyTypeFilter={setPropertyType}
          selectedFilters={selectedFilters}
          setselectedFilters={setSelectedFilters}
        />
        <span className="modal-filter-title">Select BHK</span>
        <BHK
          propertyConfig={bhk}
          setPropertyConfig={setBHK}
          selectedFilters={selectedFilters}
          setselectedFilters={setSelectedFilters}
        />
        <span className="modal-filter-title">Select Posted By</span>
        <PostedBy
          postedBy={postedBy}
          setPostedBy={setPostedBy}
          selectedFilters={selectedFilters}
          setselectedFilters={setSelectedFilters}
        />
        <span className="modal-filter-title">Select Amenities</span>
        <Amenities
          amenities={amenities}
          setAmenities={setAmenities}
          selectedFilters={selectedFilters}
          setselectedFilters={setSelectedFilters}
        />
      </div>
    </Modal>
  );
};

export default FilterModal;

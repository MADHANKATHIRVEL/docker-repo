'use client'
import {
  Button,
  Input,
  InputNumber,
  Radio,
  Select,
  notification,
  Modal,
} from "@/utils/antd-component";
import axios from "axios";
import { useEffect, useState } from "react";
import { APP_BASE_URL } from "@/constants/Constant";
import "./edit-modal.css";
import { formatText } from "../../../../../utils/helpers";
import { getUserId } from "../../../../../utils/userUtils";

const PropertyEditModal = ({ showModal, setShowModal, propertyId }) => {
  const [realEstate, setRealEstate] = useState();
  const [data, setData] = useState();
  const [propertyType, setPropertyType] = useState();
  const [features, setFeatures] = useState();
  const [area, setArea] = useState();
  const [flatFloor, setFlatFloor] = useState();
  const [totalFloor, setTotalFloor] = useState("");
  const [expectedPrice, setExpectedPrice] = useState();
  const [tokenAmount, setTokenAmount] = useState();

  useEffect(() => {
    async function fetchPropertyData() {
      const response = await axios.get(
        `${APP_BASE_URL}/Properties/show?p_id=${propertyId}&user_id=${getUserId()}`
      );
      setData((prevState) => response.data);
      setFeatures((prevState) => response.data.features);
      setRealEstate((prevState) => response.data.real_estate);
      setPropertyType((prevState) => response.data.property_type.pt_name);
      setArea((prevState) => response.data.area);
    }
    fetchPropertyData();
  }, []);


  const options = [
    {
      label: "Dry",
      value: "dry",
    },
    {
      label: "Wet",
      value: "wet",
    },
    {
      label: "Not Applicable",
      value: "not_applicable",
    },
  ];

  function handleIncrement(index, key) {
    let newData = [...features];
    newData[index]["value"] += 1;
    setFeatures((prevState) => [...newData]);
  }
  function handleDecrement(index, key) {
    let newData = [...features];
    newData[index]["value"] -= 1;
    setFeatures((prevState) => [...newData]);
  }

  let furnishedStatus = [
    {
      key: "furnished",
      label: "Furnished",
    },
    {
      key: "unfurnished",
      label: "Un Furnished",
    },
    {
      key: "semi_furnished",
      label: "Semi Furnished",
    },
  ];

  function handleAreaChange(key, value) {
    setArea((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  }

  function handleAreaAfterChange(key, value) {
    setArea((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  }

  const selectCarpetAreaAfter = (
    <Select
      defaultValue="sqft"
      onChange={(value) => handleAreaAfterChange("carpet_area_unit", value)}
      placeholder="Select"
      value={area?.carpet_area_unit}
    >
      <Select.Option value="sqft">Sq.Ft</Select.Option>
      <Select.Option value="cent">Cent</Select.Option>
    </Select>
  );

  const selectSuperAreaAfter = (
    <Select
      defaultValue="sqft"
      onChange={(value) => handleAreaAfterChange("super_area_unit", value)}
      className="select-area-after"
      placeholder="Select"
      value={area?.super_area_unit}
    >
      <Select.Option value="sqft">Sq.Ft</Select.Option>
      <Select.Option value="cent">Cent</Select.Option>
    </Select>
  );


  function getFeaturesUpdate() {
    switch (realEstate?.toLowerCase()) {
      case "residential":
        switch (propertyType?.toLowerCase()) {
          case "flat":
            return (
              <>
                <div className="property-features">
                  {!!features &&
                    features.map((item, index) => (
                      <div key={item.key}>
                        {item.title === "bath" ||
                        item.title === "balconies" ||
                        item.title === "bedroom" ? (
                          <>
                            <span className="input-spn-label">
                              {formatText(item.title)}
                            </span>
                            <div className="inc-dec-input">
                              <Button
                                className="decrementBtn"
                                onClick={() => {
                                  if (item.value === 0) return;
                                  handleDecrement(index, item.key);
                                }}
                              >
                                -
                              </Button>
                              <InputNumber
                                className="placeholder_change input-incdec"
                                value={item.value}
                                controls={false}
                                type="number"
                              />
                              <Button
                                className="incrementBtn"
                                onClick={() => handleIncrement(index, item.key)}
                              >
                                +
                              </Button>
                            </div>
                          </>
                        ) : (
                          <>
                            {/* {
                          item.title === "furnish_status" && (
                            furnishedStatus.map((status) => (
                              <Button
                                key={status.key}
                                // className={
                                //   status.key === features.filter(item => item.furnish_status)[0].value
                                //     ? "isActiveFurnishBtn"
                                //     : "singleBtn"
                                // }
                                onClick={() => setFeatures(prevState => [
                                  ...prevState , 
                                  features.map(
                                    item => {
                                      if(item.title === 'furnish_status'){
                                        item['value'] = status;
                                      }
                                    })
                                ])}
                              >
                                {status.label}
                              </Button>
                            ))
                          )
                        } */}
                          </>
                        )}
                      </div>
                    ))}
                  <div className="prop-feature-second-row">
                    <div className="floor-no-sec">
                      <span className="input-spn-label">
                        Total Number of Flats in Society
                      </span>
                      <Select
                        placeholder="Select"
                        className="w-150"
                        onChange={(value) =>
                          setFeatures((prevState) => [
                            ...prevState,
                            features.map((item) => {
                              if (item.title === "total_flats_nearby") {
                                item["value"] = value;
                              }
                            }),
                          ])
                        }
                      >
                        <Select.Option value="10">&lt; 10</Select.Option>
                        <Select.Option value="25">&lt; 25</Select.Option>
                        <Select.Option value="26">&gt;= 26</Select.Option>
                      </Select>
                    </div>
                    <div className="total-floor">
                      <span className="input-spn-label">Total Floors</span>
                      <div className="inc-dec-input">
                        <Button className="decrementBtn">-</Button>
                        <InputNumber
                          className="input-incdec placeholder_change responsive"
                          required
                          type="number"
                          controls={false}
                          classNames={"w-120"}
                          onChange={(e) =>
                            setFeatures((prevState) => [
                              ...prevState,
                              features.map((item) => {
                                if (item.title === "total_floors") {
                                  item["value"] = e;
                                }
                              }),
                            ])
                          }
                        />
                        <Button className="incrementBtn">+</Button>
                      </div>
                    </div>
                    <div
                      className="flex-column-5"
                    >
                      <span className="input-spn-label">Flat Floor No</span>
                      <Select
                        placeholder="Select Floor"
                        onChange={(e) =>
                          setFeatures((prevState) => [
                            ...prevState,
                            features.map((item) => {
                              if (item.title === "floor_base") {
                                item["value"] = e;
                              }
                            }),
                          ])
                        }
                        className="w-140"
                      >
                        {Array.from(
                          { length: totalFloor },
                          (_, index) => index + 1
                        ).map((item) => (
                          <Select.Option value={item}>{item}</Select.Option>
                        ))}
                      </Select>
                    </div>
                  </div>
                </div>
                <div>
                  <span className="input-spn-label">Carpet Area</span>
                  <Input
                    className="placeholder_change select-after-input"
                    placeholder="Enter Carpet Area"
                    addonAfter={selectCarpetAreaAfter}
                    value={area.carpet_area}
                    onChange={(e) =>
                      handleAreaChange("carpet_area", e.target.value)
                    }
                    required={false}
                    controls={false}
                    type="number"
                  />
                </div>
                <div>
                  <span className="input-spn-label">Super Area</span>
                  <Input
                    placeholder="Enter Super Area"
                    addonAfter={selectSuperAreaAfter}
                    className="select-after-input"
                    value={area.super_area}
                    onChange={(e) =>
                      handleAreaChange("super_area", e.target.value)
                    }
                    controls={false}
                    required={false}
                    type="number"
                  />
                </div>
              </>
            );
          case "villa":
            return (
              <div
                className="flex-column-5"
              >
                {!!features &&
                  features.map((item, index) => (
                    <div key={item.key} className="">
                      {item.title === "bath" ||
                      item.title === "balconies" ||
                      item.title === "bedroom" ? (
                        <>
                          <span className="input-spn-label">
                            {formatText(item.title)}
                          </span>
                          <div className="inc-dec-input">
                            <Button
                              className="decrementBtn"
                              onClick={() => {
                                if (item.value === 0) return;
                                handleDecrement(index, item.key);
                              }}
                            >
                              -
                            </Button>
                            <InputNumber
                              className="placeholder_change input-incdec"
                              value={item.value}
                              controls={false}
                              type="number"
                            />
                            <Button
                              className="incrementBtn"
                              onClick={() => handleIncrement(index, item.key)}
                            >
                              +
                            </Button>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  ))}
                <div>
                  <span className="input-spn-label">Carpet Area</span>
                  <Input
                    className="placeholder_change select-after-input"
                    placeholder="Enter Carpet Area"
                    addonAfter={selectCarpetAreaAfter}
                    value={area.carpet_area}
                    onChange={(e) =>
                      handleAreaChange("carpet_area", e.target.value)
                    }
                    required={false}
                    controls={false}
                    type="number"
                  />
                </div>
                <div>
                  <span className="input-spn-label">Super Area</span>
                  <Input
                    placeholder="Enter Super Area"
                    addonAfter={selectSuperAreaAfter}
                    className="select-after-input"
                    value={area.super_area}
                    onChange={(e) =>
                      handleAreaChange("super_area", e.target.value)
                    }
                    controls={false}
                    required={false}
                    type="number"
                  />
                </div>
              </div>
            );
            case "house":
              return (
                <div
                  className="flex-column-5"
                >
                  {!!features &&
                    features.map((item, index) => (
                      <div key={item.key} className="">
                        {item.title === "bath" ||
                        item.title === "balconies" ||
                        item.title === "bedroom" ? (
                          <>
                            <span className="input-spn-label">
                              {formatText(item.title)}
                            </span>
                            <div className="inc-dec-input">
                              <Button
                                className="decrementBtn"
                                onClick={() => {
                                  if (item.value === 0) return;
                                  handleDecrement(index, item.key);
                                }}
                              >
                                -
                              </Button>
                              <InputNumber
                                className="placeholder_change input-incdec"
                                value={item.value}
                                controls={false}
                                type="number"
                              />
                              <Button
                                className="incrementBtn"
                                onClick={() => handleIncrement(index, item.key)}
                              >
                                +
                              </Button>
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    ))}
                  <div>
                    <span className="input-spn-label">Carpet Area</span>
                    <Input
                      className="placeholder_change select-after-input"
                      placeholder="Enter Carpet Area"
                      addonAfter={selectCarpetAreaAfter}
                      value={area.carpet_area}
                      onChange={(e) =>
                        handleAreaChange("carpet_area", e.target.value)
                      }
                      required={false}
                      controls={false}
                      type="number"
                    />
                  </div>
                  <div>
                    <span className="input-spn-label">Super Area</span>
                    <Input
                      placeholder="Enter Super Area"
                      addonAfter={selectSuperAreaAfter}
                      className="select-after-input"
                      value={area.super_area}
                      onChange={(e) =>
                        handleAreaChange("super_area", e.target.value)
                      }
                      controls={false}
                      required={false}
                      type="number"
                    />
                  </div>
                </div>
              );
          case "plot":
            return (
              <div>
                {!!features &&
                  features.map((item, index) => {
                    if (item.title === "boundary_wall_made") {
                      return (
                        <div
                        className="flex-column-5"
                        >
                          <span className="input-spn-label">
                            Boundary Wall Made
                          </span>
                          <Select
                            onChange={(value) =>
                              setFeatures((prevState) => [
                                ...prevState,
                                (features[index]["value"] = value),
                              ])
                            }
                            value={features[index]["value"]}
                            placeholder="Select"
                          >
                            <Select.Option value="yes">Yes</Select.Option>
                            <Select.Option value="no">No</Select.Option>
                          </Select>
                        </div>
                      );
                    }
                    if (item.title === "total_floor_allowed" || item.title === "no_of_floors_allowed") {
                      return (
                        <div
                          className="flex-column-5"
                        >
                          <span className="input-spn-label">
                            Total Number of Floors Allowed For Const.
                          </span>
                          <Input
                            className="w-140"
                            type="number"
                            onChange={(e) =>
                              setFeatures((prevState) => [
                                ...prevState,
                                (features[index]["value"] = e.target.value),
                              ])
                            }
                            value={features[index]["value"]}
                          />
                        </div>
                      );
                    }
                    if (item.title === "current_construction") {
                      return (
                        <div
                          className="flex-column-5"
                        >
                          <span className="input-spn-label">
                            Any Current Construction
                          </span>
                          <Select
                              onChange={(value) =>
                              setFeatures((prevState) => [
                                ...prevState,
                                (features[index]["value"] = value),
                              ])
                            }
                            value={features[index]["value"]}
                            placeholder="Select"
                          >
                            <Select.Option value="yes">Yes</Select.Option>
                            <Select.Option value="no">No</Select.Option>
                          </Select>
                        </div>
                      );
                    }
                  })}
                <div>
                  <span className="input-spn-label">Super Area</span>
                  <Input
                    placeholder="Enter Super Area"
                    addonAfter={selectSuperAreaAfter}
                    className="select-after-input"
                    value={area.super_area}
                    onChange={(e) =>
                      handleAreaChange("super_area", e.target.value)
                    }
                    controls={false}
                    required={false}
                    type="number"
                  />
                </div>
              </div>
            );
        }
        return;
      case "commercial":
        switch (propertyType?.toLowerCase()) {
          case "shop":
            return (
              <div>
                {!!features &&
                  features.map((item, index) => {
                    if (item.title === "cafeteria") {
                      return (
                        <div className="edit-col">
                          <span>Cafeteria</span>
                          <Radio.Group
                            options={options}
                            onChange={(e) =>
                              setFeatures((prevState) => [
                                ...prevState,
                                (features[index]["value"] = e.target.value),
                              ])
                            }
                            value={features[index]["value"]}
                          >
                            {options.map((item) => (
                              <Radio
                                value={item.value}
                                className="radio-options"
                              >
                                {item.label}
                              </Radio>
                            ))}
                          </Radio.Group>
                        </div>
                      );
                    }
                    if (item.title === "personal_washroom") {
                      return (
                        <div className="edit-col">
                          <span>Personal WashRoom</span>
                          <Select
                            className="width-80px"
                            value={features[index].value}
                            placeholder="Select"
                            onChange={(value) => {
                              setFeatures((prevState) => [
                                ...prevState,
                                (features[index].value = value),
                              ]);
                            }}
                          >
                            <Select.Option value="yes">Yes</Select.Option>
                            <Select.Option value="no">No</Select.Option>
                          </Select>
                        </div>
                      );
                    }
                    if (item.title === "main_road_facing") {
                      return (
                        <div className="edit-col">
                          <span>Main Road Facing</span>
                          <Select
                            className="width-80px"
                            value={features[index].value}
                            placeholder="Select"
                            onChange={(value) => {
                              setFeatures((prevState) => [
                                ...prevState,
                                (features[index].value = value),
                              ]);
                            }}
                          >
                            <Select.Option value="yes">Yes</Select.Option>
                            <Select.Option value="no">No</Select.Option>
                          </Select>
                        </div>
                      );
                    }
                    if (item.title === "is_corner_shop") {
                      return (
                        <div className="edit-col">
                          <span>Is Corner Shop</span>
                          <Select
                            className="width-80px"
                            value={features[index].value}
                            placeholder="Select"
                            onChange={(value) => {
                              setFeatures((prevState) => [
                                ...prevState,
                                (features[index].value = value),
                              ]);
                            }}
                          >
                            <Select.Option value="yes">Yes</Select.Option>
                            <Select.Option value="no">No</Select.Option>
                          </Select>
                        </div>
                      );
                    }
                    if (item.title === "total_floor_in_office") {
                      return (
                        <div className="edit-col">
                          <span>Total Number of Floors</span>
                          <Select
                            className="width-80px"
                            value={features[index].value}
                            placeholder="Select"
                            onChange={(value) => {
                              setFeatures((prevState) => [
                                ...prevState,
                                (features[index].value = value),
                              ]);
                            }}
                          >
                            <Select.Option value="1">1</Select.Option>
                            <Select.Option value="2">2</Select.Option>
                            <Select.Option value="3">3</Select.Option>
                            <Select.Option value="4">4</Select.Option>
                            <Select.Option value="5">5</Select.Option>
                            <Select.Option value="6">6</Select.Option>
                            <Select.Option value="7">7</Select.Option>
                            <Select.Option value="8">8</Select.Option>
                            <Select.Option value="9">&gt; 8 </Select.Option>
                          </Select>
                        </div>
                      );
                    }
                  })}
              </div>
            );
          case "office":
            return (
              <div>
                {!!features &&
                  features.map((item, index) => {
                    if (item.title === "cafeteria") {
                      return (
                        <div className="edit-col">
                          <span>Cafeteria</span>
                          <Radio.Group
                            options={options}
                            onChange={(e) =>
                              setFeatures((prevState) => [
                                ...prevState,
                                (features[index]["value"] = e.target.value),
                              ])
                            }
                            value={features[index]["value"]}
                          >
                            {options.map((item) => (
                              <Radio
                                value={item.value}
                                className="radio-options"
                              >
                                {item.label}
                              </Radio>
                            ))}
                          </Radio.Group>
                        </div>
                      );
                    }
                    if (item.title === "total_washroom") {
                      return (
                        <div className="edit-col">
                          <span>Total WashRoom</span>
                          <Select
                            className="width-80px"
                            value={features[index].value}
                            placeholder="Select"
                            onChange={(value) => {
                              setFeatures((prevState) => [
                                ...prevState,
                                (features[index].value = value),
                              ]);
                            }}
                          >
                            <Select.Option value="1">1</Select.Option>
                            <Select.Option value="2">2</Select.Option>
                            <Select.Option value="3">3</Select.Option>
                            <Select.Option value="4">4</Select.Option>
                            <Select.Option value="5">5</Select.Option>
                            <Select.Option value="6">6</Select.Option>
                            <Select.Option value="7">7</Select.Option>
                            <Select.Option value="8">8</Select.Option>
                          </Select>
                        </div>
                      );
                    }
                    if (item.title === "total_floor_in_office") {
                      return (
                        <div className="edit-col">
                          <span>Total Number of Floors</span>
                          <Select
                            className="width-80px"
                            value={features[index].value}
                            placeholder="Select"
                            onChange={(value) => {
                              setFeatures((prevState) => [
                                ...prevState,
                                (features[index].value = value),
                              ]);
                            }}
                          >
                            <Select.Option value="1">1</Select.Option>
                            <Select.Option value="2">2</Select.Option>
                            <Select.Option value="3">3</Select.Option>
                            <Select.Option value="4">4</Select.Option>
                            <Select.Option value="5">5</Select.Option>
                            <Select.Option value="6">6</Select.Option>
                            <Select.Option value="7">7</Select.Option>
                            <Select.Option value="8">8</Select.Option>
                            <Select.Option value="9">&gt; 8 </Select.Option>
                          </Select>
                        </div>
                      );
                    }
                    if (item.title === "office_floor_number") {
                      return (
                        <div className="edit-col">
                          <span>Office Floor Number</span>

                          <Select
                            className="width-80px"
                            placeholder="Select"
                            value={features[index].value}
                            onChange={(value) => {
                              setFeatures((prevState) => [
                                ...prevState,
                                (features[index].value = value),
                              ]);
                            }}
                          >
                            {Array.from(
                              { length: features[index - 1].value },
                              (_, index) => index + 1
                            ).map((item) => (
                              <Select.Option value={item}>{item}</Select.Option>
                            ))}
                          </Select>
                        </div>
                      );
                    }
                  })}
              </div>
            );
          case "plot":
            return (
              <div>
                {!!features &&
                  features.map((item, index) => {
                    if (item.title === "boundary_wall_made") {
                      return (
                        <div
                        className="flex-column-5"
                        >
                          <span className="input-spn-label">
                            Boundary Wall Made
                          </span>
                          <Select
                            onChange={(value) =>
                              setFeatures((prevState) => [
                                ...prevState,
                                (features[index]["value"] = value),
                              ])
                            }
                            value={features[index]["value"]}
                            placeholder="Select"
                          >
                            <Select.Option value="yes">Yes</Select.Option>
                            <Select.Option value="no">No</Select.Option>
                          </Select>
                        </div>
                      );
                    }
                    if (item.title === "total_floor_allowed" || item.title === "no_of_floors_allowed") {
                      return (
                        <div
                          className="flex-column-5"
                        >
                          <span className="input-spn-label">
                            Total Number of Floors Allowed For Const.
                          </span>
                          <Input
                             className="w-140"
                            type="number"
                            onChange={(e) =>
                              setFeatures((prevState) => [
                                ...prevState,
                                (features[index]["value"] = e.target.value),
                              ])
                            }
                            value={features[index]["value"]}
                          />
                        </div>
                      );
                    }
                    if (item.title === "current_construction") {
                      return (
                        <div
                          className="flex-column-5"
                        >
                          <span className="input-spn-label">
                            Any Current Construction
                          </span>
                          <Select
                             onChange={(value) =>
                              setFeatures((prevState) => [
                                ...prevState,
                                (features[index]["value"] = value),
                              ])
                            }
                            value={features[index]["value"]}
                            placeholder="Select"
                          >
                            <Select.Option value="yes">Yes</Select.Option>
                            <Select.Option value="no">No</Select.Option>
                          </Select>
                        </div>
                      );
                    }
                  })}
                <div>
                  <span className="input-spn-label">Super Area</span>
                  <Input
                    placeholder="Enter Super Area"
                    addonAfter={selectSuperAreaAfter}
                    className="select-after-input"
                    value={area.super_area}
                    onChange={(e) =>
                      handleAreaChange("super_area", e.target.value)
                    }
                    controls={false}
                    required={false}
                    type="number"
                  />
                </div>
              </div>
            );
        }
      default:
        break;
    }
  }

  async function updateProperty() {
    await axios
      .put(`${APP_BASE_URL}/Properties/update`, {
        p_id: propertyId,
        features: features,
        area: area,
        expected_price: expectedPrice,
        token_amount: tokenAmount,
      })
      .then((res) => {
        if (res.status === 200) {
          notification.success({
            message: "Property Updated Successfully",
          });
        }
      })
      .finally(() => {
        if(typeof window != undefined){
          window.location.reload(true)
        }
      }
      );
  }

  return (
    <Modal
      open={showModal}
      footer={
        <Button
          className="updateProperty"
          onClick={() => updateProperty()}
          disabled={area?.super_area < area?.carpet_area}
        >
          Update Property
        </Button>
      }
      onCancel={() => setShowModal(false)}
    >
      <div
        className="flex-col-20"
      >
        <span
          className="edit-property"
        >
          Edit Property
        </span>
        {getFeaturesUpdate()}
      </div>
      <div className="price-details-row">
        <div className="flex-column-5">
          <span className="input-spn-label">
            {data !== "rent" ? "Expected Price" : "Monthly Rent"}
          </span>
          <Input
            className="price-input placeholder_change"
            placeholder="Enter Total Price"
            addonBefore="&#x20B9;"
            required
            type="number"
            value={expectedPrice}
            onChange={(e) => setExpectedPrice(e.target.value)}
          />
        </div>
        <div className="flex-column-5">
          <span className="input-spn-label">
            Booking / Advance Amount{" "}
            <span className="optional-text">(Optional)</span>
          </span>
          <Input
            placeholder="Enter Booking / Advance Amount (Optional)"
            addonBefore="&#x20B9;"
            className="price-input placeholder_change"
            required
            type="number"
            value={tokenAmount}
            onChange={(e) => setTokenAmount(e.target.value)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default PropertyEditModal;

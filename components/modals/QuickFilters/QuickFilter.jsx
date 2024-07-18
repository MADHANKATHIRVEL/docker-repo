'use client';
import React, { useContext, useEffect, useState } from "react";
import "./quick-filter.css";
import { Button, InputNumber, Modal, Select, notification } from "@/utils/antd-component";
import { APP_BASE_URL } from "@/constants/Constant";
import { AppContext } from "@/context/Context";
import axios from "axios";
import { getUserId } from "../../../utils/userUtils";
import Cookies from "js-cookie";

const QuickFilter = React.memo(({ showModal, closePopup , updateUserInterest}) => {
  const { userLocation , cities } = useContext(AppContext);
  const [nearbyLocalities, setNearbyLocalities] = useState([]);
  const [userNeed, setUserNeed] = useState('sell')
  const [localities, setLocalities] = useState();
  const [selectedPropertyType, setSelectedPropertyType] = useState()
  const [district, setDistrict] = useState();
  const [price, setPrice] = useState()
  const [location, setLocation] = useState(
    Cookies.get("selected_location")
  );
  const [propertyTypes, setPropertyTypes] = useState([
    {
      key: "flat",
      value: "flat",
      label: "Flat",
    },
    {
      key: "villa",
      value: "villa",
      label: "House / Villa",
    },
    {
      key: "office",
      value: "office",
      label: "Office",
    },
    {
      key: "shop",
      value: "shop",
      label: "Shop",
    },
    {
      key: "land",
      value: "land",
      label: "Land",
    },
  ]);

  useEffect(() => {
    const transformedLocalities = nearbyLocalities?.map((area) => {
      return {
        key: area?.toLowerCase(),
        value: area,
        label: area,
      };
    });
    setLocalities((prevState) => transformedLocalities);
  }, [district]);

  useEffect(() => {
    async function getNearbyAreas() {
      axios
        .get(
          `${APP_BASE_URL}/Location/getLocation?location=locality&city=${
            district
          }`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then((res) => setNearbyLocalities((prevState) => res.data.locality));
    }
    getNearbyAreas();
  }, [district]);


  async function handleUpdateUserInterestBtn(){
    let data = {};
    data['location'] = district;
    data['locality'] = location;
    data['property_type'] = selectedPropertyType;
    data['property_action'] = userNeed;
    data['price'] = price;
    updateUserInterest(data);
    await axios.post(
      `${APP_BASE_URL}/Users/update` , {
        user_id : getUserId(),
        preference : data
      }
    ).then(res => {
      if(res.status === 200){
        Cookies.set("preferences" , data)
        notification.success({
          message : "Preference Saved Successfully"
        })
      }
    }).catch(err => notification.error({
      message : "Something Went Wrong"
    }))
    closePopup();
  }

  return (
    <Modal open={true} onCancel={() => closePopup()} footer={null}>
      <div
        className="quick-filter-modal"
      >
        <h3>Looking For a Property ? <span>Let Us Know Your Preference</span></h3>
        <div
            className="select-property-action"
        >
          <Button
            className={userNeed === 'sell' ? "selectedInterestBtn" : "NotInterestBtn"}
            onClick={() => setUserNeed(prevState => 'sell')}
          >Buy</Button>
          <Button
            className={userNeed === 'rent' ? "selectedInterestBtn" : "NotInterestBtn"}
            onClick={() => setUserNeed(prevState => 'rent')}
          >Rent</Button>
        </div>
        <Select
          showSearch
          placeholder="Select District"
          value={district}
          className="filter-location-selector"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "")?.toLowerCase().includes(input?.toLowerCase())
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              ?.toLowerCase()
              .localeCompare((optionB?.label ?? "")?.toLowerCase())
          }
          onChange={(value) => {
            setDistrict((prevState) => value);
          }}
        >
          {
            cities.map(city => <Select.Option value={city?.city?.toLowerCase()}>{city?.city}</Select.Option>)
          }
        </Select>
        <Select
          showSearch
          placeholder="Select Locality"
          value={location}
          className="filter-location-selector"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "")?.toLowerCase().includes(input?.toLowerCase())
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              ?.toLowerCase()
              .localeCompare((optionB?.label ?? "")?.toLowerCase())
          }
          options={localities}
        />
        <Select
          showSearch
          placeholder="Select Property Type"
          value={selectedPropertyType}
          className="filter-location-selector"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "")?.toLowerCase().includes(input?.toLowerCase())
          }    
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              ?.toLowerCase()
              .localeCompare((optionB?.label ?? "")?.toLowerCase())
          }
          onChange={(value) => {
            setSelectedPropertyType((prevState) => value);
            Cookies.set("selected_location", value);
          }}
          options={propertyTypes}
        />
        <InputNumber
          placeholder="Enter Price"
          className="price-input"
          value={price}
          onChange={(value) => setPrice(value)}
        />
        <Button
            className="buttons"
            onClick={() => handleUpdateUserInterestBtn()}
        >
            Submit
        </Button>
      </div>
    </Modal>
  );
});

export default QuickFilter;

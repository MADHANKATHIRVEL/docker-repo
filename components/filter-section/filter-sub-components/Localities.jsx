"use client";
import { Checkbox, Input } from "@/utils/antd-component";
import { useState, useEffect } from "react";
import "./sub-components.css";
import axios from "axios";
import { capitalizeWords } from "@/utils/helpers";
import { APP_BASE_URL } from "@/constants/Constant";
import Cookies from "js-cookie";

const Localities = ({ selectedFilters, setselectedFilters, selectedLocality }) => {
  const [searchTerm, setSearchTerm] = useState(selectedLocality);
  const [filteredLocalities, setFilteredLocalities] = useState([selectedLocality]);
  const [localityList, setlocalityList] = useState([]);
  const [fetchingLocalities, setFetchingLocalities] = useState(false)
 

  useEffect(() => {
    setFetchingLocalities(() => true)
    async function getLocalities() {
      const response = await axios.get(
        `${APP_BASE_URL}/Location/getLocation?location=locality&city=${Cookies.get("city-id") ?? 499}`
      );
      setlocalityList((prevState) => response.data.locality);
      setFilteredLocalities((prevState) => response.data.locality);
    }
    getLocalities();
    setFetchingLocalities(() => false)
  }, [Cookies.get("city-id")]);

  function handleTagClick(item, index) {
    let newData = selectedFilters.locality;
    if (!newData.includes(item)) {
      setselectedFilters((prevState) => {
        return {
          ...prevState,
          locality: selectedFilters.locality.concat(item),
        };
      });
    } else {
      setselectedFilters((prevState) => {
        return {
          ...prevState,
          locality: selectedFilters.locality.filter((locality) => locality != item),
        };
      });
    }
  }

  const handleSearchInputChange = (event) => {
    const { value } = event.target;
    if (value.length === 0) {
      setFilteredLocalities((prevState) => localityList);
    } else {
      setSearchTerm((prevState) => value);
      setFilteredLocalities((prevState) =>
        localityList.filter((locality) => locality?.toLowerCase().includes(searchTerm?.toLowerCase()))
      );
    }
  };

  return (
    <>
      <Input
        type="text"
        placeholder="Search localities"
        onChange={handleSearchInputChange}
        className="localities_search"
      />
      <div className="locality_acc">
        {fetchingLocalities ? <>Loading...</> : filteredLocalities?.map((item, index) => (
          <div className="item-row" key={`${index}`}>
            <span className="item-name">{capitalizeWords(item)}</span>
            <Checkbox
              className="checkbox"
              checked={selectedFilters.locality?.includes(item)}
              onChange={() => handleTagClick(item, index)}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Localities;
